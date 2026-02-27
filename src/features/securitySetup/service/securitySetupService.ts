/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { handleError } from "./handleError";
import { axiosPublic, axiosPrivate } from "../../../config/axiosConfig";
import type { ApiResponse } from "../../../types/api";

export const securitySetupService = {
  // ✅ SIN TOKEN -> axiosPublic
  updatePasswordWithoutToken: async (password: string, userId: string) => {
    try {
      const response = await axiosPublic.patch<ApiResponse<any>>(
        "/security-setup-password",
        { userId, newPassword: password },
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // ✅ SIN TOKEN -> axiosPublic
  checkSecurityAnswer: async (answer: {
    userId: string | undefined;
    questionId: string;
    answerText: string;
  }) => {
    try {
      const response = await axiosPublic.post<ApiResponse<any>>(
        "/security-setup-answer",
        answer,
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // ✅ SIN TOKEN -> axiosPublic
  getRandomQuestion: async (userId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosPublic.get<ApiResponse<any>>(
        `/security-setup/random-question/${userId}`,
      );
      return response.data;
    } catch (error: unknown) {
      return handleError(error);
    }
  },

  // ✅ SIN TOKEN -> axiosPublic
  findUserByEmail: async (email: string): Promise<ApiResponse<any>> => {
    try {
      // Si tu backend espera { email }, usa objeto. Si espera string, deja string.
      // Te dejo el objeto porque es lo más común:
      const response = await axiosPublic.post<ApiResponse<any>>(
        "/security-setup-question",
        { email },
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return (
          (error.response?.data as ApiResponse<any>) ?? {
            statusCode: error.response?.status ?? 500,
            message: "Error de red",
            data: null,
          }
        );
      }
      return {
        statusCode: 500,
        message: "Error interno del servidor",
        data: null,
      };
    }
  },

  // ✅ CON TOKEN -> axiosPrivate (YA NO RECIBES token como parámetro)
  updatePassword: async (
    password: string,
    userId: string,
  ): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosPrivate.patch<ApiResponse<any>>(
        "/security-setup",
        { newPassword: password, userId },
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // ✅ CON TOKEN -> axiosPrivate
  getSecurityQuestions: async (userId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosPrivate.post<ApiResponse<any>>(
        "/security-setup-questions",
        { userId },
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // ✅ CON TOKEN -> axiosPrivate
  updateSecurityAnswers: async (
    answers: { answerId: string; answerText: string }[],
    userId: string,
  ): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosPrivate.patch<ApiResponse<any>>(
        "/security-setup-answers",
        { answers, userId },
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};
