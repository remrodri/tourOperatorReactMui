import { isAxiosError } from "axios";
import type { DateRangeType, DateRangeWritePayload } from "../types/DateRangeType";
import type { ApiResponse } from "../../../types/api";
import { axiosPrivate, axiosPublic } from "../../../config/axiosConfig";

interface ApiErrorPayload {
  message?: unknown;
  data?: unknown;
}

const FALLBACK_MESSAGE =
  "No se pudo guardar la salida. Revisa los datos e inténtalo de nuevo.";

export const extractDateRangeApiMessage = (
  error: unknown,
  fallback: string = FALLBACK_MESSAGE,
): string => {
  if (!isAxiosError(error)) return fallback;

  const payload = error.response?.data as ApiErrorPayload | undefined;
  const message = typeof payload?.message === "string" ? payload.message : "";

  if (message && message !== "Datos inválidos enviados") {
    return message;
  }

  if (Array.isArray(payload?.data)) {
    const first = payload.data.find(
      (item): item is { message: string } =>
        Boolean(item) &&
        typeof (item as { message?: unknown }).message === "string" &&
        Boolean((item as { message: string }).message.trim()),
    );
    if (first) return first.message;
  }

  return fallback;
};

// ✅ GET normalmente público
export const getAllDateRangesRequest = async (): Promise<
  ApiResponse<DateRangeType[]>
> => {
  const response =
    await axiosPublic.get<ApiResponse<DateRangeType[]>>("/date-range");
  return response.data;
};

// ✅ PUT normalmente privado
export const updateDateRangeRequest = async (
  id: string,
  data: Partial<DateRangeWritePayload>,
): Promise<DateRangeType> => {
  try {
    const response = await axiosPrivate.put<ApiResponse<DateRangeType>>(
      `/date-range/${id}`,
      data,
    );
    return response.data.data;
  } catch (error) {
    throw new Error(extractDateRangeApiMessage(error));
  }
};

// ✅ POST normalmente privado
export const createDateRangeRequest = async (
  data: DateRangeWritePayload,
): Promise<DateRangeType> => {
  try {
    const response = await axiosPrivate.post<ApiResponse<DateRangeType>>(
      "/date-range",
      data,
    );
    return response.data.data;
  } catch (error) {
    throw new Error(extractDateRangeApiMessage(error));
  }
};
