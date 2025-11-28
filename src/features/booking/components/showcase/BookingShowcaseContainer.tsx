import { useEffect, useState } from "react";
import BookingShowcase from "./BookingShowcase";
import { useBookingContext } from "../../context/BookingContext";
import BookingFormContainer from "../bookingForm/BookingFormContainer";
import { getCurrentUserRole } from "../../../../utils/helpers/roleHelper";
import { BookingType } from "../../types/BookingType";
import BookingProofDialogContainer from "../bookingForm/bookingProofDialog/BookingProofDialogContainer";

const BookingShowcaseContainer: React.FC = () => {
  const { bookings } = useBookingContext();
  const [open, setOpen] = useState(false);
  const [bookingFound, setBookingFound] = useState<BookingType | null>(null);
  // const { tourPackages } = useTourPackageContext();
  const [filteredBookings, setFilteredBookings] = useState<BookingType[]>([]);
  const [openBookingProof, setOpenBookingProof] = useState<boolean>(false);
  const [bookingProof, setBookingProof] = useState<BookingType | null>(null);

  const handleOpenBookingProof = () => {
    setOpenBookingProof(true);
  };

  const handleCloseBookingProof = () => {
    setOpenBookingProof(false);
  };

  // console.log('bookings::: ', bookings);

  // useEffect(() => {
  //   console.log('filteredBookings::: ', filteredBookings);
  // },[filteredBookings])

  const role = getCurrentUserRole();

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (bookingProof) {
      setOpenBookingProof(true);
    }
  }, [bookingProof]);

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
        setBookingProof={setBookingProof}
      />
      {open && (
        <BookingFormContainer
          open={open}
          handleClose={handleClick}
          setBookingProof={setBookingProof}
        />
      )}
      {openBookingProof && (
        <BookingProofDialogContainer
          open={openBookingProof}
          handleClose={handleCloseBookingProof}
          booking={bookingProof}
        />
      )}
    </>
  );
};
export default BookingShowcaseContainer;
