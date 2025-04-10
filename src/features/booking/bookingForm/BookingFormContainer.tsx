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
  // const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleAddAdditionalTourist = () => {
    const currentTourists = [...(formik.values.additionalTourists || [])];
    currentTourists.push({
      id: "",
      firstName: "",
      lastName: "",
      // documentType: "",
      // documentNumber: "",
      email: "",
      phone: "",
      ci: "",
      nationality: "",
      dateOfBirth: "",
      additionalInformation: "",
      // birthDate: "",
    });
    formik.setFieldValue("additionalTourists", currentTourists);
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
      amount: 0,
      paymentDate: new Date().toString(),
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

  const onSubmit = (data: any) => {
    console.log("data::: ", data);
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
        nationality: "",
        dateOfBirth: "",
        // passportNumber: "",
        // healthIssues: "",
        additionalInformation: "",
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
