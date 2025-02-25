import { createContext, ReactNode, useContext, useState } from "react";
import { TouristDestinationType } from "../types/TouristDestinationType";
import { useNewSnackbar } from "../../../context/SnackbarContext";
import { createTouristDestinationRequest } from "../touristDestinationForm/service/touristDestinationService";

interface TouristDestinationContextType {
  touristDestinations: TouristDestinationType[];
  createTouristDestination: (data: {
    id?: string;
    name: string;
    description: string;
    newImages: File[];
    existingImages: string[];
  }) => void;
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
    } catch (error) {
      showSnackbar("Error al registrar", "error");
    }
  };
  return (
    <TouristDestinationContext.Provider
      value={{
        touristDestinations,
        createTouristDestination,
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
