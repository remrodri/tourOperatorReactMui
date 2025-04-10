import axiosInstance from "../../../config/axiosConfig";

const url = "/booking";
export const createBooking = async (data: Partial<any>) => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};

export const getAllBookings = async () => {
  const response = await axiosInstance.get(url);
  return response.data;
};
