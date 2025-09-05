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
  handleClick: () => void;
  handleClickCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  handleClick,
  handleClickCancel,
}) => {

  return (
      <Modal
        open={open}
        onClose={handleClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirmar
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ¿Estas seguro de cancelar esta reserva?
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Cancelar
            </Button>
            <Button variant="contained" color="error" onClick={handleClickCancel}>
              Confirmar
            </Button>
          </Box>
        </Box>
      </Modal>
  );
}

export default ConfirmationModal;
