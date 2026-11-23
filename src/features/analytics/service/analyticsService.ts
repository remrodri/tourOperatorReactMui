import { isAxiosError } from "axios";
import { axiosPrivate } from "../../../config/axiosConfig";
import type { ApiResponse } from "../../../types/api";
import type {
  AnalyticsApiEnvelope,
  AnalyticsDepartureResource,
  AnalyticsDeparturesQuery,
  AnalyticsDeparturesResource,
  AnalyticsFilters,
  AnalyticsFoundationEnvelope,
  AnalyticsMeta,
  AnalyticsOverview,
  AnalyticsPredictionHorizon,
  AnalyticsPredictionMetricsResource,
  AnalyticsPredictionResource,
  AnalyticsPredictiveMeta,
  AnalyticsResource,
  AnalyticsSummaryResource,
  AnalyticsTrendsMeta,
  AnalyticsTrendsQuery,
  AnalyticsTrendsResource,
} from "../types/AnalyticsTypes";

const compactQuery = <T extends object>(query: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(query).filter(([, value]) =>
      typeof value === "string" ? value.trim() !== "" : value !== undefined,
    ),
  ) as Partial<T>;

const inFlightRequests = new Map<string, Promise<unknown>>();

const deduplicate = <T>(key: string, request: () => Promise<T>): Promise<T> => {
  const existing = inFlightRequests.get(key) as Promise<T> | undefined;
  if (existing) return existing;

  const promise = request();
  inFlightRequests.set(key, promise);
  const clear = () => {
    if (inFlightRequests.get(key) === promise) inFlightRequests.delete(key);
  };
  promise.then(clear, clear);
  return promise;
};

const unwrap = <TData, TMeta>(
  envelope: AnalyticsApiEnvelope<TData, TMeta>,
): AnalyticsResource<TData, TMeta> => ({
  data: envelope.data,
  metadata: envelope.meta,
  warnings: envelope.warnings,
});

const getResource = <TData, TMeta>(
  path: string,
  params: object = {},
): Promise<AnalyticsResource<TData, TMeta>> => {
  const compactParams = compactQuery(params);
  const key = `${path}?${JSON.stringify(compactParams)}`;
  return deduplicate(key, () =>
    axiosPrivate
      .get<AnalyticsApiEnvelope<TData, TMeta>>(path, { params: compactParams })
      .then(({ data }) => unwrap(data)),
  );
};

export const getAnalyticsOverview = (
  filters: AnalyticsFilters = {},
): Promise<AnalyticsOverview> => {
  const params = compactQuery(filters);
  const key = `/analytics?${JSON.stringify(params)}`;
  return deduplicate(key, () =>
    axiosPrivate
      .get<AnalyticsFoundationEnvelope>("/analytics", { params })
      .then(({ data }) => ({
        ...data.data,
        metadata: data.meta,
        warnings: data.warnings,
      })),
  );
};

export const getAnalyticsSummary = (
  filters: AnalyticsFilters = {},
): Promise<AnalyticsSummaryResource> =>
  getResource<AnalyticsSummaryResource["data"], AnalyticsMeta>(
    "/analytics/summary",
    filters,
  );

export const getAnalyticsDepartures = (
  query: AnalyticsDeparturesQuery = {},
): Promise<AnalyticsDeparturesResource> =>
  getResource<AnalyticsDeparturesResource["data"], AnalyticsMeta>(
    "/analytics/departures",
    query,
  );

export const getAnalyticsDeparture = (
  departureId: string,
  filters: AnalyticsFilters = {},
): Promise<AnalyticsDepartureResource> =>
  getResource<AnalyticsDepartureResource["data"], AnalyticsMeta>(
    `/analytics/departures/${departureId}`,
    filters,
  );

export const getAnalyticsTrends = (
  query: AnalyticsTrendsQuery,
): Promise<AnalyticsTrendsResource> =>
  getResource<AnalyticsTrendsResource["data"], AnalyticsTrendsMeta>(
    "/analytics/trends",
    query,
  );

export const getAnalyticsPrediction = (
  departureId: string,
  horizonDays: AnalyticsPredictionHorizon,
): Promise<AnalyticsPredictionResource> =>
  getResource<AnalyticsPredictionResource["data"], AnalyticsPredictiveMeta>(
    `/analytics/departures/${departureId}/prediction`,
    { horizonDays },
  );

export const getAnalyticsPredictionMetrics =
  (): Promise<AnalyticsPredictionMetricsResource> =>
    getResource<AnalyticsPredictionMetricsResource["data"], AnalyticsPredictiveMeta>(
      "/analytics/predictions/metrics",
    );

export const getAnalyticsErrorMessage = (
  error: unknown,
  fallback = "No se pudo cargar el módulo de analítica",
): string => {
  if (isAxiosError(error)) {
    const message = (
      error.response?.data as Partial<ApiResponse<unknown>> | undefined
    )?.message;
    if (message) return message;
  }
  return fallback;
};
