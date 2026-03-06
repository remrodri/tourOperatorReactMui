import React, { useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { FormikProps } from "formik";

import DateSelector from "./DateSelector";
import { DateRangeType } from "../../../types/DateRangeType";
import { UserType } from "../../../../userManagement/types/UserType";
import { useNewSnackbar } from "../../../../../context/SnackbarContext";

// Ajusta esta ruta a donde tengas tu type
import { TourPackageFormValues } from "../TourPackageFormContainer";

interface DateSelectorContainerProps {
  guides: UserType[];
  duration: number; // SIEMPRE number
  isEditing: boolean;
  formik: FormikProps<TourPackageFormValues>;
}

const DateSelectorContainer: React.FC<DateSelectorContainerProps> = ({
  guides,
  duration,
  isEditing,
  formik,
}) => {
  const { showSnackbar } = useNewSnackbar();

  // Fuente de verdad: Formik
  const dateRanges = useMemo<DateRangeType[]>(
    () =>
      (formik.values.dateRanges ?? []).map((r) => ({
        ...r,
        dates: r.dates ?? [],
        guides: r.guides ?? [],
      })),
    [formik.values.dateRanges],
  );

  // UI state del dialog (esto sí es local)
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedGuides, setSelectedGuides] = useState<UserType[]>([]);

  const setFormikRanges = (ranges: DateRangeType[]) => {
    // ✅ clave para que Yup muestre errores si corresponde
    formik.setFieldTouched("dateRanges", true, true);
    formik.setFieldValue("dateRanges", ranges, true);
  };

  const handleOpenDialog = () => {
    setSelectedDate(null);
    setSelectedGuides([]);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleAddDateRange = () => {
    if (!selectedDate) return;

    if (duration <= 0) {
      showSnackbar("La duración debe ser mayor a 0", "error");
      return;
    }

    if (selectedGuides.length === 0) {
      showSnackbar("Debes asignar al menos un guía", "error");
      return;
    }

    const newDates = Array.from({ length: duration }, (_, i) =>
      dayjs(selectedDate).add(i, "day").format("DD-MM-YYYY"),
    );

    // Validar solapamientos con rangos existentes
    const allExistingDates = dateRanges.flatMap((r) => r.dates ?? []);
    const overlapping = newDates.filter((d) => allExistingDates.includes(d));

    if (overlapping.length > 0) {
      showSnackbar(`${overlapping.join(", ")} ya seleccionado`, "error");
      return;
    }

    const newRange: DateRangeType = {
      dates: newDates,
      guides: selectedGuides.map((g) => g.id || ""),
    };

    setFormikRanges([...dateRanges, newRange]);

    // reset
    setSelectedGuides([]);
    handleCloseDialog();
  };

  const handleRemoveRange = (index: number) => {
    const next = [...dateRanges];
    next.splice(index, 1);
    setFormikRanges(next);
  };

  const handleClearAllRanges = () => {
    setFormikRanges([]);
  };

  return (
    <DateSelector
      guides={guides}
      duration={duration}
      dateRanges={dateRanges}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      selectedGuides={selectedGuides}
      setSelectedGuides={setSelectedGuides}
      handleAddDateRange={handleAddDateRange}
      handleRemoveRange={handleRemoveRange}
      handleClearAllRanges={handleClearAllRanges}
      isEditing={isEditing}
    />
  );
};

export default DateSelectorContainer;
