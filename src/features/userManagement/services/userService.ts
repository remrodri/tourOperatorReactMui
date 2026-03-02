/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";
import { sileo } from "sileo";
import { axiosPrivate, axiosPublic } from "../../../config/axiosConfig";
import type { ApiResponse } from "../../../types/api";

import { UserType } from "../types/UserType";

const url = "/users";

/**
 * Extrae un mensaje "humano" desde cualquier payload del backend
 * (tanto en éxito como en error).
 */
const extractBackendMessage = (payload: any): string | null => {
  if (!payload) return null;

  // mensajes típicos en API
  const direct =
    payload.message ||
    payload.error ||
    payload.msg ||
    payload.detail ||
    payload.details;

  if (typeof direct === "string" && direct.trim()) return direct;

  // a veces viene en payload.data.message
  const nested =
    payload.data?.message || payload.data?.error || payload.data?.msg;
  if (typeof nested === "string" && nested.trim()) return nested;

  // a veces "data" ES el mensaje (string)
  if (typeof payload.data === "string" && payload.data.trim())
    return payload.data;

  // arrays de errores tipo ["x", "y"] o [{message:"x"}]
  if (Array.isArray(payload.errors) && payload.errors.length) {
    const mapped = payload.errors
      .map((e: any) => (typeof e === "string" ? e : e?.message || e?.msg))
      .filter(Boolean)
      .join(", ");
    if (mapped.trim()) return mapped;
  }

  // errores por campo tipo { errors: { email: "ya existe" } }
  if (
    payload.errors &&
    typeof payload.errors === "object" &&
    !Array.isArray(payload.errors)
  ) {
    const values = Object.values(payload.errors)
      .map((v: any) => (typeof v === "string" ? v : v?.message || v?.msg))
      .filter(Boolean)
      .join(", ");
    if (values.trim()) return values;
  }

  return null;
};

/**
 * Mensaje de error desde AxiosError (prioriza lo que manda el backend).
 */
const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (!isAxiosError(error)) return fallback;

  const payload: any = error.response?.data;
  const msg = extractBackendMessage(payload);

  return msg ?? fallback;
};

/**
 * Valida respuestas 200/201 que igualmente vienen con "problema"
 * Ej: { data: null, message: "El correo ya existe" }
 */
const isLogicalErrorResponse = (responseData: any): boolean => {
  // si hay message pero no hay data (o data vacía) => lo tratamos como error lógico
  const hasMsg = Boolean(extractBackendMessage(responseData));
  const hasData =
    responseData?.data !== null &&
    responseData?.data !== undefined &&
    !(
      typeof responseData?.data === "string" &&
      responseData?.data.trim().length > 0
    );

  // Si data es null/undefined y existe message -> error lógico
  if (!hasData && hasMsg) return true;

  // También si existe un flag típico (si tu ApiResponse lo trae)
  if (responseData?.success === false) return true;
  if (responseData?.ok === false) return true;
  if (responseData?.status === "error") return true;

  return false;
};

/**
 * GET all users
 * PRIVADO (si fuera público, cambia axiosPrivate -> axiosPublic)
 */
export const getUsersRequest = async (): Promise<UserType[] | null> => {
  try {
    const response = await axiosPublic.get<ApiResponse<UserType[]>>(url);

    // Soporta 200 con error lógico
    const dataAny: any = response.data;
    if (isLogicalErrorResponse(dataAny)) {
      sileo.error({
        title: "Error",
        description:
          extractBackendMessage(dataAny) ??
          "No se pudieron cargar los usuarios",
      });
      return null;
    }

    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);

    const msg = getApiErrorMessage(error, "No se pudieron cargar los usuarios");
    sileo.error({ title: "Error", description: msg });

    return null;
  }
};

/**
 * CREATE user (register)
 * PRIVADO
 */
