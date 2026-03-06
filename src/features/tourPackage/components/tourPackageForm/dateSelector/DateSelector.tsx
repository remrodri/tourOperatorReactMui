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
  Alert,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import { UserType } from "../../../../userManagement/types/UserType";
import { DateRangeType } from "../../../types/DateRangeType";
import DateSelectorCard from "./card/DateSelectorCard";

/* ============================
   Microcopy / Guides
============================ */
const dateSelectorGuides = {
  empty: "Agrega al menos un rango de fechas y asigna un guía.",
  duration: "El rango se generará automáticamente según la duración del tour.",
  guides: "Debes asignar al menos un guía por rango de fechas.",
};

interface DateSelectorProps {
  guides: UserType[];
  duration: number;

  // ✅ fuente de verdad
  dateRanges: DateRangeType[];

  // UI state
  openDialog: boolean;
  handleOpenDialog: () => void;
  handleCloseDialog: () => void;

  selectedDate: Dayjs | null;
  setSelectedDate: (date: Dayjs | null) => void;

  selectedGuides: UserType[];
  setSelectedGuides: (guides: UserType[]) => void;

  // Actions
  handleAddDateRange: () => void;
  handleRemoveRange: (index: number) => void;
  handleClearAllRanges: () => void;

  isEditing: boolean;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  guides,
  duration,
  dateRanges,
  openDialog,
  handleOpenDialog,
  handleCloseDialog,
  selectedDate,
  setSelectedDate,
  selectedGuides,
  setSelectedGuides,
  handleAddDateRange,
  handleRemoveRange,
  handleClearAllRanges,
  isEditing,
}) => {
  const canAdd = Boolean(selectedDate) && selectedGuides.length > 0;
  const hasRanges = dateRanges.length > 0;

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography variant="subtitle1">Fechas disponibles</Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          size="small"
          disabled={isEditing}
        >
          Agregar fecha
        </Button>
      </Box>

      {/* Helper / Error (MISMO PATRÓN QUE UserForm) */}
      <Typography
        variant="caption"
        color={hasRanges ? "text.secondary" : "error"}
        sx={{ display: "block", mb: 2 }}
      >
        {hasRanges ? dateSelectorGuides.duration : dateSelectorGuides.empty}
      </Typography>

      {/* Lista de rangos */}
      <Box sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        {hasRanges && (
          <>
            {dateRanges.map((range, index) => (
              <DateSelectorCard
                key={index}
                range={range}
                guides={guides}
                index={index}
                handleRemoveRange={handleRemoveRange}
                isEditing={isEditing}
              />
            ))}

            {dateRanges.length > 1 && !isEditing && (
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
        )}
      </Box>

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Seleccionar fecha
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* Guide visible */}
          <Alert severity="info">
            {dateSelectorGuides.duration} ({duration} día(s)).
          </Alert>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha inicial"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              disablePast
              format="DD-MM-YYYY"
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

          <Stack spacing={1} sx={{ mt: 2 }}>
            <Autocomplete
              multiple
              options={guides}
              value={selectedGuides}
              onChange={(_, newValue) => setSelectedGuides(newValue)}
              getOptionLabel={(g) => `${g.firstName} ${g.lastName}`}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Asignar guía"
                  placeholder="Agregar guía"
                />
              )}
            />

            {/* Helper / Error consistente */}
            <Typography
              variant="caption"
              color={selectedGuides.length === 0 ? "error" : "text.secondary"}
            >
              {selectedGuides.length === 0 ? dateSelectorGuides.guides : " "}
            </Typography>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" color="error">
            Cancelar
          </Button>
          <Button
            onClick={handleAddDateRange}
            variant="contained"
            color="primary"
            disabled={!canAdd}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DateSelector;
