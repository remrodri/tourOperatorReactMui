import { axiosPublic, axiosPrivate } from "../../../config/axiosConfig";
import type { ApiResponse } from "../../../types/api";
import { sileo } from "sileo";
import { isAxiosError } from "axios";

// Si ya tienes un tipo en tu proyecto, reemplaza esto:
export interface TourType {
  id: string;
  name: string;
  description: string;
}

/**
 * GET: obtener todos los tipos de tour
 * Normalmente público
 */
export const getAllTourTypes = async (): Promise<TourType[] | null> => {
  try {
    const response =
      await axiosPublic.get<ApiResponse<TourType[]>>("/tour-types");
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
    sileo.error({
      title: "Error",
      description: "No se pudieron cargar los tipos de tour",
    });
    return null;
  }
};

/**
 * POST: crear tipo de tour (normalmente privado)
 */
export const createTourType = async (
  tourTypeData: Pick<TourType, "name" | "description">,
): Promise<TourType | null> => {
  try {
    const response = await axiosPrivate.post<ApiResponse<TourType>>(
      "/tour-types",
      tourTypeData,
    );

    // Si el backend ya devuelve un mensaje útil, puedes usar response.data.message
    sileo.success({
      title: "Éxito",
      description: "Tipo de tour creado correctamente",
    });
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
    sileo.error({
      title: "Error",
      description: "No se pudo crear el tipo de tour",
    });
    return null;
  }
};

/**
 * PUT: actualizar tipo de tour (normalmente privado)
 */
export const updateTourTypeRequest = async (
  tourTypeData: Pick<TourType, "name" | "description">,
  id: string,
): Promise<TourType | null> => {
  try {
    const response = await axiosPrivate.put<ApiResponse<TourType>>(
      `/tour-types/${id}`,
      tourTypeData,
    );

    sileo.success({
      title: "Éxito",
      description: "Tipo de tour actualizado correctamente",
    });
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
    sileo.error({
      title: "Error",
      description: "No se pudo actualizar el tipo de tour",
    });
    return null;
  }
};

/**
 * DELETE: eliminar tipo de tour (normalmente privado)
 */
export const deleteTourTypeRequest = async (
  tourTypeId: string,
): Promise<boolean> => {
  try {
    await axiosPrivate.delete<ApiResponse<null>>(`/tour-types/${tourTypeId}`);
    sileo.success({
      title: "Éxito",
      description: "Tipo de tour eliminado correctamente",
    });
    return true;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
    sileo.error({
      title: "Error",
      description: "No se pudo eliminar el tipo de tour",
    });
    return false;
  }
};
