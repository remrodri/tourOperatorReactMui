import { useEffect, useState } from "react";
import BookingShowcase from "./BookingShowcase";
import { useBookingContext } from "../../context/BookingContext";
import BookingFormContainer from "../bookingForm/BookingFormContainer";
import { getCurrentUserRole } from "../../../../utils/helpers/roleHelper";
import { BookingType } from "../../types/BookingType";

const BookingShowcaseContainer: React.FC = () => {
  const { bookings } = useBookingContext();
  const [open, setOpen] = useState(false);
  const [bookingFound, setBookingFound] = useState<BookingType | null>(null);

  // console.log('bookings::: ', bookings);

  // useEffect(()=>{
  //   // console.log('bookings::: ', bookings);
  // },[bookings])

  const role = getCurrentUserRole();

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <BookingShowcase
        handleClick={handleClick}
        bookings={bookings}
        open={open}
        role={role}
        setBookingFound={setBookingFound}
        bookingFound={bookingFound}
      />
      {open && <BookingFormContainer open={open} handleClose={handleClick} />}
    </>
  );
};
export default BookingShowcaseContainer;
