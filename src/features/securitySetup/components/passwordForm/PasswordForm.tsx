/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { FormikProps, useFormik } from "formik";
import { passwordSchema } from "./validation/passwordSchema";

/* ============================
   Types
============================ */
export interface PasswordFormValues {
  password: string;
  confirmPassword: string;
}

interface PasswordFormProps {
  onSubmit: (values: PasswordFormValues) => void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
}

/* ============================
   Microcopy / Guides
============================ */
const fieldGuides: Partial<Record<keyof PasswordFormValues, string>> = {
  password: "Mínimo 6 caracteres. Usa una contraseña segura.",
  confirmPassword: "Debe coincidir exactamente con la contraseña.",
};

/* ============================
   Helpers UX (MISMO patrón que UserForm)
============================ */
function useFieldHelpers<T extends Record<string, any>>(
  formik: FormikProps<T>,
  helpers: Partial<Record<keyof T, string>>,
) {
  const hasError = (name: keyof T) =>
    Boolean((formik.touched as any)[name] && (formik.errors as any)[name]);

  const helperText = (name: keyof T) => {
    if (hasError(name)) return (formik.errors as any)[name];
    return helpers[name] ?? " ";
  };

  return { hasError, helperText };
}

/* ============================
   Component
============================ */
const PasswordForm: React.FC<PasswordFormProps> = ({
  onSubmit,
  isSubmitting = false,
  errorMessage = null,
}) => {
  const formik = useFormik<PasswordFormValues>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit,
  });

  const { hasError, helperText } = useFieldHelpers(formik, fieldGuides);

  return (
    <Box
      sx={{
        width: "22rem",
        background: "rgba(0,0,0,0.7)",
        borderRadius: 2,
        boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
        backdropFilter: "blur(6px)",
        p: 2,
      }}
    >
      {/* Título */}
      <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 500 }}>
        Actualizar contraseña
      </Typography>

      {/* Info guide (MISMO patrón que UserForm) */}
      <Alert severity="info" sx={{ mb: 2 }}>
        La contraseña debe tener al menos 6 caracteres.
      </Alert>

      {/* Error de backend */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit} noValidate>
        {/* Password */}
        <TextField
          fullWidth
          size="small"
          label="Contraseña"
          type="password"
          {...formik.getFieldProps("password")}
          error={hasError("password")}
          helperText={helperText("password")}
          disabled={isSubmitting}
          sx={{ mb: 2 }}
        />

        {/* Confirm password */}
        <TextField
          fullWidth
          size="small"
          label="Confirmar contraseña"
          type="password"
          {...formik.getFieldProps("confirmPassword")}
          error={hasError("confirmPassword")}
          helperText={helperText("confirmPassword")}
          disabled={isSubmitting}
          sx={{ mb: 3 }}
        />

        {/* Botón */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          startIcon={
            isSubmitting ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {isSubmitting ? "Procesando..." : "Guardar contraseña"}
        </Button>
      </form>
    </Box>
  );
};

export default PasswordForm;
