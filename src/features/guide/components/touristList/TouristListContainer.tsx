import { Box } from "@mui/material";
import TouristList from "./TouristList";
import { useGuideContext2 } from "../../context/GuideContext2";
import { useEffect, useState } from "react";

const TouristListContainer: React.FC = () => {
  const {
    attendanceList,
    toggleTouristAttendanceStatus,
    saveAttendance,
    loading,
    loadAttendanceList,
  } = useGuideContext2();

  const [hasSelection, setHasSelection] = useState(false);

  const handleCheckboxChange = (touristId: string) => {
    toggleTouristAttendanceStatus(touristId);
  };

  const handleRegisterAttendance = () => {
    saveAttendance();
  };

  // Verificar si hay una selección activa de dateRange
  useEffect(() => {
    const currentDateRange = localStorage.getItem("currentDateRange");
    const currentTourPackage = localStorage.getItem("currentTourPackage");

    const hasActiveSelection = Boolean(currentDateRange && currentTourPackage);
    setHasSelection(hasActiveSelection);

    console.log(
      "📋 TouristListContainer - Selección activa:",
      hasActiveSelection
    );

    // Solo cargar si hay selección Y no hay attendance cargada
    if (hasActiveSelection && attendanceList.length === 0) {
      console.log("🔄 TouristListContainer - Solicitando carga de attendance");
      loadAttendanceList();
    }
  }, [loadAttendanceList, attendanceList.length]);

  // Mostrar mensaje si no hay selección
  if (!hasSelection) {
    return (
      <Box sx={{ textAlign: "center", p: 3 }}>
        <p>
          Por favor, selecciona un rango de fechas para ver la lista de
          turistas.
        </p>
      </Box>
    );
  }

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
