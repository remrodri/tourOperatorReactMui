import axiosInstance from "../../../config/axiosConfig";

// interface PasswordValue {
//   password: string;
// }
interface Response {
  statusCode: number;
  message: string;
  data: any;
}

export const securitySetupService = {
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
    answers: { answerId: string; answerText: string }[]
  ) => {
    const response = await axiosInstance.patch<Response>(
      "/security-setup-answers",
      { answers: answers },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log("response::: ", response);
    // console.log("answers::: ", answers);
    return response.data;
  },
};
