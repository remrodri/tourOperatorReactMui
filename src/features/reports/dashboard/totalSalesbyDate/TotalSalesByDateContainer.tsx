import React, { useMemo, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/es";

import TotalSalesByDate from "./TotalSalesByDate";
import { useDashboardContext } from "../../context/DashboardContext";
import type { BookingType } from "../../../booking/types/BookingType";
import type { TouristDestinationWithBookings } from "../../context/DashboardContext";

dayjs.locale("es");

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

type MonthData = {
  name: string;
  counts: number[];
};

const MONTH_NAMES: MonthData["name"][] = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

/* -------------------------------------------------------------------------------------------------
 * Helpers
 * -----------------------------------------------------------------------------------------------*/

function createEmptyMonths(): MonthData[] {
  return MONTH_NAMES.map((name) => ({ name, counts: [] }));
}

function buildMonthlyData(
  destinations: TouristDestinationWithBookings[],
  year: number,
  mode: "count" | "amount",
): MonthData[] {
  const months = createEmptyMonths();

  destinations.forEach((destination) => {
    const monthTotals = new Array(12).fill(0);

    destination.filteredBookings.forEach((booking: BookingType) => {
      const bookingDate = dayjs(booking.createdAt);
      if (bookingDate.year() === year) {
        const monthIndex = bookingDate.month();
        monthTotals[monthIndex] += mode === "count" ? 1 : booking.totalPrice;
      }
    });

    monthTotals.forEach((value, index) => {
      months[index].counts.push(value);
    });
  });

  return months;
}

/* -------------------------------------------------------------------------------------------------
 * Component
 * -----------------------------------------------------------------------------------------------*/

const TotalSalesByDateContainer: React.FC = () => {
  const currentYear = dayjs().year();
  const [yearSelected, setYearSelected] = useState<string>(
    currentYear.toString(),
  );

  const { bookings, touristDestinationWithBookings } = useDashboardContext();

  /* ---------------------------------------
   * Years selector
   * ---------------------------------------*/

  const yearsToSelect = useMemo(() => {
    const years = bookings.map((b) => dayjs(b.createdAt).year());

    const uniqueYears = Array.from(new Set(years)).sort((a, b) => a - b);

    return uniqueYears.length ? uniqueYears : [currentYear];
  }, [bookings, currentYear]);

  const numericYear = Number(yearSelected);

  /* ---------------------------------------
   * Derived data
   * ---------------------------------------*/

  const countedBookings = useMemo(() => {
    if (!touristDestinationWithBookings.length) {
      return createEmptyMonths();
    }

    return buildMonthlyData(
      touristDestinationWithBookings,
      numericYear,
      "count",
    );
  }, [touristDestinationWithBookings, numericYear]);

  const mountsByMonth = useMemo(() => {
    if (!touristDestinationWithBookings.length) {
      return createEmptyMonths();
    }

    return buildMonthlyData(
      touristDestinationWithBookings,
      numericYear,
      "amount",
    );
  }, [touristDestinationWithBookings, numericYear]);

  /* ---------------------------------------
   * Handlers
   * ---------------------------------------*/

  const handleChange = (event: SelectChangeEvent) => {
    setYearSelected(event.target.value);
  };

  /* ---------------------------------------
   * Render
   * ---------------------------------------*/

  return (
    <TotalSalesByDate
      handleChange={handleChange}
      yearsToSelect={yearsToSelect}
      year={yearSelected}
      countedBookings={countedBookings}
      mountsByMonth={mountsByMonth}
    />
  );
};

export default TotalSalesByDateContainer;
