import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { TouristDestinationType } from "../types/TouristDestinationType";
import {
  createTouristDestinationRequest,
  deleteTouristDestinationRequest,
  getAllTouristDestinationRequest,
  updateTouristDestinationRequest,
} from "../service/touristDestinationService";

interface TouristDestinationContextType {
  touristDestinations: TouristDestinationType[];
  createTouristDestination: (data: CreateOrUpdatePayload) => Promise<void>;
  updateTouristDestination: (data: CreateOrUpdatePayload) => Promise<void>;
  deleteTouristDestination: (id: string) => Promise<void>;
  getTouristDestinationById: (id: string) => string;
  getTouristDestinationInfoById: (id: string) => TouristDestinationType | null;
}

type CreateOrUpdatePayload = {
  id?: string;
  name: string;
  description: string;
  newImages: File[];
  existingImages: string[];
};

const TouristDestinationContext = createContext<
  TouristDestinationContextType | undefined
>(undefined);

export const TouristDestinationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [touristDestinations, setTouristDestinations] = useState<
    TouristDestinationType[]
  >([]);

  /* ===================== GETTERS ===================== */

  const getTouristDestinationInfoById = (
    id: string,
  ): TouristDestinationType | null => {
    if (!id) return null;
    return touristDestinations.find((td) => td.id === id) ?? null;
  };

  const getTouristDestinationById = (id: string): string => {
    const td = touristDestinations.find((td) => td.id === id);
    return td ? td.name : "Destino turístico no encontrado";
  };

  /* ===================== ACTIONS ===================== */

  const fetchTouristDestinations = async () => {
    const destinations = await getAllTouristDestinationRequest();
    if (!destinations) return;
    setTouristDestinations(destinations);
  };

  const createTouristDestination = async (values: CreateOrUpdatePayload) => {
    const created = await createTouristDestinationRequest(values);
    if (!created) return;

    setTouristDestinations((prev) => [...prev, created]);
  };

  const updateTouristDestination = async (values: CreateOrUpdatePayload) => {
    if (!values.id) return;

    const updated = await updateTouristDestinationRequest({
      ...values,
      id: values.id,
    });

    if (!updated) return;

    setTouristDestinations((prev) =>
      prev.map((dest) => (dest.id === updated.id ? updated : dest)),
    );
  };

  const deleteTouristDestination = async (id: string) => {
    const success = await deleteTouristDestinationRequest(id);
    if (!success) return;

    setTouristDestinations((prev) => prev.filter((dest) => dest.id !== id));
  };

  /* ===================== EFFECT ===================== */

  useEffect(() => {
    fetchTouristDestinations();
  }, []);

  return (
    <TouristDestinationContext.Provider
      value={{
        touristDestinations,
        createTouristDestination,
        updateTouristDestination,
        deleteTouristDestination,
        getTouristDestinationById,
        getTouristDestinationInfoById,
      }}
    >
      {children}
    </TouristDestinationContext.Provider>
  );
};

export const useTouristDestinationContext = () => {
  const context = useContext(TouristDestinationContext);
  if (!context) {
    throw new Error(
      "useTouristDestinationContext must be used within a TouristDestinationProvider",
    );
  }
  return context;
};
