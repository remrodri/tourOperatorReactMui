import { Box, Typography } from "@mui/material";
import { User } from "../../../userManagement/types/User";
import { Phone } from "@mui/icons-material";

interface GuidesInfoProps {
  guides: User[];
}

const GuidesInfo: React.FC<GuidesInfoProps> = ({ guides }) => {
  return (
    <Box sx={{ p: 1 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Guia(s) asignado(s)
      </Typography>
      {guides.map((guide, index) => (
        <Box key={guide.id}>
          <Typography variant="body1">
            {index + 1}. {guide.firstName} {guide.lastName}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Phone />
            {`${guide.phone}`}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
export default GuidesInfo;
