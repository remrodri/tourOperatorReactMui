import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import type { DateRangeType } from "../../tourPackage/types/DateRangeType";
import {
  createDateRangeRequest,
  getAllDateRangesRequest,
  updateDateRangeRequest,
} from "../service/DateRangeService";

type DateRangeContextType = {
  dateRanges: DateRangeType[];
  dateRangesByTP: DateRangeType[];
  loading: boolean;
  error: string | null;

  fetchDateRanges: () => void;

  getDateRangeById: (id: string) => DateRangeType | null;
  getDateRangeInfoById: (id: string) => DateRangeType | null;

  fillDateRangesByIds: (dateRangeIds: DateRangeType[]) => DateRangeType[];
  findDateRangesByTourPackage: (dateRangesIds: DateRangeType[]) => void;

  addDateRange: (dateRange: DateRangeType) => void;
  filterDateRangesByTourGuideId: (id: string) => DateRangeType[];

  createDateRange: (dateRange: DateRangeType) => Promise<DateRangeType | null>;
  updateDateRange: (dateRange: DateRangeType) => Promise<DateRangeType | null>;
  updateDateRangeStatus: (
    id: string,
    status: string,
  ) => Promise<DateRangeType | null>;
};

const DateRangeContext = createContext<DateRangeContextType | undefined>(
  undefined,
);

export const useDateRangeContext = (): DateRangeContextType => {
  const context = useContext(DateRangeContext);
  if (context === undefined) {
    throw new Error(
      "useDateRangeContext debe ser usado con un DateRangeProvider",
    );
  }
  return context;
};

// ✅ Helper por si tu API devuelve _id en vez de id
const getId = (dr: any) => dr?.id ?? dr?._id;

export const DateRangeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dateRanges, setDateRanges] = useState<DateRangeType[]>([]);
  const [dateRangesByTP, setDateRangesByTP] = useState<DateRangeType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDateRanges = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getAllDateRangesRequest();
      if (!list) {
        setDateRanges([]);
        setError("No se pudieron cargar los rangos");
        return;
      }
      setDateRanges(list);
      setError(null);
    } catch (e) {
      console.error("Error fetching date ranges:", e);
      setError("Failed to fetch date ranges");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDateRanges();
  }, [fetchDateRanges]);

  const getDateRangeById = useCallback(
    (id: string): DateRangeType | null => {
      if (!id) return null;
      return dateRanges.find((dr) => getId(dr) === id) ?? null;
    },
    [dateRanges],
  );

  const getDateRangeInfoById = useCallback(
    (id: string) => getDateRangeById(id),
    [getDateRangeById],
  );

  const fillDateRangesByIds = useCallback(
    (dateRangeIds: DateRangeType[]): DateRangeType[] => {
      return (dateRangeIds ?? [])
        .map((drId) => dateRanges.find((dr) => getId(dr) === getId(drId)))
        .filter((dr): dr is DateRangeType => Boolean(dr));
    },
    [dateRanges],
  );

  const findDateRangesByTourPackage = useCallback(
    (dateRangesIds: DateRangeType[]): void => {
      if (!dateRangesIds?.length) {
        setDateRangesByTP([]);
        return;
      }
      const found = fillDateRangesByIds(dateRangesIds);
      setDateRangesByTP(found);
    },
    [fillDateRangesByIds],
  );

  const filterDateRangesByTourGuideId = useCallback(
    (id: string): DateRangeType[] => {
      return dateRanges.filter((dr) => dr.guides?.includes(id));
    },
    [dateRanges],
  );

  const addDateRange = useCallback((dateRange: DateRangeType) => {
    setDateRanges((prev) => [...prev, dateRange]);
  }, []);

  const createDateRange = useCallback(
    async (dateRange: DateRangeType): Promise<DateRangeType | null> => {
      setLoading(true);
      setError(null);
      try {
        const created = await createDateRangeRequest(dateRange);
        if (!created) {
          setError("Failed to create date range");
          return null;
        }
        setDateRanges((prev) => [...prev, created]);
        return created;
      } catch (e) {
        console.error("Error creating date range:", e);
        setError("Failed to create date range");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateDateRange = useCallback(
    async (dateRange: DateRangeType): Promise<DateRangeType | null> => {
      const id = getId(dateRange);
      if (!id) return null;

      setLoading(true);
      setError(null);
      try {
        const updated = await updateDateRangeRequest(id, dateRange);
        if (!updated) {
          setError("Failed to update date range");
          return null;
        }
        setDateRanges((prev) =>
          prev.map((dr) => (getId(dr) === id ? updated : dr)),
        );
        return updated;
      } catch (e) {
        console.error("Error updating date range:", e);
        setError("Failed to update date range");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateDateRangeStatus = useCallback(
    async (id: string, status: string): Promise<DateRangeType | null> => {
      const translatedStatus =
        status === "Completado"
          ? "completed"
          : status === "Cancelado"
            ? "cancelled"
            : status;

      setLoading(true);
      setError(null);
      try {
        const updated = await updateDateRangeRequest(id, {
          state: translatedStatus,
        } as Partial<DateRangeType>);
        if (!updated) {
          setError("Failed to update date range status");
          return null;
        }
        setDateRanges((prev) =>
          prev.map((dr) => (getId(dr) === id ? updated : dr)),
        );
        return updated;
      } catch (e) {
        console.error("Error updating date range status:", e);
        setError("Failed to update date range status");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <DateRangeContext.Provider
      value={{
        dateRanges,
        dateRangesByTP,
        loading,
        error,
        fetchDateRanges,
        getDateRangeById,
        getDateRangeInfoById,
        fillDateRangesByIds,
        findDateRangesByTourPackage,
        addDateRange,
        filterDateRangesByTourGuideId,
        createDateRange,
        updateDateRange,
        updateDateRangeStatus,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
};
