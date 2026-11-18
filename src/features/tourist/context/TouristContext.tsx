/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

import type { TouristType } from "../../booking/types/TouristType";
import {
  getTouristsByIdsRequest,
  getTouristsCountRequest,
  getTouristsFeedRequest,
  updateTouristRequest,
} from "../service/touristService";

type TouristContextType = {
  tourists: TouristType[];
  totalCount: number;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  error: string | null;

  fetchTourists: (search?: string) => Promise<void>;
  loadMoreTourists: () => Promise<void>;

  ensureTouristsByIds: (ids: string[]) => Promise<void>;
  findTouristByDocument: (
    document: string,
    documentType: "ci" | "passport",
  ) => Promise<TouristType | null>;

  getTouristInfoById: (id: string) => TouristType | null;
  getTouristInfoByIds: (ids: string[]) => TouristType[];

  addTouristFromBooking: (tourist: TouristType) => TouristType;
  updateOnlyTourist: (
    touristValues: TouristType,
  ) => Promise<TouristType | null>;
};

const TouristContext = createContext<TouristContextType | undefined>(undefined);

export const useTouristContext = () => {
  const context = useContext(TouristContext);
  if (context === undefined) {
    throw new Error(
      "useTouristContext debe ser usado dentro de TouristProvider",
    );
  }
  return context;
};

const mergeTourists = (
  prev: TouristType[],
  incoming: TouristType[],
): TouristType[] => {
  const map = new Map(prev.map((t) => [t.id, t]));
  incoming.forEach((t) => map.set(t.id, t));
  return Array.from(map.values());
};

