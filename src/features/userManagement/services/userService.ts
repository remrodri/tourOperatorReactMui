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
  // console.log('response::: ', response.data.data);
  // console.log('response::: ', response);
  return response.data;
};

const registerUser = async (
  userData: Partial<User>,
  token: string
): Promise<Response> => {
  console.log('userData::: ', userData);
  const formData = new FormData();

  Object.entries(userData).forEach(([key, value]) => {
    if (value) formData.append(key, value);
  });

  const response = await axios.post<Response>(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  // console.log("response::: ", response);
  return response.data;
};

const updateUser = async (
  userData: Partial<User>,
  userId: string,
  token: string
): Promise<Response> => {
  console.log("userData::: ", userData);
  const response = await axios.patch<Response>(
    API_URL,
    { ...userData, userId: userId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  // console.log("response::: ", response);
  return response.data;
};

const deleteUser = async (userId: string, token: string): Promise<Response> => {
  const response = await axios.patch<Response>(
    `${API_URL}/delete-user`,
    { userId: userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const userService = {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
};
