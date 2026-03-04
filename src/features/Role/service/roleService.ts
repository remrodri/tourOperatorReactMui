/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";
import { sileo } from "sileo";
import { axiosPublic } from "../../../config/axiosConfig";
import type { ApiResponse } from "../../../types/api";
import { RoleType } from "../../userManagement/types/RoleType";
// import type { RoleType } from "../types/RoleType";

const url = "/roles";

/**
 * Helpers (idénticos a los otros services)
 */
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

/**
 * GET roles
 * Público
 */
const getRoles = async (): Promise<RoleType[] | null> => {
  try {
    const response = await axiosPublic.get<ApiResponse<RoleType[]>>(url);

    const dataAny: any = response.data;
    if (isLogicalErrorResponse(dataAny)) {
      sileo.error({
        title: "Error",
        description:
          extractBackendMessage(dataAny) ?? "No se pudieron cargar los roles",
      });
      return null;
    }

    return response.data.data;
  } catch (error) {
    const msg = getApiErrorMessage(error, "No se pudieron cargar los roles");
    sileo.error({ title: "Error", description: msg });
    return null;
  }
};

export const roleService = {
  getRoles,
};
