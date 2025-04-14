import { useEffect, useState } from "react";
import { useDateRangeContext } from "../../dateRange/context/DateRangeContext";
import { useTourPackageContext } from "../../tourPackage/context/TourPackageContext";
import { useUserContext } from "../../userManagement/context/UserContext";
import { BookingType } from "../types/BookingType";
import { PaymentInfoType } from "../types/PaymentInfoType";
import { TouristType } from "../types/TouristType";
import BookingForm from "./BookingForm";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";
import { useFormik } from "formik";
import { bookingSchema } from "./validation/bookingSchema";
import { Dayjs } from "dayjs";
import { useBookingContext } from "../context/BookingContext";

interface BookingFormContainerProps {
  open: boolean;
  handleClick: () => void;
  booking?: BookingType;
}

interface BookingFormValues {
  id?: string;
  tourPackageId: string;
  dateRangeId: string;
  sellerId: string;
  mainTouristId?: string;
  mainTourist?: TouristType;
  additionalTouristIds: string[];
  additionalTourists: TouristType[];
  totalPrice: number;
  paymentIds: string[];
  payments: PaymentInfoType[];
  notes?: string;
  status: string;
}

const BookingFormContainer: React.FC<BookingFormContainerProps> = ({
  open,
  handleClick,
  booking,
}) => {
  const { tourPackages, tpFound, findTourPackageById } =
    useTourPackageContext();
  const { users } = useUserContext();
  const { dateRangesByTP, findDateRangesByTourPackage } = useDateRangeContext();
  const [dateRanges, setDateRanges] = useState<DateRangeType[]>([]);
  const { createBooking, updateBooking } = useBookingContext();

  // Calculate total price based on selected package and number of tourists
  const calculateTotalPrice = (
    tourPackageId: string,
    mainTourist?: TouristType,
    additionalTourists: TouristType[] = []
  ) => {
    // Find the selected tour package
    const selectedPackage = tourPackages.find((tp) => tp.id === tourPackageId);
    if (!selectedPackage) return 0;

    // Count tourists (main tourist + additional tourists)
    const mainTouristCount =
      mainTourist && Object.keys(mainTourist).length > 0 ? 1 : 0;
    const totalTourists = mainTouristCount + additionalTourists.length;

    // Calculate total price
    return selectedPackage.price * totalTourists;
  };

  const handleAddAdditionalTourist = () => {
    const currentTourists = [...(formik.values.additionalTourists || [])];
    currentTourists.push({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      ci: "",
      nationality: "Bolivia",
      dateOfBirth: "",
      // additionalInformation: "",
      passportNumber: "",
      documentType: "CI",
    });
    formik.setFieldValue("additionalTourists", currentTourists);

    // Recalculate total price
    const newTotalPrice = calculateTotalPrice(
      formik.values.tourPackageId,
      formik.values.mainTourist,
      currentTourists
    );
    formik.setFieldValue("totalPrice", newTotalPrice);
  };

  const handleTouristChange = (index: number, field: string, value: any) => {
    const currentTourists = [...(formik.values.additionalTourists || [])];
    currentTourists[index] = {
      ...currentTourists[index],
      [field]: value,
    };
    formik.setFieldValue("additionalTourists", currentTourists);
  };

  const handleRemoveTourist = (index: number) => {
    const currentTourists = [...(formik.values.additionalTourists || [])];
    currentTourists.splice(index, 1);
    formik.setFieldValue("additionalTourists", currentTourists);

    // Recalculate total price
    const newTotalPrice = calculateTotalPrice(
      formik.values.tourPackageId,
      formik.values.mainTourist,
      currentTourists
    );
    formik.setFieldValue("totalPrice", newTotalPrice);
  };

  const handleMainTouristChange = (field: string, value: any) => {
    formik.setFieldValue(`mainTourist.${field}`, value);
  };

  // Payment handling functions
  const handlePaymentChange = (index: number, field: string, value: any) => {
    const currentPayments = [...(formik.values.payments || [])];
    currentPayments[index] = {
      ...currentPayments[index],
      [field]: value,
    };
    formik.setFieldValue("payments", currentPayments);
  };

  const handleAddPayment = () => {
    const currentPayments = [...(formik.values.payments || [])];
    currentPayments.push({
      id: "",
      amount: 0, // Cambiado de 0 a cadena vacía para permitir borrar
      paymentDate: new Date().toISOString(),
      paymentMethod: "",
      transactionId: "",
    });
    formik.setFieldValue("payments", currentPayments);
  };

  const handleRemovePayment = (index: number) => {
    const currentPayments = [...(formik.values.payments || [])];
    currentPayments.splice(index, 1);
    formik.setFieldValue("payments", currentPayments);
  };

  const onSubmit = (values: BookingFormValues) => {
    if (values.id) {
      // const booking = {...values,status:"pending"}
      updateBooking(values.id, values as BookingType);
    } else {
      createBooking(values as BookingType);
    }

    handleClick();
  };

  const formik = useFormik<BookingFormValues>({
    initialValues: {
      id: booking?.id ?? "",
      tourPackageId: booking?.tourPackageId ?? "",
      dateRangeId: booking?.dateRangeId ?? "",
      sellerId: booking?.sellerId ?? "",
      mainTouristId: booking?.mainTouristId ?? "",
      mainTourist: booking?.mainTourist ?? {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        ci: "",
        nationality: "Bolivia",
        // dateOfBirth: "",
        // additionalInformation: "",
        passportNumber: "",
        documentType: "ci",
      },
      additionalTouristIds: booking?.additionalTouristIds ?? [],
      additionalTourists: booking?.additionalTourists ?? [],
      totalPrice: booking?.totalPrice ?? 0,
      paymentIds: booking?.paymentIds ?? [],
      payments: booking?.payments ?? [
        {
          id: "",
          amount: 0,
          paymentDate: new Date().toString(),
          paymentMethod: "",
          transactionId: "",
        },
      ],
      notes: booking?.notes ?? "",
      status: booking?.status ?? "pending",
    },
    validationSchema: bookingSchema,
    onSubmit,
  });

  useEffect(() => {
    if (formik.values.tourPackageId) {
      findTourPackageById(formik.values.tourPackageId);

      // Recalculate total price when tour package changes
      const newTotalPrice = calculateTotalPrice(
        formik.values.tourPackageId,
        formik.values.mainTourist,
        formik.values.additionalTourists
      );
      formik.setFieldValue("totalPrice", newTotalPrice);
    }
  }, [formik.values.tourPackageId, findTourPackageById]);

  useEffect(() => {
    if (tpFound && tpFound.dateRanges) {
      findDateRangesByTourPackage(tpFound.dateRanges);
    }
  }, [tpFound]);

  return (
    <BookingForm
      open={open}
      handleClick={handleClick}
      formik={formik}
      tourPackages={tourPackages}
      dateRanges={dateRangesByTP}
      sellers={users}
      handleMainTouristChange={handleMainTouristChange}
      handleRemoveTourist={handleRemoveTourist}
      handleTouristChange={handleTouristChange}
      handleAddAdditionalTourist={handleAddAdditionalTourist}
      handlePaymentChange={handlePaymentChange}
      handleAddPayment={handleAddPayment}
      handleRemovePayment={handleRemovePayment}
    />
  );
};
export default BookingFormContainer;
