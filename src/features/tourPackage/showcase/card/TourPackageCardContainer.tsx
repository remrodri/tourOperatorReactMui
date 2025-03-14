import { useState } from "react";
import { TourPackageType } from "../../types/TourPackageType";
import TourPackageCard from "./TourPackageCard";
import TourPackageformContainer from "../../tourPackageForm/TourPackageFormContainer";

interface TourPackageCardContainerProps {
  tourPackage: TourPackageType;
}

const TourPackageCardContainer: React.FC<TourPackageCardContainerProps> = ({
  tourPackage,
}) => {
  const BASE_URL = "http://localhost:3000";
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOption = (option: string) => {
    switch (option) {
      case "Ver mas":
        console.log("ver mas::: ");
        break;
      case "Editar":
        console.log("Editar::: ");
        // console.log("tourPackage being edited:", tourPackage);
        // console.log("selectedDates:", tourPackage.selectedDates);
        handleClick();
        break;
      case "Eliminar":
        console.log("Eliminar::: ");
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
        <>
          {/* {console.log("Rendering TourPackageFormContainer with:", tourPackage)}
          {console.log("selectedDates before passing to form:", tourPackage.selectedDates)} */}
          <TourPackageformContainer
            open={open}
            handleClick={handleClick}
            tourPackage={tourPackage}
          />
        </>
      )}
    </>
  );
};
export default TourPackageCardContainer;
