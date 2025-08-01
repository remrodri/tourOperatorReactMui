import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "../../validations/loginSchema";
import TextType from "../../../../TextAnimations/TextType/TextType";

interface LoginFormContainerProps {
  onSubmit: (userData: any) => void;
}

const LoginForm: React.FC<LoginFormContainerProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });
  return (
    <Box
      sx={{
        height: "100%",
        width: "50%",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "10px",
        border: "1px solid rgba(49, 49, 49, 0.23)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 30px rgba(0,0,0,1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "30%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontSize: "2rem",
            fontWeight: "500",
          }}
        >
          <TextType
            text="Iniciar sesión"
            typingSpeed={50}
            pauseDuration={1000}
            showCursor={true}
            cursorCharacter="_"
            deletingSpeed={50}
          />
        </Typography>
      </Box>
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
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              height: "5.5rem",
            }}
          >
            <TextField
              sx={{
                width: "90%",
              }}
              margin="normal"
              size="small"
              id="email"
              name="email"
              label="Correo electrónico"
              variant="outlined"
              defaultValue=""
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={
                formik.touched.email && (formik.errors.email as string)
              }
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              height: "5.5rem",
            }}
          >
            <TextField
              sx={{ width: "90%" }}
              margin="normal"
              size="small"
              id="password"
              name="password"
              label="Contraseña"
              variant="outlined"
              defaultValue=""
              type="password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                formik.touched.password && (formik.errors.password as string)
              }
            />
          </Box>
          <Link
            href="/configuracion-de-seguridad/restablecer-contraseña"
            variant="caption"
            underline="none"
            width="100%"
            sx={{
              p: "0 0 0 1.5rem",
              textAlign: "left",
              ":hover": {
                cursor: "pointer",
                color: "white",
              },
            }}
          >
            Olvidaste tu contraseña?
          </Link>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{ width: "90%", margin: "2rem 0 1rem 0" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Ingresar
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default LoginForm;
