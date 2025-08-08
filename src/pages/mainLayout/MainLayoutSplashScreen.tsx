import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Fade,
  Typography,
  Zoom,
} from "@mui/material";
import { useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import FadeContent from "../../Animations/FadeContent/FadeContent";

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
        sx={{
          // height: "100%",
          width: "100%",
          // position: "absolute",
          // inset: "0 0 0 0",
          background: "rgba(51, 40, 24, 0.2)",
          // backgroundImage: "url('/home.webp')",
          // color: "white",
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
          // justifyContent: "center",
          // zIndex: 9999,
        }}
      >
        {/* <CardMedia
          component="img"
          height="140"
          // image="/home.webp"
          alt="home"
          sx={{
            position: "absolute",
            inset: "0 0 0 0",
            background: "rgba(43, 42, 42, 0.2)",
            // backgroundImage: "url('/home.webp')",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        /> */}
        <Fade in={showSplashScreen} timeout={2500}>
          <Card
            sx={{
              width: "100%",
              // height: "100%",
              position: "absolute",
              inset: "0 0 0 0",
              background: "rgba(61, 50, 28, 0.29)",
              // backgroundImage: "url('/home.webp')",
              // backgroundColor: "#e0e0e0", //Fondo gris claro
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            <CardMedia
              width="100%"
              // height="100%"
              component="video"
              // height="140"
              src="/Video-7.mp4"
              autoPlay
              loop
              muted
              sx={{
                width: "100%",
                // height: "100%",
                position: "absolute",
                inset: "0 0 0 0",
                // background: "rgba(17, 54, 12, 0.38)",
                // backgroundImage: "url('/home.webp')",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // zIndex: 9999,
              }}
            />
            <Box
              sx={{
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: "rgba(0, 0, 0, 0.42)",
                // borderRadius: "10px",
                // backdropFilter: "blur(5px)",
                // border: "1px solid rgba(0, 0, 0, 0.3)",
                // padding: "20px",
                // boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
                // width: "30rem",
              }}
            >
              <Zoom in={showSplashScreen} timeout={800}>
                <Typography variant="h3" gutterBottom>
                  Bienvenido
                </Typography>
              </Zoom>
              <CircularProgress color="inherit" />
            </Box>
          </Card>
        </Fade>
      </Box>
    );
  }

  // return (
  //   !showSplashScreen && (
  //     <FadeContent
  //       blur={true}
  //       duration={1000}
  //       easing="ease-out"
  //       initialOpacity={0}
  //     >
  //       <MainLayout />
  //     </FadeContent>
  //   )
  // );
  return (
    <FadeContent
      blur={true}
      duration={1000}
      easing="ease-out"
      initialOpacity={0}
      >
        <MainLayout />
      </FadeContent>
    )
};
export default MainLayoutSplashScreen;
