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
import SearchTouristByDocument from "./SearchTouristByDocument";
import { useNewSnackbar } from "../../../../context/SnackbarContext";

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
  const [touristsBySearch, setTouristsBySearch] = useState<TouristType[]>([]);
  const { createBooking, updateBooking } = useBookingContext();
  const { getCancellationPolicyInfoById } = useCancellationConditionContext();
  const [filteredDateRanges, setFilteredDateRanges] = useState<DateRangeType[]>(
    []
  );
  const [openSearchTourist, setOpenSearchTourist] = useState<boolean>(false);
  const [documentNumber, setDocumentNumber] = useState<string>("");
  const { showSnackbar } = useNewSnackbar();

  const handleOpenSearchTourist = () => setOpenSearchTourist(true);
  const handleCloseSearchTourist = () => setOpenSearchTourist(false);

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

  const filteredTourPackages = () =>
    tourPackages.filter((tourPackage) => tourPackage.status === "active");

  const getFilteredDateRanges = (tourPackageId: string) => {
    const filteredDateRanges = dateRanges.filter(
      (dateRange) =>
        dateRange.tourPackageId === tourPackageId &&
        dateRange.state === "pending"
    );
    setFilteredDateRanges(filteredDateRanges);
  };

  const loadGallery = (tourPackage: TourPackageType) => {
    if (tourPackage?.touristDestination) {
      const touristDestination = getTouristDestinationInfoById(
        tourPackage.touristDestination
      );
      if (touristDestination) {
        setDestinationImages(touristDestination.images);
      }
    }
  };

  const onSubmit = async (values: BookingFormValues) => {
    if (isEditing) {
      await updateBooking(values);
    }
    const res = await createBooking(values, touristsBySearch);
    setBookingProof(res);
    handleClose();
  };

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
      hasTouristsBySearch: touristsBySearch.length > 0,
    }),
    onSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  const calculateTotalPrice = (): number => {
    if (!tourPackageSelected) return 0;
    const mainTouristCount = formik.values.mainTourist ? 1 : 0;
    const additionalCount = formik.values.additionalTourists.length;
    const searchCount = touristsBySearch.length;
    const totalTourists = mainTouristCount + additionalCount + searchCount;
    return tourPackageSelected.price * totalTourists;
  };

  useEffect(() => {
    if (tourPackageSelected) {
      formik.setFieldValue("totalPrice", calculateTotalPrice());
    }
  }, [
    touristsBySearch,
    formik.values.additionalTourists,
    formik.values.mainTourist,
    tourPackageSelected,
  ]);

  const handleTourPackageChange = (value: string) => {
    const tourPackage = getTourPackageInfoById(value);
    if (!tourPackage) return;
    setTourPackageSelected(tourPackage);
    formik.setFieldValue("tourPackageId", tourPackage.id);
    formik.setFieldValue("totalPrice", calculateTotalPrice());
    loadGallery(tourPackage);
  };

  const handleAddAdditionalTourist = () => {
    const currentTourists = [...formik.values.additionalTourists];
    const newTourist = { ...DEFAULT_TOURIST, tempId: crypto.randomUUID() };
    currentTourists.push(newTourist);
    formik.setFieldValue("additionalTourists", currentTourists);
    formik.setFieldValue("totalPrice", calculateTotalPrice());
  };

  const handleRemoveTourist = (index: number) => {
    const currentTourists = [...formik.values.additionalTourists];
    currentTourists.splice(index, 1);
    formik.setFieldValue("additionalTourists", currentTourists);
    formik.setFieldValue("totalPrice", calculateTotalPrice());
  };

  const handleMainTouristChange = (field: string, value: any) => {
    formik.setFieldValue(`mainTourist.${field}`, value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileSelected(file);
    formik.setFieldValue("firstPayment.paymentProofImage", file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
  };

  const handlePaymentChange = (field: string, value: any) => {
    formik.setFieldValue(`firstPayment.${field}`, value);
  };

  const handleDateRangeChange = (value: string) => {
    formik.setFieldValue("dateRangeId", value);
  };

  useEffect(() => {
    if (!booking) return;
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
  }, [booking]);

  useEffect(() => {
    if (!tourPackageSelected) return;
    getFilteredDateRanges(tourPackageSelected.id);
  }, [tourPackageSelected]);

  const handleAmountChange = (amount: number) => {
    const totalPaid =
      booking?.payments?.reduce(
        (total, payment) => total + payment.amount,
        0
      ) || 0;

    const willExceedTotal = amount + totalPaid > formik.values.totalPrice;

    if (willExceedTotal) {
      setAlertMessage("El monto excede el saldo");
      setOpenAlert(true);
      formik.setFieldValue("firstPayment.amount", 0);
      setTimeout(() => setOpenAlert(false), 3000);
      return;
    }

    formik.setFieldValue("firstPayment.amount", amount);
  };

  return (
    <>
      <BookingForm
        open={open}
        handleClose={handleClose}
        isEditing={isEditing}
        formik={formik}
        handleMainTouristChange={handleMainTouristChange}
        handleRemoveTourist={handleRemoveTourist}
        handleTouristChange={(index, field, value) => {
          const currentTourists = [...formik.values.additionalTourists];
          currentTourists[index] = {
            ...currentTourists[index],
            [field]: value,
          };
          formik.setFieldValue("additionalTourists", currentTourists);
        }}
        handleAddAdditionalTourist={handleAddAdditionalTourist}
        handleTourPackageChange={handleTourPackageChange}
        tourPackages={filteredTourPackages()}
        dateRanges={filteredDateRanges}
        selectedTourPackage={tourPackageSelected}
        handleDateRangeChange={handleDateRangeChange}
        handlePaymentChange={handlePaymentChange}
        handleFileChange={handleFileChange}
        previewImage={previewImage}
        fileSelected={fileSelected}
        destinationImages={destinationImages}
        handleOpenSearchTourist={handleOpenSearchTourist}
        touristsBySearch={touristsBySearch}
        handleAmountChange={handleAmountChange}
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
