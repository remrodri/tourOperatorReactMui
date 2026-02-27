import { DateRangeType } from "../../tourPackage/types/DateRangeType";
import type { ApiResponse } from "../../../types/api";
import { axiosPrivate, axiosPublic } from "../../../config/axiosConfig";
// Si tu backend devuelve: { statusCode, message, data }
// aquí tipamos para no usar any.

// ✅ GET normalmente público
export const getAllDateRangesRequest = async () => {
  const response =
    await axiosPublic.get<ApiResponse<DateRangeType[]>>("/date-range");
  return response.data; // { statusCode, message, data: DateRangeType[] }
  // Si quieres solo la data: return response.data.data;
};

// ✅ PUT normalmente privado
export const updateDateRangeRequest = async (
  id: string,
  data: Partial<DateRangeType>,
): Promise<DateRangeType> => {
  const response = await axiosPrivate.put<ApiResponse<DateRangeType>>(
    `/date-range/${id}`,
    data,
  );
  return response.data.data; // DateRangeType
};

// ✅ POST normalmente privado
export const createDateRangeRequest = async (
  data: DateRangeType,
): Promise<DateRangeType> => {
  const response = await axiosPrivate.post<ApiResponse<DateRangeType>>(
    "/date-range",
    data,
  );
  return response.data.data; // DateRangeType
};
