import { useState } from "react";
import BookingShowcase from "./BookingShowcase";
import { useBookingContext } from "../context/BookingContext";
import BookingFormContainer2 from "../bookingForm/BookingFormContainer2";

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
      {open && <BookingFormContainer2 open={open} handleClick={handleClick} booking={null} />}
    </>
  );
};
export default BookingShowcaseContainer;
