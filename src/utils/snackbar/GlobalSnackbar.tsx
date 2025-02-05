import { Alert, Snackbar } from "@mui/material";
import { useNewSnackbar } from "../../features/userManagement/context/SnackbarContext";

const GlobalSnackbar = () => {
  const { openSnackbar, message, severity, closeSnackbar } = useNewSnackbar();
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={5000}
      onClose={closeSnackbar}
    >
      <Alert
        onClose={closeSnackbar}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
export default GlobalSnackbar;
