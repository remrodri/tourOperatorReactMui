import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const TourPackagePage: React.FC = () => {
  return (
    // <>
    //   <CssBaseline />
    <Box
      sx={{
        display: "flex",
        // flexGrow: 1,
        height:"100%",
        // height: {
        //   xs: "calc(100vh - 3.5rem)",
        //   sm: "calc(100vh - 4rem)",
        // },
        p: "10px",
        // position: "relative",
        // height: "42.3rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          // flexDirection:"column",
          // height:"100%",
          // height: "42.3rem",
          flexGrow: 1,
          background: "rgba(0,0,0,0.6)",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0,0,0,0.4)",
        }}
      >
        <Outlet />
      </Box>
      {/* <Typography variant="h4" component="h2"> */}
      {/* </Typography> */}
    </Box>
    // </>
  );
};
export default TourPackagePage;
