import axios from "axios";
import { User } from "../types/User";
import axiosInstance from "../../../config/axiosConfig";

const API_URL = "http://localhost:3000/api/v1/users";

interface ApiResponse {
  statusCode: number;
  message: string;
  data: User;
}

const disableUser = async (userId: string, token: string): Promise<ApiResponse> => {
  const response = await axios.patch(
    `${API_URL}/disable-user`,
    { userId: userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const enableUser = async (userId: string, token: string): Promise<ApiResponse> => {
  const response = await axios.patch(
    `${API_URL}/enable-user`,
    { userId: userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const getUsers = async (): Promise<ApiResponse> => {
  const response = await axiosInstance.get("/users");
  console.log('response::: ', response);
  return response.data;
};

const registerUser = async (
  userData: Partial<User> | FormData,
  token: string
): Promise<ApiResponse> => {
  let formData: FormData;

  // Check if userData is already a FormData object
  if (userData instanceof FormData) {
    formData = userData;
  } else {
    // Create a new FormData object
    formData = new FormData();

    // Add all fields from userData to formData
    Object.entries(userData).forEach(([key, value]) => {
      // Skip null or undefined values
      if (value !== null && value !== undefined) {
        // Handle the image file specially
        if (key === "image" && value instanceof File) {
          formData.append("image", value, value.name);
        } else {
          formData.append(key, String(value));
        }
      }
    });
  }

  const response = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Remove Content-Type header - axios will set it automatically
      // with the correct boundary for FormData
    },
  });

  return response.data;
};

const updateUser = async (
  userData: FormData,
  userId: string,
  token: string
): Promise<ApiResponse> => {
  for (const [key, value] of userData.entries()) {
    console.log(`${key}:`, value);
  }

  const response = await axios.put(`${API_URL}/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Remove Content-Type header - axios will set it automatically
    },
  });
  console.log("response::: ", response.data);
  return response.data;
};

const deleteUser = async (
  userId: string,
  token: string
): Promise<ApiResponse> => {
  const response = await axios.patch(
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
  disableUser,
  enableUser,
};
