import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // ▼▼▼ 여기를 이렇게 수정해주세요! ▼▼▼
    tsconfigPaths({
      projects: ["./tsconfig.app.json"], 
    }),
    // ▲▲▲ 실제 경로 설정이 들어있는 파일을 직접 지정 ▲▲▲
  ],

  /* Fix port */
  server: {
    port: 5173,
  },
});