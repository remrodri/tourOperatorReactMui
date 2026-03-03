/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";
import { sileo } from "sileo";
import { axiosPublic, axiosPrivate } from "../../../config/axiosConfig";
import type { ApiResponse } from "../../../types/api";

/**
 * Helpers (copiados del patrón de tu userService)
 */
const extractBackendMessage = (payload: any): string | null => {
  if (!payload) return null;

  const direct =
    payload.message ||
    payload.error ||
    payload.msg ||
    payload.detail ||
    payload.details;

  if (typeof direct === "string" && direct.trim()) return direct;

  const nested =
    payload.data?.message || payload.data?.error || payload.data?.msg;
  if (typeof nested === "string" && nested.trim()) return nested;

  if (typeof payload.data === "string" && payload.data.trim())
    return payload.data;

  if (Array.isArray(payload.errors) && payload.errors.length) {
    const mapped = payload.errors
      .map((e: any) => (typeof e === "string" ? e : e?.message || e?.msg))
      .filter(Boolean)
      .join(", ");
    if (mapped.trim()) return mapped;
  }

  if (
    payload.errors &&
    typeof payload.errors === "object" &&
    !Array.isArray(payload.errors)
  ) {
    const values = Object.values(payload.errors)
      .map((v: any) => (typeof v === "string" ? v : v?.message || v?.msg))
      .filter(Boolean)
      .join(", ");
    if (values.trim()) return values;
  }

  return null;
};

const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (!isAxiosError(error)) return fallback;
  const payload: any = error.response?.data;
  const msg = extractBackendMessage(payload);
  return msg ?? fallback;
};

const isLogicalErrorResponse = (responseData: any): boolean => {
  const hasMsg = Boolean(extractBackendMessage(responseData));

  const data = responseData?.data;
  const hasData = data !== null && data !== undefined;

  if (!hasData && hasMsg) return true;

  if (responseData?.success === false) return true;
  if (responseData?.ok === false) return true;
  if (responseData?.status === "error") return true;

  return false;
};

/**
 * Tipos mínimos (puedes mejorarlos si ya tienes interfaces reales)
 */
export type SecurityQuestion = any;
export type SecurityAnswerCheckResult = any;
export type UpdatePasswordResult = any;

