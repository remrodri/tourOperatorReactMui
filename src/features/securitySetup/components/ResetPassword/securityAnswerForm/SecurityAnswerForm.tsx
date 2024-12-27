import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { securityAnswerSchema } from "../../../validation/securityAnswerSchema";
import { useEffect, useState } from "react";

interface SecurityAnswerFormcontainerProps {
  onSubmit: (answerText: any) => void;
  question: any;
}

const SecurityAnswerForm: React.FC<SecurityAnswerFormcontainerProps> = ({
  onSubmit,
  question,
}) => {
  const [questionText, setQuestionText] = useState("");
  useEffect(() => {
    if (question) {
      setQuestionText(question.questionText);
    }
  }, [question]);

  // console.log("question::: ", questionText);
  const formik = useFormik({
    initialValues: {
      answerText: "",
    },
    validationSchema: securityAnswerSchema,
    onSubmit,
  });
  return (
    <Box
      sx={{
        width: "20rem",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "10px",
        boxShadow: "0,4px,30px,rgba(0,0,0,0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(0,0,0,0.6)",
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
        Responde la pregunta
        <br />
        {/* {questionText} */}
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
        {questionText || "Cargando"}
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
        <TextField
          sx={{
            width: "90%",
          }}
          margin="normal"
          size="small"
          id="answerText"
          name="answerText"
          label="respuesta"
          variant="outlined"
          defaultValue=""
          onChange={formik.handleChange}
          error={formik.touched.answerText && Boolean(formik.errors.answerText)}
          helperText={formik.touched.answerText && (formik.errors.answerText as string)}
        />
        <Button
          sx={{
            width: "90%",
            margin: "1rem 0 1rem 0",
          }}
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
export default SecurityAnswerForm;
