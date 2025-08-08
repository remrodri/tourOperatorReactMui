import { Box, Fade, Typography } from "@mui/material";
import TourPackageShowcase from "./TourPackageShowcase";
import { useState } from "react";
import TourPackageformContainer from "../tourPackageForm/TourPackageFormContainer";
import { useTourPackageContext } from "../../context/TourPackageContext";

const TourPackageShowcaseContainer: React.FC = () => {
  const { tourPackages } = useTourPackageContext();
  const [open, setOpen] = useState(false);
  const handleClickForm = () => {
    setOpen(!open);
  };
  // console.log('tourPackages::: ', tourPackages);
  // console.log('tourPackages::: ', tourPackages);
  return (
    <>
      <Fade in={true} timeout={1000}>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <TourPackageShowcase
            handleClick={handleClickForm}
            tourPackages={tourPackages}
          />
        </Box>
      </Fade>
      {open && (
        <TourPackageformContainer open={open} handleClick={handleClickForm} />
      )}
    </>
  );
};
export default TourPackageShowcaseContainer;
