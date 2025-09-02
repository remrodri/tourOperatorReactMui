import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";
import { useTourPackageContext } from "../../tourPackage/context/TourPackageContext";
import { User } from "../../userManagement/types/User";
import { useUserContext } from "../../userManagement/context/UserContext";
import { jwtDecode } from "jwt-decode";
import { TouristType } from "../../booking/types/TouristType";
import { BookingType } from "../../booking/types/BookingType";
import { useTouristContext } from "../../tourist/context/TouristContext";
import { useBookingContext } from "../../booking/context/BookingContext";
import { getAttendanceListFromLocalStorage } from "../localStorageService/localStorageService";

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
  loadAttendanceList: () => void;
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

export const useGuideContext2 = () => {
  const context = useContext(GuideContext);
  if (!context) {
    throw new Error("useGuideContext must be used within a GuideProvider");
  }
  return context;
};

export const GuideProvider2 = ({ children }: GuideProviderProps) => {
  const { tourPackages } = useTourPackageContext();
  const [guideDateRanges, setGuideDateRanges] = useState<CustomDateRangeType[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [guideInfo, setGuideInfo] = useState<User | null>(null);
  const { getUserById } = useUserContext();
  const [attendanceList, setAttendanceList] = useState<Group[]>([]);
  const { getTouristInfoById } = useTouristContext();
  const { bookings, getBookingsByDateRangeId, updateAttendance } =
    useBookingContext();
  const [dateRangeBookings, setDateRangeBookings] = useState<BookingType[]>([]);

  const saveAttendance = async () => {
    setLoading(true);
    try {
      const attendance = getAttendanceListFromLocalStorage();
      const bookingsPayload = attendance.map((subList: Group) => {
        const bookingId = subList.bookingId;
        const attendance = subList.group.map((tourist: TouristWithStatus) => ({
          touristId: tourist.tourist.id,
          status: tourist.status,
        }));
        return { bookingId, attendance };
      });
      await updateAttendance(bookingsPayload);
      console.log("✅ Attendance guardada exitosamente");
    } catch (error) {
      console.error("❌ Error guardando attendance:", error);
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
    localStorage.setItem("attendanceList", JSON.stringify(updated));
    console.log("🔄 Attendance actualizada para turista:", touristId);
  };

  const loadAttendanceList = () => {
    console.log("🔄 Iniciando carga de attendance list...");

    // Verificar si hay dateRange y tourPackage seleccionados
    const currentDateRange = localStorage.getItem("currentDateRange");
    const currentTourPackage = localStorage.getItem("currentTourPackage");

    if (!currentDateRange || !currentTourPackage) {
      console.log(
        "❌ No hay dateRange/tourPackage seleccionado, limpiando attendance"
      );
      setAttendanceList([]);
      localStorage.removeItem("attendanceList");
      return;
    }

    console.log("✅ DateRange/TourPackage seleccionados:", {
      currentDateRange,
      currentTourPackage,
    });
    console.log("📊 dateRangeBookings disponibles:", dateRangeBookings.length);

    // 1. Intentar cargar desde localStorage
    const stored = localStorage.getItem("attendanceList");
    if (stored) {
      try {
        const parsedStored = JSON.parse(stored);
        console.log(
          "📦 Cargando desde localStorage:",
          parsedStored.length,
          "grupos"
        );
        setAttendanceList(parsedStored);
        return;
      } catch (error) {
        console.error("❌ Error parsing localStorage attendanceList:", error);
        localStorage.removeItem("attendanceList");
      }
    }

    // 2. Si no hay en localStorage, crear desde bookings
    if (dateRangeBookings.length === 0) {
      console.log(
        "⏳ No hay dateRangeBookings disponibles para el dateRange seleccionado"
      );
      setAttendanceList([]);
      return;
    }

    console.log(
      "🏗️ Creando attendance desde dateRangeBookings:",
      dateRangeBookings.length
    );

    const attendance = dateRangeBookings.map((booking) => {
      console.log(
        "📝 Procesando booking:",
        booking.id,
        "con",
        booking.attendance.length,
        "turistas"
      );

      const group = booking.attendance
        .map((att) => {
          const tourist = getTouristInfoById(att.touristId);
          if (!tourist) {
            console.warn("⚠️ Turista no encontrado:", att.touristId);
            return null;
          }
          return {
            tourist,
            status: att.status === "present" ? "present" : "absent",
          } as TouristWithStatus;
        })
        .filter((item): item is TouristWithStatus => item !== null);

      return { group, bookingId: booking.id };
    });

    console.log("✅ Attendance creada:", attendance.length, "grupos");
    setAttendanceList(attendance as Group[]);
    localStorage.setItem("attendanceList", JSON.stringify(attendance));
  };

  const getDateRangeBookings = (
    dateRangeId: string,
    bookings: BookingType[],
    currentTourPackage: string
  ) => {
    console.log("📅 Obteniendo bookings para dateRange:", dateRangeId);
    console.log("📊 Total bookings disponibles:", bookings.length);

    const result = getBookingsByDateRangeId(
      dateRangeId,
      bookings,
      currentTourPackage
    );

    console.log("✅ DateRange bookings encontrados:", result.length);
    setDateRangeBookings(result);
  };

  const getGuideDateRanges = () => {
    if (!guideInfo?.id) {
      console.log("⏳ Esperando información del guía...");
      return;
    }

    setLoading(true);
    console.log("🗓️ Obteniendo dateRanges para guía:", guideInfo.id);

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

    console.log("✅ DateRanges del guía:", filteredDateRanges.length);
    setGuideDateRanges(filteredDateRanges);
    setLoading(false);
  };

  const getGuideInfo = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("🔑 No hay token disponible");
      setLoading(false);
      return;
    }

    try {
      const user: User = jwtDecode(token);
      const guideInfo = getUserById(user.id);

      if (!guideInfo) {
        console.log("❌ Información del guía no encontrada");
        setLoading(false);
        return;
      }

      // console.log("✅ Información del guía obtenida:", guideInfo.name);
      setGuideInfo(guideInfo);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error obteniendo info del guía:", error);
      setLoading(false);
    }
  };

  // 🔹 Inicialización: Obtener info del guía
  useEffect(() => {
    console.log("🚀 Inicializando GuideProvider...");
    getGuideInfo();
  }, [getUserById]);

  // 🔹 Cuando tenemos guía y tourPackages, obtener dateRanges
  useEffect(() => {
    if (guideInfo && tourPackages.length > 0) {
      getGuideDateRanges();
    }
  }, [guideInfo, tourPackages]);

  // 🔹 Cuando cambian los bookings, obtener los del dateRange actual
  useEffect(() => {
    const currentDateRange = localStorage.getItem("currentDateRange");
    const currentTourPackage = localStorage.getItem("currentTourPackage");

    console.log("📝 Verificando condiciones para obtener bookings:");
    console.log("  - currentDateRange:", currentDateRange);
    console.log("  - currentTourPackage:", currentTourPackage);
    console.log("  - bookings.length:", bookings.length);

    if (!currentDateRange || !currentTourPackage) {
      console.log("❌ No hay selección activa, limpiando dateRangeBookings");
      setDateRangeBookings([]);
      return;
    }

    if (bookings.length === 0) {
      console.log("⏳ No hay bookings disponibles aún");
      return;
    }

    getDateRangeBookings(currentDateRange, bookings, currentTourPackage);
  }, [bookings]);

  // 🔹 Cuando cambian los dateRangeBookings O al inicio, cargar attendance
  useEffect(() => {
    console.log(
      "🎯 useEffect dateRangeBookings triggered, length:",
      dateRangeBookings.length
    );
    loadAttendanceList();
  }, [dateRangeBookings, getTouristInfoById]);

  // 🔹 Al montar el componente, intentar cargar attendance SOLO si ya existe selección
  useEffect(() => {
    const currentDateRange = localStorage.getItem("currentDateRange");
    const currentTourPackage = localStorage.getItem("currentTourPackage");

    if (!currentDateRange || !currentTourPackage) {
      console.log("🔄 No hay selección previa al montar, attendance vacía");
      setAttendanceList([]);
      return;
    }

    console.log("🔄 Hay selección previa, intentando cargar attendance...");
    const stored = localStorage.getItem("attendanceList");
    if (stored) {
      try {
        const parsedStored = JSON.parse(stored);
        console.log("📦 Cargando attendance inicial desde localStorage");
        setAttendanceList(parsedStored);
      } catch (error) {
        console.error("❌ Error en carga inicial:", error);
        localStorage.removeItem("attendanceList");
        setAttendanceList([]);
      }
    } else {
      console.log(
        "📝 No hay attendance en localStorage, esperando bookings..."
      );
    }
  }, []);

  return (
    <GuideContext.Provider
      value={{
        guideDateRanges,
        loading,
        guideInfo,
        attendanceList,
        toggleTouristAttendanceStatus,
        saveAttendance,
        loadAttendanceList,
      }}
    >
      {children}
    </GuideContext.Provider>
  );
};
