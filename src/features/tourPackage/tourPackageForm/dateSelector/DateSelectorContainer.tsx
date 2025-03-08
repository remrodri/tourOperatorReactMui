import dayjs, { Dayjs } from "dayjs";
// import DateSelector from "./DateSelector";
import { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import DateSelector from "./DateSelector";

// Define a new interface for date ranges
export interface DateRange {
  id: string;
  dates: string[];
}

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
  // Convert flat array of selectedDates to an array of DateRange objects
  const [dateRanges, setDateRanges] = useState<DateRange[]>(() => {
    // If there are selected dates, group them into ranges based on duration
    if (selectedDates.length > 0) {
      const ranges: DateRange[] = [];
      let currentGroup: string[] = [];

      for (let i = 0; i < selectedDates.length; i++) {
        if (i % duration === 0 && i !== 0) {
          ranges.push({
            id: `range-${ranges.length}`,
            dates: [...currentGroup],
          });
          currentGroup = [];
        }
        currentGroup.push(selectedDates[i]);
      }

      if (currentGroup.length > 0) {
        ranges.push({
          id: `range-${ranges.length}`,
          dates: [...currentGroup],
        });
      }

      return ranges;
    }

    return [];
  });

  // Function to handle new date selection
  const handleDateSelection = (date: Dayjs | null) => {
    if (!date) return;

    const newDates = Array.from({ length: duration }, (_, i) =>
      dayjs(date).add(i, "day").format("DD-MM-YYYY")
    );

    // Check if any date in the new range is in the blocked dates
    if (newDates.some((d) => blockedDates.includes(d))) {
      alert(
        "las fechas selecciondas se encuentran en conflicto con otras reservas"
      );
      return;
    }

    // Check if any date in the new range is already in an existing range
    const allExistingDates = dateRanges.flatMap((range) => range.dates);
    if (newDates.some((d) => allExistingDates.includes(d))) {
      alert(
        "No se puede seleccionar una fecha que ya forma parte de un rango seleccionado"
      );
      return;
    }

    // Add new date range instead of replacing
    const newDateRanges = [
      ...dateRanges,
      {
        id: `range-${dateRanges.length}`,
        dates: newDates,
      },
    ];

    setDateRanges(newDateRanges);

    // Update parent component with all dates flattened
    const allDates = newDateRanges.flatMap((range) => range.dates);
    onDateChange(allDates);
  };

  // Function to remove a specific date range
  const handleRemoveDateRange = (rangeId: string) => {
    const updatedRanges = dateRanges.filter((range) => range.id !== rangeId);
    setDateRanges(updatedRanges);

    // Update parent component with all dates flattened
    const allDates = updatedRanges.flatMap((range) => range.dates);
    onDateChange(allDates);
  };

  // Function to clear all date ranges
  const handleClearAllDates = () => {
    setDateRanges([]);
    onDateChange([]);
  };

  // Reset selected dates when duration changes
  useEffect(() => {
    setDateRanges([]);
    onDateChange([]);
    console.log("::: ");
  }, [duration]); // Only depend on duration, not onDateChange

  return (
    <DateSelector
      handleDateSelection={handleDateSelection}
      blockedDates={blockedDates}
      selectedDates={selectedDates}
      dateRanges={dateRanges}
      onRemoveRange={handleRemoveDateRange}
      onClearAllDates={handleClearAllDates}
    />
  );
};
export default DateSelectorContainer;
