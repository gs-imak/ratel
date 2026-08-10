"use client";

import { useEffect } from "react";

/* Registers the service worker that makes the site installable and gives it an
   offline screen. Registration is deferred to the load event so it never competes
   with the first paint on a slow mobile connection. */
export default function ServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

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
