import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const TourPackagePage: React.FC = () => {
  return (

    // <>
    //   <CssBaseline />
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        // height:"100%",
        height: {
          xs: "calc(100vh - 3.5rem)",
          sm: "calc(100vh - 4rem)",
        },
        p: "6px",
      }}
    >
      <Box
        sx={{
          // display: "flex",
          // flexDirection:"column",
          // height:"100%",
          flexGrow: 1,
          background: "rgba(0,0,0,0.2)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(0,0,0,0.3)",
        }}
      >
        <Outlet/>
      </Box>
      {/* <Typography variant="h4" component="h2"> */}
      {/* </Typography> */}
    </Box>
    // </>
  
  );
};
export default TourPackagePage;
