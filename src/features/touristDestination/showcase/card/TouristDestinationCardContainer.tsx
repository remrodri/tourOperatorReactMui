import { useState } from "react";
import TouristDestinationCard from "./TouristDestinationCard";
import TouristDestinationFormContainer from "../../touristDestinationForm/TouristDestinationFormContainer";

interface TouristDestinationCardContainerProps {
  touristDestination: any;
}

const TouristDestinationCardContainer: React.FC<
  TouristDestinationCardContainerProps
> = ({ touristDestination }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOption = (option: string) => {
    if (option === "Eliminar") {
      console.log("Eliminar::: ");
    }
    if (option === "Editar") {
      console.log("Editar::: ");
      handleClick();
    }
    if (option === "Ver galeria") {
      console.log("more");
    }
  };

  return (
    <>
      <TouristDestinationCard
        touristDestination={touristDestination}
        handleOption={handleOption}
      />
      {open && (
        <TouristDestinationFormContainer
          open={open}
          handleClick={handleClick}
          touristDestination={touristDestination}
        />
      )}
    </>
  );
};
export default TouristDestinationCardContainer;
