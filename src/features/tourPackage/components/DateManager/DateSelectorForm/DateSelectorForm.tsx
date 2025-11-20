import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import Chip from "@mui/material/Chip";
import { User } from "../../../../user/types/User";
import { FormikProps } from "formik";
import { DateRangeFormValues } from "./DateSelectorFormContainer";
import customParseFormat from "dayjs/plugin/customParseFormat";
import TextType from "../../../../../TextAnimations/TextType/TextType";

dayjs.extend(customParseFormat);

interface DateSelectorFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  duration: number;
  guides: User[];
  formik: FormikProps<DateRangeFormValues>;
  blockedDates: string[];
}

const DateSelectorForm: React.FC<DateSelectorFormProps> = ({
  openDialog,
  handleCloseDialog,
  duration,
  guides,
  formik,
  blockedDates,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  // Fecha inicial = primer elemento del array dates
  const selectedDate =
    formik.values.dates.length > 0
      ? dayjs(formik.values.dates[0], "DD-MM-YYYY")
      : null;

  // Guías seleccionados = mapear ids de formik a objetos User
  const selectedGuides = guides.filter((g) =>
    formik.values.guides.includes(g.id)
  );

  // Condición para habilitar botón
  const isFormValid = selectedDate !== null && formik.values.guides.length > 0;

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      maxWidth="xs"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <TextType
            text={"Seleccionar fecha"}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="_"
          />
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Se generará el rango de {duration} día(s) a partir de la fecha
            seleccionada.
          </Typography>

          {/* DatePicker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha inicial"
              value={selectedDate}
              onChange={(newDate) => {
                if (newDate) {
                  const dates = Array.from({ length: duration }, (_, i) =>
                    newDate.add(i, "day").format("DD-MM-YYYY")
                  );
                  formik.setFieldValue("dates", dates);
                }
              }}
              format="DD-MM-YYYY"
              sx={{ width: "100%" }}
              shouldDisableDate={(day) =>
                blockedDates.some((d) =>
                  dayjs(d, "DD-MM-YYYY").isSame(day, "day")
                )
              }
            />
          </LocalizationProvider>

          {/* Preview del rango */}
          {selectedDate && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">
                Vista previa del rango:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {formik.values.dates.map((date, i) => (
                  <Chip key={i} label={date} size="small" />
                ))}
              </Box>
            </Box>
          )}

          {/* Autocomplete para guías */}
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Autocomplete
              multiple
              id="tags-guide"
              options={guides}
              value={selectedGuides}
              onChange={(event, newValue) => {
                const guideIds = newValue.map((g) => g.id);
                formik.setFieldValue("guides", guideIds);
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
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormValid}
          >
            {formik.values.id ? "Actualizar" : "Agregar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DateSelectorForm;
