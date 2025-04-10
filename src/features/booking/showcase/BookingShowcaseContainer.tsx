import { useState } from "react";
import BookingShowcase from "./BookingShowcase";
import BookingFormContainer from "../bookingForm/BookingFormContainer";

const BookingShowcaseContainer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <BookingShowcase handleClick={handleClick} />
      {open && <BookingFormContainer open={open} handleClick={handleClick} />}
    </>
  );
};
export default BookingShowcaseContainer;
