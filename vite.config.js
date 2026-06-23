import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig(({ command }) => {
  const isDev = command === "serve";

  return {
    plugins: [react()],
    base: "/",

    server: isDev
      ? {
          https: {
            key: fs.readFileSync(
              ".certs/key.pem"
            ),
            cert: fs.readFileSync(
              ".certs/cert.pem"
            ),
          },
          port: 5173,
          host: "localhost",
          strictPort: false,
        }
      : undefined,
  };
});
