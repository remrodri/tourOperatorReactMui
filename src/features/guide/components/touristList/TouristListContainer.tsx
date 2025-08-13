import TouristList from "./TouristList";
import { useGuideContext } from "../../context/GuideContext";

const TouristListContainer: React.FC = () => {
  const {
    attendanceList,
    loading,
    toggleTouristAttendanceStatus,
    saveAttendance,
  } = useGuideContext();

  const handleCheckboxChange = (
    // event: React.ChangeEvent<HTMLInputElement>,
    touristId: string
  ) => {
    toggleTouristAttendanceStatus(touristId);
  };

  const handleRegisterAttendance = () => {
    saveAttendance();
  };

  return (
    <TouristList
      attendanceList={attendanceList}
      handleCheckboxChange={handleCheckboxChange}
      loading={loading}
      handleRegisterAttendance={handleRegisterAttendance}
    />
  );
};

export default TouristListContainer;
