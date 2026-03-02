/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";
import { sileo } from "sileo";
import { axiosPublic, axiosPrivate } from "../../../config/axiosConfig";
import type { ApiResponse } from "../../../types/api";

import { BookingType } from "../types/BookingType";
import { UpdateBookingType } from "../types/UpdateBookingType";

// Si tienes un tipo real para attendance, úsalo. Aquí lo tipamos mínimo:
export type AttendanceListPayload = unknown;

const url = "/bookings";

/**
 * CREATE booking
 * Normalmente PRIVADO (si es público, cambia axiosPrivate -> axiosPublic)
 */
export const createBookingRequest = async (
  data: FormData,
): Promise<BookingType | null> => {
  try {
    const response = await axiosPrivate.post<ApiResponse<BookingType>>(
      url,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    sileo.success({
      title: "Éxito",
      description: "Reserva creada correctamente",
    });
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
    sileo.error({ title: "Error", description: "No se pudo crear la reserva" });
    return null;
  }
};

/**
 * GET all bookings
 * Normalmente PRIVADO (porque es data operativa)
 * Si tu backend lo expone público, cambia axiosPrivate -> axiosPublic
 */
export const getAllBookingsRequest = async (): Promise<
  BookingType[] | null
> => {
  try {
    const response = await axiosPublic.get<ApiResponse<BookingType[]>>(url);
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
    sileo.error({
      title: "Error",
      description: "No se pudieron cargar las reservas",
    });
    return null;
  }
};

/**
 * UPDATE booking
 * PRIVADO
 */
export const updateBookingRequest = async (
  id: string,
  data: Partial<UpdateBookingType>,
): Promise<BookingType | null> => {
  try {
    const response = await axiosPrivate.put<ApiResponse<BookingType>>(
      `${url}/${id}`,
      data,
    );

    sileo.success({
      title: "Éxito",
      description: "Reserva actualizada correctamente",
    });
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
    sileo.error({
      title: "Error",
      description: "No se pudo actualizar la reserva",
    });
    return null;
  }
};

/**
 * UPDATE attendance lists
 * PRIVADO
 */
export const updateAttendanceRequest = async (
  data: AttendanceListPayload,
): Promise<any | null> => {
  try {
    const response = await axiosPrivate.put<ApiResponse<any>>(
      `${url}/attendance-lists`,
      data,
      { headers: { "Content-Type": "application/json" } },
    );

    sileo.success({
      title: "Éxito",
      description: "Asistencia actualizada correctamente",
    });
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
    sileo.error({
      title: "Error",
      description: "No se pudo actualizar la asistencia",
    });
    return null;
  }
};

/**
 * CANCEL booking
 * PRIVADO
 */
export const cancelBookingRequest = async (
  bookingId: string,
  cancellationFee: number,
  refundAmount: number,
  refundedAt: Date,
): Promise<BookingType | null> => {
  try {
    const response = await axiosPrivate.put<ApiResponse<BookingType>>(
      `${url}/cancel/${bookingId}`,
      { cancellationFee, refundAmount, refundedAt },
      { headers: { "Content-Type": "application/json" } },
    );

    sileo.success({
      title: "Éxito",
      description: "Reserva cancelada correctamente",
    });
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
    sileo.error({
      title: "Error",
      description: "No se pudo cancelar la reserva",
    });
    return null;
  }
};
