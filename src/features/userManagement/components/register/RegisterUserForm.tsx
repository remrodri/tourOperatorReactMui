import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Role } from "../../types/Role";
import { User } from "../../types/User";
import { useFormik } from "formik";
import { userSchema } from "./validations/userSchema";

interface UserRegistrationFormProps {
  roles: Role[];
  loading: boolean;
  onSubmit: (values: any) => void;
  error?: string | null;
}

const RegisterUserForm: React.FC<UserRegistrationFormProps> = ({
  roles,
  loading,
  onSubmit,
  error,
}) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      ci: "",
      role: "",
    },
    validationSchema: userSchema,
    onSubmit,
  });
  return (
    <Box
      sx={{
        display: "flex",
        // height: "100%",
        // overflowY:"auto",
        width: {
          sm:"25rem"
        },
        flexWrap: "wrap",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(5px)",
        borderRadius: "16px",
        p: "20px",
        border:"1px solid rgba(0,0,0,0.7)"
      }}
    >
      <Typography
        variant="h6"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", width: "100%", height: "3rem"}}
      >
        Formulario de registro
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ height: "70px" }}
          size="small"
          fullWidth
          id="firstName"
          label="Nombre(s)"
          name="firstName"
          variant="outlined"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={
            formik.touched.firstName ? (formik.errors.firstName as string) : ""
          }
        />
        <TextField
          sx={{ height: "70px" }}
          size="small"
          fullWidth
          id="lastName"
          name="lastName"
          label="Apellido(s)"
          variant="outlined"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          sx={{ height: "70px" }}
          size="small"
          fullWidth
          id="email"
          name="email"
          label="Correo electronico"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          sx={{ height: "70px" }}
          size="small"
          fullWidth
          id="ci"
          name="ci"
          label="Cedula de identidad"
          variant="outlined"
          value={formik.values.ci}
          onChange={formik.handleChange}
          error={formik.touched.ci && Boolean(formik.errors.ci)}
          helperText={formik.touched.ci && formik.errors.ci}
        />
        <TextField
          sx={{ height: "70px" }}
          size="small"
          fullWidth
          id="phone"
          name="phone"
          label="Telefono"
          variant="outlined"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <FormControl sx={{ height: "70px" }} size="small" fullWidth>
          <InputLabel id="role">Rol</InputLabel>
          <Select
            labelId="role"
            id="role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            // label="role"
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {loading && <CircularProgress />}
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button color="primary" variant="contained" fullWidth type="submit">
          Registrar
        </Button>
      </form>
    </Box>
  );
};
export default RegisterUserForm;
