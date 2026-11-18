import React, { useMemo, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/es";

import TotalSalesByDate from "./TotalSalesByDate";
import { useDashboardContext } from "../../context/DashboardContext";

dayjs.locale("es");

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

function createEmptyMonths(): MonthData[] {
  return MONTH_NAMES.map((name) => ({ name, counts: [] }));
}

const TotalSalesByDateContainer: React.FC = () => {
  const currentYear = dayjs().year();
  const [yearSelected, setYearSelected] = useState<string>(
    currentYear.toString(),
  );

  const { yearsToSelect, monthlyByDestination } = useDashboardContext();

  const numericYear = Number(yearSelected);

  const countedBookings = useMemo(() => {
    const months = createEmptyMonths();

    monthlyByDestination.forEach((destination) => {
      const monthTotals = new Array(12).fill(0);
      destination.rows.forEach((row) => {
        if (row.year === numericYear) {
          monthTotals[row.month - 1] += row.count;
        }
      });
      monthTotals.forEach((value, index) => months[index].counts.push(value));
    });

    return months;
  }, [monthlyByDestination, numericYear]);

  const mountsByMonth = useMemo(() => {
    const months = createEmptyMonths();

    monthlyByDestination.forEach((destination) => {
      const monthTotals = new Array(12).fill(0);
      destination.rows.forEach((row) => {
        if (row.year === numericYear) {
          monthTotals[row.month - 1] += row.amount;
        }
      });
      monthTotals.forEach((value, index) => months[index].counts.push(value));
    });

    return months;
  }, [monthlyByDestination, numericYear]);

  const handleChange = (event: SelectChangeEvent) => {
    setYearSelected(event.target.value);
  };

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
