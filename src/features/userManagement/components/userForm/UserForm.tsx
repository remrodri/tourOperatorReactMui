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
} from "@mui/material";
import { User } from "../../types/User";
import { Role } from "../../types/Role";
import { FormikProps } from "formik";
import { CloudUpload } from "@mui/icons-material";

interface UserFormValues {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  ci: string;
  phone: string;
  // firstLogin?: string;
  role: string;
  address: string;
  imageUrl?: string;
  image?: any;
}

interface UserFormProps {
  open: boolean;
  handleClick: () => void;
  user?: User;
  roles: Role[];
  preview: string | null;
  setPreview: (url: string | null) => void;
  formik: FormikProps<UserFormValues>;
  handleFileChange: any;
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
  setPreview,
  handleFileChange,
}) => {
  return (
    <Dialog onClose={handleClick} open={open}>
      <DialogTitle>Nuevo usuario</DialogTitle>
      <DialogContent>
        <form
          onSubmit={(e) => {
            formik.handleSubmit(e);
          }}
          style={{
            padding: "0.3rem 0 0 0",
          }}
        >
          <TextField
            sx={{ height: "70px" }}
            size="small"
            fullWidth
            label="Nombre(s)"
            {...formik.getFieldProps("firstName")}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            sx={{ height: "70px" }}
            size="small"
            fullWidth
            label="Apellidos"
            {...formik.getFieldProps("lastName")}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            sx={{ height: "70px" }}
            size="small"
            fullWidth
            label="Correo electronico"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            sx={{ height: "70px" }}
            size="small"
            fullWidth
            label="Ci"
            {...formik.getFieldProps("ci")}
            error={formik.touched.ci && Boolean(formik.errors.ci)}
            helperText={formik.touched.ci && formik.errors.ci}
          />
          <TextField
            sx={{ height: "70px" }}
            size="small"
            fullWidth
            label="Telefono"
            {...formik.getFieldProps("phone")}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <FormControl sx={{ height: "70px" }} size="small" fullWidth>
            <InputLabel id="role">Rol</InputLabel>
            <Select
              label="Rol"
              {...formik.getFieldProps("role")}
              error={formik.touched.role && Boolean(formik.errors.role)}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            sx={{
              height: "70px",
            }}
            size="small"
            fullWidth
            label="Direccion"
            {...formik.getFieldProps("address")}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <Box sx={{ height: "70px", display: "flex" }}>
            <Box sx={{ height: "100%", width: "50%" }}>
              <VisuallyHiddenInput
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="image">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUpload />}
                >
                  Subir imagen
                </Button>
              </label>
              {formik.touched.image && formik.errors.image && (
                <Typography
                  color="error"
                  sx={{ fontSize: "12px", p: "4px 0 0 14px" }}
                >
                  {String(formik.errors.image)}
                </Typography>
              )}
            </Box>
            {preview && (
              <Box
                sx={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={preview}
                  alt="Vista previa"
                  style={{
                    width: "65px",
                    height: "65px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </Box>
            )}
          </Box>
          <Box sx={{ pt: "2rem", display: "flex", gap: "1rem" }}>
            <Button variant="contained" color="success" type="submit" fullWidth>
              Registrar
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
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
export default UserForm;
