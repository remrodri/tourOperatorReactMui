/**
 * Theme Color Palettes
 * ====================
 * This file defines color palettes for both light and dark themes
 */

import {
  amber,
  deepOrange,
  lightBlue,
  teal,
  purple,
  pink,
  grey,
} from "@mui/material/colors";
import { CustomPalette } from "./types";

/**
 * Light theme colors
 * =================
 * Define a comprehensive color palette for light mode
 */
export const lightPalette: CustomPalette = {
  mode: "light",
  // Main brand colors
  primary: {
    main: teal[600], // #00897b - Primary brand color
    light: teal[400], // #26a69a - Lighter variant
    // light: "rgba(255, 255, 255, 0.2)", // #26a69a - Lighter variant
    dark: teal[800], // #00695c - Darker variant
    contrastText: "#ffffff", // White text for contrast
  },
  secondary: {
    main: purple[500], // #9c27b0 - Secondary brand color
    light: purple[300], // #ba68c8 - Lighter variant
    dark: purple[700], // #7b1fa2 - Darker variant
    contrastText: "#ffffff", // White text for contrast
  },
  // Custom tertiary color
  tertiary: {
    main: amber[600], // #ffb300 - Custom tertiary color
    light: amber[400], // #ffca28 - Lighter variant
    dark: amber[800], // #ff8f00 - Darker variant
    contrastText: "#000000", // Black text for contrast
  },
  // Status colors
  success: {
    main: "#2e7d32", // Green
    light: "#4caf50",
    dark: "#1b5e20",
    contrastText: "#ffffff",
  },
  info: {
    main: lightBlue[600], // Blue
    light: lightBlue[400],
    dark: lightBlue[800],
    contrastText: "#ffffff",
  },
  warning: {
    main: amber[700], // Amber
    light: amber[500],
    dark: amber[900],
    contrastText: "#000000",
  },
  error: {
    main: "#d32f2f", // Red
    light: "#ef5350",
    dark: "#c62828",
    contrastText: "#ffffff",
  },
  // Surface colors
  background: {
    default: "#f5f5f5", // Light grey background
    paper: "#ffffff", // White paper components
    alternative: "#f0f7f7", // Custom alternative background
  },
  text: {
    primary: "#212121", // Nearly black text
    secondary: "#757575", // Grey text
    disabled: "#9e9e9e", // Light grey disabled text
  },
  // Tourism-specific colors for specialized components
  tourismPalette: {
    sea: lightBlue[300], // Light blue for sea/beach related content
    mountain: teal[700], // Teal for mountain related content
    desert: amber[200], // Light amber for desert related content
    forest: "#2e7d32", // Green for forest related content
    urban: grey[700], // Dark grey for urban/city related content
  },
};

/**
 * Dark theme colors
 * ================
 * Define a comprehensive color palette for dark mode
 */
export const darkPalette: CustomPalette = {
  mode: "dark",
  // Main brand colors - slightly adjusted for dark mode
  primary: {
    main: teal[300], // #4db6ac - Lighter teal for dark mode
    light: teal[200], // #80cbc4 - Even lighter
    dark: teal[500], // #009688 - Slightly darker
    contrastText: "#000000", // Black text for contrast
  },
  secondary: {
    main: purple[300], // #ba68c8 - Lighter purple for dark mode
    light: purple[200], // #ce93d8 - Even lighter
    dark: purple[500], // #9c27b0 - Slightly darker
    contrastText: "#000000", // Black text for contrast
  },
  // Custom tertiary color adjusted for dark mode
  tertiary: {
    main: amber[400], // #ffca28 - Lighter amber for dark mode
    light: amber[300], // #ffd54f - Even lighter
    dark: amber[600], // #ffb300 - Slightly darker
    contrastText: "#000000", // Black text for contrast
  },
  // Status colors adjusted for dark mode
  success: {
    main: "#66bb6a", // Lighter green for dark mode
    light: "#81c784",
    dark: "#388e3c",
    contrastText: "#000000",
  },
  info: {
    main: lightBlue[300], // Lighter blue for dark mode
    light: lightBlue[200],
    dark: lightBlue[500],
    contrastText: "#000000",
  },
  warning: {
    main: amber[500], // Lighter amber for dark mode
    light: amber[300],
    dark: amber[700],
    contrastText: "#000000",
  },
  error: {
    main: "#ef5350", // Lighter red for dark mode
    light: "#e57373",
    dark: "#d32f2f",
    contrastText: "#000000",
  },
  // Surface colors for dark mode
  background: {
    default: "#121212", // Dark background
    paper: "#1e1e1e", // Slightly lighter paper components
    alternative: "#0a1f1f", // Dark teal tinted background
  },
  text: {
    primary: "#ffffff", // White text
    secondary: "#b0b0b0", // Light grey text
    disabled: "#6e6e6e", // Darker grey disabled text
  },
  // Tourism-specific colors adjusted for dark mode
  tourismPalette: {
    sea: lightBlue[700], // Darker blue for sea/beach related content
    mountain: teal[300], // Lighter teal for mountain related content
    desert: amber[500], // Slightly darker amber for desert related content
    forest: "#66bb6a", // Lighter green for forest related content
    urban: grey[300], // Lighter grey for urban/city related content
  },
};
