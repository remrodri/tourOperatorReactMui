import { Box, Button, Fade, Grow, Typography } from "@mui/material";
import BreadCrumbsContainer from "../../../breadCrumbs/BreadCrumbsContainer";
import React, { useState } from "react";
import { useTourTypeContext } from "../../context/TourTypeContext";
import CreateTourTypeDialog from "../tourTypeForm/CreateTourTypeDialog";
import CreateTourTypeDialogContainer from "../tourTypeForm/CreateTourTypeDialogContainer";
import TourTypeCard from "./tourTypeCard/card/TourTypeCard";
import TextType from "../../../../TextAnimations/TextType/TextType";
import { getCurrentUserRole } from "../../../../utils/helpers/roleHelper";

interface TourTypeShowcaseProps {
  handleClick: () => void;
  role: string;
  // open:boolean;
}

const TourTypeShowcase: React.FC<TourTypeShowcaseProps> = ({
  handleClick,
  role,
}) => {
  // const { openDialog, handleClick, tourTypes } = useTourTypeContext();
  const { openDialog, tourTypes } = useTourTypeContext();

  return (
    // <Fade in={true} timeout={1000}>
      <Box
        sx={
          {
            // flexGrow: 1,
            // display: "flex",
            // flexDirection: "column",
          }
        }
      >
        <Typography
          variant="h4"
          sx={{
            // height: "5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: "1rem 1.5rem 0 1.5rem",
          }}
        >
          {/* <BreadCrumbsContainer /> */}
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextType
              text={"Tipos de tour"}
              typingSpeed={50}
              pauseDuration={1000}
              showCursor={true}
              cursorCharacter="_"
              deletingSpeed={50}
            />
            {role === "690cbf7c64756dcc541d8a19" && (
              <Button
                variant="contained"
                sx={{ height: "2rem", width: "12rem" }}
                onClick={handleClick}
              >
                Nuevo
              </Button>
            )}
            {/* {openDialog && <CreateTourTypeDialogContainer/>} */}
          </Box>
        </Typography>
        <Box
          sx={{
            // height: "calc(100% - 5rem)",
            display: "flex",
            p: "20px",
          }}
        >
          <Box
            sx={{
              // pt: "30px",
              p: "20px",
              // flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignContent: "flex-start",
              flexWrap: "wrap",
              overflowY: "auto",
              gap: "1rem",
              // background: "rgba(255, 255, 255, 0.2)",
              background: "rgba(0, 0, 0, 0.44)",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
              // backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0.5)",
              height: "calc(100dvh - 12.8rem)",
              width: "100%",
            }}
          >
            {tourTypes && tourTypes.length > 0 ? (
              tourTypes.map((tourType, index) => (
                // <TourTypeCard
                //   key={tourType.id}
                //   tourType={tourType}
                //   role={role}
                // />

                <Grow
                  in={true} // o una condición si quieres mostrar/ocultar
                  style={{ transformOrigin: "0 0 0" }}
                  timeout={500 + index * 300} // cada card entra con más delay
                  key={tourType.id}
                >
                  <Box>
                    <TourTypeCard
                      key={tourType.id}
                      tourType={tourType}
                      role={role}
                    />
                  </Box>
                </Grow>
              ))
            ) : (
              <p>No hay tipos de tour registrados</p>
            )}
          </Box>
        </Box>
      </Box>
    // </Fade>
  );
};
export default TourTypeShowcase;
