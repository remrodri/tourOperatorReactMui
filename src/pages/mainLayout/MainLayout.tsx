import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import homeBackground from "/src/assets/images/home.webp";
import MainDrawer from "./MainDrawer";
// import userManagementBackground from "../../assets/images/userManagement.webp";
// import tourPackageBackground from "../../assets/images/tourPackage.webp";
// import securitySetupBackground from "../../assets/images/securitySetup.webp";

const userManagementBackground = "/src/assets/images/userManagement.webp";
const homeBackground = "/src/assets/images/home.webp";
const tourPackageBackground = "/src/assets/images/tourPackage.webp";
const bookingBackground = "/src/assets/images/booking.webp";
const reportsBackground = "/src/assets/images/reports.webp";
// const guideBackground = "/src/assets/images/guide.webp";

export interface AppBarStyle {
  background: string;
  borderRadius: string;
  boxShadow: string;
  backdropFilter: string;
  border: string;
}

const appBarStyles = [{
  background: "rgba(88, 83, 79, 0.4)",
  borderRadius: "16px",
  boxShadow: "0 4px 10px rgb(41, 39, 37)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(191, 182, 174, 1)",
},
{
  background: "rgba(88, 83, 79, 0.4)",
  borderRadius: "16px",
  boxShadow: "0 4px 10px rgb(41, 39, 37)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(191, 182, 174, 1)",
},
{
  background: "rgba(88, 83, 79, 0.4)",
  borderRadius: "16px",
  boxShadow: "0 4px 10px rgb(41, 39, 37)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(191, 182, 174, 1)",
},
{
    background: "rgba(88, 83, 79, 0.4)",
    borderRadius: "16px",
    boxShadow: "0 4px 10px rgb(41, 39, 37)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(191, 182, 174, 1)",
  },
]

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [backgroundImg, setBackgroundImg] = useState<string>(homeBackground);

  const backgroundImgs: { [key: string]: string } = {
    ["/home"]: homeBackground,
    ["/gestion-de-usuarios"]: userManagementBackground,
    ["/gestion-de-paquetes-turisticos"]: tourPackageBackground,
    ["/reservas"]: bookingBackground,
    ["/reportes"]: reportsBackground,
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
        height: "100dvh",
        // width:"100wvh",
        display: "flex",
        // p: "10px",
      }}
    >
      {/* <Typography>HomePage</Typography> */}
      {/* <NavBar /> */}
      <MainDrawer
        currentStyles={currentStyles}
      // open={open}
      // setOpen={setOpen}
      // selectedOption={selectedOption}
      // setSelectedOption={setSelectedOption}
      // handleSelectedOption={handleSelectedOption}
      />
    </Box>
  );
};

export default MainLayout;
