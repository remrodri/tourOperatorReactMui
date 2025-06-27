import { useEffect, useState } from "react";
import { BookingType } from "../../../booking/types/BookingType";
import TotalSalesByDate from "./TotalSalesByDate";
import { SelectChangeEvent } from "@mui/material";
import dayjs from "dayjs";
import 'dayjs/locale/es';
import { useTouristDestinationContext } from "../../../touristDestination/context/TouristDestinationContext";
import { useDashboardContext } from "../../context/DashboardContext";

dayjs.locale('es');

interface TotalSalesByDateContainerProps {
    // bookings: BookingType[];
    // touristDestinationWithBookings: any[];
}
const TotalSalesByDateContainer: React.FC<TotalSalesByDateContainerProps> = ({
    // bookings,
    // touristDestinationWithBookings
}) => {
    const [yearSelected, setYearSelected] = useState<string>(dayjs().year().toString());
    const [dates, setDates] = useState<dayjs.Dayjs[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [countedBookings, setCountedBookings] = useState<any[]>([]);
    const {touristDestinations}=useTouristDestinationContext();
    const [yearsToSelect,setYearsToSelect]=useState<number[]>([dayjs().year()]);
    const {bookings,touristDestinationWithBookings}=useDashboardContext();
    const [mountsByMonth,setMountsByMonth]=useState<any[]>([]);
    // console.log('touristDestinations::: ', touristDestinations);
    // console.log('touristDestinationWithBookings::: ', touristDestinationWithBookings);

    const getMountsByMonth = () => {
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
        try {
            setLoading(true);
            touristDestinationWithBookings.forEach((destination: any) => {
                const monthCounts = new Array(12).fill(0); // Inicializar para este destino
                destination.filteredBookings.forEach((booking: BookingType) => {
                    const bookingDate = dayjs(booking.createdAt);
                    if (bookingDate.year() === Number(yearSelected)) {
                        const monthIndex = bookingDate.month(); // 0 = enero
                        monthCounts[monthIndex]+=booking.totalPrice;
                    }
                });
                // console.log('monthCounts::: ', monthCounts);
              // Agregar los conteos al arreglo months
                monthCounts.forEach((value, index: number) => {
                months[index].counts.push(value);

                });
            });
            // console.log('months::: ', months); // Aquí Jun debería tener counts: [1,1] si hay 2 reservas en junio de distintos destinos
            setMountsByMonth(months);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error as string);
        }
    };
    const getYearsToSelect = () => {
        const years = bookings.map((booking) => dayjs(booking.createdAt).year());
        const uniqueYears = Array.from(new Set(years)).sort((a, b) => a - b); // opcional: ordena ascendente
        setYearsToSelect(uniqueYears);
    };

    const handleChange = (event: SelectChangeEvent) => {
        // console.log('event::: ', event.target.value);
        const touristDestinationsCounted = touristDestinations.length;
        // console.log('touristDestinationsCounted::: ', touristDestinationsCounted);
        setYearSelected(event.target.value as string);
        countBookingsByMonth();
    };

    const countBookingsByMonth = () => {
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
                // console.log('monthCounts::: ', monthCounts);
              // Agregar los conteos al arreglo months
                monthCounts.forEach((value, index: number) => {
                months[index].counts.push(value);

                });
            });
            // console.log('months::: ', months); // Aquí Jun debería tener counts: [1,1] si hay 2 reservas en junio de distintos destinos
            setCountedBookings(months);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error as string);
        }
        // Recorremos cada destino turístico
    };

    useEffect(() => {
        if(bookings.length > 0){
            getYearsToSelect();
            countBookingsByMonth();
            getMountsByMonth();
        }
    }, [bookings,yearSelected,touristDestinationWithBookings]);
    return (
        <TotalSalesByDate
        handleChange={handleChange}
        yearsToSelect={yearsToSelect}
        year={yearSelected}
        countedBookings={countedBookings}
        loading={loading}
        error={error}
        mountsByMonth={mountsByMonth}
        />
    );
};
export default TotalSalesByDateContainer;
