import { Box, CircularProgress } from "@mui/material";
import loginBackground from "../assets/images/login1.webp";
import LoginFormContainer from "../features/auth/components/login/LoginFormContainer";
import LoginShowcase from "../features/auth/components/showcase/LoginShowcase";
import { useEffect, useState } from "react";
import FadeContent from "../Animations/FadeContent/FadeContent";
import { RoleProvider } from "../features/Role/context/RoleContext";

const LoginPage: React.FC = () => {
  // const [showSplashScreen, setShowSplashScreen] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowSplashScreen(false);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);
  // if (showSplashScreen) {
  //   return (
  //     <Box
  //       sx={{
  //         height: "100vh",
  //         width: "100vw",
  //         position: "absolute",
  //         background: "rgb(82, 79, 79)",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   )
  // }

  return (
    <FadeContent
      // blur={true}
      duration={200}
      easing="ease-out"
      initialOpacity={0.6}
    >
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${loginBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <LoginFormContainer /> */}
        <RoleProvider>
          <LoginShowcase />
        </RoleProvider>
      </Box>
    </FadeContent>
  );
};

export default LoginPage;
