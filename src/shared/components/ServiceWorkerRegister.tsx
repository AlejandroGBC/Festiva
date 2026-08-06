"use client";

/**
 * Ubicación sugerida:
 *   src/shared/components/ServiceWorkerRegister.tsx
 *
 * No renderiza nada visible. Se agrega UNA vez en el layout raíz.
 */

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.error("Error registrando service worker:", err));
    }
  }, []);

  return null;
}