export const TouristProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tourists, setTourists] = useState<TouristType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const cursorRef = useRef<string | null>(null);
  const searchRef = useRef<string>("");
  const generationRef = useRef<number>(0);
  const loadingRef = useRef<boolean>(false);

  const getId = (t: any) => t?.id ?? t?._id;

  const transformApiTourist = useCallback(
    (t: any): TouristType => ({
      id: getId(t),
      firstName: t.firstName,
      lastName: t.lastName,
      email: t.email,
      phone: t.phone,
      ci: t.ci,
      nationality: t.nationality,
      dateOfBirth: t.dateOfBirth,
      passportNumber: t.passportNumber,
      documentType: t.documentType,
      bookingIds: t.bookingIds ?? [],
    }),
    [],
  );

  const fetchTourists = useCallback(
    async (search?: string): Promise<void> => {
      const generation = ++generationRef.current;
      loadingRef.current = true;
      setLoading(true);
      setLoadingMore(false);
      searchRef.current = search ?? "";
      cursorRef.current = null;
      setHasMore(false);

      try {
        const page = await getTouristsFeedRequest({
          search: searchRef.current || undefined,
          limit: 50,
        });

        if (generation !== generationRef.current) return;

        if (!page) {
          setTourists([]);
          setHasMore(false);
          setError("No se pudieron cargar los turistas");
          return;
        }

        setTourists(page.items.map(transformApiTourist));
        cursorRef.current = page.pagination.nextCursor;
        setHasMore(page.pagination.hasMore);
        setError(null);

        const total = await getTouristsCountRequest();
        if (generation === generationRef.current && total !== null) {
          setTotalCount(total);
        }
      } catch (err) {
        if (generation !== generationRef.current) return;
        console.error("Error fetching tourists:", err);
        setError("Error al cargar turistas");
      } finally {
        if (generation === generationRef.current) {
          loadingRef.current = false;
          setLoading(false);
        }
      }
    },
    [transformApiTourist],
  );

  const loadMoreTourists = useCallback(async (): Promise<void> => {
    if (loadingRef.current || !cursorRef.current || !hasMore) return;

    const generation = generationRef.current;
    const search = searchRef.current;
    const cursor = cursorRef.current;

    loadingRef.current = true;
    setLoadingMore(true);
    try {
      const page = await getTouristsFeedRequest({
        search: search || undefined,
        cursor,
        limit: 50,
      });

      if (generation !== generationRef.current) return;

      if (!page) {
        setError("No se pudieron cargar más turistas");
        return;
      }

      setTourists((prev) => mergeTourists(prev, page.items.map(transformApiTourist)));
      cursorRef.current = page.pagination.nextCursor;
      setHasMore(page.pagination.hasMore);
      setError(null);
    } catch (err) {
      if (generation !== generationRef.current) return;
      console.error("Error loading more tourists:", err);
      setError("Error al cargar más turistas");
    } finally {
      if (generation === generationRef.current) {
        loadingRef.current = false;
        setLoadingMore(false);
      }
    }
  }, [hasMore, transformApiTourist]);

  const ensureTouristsByIds = useCallback(
    async (ids: string[]): Promise<void> => {
      const unique = Array.from(new Set((ids ?? []).filter(Boolean)));
      if (!unique.length) return;

      const loadedIds = new Set(tourists.map((t) => t.id));
      const missing = unique.filter((id) => !loadedIds.has(id));
      if (!missing.length) return;

      const chunks: string[][] = [];
      for (let i = 0; i < missing.length; i += 100) {
        chunks.push(missing.slice(i, i + 100));
      }

      const results = await Promise.all(
        chunks.map((chunk) => getTouristsByIdsRequest(chunk)),
      );

      const found = results
        .filter((list): list is TouristType[] => Array.isArray(list))
        .flat()
        .map(transformApiTourist);

      if (found.length) {
        setTourists((prev) => mergeTourists(prev, found));
      }
    },
    [tourists, transformApiTourist],
  );

  const findTouristByDocument = useCallback(
    async (
      document: string,
      documentType: "ci" | "passport",
    ): Promise<TouristType | null> => {
      const value = document.trim();
      if (!value) return null;

      const local = tourists.find((tourist) =>
        documentType === "ci"
          ? tourist.ci === value
          : tourist.passportNumber === value,
      );
      if (local) return local;

      const page = await getTouristsFeedRequest({ search: value, limit: 10 });
      if (!page) return null;

      const found = page.items
        .map(transformApiTourist)
        .find((tourist) =>
          documentType === "ci"
            ? tourist.ci === value
            : tourist.passportNumber === value,
        );

      if (found) setTourists((prev) => mergeTourists(prev, [found]));
      return found ?? null;
    },
    [tourists, transformApiTourist],
  );

  const getTouristInfoById = useCallback(
    (id: string): TouristType | null => {
      if (!id) return null;
      return tourists.find((t) => t.id === id) ?? null;
    },
    [tourists],
  );

  const getTouristInfoByIds = useCallback(
    (ids: string[]): TouristType[] => {
      if (!ids?.length) return [];
      return tourists.filter((t) => ids.includes(t.id!));
    },
    [tourists],
  );

  /**
   * Se usa cuando el backend devuelve turistas al crear una booking.
   */
  const addTouristFromBooking = useCallback(
    (tourist: TouristType): TouristType => {
      const touristData = transformApiTourist(tourist);

      const alreadyKnown = tourists.some((t) => t.id === touristData.id);
      setTourists((prev) => mergeTourists(prev, [touristData]));
      if (!alreadyKnown) setTotalCount((prev) => prev + 1);

      return touristData;
    },
    [tourists, transformApiTourist],
  );

  /**
   * Actualiza turista en backend.
   */
  const updateOnlyTourist = useCallback(
    async (touristValues: TouristType): Promise<TouristType | null> => {
      const payload = transformApiTourist(touristValues);

      try {
        const updated = await updateTouristRequest(payload);
        if (!updated) {
          setError("No se pudo actualizar el turista");
          return null;
        }

        setTourists((prev) =>
          prev.map((t) => (t.id === payload.id ? updated : t)),
        );

        setError(null);
        return updated;
      } catch (err) {
        console.error("Error updating tourist:", err);
        setError("Error al actualizar turista");
        return null;
      }
    },
    [transformApiTourist],
  );

  return (
    <TouristContext.Provider
      value={{
        tourists,
        totalCount,
        loading,
        loadingMore,
        hasMore,
        error,
        fetchTourists,
        loadMoreTourists,
        ensureTouristsByIds,
        findTouristByDocument,
        getTouristInfoById,
        getTouristInfoByIds,
        addTouristFromBooking,
        updateOnlyTourist,
      }}
    >
      {children}
    </TouristContext.Provider>
  );
};
