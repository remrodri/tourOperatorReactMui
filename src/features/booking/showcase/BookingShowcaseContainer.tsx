import { useState } from "react";
import BookingShowcase from "./BookingShowcase";

const BookingShowcaseContainer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    console.log("click::: ");
    setOpen(!open);
  };
  return <BookingShowcase handleClick={handleClick} />;
};
export default BookingShowcaseContainer;
