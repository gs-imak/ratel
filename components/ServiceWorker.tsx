"use client";

import { useEffect } from "react";

/* Registers the service worker that makes the site installable and gives it an
   offline screen. Registration is deferred to the load event so it never competes
   with the first paint on a slow mobile connection. */
export default function ServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    /* Production only. The worker caches /_next/static/ cache-first, which is safe
       against `next build` because those filenames carry a content hash. Turbopack's
       dev server reuses stable chunk names instead and rewrites them in place, so in
       development the worker pins the first build it ever saw and every later CSS or
       JS change becomes invisible until the registration is manually cleared. That
       silently invalidates any local verification, which is worse than having no
       offline screen while developing. */
    if (process.env.NODE_ENV !== "production") return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* An unavailable service worker must never break the page: the site works
           exactly as before without it, it simply loses the offline screen. */
      });
    };

    if (document.readyState === "complete") register();
    else {
      window.addEventListener("load", register);
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
