import { Box } from "@mui/material";
import TouristList from "./TouristList";
import {
  CustomDateRangeType,
  Group,
  TouristWithStatus,
  useGuideContext2,
} from "../../context/GuideContext2";
import { useEffect, useState } from "react";
import { useTouristContext } from "../../../tourist/context/TouristContext";
import { useBookingContext } from "../../../booking/context/BookingContext";
import { useNewSnackbar } from "../../../../context/SnackbarContext";
import { jwtDecode } from "jwt-decode";
import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";
import { User } from "../../../userManagement/types/User";
import { BookingType } from "../../../booking/types/BookingType";

const TouristListContainer: React.FC = () => {
  const {
    // attendanceList,
    // toggleTouristAttendanceStatus,
    // saveAttendance,
    // loading,
    // loadAttendanceList,
    // dateRangeBookings,
    currentDateRange,
    currentTourPackage,
  } = useGuideContext2();
  const { getTouristInfoById } = useTouristContext();

  const [attendanceList, setAttendanceList] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { updateAttendance, getBookingsByDateRangeId, bookings } =
    useBookingContext();
  const { showSnackbar } = useNewSnackbar();
  const { tourPackages } = useTourPackageContext();
  const [dateRangeBookings, setDateRangeBookings] = useState<BookingType[]>([]);
  const [guideDateRanges, setGuideDateRanges] = useState<CustomDateRangeType[]>(
    []
  );
  // const { getBookingsByDateRangeId } = useBookingContext();

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

  const handleCheckboxChange = (touristId: string) => {
    toggleTouristAttendanceStatus(touristId);
  };

  const handleRegisterAttendance = () => {
    saveAttendance();
  };

  const loadAttendanceList = () => {
    if (dateRangeBookings.length === 0) {
      return [];
    }
    const attendance = dateRangeBookings.map((booking) => {
      const group = booking.attendance
        .map((att) => {
          const tourist = getTouristInfoById(att.touristId);
          if (!tourist) {
            console.warn("Turista no encontrado:", att.touristId);
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
    console.log("attendance::: ", attendance);
    setAttendanceList(attendance as Group[]);
    return [];
  };

  const getGuideDateRanges = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // console.log("🔑 No hay token disponible");
      return;
    }
    const currentUser: User = jwtDecode(token);
    if (!currentUser?.id) {
      // console.log("⏳ Esperando información del guía...");
      return;
    }

    setLoading(true);
    // console.log("🗓️ Obteniendo dateRanges para guía:", guideInfo.id);

    const dateRanges = tourPackages.flatMap((tourPackage) => {
      return tourPackage.dateRanges.filter((dr) => dr.state === "pending");
    });

    const filteredDateRanges = dateRanges
      .filter((dr) => dr.guides?.includes(currentUser.id))
      .map((dr) => ({
        ...dr,
        tpName:
          tourPackages.find((tp) => tp.id === dr.tourPackageId)?.name || "",
      }));

    console.log("✅ DateRanges del guía:", filteredDateRanges);
    setGuideDateRanges(filteredDateRanges);
    setLoading(false);
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

  useEffect(() => {
    getDateRangeBookings(currentDateRange!, bookings, currentTourPackage!);
  }, [currentDateRange, currentTourPackage]);
  
  useEffect(() => {
    getGuideDateRanges();
  }, [tourPackages]);

  useEffect(() => {
    loadAttendanceList();
  }, [dateRangeBookings, currentDateRange, currentTourPackage]);

  return (
    <Box>
      <TouristList
        attendanceList={attendanceList}
        handleCheckboxChange={handleCheckboxChange}
        loading={loading}
        handleRegisterAttendance={handleRegisterAttendance}
      />
    </Box>
  );
};

export default TouristListContainer;
