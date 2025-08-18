import DateManagerCard from "./DateManagerCard";
import { DateRangeType } from "../../../types/DateRangeType";
import { useDateRangeContext } from "../../../../dateRange/context/DateRangeContext";
import { useUserContext } from "../../../../userManagement/context/UserContext";
import { User } from "../../../../userManagement/types/User";
import { useEffect, useState } from "react";
import { useBookingContext } from "../../../../booking/context/BookingContext";
import ConfirmationModal from "./ConfirmationModal";
interface DateManagerCardContainerProps {
  dateRange: DateRangeType;
}
const DateManagerCardContainer: React.FC<DateManagerCardContainerProps> = ({
  dateRange,
}) => {
  const { getUserById } = useUserContext();
  const { getTouristCounterByDateRangeId } = useBookingContext();
  const [guides, setGuides] = useState<User[]>([]);
  const [touristCounter, setTouristCounter] = useState<number>(0);

  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  //  tu contexto donde actualizarás estado del paquete/fecha
  const { updateDateRangeStatus } = useDateRangeContext();

  const handleOptionSelect = (option: string) => {
    if (option === "Completado" || option === "Cancelado") {
      setSelectedOption(option);
      setOpenConfirmModal(true);
    } else {
      // otras opciones que no requieren modal
      console.log("Opción directa:", option);
    }
  };

  const handleConfirmAction = () => {
    if (!dateRange.id) return;
    updateDateRangeStatus(dateRange.id, selectedOption); // ⬅ llamada al contexto
    setOpenConfirmModal(false);
  };

  useEffect(() => {
    if (dateRange) {
      const guides = dateRange.guides
        ?.map((guideId) => getUserById(guideId))
        .filter((guide): guide is User => !!guide);

      setGuides(guides || []);
      setTouristCounter(getTouristCounterByDateRangeId(dateRange.id ?? ""));
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
    </>
  );
};


export default DateManagerCardContainer;
