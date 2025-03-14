import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

export interface DateRange {
  id: string;
  dates: string[];
}

interface SimpleDateSelectorProps {
  duration: number;
  selectedDates: string[];
  onDateChange: (dates: string[]) => void;
}

const SimpleDateSelector: React.FC<SimpleDateSelectorProps> = ({
  duration,
  selectedDates,
  onDateChange,
}) => {
  // Estado para manejar los rangos de fechas
  const [dateRanges, setDateRanges] = useState<DateRange[]>(() => {
    // Inicializar desde selectedDates si hay datos
    if (selectedDates.length > 0) {
      // Ordenar fechas
      const sortedDates = [...selectedDates].sort(
        (a, b) =>
          dayjs(a, "DD-MM-YYYY").valueOf() - dayjs(b, "DD-MM-YYYY").valueOf()
      );

      // Agrupar por rangos consecutivos de duración
      const ranges: DateRange[] = [];

      for (let i = 0; i < sortedDates.length; i += duration) {
        const chunk = sortedDates.slice(i, i + duration);
        ranges.push({
          id: `range-${ranges.length}`,
          dates: chunk,
        });
      }

      return ranges;
    }
    return [];
  });

  // Estado para el diálogo de selección de fecha
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  // Abrir diálogo para agregar fecha
  const handleOpenDialog = () => {
    setSelectedDate(null);
    setOpenDialog(true);
  };

  // Cerrar diálogo
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Agregar un nuevo rango de fechas
  const handleAddDateRange = () => {
    if (!selectedDate) return;

    // Generar el rango de fechas según la duración
    const newDates = Array.from({ length: duration }, (_, i) =>
      dayjs(selectedDate).add(i, "day").format("DD-MM-YYYY")
    );

    // Verificar si alguna fecha ya está seleccionada
    const allExistingDates = dateRanges.flatMap((range) => range.dates);
    const overlappingDates = newDates.filter((date) =>
      allExistingDates.includes(date)
    );

    if (overlappingDates.length > 0) {
      alert(
        `Las siguientes fechas ya están seleccionadas: ${overlappingDates.join(
          ", "
        )}`
      );
      return;
    }

    // Agregar el nuevo rango
    const newRange: DateRange = {
      id: `range-${Date.now()}`, // Usar timestamp para garantizar ID único
      dates: newDates,
    };

    const updatedRanges = [...dateRanges, newRange];
    setDateRanges(updatedRanges);

    // Actualizar componente padre
    const allDates = updatedRanges.flatMap((range) => range.dates);
    onDateChange(allDates);

    // Cerrar el diálogo
    handleCloseDialog();
  };

  // Eliminar un rango específico
  const handleRemoveRange = (rangeId: string) => {
    const updatedRanges = dateRanges.filter((range) => range.id !== rangeId);
    setDateRanges(updatedRanges);

    // Actualizar componente padre
    const allDates = updatedRanges.flatMap((range) => range.dates);
    onDateChange(allDates);
  };

  // Eliminar todos los rangos
  const handleClearAllRanges = () => {
    setDateRanges([]);
    onDateChange([]);
  };

  // Formatear fecha para mostrar
  const formatDateRange = (range: DateRange): string => {
    if (range.dates.length === 0) return "";
    if (range.dates.length === 1) return range.dates[0];

    return `${range.dates[0]} al ${range.dates[range.dates.length - 1]}`;
  };

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="subtitle1">Fechas Disponibles</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          size="small"
        >
          Agregar Fecha
        </Button>
      </Box>

      {/* Lista de rangos de fechas */}
      <Box sx={{ mb: 2 }}>
        {dateRanges.length > 0 ? (
          <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {dateRanges.map((range) => (
                <Box
                  key={range.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    bgcolor: "#5f5f5f",
                    borderRadius: 1,
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      {formatDateRange(range)}
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {range.dates.map((date, index) => (
                        <Chip
                          key={`${range.id}-${index}`}
                          label={date}
                          size="small"
                          variant="outlined"
                          sx={{
                            // bgcolor: "#e3f2fd",
                            border: "1px solid #90caf9",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <IconButton
                    color="error"
                    onClick={() => handleRemoveRange(range.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>

            {/* Botón para limpiar todas las fechas */}
            {dateRanges.length > 1 && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={handleClearAllRanges}
                  startIcon={<DeleteIcon />}
                >
                  Limpiar todas
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Typography color="error">No hay fechas seleccionadas</Typography>
        )}
      </Box>

      {/* Diálogo para seleccionar fechas */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Seleccionar Fecha Inicial
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Se generará un rango de {duration} días a partir de la fecha
              seleccionada.
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha inicial"
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
                disablePast
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>

            {selectedDate && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2">
                  Vista previa del rango:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                  {Array.from({ length: duration }, (_, i) => (
                    <Chip
                      key={i}
                      label={dayjs(selectedDate)
                        .add(i, "day")
                        .format("DD-MM-YYYY")}
                      size="small"
                      // sx={{ bgcolor: "#e3f2fd" }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={handleAddDateRange}
            variant="contained"
            color="primary"
            disabled={!selectedDate}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SimpleDateSelector;
