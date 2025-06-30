import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useBookingContext2 } from "../../booking/context/BookingContext2";
import { useTouristDestinationContext } from "../../touristDestination/context/TouristDestinationContext";
import { useTourPackageContext } from "../../tourPackage/context/TourPackageContext";
import { TourPackageType } from "../../tourPackage/types/TourPackageType";
import { TouristDestinationType } from "../../touristDestination/types/TouristDestinationType";
import { BookingType } from "../../booking/types/BookingType";
import dayjs from "dayjs";
interface DashboardContextType {
  loading: boolean;
  error: string | null;
  bookings: any[];
  touristDestinations: any[];
  tourPackages: any[];
  touristDestinationWithBookings: any[];
  totalBookings: number;
  getBokingsByYear: (year: string) => void;
  countedBookings: any[];
  yearSelected: string;
  getBookingsByMonth: () => void;
  getBookingsByTouristDestination: () => void;
  bookingsByTouristDestination:{name:string,value:number}[];
}

interface Month {
  name: string;
  counts: number[];
}
// Inicializar months vacío y nuevo en cada ejecución
const months: Month[] = [
  { name: 'Ene', counts: [] },
  { name: 'Feb', counts: [] },
  { name: 'Mar', counts: [] },
  { name: 'Abr', counts: [] },
  { name: 'May', counts: [] },
  { name: 'Jun', counts: [] },
  { name: 'Jul', counts: [] },
  { name: 'Ago', counts: [] },
  { name: 'Sep', counts: [] },
  { name: 'Oct', counts: [] },
  { name: 'Nov', counts: [] },
  { name: 'Dic', counts: [] }
];

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
  const [countedBookings,setCountedBookings]=useState<any>([])
  const [yearSelected,setYearSelected]=useState<string>(new Date().getFullYear().toString());
  const [totalBookings,setTotalBookings]=useState<number>(0);
  const [bookingsByTouristDestination,setBookingsByTouristDestination]=useState<any>([])

  const getBookingsByTouristDestination = () => {
    try {
      setLoading(true);
      const res = touristDestinationWithBookings.map((td:any)=>{
        // const bookingCount = td.filteredBookings.length;
        return {name:td.name,value:td.filteredBookings.length}
      })
      setBookingsByTouristDestination(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error as string);
    }
  }

  const getBookingsByMonth = () => {
    try {
          setLoading(true);
          touristDestinationWithBookings.forEach((destination: any) => {
            const monthCounts = new Array(12).fill(0); // Inicializar para este destino
            destination.filteredBookings.forEach((booking: BookingType) => {
            const bookingDate = dayjs(booking.createdAt);
            if (bookingDate.year() === Number(yearSelected)) {
              const monthIndex = bookingDate.month(); // 0 = enero
              monthCounts[monthIndex]++;
            }
            });
                      // Agregar los conteos al arreglo months
            monthCounts.forEach((value, index: number) => {
              months[index].counts.push(value);
            });
          });
          setCountedBookings(months);
          setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error as string);
    }
  };

  const getBokingsByYear = (year: string) => {
    const bookingsByYear = bookings.filter((booking: BookingType) => {
      const bookingDate = dayjs(booking.createdAt);
      return bookingDate.year() === Number(year);
    });
    // setCountedBookings(bookingsByYear);
    setTotalBookings(bookingsByYear.length);
  };

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
    getBokingsByYear(yearSelected);
}, [bookings,yearSelected]);

useEffect(() => {
    getBookingsByMonth();
}, [yearSelected]);
useEffect(() => {
    getBookingsByTouristDestination();
}, [touristDestinationWithBookings]);

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
      touristDestinationWithBookings,
      totalBookings,
      getBokingsByYear,
      getBookingsByMonth,
      getBookingsByTouristDestination,
      bookingsByTouristDestination,
      yearSelected,
      countedBookings
      }}>
      {children}
    </DashboardContext.Provider>
  );
};

