import { Box, Typography } from "@mui/material";
import { TouristDestinationType } from "../../touristDestination/types/TouristDestinationType";

interface TouristDestinationInfoProps {
  touristDestination: TouristDestinationType | null;
}

const TouristDestinationInfo: React.FC<TouristDestinationInfoProps> = ({
  touristDestination,
}) => {
  return (
    <Box
    sx={{p:1}}
    >
      <Typography variant="h5" gutterBottom sx={{display:'flex',justifyContent:'center'}}>Destino Turistico</Typography>
      <Typography variant="body1" gutterBottom>
        {touristDestination?.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {touristDestination?.description}
      </Typography>
    </Box>
  );
};
export default TouristDestinationInfo;
