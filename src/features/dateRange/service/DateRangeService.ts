/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";
import { sileo } from "sileo";
import { axiosPrivate, axiosPublic } from "../../../config/axiosConfig";
import type { ApiResponse } from "../../../types/api";

import type { DateRangeType } from "../../tourPackage/types/DateRangeType";

const url = "/date-range"; // <-- AJUSTA si tu backend usa otro endpoint

/**
 * Extrae un mensaje "humano" desde cualquier payload del backend
 * (tanto en éxito como en error).
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
 * Ej: { data: null, message: "Ya existe" }
 */
const isLogicalErrorResponse = (responseData: any): boolean => {
  const hasMsg = Boolean(extractBackendMessage(responseData));

  // data nula/undefined => sin data real
  const data = responseData?.data;
  const hasData = data !== null && data !== undefined;

  if (!hasData && hasMsg) return true;

  if (responseData?.success === false) return true;
  if (responseData?.ok === false) return true;
  if (responseData?.status === "error") return true;

  return false;
};

/**
 * GET all date ranges
 * (si es privado, cambia axiosPublic -> axiosPrivate)
 */
export const getAllDateRangesRequest = async (): Promise<
  DateRangeType[] | null
> => {
  try {
    const response = await axiosPublic.get<ApiResponse<DateRangeType[]>>(url);

    const dataAny: any = response.data;
    if (isLogicalErrorResponse(dataAny)) {
      sileo.error({
        title: "Error",
        description:
          extractBackendMessage(dataAny) ?? "No se pudieron cargar los rangos",
      });
      return null;
    }

    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);

    const msg = getApiErrorMessage(error, "No se pudieron cargar los rangos");
    sileo.error({ title: "Error", description: msg });

    return null;
  }
};

/**
 * CREATE date range
 * PRIVADO
 */
export const createDateRangeRequest = async (
  data: DateRangeType,
): Promise<DateRangeType | null> => {
  try {
    const response = await axiosPrivate.post<ApiResponse<DateRangeType>>(
      url,
      data,
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    const dataAny: any = response.data;
    if (isLogicalErrorResponse(dataAny)) {
      sileo.error({
        title: "Error",
        description:
          extractBackendMessage(dataAny) ?? "No se pudo crear el rango",
      });
      return null;
    }

    sileo.success({
      title: "Éxito",
      description:
        extractBackendMessage(response.data) ?? "Rango creado correctamente",
    });

    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);

    const msg = getApiErrorMessage(error, "No se pudo crear el rango");
    sileo.error({ title: "Error", description: msg });

    return null;
  }
};

/**
 * UPDATE date range
 * PRIVADO
 */
export const updateDateRangeRequest = async (
  id: string,
  data: Partial<DateRangeType>,
): Promise<DateRangeType | null> => {
  try {
    const response = await axiosPrivate.put<ApiResponse<DateRangeType>>(
      `${url}/${id}`,
      data,
      { headers: { "Content-Type": "application/json" } },
    );

    const dataAny: any = response.data;
    if (isLogicalErrorResponse(dataAny)) {
      sileo.error({
        title: "Error",
        description:
          extractBackendMessage(dataAny) ?? "No se pudo actualizar el rango",
      });
      return null;
    }

    sileo.success({
      title: "Éxito",
      description:
        extractBackendMessage(response.data) ??
        "Rango actualizado correctamente",
    });

    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);

    const msg = getApiErrorMessage(error, "No se pudo actualizar el rango");
    sileo.error({ title: "Error", description: msg });

    return null;
  }
};
