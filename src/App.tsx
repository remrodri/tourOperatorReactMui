import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { UserProvider } from "./features/userManagement/context/UserContext";
import { RoleProvider } from "./features/userManagement/context/RoleContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  return (
    <RoleProvider>
      <UserProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <RouterProvider router={AppRouter} />
        </ThemeProvider>
      </UserProvider>
    </RoleProvider>
  );
}

export default App;
