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
    userId:string
  ): Promise<Response> => {
    // console.log("password::: ", password);
    const response = await axiosInstance.patch(
      "/security-setup",
      { newPassword: password ,userId:userId},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log("response::: ", response);
    return response.data;
  },
};
