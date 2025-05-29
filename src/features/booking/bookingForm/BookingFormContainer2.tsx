import { useFormik } from "formik";
import { BookingType } from "../types/BookingType";
import { bookingSchema } from "./validation/bookingSchema";
import BookingForm2 from "./BookingForm2";
import { useTouristContext } from "../../tourist/context/TouristContext";
import { useEffect, useState } from "react";
import { TouristType } from "../types/TouristType";
import { PaymentInfoType } from "../types/PaymentInfoType";
import { usePaymentContext } from "../../payment/context/PaymentContext";
import { useTourPackageContext } from "../../tourPackage/context/TourPackageContext";
import { useDateRangeContext } from "../../dateRange/context/DateRangeContext";
import { TourPackageType } from "../../tourPackage/types/TourPackageType";
import { useBookingContext } from "../context/BookingContext";

interface BookingFormContainer2Props {
  open: boolean;
  handleClick: () => void;
  booking: BookingType | null;
}

const DEFAULT_PAYMENT: PaymentInfoType = {
  id: "",
  amount: 0,
  paymentDate: new Date().toISOString(),
  paymentMethod: "cash",
  transactionId: "",
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
  documentType: "CI",
};

export interface BookingFormValues{
  id?: string;
  tourPackageId: string;
  dateRangeId: string;
  sellerId: string;
  mainTouristId?: string;
  mainTourist: TouristType;
  additionalTouristIds: string[];
  additionalTourists: TouristType[];
  totalPrice: number;
  paymentIds: string[];
  // payments: PaymentInfoType[];
  firstPayment: PaymentInfoType;
  notes?: string;
  // status: string;
}

