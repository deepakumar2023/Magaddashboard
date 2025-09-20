import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  server: {
    proxy: {
      // Proxy all requests starting with /api/v1 to the backend
      "/api/v1": {
        target: "https://api.aspirationladder.org",
        changeOrigin: true,
        secure: false, // disable SSL check if needed
      },
    },
  },
});
