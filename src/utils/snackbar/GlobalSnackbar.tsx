import { Alert, Snackbar } from "@mui/material";
import { useNewSnackbar } from "../../context/SnackbarContext";

const GlobalSnackbar = () => {
  const { openSnackbar, message, severity, closeSnackbar } = useNewSnackbar();
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={closeSnackbar}
    >
      <Alert
        onClose={closeSnackbar}
        severity={severity}
        // variant="outlined"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
export default GlobalSnackbar;
