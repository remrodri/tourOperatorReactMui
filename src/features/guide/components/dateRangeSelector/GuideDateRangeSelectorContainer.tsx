import GuideDateRangeSelector from "./GuideDateRangeSelector";
import {
  CustomDateRangeType,
  useGuideContext2,
} from "../../context/GuideContext2";
import { useNavigate } from "react-router-dom";

const GuideDateRangeSelectorContainer: React.FC = () => {
  const navigate = useNavigate();
  const {
    guideDateRanges,
    loading,
    setCurrentDateRange,
    setCurrentTourPackage,
  } = useGuideContext2();
  // console.log('guideDateRanges::: ', guideDateRanges);
  // localStorage.setItem("currentDateRange", JSON.stringify(guideDateRanges));
  const modifyCurrentDateRange = (dateRange: CustomDateRangeType) => {
    console.log("dateRange::: ", dateRange);
    localStorage.setItem("currentDateRange", dateRange.id ?? "");
    localStorage.setItem("currentTourPackage", dateRange.tourPackageId ?? "");
    // localStorage.removeItem("attendanceList");
    setCurrentDateRange(dateRange.id!);
    setCurrentTourPackage(dateRange.tourPackageId!);
    navigate("/guia-de-turismo/turistas");
  };
  return (
    <GuideDateRangeSelector
      guideDateRanges={guideDateRanges}
      loading={loading}
      setCurrentDateRange={modifyCurrentDateRange}
    />
  );
};

export default GuideDateRangeSelectorContainer;
