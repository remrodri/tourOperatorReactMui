/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import BookingForm from "./BookingForm";

import { useTouristContext } from "../../../tourist/context/TouristContext";
import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";
import { useDateRangeContext } from "../../../dateRange/context/DateRangeContext";
import { useTouristDestinationContext } from "../../../touristDestination/context/TouristDestinationContext";
import { useBookingContext } from "../../context/BookingContext";

import { BookingType } from "../../types/BookingType";
import { TouristType } from "../../types/TouristType";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import { DateRangeType } from "../../../tourPackage/types/DateRangeType";
import { bookingSchemaWithContext } from "../bookingForm/validation/bookingSchemaWithContext";

dayjs.extend(customParseFormat);
dayjs.locale("es");

/* ============================
   Types
============================ */
type PaymentMethod = "cash" | "bank_transfer";

interface PaymentFormValues {
  id?: string;
  bookingId?: string;
  touristId?: string;
  amount: number;
  paymentDate: string; // DD-MM-YYYY
  paymentMethod: PaymentMethod;
  paymentProofImage: File | null;
}

export interface BookingFormValues {
  id?: string;
  tourPackageId: string;
  dateRangeId: string;
  mainTourist: TouristType;
  additionalTourists: TouristType[];
  totalPrice: number;
  firstPayment: PaymentFormValues;
  notes?: string;
}

interface BookingFormContainerProps {
  open: boolean;
  handleClose: () => void;
  booking?: BookingType | null;
  setBookingProof: (booking: BookingType | null) => void;
}

/* ============================
   Defaults
============================ */
const DEFAULT_PAYMENT: PaymentFormValues = {
  amount: 0,
  paymentDate: dayjs().format("DD-MM-YYYY"),
  paymentMethod: "cash",
  bookingId: "",
  paymentProofImage: null,
};

const DEFAULT_TOURIST: TouristType = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  ci: "",
  nationality: "Bolivia",
  dateOfBirth: "",
  passportNumber: "",
  documentType: "ci",
  tempId: "",
};

const isEmptyTourist = (t?: TouristType) =>
  !t ||
  !(
    (t.firstName || "").trim() ||
    (t.lastName || "").trim() ||
    (t.email || "").trim() ||
    (t.phone || "").trim() ||
    (t.ci || "").trim() ||
    (t.passportNumber || "").trim()
  );

