import {
  Box,
  // AppBar,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  // Toolbar,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement } from "react";
// import CloseIcon from "@mui/icons-material/Close";
import { TouristDestinationType } from "../../../../touristDestination/types/TouristDestinationType";
import { Close } from "@mui/icons-material";
import { Ref } from "react";
import { TourPackageType } from "../../../../tourPackage/types/TourPackageType";
import DialogCardContainer from "./card/DialogCardContainer";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogProps {
  open: boolean;
  onClose: () => void;
  touristDestination: TouristDestinationType;
  tourPackagesByTouristDestinationId: TourPackageType[];
}

const BASE_URL = "http://localhost:3000";

const DialogComponent: React.FC<DialogProps> = ({
  open,
  onClose,
  touristDestination,
  tourPackagesByTouristDestinationId,
}) => {
  console.log("touristDestination::: ", touristDestination);
  // console.log("::: ", tourPackagesByTouristDestinationId);
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
      // fullScreen
      // maxWidth="md"
      // slots={{
      //   transition: Transition,
      // }}
      TransitionComponent={Transition}
      TransitionProps={{
        timeout: 300,
        onExited: onClose,
      }}
      PaperProps={{
        sx: {
          backgroundImage: `url(${BASE_URL}${touristDestination.images[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // width: "60rem",
          // height: "30rem",
          borderRadius: "10px",
          // overflowY: "auto",
        },
      }}
    >
      {/* <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="end" color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {touristDestination.name}
          </Typography>
        </Toolbar>
      </AppBar> */}
      {/* <DialogTitle
        sx={{
          background: "rgba(0, 0, 0, 0.45)",
          // borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          // border: "1px solid rgba(0, 0, 0, 0.45)",
          display: "flex",
          gap: "1rem",
          // border: "none",
          borderBottom: "1px solid rgba(70, 88, 109, 0.48)",
          // height: "3rem",
        }}
      >
        <Typography sx={{ alignContent: "center" }} variant="h6">
          {touristDestination.name}
        </Typography>
      </DialogTitle> */}
      {/* <IconButton
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
      </IconButton> */}
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
            display: {xs:"none", md:"flex"},
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
                : // : URL.createObjectURL(touristDestination.images[0])
                  ""
            }
            alt=""
            // style={{
            //   width: "100%",
            //   height: "100%",
            // }}
          />
        </Box>
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            width: {xs:"100%", md:"70%"},
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
