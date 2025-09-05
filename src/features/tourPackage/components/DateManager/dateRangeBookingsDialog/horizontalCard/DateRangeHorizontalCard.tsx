import { Box, Card, IconButton, Tooltip, Typography } from "@mui/material";
import { TouristType } from "../../../../../booking/types/TouristType";
import { SettingsOverscan } from "@mui/icons-material";

interface DateRangeHorizontalCardProps {
  tourist: TouristType | null;
  touristCounter: number;
  handleClickInfoModal: () => void;
}
const DateRangeHorizontalCard: React.FC<DateRangeHorizontalCardProps> = ({
  tourist,
  touristCounter,
  handleClickInfoModal,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        // width: "100%",
        // height: "80px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(37, 37, 37, 0.5)",
        padding: "10px 20px",
      }}
    >
      <Box>
        <Typography variant="body1">
          Contacto: {tourist?.firstName} {tourist?.lastName}
        </Typography>
        <Typography variant="body1">Cel: {tourist?.phone}</Typography>
        <Typography variant="body1">Turistas: {touristCounter}</Typography>
      </Box>
      {/* <Box> */}
      <Tooltip title="Mas información">
        <IconButton
          autoFocus
          aria-label="close"
          onClick={() => handleClickInfoModal()}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
          }}
        >
          <SettingsOverscan />
        </IconButton>
      </Tooltip>
      {/* </Box> */}
    </Box>
  );
};

export default DateRangeHorizontalCard;
