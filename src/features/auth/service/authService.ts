import { AxiosResponse } from "axios";
import axiosInstance from "../../../config/axiosConfig";

interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  data: any;
}

export const authService = {
  login: async (data: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
    const response = await axiosInstance.post("/auth/login", data);
    console.log('response::: ', response);
    // console.log('response::: ', response.data.data.token);
    // return response.data.data.token;
    return response;
  },
};