import axiosInstance from "../../../config/axiosConfig";
import { CancellationPolicy } from "../types/CancellationPolicy";

export const createCancellationPolicyRequest = async (data: CancellationPolicy) => {
  const response = await axiosInstance.post("/cancellation-policy", data);
  return response.data;
};
