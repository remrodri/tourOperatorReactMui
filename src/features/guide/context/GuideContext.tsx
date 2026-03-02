import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

import { jwtDecode } from "jwt-decode";

import type { DateRangeType } from "../../tourPackage/types/DateRangeType";
import type { BookingType } from "../../booking/types/BookingType";
import type { TouristType } from "../../booking/types/TouristType";
import type { UserType } from "../../userManagement/types/UserType";

import { TokenService } from "../../../utils/tokenService";

import { useTourPackageContext } from "../../tourPackage/context/TourPackageContext";
import { useUserContext } from "../../userManagement/context/UserContext";
import { useBookingContext } from "../../booking/context/BookingContext";

export interface CustomDateRangeType extends DateRangeType {
  tpName: string;
}

export interface TouristWithStatus {
  tourist: TouristType;
  status: "present" | "absent";
}

export interface Group {
  group: TouristWithStatus[];
  bookingId: string;
}

interface GuideContextType {
  guideDateRanges: CustomDateRangeType[];
  loading: boolean;
  guideInfo: UserType | null;

  attendanceList: Group[];
  toggleTouristAttendanceStatus: (bookingId: string, touristId: string) => void;
  saveAttendance: () => Promise<void>;

  currentDateRange: string;
  currentTourPackage: string;
  dateRangeBookings: BookingType[];

  setCurrentDateRange: (dateRangeId: string) => void;
  setCurrentTourPackage: (tourPackageId: string) => void;
}

const GuideContext = createContext<GuideContextType | undefined>(undefined);

export const useGuideContext = () => {
  const ctx = useContext(GuideContext);
  if (ctx === undefined) {
    throw new Error("useGuideContext debe ser usado con un GuideProvider");
  }
  return ctx;
};

// helper id (por si algún día viene _id)
const getId = (x: any) => x?.id ?? x?._id;

