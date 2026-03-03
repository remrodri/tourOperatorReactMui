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
        text={user ? "Editar usuario" : "Nuevo usuario"}
        as={DialogTitle}
        typingSpeed={40}
        showCursor
        cursorCharacter="_"
      />

      {/* Botón cerrar */}
      <IconButton
        aria-label="close"
        onClick={handleClick}
        disabled={isSubmitting}
        sx={{ position: "absolute", right: 12, top: 12 }}
      >
        <Close />
      </IconButton>

      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          {/* Nombre */}
          <TextField
            fullWidth
            size="small"
            label="Nombre(s)"
            {...formik.getFieldProps("firstName")}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />

          {/* Apellido */}
          <TextField
            fullWidth
            size="small"
            label="Apellidos"
            {...formik.getFieldProps("lastName")}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />

          {/* Email */}
          <TextField
            fullWidth
            size="small"
            label="Correo electrónico"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />

          {/* CI */}
          <TextField
            fullWidth
            size="small"
            label="CI"
            {...formik.getFieldProps("ci")}
            error={formik.touched.ci && Boolean(formik.errors.ci)}
            helperText={formik.touched.ci && formik.errors.ci}
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />

          {/* Teléfono */}
          <TextField
            fullWidth
            size="small"
            label="Teléfono"
            {...formik.getFieldProps("phone")}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />

          {/* Rol */}
          <FormControl
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            disabled={isSubmitting}
            error={formik.touched.role && Boolean(formik.errors.role)}
          >
            <InputLabel>Rol</InputLabel>
            <Select
              name="role"
              label="Rol"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.role && formik.errors.role && (
              <Typography color="error" fontSize={12} mt={0.5}>
                {formik.errors.role}
              </Typography>
            )}
          </FormControl>

          {/* Dirección */}
          <TextField
            fullWidth
            size="small"
            label="Dirección"
            {...formik.getFieldProps("address")}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />

          {/* Imagen */}
          <Box display="flex" alignItems="center" gap={2} mb={2}>
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

          {formik.touched.image && formik.errors.image && (
            <Typography color="error" fontSize={12} mb={2}>
              {String(formik.errors.image)}
            </Typography>
          )}

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
                : user
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
