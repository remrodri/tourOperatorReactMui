import { useNewSnackbar } from "../../../../../context/SnackbarContext";
import { BookingType } from "../../../types/BookingType";
import BookingSearchByCode from "./BookingSearchByCode";
import { useState } from "react";

interface BookingSearchByCodeContainerProps {
  bookings: BookingType[] | null;
  // setFilteredBookings: (bookings: BookingType[] | null) => void;
  setBookingFound: (booking: BookingType | null) => void;
}

const BookingSearchByCodeContainer: React.FC<
  BookingSearchByCodeContainerProps
> = ({
  bookings,
  // setFilteredBookings,
  setBookingFound,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const {showSnackbar} = useNewSnackbar();

  const handleSearch = () => {
    console.log("searchValue::: ", searchValue);
    if (!bookings) {
      return;
    }
    if (!searchValue) {
      showSnackbar("Ingresa un codigo", "info");
      handleClear();
      return;
    }
    const bookingFound = bookings.find((booking) =>
      booking.bookingCode.toUpperCase().includes(searchValue.toUpperCase())
    );
    console.log("bookingFound::: ", bookingFound);
    if (!bookingFound) {
      showSnackbar("No encontrado", "error");

    }
    setBookingFound(bookingFound || null);
    // handleClear();
  };

  const handleClear = () => {
    setSearchValue("");
    setBookingFound(null);
  };
  return (
    <BookingSearchByCode
      searchValue={searchValue}
      onChange={setSearchValue}
      onSearch={handleSearch}
      onClear={handleClear}
    />
  );
};
export default BookingSearchByCodeContainer;
