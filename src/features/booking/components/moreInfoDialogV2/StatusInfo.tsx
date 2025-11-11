import { Box, Typography } from "@mui/material";
import { User } from "../../../userManagement/types/User";

interface StatusInfoProps {
  status: string;
}
const StatusInfo: React.FC<StatusInfoProps> = ({ status }) => {
  // console.log("seller::: ", seller);

  return (
    <Box sx={{ p: "0 10px" }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Estado
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {status}
      </Typography>
    </Box>
  );
};
export default StatusInfo;
