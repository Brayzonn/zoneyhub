import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePrerenderPlugin({
      additionalPrerenderRoutes: [
        "/blog/i-tried-writing-today",
        "/blog/automating-postgresql-backups-with-cloudflare-r2",
      ],
    }),
  ],
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
    host: true,
    port: 3100,
  },
});
