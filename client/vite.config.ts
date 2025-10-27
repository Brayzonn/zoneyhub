import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          utils: ["./src/utils/analytics.ts"],
        },
      },
    },
    outDir: "dist",
    target: "es2015",
  },
  server: {
    port: 3100,
  },
});
