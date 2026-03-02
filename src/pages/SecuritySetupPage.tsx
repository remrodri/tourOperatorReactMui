import { Box } from "@mui/material";
import securitySetupBackground from "../assets/images/securitySetup.webp"
import { Outlet } from "react-router-dom";
import { RoleProvider } from "../features/Role/context/RoleContext";

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
      <RoleProvider>
      <Outlet/>
      </RoleProvider>
    </Box>
  );
};

export default SecuritySetupPage;
