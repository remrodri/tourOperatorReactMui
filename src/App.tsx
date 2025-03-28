import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { UserProvider } from "./context/UserContext";
import { RoleProvider } from "./context/RoleContext";
import { TourTypeProvider } from "./features/tourType/context/TourTypeContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import GlobalSnackbar from "./utils/snackbar/GlobalSnackbar";
import { CancellationPolicyProvider } from "./features/cancellationPolicy/context/CancellationPolicyContext";
import { TouristDestinationProvider } from "./features/touristDestination/context/TouristDestinationContext";
import { TourPackageProvider } from "./features/tourPackage/context/TourPackageContext";
import { DateRangeProvider } from "./features/dateRange/context/DateRangeContext";

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
    </SnackbarProvider>
  );
}

export default App;
