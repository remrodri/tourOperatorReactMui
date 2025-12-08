import { Box, Fade } from "@mui/material";
import { getCurrentUserRole } from "../../../../utils/helpers/roleHelper";

import { useTouristContext } from "../../context/TouristContext";
import TouristShowcase from "./TouristShowcase";

const BookingShowcaseContainer: React.FC = () => {
  const role = getCurrentUserRole();
  const { tourists } = useTouristContext();

  return (
    <>
      <TouristShowcase tourists={tourists} role={role} />
    </>
  );
};
export default BookingShowcaseContainer;
