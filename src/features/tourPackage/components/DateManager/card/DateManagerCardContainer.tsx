import DateManagerCard from "./DateManagerCard";
import { DateRangeType } from "../../../types/DateRangeType";
// import { useDateRangeContext } from "../../../../dateRange/context/DateRangeContext";
import { useUserContext } from "../../../../userManagement/context/UserContext";
import { UserType } from "../../../../userManagement/types/UserType";
import { useEffect, useState } from "react";
import { useBookingContext } from "../../../../booking/context/BookingContext";
import ConfirmationModal from "./ConfirmationModal";
import { useTourPackageContext } from "../../../context/TourPackageContext";
import DateSelectorFormContainer from "../DateSelectorForm/DateSelectorFormContainer";
import DateRangeBookingsDialogContainer from "../dateRangeBookingsDialog/DateRangeBookingsDialogContainer";
import { sileo } from "sileo";
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
  const [guides, setGuides] = useState<UserType[]>([]);
  const [touristCounter, setTouristCounter] = useState<number>(0);

  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { updateDateRange } = useTourPackageContext();
  const [openDateSelectorForm, setOpenDateSelectorForm] =
    useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [openDateRangeBookingsDialog, setOpenDateRangeBookingsDialog] =
    useState<boolean>(false);

  const handleOpenDateRangeBookingsDialog = () => {
    setOpenDateRangeBookingsDialog(true);
  };

  const handleCloseDateRangeBookingsDialog = () => {
    setOpenDateRangeBookingsDialog(false);
  };

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
      setSelectedOption("completado");
      setOpenConfirmModal(true);
    }
    if (option === "Cancelado") {
      setSelectedOption("cancelado");
      setOpenConfirmModal(true);
    }
    if (option === "Editar") {
      setIsEditing(true);
      handleOpenDateSelectorForm();
    }
    if (option === "Ver reservas") {
      handleOpenDateRangeBookingsDialog();
    }
    // } else {
    // otras opciones que no requieren modal
    console.log("Opción directa:", option);
    // }
  };

  const handleConfirmAction = async () => {
    if (!dateRange.id) return;
    try {
      await updateDateRange({
        id: dateRange.id,
        state: selectedOption === "completado" ? "completed" : "cancelled",
      });
    } catch (error) {
      sileo.error({
        title: "No se pudo actualizar la salida",
        description:
          error instanceof Error
            ? error.message
            : "Revisa los datos e inténtalo de nuevo.",
      });
    } finally {
      setOpenConfirmModal(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadCounter = async () => {
      if (!dateRange) return;

      const guides = dateRange.guides
        ?.map((guideId) => getUserById(guideId))
        .filter((guide): guide is UserType => !!guide);

      setGuides(guides || []);

      const counter = await getTouristCounterByDateRangeId(
        dateRange.id ?? "",
        tourPackageId,
      );
      if (!cancelled) setTouristCounter(counter);
    };

    void loadCounter();

    return () => {
      cancelled = true;
    };
  }, [dateRange, getTouristCounterByDateRangeId, getUserById, tourPackageId]);

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
      {openDateRangeBookingsDialog && (
        <DateRangeBookingsDialogContainer
          open={openDateRangeBookingsDialog}
          handleClose={handleCloseDateRangeBookingsDialog}
          dateRange={dateRange}
        />
      )}
    </>
  );
};

export default DateManagerCardContainer;
