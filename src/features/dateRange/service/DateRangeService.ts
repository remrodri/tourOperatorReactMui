import { axiosPublic, axiosPrivate } from "../../../config/axiosConfig";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";
import type { ApiResponse } from "../../../types/api"; // ajusta el path

/**
 * Get all date ranges
 * Normalmente público (si tu API lo exige con token, usa axiosPrivate)
 */
export const getAllDateRangesRequest = async (): Promise<
  ApiResponse<DateRangeType[]>
> => {
  const response =
    await axiosPublic.get<ApiResponse<DateRangeType[]>>("/date-range");
  return response.data; // { statusCode, message, data: DateRangeType[] }
  // si quieres solo el array: return response.data.data;
};

/**
 * Update date range (normalmente privado)
 */
export const updateDateRangeRequest = async (
  id: string,
  data: Partial<DateRangeType>,
): Promise<DateRangeType> => {
  const response = await axiosPrivate.put<ApiResponse<DateRangeType>>(
    `/date-range/${id}`,
    data,
  );
  return response.data.data; // DateRangeType actualizado
};

/**
 * Create date range (normalmente privado)
 */
export const createDateRangeRequest = async (
  data: DateRangeType,
): Promise<DateRangeType> => {
  const response = await axiosPrivate.post<ApiResponse<DateRangeType>>(
    "/date-range",
    data,
  );
  return response.data.data; // DateRangeType creado
};
