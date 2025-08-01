import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { DashboardProvider } from "../features/reports/context/DashboardContext";
import { BookingProvider } from "../features/booking/context/BookingContext";
import { TouristProvider } from "../features/tourist/context/TouristContext";
import { TouristDestinationProvider } from "../features/touristDestination/context/TouristDestinationContext";
import { TourPackageProvider } from "../features/tourPackage/context/TourPackageContext";
import { DateRangeProvider } from "../features/dateRange/context/DateRangeContext";
import { UserProvider } from "../features/userManagement/context/UserContext";

const ReportsPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        p: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          background: "rgba(140, 109, 81, 0.4)",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(140, 109, 81, 0.5)",
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
  );
};
export default ReportsPage;
