import axiosInstance from "../../../config/axiosConfig";
import { PaymentType } from "../../booking/types/PaymentType";

const url = "/payments";

export const createPaymentRequest = async (payment: PaymentType) => {
  console.log('payment::: ', payment);
  const response = await axiosInstance.post(url, payment);
  console.log('response::: ', response);
  return response.data.data;
};

export const getAllPaymentsRequest = async () => {
  const response = await axiosInstance.get(url);
  console.log('response::: ', response);
  return response.data.data;
};
