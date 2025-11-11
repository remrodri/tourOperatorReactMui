import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextType from "../../../../../../TextAnimations/TextType/TextType";
import { CancellationPolicy } from '../../../../types/CancellationPolicy';

interface MoreInfoModalProps {
  handleClick: () => void;
  open: boolean;
  cancellationPolicy: CancellationPolicy;
}

const MoreInfoModal: React.FC<MoreInfoModalProps> = ({
  handleClick,
  open,
  cancellationPolicy,
}) => {
  console.log("cancellationPolicy::: ", cancellationPolicy);

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
          <p>{cancellationPolicy.name}</p>
        </Typography>
        <Typography variant="body1">
          <p>{cancellationPolicy.description}</p>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
export default MoreInfoModal;
