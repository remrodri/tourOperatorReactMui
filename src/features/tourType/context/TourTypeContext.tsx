/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  createTourType,
  getAllTourTypes,
  updateTourTypeRequest,
} from "../service/tourTypeService";

import type { TourType } from "../../userManagement/types/TourType";

interface UpdateTourTypeValues {
  id: string;
  name: string;
  description: string;
}

interface TourTypeContextType {
  tourTypes: TourType[];
  loading: boolean;

  openDialog: boolean;
  toggleDialog: () => void;

  fetchTourTypes: () => Promise<void>;
  registerTourType: (tourTypeData: TourType) => Promise<TourType | null>;
  updateTourType: (
    values: UpdateTourTypeValues,
    id: string,
  ) => Promise<TourType | null>;

  getTourTypeNameById: (id: string) => string;
  getTourTypeInfoById: (id: string) => TourType | null;
}

const TourTypeContext = createContext<TourTypeContextType | undefined>(
  undefined,
);

export const useTourTypeContext = () => {
  const context = useContext(TourTypeContext);
  if (context === undefined) {
    throw new Error(
      "useTourTypeContext debe ser usado dentro de TourTypeProvider",
    );
  }
  return context;
};

export const TourTypeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tourTypes, setTourTypes] = useState<TourType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // helper id por si algún día viene _id
  const getId = (t: any) => t?.id ?? t?._id;

  const toggleDialog = useCallback(() => {
    setOpenDialog((prev) => !prev);
  }, []);

  const fetchTourTypes = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const list = await getAllTourTypes();

      // ❌ si es null, el service ya mostró sileo.error
      if (!list) {
        setTourTypes([]);
        return;
      }

      setTourTypes(list);
    } catch (err) {
      console.error("Error fetching tour types:", err);
      setTourTypes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTourTypes();
  }, [fetchTourTypes]);

  const getTourTypeInfoById = useCallback(
    (id: string): TourType | null => {
      if (!id) return null;
      return tourTypes.find((tt) => getId(tt) === id) ?? null;
    },
    [tourTypes],
  );

  const getTourTypeNameById = useCallback(
    (id: string): string => {
      const tt = tourTypes.find((t) => getId(t) === id);
      return tt?.name ?? "tipo de tour no encontrado";
    },
    [tourTypes],
  );

  const registerTourType = useCallback(
    async (tourTypeData: TourType): Promise<TourType | null> => {
      try {
        const created = await createTourType(tourTypeData);

        // ❌ si es null, el service ya mostró sileo.error
        if (!created) return null;

        setTourTypes((prev) => [...prev, created]);
        return created;
      } catch (err) {
        console.error("Error creating tour type:", err);
        return null;
      }
    },
    [],
  );

  const updateTourType = useCallback(
    async (
      values: UpdateTourTypeValues,
      id: string,
    ): Promise<TourType | null> => {
      try {
        const updated = await updateTourTypeRequest(values, id);

        // ❌ si es null, el service ya mostró sileo.error
        if (!updated) return null;

        setTourTypes((prev) =>
          prev.map((tt) => (getId(tt) === id ? updated : tt)),
        );

        return updated;
      } catch (err) {
        console.error("Error updating tour type:", err);
        return null;
      }
    },
    [],
  );

  return (
    <TourTypeContext.Provider
      value={{
        tourTypes,
        loading,
        openDialog,
        toggleDialog,
        fetchTourTypes,
        registerTourType,
        updateTourType,
        getTourTypeNameById,
        getTourTypeInfoById,
      }}
    >
      {children}
    </TourTypeContext.Provider>
  );
};
