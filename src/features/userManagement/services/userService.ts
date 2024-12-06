import axios from "axios";
import { User } from "../types/User";

const API_URL = "http://localhost:3000/api/v1/users";

interface Response {
  data: { statusCode: number; message: string; data: any };
}

const getUsers = async (token: string): Promise<Response> => {
  const response = await axios.get<Response>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const registerUser = async (userData: Partial<User>,token:string): Promise<Response> => {
  const response = await axios.post<Response>(API_URL, userData, {
    headers:{Authorization: `Bearer ${token}`}
  });
  console.log("response::: ", response);
  return response.data;
};
export const userService = {
  getUsers,
  registerUser,
};
