/**
 * Theme type definitions
 * ======================
 * This file contains TypeScript interfaces for our custom theme
 */

import { PaletteOptions } from "@mui/material";

/**
 * Custom colors interface for our application
 * Extends the default Material UI palette with our specific needs
 */
export interface CustomColors {
  // Main brand colors are extended with custom properties
  primary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  // Custom tertiary color for additional brand accent
  tertiary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  // Special purpose colors
  success: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  info: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  warning: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  error: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  // Surface colors
  background: {
    default: string;
    paper: string;
    alternative?: string;
  };
  // Tourism-specific colors
  tourismPalette: {
    sea: string;
    mountain: string;
    desert: string;
    forest: string;
    urban: string;
  };
}

// Type to use with our custom theme palettes
export type CustomPalette = PaletteOptions & CustomColors;

// Type for color mode
export type ColorMode = 'light' | 'dark';

// Context type for color mode toggling
export interface ColorModeContextType {
  mode: ColorMode;
  toggleColorMode: () => void;
}

