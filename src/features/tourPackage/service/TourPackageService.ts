import { axiosPublic, axiosPrivate } from "../../../config/axiosConfig";
import { TourPackageType } from "../types/TourPackageType";
import type { ApiResponse } from "../../../types/api";


/**
 * Create a new tour package (normalmente PRIVADO)
 */
export const createTourPackageRequest = async (
  data: Partial<TourPackageType>,
) => {
  const response = await axiosPrivate.post<ApiResponse<TourPackageType>>(
    "/tour-package",
    data,
  );
  return response.data;
};

/**
 * Get all tour packages (normalmente PÚBLICO)
 * Si tu backend requiere auth, cambia a axiosPrivate.
 */
export const getAllTourPackagesRequest = async () => {
  const response =
    await axiosPublic.get<ApiResponse<TourPackageType[]>>("/tour-package");
  return response.data;
};

/**
 * Get a specific tour package by ID (normalmente PÚBLICO)
 * Si tu backend requiere auth, cambia a axiosPrivate.
 */
export const getTourPackageByIdRequest = async (id: string) => {
  const response = await axiosPublic.get<ApiResponse<TourPackageType>>(
    `/tour-package/${id}`,
  );
  return response.data;
};

/**
 * Update an existing tour package (normalmente PRIVADO)
 */
export const updateTourPackageRequest = async (
  data: Partial<TourPackageType>,
) => {
  if (!data.id)
    throw new Error("updateTourPackageRequest: data.id es requerido");
  const response = await axiosPrivate.put<ApiResponse<TourPackageType>>(
    `/tour-package/${data.id}`,
    data,
  );
  return response.data;
};

/**
 * Delete a tour package (normalmente PRIVADO)
 */
export const deleteTourPackageRequest = async (id: string) => {
  const response = await axiosPrivate.delete<ApiResponse<void>>(
    `/tour-package/${id}`,
  );
  return response.data;
};

/**
 * Update status (normalmente PRIVADO)
 */
export const updateTourPackageStatusRequest = async (
  id: string,
  status: string,
) => {
  const response = await axiosPrivate.put<ApiResponse<void>>(
    `/tour-package-status/${id}`,
    {
      status,
    },
  );
  return response.data;
};
