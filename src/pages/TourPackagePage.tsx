import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { TourPackageProvider } from "../features/tourPackage/context/TourPackageContext";
import { DateRangeProvider } from "../features/dateRange/context/DateRangeContext";
import { TourTypeProvider } from "../features/tourType/context/TourTypeContext";
import { CancellationPolicyProvider } from "../features/cancellationPolicy/context/CancellationPolicyContext";
import { TouristDestinationProvider } from "../features/touristDestination/context/TouristDestinationContext";

const TourPackagePage: React.FC = () => {
  return (
    // <>
    //   <CssBaseline />
    <Box
      sx={{
        display: "flex",
        // flexGrow: 1,
        height: "100%",
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
          background: "rgba(4, 135, 217, 0.4)",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(4, 135, 217, 0.5)",
        }}
      >
        <TouristDestinationProvider>
          <CancellationPolicyProvider>
            <TourTypeProvider>
              <DateRangeProvider>
                <TourPackageProvider>
                  <Outlet />
                </TourPackageProvider>
              </DateRangeProvider>
            </TourTypeProvider>
          </CancellationPolicyProvider>
        </TouristDestinationProvider>
      </Box>
      {/* <Typography variant="h4" component="h2"> */}
      {/* </Typography> */}
    </Box>
    // </>
  );
};
export default TourPackagePage;
