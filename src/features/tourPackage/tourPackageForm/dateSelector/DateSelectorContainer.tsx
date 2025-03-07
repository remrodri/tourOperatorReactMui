import dayjs, { Dayjs } from "dayjs";
import DateSelector from "./DateSelector";
import { useState } from "react";
import { Box, TextField } from "@mui/material";

interface DateSelectorContainerProps {
  duration: number;
  selectedDates: string[];
  blockedDates: string[];
  onDateChange: (dates: string[]) => void;
}

const DateSelectorContainer: React.FC<DateSelectorContainerProps> = ({
  duration,
  selectedDates,
  blockedDates,
  onDateChange,
}) => {
  // const [duration, setDuration] = useState(1);
  const handleDateSelection = (date: Dayjs | null) => {
    if (!date) return;

    const newDates = Array.from({ length: duration }, (_, i) =>
      dayjs(date).add(i, "day").format("DD-MM-YYYY")
    );

    if (newDates.some((d) => blockedDates.includes(d))) {
      alert(
        "las fechas selecciondas se encuentran en conflicto con otras reservas"
      );
      return;
    }
    onDateChange(newDates);
  };
  return (
    <DateSelector
      handleDateSelection={handleDateSelection}
      blockedDates={blockedDates}
      selectedDates={selectedDates}
    />
  );
};
export default DateSelectorContainer;
