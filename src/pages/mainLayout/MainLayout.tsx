import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import homeBackground from "../../assets/images/home.webp";
import NavBar from "./NavBar";
import MainDrawer from "./MainDrawer";
import userManagementBackgorund from "../../assets/images/userManagement.webp";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [backgroundImg, setBackgroundImg] = useState<string>(homeBackground);

  const backgroundImgs: { [key: string]: string } = {
    ["/home"]: homeBackground,
    ["/gestion-de-usuarios"]: userManagementBackgorund,
  };

  useEffect(() => {
    setBackgroundImg(backgroundImgs[location.pathname] || homeBackground);
    
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
      <MainDrawer />
    </Box>
  );
};

export default MainLayout;
