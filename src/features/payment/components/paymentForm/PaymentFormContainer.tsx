/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";

import PaymentForm from "./PaymentForm";
import DialogAlert from "./DialogAlert";

import { BookingType } from "../../../booking/types/BookingType";
import { TouristType } from "../../../booking/types/TouristType";
import { PaymentType } from "../../../booking/types/PaymentType";

import { useTouristContext } from "../../../tourist/context/TouristContext";
import { usePaymentContext } from "../../context/PaymentContext";
import { paymentSchema } from "./validation/paymentSchema";

interface PaymentFormContainerProps {
  open: boolean;
  onClose: () => void;
  booking: BookingType;
  /** balance = lo que ya se pagó (por lo que tu saldo restante = total - balance) */
  balance: number;
  handleOpenPaymentProof: () => void;
  setCreatedPayment: (payment: PaymentType | null) => void;
}

export interface PaymentFormContainerValues {
  amount: number;
  paymentDate: string; // DD-MM-YYYY
  paymentMethod: "cash" | "bank_transfer";
  paymentProofImage: File | null;
  touristId: string;
}

const paymentMethods = [
  { value: "cash", label: "Efectivo" },
  { value: "bank_transfer", label: "Transferencia Bancaria" },
] as const;

const PaymentFormContainer: React.FC<PaymentFormContainerProps> = ({
  open,
  onClose,
  booking,
  balance,
  handleOpenPaymentProof,
  setCreatedPayment,
}) => {
  const { getTouristInfoById } = useTouristContext();
  const { createPayment } = usePaymentContext();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [openDialogAlert, setOpenDialogAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  /** ✅ Turistas de la reserva (derivados de booking.touristIds) */
  const touristsInfo: TouristType[] = useMemo(() => {
    const ids = booking?.touristIds ?? [];
    return ids
      .map((id) => getTouristInfoById(id))
      .filter((t): t is TouristType => Boolean(t));
  }, [booking?.touristIds, getTouristInfoById]);

  /** ✅ Saldo restante real */
  const remaining = Math.max(0, (booking?.totalPrice ?? 0) - (balance ?? 0));

  const formik = useFormik<PaymentFormContainerValues>({
    initialValues: {
      amount: 0,
      paymentDate: dayjs().format("DD-MM-YYYY"), // ✅ unificado
      paymentMethod: "cash",
      paymentProofImage: null,
      touristId: touristsInfo[0]?.id || "",
    },
    validationSchema: paymentSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!booking?.id) return;

      const payload = {
        ...values,
        bookingId: booking.id,
        paymentProofFolder: booking.paymentProofFolder,
      };

      const created = await createPayment(payload);
      if (!created) return;

      setCreatedPayment(created);
      handleOpenPaymentProof();

      // cerrar modal y limpiar estado local
      handleCloseAndReset();
    },
  });

  /** ✅ Si cambia touristsInfo y aún no hay touristId, setear el primero */
  useEffect(() => {
    if (!formik.values.touristId && touristsInfo.length > 0) {
      formik.setFieldValue("touristId", touristsInfo[0].id, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touristsInfo]);

  /** ✅ Guardrail local: evitar exceder saldo (sin depender del service) */
  useEffect(() => {
    const amount = Number(formik.values.amount || 0);
    if (!amount) return;

    if (amount > remaining) {
      setAlertMessage(
        `Saldo restante: ${remaining} Bs. El monto ingresado (${amount} Bs) excede el saldo por ${amount - remaining} Bs.`,
      );
      setOpenDialogAlert(true);
      formik.setFieldValue("amount", 0, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.amount, remaining]);

  /** ✅ File change + preview */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    formik.setFieldValue("paymentProofImage", file, true);

    const url = URL.createObjectURL(file);
    setPreviewImage(url);
  };

  /** ✅ Cleanup de preview URL (evita leaks) */
  useEffect(() => {
    return () => {
      if (previewImage?.startsWith("blob:")) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  /** ✅ cerrar + reset */
  const handleCloseAndReset = () => {
    formik.resetForm();
    if (previewImage?.startsWith("blob:")) URL.revokeObjectURL(previewImage);
    setPreviewImage(null);
    onClose();
  };

  return (
    <>
      <PaymentForm
        open={open}
        onClose={handleCloseAndReset}
        formik={formik}
        tourists={touristsInfo}
        paymentMethods={paymentMethods as any}
        previewImage={previewImage}
        handleFileChange={handleFileChange}
      />

      {openDialogAlert && (
        <DialogAlert
          open={openDialogAlert}
          onClose={() => setOpenDialogAlert(false)}
          title="Upss!..."
          message={alertMessage}
          severity="error"
        />
      )}
    </>
  );
};

export default PaymentFormContainer;