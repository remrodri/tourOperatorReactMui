import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Fade ref={ref} {...props} />;
});

interface DialogAlertProps {
    open: boolean;
    onClose: () => void;
    title: string;
    message: string;
    severity: "error" | "warning" | "info" | "success";
}

const DialogAlert: React.FC<DialogAlertProps> = ({ open, onClose, title, message, severity = "error" }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
            <Alert severity={severity}
            // sx={{
            //   background: "rgba(172, 33, 33, 0.45)",
            // }}
            variant="filled"
            >
                <DialogContentText id="alert-dialog-description"
                
                >
                    {message}
                </DialogContentText>
            </Alert>
            </DialogContent>
            <DialogActions>
                <Button 
                variant="contained"
                color="primary"
                onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};
export default DialogAlert;