import { useEffect, useState } from "react";
import { useBookingContext } from "../../../../booking/context/BookingContext";
import { DateRangeType } from "../../../types/DateRangeType";
import DateRangeBookingsDialog from "./DateRangeBookingsDialog";
import { BookingType } from "../../../../booking/types/BookingType";
import MoreInfoDialogContainer from "../../../../booking/components/moreInfoDialog/MoreInfoDialogContainer";
// import { useTouristContext } from "../../../../tourist/context/TouristContext";

interface DateRangeBookingsDialogContainerProps {
  open: boolean;
  handleClose: () => void;
  dateRange: DateRangeType;
}
const DateRangeBookingsDialogContainer: React.FC<
  DateRangeBookingsDialogContainerProps
> = ({ open, handleClose, dateRange }) => {
  console.log("dateRange::: ", dateRange);
  const { bookings, getBookingsByDateRangeId } = useBookingContext();
  const [dateRangeBookings, setDateRangeBookings] = useState<BookingType[]>([]);
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);
  // const { getTouristInfoById } = useTouristContext();

  const handleClickInfoModal = () => {
    setOpenInfoModal(true);
  };

  const loadBookingsByDateRangeId = () => {
    const bookingsByDateRangeId = getBookingsByDateRangeId(
      dateRange.id ?? "",
      bookings,
      dateRange.tourPackageId ?? ""
    );
    console.log("bookingsByDateRangeId::: ", bookingsByDateRangeId);
    setDateRangeBookings(bookingsByDateRangeId);
  };

  useEffect(() => {
    // console.log("::: ");
    loadBookingsByDateRangeId();
  }, [dateRange]);

  return (
    <>
      <DateRangeBookingsDialog
        open={open}
        handleClose={handleClose}
        dateRangeBookings={dateRangeBookings}
      />
      
    </>
  );
};
export default DateRangeBookingsDialogContainer;
