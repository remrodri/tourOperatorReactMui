import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { User } from "../../types/User";
import { Role } from "../../types/Role";

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
  console.log("user::: ", user);
  return (
    <Dialog onClose={handleMoreInfoClick} open={open}>
      <DialogTitle>Informacion</DialogTitle>
      <DialogContent
        dividers
        sx={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", p: " 0 0 20px 0" }}>
          <Avatar
            variant="rounded"
            sx={{ height: "150px", width: "150px" }}
            src={user.imageUrl}
          />
        </Box>
        <Typography>
          <Box>Nombre(s):</Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {user.firstName}
          </Box>
        </Typography>
        <Typography>
          <Box>Apellidos:</Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {user.lastName}
          </Box>
        </Typography>
        <Typography>
          <Box>Rol:</Box>{" "}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {userRole.name}
          </Box>
        </Typography>
        <Typography>
          <Box>Ci:</Box>{" "}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {user.ci}
          </Box>
        </Typography>
        <Typography sx={{ display: "flex", flexDirection: "column" }}>
          <Box>Correo Electronico:</Box>{" "}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {user.email}
          </Box>
        </Typography>
        <Typography sx={{ display: "flex", flexDirection: "column" }}>
          <Box>Telefono</Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {user.phone}
          </Box>
        </Typography>
        <Typography sx={{ display: "flex", flexDirection: "column" }}>
          <Box>Direccion</Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {user.address}
          </Box>
        </Typography>
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
