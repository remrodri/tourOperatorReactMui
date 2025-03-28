/**
 * Theme Component Overrides
 * =========================
 * This file defines how components should look in each theme mode
 */

import { Components, Theme } from "@mui/material";
import { amber, lightBlue, pink, purple, teal } from "@mui/material/colors";
import { ColorMode } from "./types";
import { darkPalette, lightPalette } from "./palettes";

/**
 * Get component style overrides based on the current theme mode
 * @param mode - The current color mode ('light' or 'dark')
 * @returns Component style overrides for the specified mode
 */
export const getComponentOverrides = (mode: ColorMode): Components<Theme> => ({
  // Custom button variants
  MuiButton: {
    // styleOverrides: {
    //   root: {
    //     borderRadius: 8, // Rounded corners for all buttons
    //     textTransform: 'none', // Prevent uppercase transformation
    //   },
    // },
    variants: [
      // Tourism-themed button variant
      {
        props: {
          variant: "outlined",
          color: "primary",
          className: "tourism-button",
        },
        style: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
          },
          // Add palm tree icon using ::before pseudo-element
          "&::before": {
            content: '"🌴"',
            marginRight: "8px",
          },
        },
      },
      // Special promotion button
      {
        props: { variant: "contained", className: "promo-button" },
        style: {
          background: `linear-gradient(45deg, ${
            mode === "light" ? purple[500] : purple[300]
          } 30%, ${mode === "light" ? pink[500] : pink[300]} 90%)`,
          color: mode === "light" ? "#ffffff" : "#000000",
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        },
      },
    ],
  },
  // Custom card styling
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12, // More rounded cards
        boxShadow:
          mode === "light"
            ? "0 4px 12px rgba(255, 255, 255, 0.2)"
            : "0 4px 12px rgba(0,0,0,0.4)",
      },
    },
    variants: [
      // Tourism destination card variant
      {
        props: { className: "destination-card" },
        style: {
          overflow: "hidden",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "5px",
            background: `linear-gradient(90deg, ${teal[500]}, ${lightBlue[500]})`,
          },
        },
      },
    ],
  },
  // Custom paper styling with tourism-specific variants
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none", // Remove default background image
      },
    },
    variants: [
      // Sea-themed paper variant
      {
        props: { className: "sea-themed" },
        style: {
          backgroundColor:
            mode === "light"
              ? lightPalette.tourismPalette.sea
              : darkPalette.tourismPalette.sea,
          borderLeft: `4px solid ${lightBlue[500]}`,
        },
      },
      // Mountain-themed paper variant
      {
        props: { className: "mountain-themed" },
        style: {
          backgroundColor:
            mode === "light"
              ? lightPalette.tourismPalette.mountain
              : darkPalette.tourismPalette.mountain,
          borderLeft: `4px solid ${teal[500]}`,
          color: mode === "light" ? "#ffffff" : "#000000",
        },
      },
    ],
  },
  // Custom typography styles
  MuiTypography: {
    styleOverrides: {
      h1: {
        fontWeight: 700,
        letterSpacing: "-0.01em",
      },
      h2: {
        fontWeight: 600,
      },
      // Tourism headings with special styling
      h3: {
        fontWeight: 600,
        position: "relative",
        "&.tourism-heading::after": {
          content: '""',
          position: "absolute",
          bottom: "-8px",
          left: 0,
          width: "40px",
          height: "3px",
          backgroundColor: mode === "light" ? teal[500] : teal[300],
        },
      },
    },
  },
  // Custom form field styling
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: 8,
        },
      },
    },
  },
});
