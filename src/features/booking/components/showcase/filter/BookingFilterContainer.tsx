import { useEffect, useState } from "react";
import BookingFilter from "./BookingFilter";
import { useTourPackageContext } from "../../../../tourPackage/context/TourPackageContext";
import { useBookingContext } from "../../../context/BookingContext";

const BookingFilterContainer: React.FC = () => {
  const [status, setStatus] = useState("");
  const [tourPackageId, setTourPackageId] = useState("");
  const { tourPackages } = useTourPackageContext();
  const { setBookingFilters } = useBookingContext();

  useEffect(() => {
    setBookingFilters({
      status: status || undefined,
      tourPackageId: tourPackageId || undefined,
    });
  }, [status, tourPackageId, setBookingFilters]);

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
