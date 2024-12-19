import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { answerSchema } from "../../validation/answerSchema";
import { useEffect, useState } from "react";

interface SecurityAnswerContainerProps {
  onSubmit: (answersValues: any) => void;
  questionsAnswers: any;
}

const SecurityAnswerForm: React.FC<SecurityAnswerContainerProps> = ({
  onSubmit,
  questionsAnswers,
}) => {
  const [questionsText, setQuestionsText] = useState([]);
  // console.log("questionsAnswers::: ", questionsAnswers);
  useEffect(() => {
    // console.log('::: ', );
    if (questionsAnswers && questionsAnswers.length > 0) {
      const questions = questionsAnswers.map((questionAnswer: any) => {
        return questionAnswer.question.questionText;
      });
      setQuestionsText(questions);
    }
  }, [questionsAnswers]);
  const formik = useFormik({
    initialValues: {
      answer1: "",
      answer2: "",
      answer3: "",
    },
    validationSchema: answerSchema,
    onSubmit,
  });

  return (
    <Box
      sx={{
        // display: "flex",
        width: {
          sm: "25rem",
        },
        // flexWrap: "wrap",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(5px)",
        borderRadius: "16px",
        p: "20px",
        border: "1px solid rgba(0,0,0,0.7)",
      }}
    >
      <Typography
        variant="h6"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", witdth: "100%", height: "3rem" }}
      >
        Formulario de respuestas de seguridad
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Typography
          // variant="h6"
          component="h2"
          gutterBottom
          // sx={{ textAlign: "center" }}
        >
          {questionsText[0] || "cargando"}
          {/* {questions.questionsAnswers[0].questions.questionsText} */}
          {/* { questionsAnswers? questionsAnswers[0].question.questionText : "pregunta 1"} */}
        </Typography>
        <TextField
          sx={{ height: "70px" }}
          size="small"
          fullWidth
          id="answer1"
          label="Respuesta"
          name="answer1"
          variant="outlined"
          value={formik.values.answer1}
          onChange={formik.handleChange}
          error={formik.touched.answer1 && Boolean(formik.errors.answer1)}
          helperText={formik.touched.answer1 && formik.errors.answer1}
        />
        <Typography
          // variant="h6"
          component="h2"
          gutterBottom
          // sx={{ textAlign: "center" }}
        >
          {questionsText[1] || "cargando"}
        </Typography>
        <TextField
          sx={{ height: "70px" }}
          size="small"
          fullWidth
          id="answer2"
          label="Respuesta"
          name="answer2"
          variant="outlined"
          value={formik.values.answer2}
          onChange={formik.handleChange}
          error={formik.touched.answer2 && Boolean(formik.errors.answer2)}
          helperText={formik.touched.answer2 && formik.errors.answer2}
        />
        <Typography
          // variant="h6"
          component="h2"
          gutterBottom
          // sx={{ textAlign: "center" }}
        >
          {questionsText[0] || "cargando"}
        </Typography>
        <TextField
          sx={{ height: "70px" }}
          size="small"
          fullWidth
          id="answer3"
          label="Respuesta"
          name="answer3"
          variant="outlined"
          value={formik.values.answer3}
          onChange={formik.handleChange}
          error={formik.touched.answer3 && Boolean(formik.errors.answer3)}
          helperText={formik.touched.answer3 && formik.errors.answer3}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Registrar
        </Button>
      </form>
    </Box>
  );
};
export default SecurityAnswerForm;
