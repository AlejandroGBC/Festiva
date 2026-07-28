/**
 * Ubicación:
 *   src/app/manifest.ts
 *
 * Next.js App Router detecta este archivo automáticamente y sirve
 * /manifest.webmanifest, inyectando el <link rel="manifest"> solo con
 * que este archivo exista — no hace falta tocar layout.tsx para esto.
 */

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Festiva — Marketplace de Eventos",
    short_name: "Festiva",
    description: "Publica tu evento y recibe ofertas de los mejores proveedores.",
    start_url: "/cliente/inicio",
    display: "standalone",
    background_color: "#F5F2FA",
    theme_color: "#261E4E",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}