import axiosInstance from "../../../config/axiosConfig";

const url = "/payments";

export const createPaymentRequest = async (payment: FormData) => {
  // for (const [key,value] of payment.entries()) {
  //   console.log(`${key}: `,value);
  // }
  const response = await axiosInstance.post(url, payment);
  // console.log('response::: ', response);
  return response.data.data;
};

export const getAllPaymentsRequest = async () => {
  const response = await axiosInstance.get(url);
  // console.log('response::: ', response);
  return response.data.data;
};
