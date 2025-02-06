import { AlertColor } from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";

interface SnackbarContexType {
  openSnackbar: boolean;
  message: string;
  severity: AlertColor;
  showSnackbar: (message: string, severity: AlertColor) => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContexType | undefined>(
  undefined
);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const showSnackbar = (message: string, severity: AlertColor) => {
    setMessage(message);
    setSeverity(severity);
    setOpenSnackbar(true);
  };

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        openSnackbar,
        message,
        severity,
        showSnackbar,
        closeSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const useNewSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
