import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

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
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
      "@router": fileURLToPath(new URL("./src/router", import.meta.url)),
      "@auth": fileURLToPath(new URL("./src/pages/auth", import.meta.url)),
      "@main": fileURLToPath(new URL("./src/pages/main", import.meta.url)),
      "@my": fileURLToPath(new URL("./src/pages/my", import.meta.url)),
      "@apis": fileURLToPath(new URL("./src/apis", import.meta.url)),
      "src": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  /* Fix port */
  server: {
    port: 5173,
  },
});