import axios from "axios";
import axiosInstance from "../../../config/axiosConfig";
import { jwtDecode } from "jwt-decode";
import { TokenService } from "../../../utils/tokenService";

interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  token: string;
}
interface LogoutResponse {
  StatusCode: string;
  message: string;
  data: any;
}

export const authService = {
  // login: async (data: LoginRequest): Promise<LoginResponse> => {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    // try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data.data.token;
    // return response.data;
    // if (response) {
    // const token = response.data.data.token;
    // TokenService.saveToken(token);
    // }
    // console.log("response::: ", response.data.data);
    // console.log("userinfo::: ", jwtDecode(response.data.data.token));

    // } catch (error:unknown) {
    //   if (axios.isAxiosError(error)) {
    //     console.error(error.response?.data)
    //   }
    //   throw error;
    // }
  },
  // logout: async (): Promise<LogoutResponse> => {
  //   const response = await axiosInstance.post("/auth/logout");
  //   return response.data;
  // },
};
