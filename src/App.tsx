import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { UserProvider } from "./context/UserContext";
import { RoleProvider } from "./context/RoleContext";
import { TourTypeProvider } from "./context/TourTypeContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import GlobalSnackbar from "./utils/snackbar/GlobalSnackbar";
import { CancellationPolicyProvider } from "./features/cancellationPolicy/context/CancellationPolicyContext";
import { TouristDestinationProvider } from "./features/touristDestination/context/TouristDestinationContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  return (
    <SnackbarProvider>
      <TouristDestinationProvider>
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
      </TouristDestinationProvider>
    </SnackbarProvider>
  );
}

export default App;
