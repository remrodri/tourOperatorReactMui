import { Backdrop, Box, Dialog, Fade, Typography } from "@mui/material";
import { DateRangeType } from "../../types/DateRangeType";
import DateManagerCardContainer from "./card/DateManagerCardContainer";
import TextType from "../../../../TextAnimations/TextType/TextType";

const style = {
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
  // borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
};

interface DateManagerProps {
  open: boolean;
  onClose: () => void;
  dateRanges: DateRangeType[];
}
const DateManager: React.FC<DateManagerProps> = ({ open, onClose, dateRanges }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slots={{
        backdrop: Backdrop,
      }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "10px",
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <TextType
              text={"Fechas asignadas"}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="_"
            />
            {/* Fechas asignadas */}
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            {dateRanges.map((dr, index) => (
              <DateManagerCardContainer key={index} dateRange={dr} />
            ))}
          </Box>
        </Box>
      </Fade>
    </Dialog>
  );
};

export default DateManager;