export const securitySetupService = {
  /**
   * ✅ SIN TOKEN -> axiosPublic
   * PATCH /security-setup-password
   */
  updatePasswordWithoutToken: async (
    password: string,
    userId: string,
  ): Promise<UpdatePasswordResult | null> => {
    try {
      const response = await axiosPublic.patch<ApiResponse<any>>(
        "/security-setup-password",
        { userId, newPassword: password },
        { headers: { "Content-Type": "application/json" } },
      );

      const dataAny: any = response.data;
      if (isLogicalErrorResponse(dataAny)) {
        sileo.error({
          title: "Error",
          description:
            extractBackendMessage(dataAny) ??
            "No se pudo actualizar la contraseña",
        });
        return null;
      }

      sileo.success({
        title: "Éxito",
        description:
          extractBackendMessage(response.data) ??
          "Contraseña actualizada correctamente",
      });

      return response.data.data;
    } catch (error) {
      const msg = getApiErrorMessage(
        error,
        "No se pudo actualizar la contraseña",
      );
      sileo.error({ title: "Error", description: msg });
      return null;
    }
  },

  /**
   * ✅ SIN TOKEN -> axiosPublic
   * POST /security-setup-answer
   */
  checkSecurityAnswer: async (answer: {
    userId: string | undefined;
    questionId: string;
    answerText: string;
  }): Promise<SecurityAnswerCheckResult | null> => {
    try {
      const response = await axiosPublic.post<ApiResponse<any>>(
        "/security-setup-answer",
        answer,
        { headers: { "Content-Type": "application/json" } },
      );

      const dataAny: any = response.data;
      if (isLogicalErrorResponse(dataAny)) {
        sileo.error({
          title: "Error",
          description:
            extractBackendMessage(dataAny) ??
            "Respuesta de seguridad incorrecta",
        });
        return null;
      }

      // Aquí puedes decidir si mostrar success o no (a veces es mejor no spamear).
      sileo.success({
        title: "Éxito",
        description:
          extractBackendMessage(response.data) ??
          "Respuesta verificada correctamente",
      });

      return response.data.data;
    } catch (error) {
      const msg = getApiErrorMessage(
        error,
        "No se pudo verificar la respuesta",
      );
      sileo.error({ title: "Error", description: msg });
      return null;
    }
  },

  /**
   * ✅ SIN TOKEN -> axiosPublic
   * GET /security-setup/random-question/:userId
   */
  getRandomQuestion: async (
    userId: string,
  ): Promise<SecurityQuestion | null> => {
    try {
      const response = await axiosPublic.get<ApiResponse<any>>(
        `/security-setup/random-question/${userId}`,
      );

      const dataAny: any = response.data;
      if (isLogicalErrorResponse(dataAny)) {
        sileo.error({
          title: "Error",
          description:
            extractBackendMessage(dataAny) ?? "No se pudo obtener una pregunta",
        });
        return null;
      }

      return response.data.data;
    } catch (error) {
      const msg = getApiErrorMessage(error, "No se pudo obtener una pregunta");
      sileo.error({ title: "Error", description: msg });
      return null;
    }
  },

  /**
   * ✅ SIN TOKEN -> axiosPublic
   * POST /security-setup-question
   */
  findUserByEmail: async (email: string): Promise<any | null> => {
    try {
      const response = await axiosPublic.post<ApiResponse<any>>(
        "/security-setup-question",
        { email },
        { headers: { "Content-Type": "application/json" } },
      );

      const dataAny: any = response.data;
      if (isLogicalErrorResponse(dataAny)) {
        sileo.error({
          title: "Error",
          description:
            extractBackendMessage(dataAny) ?? "No se encontró el usuario",
        });
        return null;
      }

      return response.data.data;
    } catch (error) {
      const msg = getApiErrorMessage(error, "No se encontró el usuario");
      sileo.error({ title: "Error", description: msg });
      return null;
    }
  },

  /**
   * ✅ CON TOKEN -> axiosPrivate
   * PATCH /security-setup
   */
  updatePassword: async (
    password: string,
    userId: string,
  ): Promise<UpdatePasswordResult | null> => {
    try {
      const response = await axiosPrivate.patch<ApiResponse<any>>(
        "/security-setup",
        { newPassword: password, userId },
        { headers: { "Content-Type": "application/json" } },
      );

      const dataAny: any = response.data;
      if (isLogicalErrorResponse(dataAny)) {
        sileo.error({
          title: "Error",
          description:
            extractBackendMessage(dataAny) ??
            "No se pudo actualizar la contraseña",
        });
        return null;
      }

      sileo.success({
        title: "Éxito",
        description:
          extractBackendMessage(response.data) ??
          "Contraseña actualizada correctamente",
      });

      return response.data.data;
    } catch (error) {
      const msg = getApiErrorMessage(
        error,
        "No se pudo actualizar la contraseña",
      );
      sileo.error({ title: "Error", description: msg });
      return null;
    }
  },

  /**
   * ✅ CON TOKEN -> axiosPrivate
   * POST /security-setup-questions
   */
  getSecurityQuestions: async (userId: string): Promise<any | null> => {
    try {
      const response = await axiosPrivate.post<ApiResponse<any>>(
        "/security-setup-questions",
        { userId },
        { headers: { "Content-Type": "application/json" } },
      );

      const dataAny: any = response.data;
      if (isLogicalErrorResponse(dataAny)) {
        sileo.error({
          title: "Error",
          description:
            extractBackendMessage(dataAny) ??
            "No se pudieron obtener las preguntas",
        });
        return null;
      }

      return response.data.data;
    } catch (error) {
      const msg = getApiErrorMessage(
        error,
        "No se pudieron obtener las preguntas",
      );
      sileo.error({ title: "Error", description: msg });
      return null;
    }
  },

  /**
   * ✅ CON TOKEN -> axiosPrivate
   * PATCH /security-setup-answers
   */
  updateSecurityAnswers: async (
    answers: { answerId: string; answerText: string }[],
    userId: string,
  ): Promise<any | null> => {
    try {
      const response = await axiosPrivate.patch<ApiResponse<any>>(
        "/security-setup-answers",
        { answers, userId },
        { headers: { "Content-Type": "application/json" } },
      );

      const dataAny: any = response.data;
      if (isLogicalErrorResponse(dataAny)) {
        sileo.error({
          title: "Error",
          description:
            extractBackendMessage(dataAny) ??
            "No se pudieron actualizar las respuestas",
        });
        return null;
      }

      sileo.success({
        title: "Éxito",
        description:
          extractBackendMessage(response.data) ??
          "Respuestas actualizadas correctamente",
      });

      return response.data.data;
    } catch (error) {
      const msg = getApiErrorMessage(
        error,
        "No se pudieron actualizar las respuestas",
      );
      sileo.error({ title: "Error", description: msg });
      return null;
    }
  },
};
