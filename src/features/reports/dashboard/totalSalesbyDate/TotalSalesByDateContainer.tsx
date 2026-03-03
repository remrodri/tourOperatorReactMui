// import React, { useMemo, useState } from "react";
// import { SelectChangeEvent } from "@mui/material";
// import dayjs from "dayjs";
// import "dayjs/locale/es";

// import { BookingType } from "../../../booking/types/BookingType";
// import TotalSalesByDate from "./TotalSalesByDate";
// import { useDashboardContext } from "../../context/DashboardContext";

// dayjs.locale("es");

// // interface TotalSalesByDateContainerProps {}

// type MonthData = {
//   name: string;
//   counts: number[];
// };

// type DestinationWithBookings = {
//   filteredBookings: BookingType[];
//   // otros campos que tenga tu objeto:
//   [key: string]: unknown;
// };

// const MONTH_NAMES: MonthData["name"][] = [
//   "Ene",
//   "Feb",
//   "Mar",
//   "Abr",
//   "May",
//   "Jun",
//   "Jul",
//   "Ago",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dic",
// ];

// function createEmptyMonths(): MonthData[] {
//   return MONTH_NAMES.map((name) => ({ name, counts: [] }));
// }

// function buildMonthlyData(
//   destinations: DestinationWithBookings[],
//   year: number,
//   mode: "count" | "amount",
// ): MonthData[] {
//   const months = createEmptyMonths();

//   destinations.forEach((destination) => {
//     const monthTotals = new Array(12).fill(0);

//     destination.filteredBookings.forEach((booking) => {
//       const bookingDate = dayjs(booking.createdAt);
//       if (bookingDate.year() === year) {
//         const monthIndex = bookingDate.month();
//         monthTotals[monthIndex] += mode === "count" ? 1 : booking.totalPrice;
//       }
//     });

//     monthTotals.forEach((value, i) => {
//       months[i].counts.push(value);
//     });
//   });

//   return months;
// }

// const TotalSalesByDateContainer: React.FC = () => {
//   const currentYear = dayjs().year();
//   const [yearSelected, setYearSelected] = useState<string>(
//     currentYear.toString(),
//   );

//   const { bookings, touristDestinationWithBookings } = useDashboardContext();

//   const yearsToSelect = useMemo(() => {
//     const years = bookings.map((b) => dayjs(b.createdAt).year());
//     const uniqueYears = Array.from(new Set(years)).sort((a, b) => a - b);
//     return uniqueYears.length ? uniqueYears : [currentYear];
//   }, [bookings, currentYear]);

//   const numericYear = Number(yearSelected);

//   const countedBookings = useMemo(() => {
//     if (!touristDestinationWithBookings?.length) return createEmptyMonths();
//     return buildMonthlyData(
//       touristDestinationWithBookings as DestinationWithBookings[],
//       numericYear,
//       "count",
//     );
//   }, [touristDestinationWithBookings, numericYear]);

//   const mountsByMonth = useMemo(() => {
//     if (!touristDestinationWithBookings?.length) return createEmptyMonths();
//     return buildMonthlyData(
//       touristDestinationWithBookings as DestinationWithBookings[],
//       numericYear,
//       "amount",
//     );
//   }, [touristDestinationWithBookings, numericYear]);

//   const handleChange = (event: SelectChangeEvent) => {
//     setYearSelected(event.target.value);
//   };

//   // Si tu contexto tiene su propio loading/error, úsalo aquí.
//   const loading = false;
//   const error: string | null = null;

//   return (
//     <TotalSalesByDate
//       handleChange={handleChange}
//       yearsToSelect={yearsToSelect}
//       year={yearSelected}
//       countedBookings={countedBookings}
//       loading={loading}
//       error={error}
//       mountsByMonth={mountsByMonth}
//     />
//   );
// };

// export default TotalSalesByDateContainer;
