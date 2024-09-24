// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Check if the environment is production
const isProduction = process.env.NODE_ENV === "production";

const targetUrl = isProduction
  ? "http://linnovate-app-1:3000"
  : "http://localhost:8080";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/api": {
        target: targetUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
      },
    },
  },
});
