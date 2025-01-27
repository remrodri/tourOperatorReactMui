import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import homeBackground from "../../assets/images/home.webp";
import MainDrawer from "./MainDrawer";
import userManagementBackground from "../../assets/images/userManagement.webp";
import tourPackageBackground from "../../assets/images/tourPackage.webp";
// import securitySetupBackground from "../../assets/images/securitySetup.webp";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [backgroundImg, setBackgroundImg] = useState<string>(homeBackground);

  const backgroundImgs: { [key: string]: string } = {
    ["/home"]: homeBackground,
    ["/gestion-de-usuarios"]: userManagementBackground,
    ["/gestion-de-paquetes-turisticos"]: tourPackageBackground,

    // ["/configuracion-de-seguridad"]: securitySetupBackground,
  };

  const [open, setOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const handleSelectedOption = (option: string) => {
    setSelectedOption(option);
    setOpen(!open);
  };

  useEffect(() => {
    setBackgroundImg(backgroundImgs[location.pathname] || homeBackground);
    // console.log(
    //   "location.pathname::: ",
    //   location.pathname.includes("/gestion-de-usuarios")
    // );
    if (location.pathname.includes("/gestion-de-usuarios")) {
      setBackgroundImg(userManagementBackground);
    }
    if (location.pathname.includes("/paquetes-turisticos")) {
      setBackgroundImg(tourPackageBackground);
    }
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
        height: "100vh",
        // p: "10px",
      }}
    >
      {/* <Typography>HomePage</Typography> */}
      {/* <NavBar /> */}
      <MainDrawer
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
