import axiosInstance from "../../../config/axiosConfig";
import { BookingType } from "../types/BookingType";

const url = "/booking";
export const createBookingRequest = async (data: Partial<BookingType>):Promise<any> => {
  const response = await axiosInstance.post(url, data);
  return response.data.data;
};

export const getAllBookingsRequest = async () => {
  const response = await axiosInstance.get(url);
  return response.data;
};
