import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "./context/SnackbarContext";
import { AppProviders } from "./context/AppProviders";
import GlobalSnackbar from "./utils/snackbar/GlobalSnackbar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#1976d2" },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SnackbarProvider>
        {/* RouterProvider debe ir ANTES que AppProviders */}
        {/* <AppProviders> */}
          <RouterProvider router={AppRouter} />
          {/* Ahora todos los providers pueden usar hooks de React Router */}
          {/* <AppProviders> */}
          {/* El contenido se renderiza a través de las rutas */}
          {/* </AppProviders> */}
          {/* </RouterProvider> */}
          {/* GlobalSnackbar necesario para mostrar notificaciones */}
          <GlobalSnackbar />
        {/* </AppProviders> */}
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
