import { Box } from "@mui/material";
import { Outlet, useOutletContext } from "react-router-dom";
import { DashboardProvider } from "../features/reports/context/DashboardContext";
import { BookingProvider } from "../features/booking/context/BookingContext";
import { TouristProvider } from "../features/tourist/context/TouristContext";
import { TouristDestinationProvider } from "../features/touristDestination/context/TouristDestinationContext";
import { TourPackageProvider } from "../features/tourPackage/context/TourPackageContext";
import { DateRangeProvider } from "../features/dateRange/context/DateRangeContext";
import { UserProvider } from "../features/user/context/UserContext";
// import FadeContent from "../Animations/FadeContent/FadeContent";
import { AppBarStyle } from "./mainLayout/style/MainStyles";
import FadeContent from "../Animations/FadeContent/FadeContent";

const ReportsPage: React.FC = () => {
  const style: AppBarStyle = useOutletContext();

  return (
    <FadeContent
      duration={200}
      easing="ease-out"
      initialOpacity={0.6}
      className="w-full"
    >
      <Box
        // sx={{
        //   display: "flex",
        //   height: "calc(100vh - 5.4rem)",
        //   width: "calc(100vw - 83px)",
        //   p: "10px",
        // }}
        sx={{
          // height: "calc(100dvh - 5.4rem)",
          p: "10px",
          // display: "flex",
        }}
      >
        <Box
          // sx={{
          //   display: "flex",
          //   flexGrow: 1,
          //   // background: "rgba(140, 109, 81, 0.6)",
          //   background: styles.background,
          //   borderRadius: "16px",
          //   boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          //   backdropFilter: "blur(10px)",
          //   // border: "1px solid rgba(140, 109, 81, 0.7)",
          //   border: styles.border,
          // }}
          sx={{
            // flexGrow: 1,
            background: style.background,
            borderRadius: style.borderRadius,
            boxShadow: style.boxShadow,
            backdropFilter: style.backdropFilter,
            border: style.border,
            // display: "flex",
          }}
        >
          <UserProvider>
            <DateRangeProvider>
              <TourPackageProvider>
                <TouristDestinationProvider>
                  <TouristProvider>
                    <BookingProvider>
                      <DashboardProvider>
                        <Outlet />
                      </DashboardProvider>
                    </BookingProvider>
                  </TouristProvider>
                </TouristDestinationProvider>
              </TourPackageProvider>
            </DateRangeProvider>
          </UserProvider>
        </Box>
      </Box>
    </FadeContent>
  );
};
export default ReportsPage;
