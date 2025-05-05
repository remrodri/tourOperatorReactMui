import { Box, Typography } from "@mui/material";
import { TourType } from "../../userManagement/types/TourType";

interface TourTypeProps {
  tourType: TourType | null;
}

const TourTypeInfo: React.FC<TourTypeProps> = ({ tourType }) => {
  return (
    <Box>
      <Typography variant="h5">Tipo de tour</Typography>
      <Typography variant="body1">{tourType?.name}</Typography>
      <Typography variant="body1">{tourType?.description}</Typography>
    </Box>
  );
};
export default TourTypeInfo;
