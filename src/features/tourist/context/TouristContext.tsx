import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { TouristType } from "../../booking/types/TouristType";
import { useNewSnackbar } from "../../../context/SnackbarContext";
import { getAllTouristsRequest } from "../service/touristService";

type TouristContextType = {
  tourists: TouristType[];
  loading: boolean;
  error: string | null;
  touristFound: TouristType | null;
  // fetchTourists: () => Promise<void>;
  getTouristById: (id: string) => Promise<TouristType | null>;
  getTouristInfoByIds: (id: string[]) => TouristType[];
};

const TouristContext = createContext<TouristContextType | null>(null);

export const useTouristContext = () => {
  const context = useContext(TouristContext);
  if (!context) {
    throw new Error("useTouristContext must be used within a touristProvider");
  }
  return context;
};

type TouristProviderProps = {
  children: ReactNode;
};

export const TouristProvider: React.FC<TouristProviderProps> = ({
  children,
}) => {
  const [tourists, setTourists] = useState<TouristType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showSnackbar } = useNewSnackbar();
  const [touristFound, setTouristFound] = useState<TouristType | null>(null);

  const getTouristInfoByIds = (ids: string[]): TouristType[] => {
    return ids
      .map((id) => tourists.find((tourist) => tourist.id === id))
      .filter((tourist) => tourist !== undefined);
  };
  
  const getTouristById = async (id: string): Promise<TouristType | null> => {
    const touristFound = tourists.find((tourist) => tourist.id === id);
    if (!touristFound) {
      showSnackbar("No se encontro al turista", "error");
      return null;
    }
    // setTouristFound(touristFound || null);
    return touristFound;
  };

  const fetchTourists = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await getAllTouristsRequest();
      const touristData = response.data ? response.data : response;
      const transformedTourists = touristData.map(transformApiTourist);
      setTourists(transformedTourists);
      setError(null);
    } catch (error) {
      console.error("Error fetching tourists", error);
      setError("Failed to fetch tourists");
      showSnackbar("Error al cargar turistas", "error");
    } finally {
      setLoading(false);
    }
  };
  const transformApiTourist = (touristData: any): TouristType => {
    return {
      id: touristData.id,
      firstName: touristData.firstName,
      lastName: touristData.lastName,
      email: touristData.email,
      phone: touristData.phone,
      ci: touristData.ci,
      nationality: touristData.nationality,
      dateOfBirth: touristData.dateOfBirth,
      passportNumber: touristData.passportNumber,
      documentType: touristData.documentType,
    };
  };
  useEffect(() => {
    fetchTourists();
  }, []);

  return (
    <TouristContext.Provider
      value={{
        tourists,
        loading,
        error,
        getTouristById,
        touristFound,
        getTouristInfoByIds,
      }}
    >
      {children}
    </TouristContext.Provider>
  );
};
