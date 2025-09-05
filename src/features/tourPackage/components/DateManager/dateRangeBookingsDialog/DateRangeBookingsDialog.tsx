import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import TextType from "../../../../../TextAnimations/TextType/TextType";
import { Close } from "@mui/icons-material";
import DateRangeHorizontalCardContainer from "./horizontalCard/DateRangeHorizontalCardContainer";
import { BookingType } from "../../../../booking/types/BookingType";

interface DateRangeBookingsDialogProps {
  open: boolean;
  handleClose: () => void;
  dateRangeBookings: BookingType[];
}
const DateRangeBookingsDialog: React.FC<DateRangeBookingsDialogProps> = ({
  open,
  handleClose,
  dateRangeBookings,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "rgba(46, 46, 46, 0.7)",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(37, 37, 37, 0.5)",
          height: "400px",
          width: "600px",
        },
      }}
    >
      <DialogTitle>
        <TextType
          text="Reservas"
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
        // sx={{ display: "flex", flexDirection: "column", width: "400px" }}
      >
        {dateRangeBookings.map((booking) => (
          <DateRangeHorizontalCardContainer key={booking.id} booking={booking} />
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default DateRangeBookingsDialog;
