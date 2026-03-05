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
  styled,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  Alert,
} from "@mui/material";
import { Close, CloudUpload } from "@mui/icons-material";
import { FormikProps } from "formik";

import { UserType } from "../../types/UserType";
import { RoleType } from "../../types/RoleType";
import TextType from "../../../../TextAnimations/TextType/TextType";

interface UserFormValues {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  ci: string;
  phone: string;
  role: string;
  address: string;
  imageUrl?: string;
  image?: File | null;
}

interface UserFormProps {
  open: boolean;
  handleClick: () => void;
  user?: UserType;
  roles: RoleType[];
  preview: string | null;
  setPreview: (url: string | null) => void;
  formik: FormikProps<UserFormValues>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting?: boolean;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

/**
 * Helpers UX:
 * - Si hay error (touched + errors) => mostrar error
 * - Si no hay error => mostrar guía
 */
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

/**
 * Guías (microcopy) por campo: visibles antes de fallar
 * Puedes ajustar textos a tu negocio.
 */
const fieldGuides: Partial<Record<keyof UserFormValues, string>> = {
  firstName: "Mínimo 3 caracteres. Ej: Juan",
  lastName: "Mínimo 3 caracteres. Ej: Pérez",
  email: "Ej: usuario@gmail.com (será el usuario de acceso)",
  ci: "Ej: 6543210 o 6543210-1A",
  phone: "Solo números, mínimo 7 dígitos",
  role: "Define permisos y accesos dentro del sistema",
  address: "Mínimo 5 caracteres. Ej: Av. Blanco Galindo km 10",
  image: "Formatos: JPG/PNG/WEBP · Máx. 2 MB",
};

const UserForm: React.FC<UserFormProps> = ({
  open,
  handleClick,
  user,
  roles,
  preview,
  formik,
  handleFileChange,
  isSubmitting = false,
}) => {
  const { hasError, helperText } = useFieldHelpers<UserFormValues>(
    formik,
    fieldGuides,
  );

  const isEditMode = Boolean(user);

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (isSubmitting) return;
        if (reason === "backdropClick") return;
        handleClick();
      }}
      disableEscapeKeyDown={isSubmitting}
      fullWidth
      maxWidth="sm"
    >
      <TextType
        text={isEditMode ? "Editar usuario" : "Nuevo usuario"}
        as={DialogTitle}
        typingSpeed={40}
        showCursor
        cursorCharacter="_"
      />

      <IconButton
        aria-label="close"
        onClick={handleClick}
        disabled={isSubmitting}
        sx={{ position: "absolute", right: 12, top: 12 }}
      >
        <Close />
      </IconButton>

      <DialogContent dividers>
        {/* Bloque informativo (muy útil en demos) */}
        <Alert severity="info" sx={{ mb: 2 }}>
          {isEditMode
            ? "Actualiza los datos del usuario. El rol define sus permisos."
            : "Crea un usuario para el sistema. El correo será su usuario de acceso y el rol define permisos."}
        </Alert>

        <form onSubmit={formik.handleSubmit} noValidate>
          {/* Nombre */}
          <TextField
            fullWidth
            size="small"
            label="Nombre(s)"
            {...formik.getFieldProps("firstName")}
            error={hasError("firstName")}
            helperText={helperText("firstName")}
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />

          {/* Apellido */}
          <TextField
            fullWidth
            size="small"
            label="Apellidos"
            {...formik.getFieldProps("lastName")}
            error={hasError("lastName")}
            helperText={helperText("lastName")}
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />

          {/* Email */}
          <TextField
            fullWidth
            size="small"
            label="Correo electrónico"
            {...formik.getFieldProps("email")}
            error={hasError("email")}
            helperText={helperText("email")}
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />

          {/* CI */}
          <TextField
            fullWidth
            size="small"
            label="CI"
            {...formik.getFieldProps("ci")}
            error={hasError("ci")}
            helperText={helperText("ci")}
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />

          {/* Teléfono */}
          <TextField
            fullWidth
            size="small"
            label="Teléfono"
            {...formik.getFieldProps("phone")}
            error={hasError("phone")}
            helperText={helperText("phone")}
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />

          {/* Rol */}
          <FormControl
            fullWidth
            size="small"
            sx={{ mb: 0.5 }}
            disabled={isSubmitting}
            error={hasError("role")}
          >
            <InputLabel>Rol</InputLabel>
            <Select
              name="role"
              label="Rol"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {roles.map((role) =>
                role.name.toLowerCase() !== "administrador" ? (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ) : null,
              )}
            </Select>
          </FormControl>

          {/* helper consistente también para Select */}
          <Typography
            variant="caption"
            color={hasError("role") ? "error" : "text.secondary"}
            sx={{ display: "block", mb: 2 }}
          >
            {helperText("role")}
          </Typography>

          {/* Dirección */}
          <TextField
            fullWidth
            size="small"
            label="Dirección"
            {...formik.getFieldProps("address")}
            error={hasError("address")}
            helperText={helperText("address")}
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />

          {/* Imagen */}
          <Box display="flex" alignItems="center" gap={2} mb={0.5}>
            <label htmlFor="image">
              <VisuallyHiddenInput
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUpload />}
                disabled={isSubmitting}
              >
                Subir imagen
              </Button>
            </label>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: 64,
                  height: 64,
                  objectFit: "cover",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
            )}
          </Box>

          {/* helper consistente para imagen (guía o error) */}
          <Typography
            variant="caption"
            color={hasError("image") ? "error" : "text.secondary"}
            sx={{ display: "block", mb: 2 }}
          >
            {helperText("image")}
          </Typography>

          {/* Botones */}
          <Box display="flex" gap={2} mt={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              disabled={isSubmitting}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              {isSubmitting
                ? "Procesando..."
                : isEditMode
                  ? "Actualizar"
                  : "Registrar"}
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleClick}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