export const GuideProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { tourPackages } = useTourPackageContext();
  const { getUserById, userInfo } = useUserContext(); // <- usa userInfo si ya lo tienes
  const { bookings, getBookingsByDateRangeId, updateAttendance } =
    useBookingContext();

  // ✅ inicializa desde localStorage para evitar bug de "estado vacío"
  const [currentDateRange, _setCurrentDateRange] = useState<string>(
    () => localStorage.getItem("currentDateRange") ?? "",
  );
  const [currentTourPackage, _setCurrentTourPackage] = useState<string>(
    () => localStorage.getItem("currentTourPackage") ?? "",
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [guideInfo, setGuideInfo] = useState<UserType | null>(null);

  const [dateRangeBookings, setDateRangeBookings] = useState<BookingType[]>([]);
  const [attendanceList, setAttendanceList] = useState<Group[]>([]);

  // ✅ setters que también persisten a localStorage
  const setCurrentDateRange = useCallback((dateRangeId: string) => {
    _setCurrentDateRange(dateRangeId);
    localStorage.setItem("currentDateRange", dateRangeId);
  }, []);

  const setCurrentTourPackage = useCallback((tourPackageId: string) => {
    _setCurrentTourPackage(tourPackageId);
    localStorage.setItem("currentTourPackage", tourPackageId);
  }, []);

  // ✅ obtener guía: preferimos userInfo (ya decodificado en tu UserContext).
  // Si no existe userInfo (por cualquier motivo), caemos a TokenService.
  const resolveGuideInfo = useCallback(() => {
    const idFromUserInfo = (userInfo as any)?.id ?? (userInfo as any)?._id;

    if (idFromUserInfo) {
      const found = getUserById(idFromUserInfo);
      setGuideInfo(found);
      return;
    }

    const token = TokenService.getToken();
    if (!token) {
      setGuideInfo(null);
      return;
    }

    try {
      const payload = jwtDecode<any>(token);
      const id = payload?.id ?? payload?._id;
      const found = id ? getUserById(id) : null;
      setGuideInfo(found);
    } catch (e) {
      console.error("Error decodificando token:", e);
      setGuideInfo(null);
    }
  }, [getUserById, userInfo]);

  useEffect(() => {
    resolveGuideInfo();
  }, [resolveGuideInfo]);

  // ✅ dateRanges del guía: mejor derivado (useMemo) en vez de setState manual
  const guideDateRanges = useMemo<CustomDateRangeType[]>(() => {
    if (!guideInfo?.id || !tourPackages?.length) return [];

    const pendingDateRanges = tourPackages.flatMap((tp) =>
      (tp.dateRanges ?? []).filter((dr: any) => dr.state === "pending"),
    );

    return pendingDateRanges
      .filter((dr: any) => dr.guides?.includes(guideInfo.id))
      .map((dr: any) => ({
        ...dr,
        tpName:
          tourPackages.find((tp) => getId(tp) === dr.tourPackageId)?.name ?? "",
      }));
  }, [guideInfo, tourPackages]);

  // ✅ bookings del dateRange seleccionado
  const computeDateRangeBookings = useCallback(() => {
    if (!currentDateRange || !currentTourPackage) {
      setDateRangeBookings([]);
      return;
    }

    const result = getBookingsByDateRangeId(
      currentDateRange,
      bookings,
      currentTourPackage,
    );

    setDateRangeBookings(result);
  }, [
    currentDateRange,
    currentTourPackage,
    bookings,
    getBookingsByDateRangeId,
  ]);

  useEffect(() => {
    computeDateRangeBookings();
  }, [computeDateRangeBookings]);

  // ✅ inicializa attendanceList cuando cambian las reservas del dateRange
  // - si booking ya tiene attendance, lo respeta
  // - sino crea lista default "absent"
  useEffect(() => {
    const next: Group[] = (dateRangeBookings ?? []).map((b) => {
      const bookingId = getId(b);

      // booking.attendance debería ser: { touristId, status }[]
      const existing = (b as any).attendance as
        | { touristId: string; status: "present" | "absent" }[]
        | undefined;

      // Si ya hay attendance, lo convertimos a TouristWithStatus con tourist full si lo tienes.
      // Aquí NO invento tourist info si no existe. Solo seteo touristId en tourist stub.
      // (Ideal: si tienes un TouristContext, aquí haces lookup y completas datos).
      if (existing?.length) {
        return {
          bookingId,
          group: existing.map((a) => ({
            tourist: { id: a.touristId } as TouristType,
            status: a.status,
          })),
        };
      }

      // Si no hay attendance: armamos desde touristIds si existen
      const touristIds: string[] = (b as any).touristIds ?? [];
      return {
        bookingId,
        group: touristIds.map((tid) => ({
          tourist: { id: tid } as TouristType,
          status: "absent",
        })),
      };
    });

    setAttendanceList(next);
  }, [dateRangeBookings]);

  // ✅ toggle ahora recibe bookingId para no cambiar turistas de otras reservas
  const toggleTouristAttendanceStatus = useCallback(
    (bookingId: string, touristId: string) => {
      setAttendanceList((prev) =>
        prev.map((g) => {
          if (g.bookingId !== bookingId) return g;

          return {
            ...g,
            group: g.group.map((t) =>
              t.tourist.id === touristId
                ? {
                    ...t,
                    status: t.status === "present" ? "absent" : "present",
                  }
                : t,
            ),
          };
        }),
      );
    },
    [],
  );

  // ✅ guarda asistencia (el service ya debe lanzar sileo)
  const saveAttendance = useCallback(async () => {
    setLoading(true);
    try {
      const payload = attendanceList.map((subList) => ({
        bookingId: subList.bookingId,
        attendance: subList.group.map((t) => ({
          touristId: t.tourist.id,
          status: t.status,
        })),
      }));

      await updateAttendance(payload);
      // si tu service ya usa sileo, aquí no repetimos snackbar
    } catch (e) {
      console.error("Error al guardar la asistencia:", e);
      // el service debería mostrar sileo.error, pero dejamos log por si acaso
    } finally {
      setLoading(false);
    }
  }, [attendanceList, updateAttendance]);

  return (
    <GuideContext.Provider
      value={{
        guideDateRanges,
        loading,
        guideInfo,
        attendanceList,
        toggleTouristAttendanceStatus,
        saveAttendance,
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
