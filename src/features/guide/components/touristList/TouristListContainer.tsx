import { Box } from "@mui/material";
import TouristList from "./TouristList";
import {
  Group,
  TouristWithStatus,
  useGuideContext,
} from "../../context/GuideContext";
import { useCallback, useEffect, useState } from "react";
import { useTouristContext } from "../../../tourist/context/TouristContext";
import { useBookingContext } from "../../../booking/context/BookingContext";
import { useNewSnackbar } from "../../../../context/SnackbarContext";

const TouristListContainer: React.FC = () => {
  const { dateRangeBookings } = useGuideContext();
  const { getTouristInfoById, ensureTouristsByIds } = useTouristContext();
  const { updateAttendance } = useBookingContext();
  const { showSnackbar } = useNewSnackbar();

  const [attendanceList, setAttendanceList] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const touristIdsKey = dateRangeBookings
    .flatMap((booking) => booking.touristIds ?? [])
    .join(",");

  useEffect(() => {
    if (!touristIdsKey) return;
    void ensureTouristsByIds(touristIdsKey.split(","));
  }, [touristIdsKey, ensureTouristsByIds]);

  const saveAttendance = async () => {
    setLoading(true);
    try {
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

  const handleCheckboxChange = (touristId: string) => {
    toggleTouristAttendanceStatus(touristId);
  };

  const handleRegisterAttendance = () => {
    saveAttendance();
  };

  const loadAttendanceList = useCallback(() => {
    if (dateRangeBookings.length === 0) {
      setAttendanceList([]);
      return;
    }

    const attendance = dateRangeBookings.map((booking) => {
      const group = (booking.attendance ?? [])
        .map((att) => {
          const tourist = getTouristInfoById(att.touristId);
          if (!tourist) return null;
          return {
            tourist,
            status: att.status === "present" ? "present" : "absent",
          } as TouristWithStatus;
        })
        .filter((item): item is TouristWithStatus => item !== null);

      return { group, bookingId: booking.id };
    });

    setAttendanceList(attendance as Group[]);
  }, [dateRangeBookings, getTouristInfoById]);

  useEffect(() => {
    loadAttendanceList();
  }, [loadAttendanceList]);

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
