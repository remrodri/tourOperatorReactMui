import { Box, TextField } from "@mui/material";
import { TouristType } from "../../types/TouristType";

interface TouristCardProps {
  tourist: TouristType;
}
const TouristCard: React.FC<TouristCardProps> = ({ tourist }) => {
  return (
    <Box>
      <TextField
        disabled
        label="Turista agregado" 
        size="small"
        fullWidth
        value={`${tourist?.firstName} ${tourist?.lastName}` || ""}
      />
      {/* <TextField
        disabled
        label="Apellido(s)"
        size="small"
        fullWidth
        value={tourist?.lastName || ""}
      /> */}
    </Box>
  );
};

export default TouristCard;
