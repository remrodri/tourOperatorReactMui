import { useState } from "react";
import { TokenService } from "../../../../../utils/tokenService";
import { securitySetupService } from "../../../service/securitySetupService";
import { showToast } from "../../../../../utils/modal/toast";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const [error, setError] = useState<string | null>(null);
  // const token = TokenService.getToken();
  const [question, setQuestion] = useState<{
    questionId: string;
    questionText: string;
  }>({ questionId: "", questionText: "" });
  const navigate = useNavigate();

  const findUserByEmail = async (email: string) => {
    // console.log('password::: ', password);
    // if (!token) {
    //   setError("No hay token");
    //   return;
    // }
    try {
      const response = await securitySetupService.findUserByEmail(
        // token,
        email
      );
      // console.log("response::: ", response);
      if (response.statusCode !== 200) {
        showToast("error", response.message);
        return;
      }
      const userId = response.data.userId;
      // setQuestion(response.data.questionText);
      navigate(`../respuesta-de-seguridad/${userId}`);
      // console.log("response::: ", response);
    } catch (error) {
      setError("Error al obtener la pregunta de seguridad");
    }
  };

  const getRandomQuestion = async (userId: string) => {
    try {
      const response = await securitySetupService.getRandomQuestion(userId);
      // console.log("response::: ", response);
      if (response.statusCode !== 200) {
        showToast("error", response.message);
        return;
      }
      setQuestion(response.data);
    } catch (error) {
      setError("Error al obtener la pregunta de seguridad");
    }
  };

  const checkSecurityAnswer = async (answer: {
    userId: string | undefined;
    questionId: string;
    answerText: string;
  }) => {
    try {
      const response = await securitySetupService.checkSecurityAnswer(answer);
      console.log("response::: ", response);
      if (response.statusCode !== 200) {
        showToast("error", response.message);
        return;
      }
      showToast("success", "Respuesta correcta");
      navigate(`../actualizar-contraseña/${answer.userId}`);
    } catch (error) {
      setError("Error al revisar la respuesta de seguridad");
    }
  };

  return {
    findUserByEmail,
    error,
    question,
    getRandomQuestion,
    checkSecurityAnswer,
  };
};
