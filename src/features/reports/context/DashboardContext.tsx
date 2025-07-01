import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useBookingContext2 } from "../../booking/context/BookingContext2";
import { useTouristDestinationContext } from "../../touristDestination/context/TouristDestinationContext";
import { useTourPackageContext } from "../../tourPackage/context/TourPackageContext";
import { TourPackageType } from "../../tourPackage/types/TourPackageType";
import { TouristDestinationType } from "../../touristDestination/types/TouristDestinationType";
import { BookingType } from "../../booking/types/BookingType";
import dayjs from "dayjs";
import { useUserContext } from "../../userManagement/context/UserContext";
import { User } from "../../userManagement/types/User";
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
  packagesSoldBySeller:{name:string,value:number,img:string,bookings:BookingType[]}[];
  getPackagesSoldBySeller: () => void;
  getCumulativeBookings: () => void;
  cumulativeBookings: any[];
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
  const [packagesSoldBySeller,setPackagesSoldBySeller]=useState<{name:string,value:number,img:string,bookings:BookingType[]}[]>([])
  const {users}=useUserContext()
  const [cumulativeBookings,setCumulativeBookings]=useState<any>([])

  const getCumulativeBookings = ()=>{
    try {
      setLoading(true);
      const bookingsByYear = bookings.filter((booking: BookingType) => {
        const bookingDate = dayjs(booking.createdAt);
        return bookingDate.year() === Number(yearSelected);
      });
      const dates = bookingsByYear.map((booking:BookingType)=>dayjs(booking.createdAt).format("YYYY-MM-DD"))
      const uniqueDates = Array.from(new Set(dates))
      // console.log('uniqueDates::: ', uniqueDates);
      const res = uniqueDates.map((date:string)=>{
        const bookingDate = dayjs(date);
        const filteredBookings = bookingsByYear.filter((booking:BookingType)=>dayjs(booking.createdAt).format("YYYY-MM-DD")===bookingDate.format("YYYY-MM-DD"))
        return {date:bookingDate.format("YYYY-MM-DD"),value:filteredBookings.length}
      })
      // console.log('res::: ', res);
      setCumulativeBookings(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error as string);
    }
  }

  const getPackagesSoldBySeller = () => {
    try {
      setLoading(true);
      const sellerIds = bookings.map((booking:BookingType)=>booking.sellerId)
      const uniqueSellerIds = Array.from(new Set(sellerIds))
      const res = uniqueSellerIds.map((sellerId:string)=>{
        const seller = users.find((user:User)=>user.id===sellerId)
        const filteredBookings = bookings.filter((booking:BookingType)=>booking.sellerId===sellerId)
        return {name:seller?.firstName||"",value:filteredBookings.length,img:seller?.imageUrl||"",bookings:filteredBookings}
      })
      setPackagesSoldBySeller(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error as string);
    }
  }

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
              // console.log('bookingDate::: ', bookingDate);
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
    getCumulativeBookings();
}, [bookings,yearSelected]);

useEffect(() => {
    getBookingsByMonth();
}, [yearSelected]);
useEffect(() => {
    getBookingsByTouristDestination();
}, [touristDestinationWithBookings]);
useEffect(() => {
    getPackagesSoldBySeller();
}, [bookings,users]);

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
      countedBookings,
      getPackagesSoldBySeller,
      packagesSoldBySeller,
      getCumulativeBookings,
      cumulativeBookings
      }}>
      {children}
    </DashboardContext.Provider>
  );
};

