import { useFormik } from "formik";
import { BookingType } from "../../types/BookingType";
import BookingForm from "./BookingForm";
import { touristsSchema } from "./validation/touristsSchema";
import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";

interface BookingFormContainerProps {
  open: boolean;
  handleClose: () => void;
  booking: BookingType | null;
}

const BookingFormContainer: React.FC<BookingFormContainerProps> = ({
  open,
  handleClose,
  booking,
}) => {
  const formik = useFormik({
    initialValues: {
      tourists: [
        {
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
        },
      ],
    },
    validationSchema: touristsSchema,
    onSubmit: (values) => {
      console.log(values);
    },
    // enableReinitialize: true,
  });

  // const { tourPackages } = useTourPackages();
  // const { tourPackages } = useTourPackageContext();
  // const dateRanges = [];/
  // const destinationImages = [];

  return (
    <BookingForm
      open={open}
      handleClose={handleClose}
      isEditing={booking?.id ? true : false}
      booking={booking}
      formik={formik}
    />
  );
};

export default BookingFormContainer;
