import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { createTourType, getAllTourTypes } from "../services/tourTypeService";

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
      if (response) {
        setTourTypes([...tourTypes, response.data]);
        setOpenDialog(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTourTypes = async () => {
    try {
      const tourTypeList = await getAllTourTypes();
      setTourTypes(tourTypeList.data);
    } catch (error) {
      console.log("Error al obtener los tipos de tour::: ", error);
    }
  };

  useEffect(() => {
    fetchTourTypes();
  }, []);

  return (
    <TourTypeContext.Provider
      value={{ tourTypes, openDialog, handleClick, registerTourType }}
    >
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
