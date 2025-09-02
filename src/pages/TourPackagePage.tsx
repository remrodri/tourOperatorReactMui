import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { TourPackageProvider } from "../features/tourPackage/context/TourPackageContext";
import { DateRangeProvider } from "../features/dateRange/context/DateRangeContext";
import { TourTypeProvider } from "../features/tourType/context/TourTypeContext";
import { CancellationPolicyProvider } from "../features/cancellationPolicy/context/CancellationPolicyContext";
import { TouristDestinationProvider } from "../features/touristDestination/context/TouristDestinationContext";
import { UserProvider } from "../features/userManagement/context/UserContext";
import { BookingProvider } from "../features/booking/context/BookingContext";
import { TouristProvider } from "../features/tourist/context/TouristContext";
import FadeContent from "../Animations/FadeContent/FadeContent";

const TourPackagePage: React.FC = () => {
  return (
    // <>
    //   <CssBaseline />
    <FadeContent
      // blur={true}
      duration={200}
      easing="ease-out"
      initialOpacity={0.6}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          // height: "100%",
          // width: "calc(100vw - 83px)",
          // height: {
          //   xs: "calc(100vh - 3.5rem)",
          //   sm: "calc(100vh - 4rem)",
          // },
          p: "10px",
          // position: "relative",
          // height: "42.3rem",
          height: "calc(100vh - 5.5rem)",
          width: "calc(100vw - 83px)",
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
          <TouristProvider>
            <BookingProvider>
              <UserProvider>
                <TouristDestinationProvider>
                  <CancellationPolicyProvider>
                    <TourTypeProvider>
                      <TourPackageProvider>
                        <Outlet />
                      </TourPackageProvider>
                    </TourTypeProvider>
                  </CancellationPolicyProvider>
                </TouristDestinationProvider>
              </UserProvider>
            </BookingProvider>
          </TouristProvider>
        </Box>
        {/* <Typography variant="h4" component="h2"> */}
        {/* </Typography> */}
      </Box>
    </FadeContent>
    // </>
  );
};
export default TourPackagePage;
