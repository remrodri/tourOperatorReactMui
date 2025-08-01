import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../features/userManagement/context/UserContext";
import { BookingProvider } from "../features/booking/context/BookingContext";
import { TouristProvider } from "../features/tourist/context/TouristContext";
import { TourPackageProvider } from "../features/tourPackage/context/TourPackageContext";
import { DateRangeProvider } from "../features/dateRange/context/DateRangeContext";

const BookingPage = () => {
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
          background: "rgba(86, 101, 115, 0.4)",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(86, 101, 115, 0.5)",
        }}
      >
        <DateRangeProvider>
          <TourPackageProvider>
            <TouristProvider>
              <BookingProvider>
                <UserProvider>
                  <Outlet />
                </UserProvider>
              </BookingProvider>
            </TouristProvider>
          </TourPackageProvider>
        </DateRangeProvider>
      </Box>
    </Box>
  );
};
export default BookingPage;
