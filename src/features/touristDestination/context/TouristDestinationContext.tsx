import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { TouristDestinationType } from "../types/TouristDestinationType";
import { useNewSnackbar } from "../../../context/SnackbarContext";
import {
  createTouristDestinationRequest,
  deleteTouristDestinationRequest,
  getAllTouristDestinationRequest,
  updateTouristDestinationRequest,
} from "../service/touristDestinationService";

interface TouristDestinationContextType {
  touristDestinations: TouristDestinationType[];
  createTouristDestination: (data: {
    id?: string;
    name: string;
    description: string;
    newImages: File[];
    existingImages: string[];
  }) => void;
  updateTouristDestination: (values: {
    id?: string;
    name: string;
    description: string;
    newImages: File[];
    existingImages: string[];
  }) => void;
  // BASE_URL: string;
  deleteTouristDestination: (id: string) => void;
  getTouristDestinationById: (id: string) => string;
  getTouristDestinationInfoById: (id: string) => TouristDestinationType | null;
}

const TouristDestinationContext = createContext<
  TouristDestinationContextType | undefined
>(undefined);

export const TouristDestinationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [touristDestinations, setTouristDestinations] = useState<
    TouristDestinationType[]
  >([]);
  const { showSnackbar } = useNewSnackbar();
  // const BASE_URL = "http://localhost:3000";
  const getTouristDestinationInfoById = (
    id: string
  ): TouristDestinationType | null => {
    if (!id) {
      console.warn("touristDestination called without id");
      return null;
    }
    const td = touristDestinations.find((td) => td.id === id);
    if (!td) {
      console.warn("Tourist destination not found");
      return null;
    }
    return td;
  };

  const getTouristDestinationById = (id: string) => {
    const tdFound = touristDestinations.find((td) => td.id === id);
    if (!tdFound) {
      return "Destino turistico no encontrado";
    }
    return tdFound.name;
  };

  const deleteTouristDestination = async (id: string) => {
    try {
      const response = await deleteTouristDestinationRequest(id);
      if (!response?.data) {
        throw new Error("Respuesta invalida del servidor");
      }
      setTouristDestinations((prev) =>
        prev.filter((destination) => destination.id !== response.data.id)
      );
      showSnackbar("Eliminado con exito", "success");
    } catch (error) {
      console.error("Error al eliminar el destino turistico");
      showSnackbar("Error al eliminar", "error");
    }
  };

  const updateTouristDestination = async (values: {
    id?: string;
    name: string;
    description: string;
    newImages: File[];
    existingImages: string[];
  }) => {
    try {
      // console.log("values::: ", values);
      const response = await updateTouristDestinationRequest(values);
      if (!response?.data) {
        throw new Error("Respuesta invalida del servidor");
      }
      setTouristDestinations((prev) =>
        prev.map((dest) => (dest.id === values.id ? response.data : dest))
      );
      showSnackbar("Actualizado con exito", "success");
    } catch (error) {
      console.error("Error al actualizar el desitno turistico");
      showSnackbar("Error al actualizar", "error");
    }
  };

  const fetchTouristDestination = async () => {
    try {
      const response = await getAllTouristDestinationRequest();
      console.log("response::: ", response.data);
      if (!response?.data) {
        throw new Error("Respuesta invalida del servidor");
      }
      setTouristDestinations(response.data);
    } catch (error) {
      console.error("Error al obtener los destinos turisticos", error);
      showSnackbar("Error al obtener", "error");
    }
  };

  useEffect(() => {
    fetchTouristDestination();
  }, []);

  const createTouristDestination = async (values: {
    id?: string;
    name: string;
    description: string;
    newImages: File[];
    existingImages: string[];
  }) => {
    try {
      const response = await createTouristDestinationRequest(values);
      console.log("response::: ", response);
      if (!response?.data) {
        // if (!response || !response.data) {
        // showSnackbar("Error al registrar", "error");
        throw new Error("Respuesta invalida del servidor");
      }
      setTouristDestinations([...touristDestinations, response.data]);
      showSnackbar("creado con exito", "success");
    } catch (error) {
      console.error("Error al registrar destino turistico", error);
      showSnackbar("Error al registrar", "error");
    }
  };
  return (
    <TouristDestinationContext.Provider
      value={{
        touristDestinations,
        createTouristDestination,
        updateTouristDestination,
        deleteTouristDestination,
        getTouristDestinationById,
        getTouristDestinationInfoById,
        // BASE_URL,
      }}
    >
      {children}
    </TouristDestinationContext.Provider>
  );
};

export const useTouristDestinationContext = () => {
  const context = useContext(TouristDestinationContext);
  if (context === undefined) {
    throw new Error(
      "useTouristDestination must be used within a TouristDestinationProvider"
    );
  }
  return context;
};
