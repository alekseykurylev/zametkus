import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Заметкус",
        short_name: "Заметкус",
        start_url: "/",
        lang: "ru-RU",
        background_color: "#e5e7eb",
        theme_color: "#e5e7eb",
        orientation: "portrait",
        display: "standalone",
        display_override: ["window-controls-overlay"],
        icons: [
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/screenshot-wide.png",
            sizes: "1280x720",
            type: "image/jpg",
            form_factor: "wide",
          },
          {
            src: "/screenshot-wide.png",
            sizes: "1280x720",
            type: "image/jpg",
            form_factor: "wide",
          },
          {
            src: "/screenshot-mobile.png",
            sizes: "750x1334",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "/screenshot-mobile.png",
            sizes: "750x1334",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
    }),
  ],
});
