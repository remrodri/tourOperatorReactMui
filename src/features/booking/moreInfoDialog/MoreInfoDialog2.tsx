import { Close } from "@mui/icons-material";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Slide } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, Ref, useEffect, useState } from "react";

interface MoreInfoDialog2Props {
    open: boolean;
    handleClose: () => void;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const MoreInfoDialog2: React.FC<MoreInfoDialog2Props> = ({open, handleClose}) => {
  const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setIsOpen(open);
    }, [open]);

    const handleCloseWithTransition = () => {
      setIsOpen(false);
      setTimeout(() => {
        handleClose();
      }, 300);
    };

    return (
        <Dialog 
        fullScreen
        open={isOpen} 
        onClose={handleCloseWithTransition}
        TransitionComponent={Transition}
        TransitionProps={{
          timeout: 300,
          onExited: handleClose,
        }}
        >
          <DialogTitle>Detalle de la reserva</DialogTitle>
          <IconButton
            autoFocus
            aria-label="close"
            onClick={handleCloseWithTransition}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
          <DialogContent dividers>
            <Box>
              contenido
            </Box>
          </DialogContent>
        </Dialog>
    )
}
export default MoreInfoDialog2
