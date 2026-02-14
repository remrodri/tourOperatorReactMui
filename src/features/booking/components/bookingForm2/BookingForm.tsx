/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, Ref, useEffect, useState } from "react";
import background from "../../../../assets/images/home.webp";
import TextType from "../../../../TextAnimations/TextType/TextType";
import { BookingType } from "../../types/BookingType";
import { Close } from "@mui/icons-material";

interface BookingFormProps {
  open: boolean;
  handleClose: () => void;
  isEditing: boolean;
  booking: BookingType | null;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BookingForm: React.FC<BookingFormProps> = ({
  open,
  handleClose,
  isEditing,
  booking,
}: BookingFormProps) => {

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
      TransitionProps={{ timeout: 300, onExited: handleClose }}
      PaperProps={{
        sx: {
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "rgba(0, 0, 0, 0.45)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 0, 0, 0.45)",
        }}
      >
        <TextType
          className="text-lg"
          text={isEditing ? "Editar reserva" : "Nueva reserva"}
          typingSpeed={50}
          pauseDuration={1000}
          showCursor={true}
          cursorCharacter="_"
          deletingSpeed={50}
        />
      </DialogTitle>
      <IconButton
        onClick={handleCloseWithTransition}
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
        }}
      >
        <Close />
      </IconButton>
      <DialogContent
        sx={{
          height: "100%",
          width: "100%",
        }}
      ></DialogContent>
    </Dialog>
  );
};

export default BookingForm;
