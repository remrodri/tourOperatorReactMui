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
  fetchTourists: () => Promise<void>;
  // getTouristById: (id: string) => TouristType | null;
  getTouristInfoByIds: (id: string[]) => TouristType[];
  addTouristFromBooking: (tourist: any) => TouristType;
  updateTourist: (tourist: TouristType) => void;
  handleTouristBookingIds:(tourist:TouristType,bookingId:string)=>void
  getTouristInfoById:(id:string)=>TouristType|null
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

  const getTouristInfoById=(id:string):TouristType|null=>{
    // console.log('id::: ', id);
    const touristFound = tourists.find((tourist) => tourist.id === id);
    if (!touristFound) {
      
      return null;
    }
    return touristFound;
  }

  const handleTouristBookingIds=(tourist:TouristType,bookingId:string)=>{
    // console.log('tourist::: ', tourist);
    // console.log('bookingId::: ', bookingId);
  //   if (!tourist.bookingIds) {
  //     tourist.bookingIds=[];
  //   }
  //   const updatedTourist={...tourist,bookingIds:[...tourist.bookingIds!,bookingId]}
  //   updateTourist(updatedTourist);
  //   return updatedTourist
  }

  const updateTourist = (tourist: TouristType) => {
    if (!tourists.find((prevTourist) => prevTourist.id === tourist.id)) {
      setTourists((prevTourists) => [...prevTourists, tourist]);
      // showSnackbar("Turista actualizado exitosamente", "success");
    }else{
      setTourists((prevTourists) =>
        prevTourists
      .map((prevTourist) =>
          {return prevTourist.id === tourist?.id 
            ? {...prevTourist, 
              tourPackageId:tourist.id,
              bookingIds:tourist.bookingIds,
              documentType:tourist.documentType,
              firstName:tourist.firstName,
              lastName:tourist.lastName,
              phone:tourist.phone,
              ci:tourist.ci,
              nationality:tourist.nationality,
              dateOfBirth:tourist.dateOfBirth,
              passportNumber:tourist.passportNumber} 
            : prevTourist})
      .filter((tourist) => tourist !== null)
      );
    }
    showSnackbar("Turista actualizado exitosamente", "success");
  };

  const addTouristFromBooking = (tourist: any) => {
    if (!tourists.find((prevTourist) => prevTourist.id === tourist.id)) {
      const touristData = transformApiTourist(tourist);
      setTourists((prevTourists) => [...prevTourists, touristData]);
      return touristData;
    }
    const touristData = transformApiTourist(tourist);
      setTourists((prevTourists)=>
      prevTourists
    .map((prevTourist) =>
        {return prevTourist.id === tourist?.id 
          ? {...prevTourist, 
            id:tourist.id,
            bookingIds:tourist.bookingIds,
            documentType:tourist.documentType,
            firstName:tourist.firstName,
            lastName:tourist.lastName,
            phone:tourist.phone,
            ci:tourist.ci,
            nationality:tourist.nationality,
            dateOfBirth:tourist.dateOfBirth,
            passportNumber:tourist.passportNumber} 
          : prevTourist})
    .filter((tourist) => tourist !== null)
    );
    return touristData;
  };

  const getTouristInfoByIds = (ids: string[]): TouristType[] => {
    return ids && ids.length > 0 ? tourists.filter((tourist) => ids.includes(tourist.id!)) : [];
  };

  // const getTouristById = (id: string): TouristType | null => {
  //   const touristFound = tourists.find((tourist) => tourist.id === id);
  //   if (!touristFound) {
  //     showSnackbar("No se encontro al turista", "error");
  //     return null;
  //   }
  //   // setTouristFound(touristFound || null);
  //   return touristFound;
  // };

  const fetchTourists = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await getAllTouristsRequest();
      const touristData = response.data ? response.data : response;
      // console.log('touristData::: ', touristData);
      const transformedTourists = touristData.map(transformApiTourist);
      // console.log('transformedTourists::: ', transformedTourists);
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
      bookingIds: touristData.bookingIds,
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
        // getTouristById,
        touristFound,
        getTouristInfoByIds,
        fetchTourists,
        addTouristFromBooking,
        updateTourist,
        handleTouristBookingIds,
        getTouristInfoById
      }}
    >
      {children}
    </TouristContext.Provider>
  );
};
