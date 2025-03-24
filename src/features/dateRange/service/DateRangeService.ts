import axiosInstance from "../../../config/axiosConfig";

export const getAllDateRangesRequest = async () => {
  const response = await axiosInstance.get("/date-range");
  return response.data;
};