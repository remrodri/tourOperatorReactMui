import { useDateRangeContext } from "../../../../dateRange/context/DateRangeContext";
import { useTouristContext } from "../../../../tourist/context/TouristContext";
import { useTourPackageContext } from "../../../../tourPackage/context/TourPackageContext";
import { useUserContext } from "../../../../userManagement/context/UserContext";
import { BookingType } from "../../../types/BookingType";
import BookingProofDialog from "./BookingProofDialog";

interface BookingProofDialogContainerProps {
  open: boolean;
  handleClose: () => void;
  booking: BookingType | null;
}
const BookingProofDialogContainer: React.FC<
  BookingProofDialogContainerProps
> = ({ open, handleClose, booking }) => {
  console.log("booking::: ", booking);
  const { getTourPackageInfoById } = useTourPackageContext();
  const { getTouristInfoById } = useTouristContext();
  const { getDateRangeInfoById } = useDateRangeContext();
  const { getUserById } = useUserContext();

  if (!booking) {
    return;
  }
  const tourPackage = getTourPackageInfoById(booking?.tourPackageId);
  const tourists = booking.touristIds
    .map((touristId) => getTouristInfoById(touristId))
    .filter((tourist) => tourist !== null);
  const dateRange = getDateRangeInfoById(booking?.dateRangeId);
  const seller = getUserById(booking.sellerId);

  return (
    <BookingProofDialog
      open={open}
      onClose={handleClose}
      booking={booking}
      tourPackage={tourPackage}
      tourists={tourists}
      dateRange={dateRange}
      seller={seller}
    />
  );
};

export default BookingProofDialogContainer;
