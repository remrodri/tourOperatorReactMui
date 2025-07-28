import { useState } from "react";
import TouristDestinationShowcase from "./TouristDestinationShowcase";
import TouristDestinationFormContainer from "../touristDestinationForm/TouristDestinationFormContainer";
import { useTouristDestinationContext } from "../context/TouristDestinationContext";
import { Box, Fade } from "@mui/material";

const TouristDestinationShowcaseContainer: React.FC = () => {
  const { touristDestinations } = useTouristDestinationContext();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Fade in={true} timeout={1000}>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <TouristDestinationShowcase
            handleClick={handleClick}
            touristDestinations={touristDestinations}
          />
        </Box>
      </Fade>
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
