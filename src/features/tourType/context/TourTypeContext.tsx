import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createTourType,
  getAllTourTypes,
  updateTourTypeRequest,
} from "../service/tourTypeService";
import { TourType } from "../../userManagement/types/TourType";
import { useNewSnackbar } from "../../../context/SnackbarContext";

interface TourTypeContextType {
  tourTypes: TourType[];
  openDialog: boolean;
  handleClick: () => void;
  registerTourType: (tourTypeData: any) => void;
  updateTourType: (values: UpdateTourTypeValues, id: string) => void;
  getTourTypeNameById: (id: string) => string;
  getTourTypeInfoById: (id: string) => TourType | null;
  // handleUpdate: (data: UpdateTourTypeValues) => void;
}

interface UpdateTourTypeValues {
  id: string;
  name: string;
  description: string;
}

// interface DeleteTourTypeValues {
//   id: string;
// }

const TourTypeContext = createContext<TourTypeContextType | undefined>(
  undefined,
);

export const TourTypeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tourTypes, setTourTypes] = useState<TourType[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { showSnackbar } = useNewSnackbar();

  const getTourTypeInfoById = (id: string): TourType | null => {
    if (!id) {
      console.warn("tourType called without id");
      return null;
    }
 
    const ttFound = (tourTypes as TourType[]).find(
      (tt: TourType) => tt.id === id,
    );
    if (!ttFound) {
      console.warn("tourType not found");
      return null;
    }
    return ttFound;
  };

  const getTourTypeNameById = (id: string) => {
    const tt = tourTypes.find((tt: TourType) => tt.id === id);
    if (!tt) {
      return "tipo de tour no encontrado";
    }
    return tt.name;
  };


  const handleClick = () => {
    console.log("click::: ");
    setOpenDialog(!openDialog);
  };

  // const handleUpdate = (data: UpdateTourTypeValues) => {
  //   console.log("data::: ", data);
  //   setOpenDialog(!openDialog);
  // };

  const updateTourType = async (values: UpdateTourTypeValues, id: string) => {
    try {
      const response = await updateTourTypeRequest(values, id);
      if (!response) {
        showSnackbar("El tipo de tour no se actualizo", "error");
        return;
      }
      setTourTypes((prevTourTypes: TourType[]) =>
        prevTourTypes.map((tourType: TourType) =>
          tourType.id === id ? { ...tourType, ...response } : tourType,
        ),
      );
      showSnackbar("El tipo de tour se actualizo", "success");
    } catch (error) {
      console.log(error);
      showSnackbar("Error al actualizar", "error");
    }
  };
  // const deleteTourType = async (deleteTourType: DeleteTourTypeValues) => {
  //   try {
  //     const response = await deleteTourTypeRequest(deleteTourType.id);
  //     if (!response) {
  //       showSnackbar("Error al eliminar un tipo de tour", "error");
  //       return;
  //     }
  //     setTourTypes((prevTourTypes: TourType[]) =>
  //       prevTourTypes.filter(
  //         (tourType: TourType) => tourType.id !== response.id,
  //       ),
  //     );
  //     showSnackbar("Eliminado con exito", "success");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const registerTourType = async (tourTypeData: TourType) => {
    try {
      const response = await createTourType(tourTypeData);
      if (!response) {
        showSnackbar("Error al registrar tourType", "error");
        return;
      }
      setTourTypes([...tourTypes, response]);
      // setOpenDialog(false);
      // handleClick();
      showSnackbar("Registrado con exito", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTourTypes = async () => {
    try {
      const tourTypeList = await getAllTourTypes();
      setTourTypes(tourTypeList || []);
    } catch (error) {
      console.log("Error al obtener los tipos de tour::: ", error);
    }
  };

  useEffect(() => {
    // console.log("::: ");
    fetchTourTypes();
  }, []);

  return (
    <TourTypeContext.Provider
      value={{
        tourTypes,
        openDialog,
        handleClick,
        registerTourType,
        updateTourType,
        getTourTypeNameById,
        getTourTypeInfoById,
        // handleUpdate,
      }}
    >
      {children}
    </TourTypeContext.Provider>
  );
};
export const useTourTypeContext = () => {
  const context = useContext(TourTypeContext);
  if (context === undefined) {
    throw new Error(
      "useTourTypeContext must be used within a TourTypeProvider",
    );
  }
  return context;
};
