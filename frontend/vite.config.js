import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync("/Users/umeetvaswani/vfitt-hub/.certs/key.pem"),
      cert: fs.readFileSync("/Users/umeetvaswani/vfitt-hub/.certs/cert.pem"),
    },
    port: 5173,
    host: "localhost",
    strictPort: false,
  },
});
