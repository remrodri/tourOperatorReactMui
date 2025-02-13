import axiosInstance from "../../../config/axiosConfig";
import { CancellationPolicy } from "../types/CancellationPolicy";

export const createCancellationPolicyRequest = async (
  data: CancellationPolicy
) => {
  const response = await axiosInstance.post("/cancellation-policy", data);
  return response.data;
};

export const getAllCancelationPolicy = async () => {
  const response = await axiosInstance.get("/cancellation-policy");
  return response.data;
};

export const deleteCancellationPolicyRequest = async (id: string) => {
  const response = await axiosInstance.delete(`/cancellation-policy/${id}`);
  return response.data;
};
