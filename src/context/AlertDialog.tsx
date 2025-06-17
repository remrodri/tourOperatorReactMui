import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Button } from "@mui/material";

interface AlertDialogProps{
    open:boolean;
    onClose:()=>void;
    title:string;
    message:string;
    severity:"success" | "error" | "warning" | "info";
}

const AlertDialog:React.FC<AlertDialogProps>=({open,onClose,title,message,severity})=>{
    return(
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <Alert severity={severity} variant="filled" sx={{width:"100%"}}>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </Alert>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color={severity} variant="contained">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog;
