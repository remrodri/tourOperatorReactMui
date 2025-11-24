import { useEffect, useState } from "react";
import { TourPackageType } from "../../../../tourPackage/types/TourPackageType";
import { BookingType } from "../../../types/BookingType";
import BookingFilter from "./BookingFilter";
import { useTourPackageContext } from "../../../../tourPackage/context/TourPackageContext";

interface BookingFilterContainerProps {
  bookings: BookingType[];
  // tourPackages: TourPackageType[];
  setFilteredBookings: (bookings: BookingType[]) => void;
}
const BookingFilterContainer: React.FC<BookingFilterContainerProps> = ({
  bookings,
  // tourPackages,
  setFilteredBookings,
}) => {
  const [status, setStatus] = useState("");
  const [tourPackageId, setTourPackageId] = useState("");
  const { tourPackages } = useTourPackageContext();

  useEffect(() => {
    if (!bookings) return;

    let filtered = [...bookings];

    if (status) {
      filtered = filtered.filter((booking) => booking.status === status);
    }

    if (tourPackageId) {
      filtered = filtered.filter(
        (booking) => booking.tourPackageId === tourPackageId
      );
    }
    setFilteredBookings(filtered);
  }, [bookings, status, tourPackageId]);
  return (
    <BookingFilter
      status={status}
      tourPackageId={tourPackageId}
      onStatusChange={setStatus}
      onTourPackageIdChange={setTourPackageId}
      tourPackages={tourPackages}
    />
  );
};
export default BookingFilterContainer;
