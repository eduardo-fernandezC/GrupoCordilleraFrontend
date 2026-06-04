import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// este archivo es para configurar vitest, el framework de testing que estamos usando.
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setupTests.js",

    css: true,

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
    },
  },
});