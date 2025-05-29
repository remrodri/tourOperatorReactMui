import axiosInstance from "../../../config/axiosConfig";
import { BookingType } from "../types/BookingType";
import { CreateBookingType } from "../types/CreateBookingType";

const url = "/bookings";
export const createBookingRequest = async (
  data: Partial<BookingType>
): Promise<any> => {
  // console.log('data::: ', data);
  const response = await axiosInstance.post(url, data);
  // console.log('response::: ', response.data);
  return response.data.data;
};
export const createBooking2Request = async (data:CreateBookingType):Promise<any>=>{
  const response = await axiosInstance.post(url, data);
  return response.data.data;
}

export const getAllBookingsRequest = async () => {
  const response = await axiosInstance.get(url);
  console.log("response::: ", response.data.data);
  return response.data.data;
};

export const updateBookingRequest = async (
  id: string,
  data: Partial<BookingType>
): Promise<any> => {
  // console.log('data::: ', data);
  const response = await axiosInstance.put(`${url}/${id}`, data);
  console.log('response::: ', response.data.data);
  return response.data.data;
};
