import { useEffect, useState } from "react";
import UserManagementPage from "./UserManagementPage";
import { Box, CircularProgress, Fade, Typography, Zoom } from "@mui/material";

const UserManagementSplashScreen: React.FC = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Box
      sx={{ height: "100%", width: "100%" }}
    >
      {/* Splash screen */}
      <Fade in={showSplashScreen} timeout={1000}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.2)", // Fondo oscuro
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <Zoom in={showSplashScreen} timeout={800}>
            <Typography variant="h3" gutterBottom>
              Gestion de usuarios
            </Typography>
          </Zoom>
          <CircularProgress color="inherit" />
        </Box>
      </Fade>

      {/* Contenido principal */}
      {!showSplashScreen && <UserManagementPage />}
    </Box>
  );
};
export default UserManagementSplashScreen;