/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/x-date-pickers";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { FieldArray, getIn, useFormikContext } from "formik";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.locale("es");

// Ajusta este type a tu TouristType real si quieres tipado estricto
type Tourist = {
  id?: string;
  tempId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  documentType: "ci" | "passport" | string; // tolera strings legacy
  ci?: string;
  passportNumber?: string;
  nationality: string;
  dateOfBirth: string; // "DD-MM-YYYY"
};

type FormValues = {
  tourists: Tourist[];
};

const documentTypes = [
  { value: "ci", label: "CI" },
  { value: "passport", label: "Pasaporte" },
];

// ---- helpers ----
const normalizeDocType = (v: any): "ci" | "passport" => {
  const s = String(v ?? "").toLowerCase();
  if (s === "ci") return "ci";
  if (s === "passport") return "passport";
  // legacy / valores raros:
  if (s === "ci_number" || s === "carnet" || s === "ci ") return "ci";
  return "passport";
};

const parseBirthDate = (value?: string): Dayjs | null => {
  if (!value) return null;
  // estricto: DD-MM-YYYY
  const d = dayjs(value, "DD-MM-YYYY", true);
  return d.isValid() ? d : null;
};

const emptyTourist = (): Tourist => ({
  id: "",
  tempId: (globalThis.crypto?.randomUUID?.() ?? String(Date.now())) as string,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  documentType: "ci",
  ci: "",
  passportNumber: "",
  nationality: "Bolivia",
  dateOfBirth: "",
});

export default function TouristSection() {
  const { values } = useFormikContext<FormValues>();

  return (
    // Si ya tienes LocalizationProvider en el padre, elimina este wrapper:
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          background: "rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.15)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography color="white" variant="h6">
            Turistas
          </Typography>

          <FieldArray name="tourists">
            {({ push }) => (
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => push(emptyTourist())}
              >
                Agregar
              </Button>
            )}
          </FieldArray>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

        <FieldArray name="tourists">
          {({ remove }) => (
            <Box display="flex" flexDirection="column" gap={2}>
              {values.tourists?.map((_, index) => (
                <TouristRow
                  key={values.tourists[index].tempId ?? index}
                  index={index}
                  onRemove={() => remove(index)}
                  disableRemove={values.tourists.length === 1}
                />
              ))}
            </Box>
          )}
        </FieldArray>
      </Box>
    // </LocalizationProvider>
  );
}