/* ============================
   Container
============================ */
const BookingFormContainer: React.FC<BookingFormContainerProps> = ({
  open,
  handleClose,
  booking,
  setBookingProof,
}) => {
  const { tourists, getTouristInfoByIds } = useTouristContext();
  const { getTourPackageInfoById, tourPackages } = useTourPackageContext();
  const { getTouristDestinationInfoById } = useTouristDestinationContext();
  const { dateRanges } = useDateRangeContext();
  const { createBooking, updateBooking } = useBookingContext();

  const isEditing = Boolean(booking?.id);

  const [tourPackageSelected, setTourPackageSelected] =
    useState<TourPackageType | null>(null);

  const [filteredDateRanges, setFilteredDateRanges] = useState<DateRangeType[]>(
    [],
  );
  const [destinationImages, setDestinationImages] = useState<(string | File)[]>(
    [],
  );

  
const buildImageSrc = (img: string | File): string => {
  if (img instanceof File) return URL.createObjectURL(img);
  if (/^https?:\/\//i.test(img)) return img;

  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";
  const normalized = img.startsWith("/") ? img : `/${img}`;
  return `${base}${normalized}`;
};


  // Pago: preview de comprobante
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Paquetes activos
  const activeTourPackages = useMemo(
    () => tourPackages.filter((t) => t.status === "active"),
    [tourPackages],
  );

  /* ============================
     Formik
  ============================ */
  const formik = useFormik<BookingFormValues>({
    initialValues: {
      id: booking?.id || "",
      tourPackageId: booking?.tourPackageId || "",
      dateRangeId: booking?.dateRangeId || "",
      mainTourist: DEFAULT_TOURIST,
      additionalTourists: [],
      totalPrice: booking?.totalPrice || 0,
      firstPayment: DEFAULT_PAYMENT,
      notes: booking?.notes || "",
    },
    validationSchema: bookingSchemaWithContext({
      isEditing,
      // ya NO usamos búsqueda por modal; el TouristForm auto-busca
      hasTouristsBySearch: false,
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      const res = isEditing
        ? await updateBooking(values)
        : await createBooking(values, []); // ya no hay touristsBySearch

      if (res) {
        setBookingProof(res);
        handleClose();
      }
    },
  });

  /* ============================
     Limpieza preview URL (evita fugas)
  ============================ */
  useEffect(() => {
    return () => {
      if (previewImage?.startsWith("blob:")) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  /* ============================
     Total price
  ============================ */
  const calculateTotalPrice = () => {
    if (isEditing && booking?.totalPrice) {
      return booking.totalPrice;
    }

    if (!tourPackageSelected) return 0;

    const main = isEmptyTourist(formik.values.mainTourist) ? 0 : 1;
    const additional = formik.values.additionalTourists.filter(
      (t) => !isEmptyTourist(t),
    ).length;

    return tourPackageSelected.price * (main + additional);
  };

  useEffect(() => {
    if (!tourPackageSelected) return;
    formik.setFieldValue("totalPrice", calculateTotalPrice(), false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tourPackageSelected,
    formik.values.mainTourist,
    formik.values.additionalTourists,
  ]);

  /* ============================
     Handlers
  ============================ */
  const handleTourPackageChange = (id: string) => {
    const pkg = getTourPackageInfoById(id);
    if (!pkg) return;

    setTourPackageSelected(pkg);
    formik.setFieldValue("tourPackageId", pkg.id, true);
    formik.setFieldValue("dateRangeId", "", false);

    // filtrar rangos
    setFilteredDateRanges(
      dateRanges.filter(
        (d) => d.tourPackageId === pkg.id && d.state === "pending",
      ),
    );

    // galería
    const dest = getTouristDestinationInfoById(pkg.touristDestination);
    if (dest) setDestinationImages(dest.images.map(buildImageSrc));
  };

  const handleDateRangeChange = (value: string) => {
    formik.setFieldValue("dateRangeId", value, true);
  };

  const handleAddAdditionalTourist = () => {
    formik.setFieldValue(
      "additionalTourists",
      [
        ...formik.values.additionalTourists,
        { ...DEFAULT_TOURIST, tempId: crypto.randomUUID() },
      ],
      true,
    );
  };

  const handleRemoveTourist = (index: number) => {
    const next = [...formik.values.additionalTourists];
    next.splice(index, 1);
    formik.setFieldValue("additionalTourists", next, true);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    formik.setFieldValue("firstPayment.paymentProofImage", file, true);
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
  };

  /* ============================
     Edit mode preload (opcional)
     - Si tienes booking con touristIds, puedes precargar datos.
     - Esto ayuda a que se vea la reserva completa al editar.
  ============================ */
  useEffect(() => {
    if (!booking) return;

    // paquete seleccionado
    const pkg = getTourPackageInfoById(booking.tourPackageId);
    if (pkg) {
      setTourPackageSelected(pkg);

      setFilteredDateRanges(
        dateRanges.filter(
          (d) => d.tourPackageId === pkg.id && d.state === "pending",
        ),
      );

      const dest = getTouristDestinationInfoById(pkg.touristDestination);
      if (dest) setDestinationImages(dest.images);
    }

    // precargar turistas de la reserva si aplica
    if (booking.touristIds?.length) {
      const loaded = getTouristInfoByIds(booking.touristIds);
      if (loaded?.length) {
        const main = loaded[0];
        const additional = loaded.slice(1);
        formik.setFieldValue("mainTourist", main, false);
        formik.setFieldValue("additionalTourists", additional, false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking]);

  return (
    <BookingForm
      open={open}
      handleClose={handleClose}
      isEditing={isEditing}
      formik={formik}
      tourists={tourists ?? []} // ✅ CLAVE para TouristForm auto-lookup
      tourPackages={activeTourPackages}
      dateRanges={filteredDateRanges}
      handleTourPackageChange={handleTourPackageChange}
      handleDateRangeChange={handleDateRangeChange}
      handleAddAdditionalTourist={handleAddAdditionalTourist}
      handleRemoveTourist={handleRemoveTourist}
      // pago + comprobante
      previewImage={previewImage}
      handleFileChange={handleFileChange}
      // si aún muestras galería en BookingForm:
      destinationImages={destinationImages}
    />
  );
};

export default BookingFormContainer;
