import axiosInstance from "../../../config/axiosConfig";
import { PaymentInfoType } from "../../booking/types/PaymentInfoType";

const url = "/payments";

export const createPaymentRequest = async (payment: PaymentInfoType) => {
  console.log('payment::: ', payment);
  const response = await axiosInstance.post(url, payment);
  console.log('response::: ', response);
  return response.data.data;
};

export const getAllPaymentsRequest = async () => {
  const response = await axiosInstance.get(url);
  return response.data.data;
};
