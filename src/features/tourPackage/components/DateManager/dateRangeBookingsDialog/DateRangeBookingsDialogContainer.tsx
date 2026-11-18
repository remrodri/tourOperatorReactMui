import { useEffect, useState } from "react";
import { useBookingContext } from "../../../../booking/context/BookingContext";
import { DateRangeType } from "../../../types/DateRangeType";
import DateRangeBookingsDialog from "./DateRangeBookingsDialog";
import { BookingType } from "../../../../booking/types/BookingType";

interface DateRangeBookingsDialogContainerProps {
  open: boolean;
  handleClose: () => void;
  dateRange: DateRangeType;
}
const DateRangeBookingsDialogContainer: React.FC<
  DateRangeBookingsDialogContainerProps
> = ({ open, handleClose, dateRange }) => {
  const { fetchBookingsByDateRange } = useBookingContext();
  const [dateRangeBookings, setDateRangeBookings] = useState<BookingType[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadBookingsByDateRangeId = async () => {
      const bookingsByDateRangeId = await fetchBookingsByDateRange(
        dateRange.id ?? "",
        dateRange.tourPackageId ?? "",
      );
      if (!cancelled) setDateRangeBookings(bookingsByDateRangeId);
    };

    void loadBookingsByDateRangeId();

    return () => {
      cancelled = true;
    };
  }, [dateRange, fetchBookingsByDateRange]);

  return (
    <DateRangeBookingsDialog
      open={open}
      handleClose={handleClose}
      dateRangeBookings={dateRangeBookings}
    />
  );
};
export default DateRangeBookingsDialogContainer;
