import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  getAnalyticsDeparture,
  getAnalyticsDepartures,
  getAnalyticsErrorMessage,
  getAnalyticsOverview,
  getAnalyticsPrediction,
  getAnalyticsPredictionMetrics,
  getAnalyticsSummary,
  getAnalyticsTrends,
} from "../service/analyticsService";
import type {
  AnalyticsDepartureResource,
  AnalyticsDeparturesQuery,
  AnalyticsDeparturesResource,
  AnalyticsFilters,
  AnalyticsOverview,
  AnalyticsPredictionHorizon,
  AnalyticsPredictionMetricsResource,
  AnalyticsPredictionResource,
  AnalyticsResourceState,
  AnalyticsSummaryResource,
  AnalyticsTrendsQuery,
  AnalyticsTrendsResource,
} from "../types/AnalyticsTypes";

type ResourceKey =
  | "overview"
  | "summary"
  | "departures"
  | "departure"
  | "trends"
  | "prediction"
  | "predictionMetrics";

const emptyResource = <T,>(): AnalyticsResourceState<T> => ({
  data: null,
  loading: false,
  error: null,
});

export interface AnalyticsContextType {
  overview: AnalyticsOverview | null;
  loading: boolean;
  error: string | null;
  summary: AnalyticsResourceState<AnalyticsSummaryResource>;
  departures: AnalyticsResourceState<AnalyticsDeparturesResource>;
  departure: AnalyticsResourceState<AnalyticsDepartureResource>;
  trends: AnalyticsResourceState<AnalyticsTrendsResource>;
  prediction: AnalyticsResourceState<AnalyticsPredictionResource>;
  predictionMetrics: AnalyticsResourceState<AnalyticsPredictionMetricsResource>;
  fetchOverview: (filters?: AnalyticsFilters) => Promise<void>;
  fetchSummary: (filters?: AnalyticsFilters) => Promise<void>;
  fetchDepartures: (query?: AnalyticsDeparturesQuery) => Promise<void>;
  fetchDeparture: (id: string, filters?: AnalyticsFilters) => Promise<void>;
  fetchTrends: (query: AnalyticsTrendsQuery) => Promise<void>;
  fetchPrediction: (
    id: string,
    horizonDays: AnalyticsPredictionHorizon,
  ) => Promise<void>;
  fetchPredictionMetrics: () => Promise<void>;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics debe ser usado dentro de AnalyticsProvider");
  }
  return context;
};

export const AnalyticsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState(emptyResource<AnalyticsSummaryResource>);
  const [departures, setDepartures] = useState(emptyResource<AnalyticsDeparturesResource>);
  const [departure, setDeparture] = useState(emptyResource<AnalyticsDepartureResource>);
  const [trends, setTrends] = useState(emptyResource<AnalyticsTrendsResource>);
  const [prediction, setPrediction] = useState(emptyResource<AnalyticsPredictionResource>);
  const [predictionMetrics, setPredictionMetrics] = useState(
    emptyResource<AnalyticsPredictionMetricsResource>,
  );
  const generations = useRef<Record<ResourceKey, number>>({
    overview: 0,
    summary: 0,
    departures: 0,
    departure: 0,
    trends: 0,
    prediction: 0,
    predictionMetrics: 0,
  });

  const fetchResource = useCallback(
    async <T,>(
      key: ResourceKey,
      setter: Dispatch<SetStateAction<AnalyticsResourceState<T>>>,
      request: () => Promise<T>,
      fallback: string,
    ) => {
      const generation = ++generations.current[key];
      setter((current) => ({ ...current, loading: true, error: null }));
      try {
        const data = await request();
        if (generation !== generations.current[key]) return;
        setter({ data, loading: false, error: null });
      } catch (requestError) {
        if (generation !== generations.current[key]) return;
        setter((current) => ({
          ...current,
          loading: false,
          error: getAnalyticsErrorMessage(requestError, fallback),
        }));
      }
    },
    [],
  );

  const fetchOverview = useCallback(async (filters: AnalyticsFilters = {}) => {
    const generation = ++generations.current.overview;
    setLoading(true);
    setError(null);
    try {
      const data = await getAnalyticsOverview(filters);
      if (generation !== generations.current.overview) return;
      setOverview(data);
    } catch (requestError) {
      if (generation !== generations.current.overview) return;
      setOverview(null);
      setError(getAnalyticsErrorMessage(requestError));
    } finally {
      if (generation === generations.current.overview) setLoading(false);
    }
  }, []);

  const fetchSummary = useCallback(
    (filters: AnalyticsFilters = {}) =>
      fetchResource("summary", setSummary, () => getAnalyticsSummary(filters), "No se pudo cargar el resumen analítico"),
    [fetchResource],
  );

  const fetchDepartures = useCallback(
    (query: AnalyticsDeparturesQuery = {}) =>
      fetchResource("departures", setDepartures, () => getAnalyticsDepartures(query), "No se pudieron cargar las salidas"),
    [fetchResource],
  );

  const fetchDeparture = useCallback(
    (id: string, filters: AnalyticsFilters = {}) =>
      fetchResource("departure", setDeparture, () => getAnalyticsDeparture(id, filters), "No se pudo cargar el detalle de la salida"),
    [fetchResource],
  );

  const fetchTrends = useCallback(
    (query: AnalyticsTrendsQuery) =>
      fetchResource("trends", setTrends, () => getAnalyticsTrends(query), "No se pudieron cargar las tendencias"),
    [fetchResource],
  );

  const fetchPrediction = useCallback(
    (id: string, horizonDays: AnalyticsPredictionHorizon) =>
      fetchResource("prediction", setPrediction, () => getAnalyticsPrediction(id, horizonDays), "No se pudo cargar la predicción"),
    [fetchResource],
  );

  const fetchPredictionMetrics = useCallback(
    () =>
      fetchResource("predictionMetrics", setPredictionMetrics, getAnalyticsPredictionMetrics, "No se pudieron cargar las métricas predictivas"),
    [fetchResource],
  );

  useEffect(() => {
    const requestGenerations = generations.current;
    fetchOverview();
    return () => {
      for (const key of Object.keys(requestGenerations) as ResourceKey[]) {
        requestGenerations[key] += 1;
      }
    };
  }, [fetchOverview]);

  return (
    <AnalyticsContext.Provider
      value={{
        overview,
        loading,
        error,
        summary,
        departures,
        departure,
        trends,
        prediction,
        predictionMetrics,
        fetchOverview,
        fetchSummary,
        fetchDepartures,
        fetchDeparture,
        fetchTrends,
        fetchPrediction,
        fetchPredictionMetrics,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
