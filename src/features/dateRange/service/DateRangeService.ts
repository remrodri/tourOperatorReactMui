import axiosInstance from "../../../config/axiosConfig";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";

export const getAllDateRangesRequest = async () => {
  const response = await axiosInstance.get("/date-range");
  return response.data;
};

export const updateDateRangeRequest = async (
  id: string,
  // data: Partial<DateRangeType>
  data: any
): Promise<any> => {
  const response = await axiosInstance.put(`/date-range/${id}`, data);
  return response.data;
};