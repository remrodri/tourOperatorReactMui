import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";
import { useTourPackageContext } from "../../tourPackage/context/TourPackageContext";
import { User } from "../../user/types/User";
import { useUserContext } from "../../user/context/UserContext";
import { jwtDecode } from "jwt-decode";
import { TouristType } from "../../booking/types/TouristType";
import { BookingType } from "../../booking/types/BookingType";
// import { useTouristContext } from "../../tourist/context/TouristContext";
import { useBookingContext } from "../../booking/context/BookingContext";
// import { getAttendanceListFromLocalStorage } from "../localStorageService/localStorageService";
import { useNewSnackbar } from "../../../context/SnackbarContext";

export interface CustomDateRangeType extends DateRangeType {
  tpName: string;
}

interface GuideContextType {
  guideDateRanges: CustomDateRangeType[];
  loading: boolean;
  guideInfo: User | null;
  attendanceList: Group[];
  toggleTouristAttendanceStatus: (touristId: string) => void;
  saveAttendance: () => void;
  // loadAttendanceList: () => void;
  currentDateRange: string;
  currentTourPackage: string;
  dateRangeBookings: BookingType[];
  setCurrentDateRange: (dateRangeId: string) => void;
  setCurrentTourPackage: (tourPackageId: string) => void;
}

interface GuideProviderProps {
  children: ReactNode;
}

export interface TouristWithStatus {
  tourist: TouristType;
  status: "present" | "absent";
}

export interface Group {
  group: TouristWithStatus[];
  bookingId: string;
}

const GuideContext = createContext<GuideContextType | null>(null);

export const useGuideContext = () => {
  const context = useContext(GuideContext);
  if (!context) {
    throw new Error("useGuideContext must be used within a GuideProvider");
  }
  return context;
};

export const GuideProvider = ({ children }: GuideProviderProps) => {
  const { tourPackages } = useTourPackageContext();
  const [guideDateRanges, setGuideDateRanges] = useState<CustomDateRangeType[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [guideInfo, setGuideInfo] = useState<User | null>(null);
  const { getUserById } = useUserContext();
  const [attendanceList, setAttendanceList] = useState<Group[]>([]);
  // const { getTouristInfoById } = useTouristContext();
  const { bookings, getBookingsByDateRangeId, updateAttendance } =
    useBookingContext();
  const [dateRangeBookings, setDateRangeBookings] = useState<BookingType[]>([]);
  const [currentDateRange, setCurrentDateRange] = useState<string>("");
  const [currentTourPackage, setCurrentTourPackage] = useState<string>("");

  const { showSnackbar } = useNewSnackbar();

  const saveAttendance = async () => {
    setLoading(true);
    try {
      // const attendance = getAttendanceListFromLocalStorage();
      const bookingsPayload = attendanceList.map((subList: Group) => {
        const bookingId = subList.bookingId;
        const attendance = subList.group.map((tourist: TouristWithStatus) => ({
          touristId: tourist.tourist.id,
          status: tourist.status,
        }));
        return { bookingId, attendance };
      });
      await updateAttendance(bookingsPayload);
      showSnackbar("Asistencia guardada exitosamente", "success");
    } catch (error) {
      console.error("Error al guardar la asistencia:", error);
      showSnackbar("Error al guardar la asistencia", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleTouristAttendanceStatus = (touristId: string) => {
    const updated = attendanceList.map(({ group, bookingId }) => {
      const newGroup = group.map((t: TouristWithStatus) => {
        if (t.tourist.id === touristId) {
          return {
            ...t,
            status: t.status === "present" ? "absent" : "present",
          };
        }
        return t;
      });
      return { group: newGroup, bookingId };
    });
    setAttendanceList(updated as Group[]);
  };

  const getDateRangeBookings = (
    dateRangeId: string,
    bookings: BookingType[],
    currentTourPackage: string
  ) => {
    // console.log("📅 Obteniendo bookings para dateRange:", dateRangeId);
    // console.log("📊 Total bookings disponibles:", bookings.length);

    const result = getBookingsByDateRangeId(
      dateRangeId,
      bookings,
      currentTourPackage
    );

    // console.log("✅ DateRange bookings encontrados:", result.length);
    setDateRangeBookings(result);
  };

  const getGuideDateRanges = () => {
    if (!guideInfo?.id) {
      // console.log("⏳ Esperando información del guía...");
      return;
    }

    setLoading(true);
    // console.log("🗓️ Obteniendo dateRanges para guía:", guideInfo.id);

    const dateRanges = tourPackages.flatMap((tourPackage) => {
      return tourPackage.dateRanges.filter((dr) => dr.state === "pending");
    });

    const filteredDateRanges = dateRanges
      .filter((dr) => dr.guides?.includes(guideInfo.id))
      .map((dr) => ({
        ...dr,
        tpName:
          tourPackages.find((tp) => tp.id === dr.tourPackageId)?.name || "",
      }));

    // console.log("✅ DateRanges del guía:", filteredDateRanges.length);
    setGuideDateRanges(filteredDateRanges);
    setLoading(false);
  };

  const getGuideInfo = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      // console.log("🔑 No hay token disponible");
      setLoading(false);
      return;
    }

    try {
      const user: User = jwtDecode(token);
      const guideInfo = getUserById(user.id);

      if (!guideInfo) {
        // console.log("❌ Información del guía no encontrada");
        setLoading(false);
        return;
      }

      // console.log("✅ Información del guía obtenida:", guideInfo.name);
      setGuideInfo(guideInfo);
      setLoading(false);
    } catch (error) {
      console.error("Error obteniendo info del guía:", error);
      // console.error("❌ Error obteniendo info del guía:", error);
      setLoading(false);
    }
  };

  // 🔹 Inicialización: Obtener info del guía
  useEffect(() => {
    // console.log("🚀 Inicializando GuideProvider...")
    getGuideInfo();
  }, [getUserById]);

  // 🔹 Cuando tenemos guía y tourPackages, obtener dateRanges
  useEffect(() => {
    // console.log('::: ', );
    if (guideInfo && tourPackages.length > 0) {
      getGuideDateRanges();
    }
  }, [guideInfo, tourPackages]);

  // 🔹 Cuando cambian los bookings, obtener los del dateRange actual
  useEffect(() => {
    // console.log('::: ', );
    if (currentDateRange === "" || currentTourPackage === "") {
      setCurrentDateRange(localStorage.getItem("currentDateRange") ?? "");
      setCurrentTourPackage(localStorage.getItem("currentTourPackage") ?? "");
    }

    getDateRangeBookings(currentDateRange!, bookings, currentTourPackage!);
  }, [bookings, currentDateRange, currentTourPackage]);

  return (
    <GuideContext.Provider
      value={{
        guideDateRanges,
        loading,
        guideInfo,
        attendanceList,
        toggleTouristAttendanceStatus,
        saveAttendance,
        // loadAttendanceList,
        currentDateRange,
        currentTourPackage,
        dateRangeBookings,
        setCurrentDateRange,
        setCurrentTourPackage,
      }}
    >
      {children}
    </GuideContext.Provider>
  );
};
