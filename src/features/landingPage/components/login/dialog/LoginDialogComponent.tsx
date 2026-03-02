import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  SlideProps,
  Typography,
} from "@mui/material";
import LoginFormContainer from "../../../../auth/components/login/LoginFormContainer";
import { RoleProvider } from "../../../../Role/context/RoleContext";
import { forwardRef } from "react";
import { Close } from "@mui/icons-material";
import TextType from "../../../../../TextAnimations/TextType/TextType";

interface LoginDialogComponentProps {
  open: boolean;
  onClose: () => void;
}

const Transition = forwardRef<unknown, SlideProps>(
  function Transition(props, ref) {
    const { in: inProp, ...other } = props;

    return <Slide in={inProp} direction="up" ref={ref} {...other} />;
  },
);

const LoginDialogComponent = ({ open, onClose }: LoginDialogComponentProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      sx={{
        // overflowY: "auto",
        "& .MuiDialog-paper": {
          // width: "60rem",
          // height: "30rem",
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.66)",
            border: "1px solid rgba(0, 0, 0, 0.5)",
            height: "28rem",
            // width: { md: "60rem" },
            boxShadow: "0 4px 30px rgba(17, 17, 17, 0.8)",
            borderRadius: "15px",
            // background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(5px)",
            // p: "1rem",
          },
        },
      }}
    >
      <DialogContent
        // sx={{
        //   // width: "40rem",
        //   // height: "20rem",
        //   backgroundColor: "rgba(0, 0, 0, 0.45)",
        //   padding: "0",
        //   display: "flex",
        //   // overflowY: "auto",
        // }}
      >
        {/* <Gallery /> */}
        <Box
          // sx={{
          //   backgroundColor: "rgba(0, 0, 0, 0.55)",
          //   // width: { xs: "100%", md: "50%" },
          //   height: "100%",
          //   // borderRadius: "6px",
          //   backdropFilter: "blur(10px)",
          //   overflowY: "auto",
          // }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontSize: "2rem",
              fontWeight: "500",
              height: "7rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextType
              text="Iniciar sesión"
              typingSpeed={50}
              pauseDuration={1000}
              showCursor={true}
              cursorCharacter="_"
              deletingSpeed={50}
            />
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
          <RoleProvider>
            <LoginFormContainer />
          </RoleProvider>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialogComponent;
