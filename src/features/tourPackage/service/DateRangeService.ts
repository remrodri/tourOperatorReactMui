import axiosInstance from "../../../config/axiosConfig";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";

export const getAllDateRangesRequest = async () => {
  const response = await axiosInstance.get("/date-range");
  return response.data;
};

export const updateDateRangeRequest = async (
  id: string,
  // data: Partial<DateRangeType>
  data: Partial<DateRangeType>
): Promise<any> => {
  const response = await axiosInstance.put(`/date-range/${id}`, data);
  console.log('response::: ', response);
  return response.data.data;
};

export const createDateRangeRequest = async (
  data: DateRangeType
): Promise<any> => {
  const response = await axiosInstance.post("/date-range", data);
  console.log('response::: ', response.data.data);
  return response.data.data;
};
