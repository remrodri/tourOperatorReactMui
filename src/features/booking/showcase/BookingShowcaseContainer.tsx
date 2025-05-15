import { useState } from "react";
import BookingShowcase from "./BookingShowcase";
import BookingFormContainer from "../bookingForm/BookingFormContainer";
import { useBookingContext } from "../context/BookingContext";

const BookingShowcaseContainer: React.FC = () => {
  const { bookings } = useBookingContext();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <BookingShowcase
        handleClick={handleClick}
        bookings={bookings}
        open={open}
      />
      {open && <BookingFormContainer open={open} handleClick={handleClick} />}
    </>
  );
};
export default BookingShowcaseContainer;
