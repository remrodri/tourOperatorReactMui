import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  getAnalyticsErrorMessage,
  getAnalyticsOverview,
} from "../service/analyticsService";
import type { AnalyticsFilters, AnalyticsOverview } from "../types/AnalyticsTypes";

interface AnalyticsContextType {
  overview: AnalyticsOverview | null;
  loading: boolean;
  error: string | null;
  fetchOverview: (filters?: AnalyticsFilters) => Promise<void>;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined,
);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error("useAnalytics debe ser usado dentro de AnalyticsProvider");
  }

  return context;
};

export const AnalyticsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestGeneration = useRef(0);

  const fetchOverview = useCallback(async (filters: AnalyticsFilters = {}) => {
    const generation = ++requestGeneration.current;
    setLoading(true);
    setError(null);

    try {
      const data = await getAnalyticsOverview(filters);
      if (generation !== requestGeneration.current) return;
      setOverview(data);
    } catch (requestError) {
      if (generation !== requestGeneration.current) return;
      setOverview(null);
      setError(getAnalyticsErrorMessage(requestError));
    } finally {
      if (generation === requestGeneration.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchOverview();
    return () => {
      requestGeneration.current += 1;
    };
  }, [fetchOverview]);

  return (
    <AnalyticsContext.Provider
      value={{ overview, loading, error, fetchOverview }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
