/**
 * Custom Theme Provider
 * ====================
 * This component provides theme context to the entire application
 */

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { lightPalette, darkPalette } from "./palettes";
import { getComponentOverrides } from "./components";
import { ColorMode, ColorModeContextType } from "./types";

// Create a context for toggling between light/dark mode
export const ColorModeContext = createContext<ColorModeContextType>({
  mode: "dark",
  toggleColorMode: () => {},
});

// Hook to use the color mode context
export const useColorMode = () => useContext(ColorModeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Custom Theme Provider that wraps MUI's ThemeProvider
 * Provides theme toggling functionality and applies the appropriate theme
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // State to track the current theme mode (light/dark)
  const [mode, setMode] = useState<ColorMode>("light");

  // Context value with mode and toggle function
  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );

  // Create the theme based on current mode
  const theme = useMemo(
    () =>
      createTheme({
        // Apply the appropriate palette based on mode
        palette: mode === "light" ? lightPalette : darkPalette,

        // Apply component overrides with current mode
        components: getComponentOverrides(mode),

        // Typography configuration
        typography: {
          fontFamily: '"Roboto", "Arial", sans-serif',
          h1: {
            fontSize: "2.5rem",
          },
          h2: {
            fontSize: "2rem",
          },
          h3: {
            fontSize: "1.5rem",
          },
          h4: {
            fontSize: "1.25rem",
          },
          h5: {
            fontSize: "1.1rem",
          },
          h6: {
            fontSize: "1rem",
            fontWeight: 500,
          },
        },

        // Shape customization
        shape: {
          borderRadius: 8,
        },
      }),
    [mode]
  );

  // Return the theme provider with color mode context
  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline normalizes browser styles and applies theme background */}
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};
