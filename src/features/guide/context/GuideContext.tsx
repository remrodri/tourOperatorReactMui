import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";
import { TourPackageType } from "../../tourPackage/types/TourPackageType";
import { TouristDestinationType } from "../../touristDestination/types/TouristDestinationType";
import { useDateRangeContext } from "../../dateRange/context/DateRangeContext";
import { TokenService } from "../../../utils/tokenService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { User } from "../../userManagement/types/User";
import { useTourPackageContext } from "../../tourPackage/context/TourPackageContext";
import { useTouristDestinationContext } from "../../touristDestination/context/TouristDestinationContext";
import { BookingType } from "../../booking/types/BookingType";
import { useBookingContext } from "../../booking/context/BookingContext";
import { useTouristContext } from "../../tourist/context/TouristContext";
import { TouristType } from "../../booking/types/TouristType";
import { getAttendanceListFromLocalStorage } from "../localStorageService/localStorageService";
import { useUserContext } from "../../userManagement/context/UserContext";

export interface TouristWithStatus {
  tourist: TouristType;
  status: "present" | "absent";
  // bookingId:string;
}

export interface Group {
  group: TouristWithStatus[];
  bookingId: string;
}

interface GuideContextType {
  guideDateRanges: DateRangeType[];
  tourPackage: TourPackageType | null;
  touristDestination: TouristDestinationType | null;
  attendanceList: Group[];
  loading: boolean;
  toggleTouristAttendanceStatus: (touristId: string) => void;
  resetAttendanceList: () => void;
  saveAttendance: () => void;
  pendingDateRange: DateRangeType | null;
}

const GuideContext = createContext<GuideContextType | null>(null);

export const useGuideContext = () => {
  const context = useContext(GuideContext);
  if (!context) {
    throw new Error("useGuideContext must be used within a GuideProvider");
  }
  return context;
};

interface GuideProviderProps {
  children: ReactNode;
}

export const GuideProvider: React.FC<GuideProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const { filterDateRangesByTourGuideId } = useDateRangeContext();
  const { getTourPackageInfoById } = useTourPackageContext();
  const { getTouristDestinationInfoById } = useTouristDestinationContext();
  const { getTouristInfoById } = useTouristContext();
  const { bookings, updateAttendance } = useBookingContext();

  const [guideDateRanges, setGuideDateRanges] = useState<DateRangeType[]>([]);
  const [pendingDateRange, setPendingDateRange] =
    useState<DateRangeType | null>(null);
  const [tourPackage, setTourPackage] = useState<TourPackageType | null>(null);
  const [touristDestination, setTouristDestination] =
    useState<TouristDestinationType | null>(null);
  const [dateRangeBookings, setDateRangeBookings] = useState<BookingType[]>([]);
  const [attendanceList, setAttendanceList] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const saveAttendance = async () => {
    setLoading(true);
    try {
      const attendance = getAttendanceListFromLocalStorage();
      const bookings = attendance.map((subList: Group) => {
        const bookingId = subList.bookingId;
        const attendance = subList.group.map((tourist: TouristWithStatus) => {
          return {
            touristId: tourist.tourist.id,
            status: tourist.status,
          };
        });
        return { bookingId: bookingId, attendance: attendance };
      });
      await updateAttendance(bookings);
      // console.log("Attendance list:", bookings);
      // const response = updateAttendance(bookings);
      // console.log("Response:", response);
    } catch (error) {
      console.error("Error fetching attendance list:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAttendanceList = (bookings: BookingType[]) => {
    const stored = localStorage.getItem("attendanceList");
    if (stored) {
      setAttendanceList(JSON.parse(stored));
      return;
    }

    const attendance = bookings.map((booking) => {
      const group = booking.attendance.map((att) => ({
        tourist: getTouristInfoById(att.touristId),
        status: att.status === "present" ? "present" : "absent",
        // bookingId: booking.id,
      }));
      return { group, bookingId: booking.id };
    });

    setAttendanceList(attendance as Group[]);
    localStorage.setItem("attendanceList", JSON.stringify(attendance));
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
  };

  const resetAttendanceList = () => {
    localStorage.removeItem("attendanceList");
    setAttendanceList([]);
  };

  const getDateRangesByTourGuideId = (id: string) => {
    setGuideDateRanges(filterDateRangesByTourGuideId(id));
  };

  const getPendingDateRangeById = () => {
    const dateRange = guideDateRanges.find((dr) => dr.state === "pending");
    if (dateRange) {
      setPendingDateRange(dateRange);
    }
  };

  useEffect(() => {
    const token = TokenService.getToken();
    if (!token) {
      navigate("/login");
      return;
    }
    const user: User = jwtDecode(token);
    getDateRangesByTourGuideId(user.id);
  }, [filterDateRangesByTourGuideId]);

  useEffect(() => {
    getPendingDateRangeById();
  }, [guideDateRanges]);

  useEffect(() => {
    if (pendingDateRange) {
      const filtered = bookings.filter(
        (b) => b.dateRangeId === pendingDateRange.id
      );
      setDateRangeBookings(filtered);
      setTourPackage(getTourPackageInfoById(pendingDateRange.tourPackageId));
    }
  }, [pendingDateRange]);

  useEffect(() => {
    if (tourPackage) {
      setTouristDestination(
        getTouristDestinationInfoById(tourPackage.touristDestination)
      );
    }
  }, [tourPackage]);

  useEffect(() => {
    if (dateRangeBookings.length > 0) {
      loadAttendanceList(dateRangeBookings);
    }
  }, [dateRangeBookings]);

  return (
    <GuideContext.Provider
      value={{
        guideDateRanges,
        tourPackage,
        touristDestination,
        attendanceList,
        loading,
        toggleTouristAttendanceStatus,
        resetAttendanceList,
        saveAttendance,
        pendingDateRange,
      }}
    >
      {children}
    </GuideContext.Provider>
  );
};
