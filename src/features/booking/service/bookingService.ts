import axiosInstance from "../../../config/axiosConfig";
import { BookingType } from "../types/BookingType";
import { UpdateBookingType } from "../types/UpdateBookingType";
// import { CreateBookingType } from "../types/CreateBookingType";
import { getAllBookingsResponse } from "./getAllBookingsResponse";

const url = "/bookings";
export const createBookingRequest = async (data: FormData): Promise<any> => {
  // console.log('data::: ', data);
  // for (const [key,value] of data.entries()) {
  //   console.log(`${key}: `,value);
  // }
  const response = await axiosInstance.post(url, data);
  // console.log('response::: ', response.data.data);
  return response.data.data;
};
// export const createBooking2Request = async (data:any):Promise<any>=>{
//   const response = await axiosInstance.post(url, data);
//   return response.data.data;
// }

export const getAllBookingsRequest = async () => {
  const response = await axiosInstance.get(url);
  // console.log("response::: ", response.data.data);
  return response.data.data;
  // return getAllBookingsResponse;
};

export const updateBookingRequest = async (
  id: string,
  data: Partial<UpdateBookingType>
): Promise<any> => {
  // console.log('data::: ', data);

  const response = await axiosInstance.put(`${url}/${id}`, data);
  console.log("response::: ", response.data.data);
  return response.data.data;
};

export const updateAttendanceRequest = async (data: any): Promise<any> => {
  console.log("data que se enviará::: ", data);

  const response = await axiosInstance.put(`${url}/attendance-lists`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("response::: ", response.data.data);
  return response.data.data;
};

export const cancelBookingRequest = async (
  bookingId: string,
  cancellationFee: number,
  refundAmount: number,
  refundedAt: Date
): Promise<any> => {

  const response = await axiosInstance.put(
    `${url}/cancel/${bookingId}`,
    {
      cancellationFee,
      refundAmount,
      refundedAt,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // console.log("response::: ", response.data.data);
  return response.data.data;
};

