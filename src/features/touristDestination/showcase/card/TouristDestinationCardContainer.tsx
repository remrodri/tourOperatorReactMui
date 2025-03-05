import { useState } from "react";
import TouristDestinationCard from "./TouristDestinationCard";
import TouristDestinationFormContainer from "../../touristDestinationForm/TouristDestinationFormContainer";
import { useTouristDestinationContext } from "../../context/TouristDestinationContext";

interface TouristDestinationCardContainerProps {
  touristDestination: any;
}

const TouristDestinationCardContainer: React.FC<
  TouristDestinationCardContainerProps
> = ({ touristDestination }) => {
  const [open, setOpen] = useState(false);
  const { deleteTouristDestination } = useTouristDestinationContext();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOption = (option: string) => {
    if (option === "Eliminar") {
      console.log("Eliminar::: ");
      deleteTouristDestination(touristDestination.id);
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
