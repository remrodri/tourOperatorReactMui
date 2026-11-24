import { isAxiosError } from "axios";
import { axiosPrivate } from "../../../config/axiosConfig";
import type { ApiResponse } from "../../../types/api";
import type {
  AnalyticsApiEnvelope,
  AnalyticsDepartureResource,
  AnalyticsDeparturesQuery,
  AnalyticsDeparturesResource,
  AnalyticsFilters,
  AnalyticsEconomicResource,
  AnalyticsEconomicMeta,
  AnalyticsFilterCatalog,
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

export const getAnalyticsFilterCatalog = async (): Promise<AnalyticsFilterCatalog> => {
  const packages = new Map<string, AnalyticsFilterCatalog["packages"][number]>();
  const destinations = new Map<
    string,
    AnalyticsFilterCatalog["destinations"][number]
  >();
  const departures: AnalyticsFilterCatalog["departures"] = [];
  let cursor: string | undefined;

  for (let page = 0; page < 20; page += 1) {
    const response = await getAnalyticsDepartures({
      limit: 100,
      ...(cursor ? { cursor } : {}),
    });
    response.data.items.forEach((item) => {
      if (item.tourPackage) packages.set(item.tourPackage.id, item.tourPackage);
      if (item.destination) destinations.set(item.destination.id, item.destination);
      departures.push({
        id: item.id,
        startDate: item.startDate,
        tourPackage: item.tourPackage,
        destination: item.destination,
      });
    });
    cursor = response.data.pagination.nextCursor ?? undefined;
    if (!response.data.pagination.hasMore) {
      return {
        packages: [...packages.values()].sort((a, b) =>
          (a.name ?? a.id).localeCompare(b.name ?? b.id),
        ),
        destinations: [...destinations.values()].sort((a, b) =>
          (a.name ?? a.id).localeCompare(b.name ?? b.id),
        ),
        departures,
      };
    }
    if (!cursor) break;
  }

  throw new Error("El catálogo analítico excede el límite seguro de paginación");
};

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

export const getAnalyticsEconomics = (
  departureId: string,
  horizonDays: AnalyticsPredictionHorizon,
): Promise<AnalyticsEconomicResource> =>
  getResource<AnalyticsEconomicResource["data"], AnalyticsEconomicMeta>(
    `/analytics/departures/${departureId}/economics`,
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
