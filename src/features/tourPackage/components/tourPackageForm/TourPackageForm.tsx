/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Alert,
  InputAdornment,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { FormikProps } from "formik";

import TextType from "../../../../TextAnimations/TextType/TextType";
import DayItineraryManager from "../itineraryManager/DayItineraryManager";
import DateSelectorContainer from "./dateSelector/DateSelectorContainer";
import { TourPackageFormValues } from "./TourPackageFormContainer";
import { UserType } from "../../../userManagement/types/UserType";

const TOUR_PACKAGE_MAX_PRICE = 100_000;
/* ============================
   Helpers UX (MISMO PATRÓN)
============================ */
function useFieldHelpers<T extends Record<string, any>>(
  formik: FormikProps<T>,
  helpers: Partial<Record<keyof T, string>>,
) {
  const isFieldTouched = (name: keyof T) =>
    Boolean((formik.touched as any)[name]);
  const getFieldError = (name: keyof T) =>
    (formik.errors as any)[name] as string | undefined;

  const hasError = (name: keyof T) =>
    isFieldTouched(name) && Boolean(getFieldError(name));

  const helperText = (name: keyof T) => {
    if (hasError(name)) return getFieldError(name);
    return helpers[name] ?? " ";
  };

  return { hasError, helperText };
}

/* ============================
   Microcopy por campo
============================ */

const fieldGuides: Partial<Record<keyof TourPackageFormValues, string>> = {
  name: "Ej: Tour Aventura Carrasco (mín. 3 caracteres)",
  tourType: "Selecciona la categoría del tour",
  touristDestination: "Selecciona el destino principal",
  duration: "Cantidad de días del tour (mín. 1)",
  price: `Precio total del paquete. Máximo permitido: Bs. ${TOUR_PACKAGE_MAX_PRICE.toLocaleString()}`,
};


/* ============================
   Props
============================ */
interface Props {
  open: boolean;
  handleClick: () => void;
  formik: FormikProps<TourPackageFormValues>;
  tourTypes: Array<{ id: string; name: string }>;
  touristDestinations: Array<{ id: string; name: string }>;
  guides: UserType[];
  isEditing: boolean;
}

/* ============================
   Component
============================ */
const TourPackageForm: React.FC<Props> = ({
  open,
  handleClick,
  formik,
  tourTypes,
  touristDestinations,
  guides,
  isEditing,
}) => {
  const { hasError, helperText } = useFieldHelpers(formik, fieldGuides);

  const duration =
    formik.values.duration === "" ? 1 : Number(formik.values.duration);

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason === "backdropClick") return;
        handleClick();
      }}
      fullWidth
      maxWidth="md"
    >
      <TextType
        text={
          isEditing ? "Editar paquete turístico" : "Nuevo paquete turístico"
        }
        as={DialogTitle}
        typingSpeed={40}
        showCursor
        cursorCharacter="_"
      />

      <IconButton
        aria-label="close"
        onClick={handleClick}
        sx={{ position: "absolute", right: 12, top: 12 }}
      >
        <Close />
      </IconButton>

      <DialogContent dividers>
        {/* Bloque informativo (MISMO ESTILO QUE USER) */}
        <Alert severity="info" sx={{ mb: 2 }}>
          {isEditing
            ? "Edita la información del paquete turístico. La duración no puede modificarse."
            : "Crea un nuevo paquete turístico. Primero define fechas y luego el itinerario."}
        </Alert>

        <form onSubmit={formik.handleSubmit} noValidate>
          {/* Nombre */}
          <TextField
            fullWidth
            size="small"
            label="Nombre del paquete"
            {...formik.getFieldProps("name")}
            error={hasError("name")}
            helperText={helperText("name")}
            sx={{ mb: 2 }}
          />

          {/* Tipo de tour */}
          <FormControl
            fullWidth
            size="small"
            error={hasError("tourType")}
            sx={{ mb: 0.5 }}
          >
            <InputLabel>Tipo de tour</InputLabel>
            <Select label="Tipo de tour" {...formik.getFieldProps("tourType")}>
              {tourTypes.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography
            variant="caption"
            color={hasError("tourType") ? "error" : "text.secondary"}
            sx={{ display: "block", mb: 2 }}
          >
            {helperText("tourType")}
          </Typography>

          {/* Destino */}
          <FormControl
            fullWidth
            size="small"
            error={hasError("touristDestination")}
            sx={{ mb: 0.5 }}
          >
            <InputLabel>Destino turístico</InputLabel>
            <Select
              label="Destino turístico"
              {...formik.getFieldProps("touristDestination")}
            >
              {touristDestinations.map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography
            variant="caption"
            color={hasError("touristDestination") ? "error" : "text.secondary"}
            sx={{ display: "block", mb: 2 }}
          >
            {helperText("touristDestination")}
          </Typography>

          {/* Duración / Precio */}
          <Box display="flex" gap={2} mb={2}>
            <TextField
              fullWidth
              size="small"
              label="Duración"
              type="number"
              value={formik.values.duration}
              onChange={(e) =>
                formik.setFieldValue(
                  "duration",
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
              error={hasError("duration")}
              helperText={helperText("duration")}
              disabled={isEditing}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">día(s)</InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              size="small"
              label="Precio"
              type="number"
              value={formik.values.price}
              onChange={(e) =>
                formik.setFieldValue(
                  "price",
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
              error={hasError("price")}
              helperText={helperText("price")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Bs.</InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Fechas */}
          {!isEditing && (
            <DateSelectorContainer
              guides={guides}
              duration={duration}
              isEditing={isEditing}
              formik={formik}
            />
          )}

          {/* Itinerario */}
          <Box mt={3}>
            <Typography variant="subtitle1" gutterBottom>
              Itinerario
            </Typography>
            <DayItineraryManager
              duration={duration}
              itinerary={formik.values.itinerary}
              onChange={(itinerary) =>
                formik.setFieldValue("itinerary", itinerary)
              }
            />
          </Box>

          {/* Botones (MISMO LAYOUT QUE USER) */}
          <Box display="flex" gap={2} mt={3}>
            <Button type="submit" fullWidth variant="contained" color="success">
              {isEditing ? "Actualizar" : "Registrar"}
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleClick}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TourPackageForm;
