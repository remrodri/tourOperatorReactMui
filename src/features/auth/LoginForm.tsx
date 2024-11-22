import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "./validations/loginSchema";

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
    // enableReinitialize:true,
    onSubmit,
  });
  return (
    <Box
      sx={{
        // height: "30rem",
        width: "20rem",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "10px",
        boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(0,0,0,0.6)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "80px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          // gutterBottom
          sx={{
            // color: "white",
            fontSize: "2rem",
            fontWeight: "500",
          }}
        >
          Iniciar Sesion
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            // height: "80%",
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
              height:"5.5rem"
            }}
          >
            <TextField
              sx={{
                width: "90%",
              }}
              margin="normal"
              size="small"
              // fullWidth
              id="email"
              name="email"
              label="Correo Electronico"
              variant="outlined"
              // value={formik.values.email}
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
              height:"5.5rem"
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
              // value={formik.values.password}
              defaultValue=""
              type="password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && (formik.errors.password as string)}
            />
          </Box>
          <Button
            sx={{ width: "90%", margin: "3rem 0 1rem 0" }}
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
