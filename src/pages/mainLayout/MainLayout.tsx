import { Box, Fade } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RoleProvider } from "../../features/Role/context/RoleContext";
import { MainDrawer } from "./MainDrawer";
import { AppBarStyle, appBarStyles } from "./style/MainStyles";

// ✅ IMPORTS (en vez de "/src/...")
import userManagementBackground from "../../assets/images/userManagement.webp";
import tourPackageBackground from "../../assets/images/tourPackage.webp";
import bookingBackground from "../../assets/images/booking.webp";
import reportsBackground from "../../assets/images/reports.webp";
import touristBackground from "../../assets/images/tourist.webp";
import tourTypesBackground from "../../assets/images/tourTypes2.webp";
import touristDestination from "../../assets/images/touristDestination.webp";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [backgroundImg, setBackgroundImg] = useState<string>(
    userManagementBackground,
  );
  const [showBackground, setShowBackground] = useState<boolean>(true);

  const [currentStyles, setCurrentStyles] = useState<AppBarStyle>({
    background: "rgba(87, 87, 87, 1)",
    borderRadius: "16px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)",
    border: "rgba(87, 87, 87, 1)",
    drawerBackground: "rgba(87, 87, 87, 1)",
    drawerBorder: "rgba(87, 87, 87, 1)",
    drawerBoxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.pathname.includes("personal")) {
        setBackgroundImg(userManagementBackground);
        setCurrentStyles(appBarStyles[0]);
      } else if (location.pathname.includes("paquetes-turisticos")) {
        setBackgroundImg(tourPackageBackground);
        setCurrentStyles(appBarStyles[1]);
      } else if (location.pathname.includes("reservas")) {
        setBackgroundImg(bookingBackground);
        setCurrentStyles(appBarStyles[2]);
      } else if (location.pathname.includes("reportes")) {
        setBackgroundImg(reportsBackground);
        setCurrentStyles(appBarStyles[3]);
      } else if (location.pathname.includes("turistas")) {
        setBackgroundImg(touristBackground);
        setCurrentStyles(appBarStyles[4]);
      } else if (location.pathname.includes("tipos-de-tour")) {
        setBackgroundImg(tourTypesBackground);
        setCurrentStyles(appBarStyles[5]);
      } else if (location.pathname.includes("destinos-turisticos")) {
        setBackgroundImg(touristDestination);
        setCurrentStyles(appBarStyles[6]);
      } else {
        // fallback si quieres
        setBackgroundImg(userManagementBackground);
      }

      setShowBackground(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <Box
      sx={{
        position: "relative",
        background: "rgba(87, 87, 87, 1)",
        overflow: "hidden",
      }}
    >
      <Fade in={showBackground} timeout={600}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${backgroundImg}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
          }}
        />
      </Fade>

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <RoleProvider>
          <MainDrawer currentStyles={currentStyles} />
        </RoleProvider>
      </Box>
    </Box>
  );
};

export default MainLayout;
