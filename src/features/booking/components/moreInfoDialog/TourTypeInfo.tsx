import { Box, Typography } from "@mui/material";
import { TourType } from "../../../userManagement/types/TourType";

interface TourTypeProps {
  tourType: TourType | null;
}

const TourTypeInfo: React.FC<TourTypeProps> = ({ tourType }) => {
  return (
    <Box
      sx={{
        p: "0 10px",
        // height: '300px',
      }}
    >
      <Typography
        variant="h6"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Tipo de tour
      </Typography>
      <Typography variant="body1" >
        {tourType?.name ?? "No disponible"}
      </Typography>
      <Typography variant="body2" lineHeight={1.3}>
        {tourType?.description ?? "No disponible"}
      </Typography>
    </Box>
  );
};
export default TourTypeInfo;