export const registerUserRequest = async (
  userData: Partial<UserType> | FormData,
): Promise<UserType | null> => {
  try {
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

    const response = await axiosPrivate.post<ApiResponse<UserType>>(
      url,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    // Soporta 201/200 con "error lógico"
    const dataAny: any = response.data;
    if (isLogicalErrorResponse(dataAny)) {
      sileo.error({
        title: "Error",
        description:
          extractBackendMessage(dataAny) ?? "No se pudo registrar el usuario",
      });
      return null;
    }

    sileo.success({
      title: "Éxito",
      description:
        extractBackendMessage(response.data) ??
        "Usuario registrado correctamente",
    });

    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);

    const msg = getApiErrorMessage(error, "No se pudo registrar el usuario");
    sileo.error({ title: "Error", description: msg });

    return null;
  }
};

/**
 * UPDATE user
 * PRIVADO
 */
export const updateUserRequest = async (
  userId: string,
  userData: FormData,
): Promise<UserType | null> => {
  try {
    const response = await axiosPrivate.put<ApiResponse<UserType>>(
      `${url}/${userId}`,
      userData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    const dataAny: any = response.data;
    if (isLogicalErrorResponse(dataAny)) {
      sileo.error({
        title: "Error",
        description:
          extractBackendMessage(dataAny) ?? "No se pudo actualizar el usuario",
      });
      return null;
    }

    sileo.success({
      title: "Éxito",
      description:
        extractBackendMessage(response.data) ??
        "Usuario actualizado correctamente",
    });

    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);

    const msg = getApiErrorMessage(error, "No se pudo actualizar el usuario");
    sileo.error({ title: "Error", description: msg });

    return null;
  }
};

/**
 * DISABLE user
 * PRIVADO
 */
export const disableUserRequest = async (
  userId: string,
): Promise<UserType | null> => {
  try {
    const response = await axiosPrivate.patch<ApiResponse<UserType>>(
      "users/disable-user",
      { userId },
      { headers: { "Content-Type": "application/json" } },
    );

    const dataAny: any = response.data;
    if (isLogicalErrorResponse(dataAny)) {
      sileo.error({
        title: "Error",
        description:
          extractBackendMessage(dataAny) ??
          "No se pudo deshabilitar el usuario",
      });
      return null;
    }

    sileo.success({
      title: "Éxito",
      description:
        extractBackendMessage(response.data) ??
        "Usuario deshabilitado correctamente",
    });

    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);

    const msg = getApiErrorMessage(error, "No se pudo deshabilitar el usuario");
    sileo.error({ title: "Error", description: msg });

    return null;
  }
};

/**
 * ENABLE user
 * PRIVADO
 */
export const enableUserRequest = async (
  userId: string,
): Promise<UserType | null> => {
  try {
    const response = await axiosPrivate.patch<ApiResponse<UserType>>(
      "users/enable-user",
      { userId },
      { headers: { "Content-Type": "application/json" } },
    );

    const dataAny: any = response.data;
    if (isLogicalErrorResponse(dataAny)) {
      sileo.error({
        title: "Error",
        description:
          extractBackendMessage(dataAny) ?? "No se pudo habilitar el usuario",
      });
      return null;
    }

    sileo.success({
      title: "Éxito",
      description:
        extractBackendMessage(response.data) ??
        "Usuario habilitado correctamente",
    });

    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);

    const msg = getApiErrorMessage(error, "No se pudo habilitar el usuario");
    sileo.error({ title: "Error", description: msg });

    return null;
  }
};

/**
 * DELETE user (soft delete si tu endpoint lo hace así)
 * PRIVADO
 */
export const deleteUserRequest = async (
  userId: string,
): Promise<UserType | null> => {
  try {
    const response = await axiosPrivate.patch<ApiResponse<UserType>>(
      "/delete-user",
      { userId },
      { headers: { "Content-Type": "application/json" } },
    );

    const dataAny: any = response.data;
    if (isLogicalErrorResponse(dataAny)) {
      sileo.error({
        title: "Error",
        description:
          extractBackendMessage(dataAny) ?? "No se pudo eliminar el usuario",
      });
      return null;
    }

    sileo.success({
      title: "Éxito",
      description:
        extractBackendMessage(response.data) ??
        "Usuario eliminado correctamente",
    });

    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);

    const msg = getApiErrorMessage(error, "No se pudo eliminar el usuario");
    sileo.error({ title: "Error", description: msg });

    return null;
  }
};
