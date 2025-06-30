import TotalSalesByYear from "./TotalSalesByYear";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { BookingType } from "../../../booking/types/BookingType";
import { useDashboardContext } from "../../context/DashboardContext";

const TotalSalesByYearContainer: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // const [countedBookings, setCountedBookings] = useState<any>([]);
    const [yearSelected, setYearSelected] = useState<string>(new Date().getFullYear().toString());
    const {touristDestinationWithBookings,bookings,totalBookings,countedBookings}=useDashboardContext();
    // const [totalBookings,setTotalBookings]=useState<number>(0);

    // const countBookingsByMonth = () => {
    //         interface Month {
    //             name: string;
    //             counts: number[];
    //         }
    //         // Inicializar months vacío y nuevo en cada ejecución
    //         const months: Month[] = [
    //             { name: 'Ene', counts: [] },
    //             { name: 'Feb', counts: [] },
    //             { name: 'Mar', counts: [] },
    //             { name: 'Abr', counts: [] },
    //             { name: 'May', counts: [] },
    //             { name: 'Jun', counts: [] },
    //             { name: 'Jul', counts: [] },
    //             { name: 'Ago', counts: [] },
    //             { name: 'Sep', counts: [] },
    //             { name: 'Oct', counts: [] },
    //             { name: 'Nov', counts: [] },
    //             { name: 'Dic', counts: [] }
    //         ];
    //         try {
    //             setLoading(true);
    //             touristDestinationWithBookings.forEach((destination: any) => {
    //                 const monthCounts = new Array(12).fill(0); // Inicializar para este destino
    //                 destination.filteredBookings.forEach((booking: BookingType) => {
    //                     const bookingDate = dayjs(booking.createdAt);
    //                     if (bookingDate.year() === Number(yearSelected)) {
    //                         const monthIndex = bookingDate.month(); // 0 = enero
    //                         monthCounts[monthIndex]++;
    //                     }
    //                 });
    //                 // console.log('monthCounts::: ', monthCounts);
    //               // Agregar los conteos al arreglo months
    //                 monthCounts.forEach((value, index: number) => {
    //                 months[index].counts.push(value);
    
    //                 });
    //             });
    //             // console.log('months::: ', months); // Aquí Jun debería tener counts: [1,1] si hay 2 reservas en junio de distintos destinos
                
    //             setCountedBookings(months);
    //             setLoading(false);
    //         } catch (error) {
    //             setLoading(false);
    //             setError(error as string);
    //         }
    //         // Recorremos cada destino turístico
    //     };
    //     useEffect(()=>{
    //         countBookingsByMonth();
    //     },[yearSelected,bookings])
        // useEffect(()=>{
        //     if(countedBookings.length>0){
        //         setTotalBookings(countedBookings.reduce((total: number, month: any) => total + month.counts.reduce((sum: number, count: number) => sum + count, 0), 0));
        //     }
        // },[countedBookings])
    return (
        <TotalSalesByYear 
        loading={loading}
        error={error}
        countedBookings={countedBookings}
        yearSelected={yearSelected}
        setYearSelected={setYearSelected}
        touristDestinationWithBookings={touristDestinationWithBookings}
        // setTouristDestinationWithBookings={setTouristDestinationWithBookings}
        totalBookings={totalBookings}
        />
    );
};

export default TotalSalesByYearContainer;