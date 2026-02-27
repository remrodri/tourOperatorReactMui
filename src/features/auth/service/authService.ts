import { AxiosResponse } from "axios";
import { axiosPublic } from "../../../config/axiosConfig";

interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  data: {
    token: string;
    message: string;
    statusCode: number;
  };
}

export const authService = {
  login: async (data: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
    const response = await axiosPublic.post("/auth/login", data);
    return response;
  },
};