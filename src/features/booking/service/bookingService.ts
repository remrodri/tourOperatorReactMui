import axiosInstance from "../../../config/axiosConfig";
import { BookingType } from "../types/BookingType";

const url = "/bookings";
export const createBookingRequest = async (data: Partial<BookingType>):Promise<any> => {
  console.log('data::: ', data);
  const response = await axiosInstance.post(url, data);
  console.log('response::: ', response.data);
  return response.data.data;
};

export const getAllBookingsRequest = async () => {
  const response = await axiosInstance.get(url);
  console.log('response::: ', response);
  return response.data.data;
};
