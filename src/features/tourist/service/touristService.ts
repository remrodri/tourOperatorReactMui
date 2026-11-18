import { isAxiosError } from "axios";
import { sileo } from "sileo";
import { axiosPublic, axiosPrivate } from "../../../config/axiosConfig";
import type { ApiResponse } from "../../../types/api";
import { TouristType } from "../../booking/types/TouristType";

const url = "/tourists";

export type FeedPage<T> = {
  items: T[];
  pagination: { nextCursor: string | null; hasMore: boolean };
};

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

export const getTouristsFeedRequest = async (
  filters: { search?: string; cursor?: string | null; limit?: number } = {},
): Promise<FeedPage<TouristType> | null> => {
  try {
    const response = await axiosPublic.get<ApiResponse<FeedPage<TouristType>>>(
      `${url}/feed`,
      {
        params: {
          limit: filters.limit,
          cursor: filters.cursor || undefined,
          search: filters.search || undefined,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
    return null;
  }
};

export const getTouristsByIdsRequest = async (
  ids: string[],
): Promise<TouristType[] | null> => {
  if (!ids.length) return [];
  try {
    const response = await axiosPublic.get<ApiResponse<TouristType[]>>(
      `${url}/by-ids`,
      { params: { ids: ids.join(",") } },
    );
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
    return null;
  }
};

export const getTouristsCountRequest = async (): Promise<number | null> => {
  try {
    const response = await axiosPublic.get<ApiResponse<{ total: number }>>(
      `${url}/count`,
    );
    return response.data.data.total;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
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
