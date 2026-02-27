import { isAxiosError } from "axios";
import { sileo } from "sileo";
import { axiosPublic, axiosPrivate } from "../../../config/axiosConfig";
import type { ApiResponse } from "../../../types/api";
import { TouristType } from "../../booking/types/TouristType";

const url = "/tourists";

/**
 * GET all tourists
 * Normalmente PRIVADO (cámbialo a axiosPublic si tu backend lo expone público)
 */
export const getAllTouristsRequest = async (): Promise<
  TouristType[] | null
> => {
  try {
    const response = await axiosPublic.get<ApiResponse<TouristType[]>>(url);
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
    sileo.error({
      title: "Error",
      description: "No se pudieron cargar los turistas",
    });
    return null;
  }
};

/**
 * UPDATE tourist
 * PRIVADO
 */
export const updateTouristRequest = async (
  tourist: TouristType,
): Promise<TouristType | null> => {
  try {
    const response = await axiosPrivate.put<ApiResponse<TouristType>>(
      `${url}/${tourist.id}`,
      tourist,
    );

    sileo.success({
      title: "Éxito",
      description: "Turista actualizado correctamente",
    });
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
    sileo.error({
      title: "Error",
      description: "No se pudo actualizar el turista",
    });
    return null;
  }
};
