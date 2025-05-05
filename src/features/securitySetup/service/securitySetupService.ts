import axios from "axios";
import axiosInstance from "../../../config/axiosConfig";
import { handleError } from "./handleError";

// interface PasswordValue {
//   password: string;
// }
interface Response {
  // userId: any;
  statusCode: number;
  message: string;
  data: any;
}

export const securitySetupService = {
  updatePasswordWithoutToken: async (password: string, userId: string) => {
    console.log('userId::: ', userId);
    console.log('password::: ', password);
    try {
      const response = await axiosInstance.patch<Response>(
        "/security-setup-password",
        { userId: userId, newPassword: password }
      );
      console.log("response::: ", response);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  checkSecurityAnswer: async (answer: {
    userId: string | undefined;
    questionId: string;
    answerText: string;
  }) => {
    try {
      // console.log('answer::: ', answer);
      const response = await axiosInstance.post<Response>(
        "/security-setup-answer",
        answer
      );
      // console.log('response::: ', response);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  getRandomQuestion: async (userId: string): Promise<Response> => {
    try {
      const response = await axiosInstance.get(
        `/security-setup/random-question/${userId}`
      );
      return response.data;
    } catch (error: unknown) {
      return handleError(error);
    }
  },

  findUserByEmail: async (
    // token: string,
    email: string
  ): Promise<Response> => {
    try {
      // console.log('email::: ', email);
      const response = await axiosInstance.post<Response>(
        "/security-setup-question",
        email
        // { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log("response::: ", response);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      }
      return {
        statusCode: 500,
        message: "Error interno del servidor",
        data: null,
      };
    }
  },

  updatePassword: async (
    password: string,
    token: string,
    userId: string
  ): Promise<Response> => {
    // console.log("password::: ", password);
    const response = await axiosInstance.patch(
      "/security-setup",
      { newPassword: password, userId: userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log("response::: ", response);
    return response.data;
  },

  getSecurityQuestions: async (userId: string, token: string): Promise<any> => {
    // console.log("securityQuestions::: ");
    const response = await axiosInstance.post<Response>(
      "/security-setup-questions",
      { userId: userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log('response::: ', response);
    return response.data;
  },
  updateSecurityAnswers: async (
    token: string,
    answers: { answerId: string; answerText: string }[],
    userId: string
  ) => {
    const response = await axiosInstance.patch<Response>(
      "/security-setup-answers",
      { answers: answers, userId: userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log("response::: ", response);
    // console.log("answers::: ", answers);
    return response.data;
  },
};
