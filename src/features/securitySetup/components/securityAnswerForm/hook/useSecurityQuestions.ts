/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { TokenService } from "../../../../../utils/tokenService";
import { securitySetupService } from "../../../service/securitySetupService";
import type { UserType } from "../../../../userManagement/types/UserType";
import { useRoleContext } from "../../../../Role/context/RoleContext";

type QuestionAnswer = {
  answer: string;
  question: { questionText: string; _id: string };
  _id: string;
};

export const useSecurityQuestions = () => {
  const [error, setError] = useState<string | null>(null);
  const [questionsAnswers, setQuestionsAnswers] = useState<QuestionAnswer[]>(
    [],
  );

  const navigate = useNavigate();
  const { getRoleById } = useRoleContext();

  const getSecurityQuestions = useCallback(async (): Promise<void> => {
    try {
      const token = TokenService.getToken();
      if (!token) {
        setError("No hay token");
        return;
      }

      const user: UserType = jwtDecode(token);
      const userId = user.id;

      const data = await securitySetupService.getSecurityQuestions(userId);

      // ❌ si es null, el service ya mostró sileo.error
      if (!data) {
        setError("No se pudieron obtener las preguntas");
        return;
      }

      // Ajusta el path si tu backend devuelve otra estructura
      setQuestionsAnswers(data.questionsAnswers ?? []);
      setError(null);
    } catch (err) {
      console.error("Error al obtener preguntas de seguridad:", err);
      setError("Error al obtener las preguntas de seguridad");
    }
  }, []);

  useEffect(() => {
    getSecurityQuestions();
  }, [getSecurityQuestions]);

  const sendSecurityAnswers = useCallback(
    async (answerValues: {
      answer1: string;
      answer2: string;
      answer3: string;
    }): Promise<void> => {
      try {
        const token = TokenService.getToken();
        if (!token) {
          setError("No hay token");
          return;
        }

        const user: UserType = jwtDecode(token);
        const userId = user.id;

        const answersText = [
          answerValues.answer1,
          answerValues.answer2,
          answerValues.answer3,
        ];

        const answers = questionsAnswers.map((qa, index) => ({
          answerId: qa.answer,
          answerText: answersText[index],
        }));

        const result = await securitySetupService.updateSecurityAnswers(
          answers,
          userId,
        );

        // ❌ si es null, el service ya mostró sileo.error
        if (!result) {
          setError("No se pudieron enviar las respuestas");
          return;
        }

        setError(null);

        const role = getRoleById(user.role);
        if (role?.name === "guia de turismo") {
          navigate("../../guia-de-turismo");
          return;
        }

        navigate("/personal");
      } catch (err) {
        console.error("Error al enviar respuestas de seguridad:", err);
        setError("Error al enviar las respuestas de seguridad");
      }
    },
    [questionsAnswers, getRoleById, navigate],
  );

  return {
    getSecurityQuestions,
    sendSecurityAnswers,
    questionsAnswers,
    error,
  };
};
