import { useState } from "react";
import BookingShowcase from "./BookingShowcase";
import { useBookingContext2 } from "../context/BookingContext2";
import BookingFormContainer from "../bookingForm2/BookingFormContainer";

const BookingShowcaseContainer: React.FC = () => {
  const { bookings } = useBookingContext2();
  const [open, setOpen] = useState(false);
  // console.log('bookings::: ', bookings);

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
      {open && <BookingFormContainer open={open} handleClose={handleClick} />}
    </>
  );
};
export default BookingShowcaseContainer;
