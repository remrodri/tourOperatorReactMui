import { useFormik } from "formik";
import { BookingType } from "../../types/BookingType";
import { TouristType } from "../../types/TouristType";
import BookingForm from "./BookingForm";
import { useTouristContext } from "../../../tourist/context/TouristContext";
import { ChangeEvent, useEffect, useState } from "react";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";
import { useDateRangeContext } from "../../../dateRange/context/DateRangeContext";
import AlertDialog from "../../../../context/AlertDialog";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useTouristDestinationContext } from "../../../touristDestination/context/TouristDestinationContext";
import { useBookingContext } from "../../context/BookingContext";
import { bookingSchemaWithContext } from "./validation/bookingSchemaWithContext";
import { useCancellationConditionContext } from "../../../cancellationPolicy/context/CancellationPolicyContext";
import { DateRangeType } from "../../../tourPackage/types/DateRangeType";
import BookingProofDialogContainer from "./bookingProofDialog/BookingProofDialogContainer";
import SearchTouristByDocument from "./SearchTouristByDocument";
import {
  SnackbarProvider,
  useNewSnackbar,
} from "../../../../context/SnackbarContext";

dayjs.extend(customParseFormat);
dayjs.locale("es");

interface BookingFormProps {
  open: boolean;
  handleClose: () => void;
  booking?: BookingType | null;
  setBookingProof: (booking: BookingType | null) => void;
}

const DEFAULT_PAYMENT: any = {
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
  documentType: "CI",
  tempId: "",
};

export interface BookingFormValues {
  id?: string;
  tourPackageId: string;
  dateRangeId: string;
  // sellerId: string;
  mainTourist: TouristType;
  additionalTourists: TouristType[];
  totalPrice: number;
  firstPayment: any;
  notes?: string;
}

