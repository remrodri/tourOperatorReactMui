import { useEffect, useState } from "react";
import BookingShowcase from "./BookingShowcase";
import { useBookingContext } from "../../context/BookingContext";
import BookingFormContainer from "../bookingForm/BookingFormContainer";

const BookingShowcaseContainer: React.FC = () => {
  const { bookings } = useBookingContext();
  const [open, setOpen] = useState(false);
  // console.log('bookings::: ', bookings);

  // useEffect(()=>{
  //   // console.log('bookings::: ', bookings);
  // },[bookings])

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
