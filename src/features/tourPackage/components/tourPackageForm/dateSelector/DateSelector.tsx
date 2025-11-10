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
  Card,
} from "@mui/material";
import { User } from "../../../../userManagement/types/User";
import { DateRangeType } from "../../../types/DateRangeType";
import TextType from "../../../../../TextAnimations/TextType/TextType";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import DateSelectorCard from "./card/DateSelectorCard";

interface DateSelectorProps {
  guides: User[];
  duration: number;
  dateRangesAux: DateRangeType[];
  handleAddDateRange: () => void;
  // handleRemoveRange: (rangeId: string | undefined) => void;
  handleRemoveRange: (index: number) => void;
  handleClearAllRanges: () => void;
  openDialog: boolean;
  handleCloseDialog: () => void;
  selectedDate: Dayjs | null;
  setSelectedDate: (date: Dayjs | null) => void;
  selectedGuides: User[];
  setSelectedGuides: (guides: User[]) => void;
  handleOpenDialog: () => void;
  isEditing: boolean;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  guides,
  duration,
  dateRangesAux,
  handleAddDateRange,
  handleRemoveRange,
  handleClearAllRanges,
  openDialog,
  handleCloseDialog,
  selectedDate,
  setSelectedDate,
  selectedGuides,
  setSelectedGuides,
  handleOpenDialog,
  isEditing,
}) => {
  // console.log("guides", guides);
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
      <Box sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        {dateRangesAux.length > 0 ? (
          <>
            {dateRangesAux.map((range, index) => (
              <DateSelectorCard
                key={index}
                range={range}
                guides={guides}
                index={index}
                handleRemoveRange={handleRemoveRange}
                isEditing={isEditing}
              />
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
          Seleccionar fecha
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Se generará el rango de {duration} dia(s) a partir de la fecha
            seleccionada.
          </Typography>

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
                  label="Asignar guía"
                  placeholder="Agregar guía"
                />
              )}
            />
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
            disabled={!selectedDate}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DateSelector;
