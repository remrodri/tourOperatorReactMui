import GuideDateRangeSelector from "./GuideDateRangeSelector";
import {
  CustomDateRangeType,
  useGuideContext,
} from "../../context/GuideContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TourAssignedDialog from "./dialog/TourAssignedDialog";

const GuideDateRangeSelectorContainer: React.FC = () => {
  const navigate = useNavigate();
  const {
    guideDateRanges,
    loading,
    setCurrentDateRange,
    setCurrentTourPackage,
  } = useGuideContext();
  
const [openModal, setOpenModal] = useState(() => {
  const dr = localStorage.getItem("currentDateRange");
  const tp = localStorage.getItem("currentTourPackage");
  return !dr && !tp; // abre si faltan ambos
});

  const handleCloseModal = () => setOpenModal(false);

  const modifyCurrentDateRange = (dateRange: CustomDateRangeType) => {
    localStorage.setItem("currentDateRange", dateRange.id ?? "");
    localStorage.setItem("currentTourPackage", dateRange.tourPackageId ?? "");
    setCurrentDateRange(dateRange.id!);
    setCurrentTourPackage(dateRange.tourPackageId!);
    navigate("/guia-de-turismo/turistas");
  };

  return (
    <>
      <GuideDateRangeSelector
        guideDateRanges={guideDateRanges}
        loading={loading}
        setCurrentDateRange={modifyCurrentDateRange}
      />
      <TourAssignedDialog open={openModal} onClose={handleCloseModal} />
    </>
  );
};

export default GuideDateRangeSelectorContainer;