const BookingFormContainer: React.FC<BookingFormProps> = ({
  open,
  handleClose,
  booking,
  setBookingProof,
}) => {
  const { getTouristInfoById, getTouristInfoByIds, tourists } =
    useTouristContext();
  const { getTourPackageInfoById, tourPackages } = useTourPackageContext();
  const { dateRanges } = useDateRangeContext();
  const { getTouristDestinationInfoById } = useTouristDestinationContext();
  const [mainTourist, setMainTourist] = useState<TouristType | null>(null);
  const [tourPackageSelected, setTourPackageSelected] =
    useState<TourPackageType | null>(null);
  const isEditing = booking?.id ? true : false;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [destinationImages, setDestinationImages] = useState<(string | File)[]>(
    []
  );
  const [bookingCreated, setBookingCreated] = useState<boolean>(false);
  const { createBooking, updateBooking } = useBookingContext();
  // const {getTotalPaid}=usePaymentContext()
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { getCancellationPolicyInfoById } = useCancellationConditionContext();
  const [filteredDateRanges, setFilteredDateRanges] = useState<DateRangeType[]>(
    []
  );
  const [openSearchTourist, setOpenSearchTourist] = useState<boolean>(false);
  const [documentNumber, setDocumentNumber] = useState<string>("");
  const [touristsBySearch, setTouristsBySearch] = useState<TouristType[]>([]);
  const { showSnackbar } = useNewSnackbar();

  const handleOpenSearchTourist = () => {
    setOpenSearchTourist(true);
  };

  const handleCloseSearchTourist = () => {
    setOpenSearchTourist(false);
  };

  const searchTourist = () => {
    if (!tourists) return;
    if (!documentNumber) {
      showSnackbar("Debe ingresar un número de documento", "error");
      return;
    }
    if (
      touristsBySearch.some(
        (tourist) =>
          tourist.ci === documentNumber ||
          tourist.passportNumber === documentNumber
      )
    ) {
      showSnackbar("Turista ya agregado", "error");
      return;
    }
    const touristFound = tourists.find(
      (tourist) =>
        tourist.ci === documentNumber ||
        tourist.passportNumber === documentNumber
    );
    console.log("touristFound::: ", touristFound);
    if (!touristFound) {
      showSnackbar("Turista no encontrado", "error");
      return null;
    }
    setTouristsBySearch((prev) => [...prev, touristFound]);
    showSnackbar("Se agregaron los datos del turista", "success");
    setDocumentNumber("");
    handleCloseSearchTourist();
    return touristFound;
  };

  const getTouristInfoByIdOrPassport = (value: string) => {
    const touristFound = tourists.find(
      (tourist) => tourist.ci === value || tourist.passportNumber === value
    );
    if (!touristFound) {
      return null;
    }
    return touristFound;
  };

  const searchAndFillTourist = (
    type: "main" | "additional",
    value: string, // puede ser CI o Passport
    index?: number // solo necesario si es additional
  ) => {
    try {
      // Llamada a tu contexto que busca el turista
      const touristFound = getTouristInfoByIdOrPassport(value); // <- implementar según tu contexto
      console.log("touristFound::: ", touristFound);

      if (!touristFound) {
        setAlertMessage("Turista no encontrado");
        setOpenAlert(true);
        setTimeout(() => setOpenAlert(false), 3000);
        return;
      }

      if (type === "main") {
        // Rellenar el mainTourist completo
        formik.setFieldValue("mainTourist", touristFound);
      } else if (type === "additional" && index !== undefined) {
        // Rellenar un turista adicional específico
        const currentTourists = [...formik.values.additionalTourists];
        currentTourists[index] = touristFound;
        formik.setFieldValue("additionalTourists", currentTourists);
      }
      console.log("formik.values::: ", formik.values);
    } catch (error) {
      console.error("Error buscando turista:", error);
      setAlertMessage("Error buscando turista");
      setOpenAlert(true);
      setTimeout(() => setOpenAlert(false), 3000);
    }
  };

  const filteredTourPackages = () => {
    const filteredTourPackages = tourPackages.filter(
      (tourPackage) => tourPackage.status === "active"
    );
    return filteredTourPackages;
  };

  const getFilteredDateRanges = (tourPackageId: string) => {
    const filteredDateRanges = dateRanges.filter(
      (dateRange) =>
        dateRange.tourPackageId === tourPackageId &&
        dateRange.state === "pending"
    );

    setFilteredDateRanges(filteredDateRanges);
  };

  const loadMinimumAmount = () => {
    if (!tourPackageSelected) {
      return 0;
    }
    // const cancellationPolicy = getCancellationPolicyInfoById(
    //   tourPackageSelected.cancellationPolicy
    // );
    // if (!cancellationPolicy) {
    //   return 0;
    // }
    // const percentage = cancellationPolicy.refoundPercentage / 100;
    // const amount = percentage * totalPrice;
    // formik.setFieldValue("firstPayment.amount", amount);
    // const amount = tourPackageSelected?.price;
    // if (!amount) {
    //   return;
    // }
    const percentage = 50;
    const amount = percentage * totalPrice;
    formik.setFieldValue("firstPayment.amount", amount);
  };

  const loadGallery = (tourPackage: TourPackageType) => {
    if (tourPackage?.touristDestination) {
      const touristDestination = getTouristDestinationInfoById(
        tourPackage.touristDestination
      );
      // console.log('touristDestination::: ', touristDestination);
      if (touristDestination) {
        setDestinationImages(touristDestination.images);
      }
    }
  };

  // console.log('booking::: ', booking);

  // const getTotalPaid=()=>{
  //   const payments=booking?.payments || [];
  //   const totalPaid=payments.reduce((total,payment)=>total+payment.amount,0);
  //   return totalPaid;
  // }

  const handleAmountChange = (amount: number) => {
    const totalPaid = booking?.payments.reduce(
      (total, payment) => total + payment.amount,
      0
    );
    const willExceedTotal =
      amount + (totalPaid || 0) > formik.values.totalPrice;
    if (willExceedTotal) {
      setAlertMessage("El monto excede el saldo");
      setOpenAlert(true);
      formik.setFieldValue("firstPayment.amount", 0);
      setTimeout(() => {
        setOpenAlert(false);
      }, 3000);
      return;
    }
    formik.setFieldValue("firstPayment.amount", amount);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setFileSelected(file);
    formik.setFieldValue("firstPayment.paymentProofImage", file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
  };

  const handlePaymentChange = (field: string, value: any) => {
    formik.setFieldValue(`firstPayment.${field}`, value);
  };

  const handleDateRangeChange = (value: string) => {
    // const dateRange=getDateRangeInfoById(value);
    // if(!dateRange){
    //   return;
    // }
    formik.setFieldValue("dateRangeId", value);
  };

  const handleTourPackageChange = (value: string) => {
    const tourPackage = getTourPackageInfoById(value);
    if (!tourPackage) {
      return;
    }
    setTourPackageSelected(tourPackage);
    formik.setFieldValue("tourPackageId", tourPackage.id);
    const totalPrice =
      tourPackage.price * (1 + formik.values.additionalTourists.length);
    formik.setFieldValue("totalPrice", totalPrice);
    loadGallery(tourPackage);
  };

  // const handleAddAdditionalTourist = () => {
  //   const currentTourists = [...(formik.values.additionalTourists || [])];
  //   currentTourists.push(DEFAULT_TOURIST);
  //   formik.setFieldValue("additionalTourists", currentTourists);

  //   const newTotalPrice = calculateTotalPrice(currentTourists.length);
  //   formik.setFieldValue("totalPrice", newTotalPrice);
  // };
  const handleAddAdditionalTourist = () => {
    const currentTourists = [...(formik.values.additionalTourists || [])];

    const newTourist = {
      ...DEFAULT_TOURIST,
      tempId: crypto.randomUUID(), // ← ID único
    };

    currentTourists.push(newTourist);

    formik.setFieldValue("additionalTourists", currentTourists);

    const newTotalPrice = calculateTotalPrice(currentTourists.length);
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

  const calculateTotalPrice = (additionalTourists: number) => {
    return tourPackageSelected?.price
      ? tourPackageSelected.price * (1 + additionalTourists)
      : 0;
  };

  const handleRemoveTourist = (index: number) => {
    const currentTourists = [...(formik.values.additionalTourists || [])];
    currentTourists.splice(index, 1);
    formik.setFieldValue("additionalTourists", currentTourists);
    const newTotalPrice = calculateTotalPrice(currentTourists.length);
    formik.setFieldValue("totalPrice", newTotalPrice);
  };

  const handleMainTouristChange = (field: string, value: any) => {
    formik.setFieldValue(`mainTourist.${field}`, value);
  };

  const getMainTourist = () => {
    if (!booking) {
      return;
    }
    const mainTourist = getTouristInfoById(booking.touristIds[0]);
    if (!mainTourist) {
      return;
    }
    // setMainTourist(mainTourist);
    formik.setFieldValue("mainTourist", mainTourist);
    // return mainTourist;
  };

  const getAdditionalTourists = () => {
    if (!booking) {
      return;
    }
    const additionalTouristIds = booking.touristIds.filter(
      (touristId) => touristId !== booking.touristIds[0]
    );
    const additionalTourists = getTouristInfoByIds(additionalTouristIds);
    if (!additionalTourists) {
      return;
    }

    // setAdditionalTourists(additionalTourists);
    formik.setFieldValue("additionalTourists", additionalTourists);
    // return additionalTourists;
  };

  const onSubmit = async (values: BookingFormValues) => {
    console.log("formik.errors::: ", formik.errors);
    // console.log("values::: ", values);
    if (isEditing) {
      // console.log('actualizar values::: ', values);
      await updateBooking(values);
    }
    console.log("crear values::: ", values);
    const res = await createBooking(values,touristsBySearch);
    // console.log("res::: ", res);
    setBookingProof(res);
    // console.log("::: ", res);
    handleClose();
    // handleOpenBookingProof();
  };

  // useEffect(() => {
  //   if (bookingProof) {
  //     setOpenBookingProof(true);
  //   }
  // }, [bookingProof]);

  const formik = useFormik<BookingFormValues>({
    initialValues: {
      id: booking?.id || "",
      tourPackageId: booking?.tourPackageId || "",
      dateRangeId: booking?.dateRangeId || "",
      // sellerId:booking?.sellerId || "",
      mainTourist: DEFAULT_TOURIST,
      additionalTourists: [],
      totalPrice: booking?.totalPrice || 0,
      firstPayment: DEFAULT_PAYMENT,
      notes: booking?.notes || "",
    },
    // validationSchema:bookingSchema,
    validationSchema: bookingSchemaWithContext({
      isEditing,
      hasTouristsBySearch: touristsBySearch.length > 0,
    }),
    onSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  useEffect(() => {
    if (!booking) {
      return;
    }
    getMainTourist();
    getAdditionalTourists();
    setTotalPrice(booking.totalPrice);
    // formik.resetForm();
    // formik.setErrors({});
    // formik.setTouched({});
    const tourPackage = getTourPackageInfoById(booking.tourPackageId);
    if (tourPackage) {
      setTourPackageSelected(tourPackage);
    }
    const destination = getTouristDestinationInfoById(
      tourPackage?.touristDestination || ""
    );
    if (destination) {
      setDestinationImages(destination.images);
    }
    if (!tourPackageSelected) {
      return;
    }
    // formik.setFieldValue("firstPayment.amount",booking.totalPrice);
    // loadGallery(tourPackageSelected);
  }, [booking]);
  useEffect(() => {
    if (!tourPackageSelected) {
      return;
    }
    getFilteredDateRanges(tourPackageSelected.id);
  }, [tourPackageSelected]);

  return (
    <>
      <BookingForm
        open={open}
        handleClose={handleClose}
        isEditing={isEditing}
        formik={formik}
        handleMainTouristChange={handleMainTouristChange}
        handleRemoveTourist={handleRemoveTourist}
        handleTouristChange={handleTouristChange}
        handleAddAdditionalTourist={handleAddAdditionalTourist}
        handleTourPackageChange={handleTourPackageChange}
        // tourPackages={tourPackages}
        tourPackages={filteredTourPackages()}
        dateRanges={filteredDateRanges}
        selectedTourPackage={tourPackageSelected}
        handleDateRangeChange={handleDateRangeChange}
        handlePaymentChange={handlePaymentChange}
        handleFileChange={handleFileChange}
        previewImage={previewImage}
        fileSelected={fileSelected}
        handleAmountChange={handleAmountChange}
        destinationImages={destinationImages}
        handleOpenSearchTourist={handleOpenSearchTourist}
        // searchAndFillTourist={searchAndFillTourist}
        touristsBySearch={touristsBySearch}
      />
      {openAlert && (
        <AlertDialog
          open={openAlert}
          onClose={() => setOpenAlert(false)}
          title="Alerta"
          message={alertMessage}
          severity="error"
        />
      )}
      {openSearchTourist && (
        <SearchTouristByDocument
          open={openSearchTourist}
          onClose={handleCloseSearchTourist}
          documentNumber={documentNumber}
          setDocumentNumber={setDocumentNumber}
          searchTourist={searchTourist}
        />
      )}
    </>
  );
};

export default BookingFormContainer;
