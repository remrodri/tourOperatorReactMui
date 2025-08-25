import {
  Backdrop,
  Box,
  Button,
  Dialog,
  DialogActions,
  Fade,
  IconButton,
  Typography,
} from "@mui/material";
import { DateRangeType } from "../../types/DateRangeType";
import DateManagerCardContainer from "./card/DateManagerCardContainer";
import TextType from "../../../../TextAnimations/TextType/TextType";
import CloseIcon from "@mui/icons-material/Close";

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
  openDateSelectorForm: boolean;
  handleOpenDateSelectorForm: () => void;
  handleCloseDateSelectorForm: () => void;
  duration: number;
  dateRangesInfo: DateRangeType[];
  tourPackageId: string;
}
const DateManager: React.FC<DateManagerProps> = ({
  open,
  onClose,
  dateRanges,
  openDateSelectorForm,
  handleOpenDateSelectorForm,
  handleCloseDateSelectorForm,
  duration,
  dateRangesInfo,
  tourPackageId,
}) => {
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
          // width: "900px",
        },
      }}
    >
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
          {/* <Button variant="contained" onClick={handleOpenDateSelectorForm}>
            Agregar fecha
          </Button> */}
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 13, top: 13 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          {dateRanges.map((dr, index) => (
            <DateManagerCardContainer
              key={index}
              dateRange={dr}
              duration={duration}
              dateRangesInfo={dateRangesInfo}
              tourPackageId={tourPackageId}
            />
          ))}
        </Box>
        <Button
          sx={{ mt: 2 }}
          onClick={handleOpenDateSelectorForm}
          variant="contained"
        >
          Agregar fecha
        </Button>
      </Box>
    </Dialog>
  );
};

export default DateManager;
