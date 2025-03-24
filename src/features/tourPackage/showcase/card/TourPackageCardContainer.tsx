import { useState } from "react";
import { TourPackageType } from "../../types/TourPackageType";
import TourPackageCard from "./TourPackageCard";
import TourPackageformContainer from "../../tourPackageForm/TourPackageFormContainer";
import MoreInfoModalContainer from "../../modal/MoreInfoModalContainer";
import { useTourPackageContext } from "../../context/TourPackageContext";

interface TourPackageCardContainerProps {
  tourPackage: TourPackageType;
}

const TourPackageCardContainer: React.FC<TourPackageCardContainerProps> = ({
  tourPackage,
}) => {
  const BASE_URL = "http://localhost:3000";
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const { deleteTourPackage } = useTourPackageContext();

  const handleClickInfo = () => {
    setOpenInfo(!openInfo);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickDelete = () => {
    deleteTourPackage(tourPackage.id);
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
      case "Eliminar":
        // console.log("Eliminar::: ");
        handleClickDelete();
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
    </>
  );
};
export default TourPackageCardContainer;
