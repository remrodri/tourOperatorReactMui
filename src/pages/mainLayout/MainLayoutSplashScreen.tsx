import { Box, CircularProgress, Fade, Typography, Zoom } from "@mui/material";
import { useEffect, useState } from "react";
import LoginPage from "../LoginPage";
import MainLayout from "./MainLayout";

const MainLayoutSplashScreen: React.FC = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplashScreen) {
    return (
      <Box
        // sx={{
        //   height: "100vh",
        //   width: "100%",
        // }}
      >
        <Fade in={showSplashScreen} timeout={1000}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.2)",
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
                Bienvenido
              </Typography>
            </Zoom>
            <CircularProgress color="inherit" />
          </Box>
        </Fade>
      </Box>
    );
  }

  return !showSplashScreen && <MainLayout />;
};
export default MainLayoutSplashScreen;