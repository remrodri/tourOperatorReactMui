import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useBookingContext2 } from "../../booking/context/BookingContext2";
import { useTouristDestinationContext } from "../../touristDestination/context/TouristDestinationContext";
import { useTourPackageContext } from "../../tourPackage/context/TourPackageContext";
import { TourPackageType } from "../../tourPackage/types/TourPackageType";
import { TouristDestinationType } from "../../touristDestination/types/TouristDestinationType";
import { BookingType } from "../../booking/types/BookingType";
interface DashboardContextType {
  loading: boolean;
  error: string | null;
  bookings: any[];
  touristDestinations: any[];
  tourPackages: any[];
  touristDestinationWithBookings: any[];
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardContext must be used within a DashboardProvider");
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {bookings}=useBookingContext2()
  const {touristDestinations}=useTouristDestinationContext();
  const {tourPackages}=useTourPackageContext();
  const [touristDestinationWithBookings,setTouristDestinationWithBookings]=useState<any>([])

  const getTourPackageById = (id:string) => {
    const tourPackage = tourPackages.find((tourPackage:TourPackageType) => tourPackage.id === id)
    return tourPackage
}

const getTouristDestinationWithBookings = () => {
    // console.log('bookings::: ', bookings);
    const touristDestinationWithBookings 
    = touristDestinations.map((touristDestination:TouristDestinationType) => {
        const filteredBookings = bookings.filter((booking:BookingType) => { 
            const tourPackage = getTourPackageById(booking.tourPackageId)
            return tourPackage?.touristDestination === touristDestination.id
        })
        return { ...touristDestination, filteredBookings };
    });
    setTouristDestinationWithBookings(touristDestinationWithBookings);
}

useEffect(() => {
    getTouristDestinationWithBookings();
}, [bookings]);

// console.log('touristDestinations::: ', touristDestinations);
// const touristDestinationsCounted = touristDestinations.length;
// console.log('touristDestinationsCounted::: ', touristDestinationsCounted);
return (
    <DashboardContext.Provider value={{ 
      loading, 
      error,
      bookings,
      touristDestinations,
      tourPackages,
      touristDestinationWithBookings 
      }}>
      {children}
    </DashboardContext.Provider>
  );
};

