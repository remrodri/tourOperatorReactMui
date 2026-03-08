/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { FormikProps } from "formik";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import { TouristType } from "../../types/TouristType";

/* -----------------------------
   Helpers (safe getIn)
-------------------------------- */
const getIn = (obj: any, path: string) =>
  path.split(".").reduce((acc, key) => acc?.[key], obj);

const hasError = (formik: any, path: string) =>
  Boolean(getIn(formik.touched, path) && getIn(formik.errors, path));

const helperText = (formik: any, path: string, fallback = " ") =>
  hasError(formik, path) ? String(getIn(formik.errors, path)) : fallback;

/* -----------------------------
   Microcopy
-------------------------------- */
const fieldGuides = {
  documentType: "Selecciona el tipo de documento",
  ci: "CI único. Si existe, se autocompleta y se bloquea.",
  passportNumber: "Pasaporte único. Si existe, se autocompleta y se bloquea.",
  firstName: "Nombre(s) del turista",
  lastName: "Apellido(s) del turista",
  email: "Ej: usuario@correo.com",
  phone: "Solo números, mínimo 8 dígitos",
  nationality: "Ej: Bolivia",
  dateOfBirth: "Formato DD-MM-YYYY",
};

const documentTypes = [
  { value: "ci", label: "CI" },
  { value: "passport", label: "Pasaporte" },
] as const;

type DocumentType = "ci" | "passport";

const normalizeDocumentType = (value: any): DocumentType => {
  const v = String(value || "").toLowerCase();
  if (v === "ci") return "ci";
  if (v === "passport") return "passport";
  if (v === "passportnumber") return "passport"; // legacy
  if (v === "ci") return "ci"; // legacy
  return "ci";
};

const normalizeTourist = (t: TouristType): TouristType => ({
  ...t,
  documentType: normalizeDocumentType((t as any).documentType) as any,
});

interface TouristFormProps {
  prefix: string; // "mainTourist" | "additionalTourists.0"
  formik: FormikProps<any>;
  tourists?: TouristType[]; // ✅ ahora opcional para no reventar
  allowUnlock?: boolean;
  debounceMs?: number;
}

