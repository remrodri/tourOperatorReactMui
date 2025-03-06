import { Box, Typography } from "@mui/material";
import TourPackageShowcase from "./TourPackageShowcase";
import { useState } from "react";
import TourPackageformContainer from "../tourPackageForm/TourPackageFormContainer";

const TourPackageShowcaseContainer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClickForm = () => {
    setOpen(!open);
  };
  return (
    <>
      <TourPackageShowcase handleClick={handleClickForm} />
      {open && (
        <TourPackageformContainer open={open} handleClick={handleClickForm} />
      )}
    </>
  );
};
export default TourPackageShowcaseContainer;
