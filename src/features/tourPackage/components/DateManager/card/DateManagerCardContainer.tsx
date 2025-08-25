import DateManagerCard from "./DateManagerCard";
import { DateRangeType } from "../../../types/DateRangeType";
// import { useDateRangeContext } from "../../../../dateRange/context/DateRangeContext";
import { useUserContext } from "../../../../userManagement/context/UserContext";
import { User } from "../../../../userManagement/types/User";
import { useEffect, useState } from "react";
import { useBookingContext } from "../../../../booking/context/BookingContext";
import ConfirmationModal from "./ConfirmationModal";
import { useTourPackageContext } from "../../../context/TourPackageContext";
import DateSelectorFormContainer from "../DateSelectorForm/DateSelectorFormContainer";
interface DateManagerCardContainerProps {
  dateRange: DateRangeType;
  duration: number;
  dateRangesInfo: DateRangeType[];
  tourPackageId: string;
  // handleOpenDateSelectorForm: () => void;
}
const DateManagerCardContainer: React.FC<DateManagerCardContainerProps> = ({
  dateRange,
  duration,
  dateRangesInfo,
  tourPackageId,
  // handleOpenDateSelectorForm,
}) => {
  const { getUserById } = useUserContext();
  const { getTouristCounterByDateRangeId } = useBookingContext();
  const [guides, setGuides] = useState<User[]>([]);
  const [touristCounter, setTouristCounter] = useState<number>(0);

  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { updateDateRange } = useTourPackageContext();
  const [openDateSelectorForm, setOpenDateSelectorForm] =
    useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleOpenDateSelectorForm = () => {
    setOpenDateSelectorForm(true);
  };

  const handleCloseDateSelectorForm = () => {
    setOpenDateSelectorForm(false);
  };

  //  tu contexto donde actualizarás estado del paquete/fecha
  // const { updateDateRangeStatus } = useDateRangeContext();

  const handleOptionSelect = (option: string) => {
    // if (option === "Completado" || option === "Cancelado") {
    if (option === "Completado") {
      setSelectedOption("completed");
      setOpenConfirmModal(true);
    }
    if (option === "Cancelado") {
      setSelectedOption("cancelled");
      setOpenConfirmModal(true);
    }
    if (option === "Editar") {
      setIsEditing(true);
      handleOpenDateSelectorForm();
    }
    // } else {
    // otras opciones que no requieren modal
    console.log("Opción directa:", option);
    // }
  };

  const handleConfirmAction = () => {
    if (!dateRange.id) return;
    // updateDateRangeStatus(dateRange.id, selectedOption); // ⬅ llamada al contexto
    updateDateRange({
      id: dateRange.id,
      state: selectedOption,
    });
    setOpenConfirmModal(false);
  };

  useEffect(() => {
    if (dateRange) {
      const guides = dateRange.guides
        ?.map((guideId) => getUserById(guideId))
        .filter((guide): guide is User => !!guide);

      setGuides(guides || []);
      setTouristCounter(getTouristCounterByDateRangeId(dateRange.id ?? ""));
      // setIsEditing(true);
    }
  }, [dateRange]);

  return (
    <>
      <DateManagerCard
        dateRange={dateRange}
        guides={guides}
        handleOptionSelect={handleOptionSelect}
        touristCounter={touristCounter}
      />
      <ConfirmationModal
        open={openConfirmModal}
        handleClose={() => setOpenConfirmModal(false)}
        onConfirm={handleConfirmAction}
        option={selectedOption}
      />
      {openDateSelectorForm && (
        <DateSelectorFormContainer
          open={openDateSelectorForm}
          onClose={handleCloseDateSelectorForm}
          isEditing={isEditing}
          duration={duration}
          dateRanges={dateRangesInfo}
          tourPackageId={tourPackageId}
          currentDateRange={dateRange}
        />
      )}
    </>
  );
};

export default DateManagerCardContainer;
