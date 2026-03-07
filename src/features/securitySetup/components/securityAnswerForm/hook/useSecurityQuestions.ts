import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { TokenService } from "../../../../../utils/tokenService";
import { securitySetupService } from "../../../service/securitySetupService";
import type { UserType } from "../../../../userManagement/types/UserType";
import { useRoleContext } from "../../../../Role/context/RoleContext";

/* ============================
   Types
============================ */
export type QuestionAnswer = {
  answer: string;
  question: {
    questionText: string;
    _id: string;
  };
  _id: string;
};

export interface SecurityAnswersFormValues {
  answer1: string;
  answer2: string;
  answer3: string;
}

/* ============================
   Hook
============================ */
export const useSecurityQuestions = () => {
  const [questionsAnswers, setQuestionsAnswers] = useState<QuestionAnswer[]>(
    [],
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { getRoleById } = useRoleContext();

  /* ============================
     Fetch questions
  ============================ */
  const getSecurityQuestions = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const token = TokenService.getToken();
      if (!token) {
        setError("No hay token");
        return;
      }

      const user: UserType = jwtDecode(token);
      const data = await securitySetupService.getSecurityQuestions(user.id);

      // ❌ si es null, el service ya mostró sileo.error
      if (!data) {
        setError("No se pudieron obtener las preguntas de seguridad");
        return;
      }

      setQuestionsAnswers(data.questionsAnswers ?? []);
      setError(null);
    } catch (err) {
      console.error("Error al obtener preguntas de seguridad:", err);
      setError("Error al obtener las preguntas de seguridad");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getSecurityQuestions();
  }, [getSecurityQuestions]);

  /* ============================
     Send answers
  ============================ */
  const sendSecurityAnswers = useCallback(
    async (values: SecurityAnswersFormValues): Promise<void> => {
      setIsLoading(true);
      try {
        const token = TokenService.getToken();
        if (!token) {
          setError("No hay token");
          return;
        }

        const user: UserType = jwtDecode(token);

        const answersText = [values.answer1, values.answer2, values.answer3];

        const answers = questionsAnswers.map((qa, index) => ({
          answerId: qa.answer,
          answerText: answersText[index],
        }));

        const ok = await securitySetupService.updateSecurityAnswers(
          answers,
          user.id,
        );

        // ❌ si es false, el service ya mostró sileo.error
        if (!ok) {
          setError("No se pudieron enviar las respuestas de seguridad");
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
      } finally {
        setIsLoading(false);
      }
    },
    [questionsAnswers, getRoleById, navigate],
  );

  /* ============================
     Return API
  ============================ */
  return {
    questionsAnswers,
    getSecurityQuestions,
    sendSecurityAnswers,
    isLoading,
    error,
  };
};