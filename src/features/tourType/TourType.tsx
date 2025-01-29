import { Box, Button, Typography } from "@mui/material";
import BreadCrumbsContainer from "../breadCrumbs/BreadCrumbsContainer";
import React, { useState } from "react";
import { useTourTypeContext } from "../userManagement/context/TourTypeContext";
import CreateTourTypeDialog from "./createTourTypeDialog/CreateTourTypeDialog";
import CreateTourTypeDialogContainer from "./createTourTypeDialog/CreateTourTypeDialogContainer";

// interface TourTypeProps {
//   handleClick: () => void;
//   open:boolean;
// }

const TourType: React.FC = () => {
  const { openDialog, handleClick } = useTourTypeContext();
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
          {openDialog && <CreateTourTypeDialogContainer />}
        </Box>
      </Typography>
      <Box
        sx={{
          height: "90%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          overflowY: "auto",
          gap: "0.4rem",
        }}
      ></Box>
    </Box>
  );
};
export default TourType;
