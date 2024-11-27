import axios from "axios";
import { TokenService } from "../../../utils/tokenService";

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
export const userService = {
  getUsers,
};
