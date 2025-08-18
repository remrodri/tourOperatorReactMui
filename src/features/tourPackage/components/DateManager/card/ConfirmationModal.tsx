import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface ConfirmationModalProps {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  option: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  handleClose,
  onConfirm,
  option,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6">Confirmar</Typography>
        <Typography sx={{ mt: 2 }}>
          ¿Estás seguro de marcar como <b>{option}</b> este paquete?
        </Typography>
        <Box
          sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          <Button variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Confirmar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};


export default ConfirmationModal;
