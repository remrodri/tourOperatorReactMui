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
  getAllTouristDestinationRequest,
} from "../touristDestinationForm/service/touristDestinationService";

interface TouristDestinationContextType {
  touristDestinations: TouristDestinationType[];
  createTouristDestination: (data: {
    id?: string;
    name: string;
    description: string;
    newImages: File[];
    existingImages: string[];
  }) => void;
  // BASE_URL: string;
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
