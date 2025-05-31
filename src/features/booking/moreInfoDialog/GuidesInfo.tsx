import { Box, Typography } from "@mui/material";
import { User } from "../../userManagement/types/User";

interface GuidesInfoProps {
  guides: User[];
}

const GuidesInfo: React.FC<GuidesInfoProps> = ({ guides }) => {
  return (
    <Box
    sx={{
      width:300,
      height:120,
      p:2,
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(5px)',
      webkitBackdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    }}
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
