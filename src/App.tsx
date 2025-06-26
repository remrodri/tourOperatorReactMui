// import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { UserProvider } from "./features/userManagement/context/UserContext";
import { RoleProvider } from "./features/Role/context/RoleContext";
import { TourTypeProvider } from "./features/tourType/context/TourTypeContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import GlobalSnackbar from "./utils/snackbar/GlobalSnackbar";
import { CancellationPolicyProvider } from "./features/cancellationPolicy/context/CancellationPolicyContext";
import { TouristDestinationProvider } from "./features/touristDestination/context/TouristDestinationContext";
import { TourPackageProvider } from "./features/tourPackage/context/TourPackageContext";
import { DateRangeProvider } from "./features/dateRange/context/DateRangeContext";
import { TouristProvider } from "./features/tourist/context/TouristContext";
import { PaymentProvider } from "./features/payment/context/PaymentContext";
import { BookingProvider2 } from "./features/booking/context/BookingContext2";
import { DashboardProvider } from "./features/reports/context/DashboardContext";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});
function App() {
  return (
    <SnackbarProvider>
        <TouristProvider>
          <BookingProvider2>
      {/* <DashboardProvider> */}
            <PaymentProvider>
              <DateRangeProvider>
                <TouristDestinationProvider>
                  <TourPackageProvider>
                    <CancellationPolicyProvider>
                      <TourTypeProvider>
                        <RoleProvider>
                          <UserProvider>
                            <ThemeProvider theme={darkTheme}>
                              <CssBaseline />
                                <RouterProvider router={AppRouter} />
                              <GlobalSnackbar />
                            </ThemeProvider>
                          </UserProvider>
                        </RoleProvider>
                      </TourTypeProvider>
                    </CancellationPolicyProvider>
                  </TourPackageProvider>
                </TouristDestinationProvider>
              </DateRangeProvider>
            </PaymentProvider>
      {/* </DashboardProvider> */}
          </BookingProvider2>
        </TouristProvider>
    </SnackbarProvider>
  );
}

export default App;
