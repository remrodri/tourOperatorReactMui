import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { answerSchema } from "../../validation/answerSchema";
import { useEffect, useState } from "react";

import type {
  QuestionAnswer,
  SecurityAnswersFormValues,
} from "./hook/useSecurityQuestions";

interface Props {
  onSubmit: (values: SecurityAnswersFormValues) => void;
  questionsAnswers: QuestionAnswer[];
  isSubmitting: boolean;
  errorMessage: string | null;
}

const ANSWER_FIELDS: Array<keyof SecurityAnswersFormValues> = [
  "answer1",
  "answer2",
  "answer3",
];

const SecurityAnswerForm: React.FC<Props> = ({
  onSubmit,
  questionsAnswers,
  isSubmitting,
  errorMessage,
}) => {
  const [questionsText, setQuestionsText] = useState<string[]>([]);

  useEffect(() => {
    if (questionsAnswers.length > 0) {
      setQuestionsText(questionsAnswers.map((qa) => qa.question.questionText));
    }
  }, [questionsAnswers]);

  const formik = useFormik<SecurityAnswersFormValues>({
    initialValues: {
      answer1: "",
      answer2: "",
      answer3: "",
    },
    validationSchema: answerSchema,
    onSubmit,
    validateOnBlur: true,
    validateOnChange: false, // ✅ mejor UX (valida al salir)
  });

  return (
    <Box sx={{ width: "25rem", background: "rgba(0,0,0,0.6)", p: 3 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Formulario de respuestas de seguridad
      </Typography>

      <form onSubmit={formik.handleSubmit} noValidate>
        {ANSWER_FIELDS.map((field, index) => (
          <Box key={field} mb={2}>
            <Typography gutterBottom>
              {questionsText[index] || "Cargando..."}
            </Typography>

            <TextField
              variant="outlined"
              size="small"
              fullWidth
              required
              disabled={isSubmitting}
              autoComplete="off"
              name={field}
              label="Respuesta"
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched[field] && formik.errors[field])}
              helperText={
                formik.touched[field] && formik.errors[field]
                  ? formik.errors[field]
                  : " "
              }
            />
          </Box>
        ))}

        {errorMessage && (
          <Typography color="error" sx={{ mb: 1 }}>
            {errorMessage}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Registrar"}
        </Button>
      </form>
    </Box>
  );
};

export default SecurityAnswerForm;
