import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { TourPackageType } from "../types/TourPackageType";
import * as TourPackageService from "../service/TourPackageService";
import { useNewSnackbar } from "../../../context/SnackbarContext";
import { useDateRangeContext } from "../../dateRange/context/DateRangeContext";
type TourPackageContextType = {
  tpFound: TourPackageType | null;
  findTourPackageById: (id: string) => Promise<void>;
  tourPackages: TourPackageType[];
  loading: boolean;
  error: string | null;
  getTourPackages: () => Promise<void>;
  createTourPackage: (
    tourPackage: Omit<TourPackageType, "id">
  ) => Promise<void>;
  updateTourPackage: (
    id: string,
    tourPackage: Partial<TourPackageType>
  ) => Promise<void>;
  deleteTourPackage: (id: string) => Promise<void>;
};

const TourPackageContext = createContext<TourPackageContextType | null>(null);

type TourPackageProviderProps = {
  children: ReactNode;
};

export const TourPackageProvider: React.FC<TourPackageProviderProps> = ({
  children,
}) => {
  const [tpFound, setTpFound] = useState<TourPackageType | null>(null);
  const [tourPackages, setTourPackages] = useState<TourPackageType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showSnackbar } = useNewSnackbar();

  const findTourPackageById = async (id: string): Promise<void> => {
    const tpFound = tourPackages.find((tp) => tp.id === id);
    if (tpFound) {
      // console.log('tpFound::: ', tpFound);
      setTpFound(tpFound);
    }
  };

  const getTourPackages = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await TourPackageService.getAllTourPackagesRequest();
      const tps = response.data.filter(
        (tp: TourPackageType) => tp.status !== "draft"
      );
      // console.log('response::: ', response.data);
      // setTourPackages(response.data);
      setTourPackages(tps);
      setError(null);
    } catch (err) {
      console.error("Error fetching tour packages:", err);
      setError("Failed to fetch tour packages");
      showSnackbar("Failed to fetch tour packages", "error");
    } finally {
      setLoading(false);
    }
  };

  const createTourPackage = async (
    tourPackage: Omit<TourPackageType, "id">
  ): Promise<void> => {
    // console.log("tourPackage::: ", tourPackage);
    // setLoading(true);
    try {
      const newTourPackage = await TourPackageService.createTourPackageRequest(
        tourPackage
      );
      // const dateRanges = newTourPackage.dateRanges.map((dr:string)=>getDateRangeById(dr))
      // console.log('dateRanges::: ', dateRanges);
      setTourPackages((prev) => [...prev, newTourPackage]);
      // setError(null);
      showSnackbar("Tour package created successfully!", "success");
    } catch (err) {
      console.error("Error creating tour package:", err);
      setError("Failed to create tour package");
      showSnackbar("Failed to create tour package", "error");
    } finally {
      // setLoading(false);
    }
  };

  const updateTourPackage = async (
    id: string,
    tourPackage: Partial<TourPackageType>
  ): Promise<void> => {
    setLoading(true);
    try {
      // Create a complete tour package object with the id for the service call
      // console.log('tourPackage::: ', tourPackage);
      const tourPackageWithId = { ...tourPackage, id };
      // console.log('tourPackageWithId::: ', tourPackageWithId);
      const updatedTourPackage = (
        await TourPackageService.updateTourPackageRequest(tourPackageWithId)
      ).data;
      setTourPackages((prev) =>
        prev.map((pkg) => (pkg.id === id ? updatedTourPackage : pkg))
      );
      setError(null);
      showSnackbar("Tour package updated successfully!", "success");
    } catch (err) {
      console.error("Error updating tour package:", err);
      setError("Failed to update tour package");
      showSnackbar("Failed to update tour package", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteTourPackage = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      await TourPackageService.deleteTourPackageRequest(id);
      setTourPackages((prev) => prev.filter((pkg) => pkg.id !== id));
      setError(null);
      showSnackbar("Tour package deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting tour package:", err);
      setError("Failed to delete tour package");
      showSnackbar("Failed to delete tour package", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTourPackages();
    console.log('tourPackages::: ', tourPackages);
  }, []);

  return (
    <TourPackageContext.Provider
      value={{
        tpFound,
        findTourPackageById,
        tourPackages,
        loading,
        error,
        getTourPackages,
        createTourPackage,
        updateTourPackage,
        deleteTourPackage,
      }}
    >
      {children}
    </TourPackageContext.Provider>
  );
};

export const useTourPackageContext = (): TourPackageContextType => {
  const context = useContext(TourPackageContext);
  if (!context) {
    throw new Error(
      "useTourPackageContext must be used within a TourPackageProvider"
    );
  }

  return context;
};
