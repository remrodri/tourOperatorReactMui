import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenService } from "../../../../../utils/tokenService";
import { securitySetupService } from "../../../service/securitySetupService";
// import { showToast } from "../../../../../utils/modal/toast";
import { jwtDecode } from "jwt-decode";
import { User } from "../../../../userManagement/types/User";
// import { response } from "express";
import { useNewSnackbar } from "../../../../../context/SnackbarContext";
import { useRoleContext } from "../../../../Role/context/RoleContext";

export const useSecurityQuestions = () => {
  const { showSnackbar } = useNewSnackbar();
  const [error, setError] = useState<string | null>(null);
  const [questionsAnswers, setQuestionsAnswers] = useState<
    {
      answer: string;
      question: { questionText: string; _id: string };
      _id: string;
    }[]
  >([]);
  const navigate = useNavigate();
  const { getRoleById } = useRoleContext();

  useEffect(() => {
    getSecurityQuestions();
  }, []);

  const getSecurityQuestions = async (): Promise<any> => {
    try {
      const token = TokenService.getToken();
      if (!token) {
        setError("No hay token");
        return;
      }
      const user: User = jwtDecode(token);
      const userId = user.id;
      const response = await securitySetupService.getSecurityQuestions(
        userId,
        token
      );

      if (!response && response.statusCode !== 200) {
        // showToast("error", "Error al obtener la preguntas de seguridad");
        showSnackbar("Error al obtener las preguntas", "error");
      }
      // const questionsAnswers = response.data;
      // console.log("questionsAnswers::: ", questionsAnswers);
      setQuestionsAnswers(
        // questionsAnswers.map(
        //   (questionAnswer: any) => questionAnswer.question.questionText
        // )
        response.data.questionsAnswers
      );
      // console.log('questionsText::: ', response);

      // return response;
    } catch (error) {
      setError("Error al obtener las preguntas de seguridad");
    }
  };

  const sendSecurityAnswers = async (answerValues: {
    answer1: string;
    answer2: string;
    answer3: string;
  }): Promise<any> => {
    // console.log("answerValues::: ", answerValues);
    // console.log("questionsAnswers::: ", questionsAnswers);
    // if (!questionsAnswers) {

    // }
    const answersText = [
      answerValues.answer1,
      answerValues.answer2,
      answerValues.answer3,
    ];
    try {
      const token = TokenService.getToken();
      if (!token) {
        setError("No hay token");
        return;
      }
      const answers = questionsAnswers.map((questionAnswer, index) => {
        return {
          answerId: questionAnswer.answer,
          answerText: answersText[index],
        };
      });
      const user: User = jwtDecode(token);
      const userId = user.id;
      // console.log("answers::: ", answers);
      const response = await securitySetupService.updateSecurityAnswers(
        token,
        answers,
        userId
      );
      // console.log('response::: ', response);
      if (response.statusCode !== 200) {
        // showToast("error", "Registro fallido");
        showSnackbar("Error al enviar las respuestas", "error");
      }
      // showToast("success", "Registro exitoso");
      showSnackbar("Respuestas enviadas", "success");
      if (getRoleById(user.role).name === "guia de turismo") {
        navigate("../../guia-de-turismo");
        return;
      }
      navigate("/gestion-de-usuarios/usuarios");
    } catch (error) {
      setError("Error al enviar las respuestas de seguridad");
    }
  };
  return { getSecurityQuestions, error, questionsAnswers, sendSecurityAnswers };
};
