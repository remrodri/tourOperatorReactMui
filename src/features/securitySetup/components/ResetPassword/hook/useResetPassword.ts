import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { securitySetupService } from "../../../service/securitySetupService";

/* ============================
   Types
============================ */
export type SecurityQuestion = {
  questionId: string;
  questionText: string;
};

export type CheckAnswerPayload = {
  userId: string;
  questionId: string;
  answerText: string;
};

/* ============================
   Hook
============================ */
export const useResetPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<SecurityQuestion | null>(null);

  const navigate = useNavigate();

  /* ============================
     Step 1: find user by email
  ============================ */
  const findUserByEmail = useCallback(
    async (email: string): Promise<void> => {
      setIsLoading(true);
      try {
        const data = await securitySetupService.findUserByEmail(email);

        // ❌ null => service ya mostró sileo.error
        if (!data) {
          setError("No se encontró el usuario");
          return;
        }

        setError(null);
        navigate(`../respuesta-de-seguridad/${data.userId}`);
      } catch (err) {
        console.error("Error buscando usuario:", err);
        setError("Error al buscar el usuario");
      } finally {
        setIsLoading(false);
      }
    },
    [navigate],
  );

  /* ============================
     Step 2: get random question
  ============================ */
  const getRandomQuestion = useCallback(
    async (userId: string): Promise<void> => {
      setIsLoading(true);
      try {
        const data = await securitySetupService.getRandomQuestion(userId);

        if (!data) {
          setError("No se pudo obtener la pregunta de seguridad");
          return;
        }

        setQuestion(data);
        setError(null);
      } catch (err) {
        console.error("Error obteniendo pregunta:", err);
        setError("Error al obtener la pregunta de seguridad");
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  /* ============================
     Step 3: check answer
  ============================ */
  const checkSecurityAnswer = useCallback(
    async (payload: {
      userId: string;
      questionId: string;
      answerText: string;
    }): Promise<void> => {
      setIsLoading(true);
      try {
        const ok = await securitySetupService.checkSecurityAnswer(payload);

        // ❌ false => service ya mostró sileo.error
        if (!ok) {
          setError("La respuesta es incorrecta");
          return;
        }

        setError(null);
        navigate(`../actualizar-contraseña/${payload.userId}`);
      } catch (err) {
        console.error("Error verificando respuesta:", err);
        setError("Error al verificar la respuesta");
      } finally {
        setIsLoading(false);
      }
    },
    [navigate],
  );

  /* ============================
     API
  ============================ */
  return {
    // state
    error,
    isLoading,
    question,

    // actions
    findUserByEmail,
    getRandomQuestion,
    checkSecurityAnswer,
  };
};
