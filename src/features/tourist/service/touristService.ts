import axiosInstance from "../../../config/axiosConfig";
import { TouristType } from "../../booking/types/TouristType";

const url = "/tourists";

export const getAllTouristsRequest = async () => {
  const response = await axiosInstance.get(url);
  // console.log('response::: ', response);
  return response.data.data;
};

export const updateTouristRequest = async (tourist: TouristType) => {
  const response = await axiosInstance.put(`${url}/${tourist.id}`, tourist);
  console.log("response::: ", response.data.data);
  return response.data.data;
};
