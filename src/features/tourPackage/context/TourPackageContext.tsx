/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import type { TourPackageType } from "../types/TourPackageType";
import type { DateRangeType } from "../types/DateRangeType";

import * as TourPackageService from "../service/TourPackageService";
import {
  createDateRangeRequest,
  updateDateRangeRequest,
} from "../service/DateRangeService";

interface TourPackageContextType {
  tourPackages: TourPackageType[];
  loading: boolean;
  error: string | null;

  fetchTourPackages: () => Promise<void>;

  createTourPackage: (
    tourPackage: Omit<TourPackageType, "id">,
  ) => Promise<TourPackageType | null>;

  updateTourPackage: (
    id: string,
    tourPackage: Partial<TourPackageType>,
  ) => Promise<TourPackageType | null>;

  updateTourPackageStatus: (id: string, status: string) => Promise<void>;

  getTourPackageInfoById: (id: string) => TourPackageType | null;

  createDateRange: (dateRange: DateRangeType) => Promise<DateRangeType | null>;
  updateDateRange: (
    dateRange: Partial<DateRangeType>,
  ) => Promise<DateRangeType | null>;

  setTourPackages: (tourPackages: TourPackageType[]) => void;
}

const TourPackageContext = createContext<TourPackageContextType | undefined>(
  undefined,
);

export const useTourPackageContext = (): TourPackageContextType => {
  const context = useContext(TourPackageContext);
  if (context === undefined) {
    throw new Error(
      "useTourPackageContext debe ser usado dentro de TourPackageProvider",
    );
  }
  return context;
};

// helper id
const getId = (x: any) => x?.id ?? x?._id;

export const TourPackageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tourPackages, setTourPackages] = useState<TourPackageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTourPackages = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const list = await TourPackageService.getAllTourPackagesRequest();

      // ❌ si es null, el service ya mostró sileo.error
      if (!list) {
        setTourPackages([]);
        setError("No se pudieron cargar los paquetes");
        return;
      }

      setTourPackages(list);
      setError(null);
    } catch (err) {
      console.error("Error fetching tour packages:", err);
      setError("Error al cargar paquetes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTourPackages();
  }, [fetchTourPackages]);

  const getTourPackageInfoById = useCallback(
    (id: string): TourPackageType | null => {
      if (!id) return null;
      return tourPackages.find((tp) => getId(tp) === id) ?? null;
    },
    [tourPackages],
  );

  const createTourPackage = useCallback(
    async (
      tourPackage: Omit<TourPackageType, "id">,
    ): Promise<TourPackageType | null> => {
      try {
        const created =
          await TourPackageService.createTourPackageRequest(tourPackage);

        if (!created) return null;

        setTourPackages((prev) => [...prev, created]);
        return created;
      } catch (err) {
        console.error("Error creating tour package:", err);
        setError("Error al crear paquete");
        return null;
      }
    },
    [],
  );

  const updateTourPackage = useCallback(
    async (
      id: string,
      tourPackage: Partial<TourPackageType>,
    ): Promise<TourPackageType | null> => {
      try {
        const updated = await TourPackageService.updateTourPackageRequest({
          ...tourPackage,
          id,
        });

        if (!updated) return null;

        setTourPackages((prev) =>
          prev.map((tp) => (getId(tp) === id ? updated : tp)),
        );

        return updated;
      } catch (err) {
        console.error("Error updating tour package:", err);
        setError("Error al actualizar paquete");
        return null;
      }
    },
    [],
  );

  const updateTourPackageStatus = useCallback(
    async (id: string, status: string): Promise<void> => {
      try {
        const updated = await TourPackageService.updateTourPackageStatusRequest(
          id,
          status,
        );

        if (!updated) return;

        setTourPackages((prev) =>
          prev.map((tp) => (getId(tp) === id ? { ...tp, status } : tp)),
        );
      } catch (err) {
        console.error("Error updating tour package status:", err);
        setError("Error al actualizar estado");
      }
    },
    [],
  );

  const createDateRange = useCallback(
    async (dateRange: DateRangeType): Promise<DateRangeType | null> => {
      try {
        const created = await createDateRangeRequest(dateRange);
        if (!created) return null;

        setTourPackages((prev) =>
          prev.map((tp) =>
            getId(tp) === created.tourPackageId
              ? { ...tp, dateRanges: [...tp.dateRanges, created] }
              : tp,
          ),
        );

        return created;
      } catch (err) {
        console.error("Error creating date range:", err);
        return null;
      }
    },
    [],
  );

  const updateDateRange = useCallback(
    async (
      dateRange: Partial<DateRangeType>,
    ): Promise<DateRangeType | null> => {
      if (!dateRange.id) return null;

      try {
        const updated = await updateDateRangeRequest(dateRange.id, dateRange);

        if (!updated) return null;

        setTourPackages((prev) =>
          prev.map((tp) =>
            getId(tp) === updated.tourPackageId
              ? {
                  ...tp,
                  dateRanges: tp.dateRanges.map((dr) =>
                    dr.id === updated.id ? updated : dr,
                  ),
                }
              : tp,
          ),
        );

        return updated;
      } catch (err) {
        console.error("Error updating date range:", err);
        return null;
      }
    },
    [],
  );

  return (
    <TourPackageContext.Provider
      value={{
        tourPackages,
        loading,
        error,
        fetchTourPackages,
        createTourPackage,
        updateTourPackage,
        updateTourPackageStatus,
        getTourPackageInfoById,
        createDateRange,
        updateDateRange,
        setTourPackages,
      }}
    >
      {children}
    </TourPackageContext.Provider>
  );
};
