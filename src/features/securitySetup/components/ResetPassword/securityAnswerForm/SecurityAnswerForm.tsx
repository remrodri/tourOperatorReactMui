import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { securityAnswerSchema } from "../../../validation/securityAnswerSchema";

interface Props {
  onSubmit: (values: { answerText: string }) => void;
  questionText: string;
  isSubmitting: boolean;
  errorMessage: string | null;
}

const SecurityAnswerForm: React.FC<Props> = ({
  onSubmit,
  questionText,
  isSubmitting,
  errorMessage,
}) => {
  const formik = useFormik<{ answerText: string }>({
    initialValues: { answerText: "" },
    validationSchema: securityAnswerSchema,
    onSubmit,
    validateOnBlur: true,
    validateOnChange: false,
  });

  return (
    <Box sx={{ width: "20rem", background: "rgba(0,0,0,0.5)", p: 3 }}>
      <Typography variant="h5" align="center">
        Restablecer contraseña
      </Typography>

      <Typography align="center" sx={{ my: 2 }}>
        {questionText || "Cargando..."}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          size="small"
          fullWidth
          name="answerText"
          label="Respuesta"
          value={formik.values.answerText}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.answerText && formik.errors.answerText)}
          helperText={formik.touched.answerText && formik.errors.answerText}
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
          {isSubmitting ? "Verificando..." : "Enviar"}
        </Button>
      </form>
    </Box>
  );
};

export default SecurityAnswerForm;
