/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";
import { sileo } from "sileo";
import { axiosPublic, axiosPrivate } from "../../../config/axiosConfig";
import type { ApiResponse } from "../../../types/api";

import type { BookingType } from "../types/BookingType";
import type { UpdateBookingType } from "../types/UpdateBookingType";
import type { Group } from "../../guide/context/GuideContext";
import { BookingCreatedResponse } from "../types/BookingCreatedResponse";

const url = "/bookings";

export type BookingFeedFilters = {
  status?: string;
  bookingCode?: string;
  tourPackageId?: string;
  dateRangeId?: string;
};

export type FeedPagination = {
  nextCursor: string | null;
  hasMore: boolean;
};

export type FeedPage<T> = {
  items: T[];
  pagination: FeedPagination;
};

export type BookingReportSummary = {
  totalBookings: number;
  totalRevenue: number;
  years: number[];
  byTourPackageMonth: {
    tourPackageId: string;
    year: number;
    month: number;
    count: number;
    totalAmount: number;
  }[];
  bySellerTourPackage: {
    sellerId: string;
    tourPackageId: string;
    count: number;
  }[];
  daily: { date: string; count: number }[];
};

/* ============================
   Helpers
============================ */
const isLogicalErrorResponse = (payload: any): boolean => {
  if (!payload) return true;

  if (typeof payload.statusCode === "number") {
    if (payload.statusCode >= 200 && payload.statusCode < 300) return false;
    return true;
  }

  if (payload.success === false) return true;
  if (payload.status === "error") return true;

  return false;
};

const extractMessage = (payload: any, fallback: string) =>
  payload?.message || fallback;

/* ============================
   CREATE booking
============================ */
export const createBookingRequest = async (
  data: FormData,
): Promise<BookingCreatedResponse | null> => {
  try {
    const response = await axiosPrivate.post<ApiResponse<any>>(
      "/bookings",
      data,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    if (!response.data?.data) {
      sileo.error({
        title: "Error",
        description: "No se pudo crear la reserva",
      });
      return null;
    }

    sileo.success({
      title: "Éxito",
      description: "Reserva creada correctamente",
    });

    return response.data.data as BookingCreatedResponse;
  } catch (error) {
    console.error(error);
    sileo.error({
      title: "Error",
      description: "No se pudo crear la reserva",
    });
    return null;
  }
};

/* ============================
   GET all bookings
============================ */
export const getAllBookingsRequest = async (): Promise<
  BookingType[] | null
> => {
  try {
    const response = await axiosPublic.get<ApiResponse<any>>(url);

    if (isLogicalErrorResponse(response.data)) {
      sileo.error({
        title: "Error",
        description: "No se pudieron cargar las reservas",
      });
      return null;
    }

    return response.data.data as BookingType[];
  } catch (error) {
    if (isAxiosError(error)) console.error(error.response?.data);
    sileo.error({
      title: "Error",
      description: "No se pudieron cargar las reservas",
    });
    return null;
  }
};

/* ============================
   GET bookings feed
============================ */
export const getBookingsFeedRequest = async (
  filters: BookingFeedFilters & { cursor?: string | null; limit?: number } = {},
): Promise<FeedPage<BookingType> | null> => {
  try {
    const response = await axiosPublic.get<
      ApiResponse<FeedPage<BookingType>>
    >(`${url}/feed`, {
      params: {
        limit: filters.limit,
        cursor: filters.cursor || undefined,
        status: filters.status || undefined,
        bookingCode: filters.bookingCode || undefined,
        tourPackageId: filters.tourPackageId || undefined,
        dateRangeId: filters.dateRangeId || undefined,
      },
    });

    if (isLogicalErrorResponse(response.data)) {
      return null;
    }

    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.error(error.response?.data);
    return null;
  }
};

export const getBookingDetailRequest = async (
  id: string,
): Promise<{ booking: BookingType; tourists: any[] } | null> => {
  try {
    const response = await axiosPublic.get<
      ApiResponse<{ booking: BookingType; tourists: any[] }>
    >(`${url}/${id}/detail`);
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.error(error.response?.data);
    return null;
  }
};

export const getBookingReportSummaryRequest =
  async (): Promise<BookingReportSummary | null> => {
    try {
      const response = await axiosPublic.get<ApiResponse<BookingReportSummary>>(
        `${url}/report-summary`,
      );
      return response.data.data;
    } catch (error) {
      if (isAxiosError(error)) console.error(error.response?.data);
      return null;
    }
  };

export const getDateRangeSummaryRequest = async (
  dateRangeId: string,
  tourPackageId?: string,
): Promise<{ bookingCount: number; touristCount: number } | null> => {
  try {
    const response = await axiosPublic.get<
      ApiResponse<{ bookingCount: number; touristCount: number }>
    >(`${url}/date-range-summary`, {
      params: { dateRangeId, tourPackageId },
    });
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.error(error.response?.data);
    return null;
  }
};

/* ============================
   UPDATE booking
============================ */
export const updateBookingRequest = async (
  id: string,
  data: Partial<UpdateBookingType>,
): Promise<BookingType | null> => {
  try {
    const response = await axiosPrivate.put<ApiResponse<any>>(
      `${url}/${id}`,
      data,
    );
    console.log(":::bookingUpdated ", response.data);
    if (isLogicalErrorResponse(response.data)) {
      sileo.error({
        title: "Error",
        description: extractMessage(
          response.data,
          "No se pudo actualizar la reserva",
        ),
      });
      return null;
    }

    sileo.success({
      title: "Éxito",
      description: "Reserva actualizada correctamente",
    });

    return response.data.data as BookingType;
  } catch (error) {
    if (isAxiosError(error)) console.error(error.response?.data);
    sileo.error({
      title: "Error",
      description: "No se pudo actualizar la reserva",
    });
    return null;
  }
};

/* ============================
   UPDATE attendance
============================ */
export const updateAttendanceRequest = async (
  data: unknown,
): Promise<Group[] | null> => {
  try {
    const response = await axiosPrivate.put<ApiResponse<any>>(
      `${url}/attendance-lists`,
      data,
      { headers: { "Content-Type": "application/json" } },
    );

    if (isLogicalErrorResponse(response.data)) {
      sileo.error({
        title: "Error",
        description: "No se pudo actualizar la asistencia",
      });
      return null;
    }

    sileo.success({
      title: "Éxito",
      description: "Asistencia actualizada correctamente",
    });

    return response.data.data as Group[];
  } catch (error) {
    if (isAxiosError(error)) console.error(error.response?.data);
    sileo.error({
      title: "Error",
      description: "No se pudo actualizar la asistencia",
    });
    return null;
  }
};

/* ============================
   CANCEL booking
============================ */
export const cancelBookingRequest = async (
  bookingId: string,
  cancellationFee: number,
  refundAmount: number,
  refundedAt: Date,
): Promise<BookingType | null> => {
  try {
    const response = await axiosPrivate.put<ApiResponse<any>>(
      `${url}/cancel/${bookingId}`,
      { cancellationFee, refundAmount, refundedAt },
      { headers: { "Content-Type": "application/json" } },
    );

    if (isLogicalErrorResponse(response.data)) {
      sileo.error({
        title: "Error",
        description: "No se pudo cancelar la reserva",
      });
      return null;
    }

    sileo.success({
      title: "Éxito",
      description: "Reserva cancelada correctamente",
    });

    return response.data.data as BookingType;
  } catch (error) {
    if (isAxiosError(error)) console.error(error.response?.data);
    sileo.error({
      title: "Error",
      description: "No se pudo cancelar la reserva",
    });
    return null;
  }
};
