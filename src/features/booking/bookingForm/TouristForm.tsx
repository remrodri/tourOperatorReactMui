import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { TouristType } from "../types/TouristType";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.locale("es");

interface TouristFormProps {
  tourist: Partial<TouristType>;
  onChange: (field: string, value: any) => void;
  errors?: any;
  touched?: any;
}

const documentTypes = [
  { value: "ci", label: "CI" },
  { value: "passport", label: "Pasaporte" },
];

const TouristForm: React.FC<TouristFormProps> = ({
  tourist,
  onChange,
  errors,
  touched,
}) => {
  // console.log('tourist::: ', tourist);
  const [birthDate, setBirthDate] = useState<Dayjs | null>(
    // tourist?.dateOfBirth ? dayjs(tourist.dateOfBirth) : null
    () => {
      if (!tourist?.dateOfBirth) return null;
      if (tourist.dateOfBirth.includes("-")) {
        const parts = tourist.dateOfBirth.split("-");
        if (parts.length === 3 && parts[0].length === 2) {
          return dayjs(tourist.dateOfBirth, "DD-MM-YYYY");
        }
      }
      return dayjs(tourist.dateOfBirth);
    }
  );

  const handleChange = (newDate: Dayjs | null) => {
    setBirthDate(newDate);
    onChange("dateOfBirth", newDate ? newDate.format("DD-MM-YYYY") : "");
  };
  // Asegurémonos de que documentType tenga un valor por defecto de "ci"
  // si no está definido o es un string vacío
  const documentType = tourist?.documentType || "ci";

  // Efecto para establecer el valor inicial si está vacío
  useEffect(() => {
    if (tourist?.dateOfBirth) {
      if (tourist.dateOfBirth.includes("-")) {
        const parts = tourist.dateOfBirth.split("-");
        if (parts.length === 3 && parts[0].length === 2) {
          setBirthDate(dayjs(tourist.dateOfBirth, "DD-MM-YYYY"));
          return;
        }
      }
      setBirthDate(dayjs(tourist.dateOfBirth, "DD-MM-YYYY"));
    } else {
      setBirthDate(null);
    }
    if (!tourist.documentType) {
      onChange("documentType", "ci");
    } else if (tourist.documentType === "CI") {
      // Corregir el valor "CI" a "ci" para asegurar la coincidencia con las opciones
      onChange("documentType", "ci");
    }
  }, [tourist?.dateOfBirth]);

  return (
    <Box 
      sx={{ 

      display: "flex", 
      flexDirection: "column", 
      gap: 2,
        
      }}
      >
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Nombre(s)"
          size="small"
          fullWidth
          value={tourist?.firstName || ""}
          onChange={(e) => onChange("firstName", e.target.value)}
          error={touched?.firstName && Boolean(errors?.firstName)}
          helperText={touched?.firstName && errors?.firstName}
        />
        
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
      <TextField
          label="Apellido(s)"
          size="small"
          fullWidth
          value={tourist?.lastName || ""}
          onChange={(e) => onChange("lastName", e.target.value)}
          error={touched?.lastName && Boolean(errors?.lastName)}
          helperText={touched?.lastName && errors?.lastName}
        />
      </Box>

      <TextField
        label="Email"
        type="email"
        size="small"
        fullWidth
        value={tourist?.email || ""}
        onChange={(e) => onChange("email", e.target.value)}
        error={touched?.email && Boolean(errors?.email)}
        helperText={touched?.email && errors?.email}
      />

      <TextField
        label="Telefono"
        size="small"
        fullWidth
        value={tourist?.phone || ""}
        onChange={(e) => onChange("phone", e.target.value)}
        error={touched?.phone && Boolean(errors?.phone)}
        helperText={touched?.phone && errors?.phone}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <FormControl
          size="small"
          sx={{ width: "50%" }}
          error={touched?.documentType && Boolean(errors?.documentType)}
        >
          <InputLabel id="document-type-label">Documento</InputLabel>
          <Select
            labelId="document-type-label"
            id="document-type"
            value={documentType.toLowerCase()} // Asegurarse de que siempre sea minúsculas
            label="Documento"
            onChange={(e) => onChange("documentType", e.target.value)}
          >
            {documentTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
          {touched?.documentType && errors?.documentType && (
            <Typography color="error" sx={{ fontSize: "12px", mt: 1 }}>
              {errors.documentType}
            </Typography>
          )}
        </FormControl>

        {documentType.toLowerCase() === "ci" ? (
          <TextField
            label="Numero de CI"
            size="small"
            fullWidth
            value={tourist?.ci || ""}
            onChange={(e) => onChange("ci", e.target.value)}
            error={touched?.ci && Boolean(errors?.ci)}
            helperText={touched?.ci && errors?.ci}
          />
        ) : (
          <TextField
            label="Numero de pasaporte"
            size="small"
            fullWidth
            value={tourist?.passportNumber || ""}
            onChange={(e) => onChange("passportNumber", e.target.value)}
            error={touched?.passportNumber && Boolean(errors?.passportNumber)}
            helperText={touched?.passportNumber && errors?.passportNumber}
          />
        )}
      </Box>

      <TextField
        label="Nacionalidad"
        size="small"
        fullWidth
        value={tourist?.nationality || ""}
        onChange={(e) => onChange("nationality", e.target.value)}
        error={touched?.nationality && Boolean(errors?.nationality)}
        helperText={touched?.nationality && errors?.nationality}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Fecha de nacimiento"
          // value={birthDate}
          value={birthDate}
          // onChange={(newDate) => setSelectedDate(newDate)}
          onChange={handleChange}
          format="DD-MM-YYYY"
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true,
              error: touched?.dateOfBirth && Boolean(errors?.dateOfBirth),
              helperText: touched?.dateOfBirth && errors?.dateOfBirth,
              placeholder: "DD-MM-YYYY",
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default TouristForm;
