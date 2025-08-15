import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";
import { useNewSnackbar } from "../../../context/SnackbarContext";
import {
  getAllDateRangesRequest,
  updateDateRangeRequest,
} from "../service/DateRangeService";

type DateRangeContextType = {
  dateRanges: DateRangeType[];
  getDateRangeById(id: string): DateRangeType | null;
  fillDateRangesByIds(DateRangeIds: DateRangeType[]): DateRangeType[];
  findDateRangesByTourPackage(ids: DateRangeType[]): void;
  dateRangesByTP: DateRangeType[];
  getDateRangeInfoById(id: string): DateRangeType | null;
  addDateRange(dateRange: DateRangeType): void;
  filterDateRangesByTourGuideId(id: string): DateRangeType[];
  updateDateRangeStatus(id: string, status: string): void;
};

const DateRangeContext = createContext<DateRangeContextType | null>(null);

type DateRangeProviderProps = {
  children: ReactNode;
};

export const DateRangeProvider: React.FC<DateRangeProviderProps> = ({
  children,
}) => {
  const [dateRanges, setDateRanges] = useState<DateRangeType[]>([]);
  const { showSnackbar } = useNewSnackbar();
  const [dateRangesByTP, setDateRangesByTP] = useState<DateRangeType[]>([]);

  const updateDateRangeStatus = (id: string, status: string): void => {
    try {
      const response:any = updateDateRangeRequest(id, { status });
      if (!response.data) {
        showSnackbar("Fallo al actualizar", "error");
        // throw new Error("Failed to update date range status");
        return;
      }
      setDateRanges((prev) =>
        prev.map((dr) => (dr.id === id ? { ...dr, status } : dr))
      );
      // setError(null);
      showSnackbar("Actualizado exitosamente!", "success");
    } catch (error) {
      console.error("Error updating date range status:", error);
      // setError("Failed to update date range status");
      showSnackbar("Fallo al actualizar", "error");
    }
    // setDateRanges((prev) =>
    //   prev.map((dr) => (dr.id === id ? { ...dr, status } : dr))
    // );
  };

  const filterDateRangesByTourGuideId = (id: string): DateRangeType[] => {
    return dateRanges.filter((dr) => dr.guides?.includes(id));
  };

  const addDateRange = (dateRange: DateRangeType): void => {
    setDateRanges((prev) => [...prev, dateRange]);
  };

  const getDateRangeInfoById = (id: string): DateRangeType | null => {
    const dateRangeFound = dateRanges.find((dr) => dr.id === id);
    return dateRangeFound || null;
  };

  const findDateRangesByTourPackage = (
    dateRangesIds: DateRangeType[]
  ): void => {
    if (dateRangesIds && dateRangesIds.length > 0) {
      const drFound = dateRangesIds
        .map((drId) => dateRanges.find((dr) => dr.id === drId.id))
        .filter((dr): dr is DateRangeType => dr !== undefined);
      setDateRangesByTP(drFound);
    }
  };

  const fillDateRangesByIds = (
    dateRangeIds: DateRangeType[]
  ): DateRangeType[] => {
    return dateRangeIds
      .map((drId) => dateRanges.find((dr) => dr.id === drId.id))
      .filter((dr): dr is DateRangeType => dr !== undefined);
  };

  const getDateRanges = async (): Promise<void> => {
    const response = await getAllDateRangesRequest();
    setDateRanges(response.data);
  };

  const getDateRangeById = (id: string): DateRangeType | null => {
    if (!id) {
      console.warn("dateRange called without id");
      return null;
    }
    const dateRangeFound = dateRanges.find((dr) => dr.id === id);

    return dateRangeFound || null;
  };

  useEffect(() => {
    getDateRanges();
  }, []);

  return (
    <DateRangeContext.Provider
      value={{
        dateRanges,
        getDateRangeById,
        fillDateRangesByIds,
        findDateRangesByTourPackage,
        dateRangesByTP,
        getDateRangeInfoById,
        addDateRange,
        filterDateRangesByTourGuideId,
        updateDateRangeStatus,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
};

export const useDateRangeContext = (): DateRangeContextType => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error(
      "useDateRangeContext must be used within a DateRangeProvider"
    );
  }
  return context;
};
