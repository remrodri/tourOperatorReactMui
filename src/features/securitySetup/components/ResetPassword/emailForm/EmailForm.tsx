import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../validations/resetPasswordSchema";

interface EmailFormValues {
  email: string;
}

interface Props {
  onSubmit: (values: EmailFormValues) => void;
  isSubmitting: boolean;
  errorMessage: string | null;
}

const EmailForm: React.FC<Props> = ({
  onSubmit,
  isSubmitting,
  errorMessage,
}) => {
  const formik = useFormik<EmailFormValues>({
    initialValues: { email: "" },
    validationSchema: resetPasswordSchema,
    onSubmit,
    validateOnBlur: true,
    validateOnChange: false,
  });

  return (
    <Box sx={{ width: "20rem", background: "rgba(0,0,0,0.5)", p: 3 }}>
      <Typography variant="h5" align="center">
        Restablecer contraseña
      </Typography>

      <Typography align="center" sx={{ mb: 2 }}>
        Escribe tu correo electrónico
      </Typography>

      <form onSubmit={formik.handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          size="small"
          name="email"
          label="Correo electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          disabled={isSubmitting}
        />

        {errorMessage && <Typography color="error">{errorMessage}</Typography>}

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Box>
  );
};

export default EmailForm;
