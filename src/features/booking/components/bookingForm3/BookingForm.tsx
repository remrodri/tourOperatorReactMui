/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Typography,
  Alert,
  Divider,
} from "@mui/material";
import type { FormikProps } from "formik";
import { forwardRef, ReactElement, Ref, useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import background from "../../../../assets/images/home.webp";
import { Close } from "@mui/icons-material";

import TextType from "../../../../TextAnimations/TextType/TextType";
import TouristForm from "./TouristForm";
import PaymentForm from "./PaymentForm";

import { BookingFormValues } from "./BookingFormContainer";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import { DateRangeType } from "../../../tourPackage/types/DateRangeType";
import { TouristType } from "../../types/TouristType";

/* ============================
   Helpers UX
============================ */
const bookingFieldGuides = {
  tourPackageId: "Selecciona el paquete turístico",
  dateRangeId: "Selecciona una fecha disponible",
  notes: "Notas opcionales sobre la reserva",
};

const hasError = (formik: any, path: string) =>
  Boolean(
    path.split(".").reduce((a, k) => a?.[k], formik.touched) &&
    path.split(".").reduce((a, k) => a?.[k], formik.errors),
  );

const helperText = (formik: any, path: string, fallback = " ") => {
  const err = path.split(".").reduce((a, k) => a?.[k], formik.errors);
  return hasError(formik, path) ? err : fallback;
};

/* ============================
   Transition
============================ */
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/* ============================
   Image helper
============================ */
const buildImageSrc = (img: string | File): string => {
  if (img instanceof File) return URL.createObjectURL(img);
  if (/^https?:\/\//i.test(img)) return img;

  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";
  const normalized = img.startsWith("/") ? img : `/${img}`;
  return `${base}${normalized}`;
};

/* ============================
   Props
============================ */
interface BookingFormProps {
  open: boolean;
  handleClose: () => void;
  isEditing: boolean;
  formik: FormikProps<BookingFormValues>;

  tourists: TouristType[];

  tourPackages: TourPackageType[];
  dateRanges: DateRangeType[];

  destinationImages: (string | File)[];

  handleTourPackageChange: (value: string) => void;
  handleDateRangeChange: (value: string) => void;

  handleAddAdditionalTourist: () => void;
  handleRemoveTourist: (index: number) => void;

  previewImage: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/* ============================
   Component
============================ */
const BookingForm: React.FC<BookingFormProps> = ({
  open,
  handleClose,
  isEditing,
  formik,
  tourists,
  tourPackages,
  dateRanges,
  destinationImages,
  handleTourPackageChange,
  handleDateRangeChange,
  handleAddAdditionalTourist,
  handleRemoveTourist,
  previewImage,
  handleFileChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(open), [open]);

  const closeWithTransition = () => {
    setIsOpen(false);
    setTimeout(handleClose, 300);
  };

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={closeWithTransition}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      }}
    >
      <DialogTitle sx={{ background: "rgba(0,0,0,0.45)" }}>
        <TextType
          text={isEditing ? "Editar reserva" : "Nueva reserva"}
          as="div"
          typingSpeed={40}
          showCursor
          cursorCharacter="_"
        />
      </DialogTitle>

      <IconButton
        onClick={closeWithTransition}
        sx={{ position: "absolute", right: 12, top: 12 }}
      >
        <Close />
      </IconButton>

      <DialogContent>
        <Alert severity="info" sx={{ mb: 2 }}>
          Ingresa los datos del turista. Si el CI o pasaporte ya existe, los
          datos se cargarán automáticamente.
        </Alert>

        <form onSubmit={formik.handleSubmit} noValidate>
          {/* =======================
              1. TURISTA PRINCIPAL
          ======================= */}
          <Box
            sx={{
              mb: 3,
              background: "rgba(20, 34, 64, 0.7)",
              borderRadius: "6px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0.45)",
              p: 2,
            }}
          >
            <Typography variant="h6">1. Turista principal</Typography>
            <TouristForm
              prefix="mainTourist"
              formik={formik}
              tourists={tourists}
            />
          </Box>

          {/* =======================
              1.1 TURISTAS ADICIONALES
          ======================= */}
          <Box
            sx={{
              mb: 3,
              background: "rgba(20, 34, 64, 0.7)",
              borderRadius: "6px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0.45)",
              p: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="h6">Turistas adicionales</Typography>
              <Button
                variant="contained"
                size="small"
                onClick={handleAddAdditionalTourist}
              >
                Agregar turista
              </Button>
            </Box>

            {formik.values.additionalTourists.map((t, index) => (
              <Box key={t.tempId || index} sx={{ mt: 2 }}>
                <Divider sx={{ mb: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle1">
                    Turista {index + 2}
                  </Typography>
                  {!t.id && (
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveTourist(index)}
                    >
                      Eliminar
                    </Button>
                  )}
                </Box>

                <TouristForm
                  prefix={`additionalTourists.${index}`}
                  formik={formik}
                  tourists={tourists}
                />
              </Box>
            ))}
          </Box>

          {/* =======================
              2. PAQUETE TURÍSTICO
          ======================= */}
          <Box
            sx={{
              mb: 3,
              background: "rgba(20, 34, 64, 0.7)",
              borderRadius: "6px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0.45)",
              p: 2,
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6">2. Paquete turístico</Typography>

              <FormControl
                size="small"
                fullWidth
                error={hasError(formik, "tourPackageId")}
                sx={{ mt: 1 }}
              >
                <InputLabel>Paquete</InputLabel>
                <Select
                  label="Paquete"
                  {...formik.getFieldProps("tourPackageId")}
                  onChange={(e) =>
                    handleTourPackageChange(e.target.value as string)
                  }
                  disabled={isEditing}
                >
                  {tourPackages.map((pkg) => (
                    <MenuItem key={pkg.id} value={pkg.id}>
                      {pkg.name} - {pkg.price} Bs.
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography
                variant="caption"
                color={
                  hasError(formik, "tourPackageId") ? "error" : "text.secondary"
                }
              >
                {helperText(
                  formik,
                  "tourPackageId",
                  bookingFieldGuides.tourPackageId,
                )}
              </Typography>
            </Box>

            {/* =======================
              3. FECHA
          ======================= */}
            <Box sx={{ mb: 3 }}>
              <FormControl
                size="small"
                fullWidth
                error={hasError(formik, "dateRangeId")}
              >
                <InputLabel>Fecha de reserva</InputLabel>
                <Select
                  label="Fecha de reserva"
                  {...formik.getFieldProps("dateRangeId")}
                  onChange={(e) =>
                    handleDateRangeChange(e.target.value as string)
                  }
                  disabled={isEditing}
                >
                  {dateRanges.length > 0 ? (
                    dateRanges.map((range) => (
                      <MenuItem key={range.id} value={range.id}>
                        {range.dates?.[0]} -{" "}
                        {range.dates?.[range.dates.length - 1]}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No hay fechas disponibles</MenuItem>
                  )}
                </Select>
              </FormControl>

              <Typography
                variant="caption"
                color={
                  hasError(formik, "dateRangeId") ? "error" : "text.secondary"
                }
              >
                {helperText(
                  formik,
                  "dateRangeId",
                  bookingFieldGuides.dateRangeId,
                )}
              </Typography>
            </Box>

            {/* =======================
              PRECIO TOTAL
          ======================= */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "6px",
                p: "8px 12px",
                mb: 3,
              }}
            >
              <Typography variant="subtitle1">
                Precio total (Bs.): {formik.values.totalPrice}
              </Typography>
            </Box>

            {/* =======================
              GALERÍA DEL DESTINO
          ======================= */}
            {destinationImages.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: 1,
                  mb: 3,
                }}
              >
                {destinationImages.map((img, index) => (
                  <Box key={index}>
                    <img
                      src={buildImageSrc(img)}
                      alt="Destino"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          {/* =======================
              4. PAGO
          ======================= */}

          {!isEditing && (
            <Box
              sx={{
                mb: 3,
                background: "rgba(20, 34, 64, 0.7)",
                borderRadius: "6px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(0, 0, 0, 0.45)",
                p: 2,
              }}
            >
              <Typography variant="h6">4. Información de pago</Typography>

              <PaymentForm
                prefix="firstPayment"
                formik={formik}
                isEditing={isEditing}
                previewImage={previewImage}
                handleFileChange={handleFileChange}
              />
            </Box>
          )}
          {/* =======================
              ACCIONES
          ======================= */}
          <Box display="flex" gap={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {isEditing ? "Actualizar reserva" : "Guardar reserva"}
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={closeWithTransition}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
