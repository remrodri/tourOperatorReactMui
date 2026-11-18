import { useEffect, useState } from "react";
import BookingShowcase from "./BookingShowcase";
import { useBookingContext } from "../../context/BookingContext";
import { getCurrentUserRole } from "../../../../utils/helpers/roleHelper";
import { BookingType } from "../../types/BookingType";
import BookingProofDialogContainer from "../bookingForm/bookingProofDialog/BookingProofDialogContainer";
import BookingFormContainer from "../bookingForm3/BookingFormContainer";

const BookingShowcaseContainer: React.FC = () => {
  const {
    bookings,
    loading,
    loadingMore,
    hasMore,
    fetchBookings,
    loadMoreBookings,
  } = useBookingContext();
  const [open, setOpen] = useState(false);
  const [bookingFound, setBookingFound] = useState<BookingType | null>(null);
  const [bookingProof, setBookingProof] = useState<BookingType | null>(null);

  const handleCloseBookingProof = () => {
    setBookingProof(null);
  };

  const role = getCurrentUserRole();

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <>
      <BookingShowcase
        handleClick={handleClick}
        bookings={bookings}
        open={open}
        role={role}
        setBookingFound={setBookingFound}
        bookingFound={bookingFound}
        setBookingProof={setBookingProof}
        loading={loading}
        loadingMore={loadingMore}
        hasMore={hasMore}
        loadMoreBookings={loadMoreBookings}
      />
      {open && (
        <BookingFormContainer
          open={open}
          handleClose={handleClick}
          setBookingProof={setBookingProof}
        />
      )}
      {bookingProof && (
        <BookingProofDialogContainer
          open={Boolean(bookingProof)}
          handleClose={handleCloseBookingProof}
          booking={bookingProof}
        />
      )}
    </>
  );
};
export default BookingShowcaseContainer;
