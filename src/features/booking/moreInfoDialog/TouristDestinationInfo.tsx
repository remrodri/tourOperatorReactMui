import { Box, Typography } from "@mui/material";
import { TouristDestinationType } from "../../touristDestination/types/TouristDestinationType";

interface TouristDestinationInfoProps {
  touristDestination: TouristDestinationType | null;
}

const TouristDestinationInfo: React.FC<TouristDestinationInfoProps> = ({
  touristDestination,
}) => {
  console.log("touristDestination::: ", touristDestination);
  return (
    <Box>
      <Typography variant="h5">Destino Turistico</Typography>
      <Typography variant="body1">
        Nombre: {touristDestination?.name}
      </Typography>
      <Typography variant="body1">
        Descripcion: {touristDestination?.description}
      </Typography>
    </Box>
  );
};
export default TouristDestinationInfo;
