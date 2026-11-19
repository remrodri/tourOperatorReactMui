import { isAxiosError } from "axios";
import { axiosPrivate } from "../../../config/axiosConfig";
import type { ApiResponse } from "../../../types/api";
import type {
  AnalyticsApiEnvelope,
  AnalyticsFilters,
  AnalyticsOverview,
} from "../types/AnalyticsTypes";

const compactFilters = (filters: AnalyticsFilters): AnalyticsFilters =>
  Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => typeof value === "string" && value.trim() !== "",
    ),
  ) as AnalyticsFilters;

let inFlightRequest: {
  key: string;
  promise: Promise<AnalyticsOverview>;
} | null = null;

export const getAnalyticsOverview = (
  filters: AnalyticsFilters = {},
): Promise<AnalyticsOverview> => {
  const params = compactFilters(filters);
  const key = JSON.stringify(params);

  if (inFlightRequest?.key === key) {
    return inFlightRequest.promise;
  }

  const promise = axiosPrivate
    .get<AnalyticsApiEnvelope>("/analytics", { params })
    .then(({ data }) => ({
      ...data.data,
      metadata: data.meta,
      warnings: data.warnings,
    }));

  const clearInFlight = () => {
    if (inFlightRequest?.promise === promise) {
      inFlightRequest = null;
    }
  };

  inFlightRequest = { key, promise };
  promise.then(clearInFlight, clearInFlight);

  return promise;
};

export const getAnalyticsErrorMessage = (
  error: unknown,
  fallback = "No se pudo cargar el módulo de analítica",
): string => {
  if (isAxiosError(error)) {
    const message = (
      error.response?.data as Partial<ApiResponse<unknown>> | undefined
    )?.message;

    if (message) {
      return message;
    }
  }

  return fallback;
};
