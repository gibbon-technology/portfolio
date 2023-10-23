import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../server/public/main/",
    emptyOutDir: true,
    assetsDir: "main_assets",
  },
  server: {
    port: 3000,
    proxy: {
      "/api": { target: "http://localhost:9000/", secure: false },
    },
  },
});
