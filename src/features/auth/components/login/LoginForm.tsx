import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "../../validations/loginSchema";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface LoginFormContainerProps {
  onSubmit: (userData: { email: string; password: string }) => void;
  setShowPassword: (showPassword: boolean) => void;
  showPassword: boolean;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormContainerProps> = ({
  onSubmit,
  setShowPassword,
  showPassword,
  loading,
}) => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <Box
      sx={{
        height: "100%",
        width: "24rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{
          height: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ width: "90%" }}
            margin="normal"
            size="small"
            id="email"
            name="email"
            label="Correo electrónico"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            sx={{ width: "90%" }}
            margin="normal"
            size="small"
            id="password"
            name="password"
            label="Contraseña"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Link
            href="/configuracion-de-seguridad/restablecer-contraseña"
            variant="body2"
            underline="none"
            sx={{ p: "0 0 0 1.5rem", textAlign: "left", width: "100%" }}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ width: "90%", margin: "2rem 0 1rem 0" }}
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Ingresar"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
