import { axiosPrivate } from "../../../config/axiosConfig";
import { UserType } from "../types/UserType";
// ajusta el path según tu proyecto

// Nota: user endpoints típicamente son privados.
// Dejo axiosPublic importado por si tienes endpoints públicos.

const disableUser = async (userId: string): Promise<UserType> => {
  const response = await axiosPrivate.patch("/disable-user", { userId });
  return response.data.data;
};

const enableUser = async (userId: string): Promise<UserType> => {
  const response = await axiosPrivate.patch("/enable-user", { userId });
  return response.data.data;
};

const getUsers = async (): Promise<UserType[]> => {
  const response = await axiosPrivate.get("/users");
  // Si /users es público en tu backend, cambia a axiosPublic
  return response.data.data;
};

const registerUser = async (
  userData: Partial<UserType> | FormData,
): Promise<UserType> => {
  let formData: FormData;

  if (userData instanceof FormData) {
    formData = userData;
  } else {
    formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === "image" && value instanceof File) {
          formData.append("image", value, value.name);
        } else {
          formData.append(key, String(value));
        }
      }
    });
  }

  const response = await axiosPrivate.post("/users", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.data;
};

const updateUser = async (
  userData: FormData,
  userId: string,
): Promise<UserType> => {
  const response = await axiosPrivate.put(`/users/${userId}`, userData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};

const deleteUser = async (userId: string): Promise<UserType> => {
  const response = await axiosPrivate.patch("/delete-user", { userId });
  return response.data.data;
};

export const userService = {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  disableUser,
  enableUser,
};
