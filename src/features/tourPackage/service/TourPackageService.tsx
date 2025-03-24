import axiosInstance from "../../../config/axiosConfig";
import { TourPackageType } from "../types/TourPackageType";

/**
 * Create a new tour package
 */
export const createTourPackageRequest = async (data: Partial<TourPackageType>) => {
  console.log('data::: ', data);
  const response = await axiosInstance.post("/tour-package", data);
  console.log('response::: ', response.data);
  return response.data;
};

/**
 * Get all tour packages
 */
export const getAllTourPackagesRequest = async () => {
  const response = await axiosInstance.get("/tour-package");
  // console.log('response::: ', response.data.data);
  return response.data;
};

/**
 * Get a specific tour package by ID
 */
export const getTourPackageByIdRequest = async (id: string) => {
  const response = await axiosInstance.get(`/tour-package/${id}`);
  return response.data;
};

/**
 * Update an existing tour package
 */
export const updateTourPackageRequest = async (data: Partial<TourPackageType>) => {
  const response = await axiosInstance.put(`/tour-package/${data.id}`, data);
  return response.data;
};

/**
 * Delete a tour package
 */
export const deleteTourPackageRequest = async (id: string) => {
  const response = await axiosInstance.delete(`/tour-package/${id}`);
  return response.data;
};
