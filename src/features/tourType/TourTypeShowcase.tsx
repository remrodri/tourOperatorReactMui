import { Box, Button, Typography } from "@mui/material";
import BreadCrumbsContainer from "../breadCrumbs/BreadCrumbsContainer";
import React, { useState } from "react";
import { useTourTypeContext } from "../../context/TourTypeContext";
import CreateTourTypeDialog from "./createTourTypeDialog/CreateTourTypeDialog";
import CreateTourTypeDialogContainer from "./createTourTypeDialog/CreateTourTypeDialogContainer";
import TourTypeCard from "./tourTypeCard/card/TourTypeCard";

interface TourTypeShowcaseProps {
  handleClick: () => void;
  // open:boolean;
}

const TourTypeShowcase: React.FC<TourTypeShowcaseProps> = ({ handleClick }) => {
  // const { openDialog, handleClick, tourTypes } = useTourTypeContext();
  const { openDialog, tourTypes } = useTourTypeContext();

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          height: "10%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: "0 0 0 1.5rem",
        }}
      >
        <BreadCrumbsContainer />
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          Tipos de tour
          <Button
            variant="contained"
            sx={{ height: "2rem", width: "12rem" }}
            onClick={handleClick}
          >
            Nuevo
          </Button>
          {/* {openDialog && <CreateTourTypeDialogContainer/>} */}
        </Box>
      </Typography>
      <Box
        sx={{
          height: "90%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          overflowY: "auto",
          gap: "1rem",
          pt: "2rem",
        }}
      >
        {tourTypes && tourTypes.length > 0 ? (
          tourTypes.map((tourType) => (
            <TourTypeCard key={tourType.id} tourType={tourType} />
          ))
        ) : (
          <p>No hay tipos de tour registrados</p>
        )}
      </Box>
    </Box>
  );
};
export default TourTypeShowcase;
