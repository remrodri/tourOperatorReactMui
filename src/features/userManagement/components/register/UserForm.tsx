import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Role } from "../../types/Role";
import { User } from "../../types/User";
import { useFormik } from "formik";
import { userSchema } from "./validations/userSchema";
import { useEffect, useState } from "react";
import { CloudUpload } from "@mui/icons-material";

interface UserRegistrationFormProps {
  roles: Role[];
  loading: boolean;
  onSubmit: (values: any) => void;
  error?: string | null;
  userToUpdate?: User;
  preview: string | null;
  setPreview: (url: string | null) => void;
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

const RegisterUserForm: React.FC<UserRegistrationFormProps> = ({
  roles,
  loading,
  onSubmit,
  error,
  userToUpdate,
  preview,
  setPreview,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // console.log("userToUpdate::: ", userToUpdate);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      ci: "",
      role: "",
      address: "",
      image: null,
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      onSubmit({ ...values, image: selectedFile });
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      formik.setFieldValue("image", file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  useEffect(() => {
    if (userToUpdate) {
      formik.setValues({
        firstName: userToUpdate.firstName,
        lastName: userToUpdate.lastName,
        email: userToUpdate.email,
        phone: userToUpdate.phone,
        ci: userToUpdate.ci,
        role: userToUpdate.role || "",
        address: userToUpdate.address || "",
        image: null,
      });
    }
  }, [userToUpdate]);

  return (
    <Box
      sx={{
        display: "flex",
        // height: "100%",
        // overflowY:"auto",
        width: {
          sm: "25rem",
        },
        flexWrap: "wrap",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(5px)",
        borderRadius: "16px",
        p: "10px",
        border: "1px solid rgba(0,0,0,0.7)",
      }}
    >
      <Typography
        variant="h6"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", width: "100%", height: "3rem" }}
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
            label="Rol"
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
        {/* {loading && <CircularProgress />}
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )} */}
        <TextField
          sx={{ height: "70px" }}
          size="small"
          fullWidth
          id="address"
          name="address"
          label="Direccion"
          variant="outlined"
          value={formik.values.address}
          onChange={formik.handleChange}
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
                // sx={{ mb: 2 }}
              >
                Subir imagen
              </Button>
            </label>
            {formik.touched.image &&
              typeof formik.errors.image === "string" && (
                <Typography
                  color="error"
                  sx={{ fontSize: "12px", p: "4px 0 0 14px" }}
                >
                  {formik.errors.image}
                </Typography>
              )}
          </Box>
          {preview && (
            <Box
              sx={{
                width: "50%",
                height: "100%",
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
                // mt: 2,
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
              ></img>
            </Box>
          )}
        </Box>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            mt: "1rem",
          }}
        >
          {userToUpdate ? "Actualizar" : "Registrar"}
        </Button>
      </form>
    </Box>
  );
};
export default RegisterUserForm;
