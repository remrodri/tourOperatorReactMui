import { useState } from "react";
import TouristDestinationShowcase from "./TouristDestinationShowcase";
import TouristDestinationFormContainer from "../touristDestinationForm/TouristDestinationFormContainer";
import { useTouristDestinationContext } from "../context/TouristDestinationContext";

const TouristDestinationShowcaseContainer: React.FC = () => {
  const { BASE_URL, touristDestinations } = useTouristDestinationContext();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <TouristDestinationShowcase
        handleClick={handleClick}
        BASE_URL={BASE_URL}
        touristDestinations={touristDestinations}
      />
      {open && (
        <TouristDestinationFormContainer
          open={open}
          handleClick={handleClick}
        />
      )}
    </>
  );
};
export default TouristDestinationShowcaseContainer;
