import { BookingType } from "../../types/BookingType";
import BookingForm from "./BookingForm";

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
  return (
    <BookingForm
      open={open}
      handleClose={handleClose}
      isEditing={booking?.id ? true : false}
      booking={booking}
    />
  );
};

export default BookingFormContainer;
