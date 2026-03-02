import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { TouristDestinationType } from "../../../../touristDestination/types/TouristDestinationType";
import { Close } from "@mui/icons-material";
import { TourPackageType } from "../../../../tourPackage/types/TourPackageType";
import DialogCardContainer from "./card/DialogCardContainer";

import { forwardRef } from "react";
import Slide, { type SlideProps } from "@mui/material/Slide";
import { ENV } from "../../../../../config/env";

const Transition = forwardRef<unknown, SlideProps>(
  function Transition(props, ref) {
    const { in: inProp, ...other } = props;

    return <Slide in={inProp} direction="up" ref={ref} {...other} />;
  },
);

interface DialogProps {
  open: boolean;
  onClose: () => void;
  touristDestination: TouristDestinationType;
  tourPackagesByTouristDestinationId: TourPackageType[];
}

// const BASE_URL = "http://localhost:3000";
const BASE_URL = ENV.API_BASE_URL;

const DialogComponent: React.FC<DialogProps> = ({
  open,
  onClose,
  touristDestination,
  tourPackagesByTouristDestinationId,
}) => {
  const firstImage = touristDestination.images[0];

  const backgroundImageUrl =
    typeof firstImage === "string" && `${BASE_URL}${firstImage}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      sx={{
        // overflowY: "auto",
        "& .MuiDialog-paper": {
          // width: "60rem",
          height: "30rem",
          // overflowY: "auto",
          // borderRadius: "10px",
          // border: "none",
          // padding:"1rem"
        },
      }}
      slots={{
        transition: Transition,
      }}
      slotProps={{
        transition: {
          timeout: { enter: 300, exit: 300 },
          // onExited: onClose,
          easing: {
            enter: "ease-out",
            exit: "ease-in",
          },
        },
        paper: {
          sx: {
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            // width: "60rem",
            // height: "30rem",
            borderRadius: "10px",
            // overflowY: "auto",
          },
        },
      }}
    >
      <DialogContent
        sx={{
          // width: "40rem",
          // height: "20rem",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          padding: "0",
          display: "flex",
          // overflowY: "auto",
        }}
      >
        <Box
          sx={{
            width: "30%",
            height: "100%",
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 1)",
            backdropFilter: "blur(5px)",
            // backgroundImage: `url(${BASE_URL}${touristDestination.images[0]})`,
            // backgroundSize: "cover",
            // backgroundPosition: "center",
            // backgroundRepeat: "no-repeat",
            // backgroundImage: `url(${BASE_URL}${touristDestination.images[0]})`,
            // backgroundSize: "cover",
            // backgroundPosition: "center",
            // backgroundRepeat: "no-repeat",
            // display:{md: "none"}
          }}
        >
          <img
            src={
              typeof touristDestination.images[0] === "string"
                ? BASE_URL + touristDestination.images[0]
                : "tourist-destination-image"
            }
            alt="tourist-destination-image"
          />
        </Box>
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            width: { xs: "100%", md: "70%" },
            height: "100%",
            // borderRadius: "6px",
            backdropFilter: "blur(10px)",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              padding: "1rem",
              fontWeight: "500",
              fontFamily: "Montserrat",
            }}
          >
            {touristDestination.name}
          </Typography>
          <IconButton
            autoFocus
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
            }}
          >
            <Close />
          </IconButton>
          <Typography
            variant="body1"
            sx={{ padding: "1rem", fontWeight: "light", fontFamily: "Roboto" }}
          >
            {touristDestination.description}
          </Typography>
          <Typography
            variant="h6"
            sx={{ padding: "1rem", fontFamily: "Montserrat" }}
          >
            Paquetes para este destino
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              px: "1rem",
            }}
          >
            {tourPackagesByTouristDestinationId.map((tourPackage) => (
              <DialogCardContainer
                key={tourPackage.id}
                tourPackage={tourPackage}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default DialogComponent;
