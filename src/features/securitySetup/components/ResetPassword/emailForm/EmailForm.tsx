import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../validations/resetPasswordSchema";

interface EmailFormContainerProps {
  onSubmit: (email: any) => void;
}

const EmailForm: React.FC<EmailFormContainerProps> = ({
  onSubmit,
}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit,
  });

  return (
    <Box
      sx={{
        width: "20rem",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "10px",
        boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(0,0,0,0.6)",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80px",
        }}
      >
        Restablecer contraseña
      </Typography>
      <Typography
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40px",
        }}
      >
        Escribe tu correo electronico
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "5.5rem",
            display: "flex",
            justifyContent: "center",
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
            label="Correo electronico"
            variant="outlined"
            defaultValue=""
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && (formik.errors.email as string)}
          />
        </Box>
        <Button
          sx={{ width: "90%", margin: "1rem 0 1rem 0" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Enviar
        </Button>
      </form>
    </Box>
  );
};
export default EmailForm;
