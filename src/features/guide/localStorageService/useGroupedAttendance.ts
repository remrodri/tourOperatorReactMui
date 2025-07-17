import { useEffect, useState } from "react";
import { TouristType } from "../../booking/types/TouristType";

type TouristWithStatus = {
  tourist: any; // simplificado
  status: "present" | "absent";
};

type TouristWithStatusGroup = TouristWithStatus[];

export function useGroupedAttendance(
  guideId: string, // puede ser dateRangeId si preferís
  attendanceListFromContext: TouristWithStatusGroup[]
) {
  const localKey = `attendance_guide_${guideId}`;

  const [attendanceList, setAttendanceList] = useState<TouristWithStatusGroup[]>(
    []
  );

  // al montar, cargar desde localStorage o usar la del contexto
  useEffect(() => {
    const saved = localStorage.getItem(localKey);
    if (saved) {
      setAttendanceList(JSON.parse(saved)as TouristWithStatusGroup[]);
    } else {
      setAttendanceList(attendanceListFromContext);
      localStorage.setItem(localKey, JSON.stringify(attendanceListFromContext));
    }
  }, [guideId, attendanceListFromContext]);

  // función para cambiar status de un turista
  const toggleStatus = (touristId: string) => {
    const updated = attendanceList.map(group =>
      group.map(t =>
        t.tourist.id === touristId
          ? { ...t, status: t.status === "present" ? "absent" : "present" }
          : t
      )
    );
    setAttendanceList(updated as TouristWithStatusGroup[]);
    localStorage.setItem(localKey, JSON.stringify(updated));
  };

  const clear = () => {
    localStorage.removeItem(localKey);
  };

  return { attendanceList, toggleStatus, clear };
}
