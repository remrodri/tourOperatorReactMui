import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import DateSelector from "./DateSelector";

// Define a new interface for date ranges
export interface DateRange {
  id: string;
  dates: string[];
}

interface DateSelectorContainerProps {
  duration: number;
  selectedDates: string[];
  onDateChange: (dates: string[]) => void;
}

const DateSelectorContainer2: React.FC<DateSelectorContainerProps> = ({
  duration,
  selectedDates,
  onDateChange,
}) => {
  // Estado local para almacenar los rangos de fechas
  const [dateRanges, setDateRanges] = useState<DateRange[]>([]);

  // Este useEffect se ejecuta cuando cambia selectedDates desde el exterior
  // Convierte el array plano de fechas en rangos agrupados según la duración
  // useEffect(() => {
  //   if (selectedDates.length > 0) {
  //     // Ordenamos las fechas para asegurar que estén en orden cronológico
  //     const sortedDates = [...selectedDates].sort(
  //       (a, b) =>
  //         dayjs(a, "DD-MM-YYYY").valueOf() - dayjs(b, "DD-MM-YYYY").valueOf()
  //     );

  //     // Agrupamos las fechas en rangos consecutivos
  //     const ranges: DateRange[] = [];
  //     let currentGroup: string[] = [];
  //     let prevDate: Dayjs | null = null;

  //     sortedDates.forEach((dateStr, index) => {
  //       const currentDate = dayjs(dateStr, "DD-MM-YYYY");

  //       // Si es la primera fecha o si la fecha actual está consecutiva con la anterior
  //       // o si estamos dentro del rango de duración, añadir a grupo actual
  //       if (
  //         prevDate === null ||
  //         currentDate.diff(prevDate, "day") === 1 ||
  //         (currentGroup.length > 0 && currentGroup.length < duration)
  //       ) {
  //         currentGroup.push(dateStr);
  //       } else {
  //         // Si no es consecutiva, cerrar el grupo actual y empezar uno nuevo
  //         if (currentGroup.length > 0) {
  //           ranges.push({
  //             id: `range-${ranges.length}`,
  //             dates: [...currentGroup],
  //           });
  //         }
  //         currentGroup = [dateStr];
  //       }

  //       prevDate = currentDate;

  //       // Para la última fecha, asegurarse de añadir el grupo final
  //       if (index === sortedDates.length - 1 && currentGroup.length > 0) {
  //         ranges.push({
  //           id: `range-${ranges.length}`,
  //           dates: [...currentGroup],
  //         });
  //       }
  //     });

  //     setDateRanges(ranges);
  //   } else {
  //     setDateRanges([]);
  //   }
  // }, [selectedDates, duration]);

  // Función para manejar la selección de nuevas fechas
  const handleDateSelection = (date: Dayjs | null) => {
    if (!date) return;

    const newDates = Array.from({ length: duration }, (_, i) =>
      dayjs(date).add(i, "day").format("DD-MM-YYYY")
    );

    // Verificar si alguna fecha en el nuevo rango ya existe
    const allExistingDates = dateRanges.flatMap((range) => range.dates);
    if (newDates.some((d) => allExistingDates.includes(d))) {
      alert(
        "No se puede seleccionar una fecha que ya forma parte de un rango seleccionado"
      );
      return;
    }

    // Añadir nuevo rango
    const newDateRanges = [
      ...dateRanges,
      {
        id: `range-${dateRanges.length}`,
        dates: newDates,
      },
    ];

    setDateRanges(newDateRanges);

    // Actualizar componente padre con todas las fechas
    const allDates = newDateRanges.flatMap((range) => range.dates);
    onDateChange(allDates);
  };

  // Función para eliminar un rango de fechas específico
  const handleRemoveDateRange = (rangeId: string) => {
    const updatedRanges = dateRanges.filter((range) => range.id !== rangeId);
    setDateRanges(updatedRanges);

    // Actualizar componente padre
    const allDates = updatedRanges.flatMap((range) => range.dates);
    onDateChange(allDates);
  };

  // Función para limpiar todas las fechas
  const handleClearAllDates = () => {
    setDateRanges([]);
    onDateChange([]);
  };

  // Resetear fechas cuando cambia la duración
  useEffect(() => {
    // Opcional: si quieres mantener los rangos existentes cuando cambia la duración,
    // comenta estas líneas
    // setDateRanges([]);
    // onDateChange([]);
  }, [duration]);

  return (
    <DateSelector
      handleDateSelection={handleDateSelection}
      selectedDates={selectedDates}
      dateRanges={dateRanges}
      onRemoveRange={handleRemoveDateRange}
      onClearAllDates={handleClearAllDates}
    />
  );
};

export default DateSelectorContainer2;
