import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import homeBackground from "/src/assets/images/home.webp";
import MainDrawer from "./MainDrawer";
import { RoleProvider } from "../../features/Role/context/RoleContext";
// import userManagementBackground from "../../assets/images/userManagement.webp";
// import tourPackageBackground from "../../assets/images/tourPackage.webp";
// import securitySetupBackground from "../../assets/images/securitySetup.webp";

const userManagementBackground = "/src/assets/images/userManagement.webp";
// const homeBackground = "/src/assets/images/home.webp";
const tourPackageBackground = "/src/assets/images/tourPackage.webp";
const bookingBackground = "/src/assets/images/booking.webp";
const reportsBackground = "/src/assets/images/reports.webp";
const touristBackground = "/src/assets/images/tourist.webp";
// const guideBackground = "/src/assets/images/guide.webp";

export interface AppBarStyle {
  background: string;
  borderRadius: string;
  boxShadow: string;
  backdropFilter: string;
  border: string;
  drawerBackground: string;
  drawerBorder: string;
  drawerBoxShadow: string;
}

const appBarStyles = [
  {
    // background: "rgba(88, 83, 79, 0.4)",
    background: "rgba(191, 161, 143, 0.6)",
    borderRadius: "16px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(191, 161, 143, 0.7)",
    // drawerBackground: "rgba(61, 48, 39, 0.53)",
    drawerBackground: "rgba(191, 161, 143, 0.6)",
    drawerBorder: "1px solid rgba(191, 161, 143, 0.7)",
    // drawerBoxShadow: "0 4px 10px rgba(53, 46, 41, 0.99)",
    drawerBoxShadow: "0 4px 10px rgba(0,0,0,0.5)",
  },
  {
    background: "rgba(102, 188, 242	, 0.4)",
    borderRadius: "16px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(102, 188, 242	, 0.5)",
    drawerBackground: "rgba(102, 188, 242	, 0.4)",
    drawerBorder: "1px solid rgba(102, 188, 242	, 0.5)",
    drawerBoxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
  },
  {
    // background: "rgba(63, 64, 59, 0.4)",
    background: "rgba(86, 101, 115, 0.6)",
    borderRadius: "16px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(86, 101, 115, 0.7)",
    drawerBackground: "rgba(86, 101, 115, 0.6)",
    drawerBorder: "1px solid rgba(86, 101, 115, 0.7)",
    drawerBoxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
  },
  {
    background: "rgba(140, 109, 81, 0.7)",
    borderRadius: "16px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(140, 109, 81, 1)",
    drawerBackground: "rgba(140, 109, 81, 0.7)",
    drawerBorder: "1px solid rgba(140, 109, 81, 1)",
    drawerBoxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
  },
  {
    background: "rgba(64, 89, 66, 0.6)",
    borderRadius: "16px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(64, 89, 66, 0.7)",
    drawerBackground: "rgba(64, 89, 66, 0.6)",
    drawerBorder: "1px solid rgba(64, 89, 66, 0.7)",
    drawerBoxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
  },
];

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [backgroundImg, setBackgroundImg] = useState<string>("");

  const backgroundImgs: { [key: string]: string } = {
    // ["/home"]: homeBackground,
    ["/gestion-de-usuarios"]: userManagementBackground,
    ["/gestion-de-paquetes-turisticos"]: tourPackageBackground,
    ["/reservas"]: bookingBackground,
    ["/reportes"]: reportsBackground,
    ["/turistas"]: touristBackground,
    // ["/guia-de-turismo"]: guideBackground,
    // ["/configuracion-de-seguridad"]: securitySetupBackground,
  };

  const [open, setOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [currentStyles, setCurrentStyles] = useState<AppBarStyle>({
    background: "",
    borderRadius: "",
    boxShadow: "",
    backdropFilter: "",
    border: "",
    drawerBackground: "",
    drawerBorder: "",
    drawerBoxShadow: "",
  });
  const handleSelectedOption = (option: string) => {
    setSelectedOption(option);
    setOpen(!open);
  };

  useEffect(() => {
    setBackgroundImg(backgroundImgs[location.pathname] || "/home");
    // console.log(
    //   "location.pathname::: ",
    //   location.pathname.includes("/gestion-de-usuarios")
    // );
    if (location.pathname.includes("gestion-de-usuarios")) {
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
    // if (location.pathname.includes("guia-de-turismo")) {
    //   setBackgroundImg(guideBackground);
    // }
    // if (location.pathname.includes("/configuracion-de-seguridad")) {
    //   setBackgroundImg(securitySetupBackground);
    // }
  }, [location.pathname]);

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // height: "100dvh",
        // width:"100wvh",
        // display: "flex",
        // p: "10px",
      }}
    >
      {/* <Typography>HomePage</Typography> */}
      {/* <NavBar /> */}
      <RoleProvider>
        <MainDrawer
          currentStyles={currentStyles}
          // open={open}
          // setOpen={setOpen}
          // selectedOption={selectedOption}
          // setSelectedOption={setSelectedOption}
          // handleSelectedOption={handleSelectedOption}
        />
      </RoleProvider>
    </Box>
  );
};

export default MainLayout;
