import axiosInstance from "../../../config/axiosConfig";

const url = "/payments";

export const getAllPaymentsRequest = async () => {
  const response = await axiosInstance.get(url);
  return response.data.data;
};
