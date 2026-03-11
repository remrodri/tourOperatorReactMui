import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { forwardRef } from "react";
import Slide, { SlideProps } from "@mui/material/Slide";

import { TouristDestinationType } from "../../../../touristDestination/types/TouristDestinationType";
import { TourPackageType } from "../../../../tourPackage/types/TourPackageType";
import DialogCardContainer from "./card/DialogCardContainer";
import { ENV } from "../../../../../config/env";

const BASE_URL = ENV.API_BASE_URL;

/* -------------------------------------------------------------------------------------------------
 * Transition
 * -----------------------------------------------------------------------------------------------*/

const Transition = forwardRef<unknown, SlideProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  },
);

/* -------------------------------------------------------------------------------------------------
 * Props
 * -----------------------------------------------------------------------------------------------*/

interface DialogProps {
  open: boolean;
  onClose: () => void;
  touristDestination: TouristDestinationType;
  tourPackagesByTouristDestinationId: TourPackageType[];
}

/* -------------------------------------------------------------------------------------------------
 * Component
 * -----------------------------------------------------------------------------------------------*/

const DialogComponent: React.FC<DialogProps> = ({
  open,
  onClose,
  touristDestination,
  tourPackagesByTouristDestinationId,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const firstImage = touristDestination.images[0];
  const backgroundImageUrl =
    typeof firstImage === "string" ? `${BASE_URL}${firstImage}` : undefined;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="lg"
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          height: isMobile ? "100%" : "32rem",
          overflow: "hidden",
          backgroundImage: !isMobile ? `url(${backgroundImageUrl})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      }}
    >
      {/* HERO IMAGE (mobile only) */}
      {isMobile && backgroundImageUrl && (
        <Box
          sx={{
            height: 220,
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              bgcolor: "rgba(0,0,0,0.6)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            }}
          >
            <Close />
          </IconButton>
        </Box>
      )}

      <DialogContent
        sx={{
          p: 0,
          display: "flex",
          height: "100%",
          backgroundColor: isMobile ? "background.default" : "rgba(0,0,0,0.45)",
        }}
      >
        {/* LEFT IMAGE (desktop only) */}
        {!isMobile && (
          <Box
            sx={{
              width: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backdropFilter: "blur(6px)",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            <img
              src={backgroundImageUrl}
              alt={touristDestination.name}
              style={{
                width: "90%",
                borderRadius: 12,
                objectFit: "cover",
              }}
            />
          </Box>
        )}

        {/* CONTENT */}
        <Box
          sx={{
            width: { xs: "100%", md: "70%" },
            height: "100%",
            overflowY: "auto",
            backdropFilter: !isMobile ? "blur(10px)" : "none",
            bgcolor: !isMobile ? "rgba(0,0,0,0.55)" : "background.paper",
          }}
        >
          {!isMobile && (
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                color: "white",
              }}
            >
              <Close />
            </IconButton>
          )}

          <Typography
            variant="h5"
            sx={{
              p: 2,
              fontWeight: 600,
              fontFamily: "Montserrat",
            }}
          >
            {touristDestination.name}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              px: 2,
              pb: 2,
              opacity: 0.9,
            }}
          >
            {touristDestination.description}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              px: 2,
              pb: 1,
              fontFamily: "Montserrat",
            }}
          >
            Paquetes disponibles
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              px: 2,
              pb: 3,
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
