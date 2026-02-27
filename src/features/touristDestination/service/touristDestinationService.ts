import { isAxiosError } from "axios";
import { sileo } from "sileo";
import { axiosPublic, axiosPrivate } from "../../../config/axiosConfig";
import type { ApiResponse } from "../../../types/api";
import { TouristDestinationType } from "../types/TouristDestinationType";

// Payloads de create/update
export type CreateTouristDestinationDTO = {
  name: string;
  description: string;
  newImages: File[];
};

export type UpdateTouristDestinationDTO = {
  id: string;
  name: string;
  description: string;
  newImages: File[];
  existingImages: string[];
};

// Helper para obtener mensaje del backend si existe
const getErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError(error)) {
    const msg = (
      error.response?.data as Partial<ApiResponse<unknown>> | undefined
    )?.message;
    return msg ?? fallback;
  }
  return fallback;
};

/**
 * DELETE tourist destination (PRIVADO)
 */
export const deleteTouristDestinationRequest = async (
  id: string,
): Promise<boolean> => {
  try {
    await axiosPrivate.delete<ApiResponse<null>>(`/tourist-destination/${id}`);
    sileo.success({
      title: "Éxito",
      description: "Destino turístico eliminado correctamente",
    });
    return true;
  } catch (error) {
    console.log(isAxiosError(error) ? error.response?.data : error);
    sileo.error({
      title: "Error",
      description: getErrorMessage(
        error,
        "No se pudo eliminar el destino turístico",
      ),
    });
    return false;
  }
};

/**
 * GET all tourist destinations (PÚBLICO)
 * Si requiere token: cambia axiosPublic -> axiosPrivate
 */
export const getAllTouristDestinationRequest = async (): Promise<
  TouristDestinationType[] | null
> => {
  try {
    const response = await axiosPublic.get<
      ApiResponse<TouristDestinationType[]>
    >("/tourist-destination");
    return response.data.data;
  } catch (error) {
    console.log(isAxiosError(error) ? error.response?.data : error);
    sileo.error({
      title: "Error",
      description: getErrorMessage(
        error,
        "No se pudieron cargar los destinos turísticos",
      ),
    });
    return null;
  }
};

/**
 * PUT update destination with multipart (PRIVADO)
 */
export const updateTouristDestinationRequest = async (
  data: UpdateTouristDestinationDTO,
): Promise<TouristDestinationType | null> => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);

    if (data.newImages?.length) {
      data.newImages.forEach((image) => formData.append("newImages", image));
    }

    // backend espera JSON string
    formData.append(
      "existingImages",
      JSON.stringify(data.existingImages ?? []),
    );

    const response = await axiosPrivate.put<
      ApiResponse<TouristDestinationType>
    >(`/tourist-destination/${data.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    sileo.success({
      title: "Éxito",
      description: "Destino turístico actualizado correctamente",
    });
    return response.data.data;
  } catch (error) {
    console.log(isAxiosError(error) ? error.response?.data : error);
    sileo.error({
      title: "Error",
      description: getErrorMessage(
        error,
        "No se pudo actualizar el destino turístico",
      ),
    });
    return null;
  }
};

/**
 * POST create destination with multipart (PRIVADO)
 */
export const createTouristDestinationRequest = async (
  data: CreateTouristDestinationDTO,
): Promise<TouristDestinationType | null> => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);

    if (data.newImages?.length) {
      data.newImages.forEach((image) => formData.append("newImages", image));
    }

    const response = await axiosPrivate.post<
      ApiResponse<TouristDestinationType>
    >("/tourist-destination", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    sileo.success({
      title: "Éxito",
      description: "Destino turístico creado correctamente",
    });
    return response.data.data;
  } catch (error) {
    console.log(isAxiosError(error) ? error.response?.data : error);
    sileo.error({
      title: "Error",
      description: getErrorMessage(
        error,
        "No se pudo crear el destino turístico",
      ),
    });
    return null;
  }
};
