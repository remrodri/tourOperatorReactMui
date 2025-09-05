import { Box, Typography } from "@mui/material";
import TourType from "./TourTypeShowcase";
import { useState } from "react";
import { useTourTypeContext } from "../../context/TourTypeContext";
import TourTypeShowcase from "./TourTypeShowcase";
import CreateTourTypeDialogContainer from "../createTourTypeDialog/CreateTourTypeDialogContainer";

const TourTypeShowcaseContainer = () => {
  // const { tourTypes } = useTourTypeContext();
  // console.log('tourTypes::: ', tourTypes);
  // const [open, setOpen] = useState(false);
  // const handleClick = () => {
  //   console.log("click::: ");
  //   setOpen(!open);
  // };
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  // console.log('::: ', );
  return (
    <>
      <TourTypeShowcase handleClick={handleClick} />
      {open && (
        <CreateTourTypeDialogContainer open={open} handleClick={handleClick} />
      )}
    </>
  );
};
export default TourTypeShowcaseContainer;
