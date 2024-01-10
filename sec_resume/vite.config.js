import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../server/public/sec_resume/",
    emptyOutDir: true,
    assetsDir: "sec_resume_assets",
  },
});
