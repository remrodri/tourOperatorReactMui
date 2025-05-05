import { Box, Button, Typography } from "@mui/material";
import BreadCrumbsContainer from "../breadCrumbs/BreadCrumbsContainer";
import React, { useState } from "react";
import { useTourTypeContext } from "./context/TourTypeContext";
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
    <Box
      sx={{
        flexGrow:1,
        display: "flex",
        flexDirection:"column"
      }}
    >
      <Typography
        variant="h4"
        sx={{
          height: "5rem",
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
          height: "calc(100% - 5rem)",
          display: "flex",
          p: "20px",
        }}
      >
        <Box
          sx={{
            pt: "30px",
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignContent: "flex-start",
            flexWrap: "wrap",
            overflowY: "auto",
            gap: "1rem",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(255, 255, 255,0.2)",
            // backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
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
    </Box>
  );
};
export default TourTypeShowcase;
