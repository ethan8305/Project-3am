"use client";

import { useEffect } from "react";

// Registers the service worker for offline support, in production only. It is
// client-side only and stores nothing personal.
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      process.env.NODE_ENV === "production" &&
      typeof navigator !== "undefined" &&
      "serviceWorker" in navigator
    ) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Offline support is a progressive enhancement: ignore failures.
      });
    }
  }, []);

  return null;
}
