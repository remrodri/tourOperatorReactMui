import { useNewSnackbar } from "../../../../../context/SnackbarContext";
import { BookingType } from "../../../types/BookingType";
import BookingSearchByCode from "./BookingSearchByCode";
import { useState } from "react";
import { useBookingContext } from "../../../context/BookingContext";

interface BookingSearchByCodeContainerProps {
  setBookingFound: (booking: BookingType | null) => void;
}

const BookingSearchByCodeContainer: React.FC<
  BookingSearchByCodeContainerProps
> = ({ setBookingFound }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searching, setSearching] = useState(false);
  const { showSnackbar } = useNewSnackbar();
  const { searchBookingByCode } = useBookingContext();

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      showSnackbar("Ingresa un codigo", "info");
      handleClear();
      return;
    }

    setSearching(true);
    try {
      const bookingFound = await searchBookingByCode(searchValue);
      if (!bookingFound) {
        showSnackbar("No encontrado", "error");
      }
      setBookingFound(bookingFound || null);
    } finally {
      setSearching(false);
    }
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
      searching={searching}
    />
  );
};
export default BookingSearchByCodeContainer;
