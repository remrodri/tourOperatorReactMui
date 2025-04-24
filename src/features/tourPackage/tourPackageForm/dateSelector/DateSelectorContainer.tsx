import React, { useState, useEffect } from "react";
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
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { DateRangeType } from "../../types/DateRangeType";
import { User } from "../../../userManagement/types/User";
import { useNewSnackbar } from "../../../../context/SnackbarContext";

interface SimpleDateSelectorProps {
  guides: User[];
  duration: number;
  // dateRanges: DateRangeType[];
  dateRanges: DateRangeType[];
  onDateChange: (dates: DateRangeType[]) => void;
}

const SimpleDateSelector: React.FC<SimpleDateSelectorProps> = ({
  guides,
  duration,
  dateRanges,
  onDateChange,
}) => {
  const [dateRangesAux, setDateRangesAux] = useState<DateRangeType[]>([]);
  // Cargar fechas cuando entra en modo edición
  useEffect(() => {
    setDateRangesAux(dateRanges || []);
  }, [dateRanges]);

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
  const handleRemoveRange = (rangeId: string | undefined) => {
    if (rangeId === undefined) return;
    // const updatedRanges = dateRangesAux.filter((range) => range.id !== rangeId);
    // setDateRangesAux(updatedRanges);
    // onDateChange(updatedRanges);
  };

  //  Eliminar todos los rangos
  const handleClearAllRanges = () => {
    setDateRangesAux([]);
    onDateChange([]);
  };

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
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

      {/*  Lista de rangos de fechas */}
      <Box sx={{ mb: 2 }}>
        {dateRangesAux.length > 0 ? (
          <>
            {dateRangesAux.map((range, index) => (
              <Box
                key={index}
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
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    {range.dates?.[0] && range.dates[range.dates.length - 1]
                      ? `${range.dates[0]} al ${
                          range.dates[range.dates.length - 1]
                        }`
                      : "Fechas no disponibles"}
                  </Typography>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {range.dates?.map((date, index) => (
                      <Chip key={index} label={date} size="small" />
                    )) || []}
                  </Box>
                  {/* Display assigned guides */}
                  {range.guides && range.guides.length > 0 && (
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                        Guia(s) asignado(s):
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                          mt: 0.5,
                        }}
                      >
                        {range.guides.map((guideId) => {
                          const guide = guides.find((g) => g.id === guideId);
                          return guide ? (
                            <Chip
                              key={guide.id}
                              label={`${guide.firstName} ${guide.lastName}`}
                              size="small"
                              variant="filled"
                              color="primary"
                            />
                          ) : null;
                        })}
                      </Box>
                    </Box>
                  )}
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

            {dateRangesAux.length > 1 && (
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

      {/*  Diálogo para seleccionar fechas */}
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
                  />
                ))}
              </Box>
            </Box>
          )}
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Autocomplete
              multiple
              id="tags-guide"
              options={guides}
              value={selectedGuides}
              onChange={(event, newValue) => {
                setSelectedGuides(newValue);
              }}
              getOptionLabel={(guide) => `${guide.firstName} ${guide.lastName}`}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Guia(s) asignado(s)"
                  placeholder="Elegir guia"
                />
              )}
            />
          </Stack>
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
