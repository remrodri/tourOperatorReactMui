import { useState } from "react";
import TouristDestinationShowcase from "./TouristDestinationShowcase";
import TouristDestinationFormContainer from "../touristDestinationForm/TouristDestinationFormContainer";

const TouristDestinationShowcaseContainer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <TouristDestinationShowcase handleClick={handleClick}/>
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
