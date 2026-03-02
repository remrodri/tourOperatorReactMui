/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormikContext, getIn } from "formik";
import TextType from "../../../../TextAnimations/TextType/TextType";
import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";
import { useTouristDestinationContext } from "../../../touristDestination/context/TouristDestinationContext";

interface TourPackageSectionProps {
  isEditing: boolean;
  onTourPackageChange: (id: string) => void;
  onDateRangeChange: (id: string) => void;
}

const TourPackageSection: React.FC<TourPackageSectionProps> = ({
  isEditing,
  onTourPackageChange,
  onDateRangeChange,
}) => {
  const { values, errors, touched, setFieldValue } = useFormikContext<any>();

  const error = (name: string) => getIn(errors, name);
  const isTouched = (name: string) => getIn(touched, name);

  const { tourPackages } = useTourPackageContext();
  const { getTouristDestinationInfoById } = useTouristDestinationContext();

  const selectedPackage = useMemo(() => {
    if (!values.tourPackageId) return null;
    return tourPackages.find((p) => p.id === values.tourPackageId) ?? null;
  }, [values.tourPackageId, tourPackages]);

  const touristDestination = useMemo(() => {
    const destId = selectedPackage?.touristDestination || "";
    if (!destId) return null;
    return getTouristDestinationInfoById(destId) ?? null;
  }, [selectedPackage?.touristDestination, getTouristDestinationInfoById]);

  // ✅ Cantidad turistas (mínimo 1)
  const touristsCount = Math.max(1, values.tourists?.length ?? 0);

  // ✅ Recalcular totalPrice cuando cambia paquete o cantidad de turistas
  useEffect(() => {
    const basePrice = Number(selectedPackage?.price ?? 0);
    const total = basePrice * touristsCount;

    // Evita loops si ya está igual
    if (Number(values.totalPrice ?? 0) !== total) {
      setFieldValue("totalPrice", total, false);
    }
  }, [selectedPackage?.price, touristsCount]); // intencional: depende solo de lo necesario

  const handleTourPackageChange = (id: string) => {
    setFieldValue("tourPackageId", id);
    setFieldValue("dateRangeId", ""); // limpiar fecha al cambiar paquete
    onTourPackageChange(id);
  };

  const handleDateRangeChange = (id: string) => {
    setFieldValue("dateRangeId", id);
    onDateRangeChange(id);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6" sx={{ pl: 1 }}>
        <TextType
          className="text-lg"
          text="2. Paquete Turístico"
          typingSpeed={50}
          pauseDuration={1000}
          showCursor
          cursorCharacter="_"
          deletingSpeed={50}
        />
      </Typography>

      {/* PAQUETE */}
      <Box>
        <FormControl size="small" fullWidth>
          <InputLabel>Paquete Turístico</InputLabel>
          <Select
            disabled={isEditing}
            label="Paquete Turístico"
            value={values.tourPackageId || ""}
            onChange={(e) => handleTourPackageChange(e.target.value as string)}
            error={
              isTouched("tourPackageId") && Boolean(error("tourPackageId"))
            }
          >
            {tourPackages.map((pkg) => (
              <MenuItem key={pkg.id} value={pkg.id}>
                {pkg.name} - {pkg.price} Bs.
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {error("tourPackageId") && (
          <Typography
            color="error"
            sx={{ fontSize: 12, pt: "4px", pl: "12px" }}
          >
            {error("tourPackageId")}
          </Typography>
        )}
      </Box>

      {/* FECHAS */}
      <Box>
        <FormControl size="small" fullWidth>
          <InputLabel>Fecha de Reserva</InputLabel>
          <Select
            disabled={isEditing || !selectedPackage}
            label="Fecha de Reserva"
            value={values.dateRangeId || ""}
            onChange={(e) => handleDateRangeChange(e.target.value as string)}
            error={isTouched("dateRangeId") && Boolean(error("dateRangeId"))}
          >
            {selectedPackage?.dateRanges?.length ? (
              selectedPackage.dateRanges.map((dr: any) => {
                if (!dr.dates?.length) return null;
                const label =
                  dr.dates.length > 1
                    ? `${dr.dates[0]} - ${dr.dates.at(-1)}`
                    : dr.dates[0];
                return (
                  <MenuItem key={dr.id} value={dr.id}>
                    {label}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value="">No hay fechas disponibles</MenuItem>
            )}
          </Select>
        </FormControl>

        {error("dateRangeId") && (
          <Typography
            color="error"
            sx={{ fontSize: 12, pt: "4px", pl: "12px" }}
          >
            {error("dateRangeId")}
          </Typography>
        )}
      </Box>

      {/* TOTAL */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "6px",
          p: "5px 10px",
        }}
      >
        <Typography variant="subtitle2">Turistas: {touristsCount}</Typography>
        <Typography variant="subtitle1">
          Precio Total (Bs.): {values.totalPrice}
        </Typography>
      </Box>

      {/* NOTAS */}
      <Box>
        <TextField
          label="Notas"
          multiline
          rows={3}
          fullWidth
          value={values.notes || ""}
          onChange={(e) => setFieldValue("notes", e.target.value)}
          error={isTouched("notes") && Boolean(error("notes"))}
          helperText={isTouched("notes") && error("notes")}
        />
      </Box>

      {/* -------- IMÁGENES -------- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {touristDestination?.images?.length
          ? touristDestination.images.map(
              (image: string | File, index: number) => {
                const imageSrc =
                  typeof image === "string"
                    ? `http://localhost:3000${image}`
                    : URL.createObjectURL(image);

                return (
                  <Box key={index}>
                    <img
                      src={imageSrc}
                      alt=""
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  </Box>
                );
              },
            )
          : null}
      </Box>
    </Box>
  );
};

export default TourPackageSection;
