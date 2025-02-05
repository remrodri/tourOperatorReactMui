import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { UserProvider } from "./features/userManagement/context/UserContext";
import { RoleProvider } from "./features/userManagement/context/RoleContext";
import { TourTypeProvider } from "./features/userManagement/context/TourTypeContext";
import { SnackbarProvider } from "./features/userManagement/context/SnackbarContext";
import GlobalSnackbar from "./utils/snackbar/GlobalSnackbar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  return (
    <SnackbarProvider>
      <TourTypeProvider>
        <RoleProvider>
          <UserProvider>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <RouterProvider router={AppRouter} />
              <GlobalSnackbar/>
            </ThemeProvider>
          </UserProvider>
        </RoleProvider>
      </TourTypeProvider>
    </SnackbarProvider>
  );
}

export default App;