const TouristForm: React.FC<TouristFormProps> = ({
  prefix,
  formik,
  tourists,
  allowUnlock = true,
  debounceMs = 350,
}) => {
  // ✅ blindaje contra undefined
  const touristsSafe = tourists ?? [];

  const touristValue: TouristType =
    getIn(formik.values, prefix) || ({} as TouristType);

  const docType: DocumentType = normalizeDocumentType(
    touristValue.documentType,
  );
  const docValue =
    docType === "ci"
      ? touristValue.ci || ""
      : touristValue.passportNumber || "";

  const [locked, setLocked] = useState(false);
  const debounceRef = useRef<number | null>(null);

  const matchedTourist = useMemo(() => {
    const doc = docValue.trim();
    if (!doc) return null;

    const found = touristsSafe.find(
      (t) => t.ci === doc || t.passportNumber === doc,
    );
    return found ? normalizeTourist(found) : null;
  }, [docValue, touristsSafe]);

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);

    if (!docValue.trim()) {
      setLocked(false);
      return;
    }

    debounceRef.current = window.setTimeout(() => {
      if (matchedTourist) {
        const tempId = touristValue.tempId;
        formik.setFieldValue(prefix, { ...matchedTourist, tempId }, false);
        setLocked(true);
      } else {
        setLocked(false);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docValue, matchedTourist, prefix]);

  const birthDate: Dayjs | null = useMemo(() => {
    const raw = touristValue.dateOfBirth;
    if (!raw) return null;

    const strict = dayjs(raw, "DD-MM-YYYY", true);
    if (strict.isValid()) return strict;

    const loose = dayjs(raw);
    return loose.isValid() ? loose : null;
  }, [touristValue.dateOfBirth]);

  const handleUnlock = () => {
    setLocked(false);
    formik.setFieldValue(`${prefix}.id`, "", false);
    if (docType === "ci") formik.setFieldValue(`${prefix}.ci`, "", true);
    else formik.setFieldValue(`${prefix}.passportNumber`, "", true);
  };

  const handleDocumentTypeChange = (value: DocumentType) => {
    formik.setFieldValue(`${prefix}.documentType`, value, true);
    if (value === "ci")
      formik.setFieldValue(`${prefix}.passportNumber`, "", false);
    else formik.setFieldValue(`${prefix}.ci`, "", false);
    setLocked(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {locked && (
        <Box>
          <Typography
            variant="caption"
            color="info.main"
            sx={{ display: "block" }}
          >
            Turista existente encontrado. Los datos no se pueden modificar aquí.
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block" }}
          >
            Para editar, usa el módulo de turistas.
          </Typography>

          {allowUnlock && (
            <Button
              size="small"
              variant="outlined"
              color="warning"
              onClick={handleUnlock}
              sx={{ mt: 1 }}
            >
              Usar otro documento
            </Button>
          )}
        </Box>
      )}

      <Box sx={{ display: "flex", gap: 2 }}>
        <FormControl
          size="small"
          sx={{ width: "40%" }}
          disabled={locked}
          error={hasError(formik, `${prefix}.documentType`)}
        >
          <InputLabel>Documento</InputLabel>
          <Select
            label="Documento"
            value={docType}
            onChange={(e) =>
              handleDocumentTypeChange(e.target.value as DocumentType)
            }
            onBlur={formik.handleBlur}
          >
            {documentTypes.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </Select>

          <Typography
            variant="caption"
            color={
              hasError(formik, `${prefix}.documentType`)
                ? "error"
                : "text.secondary"
            }
            sx={{ mt: 0.5 }}
          >
            {helperText(
              formik,
              `${prefix}.documentType`,
              fieldGuides.documentType,
            )}
          </Typography>
        </FormControl>

        {docType === "ci" ? (
          <TextField
            label="CI"
            size="small"
            fullWidth
            disabled={locked}
            value={touristValue.ci || ""}
            onChange={(e) =>
              formik.setFieldValue(`${prefix}.ci`, e.target.value, true)
            }
            onBlur={formik.handleBlur}
            error={hasError(formik, `${prefix}.ci`)}
            helperText={helperText(formik, `${prefix}.ci`, fieldGuides.ci)}
          />
        ) : (
          <TextField
            label="Pasaporte"
            size="small"
            fullWidth
            disabled={locked}
            value={touristValue.passportNumber || ""}
            onChange={(e) =>
              formik.setFieldValue(
                `${prefix}.passportNumber`,
                e.target.value,
                true,
              )
            }
            onBlur={formik.handleBlur}
            error={hasError(formik, `${prefix}.passportNumber`)}
            helperText={helperText(
              formik,
              `${prefix}.passportNumber`,
              fieldGuides.passportNumber,
            )}
          />
        )}
      </Box>

      <TextField
        label="Nombre(s)"
        size="small"
        fullWidth
        disabled={locked}
        value={touristValue.firstName || ""}
        onChange={(e) =>
          formik.setFieldValue(`${prefix}.firstName`, e.target.value, true)
        }
        onBlur={formik.handleBlur}
        error={hasError(formik, `${prefix}.firstName`)}
        helperText={helperText(
          formik,
          `${prefix}.firstName`,
          fieldGuides.firstName,
        )}
      />

      <TextField
        label="Apellido(s)"
        size="small"
        fullWidth
        disabled={locked}
        value={touristValue.lastName || ""}
        onChange={(e) =>
          formik.setFieldValue(`${prefix}.lastName`, e.target.value, true)
        }
        onBlur={formik.handleBlur}
        error={hasError(formik, `${prefix}.lastName`)}
        helperText={helperText(
          formik,
          `${prefix}.lastName`,
          fieldGuides.lastName,
        )}
      />

      <TextField
        label="Email"
        size="small"
        type="email"
        fullWidth
        disabled={locked}
        value={touristValue.email || ""}
        onChange={(e) =>
          formik.setFieldValue(`${prefix}.email`, e.target.value, true)
        }
        onBlur={formik.handleBlur}
        error={hasError(formik, `${prefix}.email`)}
        helperText={helperText(formik, `${prefix}.email`, fieldGuides.email)}
      />

      <TextField
        label="Teléfono"
        size="small"
        fullWidth
        disabled={locked}
        value={touristValue.phone || ""}
        onChange={(e) =>
          formik.setFieldValue(`${prefix}.phone`, e.target.value, true)
        }
        onBlur={formik.handleBlur}
        error={hasError(formik, `${prefix}.phone`)}
        helperText={helperText(formik, `${prefix}.phone`, fieldGuides.phone)}
      />

      <TextField
        label="Nacionalidad"
        size="small"
        fullWidth
        disabled={locked}
        value={touristValue.nationality || ""}
        onChange={(e) =>
          formik.setFieldValue(`${prefix}.nationality`, e.target.value, true)
        }
        onBlur={formik.handleBlur}
        error={hasError(formik, `${prefix}.nationality`)}
        helperText={helperText(
          formik,
          `${prefix}.nationality`,
          fieldGuides.nationality,
        )}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Fecha de nacimiento"
          value={birthDate}
          disabled={locked}
          onChange={(d) =>
            formik.setFieldValue(
              `${prefix}.dateOfBirth`,
              d ? d.format("DD-MM-YYYY") : "",
              true,
            )
          }
          format="DD-MM-YYYY"
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true,
              error: hasError(formik, `${prefix}.dateOfBirth`),
              helperText: helperText(
                formik,
                `${prefix}.dateOfBirth`,
                fieldGuides.dateOfBirth,
              ),
              placeholder: "DD-MM-YYYY",
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default TouristForm;
