import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      projects: ["./tsconfig.app.json"],
    }),
  ],

  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@router": path.resolve(__dirname, "./src/router"),
      "@auth": path.resolve(__dirname, "./src/pages/auth"),
      "@main": path.resolve(__dirname, "./src/pages/main"),
      "@my": path.resolve(__dirname, "./src/pages/my"),
      "@apis": path.resolve(__dirname, "./src/apis"),
      "src": path.resolve(__dirname, "./src"),
    },
  },

  /* Fix port */
  server: {
    port: 5173,
  },
});