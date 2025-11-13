import { Box, Fade } from "@mui/material";
import { Outlet } from "react-router-dom";
import { TourPackageProvider } from "../features/tourPackage/context/TourPackageContext";
import { DateRangeProvider } from "../features/dateRange/context/DateRangeContext";
import { TourTypeProvider } from "../features/tourType/context/TourTypeContext";
import { CancellationPolicyProvider } from "../features/cancellationPolicy/context/CancellationPolicyContext";
import { TouristDestinationProvider } from "../features/touristDestination/context/TouristDestinationContext";
import { UserProvider } from "../features/user/context/UserContext";
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
      className="w-full"
    >
      {/* <FadeContent in={true} timeout={1000}> */}
      <Box
        sx={{
          height: "calc(100dvh - 5.4rem)",
          // display: "flex",
          // flexGrow: 1,
          // height: "100%",
          // width: "calc(100dvw - 83px)",
          // height: {
          //   xs: "calc(100vh - 3.5rem)",
          //   sm: "calc(100vh - 4rem)",
          // },
          p: "10px",
          // position: "relative",
          // height: "42.3rem",
          // height: "calc(100vh - 70rem)",
          // width: "calc(100vw - 83px)",
          // height: "89.1dvh",
          display: "flex",
          // width:"100%",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            // display: "flex",
            // flexDirection:"column",
            // height:"100%",
            // height: "42.3rem",
            // flexGrow: 1,
            background: "rgba(4, 135, 217, 0.4)",
            borderRadius: "16px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(4, 135, 217, 0.5)",
            // height: "calc(100dvh - 6.65rem)",
            display: "flex",
            // width:"100%",
          }}
        >
          <DateRangeProvider>
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
          </DateRangeProvider>
        </Box>
        {/* <Typography variant="h4" component="h2"> */}
        {/* </Typography> */}
      </Box>
    </FadeContent>
    // </>
  );
};
export default TourPackagePage;
