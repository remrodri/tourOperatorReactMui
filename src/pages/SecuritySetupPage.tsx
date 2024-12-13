import { Box, Typography } from "@mui/material";
import securitySetupBackground from "../assets/images/securitySetup.webp"
import { Outlet } from "react-router-dom";

const SecuritySetupPage: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${securitySetupBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <Typography variant="h4" component="h2">
        Security Setup
      </Typography> */}
      <Outlet/>
    </Box>
  );
};

export default SecuritySetupPage;
