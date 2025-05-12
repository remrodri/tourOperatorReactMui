import { Box, Typography } from "@mui/material";
import { TourType } from "../../userManagement/types/TourType";

interface TourTypeProps {
  tourType: TourType | null;
}

const TourTypeInfo: React.FC<TourTypeProps> = ({ tourType }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Tipo de tour
      </Typography>
      <Typography variant="body1">Nombre: {tourType?.name}</Typography>
      <Typography variant="body1" gutterBottom>
        Descripcion: {tourType?.description}
      </Typography>
    </Box>
  );
};
export default TourTypeInfo;
