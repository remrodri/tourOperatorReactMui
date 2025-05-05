import axiosInstance from "../../../config/axiosConfig";

const url = "/tourists";

export const getAllTouristsRequest = async () => {
  const response = await axiosInstance.get(url);
  console.log('response::: ', response);
  return response.data.data;
};
