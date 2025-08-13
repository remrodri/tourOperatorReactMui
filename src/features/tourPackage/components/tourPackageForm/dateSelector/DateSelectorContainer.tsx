import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Chip,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Stack,
//   Autocomplete,
//   TextField,
// } from "@mui/material";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
import { DateRangeType } from "../../../types/DateRangeType";
import { User } from "../../../../userManagement/types/User";
import { useNewSnackbar } from "../../../../../context/SnackbarContext";
// import TextType from "../../../../../TextAnimations/TextType/TextType";
import DateSelector from "./DateSelector";
import { useDateRangeContext } from "../../../../dateRange/context/DateRangeContext";

interface SimpleDateSelectorProps {
  guides: User[];
  duration: number;
  // dateRanges: DateRangeType[];
  dateRanges: DateRangeType[];
  onDateChange: (dates: DateRangeType[]) => void;
  isEditing: boolean;
}

const SimpleDateSelector: React.FC<SimpleDateSelectorProps> = ({
  guides,
  duration,
  dateRanges,
  onDateChange,
  isEditing,
}) => {
  // console.log("dateRanges::: ", dateRanges);
  const [dateRangesAux, setDateRangesAux] = useState<DateRangeType[]>([]);
  const { getDateRangeInfoById } = useDateRangeContext();

  const getDateRangesInfo = (dateRanges: DateRangeType[]) => {
    const dateRangesInfo = dateRanges
      .map((dateRange) => {
        if (!dateRange.id) {
          // Si no tiene id, es nuevo, lo devolvemos tal cual
          return dateRange;
        }
        // Si tiene id, tratamos de buscarlo en el contexto
        return getDateRangeInfoById(dateRange.id) || dateRange;
      })
      .filter((dr): dr is DateRangeType => !!dr);

    setDateRangesAux(dateRangesInfo);
  };

  // Cargar fechas cuando entra en modo edición
  useEffect(() => {
    if (isEditing && dateRanges?.length) {
      getDateRangesInfo(dateRanges);
    }
  }, [dateRanges, isEditing]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedGuides, setSelectedGuides] = useState<User[]>([]);
  const { showSnackbar } = useNewSnackbar();

  const handleOpenDialog = () => {
    setSelectedDate(null);
    setSelectedGuides([]);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //  Agregar un nuevo rango de fechas
  const handleAddDateRange = () => {
    if (!selectedDate) return;

    const newDates = Array.from({ length: duration }, (_, i) =>
      dayjs(selectedDate).add(i, "day").format("DD-MM-YYYY")
    );

    // Verificar si alguna fecha ya está seleccionada
    const allExistingDates = dateRangesAux.flatMap((range) => range.dates);
    const overlappingDates = newDates.filter((date) =>
      allExistingDates.includes(date)
    );

    if (overlappingDates.length > 0) {
      // alert(
      //   `Las siguientes fechas ya están seleccionadas: ${overlappingDates.join(
      //     ", "
      //   )}`
      // );
      showSnackbar(`${overlappingDates.join(", ")} ya seleccionado`, "error");

      return;
    }

    //  Crear un nuevo objeto `DateRangeType`
    const newRange: DateRangeType = {
      // id: `range-${Date.now()}`,
      // state: "available", // Estado por defecto (ajustable)
      dates: newDates,
      guides: selectedGuides.map((guide) => guide.id || ""),
    };

    const updatedRanges = [...dateRangesAux, newRange];
    setDateRangesAux(updatedRanges);
    onDateChange(updatedRanges);

    //Reset selected guides
    setSelectedGuides([]);
    handleCloseDialog();
  };

  //  Eliminar un rango de fechas
  // const handleRemoveRange = (rangeId: string | undefined) => {
  //   if (rangeId === undefined) return;
  //   // const updatedRanges = dateRangesAux.filter((range) => range.id !== rangeId);
  //   // setDateRangesAux(updatedRanges);
  //   // onDateChange(updatedRanges);
  // };
  const handleRemoveRange = (index: number) => {
    const updatedRanges = [...dateRangesAux];
    updatedRanges.splice(index, 1);
    setDateRangesAux(updatedRanges);
    onDateChange(updatedRanges);
  };

  //  Eliminar todos los rangos
  const handleClearAllRanges = () => {
    setDateRangesAux([]);
    onDateChange([]);
  };

  return (
    <DateSelector
      guides={guides}
      duration={duration}
      dateRangesAux={dateRangesAux}
      handleAddDateRange={handleAddDateRange}
      handleRemoveRange={handleRemoveRange}
      handleClearAllRanges={handleClearAllRanges}
      openDialog={openDialog}
      handleCloseDialog={handleCloseDialog}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      selectedGuides={selectedGuides}
      setSelectedGuides={setSelectedGuides}
      handleOpenDialog={handleOpenDialog}
      isEditing={isEditing}
    />
  );
};

export default SimpleDateSelector;
