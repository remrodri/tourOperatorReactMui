import { Box, Typography } from "@mui/material";
import TourType from "./TourType";
import { useState } from "react";
import { useTourTypeContext } from "../userManagement/context/TourTypeContext";

const TourTypeContainer = () => {
  const { tourTypes } = useTourTypeContext();
  // const [open, setOpen] = useState(false);
  // const handleClick = () => {
  //   console.log("click::: ");
  //   setOpen(!open);
  // };

  return <TourType />;
};
export default TourTypeContainer;