const BookingFormContainer2: React.FC<BookingFormContainer2Props> = ({
  open,
  handleClick,
  booking,
}) => {
  const { getTouristById, getTouristInfoByIds } = useTouristContext();
  const [bookingValues, setBookingValues] = useState<BookingType | null>(null);
  const [mainTouristInfo, setMainTouristInfo] = useState<TouristType | null>(
    null
  );
  const [paymentsInfo, setPaymentsInfo] = useState<PaymentInfoType[] | null>(
    []
  );
  const { getPaymentInfoByIds } = usePaymentContext();
  const { tourPackages, getTourPackageInfoById } = useTourPackageContext();
  const { dateRanges } = useDateRangeContext();
  const [tourPackageSelected, setTourPackageSelected] =
    useState<TourPackageType | null>(null);
  const {createBooking2,updateBooking}=useBookingContext()
  const [additionalTourists, setAdditionalTourists] = useState<TouristType[]>([]);
  const {tourists}=useTouristContext()
  console.log('tourists::: ', tourists);

  console.log('booking::: ', booking);
  // const [totalPrice, setTotalPrice] = useState<number>(0);
    
  const isEditing = booking?.id ? true : false;

  const totalPaid = paymentsInfo?.reduce(
    (total, payment) => total + (payment.amount || 0),
    0
  );

  const getAdditionalTourists = (additionalTouristIds: string[]) => {
    const additionalTourists = getTouristInfoByIds(additionalTouristIds);
    // console.log('additionalTourists::: ', additionalTourists);
    // return additionalTourists;
    setAdditionalTourists(additionalTourists);
    formik.setFieldValue("additionalTourists", additionalTourists);
  };

  const handlePaymentChange = (field: string, value: any) => {
    formik.setFieldValue(`firstPayment.${field}`, value);
  };

  const handleTourPackageChange = (tourPackageId: string) => {
    const tourPackage = getTourPackageInfoById(tourPackageId);
    if (tourPackage) {
      setTourPackageSelected(tourPackage);
      formik.setFieldValue("tourPackageId", tourPackageId);
      formik.setFieldValue("totalPrice", tourPackage.price);
    }
  };

  const calculateTotalPrice2 = (additionalTourists: number) => {
    return tourPackageSelected?.price
      ? tourPackageSelected.price * (1 + additionalTourists)
      : 0;
  };

  const handleMainTouristChange = (field: string, value: any) => {
    formik.setFieldValue(`mainTourist.${field}`, value);
  };

  const getPaymentsInfo = (paymentIds: string[]) => {
    const payments = getPaymentInfoByIds(paymentIds);
    setPaymentsInfo(payments);
  };

  const getMainTouristInfo = (mainTouristId?: string) => {
    if (mainTouristId) {
      const mainTourist = getTouristById(mainTouristId);
      if (mainTourist) {
        setMainTouristInfo(mainTourist);
      }
    }
  };

  const handleTouristChange = (index: number, field: string, value: any) => {
    const currentTourists = [...(formik.values.additionalTourists || [])];
    currentTourists[index] = {
      ...currentTourists[index],
      [field]: value,
    };
    formik.setFieldValue("additionalTourists", currentTourists);
  };

  // const onSubmit = (values: BookingType) => {
  //   console.log("values::: ", values);
  // };

  const onSubmit = async (values: BookingFormValues) => {
    try {
      if(!isEditing){

        // Forzar la validación y marcar todos los campos como touched
        const errors = await formik.validateForm(values);
        
        // Construir el objeto touched de manera compatible con Formik
        const touchedFields = {
            tourPackageId: true,
            dateRangeId: true,
            mainTourist: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,  
                ci: true,
                nationality: true,
                dateOfBirth: true,
                documentType: true,
            },
            additionalTourists: formik.values.additionalTourists?.map(() => ({
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                ci: true,
                nationality: true,
                dateOfBirth: true,
                documentType: true,
            })) || [],
            firstPayment: {
                amount: true,
                paymentDate: true,
                paymentMethod: true,
                transactionId: true,
            },
            totalPrice: true,
            notes: true,
        };

        // Establecer los campos como touched ANTES de validar
        formik.setTouched(touchedFields as any, false);

        // Si hay errores, establecerlos y detener el envío
        if (Object.keys(errors).length > 0) {
            formik.setErrors(errors);
            console.log('Errores encontrados:', errors);
            return;
        }

        // console.log('values::: ', values);
        // Aquí procesar el formulario exitosamente
        createBooking2(values);
        formik.resetForm();
      }else{
        updateBooking(values);
        formik.resetForm();
      }
      // console.log('values::: ', values);
      // handleClick();
    } catch (error: any) {
      console.error('Error en validación:', error);
    } finally {
      handleClick();
    }
};

  const handleRemoveTourist = (index: number) => {
    const currentTourists = [...(formik.values.additionalTourists || [])];
    currentTourists.splice(index, 1);
    formik.setFieldValue("additionalTourists", currentTourists);
    const newTotalPrice = calculateTotalPrice2(currentTourists.length);
    formik.setFieldValue("totalPrice", newTotalPrice);
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
      passportNumber: "",
      documentType: "CI",
    });
    formik.setFieldValue("additionalTourists", currentTourists);

    const newTotalPrice = calculateTotalPrice2(currentTourists.length);
    formik.setFieldValue("totalPrice", newTotalPrice);
  };

  const formik = useFormik<BookingFormValues>({
    initialValues: {
      id: booking?.id ?? "",
      tourPackageId: booking?.tourPackageId ?? "",
      dateRangeId: booking?.dateRangeId ?? "",
      sellerId: booking?.sellerId ?? "",
      mainTouristId: booking?.mainTouristId ?? "",
      mainTourist: mainTouristInfo ?? DEFAULT_TOURIST,
      additionalTouristIds: bookingValues?.additionalTouristIds ?? [],
      // additionalTourists: additionalTourists,
      additionalTourists: booking?.additionalTourists ?? [],
      totalPrice: bookingValues?.totalPrice ?? 0,
      paymentIds: bookingValues?.paymentIds ?? [],
      firstPayment: paymentsInfo?.[0] ?? DEFAULT_PAYMENT,
      // payments: paymentsInfo ?? [DEFAULT_PAYMENT],
      notes: bookingValues?.notes ?? "",
      // status: bookingValues?.status ?? "pending",
    },
    validationSchema: bookingSchema,
    onSubmit,
    enableReinitialize: true,
    // SOLUCIÓN 1: Validar solo al enviar el formulario
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  // SOLUCIÓN 2: Resetear errores cuando se abre el modal para nuevo booking
  // useEffect(() => {
  //   if (open && !booking) {
  //     // Resetear los errores cuando se abre para crear nuevo booking
  //     formik.setErrors({});
  //     formik.setTouched({});
  //   }
  // }, [open, booking]);

  

  useEffect(() => {
    if (formik.values.tourPackageId) {
      handleTourPackageChange(formik.values.tourPackageId);
    }
  }, [formik.values.tourPackageId]);

  useEffect(() => {
    if (booking) {
      setBookingValues(booking);
      getMainTouristInfo(booking.mainTouristId);
      getPaymentsInfo(booking.paymentIds ?? []);
      getAdditionalTourists(booking.additionalTouristIds ?? []);

      // formik.setFieldValue("mainTourist", mainTouristInfo);
      // formik.setFieldValue("additionalTourists", bookingValues?.additionalTourists ?? []);
      // formik.setFieldValue("paymentIds", bookingValues?.paymentIds ?? []);
      // formik.setFieldValue("firstPayment", paymentsInfo?.[0] ?? DEFAULT_PAYMENT);
      // formik.setFieldValue("notes", bookingValues?.notes ?? "");
    } else {
      setBookingValues(null);
      setMainTouristInfo(null);
      setPaymentsInfo([]);
    }
  }, [booking]);

  return (
    <BookingForm2
      formik={formik}
      open={open}
      handleClick={handleClick}
      tourPackages={tourPackages}
      dateRanges={dateRanges}
      handleMainTouristChange={handleMainTouristChange}
      handleTouristChange={handleTouristChange}
      handleRemoveTourist={handleRemoveTourist}
      handleAddAdditionalTourist={handleAddAdditionalTourist}
      selectedTourPackage={tourPackageSelected}
      // handleRemovePayment={handleRemovePayment}
      handlePaymentChange={handlePaymentChange}
      totalPaid={totalPaid ?? 0}
      isEditing={isEditing}
      // DEFAULT_PAYMENT={DEFAULT_PAYMENT}
    />
  );
};
export default BookingFormContainer2;
