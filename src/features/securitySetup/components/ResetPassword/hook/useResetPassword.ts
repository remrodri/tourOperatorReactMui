import { useState } from "react";
import { TokenService } from "../../../../../utils/tokenService";
import { securitySetupService } from "../../../service/securitySetupService";
import { useNewSnackbar } from "../../../../../context/SnackbarContext";
import { useNavigate } from "react-router-dom";
import { useRoleContext } from "../../../../Role/context/RoleContext";

export const useResetPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const {showSnackbar} = useNewSnackbar();
  // const token = TokenService.getToken();
  const [question, setQuestion] = useState<{
    questionId: string;
    questionText: string;
  }>({ questionId: "", questionText: "" });
  const navigate = useNavigate();
  const { getRoleById } = useRoleContext();
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
        showSnackbar(response.message,"error");
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
        showSnackbar(response.message,"error");
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
        showSnackbar(response.message,"error");
        return;
      }
      showSnackbar("Respuesta correcta","success");
      if(getRoleById(answer.userId as string).name==="guia de turismo"){
        navigate("guia-de-turismo");
        return;
      }
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
