import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
// import { User } from "../../types/User";
// import { Role } from "../../types/Role";
// import TextType from "../../../../TextAnimations/TextType/TextType";
import { Close } from "@mui/icons-material";
import TextType from "../../../TextAnimations/TextType/TextType";
import { TouristType } from "../../booking/types/TouristType";
import dayjs from "dayjs";

interface MoreInfoDialogProps {
  open: boolean;
  handleClose: () => void;
  tourist: TouristType;
  // user: User;
  // userRole: Role;
}

const MoreInfoDialog: React.FC<MoreInfoDialogProps> = ({
  open,
  handleClose,
  // user,
  // userRole,
  tourist,
}) => {
  // console.log("user::: ", user);
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "rgba(46, 46, 46, 0.7)",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(37, 37, 37, 0.5)",
        },
      }}
    >
      <DialogTitle>
        <TextType
          text="Información del turista"
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="_"
        />
      </DialogTitle>
      <IconButton
        autoFocus
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
        }}
      >
        <Close />
      </IconButton>
      <DialogContent
        dividers
        sx={{ display: "flex", flexDirection: "column", width: "400px" }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "center", p: " 0 0 20px 0" }}
        >
          {/* <Avatar
            variant="rounded"
            sx={{ height: "150px", width: "150px" }}
            src={user.imageUrl}
          /> */}
        </Box>
        <Box>
          <Box>Nombre(s):</Box>
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            {tourist.firstName}
          </Typography>
        </Box>
        <Box>
          <Box>Apellidos:</Box>
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            {tourist.lastName}
          </Typography>
        </Box>
        <Box>
          <Box>Celular</Box>
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            {tourist.phone}
          </Typography>
        </Box>
        <Box>
          <Box>Correo electronico:</Box>{" "}
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            {tourist.email}
          </Typography>
        </Box>
        <Box>
          <Box>Documento:</Box>{" "}
          {tourist.documentType === "ci" ? (
            <Typography sx={{ display: "flex", justifyContent: "center" }}>
              {`Ci: ${tourist.ci}`}
            </Typography>
          ) : (
            <Typography sx={{ display: "flex", justifyContent: "center" }}>
              {`Pasaporte: ${tourist.passportNumber}`}
            </Typography>
          )}
        </Box>
        <Box>
          <Box>Nacionalidad:</Box>{" "}
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            {tourist.nationality}
          </Typography>
        </Box>

        <Box>
          <Box>Edad</Box>
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            {dayjs().diff(dayjs(tourist.dateOfBirth, "DD/MM/YYYY"), "year")}
          </Typography>
        </Box>
      </DialogContent>
      <Box sx={{ p: "20px 15px", display: "flex", justifyContent: "center" }}>
        <Button onClick={handleClose} variant="contained" fullWidth>
          Cerrar
        </Button>
      </Box>
    </Dialog>
  );
};
export default MoreInfoDialog;
