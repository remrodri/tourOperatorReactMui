import { Box, Typography } from "@mui/material";
import { TouristType } from "../types/TouristType";
import { Phone } from "@mui/icons-material";
interface TouristsInfoProps {
  tourists: TouristType[];
}

const TouristsInfo: React.FC<TouristsInfoProps> = ({ tourists }) => {
  // console.log("tourists::: ", tourists);
  return (
    <Box
    sx={{p:1}}
    >
      <Typography variant="h5" gutterBottom sx={{display:'flex',justifyContent:'center'}}>
        Turistas
      </Typography>
      {tourists.map((tourist, index) => (
        <Box key={index}>
          <Typography variant="body1">
            {index + 1}. {tourist.firstName} {tourist.lastName}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <Phone/> {tourist.phone}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
export default TouristsInfo;
