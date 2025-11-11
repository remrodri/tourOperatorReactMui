import { Box, Typography } from "@mui/material";
import { TouristDestinationType } from "../../../touristDestination/types/TouristDestinationType";

interface TouristDestinationInfoProps {
  touristDestination: TouristDestinationType | null;
}

const TouristDestinationInfo: React.FC<TouristDestinationInfoProps> = ({
  touristDestination,
}) => {
  return (
    <Box sx={{ p: "0 10px" }}>
      <Typography
        variant="h6"
        // gutterBottom
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Destino Turistico
      </Typography>
      <Typography variant="body1" >
        {touristDestination?.name}
      </Typography>
      <Typography variant="body2" lineHeight={1.3}>
        {touristDestination?.description}
      </Typography>
    </Box>
  );
};
export default TouristDestinationInfo;
