import { ChangeEvent, useEffect, useState } from "react";
import { BookingType } from "../../../booking/types/BookingType";
import PaymentForm from "./PaymentForm";
import { useFormik } from "formik";
import { paymentSchema } from "./validation/paymentSchema";
import DialogAlert from "./DialogAlert";
import { useTouristContext } from "../../../tourist/context/TouristContext";
import { TouristType } from "../../../booking/types/TouristType";
import dayjs from "dayjs";
import { usePaymentContext } from "../../context/PaymentContext";
import { useNewSnackbar } from "../../../../context/SnackbarContext";
import { PaymentType } from "../../../booking/types/PaymentType";

interface PaymentFormContainerProps {
  open: boolean;
  onClose: () => void;
  booking: BookingType;
  balance: number;
  handleOpenPaymentProof: () => void;
  setCreatedPayment: (payment: PaymentType | null) => void;
}

export interface PaymentFormContainerValues {
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  paymentProofImage: File | null;
  touristId: string;
}

const paymentMethods = [
  { value: "cash", label: "Efectivo" },
  { value: "bank_transfer", label: "Transferencia Bancaria" },
];

const PaymentFormContainer: React.FC<PaymentFormContainerProps> = ({
  open,
  onClose,
  booking,
  balance,
  handleOpenPaymentProof,
  setCreatedPayment,
}: PaymentFormContainerProps) => {
  const [openDialogAlert, setOpenDialogAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const { getTouristInfoById } = useTouristContext();
  const [touristsInfo, setTouristsInfo] = useState<TouristType[]>([]);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const { createPayment } = usePaymentContext();
  const { showSnackbar } = useNewSnackbar();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setFileSelected(file);
    formik.setFieldValue("paymentProofImage", file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
  };

  const getTourists = () => {
    const tourists = booking.touristIds
      .map((touristId) => getTouristInfoById(touristId))
      .filter((tourist) => tourist !== null);
    setTouristsInfo(tourists);
  };

  const handleAmountChange = (amount: number) => {
    const willExceedTotal = amount > booking.totalPrice - balance;
    if (willExceedTotal) {
      setAlertMessage(
        `La reserva tiene un saldo de ${
          booking.totalPrice - balance
        } Bs, el pago que intentas ingresar de ${amount} Bs, excede el saldo por ${
          amount - (booking.totalPrice - balance)
        } Bs.`
      );
      setOpenDialogAlert(true);
      formik.setFieldValue("amount", 0);
    } else {
      formik.setFieldValue("amount", amount);
    }
  };

  const handleDateChange = (date: string) => {
    formik.setFieldValue("paymentDate", date);
  };

  const handleMethodChange = (method: string) => {
    formik.setFieldValue("paymentMethod", method);
  };

  const onSubmit = async (values: PaymentFormContainerValues) => {
    if (!booking.id) {
      console.error("No se encontro el id de la reserva");
      return;
    }
    try {
      const paymentTocreate = {
        ...values,
        bookingId: booking.id,
        paymentProofFolder: booking.paymentProofFolder,
      };
      const paymentCreated = await createPayment(paymentTocreate);
      if (!paymentCreated) {
        return;
      }
      setCreatedPayment(paymentCreated);
      handleOpenPaymentProof();
    } catch (error) {
      console.error("Error al guardar el pago:", error);
    } finally {
      onClose();
    }
  };

  const formik = useFormik<PaymentFormContainerValues>({
    initialValues: {
      amount: 0,
      paymentDate: dayjs().format("DD/MM/YYYY"),
      paymentMethod: "cash",
      paymentProofImage: null,
      touristId: touristsInfo[0]?.id || "",
    },
    validationSchema: paymentSchema,
    onSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    getTourists();
  }, [booking]);

  return (
    <>
      <PaymentForm
        open={open}
        onClose={onClose}
        formik={formik}
        paymentMethods={paymentMethods}
        handleMethodChange={handleMethodChange}
        handleAmountChange={handleAmountChange}
        handleDateChange={handleDateChange}
        tourists={touristsInfo}
        handleFileChange={handleFileChange}
        previewImage={previewImage}
        fileSelected={fileSelected}
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
