import { createContext, ReactNode, useContext, useState } from "react";
import { createTourType } from "../services/tourTypeService";

interface TourTypeContextType {
  tourTypes: any[];
  openDialog: boolean;
  handleClick: () => void;
  registerTourType: (tourTypeData: any) => void;
}

const TourTypeContext = createContext<TourTypeContextType | undefined>(
  undefined
);

export const TourTypeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tourTypes, setTourTypes] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleClick = () => {
    console.log("click::: ");
    setOpenDialog(!openDialog);
  };

  const registerTourType = async (tourTypeData: any) => {
    try {
      const response = await createTourType(tourTypeData);
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <TourTypeContext.Provider value={{ tourTypes, openDialog, handleClick, registerTourType }}>
      {children}
    </TourTypeContext.Provider>
  );
};
export const useTourTypeContext = () => {
  const context = useContext(TourTypeContext);
  if (context === undefined) {
    throw new Error(
      "useTourTypeContext must be used within a TourTypeProvider"
    );
  }
  return context;
};
