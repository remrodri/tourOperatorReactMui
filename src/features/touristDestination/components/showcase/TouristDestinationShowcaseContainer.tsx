import { useState } from "react";
import TouristDestinationShowcase from "./TouristDestinationShowcase";
import TouristDestinationFormContainer from "../touristDestinationForm/TouristDestinationFormContainer";
import { useTouristDestinationContext } from "../../context/TouristDestinationContext";
import { Box, Fade } from "@mui/material";
import { getCurrentUserRole } from "../../../../utils/helpers/roleHelper";

const TouristDestinationShowcaseContainer: React.FC = () => {
  const { touristDestinations } = useTouristDestinationContext();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const role = getCurrentUserRole();
  return (
    <>
      {/* <Fade in={true} timeout={1000}> */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <TouristDestinationShowcase
            handleClick={handleClick}
            touristDestinations={touristDestinations}
            role={role}
          />
        </Box>
      {/* </Fade> */}
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
