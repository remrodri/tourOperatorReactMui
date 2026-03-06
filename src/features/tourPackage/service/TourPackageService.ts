/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";
import { sileo } from "sileo";
import { axiosPublic, axiosPrivate } from "../../../config/axiosConfig";
import type { ApiResponse } from "../../../types/api";
import type { TourPackageType } from "../types/TourPackageType";

/* -------------------------------------------------
 * Helpers (idénticos a los otros services)
 * ------------------------------------------------- */
const extractBackendMessage = (payload: any): string | null => {
  if (!payload) return null;

  const direct =
    payload.message ||
    payload.error ||
    payload.msg ||
    payload.detail ||
    payload.details;

  if (typeof direct === "string" && direct.trim()) return direct;

  const nested =
    payload.data?.message || payload.data?.error || payload.data?.msg;
  if (typeof nested === "string" && nested.trim()) return nested;

  if (typeof payload.data === "string" && payload.data.trim())
    return payload.data;

  if (Array.isArray(payload.errors) && payload.errors.length) {
    const mapped = payload.errors
      .map((e: any) => (typeof e === "string" ? e : e?.message || e?.msg))
      .filter(Boolean)
      .join(", ");
    if (mapped.trim()) return mapped;
  }

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

const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (!isAxiosError(error)) return fallback;
  const payload: any = error.response?.data;
  const msg = extractBackendMessage(payload);
  return msg ?? fallback;
};

const isLogicalErrorResponse = (responseData: any): boolean => {
  const hasMsg = Boolean(extractBackendMessage(responseData));
  const hasData =
    responseData?.data !== null && responseData?.data !== undefined;

  if (!hasData && hasMsg) return true;
  if (responseData?.success === false) return true;
  if (responseData?.ok === false) return true;
  if (responseData?.status === "error") return true;

  return false;
};

/* -------------------------------------------------
 * Service
 * ------------------------------------------------- */

/**
 * CREATE tour package (PRIVADO)
 */
export const createTourPackageRequest = async (
  data: Partial<TourPackageType>,
): Promise<TourPackageType | null> => {
  try {
    const response = await axiosPrivate.post<ApiResponse<TourPackageType>>(
      "/tour-package",
      data,
      { headers: { "Content-Type": "application/json" } },
    );

    const dataAny: any = response.data;
    if (isLogicalErrorResponse(dataAny)) {
      sileo.error({
        title: "Error",
        description:
          extractBackendMessage(dataAny) ??
          "No se pudo crear el paquete turístico",
      });
      return null;
    }

    sileo.success({
      title: "Éxito",
      description:
        extractBackendMessage(response.data) ??
        "Paquete turístico creado correctamente",
    });

    return response.data.data;
  } catch (error) {
    const msg = getApiErrorMessage(
      error,
      "No se pudo crear el paquete turístico",
    );
    sileo.error({ title: "Error", description: msg });
    return null;
  }
};

/**
 * GET all tour packages (PÚBLICO)
 */
export const getAllTourPackagesRequest = async (): Promise<
  TourPackageType[] | null
> => {
  try {
    const response =
      await axiosPublic.get<ApiResponse<TourPackageType[]>>("/tour-package");
    console.log("tpAll::: ", response.data);
    
    const dataAny: any = response.data;
    if (isLogicalErrorResponse(dataAny)) {
      sileo.error({
        title: "Error",
        description:
          extractBackendMessage(dataAny) ??
          "No se pudieron cargar los paquetes turísticos",
      });
      return null;
    }

    return response.data.data;
  } catch (error) {
    const msg = getApiErrorMessage(
      error,
      "No se pudieron cargar los paquetes turísticos",
    );
    sileo.error({ title: "Error", description: msg });
    return null;
  }
};

/**
 * GET tour package by ID (PÚBLICO)
 */
export const getTourPackageByIdRequest = async (
  id: string,
): Promise<TourPackageType | null> => {
  try {
    const response = await axiosPublic.get<ApiResponse<TourPackageType>>(
      `/tour-package/${id}`,
    );

    const dataAny: any = response.data;
    if (isLogicalErrorResponse(dataAny)) {
      sileo.error({
        title: "Error",
        description:
          extractBackendMessage(dataAny) ??
          "No se pudo obtener el paquete turístico",
      });
      return null;
    }

    return response.data.data;
  } catch (error) {
    const msg = getApiErrorMessage(
      error,
      "No se pudo obtener el paquete turístico",
    );
    sileo.error({ title: "Error", description: msg });
    return null;
  }
};

/**
 * UPDATE tour package (PRIVADO)
 */
export const updateTourPackageRequest = async (
  data: Partial<TourPackageType>,
): Promise<TourPackageType | null> => {
  if (!data.id) {
    sileo.error({
      title: "Error",
      description: "ID del paquete turístico es requerido",
    });
    return null;
  }

  try {
    const response = await axiosPrivate.put<ApiResponse<TourPackageType>>(
      `/tour-package/${data.id}`,
      data,
      { headers: { "Content-Type": "application/json" } },
    );
    console.log("tpUpdated::: ", response.data);
    const dataAny: any = response.data;
    if (isLogicalErrorResponse(dataAny)) {
      sileo.error({
        title: "Error",
        description:
          extractBackendMessage(dataAny) ??
          "No se pudo actualizar el paquete turístico",
      });
      return null;
    }

    sileo.success({
      title: "Éxito",
      description:
        extractBackendMessage(response.data) ??
        "Paquete turístico actualizado correctamente",
    });

    return response.data.data;
  } catch (error) {
    const msg = getApiErrorMessage(
      error,
      "No se pudo actualizar el paquete turístico",
    );
    sileo.error({ title: "Error", description: msg });
    return null;
  }
};

/**
 * DELETE tour package (PRIVADO)
 */
export const deleteTourPackageRequest = async (
  id: string,
): Promise<boolean> => {
  try {
    const response = await axiosPrivate.delete<ApiResponse<any>>(
      `/tour-package/${id}`,
    );

    const dataAny: any = response.data;
    if (isLogicalErrorResponse(dataAny)) {
      sileo.error({
        title: "Error",
        description:
          extractBackendMessage(dataAny) ??
          "No se pudo eliminar el paquete turístico",
      });
      return false;
    }

    sileo.success({
      title: "Éxito",
      description:
        extractBackendMessage(response.data) ??
        "Paquete turístico eliminado correctamente",
    });

    return true;
  } catch (error) {
    const msg = getApiErrorMessage(
      error,
      "No se pudo eliminar el paquete turístico",
    );
    sileo.error({ title: "Error", description: msg });
    return false;
  }
};

/**
 * UPDATE tour package status (PRIVADO)
 */
export const updateTourPackageStatusRequest = async (
  id: string,
  status: string,
): Promise<boolean> => {
  try {
    const response = await axiosPrivate.put<ApiResponse<any>>(
      `/tour-package-status/${id}`,
      { status },
      { headers: { "Content-Type": "application/json" } },
    );

    const dataAny: any = response.data;
    if (isLogicalErrorResponse(dataAny)) {
      sileo.error({
        title: "Error",
        description:
          extractBackendMessage(dataAny) ??
          "No se pudo actualizar el estado del paquete",
      });
      return false;
    }

    sileo.success({
      title: "Éxito",
      description:
        extractBackendMessage(response.data) ??
        "Estado del paquete actualizado correctamente",
    });

    return true;
  } catch (error) {
    const msg = getApiErrorMessage(
      error,
      "No se pudo actualizar el estado del paquete",
    );
    sileo.error({ title: "Error", description: msg });
    return false;
  }
};
