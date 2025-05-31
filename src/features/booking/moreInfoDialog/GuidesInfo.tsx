import { Box, Typography } from "@mui/material";
import { User } from "../../userManagement/types/User";

interface GuidesInfoProps {
  guides: User[];
}

const GuidesInfo: React.FC<GuidesInfoProps> = ({ guides }) => {
  return (
    <Box
    
    >
      <Typography variant="h5" gutterBottom sx={{display:'flex',justifyContent:'center'}}>
        Guia(s) asignado(s)
      </Typography>
      {guides.map((guide, index) => (
        <Box key={index}>
          <Typography variant="body1">
            {index + 1}. {guide.firstName} {guide.lastName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Celular: {guide.phone}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
export default GuidesInfo;
