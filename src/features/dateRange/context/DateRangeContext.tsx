import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";
import { useNewSnackbar } from "../../../context/SnackbarContext";
import { getAllDateRangesRequest } from "../service/DateRangeService";

type DateRangeContextType = {
  dateRanges: DateRangeType[];
  getDateRangeById(id: string): DateRangeType | null;
  fillDateRangesByIds(DateRangeIds: DateRangeType[]): DateRangeType[];
  findDateRangesByTourPackage(ids: DateRangeType[]): void;
  dateRangesByTP: DateRangeType[];
  
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

  const findDateRangesByTourPackage = (dateRangesIds: DateRangeType[]): void => {
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
