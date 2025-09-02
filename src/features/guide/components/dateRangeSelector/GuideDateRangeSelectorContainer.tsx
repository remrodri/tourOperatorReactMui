import GuideDateRangeSelector from "./GuideDateRangeSelector";
import {
  CustomDateRangeType,
  useGuideContext2,
} from "../../context/GuideContext2";

const GuideDateRangeSelectorContainer: React.FC = () => {
  const { guideDateRanges, loading } = useGuideContext2();
  // console.log('guideDateRanges::: ', guideDateRanges);
  // localStorage.setItem("currentDateRange", JSON.stringify(guideDateRanges));
  const setCurrentDateRange = (dateRange: CustomDateRangeType) => {
    localStorage.setItem("currentDateRange", dateRange.id ?? "");
    localStorage.setItem("currentTourPackage", dateRange.tourPackageId ?? "");
  };
  return (
    <GuideDateRangeSelector
      guideDateRanges={guideDateRanges}
      loading={loading}
      setCurrentDateRange={setCurrentDateRange}
    />
  );
};

export default GuideDateRangeSelectorContainer;
