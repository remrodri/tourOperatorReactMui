import { Box, Fade, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RoleProvider } from "../../features/Role/context/RoleContext";
import { MainDrawer } from "./MainDrawer";
import { AppBarStyle, appBarStyles } from "./style/MainStyles";

const userManagementBackground = "/src/assets/images/userManagement.webp";
const tourPackageBackground = "/src/assets/images/tourPackage.webp";
const bookingBackground = "/src/assets/images/booking.webp";
const reportsBackground = "/src/assets/images/reports.webp";
const touristBackground = "/src/assets/images/tourist.webp";
const tourTypesBackground = "/src/assets/images/tourTypes2.webp";
const touristDestination = "/src/assets/images/touristDestination.webp";

// export interface AppBarStyle {
//   background: string;
//   borderRadius: string;
//   boxShadow: string;
//   backdropFilter: string;
//   border: string;
//   drawerBackground: string;
//   drawerBorder: string;
//   drawerBoxShadow: string;
// }

// const appBarStyles = [
//   {
//     background: "rgba(176, 143, 123, 0.6)",
//     borderRadius: "16px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
//     backdropFilter: "blur(10px)",
//     border: "1px solid rgba(191, 161, 143, 0.7)",
//     drawerBackground: "rgba(191, 161, 143, 0.6)",
//     drawerBorder: "1px solid rgba(191, 161, 143, 0.7)",
//     drawerBoxShadow: "0 4px 10px rgba(0,0,0,0.5)",
//   },
//   {
//     background: "rgba(71, 133, 172, 0.6)",
//     borderRadius: "16px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
//     backdropFilter: "blur(10px)",
//     border: "1px solid rgba(71, 133, 172, 0.7)",
//     drawerBackground: "rgba(71, 133, 172, 0.6)",
//     drawerBorder: "1px solid rgba(71, 133, 172, 0.7)",
//     drawerBoxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
//   },
//   {
//     background: "rgba(86, 101, 115, 0.6)",
//     borderRadius: "16px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
//     backdropFilter: "blur(10px)",
//     border: "1px solid rgba(86, 101, 115, 0.7)",
//     drawerBackground: "rgba(86, 101, 115, 0.6)",
//     drawerBorder: "1px solid rgba(86, 101, 115, 0.7)",
//     drawerBoxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
//   },
//   {
//     background: "rgba(140, 109, 81, 0.7)",
//     borderRadius: "16px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
//     backdropFilter: "blur(10px)",
//     border: "1px solid rgba(140, 109, 81, 1)",
//     drawerBackground: "rgba(140, 109, 81, 0.7)",
//     drawerBorder: "1px solid rgba(140, 109, 81, 1)",
//     drawerBoxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
//   },
//   {
//     background: "rgba(64, 89, 66, 0.6)",
//     borderRadius: "16px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
//     backdropFilter: "blur(10px)",
//     border: "1px solid rgba(64, 89, 66, 0.7)",
//     drawerBackground: "rgba(64, 89, 66, 0.6)",
//     drawerBorder: "1px solid rgba(64, 89, 66, 0.7)",
//     drawerBoxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
//   },
//   {
//     background: "rgba(126, 126, 126, 0.6)",
//     borderRadius: "16px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
//     backdropFilter: "blur(10px)",
//     border: "1px solid rgba(126, 126, 126, 0.7)",
//     drawerBackground: "rgba(126, 126, 126, 0.6)",
//     drawerBorder: "1px solid rgba(126, 126, 126, 0.7)",
//     drawerBoxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
//   },
//   {
//     background: "rgba(158, 118, 81, 0.6)",
//     borderRadius: "16px",
//     boxShadow: "0 4px 10px rgba(158, 118, 81, 0.5)",
//     backdropFilter: "blur(10px)",
//     border: "1px solid rgba(158, 118, 81, 0.7)",
//     drawerBackground: "rgba(158, 118, 81, 0.6)",
//     drawerBorder: "1px solid rgba(158, 118, 81, 0.7)",
//     drawerBoxShadow: "0 4px 10px rgba(158, 118, 81, 0.5)",
//   },
// ];

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [backgroundImg, setBackgroundImg] = useState<string>("");
  const [showBackground, setShowBackground] = useState<boolean>(true);

  // const MainStyles:AppBarStyle[] = appBarStyles;

  const backgroundImgs: { [key: string]: string } = {
    ["/personal"]: userManagementBackground,
    ["/paquetes-turisticos"]: tourPackageBackground,
    ["/reservas"]: bookingBackground,
    ["/reportes"]: reportsBackground,
    ["/turistas"]: touristBackground,
    ["/tipos-de-tour"]: tourTypesBackground,
    ["/destinos-turisticos"]: touristDestination,
  };

  const [open, setOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
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

  const handleSelectedOption = (option: string) => {
    setSelectedOption(option);
    setOpen(!open);
  };

  useEffect(() => {
    // Fade out
    setShowBackground(false);

    // Esperar a que termine el fade out antes de cambiar la imagen
    const timer = setTimeout(() => {
      setBackgroundImg(backgroundImgs[location.pathname] || "/home");

      if (location.pathname.includes("personal")) {
        setBackgroundImg(userManagementBackground);
        setCurrentStyles(appBarStyles[0]);
      }
      if (location.pathname.includes("paquetes-turisticos")) {
        setBackgroundImg(tourPackageBackground);
        setCurrentStyles(appBarStyles[1]);
      }
      if (location.pathname.includes("reservas")) {
        setBackgroundImg(bookingBackground);
        setCurrentStyles(appBarStyles[2]);
      }
      if (location.pathname.includes("reportes")) {
        setBackgroundImg(reportsBackground);
        setCurrentStyles(appBarStyles[3]);
      }
      if (location.pathname.includes("turistas")) {
        setBackgroundImg(touristBackground);
        setCurrentStyles(appBarStyles[4]);
      }
      if (location.pathname.includes("tipos-de-tour")) {
        setBackgroundImg(tourTypesBackground);
        setCurrentStyles(appBarStyles[5]);
      }
      if (location.pathname.includes("destinos-turisticos")) {
        setBackgroundImg(touristDestination);
        setCurrentStyles(appBarStyles[6]);
      }
      // Fade in después de cambiar la imagen
      setShowBackground(true);
    }, 300); // Duración del fade out

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
      {/* Fondo con transición Fade */}
      <Fade in={showBackground} timeout={600}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
          }}
        />
      </Fade>

      {/* Contenido principal */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <RoleProvider>
          <MainDrawer currentStyles={currentStyles} />
        </RoleProvider>
      </Box>
    </Box>
  );
};

export default MainLayout;
