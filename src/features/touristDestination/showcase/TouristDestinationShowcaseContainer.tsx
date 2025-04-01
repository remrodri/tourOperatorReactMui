import { useState } from "react";
import TouristDestinationShowcase from "./TouristDestinationShowcase";
import TouristDestinationFormContainer from "../touristDestinationForm/TouristDestinationFormContainer";
import { useTouristDestinationContext } from "../context/TouristDestinationContext";

const TouristDestinationShowcaseContainer: React.FC = () => {
  const { touristDestinations } = useTouristDestinationContext();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <TouristDestinationShowcase
        handleClick={handleClick}
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
