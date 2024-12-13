import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { passwordSchema } from "./validation/passwordSchema";

interface PasswordFormContainerProps {
  onSubmit: (passwords: any) => void;
}

const PasswordForm: React.FC<PasswordFormContainerProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit,
  });

  return (
    <Box
      sx={{
        width: "20rem",
        background: "rgba(0,0,0,0.7)",
        borderRadius: "10px",
        boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(0,0,0,0.8)",
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
          variant="h6"
          sx={{
            // fontSize: "2rem",
            fontWeight: "500",
          }}
        >
          Actualizar contraseña
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
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
              label="Contraseña"
              variant="outlined"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                formik.touched.password && (formik.errors.password as string)
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
              sx={{
                width: "90%",
              }}
              margin="normal"
              size="small"
              label="Confirma la contraseña"
              variant="outlined"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword &&
                (formik.errors.confirmPassword as string)
              }
            />
          </Box>
          <Button
            sx={{ width: "90%", margin: "3rem 0 1rem 0" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Enviar
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default PasswordForm;
