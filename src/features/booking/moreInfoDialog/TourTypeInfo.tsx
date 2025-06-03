import { Box, Typography } from "@mui/material";
import { TourType } from "../../userManagement/types/TourType";

interface TourTypeProps {
  tourType: TourType | null;
}

const TourTypeInfo: React.FC<TourTypeProps> = ({ tourType }) => {
  return (
    <Box
    sx={{
      p:1,
      // height: '300px',
      
    }}
    >
      <Typography variant="h5"  sx={{display:'flex',justifyContent:'center'}}>
        Tipo de tour
      </Typography>
      <Typography variant="body1" gutterBottom>{tourType?.name ?? "No disponible"}</Typography>
      <Typography variant="body1">
        {tourType?.description ?? "No disponible"}
      </Typography>
    </Box>
  );
};
export default TourTypeInfo;
