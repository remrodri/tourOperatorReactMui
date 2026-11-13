import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ["**/*.webp"],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    css: true,
    exclude: [
      ...configDefaults.exclude,
      "e2e/*",
      "src/features/booking/test/bookingService.test.ts",
      "src/features/touristDestination/tests/touristDestinationService.test.ts",
      "src/features/tourPackage/test/tourPackageService.test.ts",
      "src/features/tourType/tests/tourTypeService.test.ts",
      "src/features/userManagement/tests/userService.test.ts",
    ],
  },
});
