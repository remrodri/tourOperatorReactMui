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
  if (!responseData) return true;

  // ✅ Si hay statusCode y es 2xx, NO lo trates como error,
  // aunque data sea null. (caso updatePassword)
  const code = responseData.statusCode;
  if (typeof code === "number" && code >= 200 && code < 300) {
    // pero si el backend explícitamente dice que falló, sí es error
    if (responseData.success === false) return true;
    if (responseData.ok === false) return true;
    if (responseData.status === "error") return true;
    return false;
  }

  // Si hay statusCode y no es 2xx => error lógico
  if (typeof code === "number" && (code < 200 || code >= 300)) return true;

  // fallback a tus reglas anteriores
  const hasMsg = Boolean(extractBackendMessage(responseData));
  const hasData = responseData.data !== null && responseData.data !== undefined;

  if (!hasData && hasMsg) return true;

  if (responseData.success === false) return true;
  if (responseData.ok === false) return true;
  if (responseData.status === "error") return true;

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
  ): Promise<boolean> => {
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
        return false;
      }

      sileo.success({
        title: "Éxito",
        description:
          extractBackendMessage(dataAny) ??
          "Contraseña actualizada correctamente",
      });

      return true; // ✅ éxito aunque data sea null
    } catch (error) {
      const msg = getApiErrorMessage(
        error,
        "No se pudo actualizar la contraseña",
      );
      sileo.error({ title: "Error", description: msg });
      return false;
    }
  },

  /**
   * ✅ SIN TOKEN -> axiosPublic
   * POST /security-setup-answer
   */
  checkSecurityAnswer: async (payload: {
    userId: string | undefined;
    questionId: string;
    answerText: string;
  }): Promise<boolean> => {
    try {
      const response = await axiosPublic.post<ApiResponse<any>>(
        "/security-setup-answer",
        payload,
        { headers: { "Content-Type": "application/json" } },
      );

      const dataAny: any = response.data;

      // ❌ solo error si REALMENTE es error
      if (isLogicalErrorResponse(dataAny)) {
        sileo.error({
          title: "Error",
          description: extractBackendMessage(dataAny) ?? "Respuesta incorrecta",
        });
        return false;
      }

      // ✅ éxito aunque data sea null
      sileo.success({
        title: "Correcto",
        description: extractBackendMessage(dataAny) ?? "Respuesta correcta",
      });

      return true;
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al verificar la respuesta");
      sileo.error({ title: "Error", description: msg });
      return false;
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
  ): Promise<boolean> => {
    try {
      const response = await axiosPrivate.patch<ApiResponse<any>>(
        "/security-setup",
        { newPassword: password, userId },
        { headers: { "Content-Type": "application/json" } },
      );

      const dataAny: any = response.data;

      // ✅ si NO es error lógico, fue éxito aunque data sea null
      if (isLogicalErrorResponse(dataAny)) {
        sileo.error({
          title: "Error",
          description:
            extractBackendMessage(dataAny) ??
            "No se pudo actualizar la contraseña",
        });
        return false;
      }

      sileo.success({
        title: "Éxito",
        description:
          extractBackendMessage(dataAny) ??
          "Contraseña actualizada correctamente",
      });

      return true;
    } catch (error) {
      const msg = getApiErrorMessage(
        error,
        "No se pudo actualizar la contraseña",
      );
      sileo.error({ title: "Error", description: msg });
      return false;
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
  ): Promise<boolean> => {
    try {
      const response = await axiosPrivate.patch<ApiResponse<any>>(
        "/security-setup-answers",
        { answers, userId },
        { headers: { "Content-Type": "application/json" } },
      );

      const dataAny: any = response.data;

      // ✅ IMPORTANTE: aquí tu isLogicalErrorResponse NO debe marcar error si statusCode es 200
      if (isLogicalErrorResponse(dataAny)) {
        sileo.error({
          title: "Error",
          description:
            extractBackendMessage(dataAny) ??
            "No se pudieron actualizar las respuestas",
        });
        return false;
      }

      sileo.success({
        title: "Éxito",
        description:
          extractBackendMessage(dataAny) ??
          "Respuestas actualizadas correctamente",
      });

      return true; // ✅ éxito aunque data sea null
    } catch (error) {
      const msg = getApiErrorMessage(
        error,
        "No se pudieron actualizar las respuestas",
      );
      sileo.error({ title: "Error", description: msg });
      return false;
    }
  },
};
