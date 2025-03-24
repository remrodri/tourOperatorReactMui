import { Box, Typography } from "@mui/material";
import TourPackageShowcase from "./TourPackageShowcase";
import { useState } from "react";
import TourPackageformContainer from "../tourPackageForm/TourPackageFormContainer";
import { useTourPackageContext } from "../context/TourPackageContext";

const TourPackageShowcaseContainer: React.FC = () => {
  const { tourPackages } = useTourPackageContext();
  const [open, setOpen] = useState(false);
  const handleClickForm = () => {
    setOpen(!open);
  };
  console.log('tourPackages::: ', tourPackages);
  return (
    <>
      <TourPackageShowcase
        handleClick={handleClickForm}
        tourPackages={tourPackages}
      />
      {open && (
        <TourPackageformContainer open={open} handleClick={handleClickForm} />
      )}
    </>
  );
};
export default TourPackageShowcaseContainer;
