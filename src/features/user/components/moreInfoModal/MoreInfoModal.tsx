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
import { User } from "../../types/User";
import { Role } from "../../types/Role";
import TextType from "../../../../TextAnimations/TextType/TextType";
import { Close } from "@mui/icons-material";

interface MoreInfoModalProps {
  open: boolean;
  handleMoreInfoClick: () => void;
  user: User;
  userRole: Role;
}

const MoreInfoModal: React.FC<MoreInfoModalProps> = ({
  open,
  handleMoreInfoClick,
  user,
  userRole,
}) => {
  // console.log("user::: ", user);
  return (
    <Dialog
      onClose={handleMoreInfoClick}
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
          text="Información"
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="_"
        />
      </DialogTitle>
      <IconButton
              autoFocus
              aria-label="close"
              onClick={handleMoreInfoClick}
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
          <Avatar
            variant="rounded"
            sx={{ height: "150px", width: "150px" }}
            src={user.imageUrl}
          />
        </Box>
        <Box>
          <Box>Nombre(s):</Box>
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            {user.firstName}
          </Typography>
        </Box>
        <Box>
          <Box>Apellidos:</Box>
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            {user.lastName}
          </Typography>
        </Box>
        <Box>
          <Box>Rol:</Box>{" "}
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            {userRole.name}
          </Typography>
        </Box>
        <Box>
          <Box>Ci:</Box>{" "}
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            {user.ci}
          </Typography>
        </Box>
        <Box>
          <Box>Correo Electronico:</Box>{" "}
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            {user.email}
          </Typography>
        </Box>
        <Box>
          <Box>Telefono</Box>
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            {user.phone}
          </Typography>
        </Box>
        <Box>
          <Box>Direccion</Box>
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            {user.address}
          </Typography>
        </Box>
      </DialogContent>
      <Box sx={{ p: "20px 15px", display: "flex", justifyContent: "center" }}>
        <Button onClick={handleMoreInfoClick} variant="contained" fullWidth>
          Cerrar
        </Button>
      </Box>
    </Dialog>
  );
};
export default MoreInfoModal;
