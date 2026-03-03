/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import type { TouristType } from "../../booking/types/TouristType";
import {
  getAllTouristsRequest,
  updateTouristRequest,
} from "../service/touristService";

type TouristContextType = {
  tourists: TouristType[];
  loading: boolean;
  error: string | null;

  fetchTourists: () => Promise<void>;

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

export const TouristProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tourists, setTourists] = useState<TouristType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ helper por si viene _id
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

  const fetchTourists = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const list = await getAllTouristsRequest();

      if (!list) {
        setTourists([]);
        setError("No se pudieron cargar los turistas");
        return;
      }

      setTourists(list.map(transformApiTourist));
      setError(null);
    } catch (err) {
      console.error("Error fetching tourists:", err);
      setError("Error al cargar turistas");
    } finally {
      setLoading(false);
    }
  }, [transformApiTourist]);

  useEffect(() => {
    fetchTourists();
  }, [fetchTourists]);

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
   * ✅ Se usa cuando el backend devuelve turistas al crear una booking
   * - agrega si no existe
   * - actualiza si ya existe
   */
  const addTouristFromBooking = useCallback(
    (tourist: TouristType): TouristType => {
      const touristData = transformApiTourist(tourist);

      setTourists((prev) => {
        const exists = prev.find((t) => t.id === touristData.id);
        if (!exists) return [...prev, touristData];

        return prev.map((t) => (t.id === touristData.id ? touristData : t));
      });

      return touristData;
    },
    [transformApiTourist],
  );

  /**
   * ✅ Actualiza turista en backend
   * El service ya maneja sileo
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
        loading,
        error,
        fetchTourists,
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