function TouristRow({
  index,
  onRemove,
  disableRemove,
}: {
  index: number;
  onRemove: () => void;
  disableRemove: boolean;
}) {
  const { values, setFieldValue, errors, touched } =
    useFormikContext<FormValues>();

  const base = `tourists[${index}]`;
  const tourist = getIn(values, base) as Tourist;

  // Helpers para error/touched por campo (arrays)
  const err = (path: string) => getIn(errors, path);
  const tch = (path: string) => getIn(touched, path);
  const showErr = (path: string) => Boolean(tch(path) && err(path));

  const docType = normalizeDocType(tourist?.documentType);

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        background: "rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.15)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography color="white" variant="subtitle1">
          Turista #{index + 1}
        </Typography>
        <IconButton
          onClick={onRemove}
          disabled={disableRemove}
          sx={{ color: "white" }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      <TextField
        label="Nombre(s)"
        size="small"
        fullWidth
        value={tourist?.firstName ?? ""}
        onChange={(e) => setFieldValue(`${base}.firstName`, e.target.value)}
        error={showErr(`${base}.firstName`)}
        helperText={
          showErr(`${base}.firstName`) ? err(`${base}.firstName`) : ""
        }
        sx={fieldSx}
      />

      <TextField
        label="Apellido(s)"
        size="small"
        fullWidth
        value={tourist?.lastName ?? ""}
        onChange={(e) => setFieldValue(`${base}.lastName`, e.target.value)}
        error={showErr(`${base}.lastName`)}
        helperText={showErr(`${base}.lastName`) ? err(`${base}.lastName`) : ""}
        sx={fieldSx}
      />

      <TextField
        label="Email"
        type="email"
        size="small"
        fullWidth
        value={tourist?.email ?? ""}
        onChange={(e) => setFieldValue(`${base}.email`, e.target.value)}
        error={showErr(`${base}.email`)}
        helperText={showErr(`${base}.email`) ? err(`${base}.email`) : ""}
        sx={fieldSx}
      />

      <TextField
        label="Teléfono"
        size="small"
        fullWidth
        value={tourist?.phone ?? ""}
        onChange={(e) => setFieldValue(`${base}.phone`, e.target.value)}
        error={showErr(`${base}.phone`)}
        helperText={showErr(`${base}.phone`) ? err(`${base}.phone`) : ""}
        sx={fieldSx}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <FormControl
          size="small"
          sx={{ width: "50%", ...selectSx }}
          error={showErr(`${base}.documentType`)}
        >
          <InputLabel
            id={`document-type-label-${index}`}
            sx={{ color: "white" }}
          >
            Documento
          </InputLabel>

          <Select
            labelId={`document-type-label-${index}`}
            value={docType}
            label="Documento"
            onChange={(e) => {
              const next = normalizeDocType(e.target.value);
              setFieldValue(`${base}.documentType`, next);

              // limpia el campo contrario para evitar arrastrar validación:
              if (next === "ci") {
                setFieldValue(`${base}.passportNumber`, "");
              } else {
                setFieldValue(`${base}.ci`, "");
              }
            }}
          >
            {documentTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>

          {showErr(`${base}.documentType`) && (
            <Typography color="error" sx={{ fontSize: 12, mt: 1 }}>
              {String(err(`${base}.documentType`))}
            </Typography>
          )}
        </FormControl>

        {docType === "ci" ? (
          <TextField
            label="Número de CI"
            size="small"
            fullWidth
            value={tourist?.ci ?? ""}
            onChange={(e) => setFieldValue(`${base}.ci`, e.target.value)}
            error={showErr(`${base}.ci`)}
            helperText={showErr(`${base}.ci`) ? err(`${base}.ci`) : ""}
            sx={fieldSx}
          />
        ) : (
          <TextField
            label="Número de pasaporte"
            size="small"
            fullWidth
            value={tourist?.passportNumber ?? ""}
            onChange={(e) =>
              setFieldValue(`${base}.passportNumber`, e.target.value)
            }
            error={showErr(`${base}.passportNumber`)}
            helperText={
              showErr(`${base}.passportNumber`)
                ? err(`${base}.passportNumber`)
                : ""
            }
            sx={fieldSx}
          />
        )}
      </Box>

      <TextField
        label="Nacionalidad"
        size="small"
        fullWidth
        value={tourist?.nationality ?? ""}
        onChange={(e) => setFieldValue(`${base}.nationality`, e.target.value)}
        error={showErr(`${base}.nationality`)}
        helperText={
          showErr(`${base}.nationality`) ? err(`${base}.nationality`) : ""
        }
        sx={fieldSx}
      />

      {/* ✅ DatePicker Dayjs controlado por Formik (sin state local) */}
      <DatePicker
        label="Fecha de nacimiento"
        value={parseBirthDate(tourist?.dateOfBirth)}
        format="DD-MM-YYYY"
        onChange={(newDate) => {
          setFieldValue(
            `${base}.dateOfBirth`,
            newDate ? newDate.format("DD-MM-YYYY") : "",
          );
        }}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
            placeholder: "DD-MM-YYYY",
            error: showErr(`${base}.dateOfBirth`),
            helperText: showErr(`${base}.dateOfBirth`)
              ? err(`${base}.dateOfBirth`)
              : "",
          },
        }}
      />
    </Box>
  );
}

const fieldSx = {
  "& .MuiInputBase-root": { color: "white" },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.3)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.6)",
  },
  "& .MuiFormHelperText-root": { color: "#ffb4b4" },
  "& .MuiInputLabel-root": { color: "white" },
};

const selectSx = {
  "& .MuiInputBase-root": { color: "white" },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.3)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.6)",
  },
  "& .MuiSvgIcon-root": { color: "white" },
};
