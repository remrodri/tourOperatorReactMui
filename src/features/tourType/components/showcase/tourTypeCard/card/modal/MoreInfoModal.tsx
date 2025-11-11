import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextType from "../../../../../../../TextAnimations/TextType/TextType";

interface MoreInfoModalProps {
  handleClick: () => void;
  open: boolean;
  tourType: {
    name: string;
    description: string;
  };
  // dateRangesFilled: DateRangeType[];
}

const MoreInfoModal: React.FC<MoreInfoModalProps> = ({
  handleClick,
  open,
  tourType,
  // dateRangesFilled,
}) => {
  // console.log("dateRangesFilled::: ", dateRangesFilled);
  console.log("tourType::: ", tourType);

  // const showSelectedDays = () => {
  //   return <>{tourPackage.selectedDates.}</>;
  // };

  return (
    <Dialog
      onClose={handleClick}
      open={open}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "rgba(46, 46, 46, 0.7)",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(37, 37, 37, 0.5)",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <DialogTitle
          sx={{
            display: "flex",
            // justifyContent: "space-between",
            // width: "calc(100% - 65px)",
            // padding: "0 0 0 4rem",
          }}
        >
          <TextType
            text="Información"
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="_"
          />
        </DialogTitle>
        <IconButton
          autoFocus
          aria-label="close"
          onClick={handleClick}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography variant="body1" sx={{ display: "flex" }}>
          <p>{tourType.name}</p>
        </Typography>
        <Typography variant="body1">
          <p>{tourType.description}</p>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
export default MoreInfoModal;
