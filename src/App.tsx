import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "./context/SnackbarContext";
import GlobalSnackbar from "./utils/snackbar/GlobalSnackbar";

import "@fontsource/roboto/400.css"; // carga Roboto 400 por defecto
import "@fontsource/poppins/400.css"; // carga por defecto 400
// import "@fontsource/poppins/600.css"; // si necesitas peso específico
// import "@fontsource/poppins/700.css"; // si necesitas peso específico
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "video.js/dist/video-js.css";

import { Toaster } from "sileo";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#1976d2" },
  },
  typography: {
    fontFamily:
      '"Roboto","Montserrat","Poppins","Helvetica","Arial",sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SnackbarProvider>
        <Toaster
          position="bottom-left"
          options={{
            fill: "#ffffffff", // fondo
            roundness: 16, // border-radius
            styles: {
              title: "text-white font-semibold",
              description: "text-gray-800",
              badge: "bg-emerald-500",
            },
          }}
        />
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
