import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenService } from "../../../../../utils/tokenService";
import { securitySetupService } from "../../../service/securitySetupService";
import { showToast } from "../../../../../utils/modal/toast";
import { jwtDecode } from "jwt-decode";
import { User } from "../../../../userManagement/types/User";
import { response } from "express";

export const useSecurityQuestions = () => {
  const [error, setError] = useState<string | null>(null);
  const [questionsAnswers, setQuestionsAnswers] = useState<
    {
      answer: string;
      question: { questionText: string; _id: string };
      _id: string;
    }[]
  >([]);
  const navigate = useNavigate();

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
        showToast("error", "Error al obtener la preguntas de seguridad");
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
      // console.log("answers::: ", answers);
      const response = await securitySetupService.updateSecurityAnswers(
        token,
        answers
      );
      // console.log('response::: ', response);
      if (response.statusCode !== 200) {
        showToast("error", "Registro fallido");
      }
      showToast("success", "Registro exitoso");
      navigate("/home");
    } catch (error) {
      setError("Error al enviar las respuestas de seguridad");
    }
  };
  return { getSecurityQuestions, error, questionsAnswers, sendSecurityAnswers };
};
