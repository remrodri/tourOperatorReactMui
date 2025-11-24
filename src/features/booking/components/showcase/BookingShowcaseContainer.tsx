import { useEffect, useState } from "react";
import BookingShowcase from "./BookingShowcase";
import { useBookingContext } from "../../context/BookingContext";
import BookingFormContainer from "../bookingForm/BookingFormContainer";
import { getCurrentUserRole } from "../../../../utils/helpers/roleHelper";
import { BookingType } from "../../types/BookingType";
import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";

const BookingShowcaseContainer: React.FC = () => {
  const { bookings } = useBookingContext();
  const [open, setOpen] = useState(false);
  const [bookingFound, setBookingFound] = useState<BookingType | null>(null);
  // const { tourPackages } = useTourPackageContext();

  const [filteredBookings, setFilteredBookings] = useState<BookingType[]>([]);

  // console.log('bookings::: ', bookings);

  // useEffect(() => {
  //   console.log('filteredBookings::: ', filteredBookings);
  // },[filteredBookings])

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
        // tourPackages={tourPackages}
        filteredBookings={filteredBookings}
        setFilteredBookings={setFilteredBookings}
      />
      {open && <BookingFormContainer open={open} handleClose={handleClick} />}
    </>
  );
};
export default BookingShowcaseContainer;
