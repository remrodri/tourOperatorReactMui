import { useMemo } from "react";
import { BookingType } from "../../../booking/types/BookingType";
import BookingInfo from "./BookingInfo";
import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";
import { useTourTypeContext } from "../../../tourType/context/TourTypeContext";
import { useUserContext } from "../../../user/context/UserContext";
import { useTouristContext } from "../../../tourist/context/TouristContext";

interface BookingInfoContainerProps {
  booking: BookingType;
  open: boolean;
  handleClose: () => void;
}

const BookingInfoContainer: React.FC<BookingInfoContainerProps> = ({
  booking,
  open,
  handleClose,
}) => {
  console.log("::: ", booking);
  const { tourPackages } = useTourPackageContext();
  const { tourTypes } = useTourTypeContext();
  const { users } = useUserContext();
  const { getTouristInfoById } = useTouristContext();

  const memoizedBooking = useMemo(() => {
    const tourPackageFound =
      tourPackages.find((tp) => tp.id === booking.tourPackageId) || null;
    const tourTypeFound =
      tourTypes.find((tt) => tt.id === tourPackageFound?.tourType) || null;
    const sellerFound =
      users.find((user) => user.id === booking.sellerId) || null;
    const dateRange =
      tourPackageFound?.dateRanges.find(
        (dr) => dr.id === booking.dateRangeId
      ) || null;
    const tourists =
      booking.touristIds
        .map((touristId) => getTouristInfoById(touristId))
        .filter((tourist) => tourist !== null) || [];
    return {
      booking,
      tourPackageFound,
      tourTypeFound,
      sellerFound,
      dateRange,
      tourists,
    };
  }, [booking, tourPackages, tourTypes, users, getTouristInfoById]);

  // console.log("BookingInfoContainer", booking);

  console.log("memoizedBooking::: ", memoizedBooking);
  return (
    <BookingInfo
      booking={memoizedBooking}
      open={open}
      handleClose={handleClose}
    />
  );
};

export default BookingInfoContainer;
