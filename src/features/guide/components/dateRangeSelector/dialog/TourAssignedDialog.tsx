import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DialogTextProps {
  open: boolean;
  onClose: () => void;
}

export const TourAssignedDialog: React.FC<DialogTextProps> = ({
  open,
  onClose,
  // disableBackdropClose = false,
}) => {
  const handleClose = () => {
    // Si quieres impedir cerrar al clickear fuera o con ESC:
    // if (
    //   disableBackdropClose &&
    //   (reason === "backdropClick" || reason === "escapeKeyDown")
    // ) {
    //   return;
    // }
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="tour-assigned-dialog-title"
    >
      <DialogTitle id="tour-assigned-dialog-title" sx={{ pr: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Aviso
          </Typography>

          {/* X arriba a la derecha */}
          <IconButton
            aria-label="cerrar"
            onClick={() => onClose?.()}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Typography>Elige un tour asignado para habilitar tu menú</Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={() => onClose?.()}>
          Entiendo
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default TourAssignedDialog;
