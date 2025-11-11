import { useState } from "react";
import { TourPackageType } from "../../../types/TourPackageType";
import TourPackageCard from "./TourPackageCard";
import TourPackageformContainer from "../../tourPackageForm/TourPackageFormContainer";
import MoreInfoModalContainer from "../../modal/MoreInfoModalContainer";
import { useTourPackageContext } from "../../../context/TourPackageContext";
import ConfirmationModal from "./ConfirmationModal";
import DateManagerContainer from "../../DateManager/DateManagerContainer";
import { useTouristDestinationContext } from "../../../../touristDestination/context/TouristDestinationContext";
interface TourPackageCardContainerProps {
  tourPackage: TourPackageType;
}

const TourPackageCardContainer: React.FC<TourPackageCardContainerProps> = ({
  tourPackage,
}) => {
  const BASE_URL = "http://localhost:3000";
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const { updateTourPackageStatus } = useTourPackageContext();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openDateManager, setOpenDateManager] = useState(false);
  const [task, setTask] = useState<string>("");
  const { getTouristDestinationInfoById } = useTouristDestinationContext();
  const touristDestination = getTouristDestinationInfoById(tourPackage.touristDestination);
  // console.log('touristDestination::: ', touristDestination);

  const handleClickDateManager = () => {
    setOpenDateManager(!openDateManager);
  };

  const handleClickConfirmation = () => {
    setOpenConfirmation(!openConfirmation);
  };

  const handleClickInfo = () => {
    setOpenInfo(!openInfo);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickAction = () => {
    updateTourPackageStatus(tourPackage.id,task);
    setOpenConfirmation(false);
  };

  const handleOption = (option: string) => {
    switch (option) {
      case "Ver mas":
        // console.log("ver mas::: ");
        handleClickInfo();
        break;
      case "Editar":
        // console.log("Editar::: ");
        // console.log("tourPackage being edited:", tourPackage);
        // console.log("selectedDates:", tourPackage.selectedDates);
        handleClick();
        break;
      case "Inhabilitar":
        console.log("Inhabilitar::: ");
        setTask("inactive");
        handleClickConfirmation();
        break;
      case "Gestion de fechas":
        console.log("Gestionar fechas::: ");
        handleClickDateManager();
        break;
      case "Habilitar":
        console.log("Habilitar::: ");
        setTask("active");
        handleClickConfirmation();
        break;
      default:
        console.log("opcion no valida::: ");
        break;
    }
  };

  return (
    <>
      <TourPackageCard
        tourPackage={tourPackage}
        BASE_URL={BASE_URL}
        handleOption={handleOption}
        touristDestination={touristDestination || null}
      />
      {open && (
        <TourPackageformContainer
          open={open}
          handleClick={handleClick}
          tourPackage={tourPackage}
          // handleClickInfo={handleClickInfo}
        />
      )}
      {openInfo && (
        <MoreInfoModalContainer
          open={openInfo}
          handleClick={handleClickInfo}
          tourPackage={tourPackage}
        />
      )}
      {openConfirmation && (
        <ConfirmationModal
          open={openConfirmation}
          handleClick={handleClickConfirmation}
          handleClickAction={handleClickAction}
          task={task}
        />
      )}
      {openDateManager && (
        <DateManagerContainer
          open={openDateManager}
          onClose={handleClickDateManager}
          dateRangeIds={tourPackage.dateRanges}
          duration={tourPackage.duration}
          tourPackageId={tourPackage.id}
          tourPackage={tourPackage}
        />
      )}
    </>
  );
};
export default TourPackageCardContainer;
