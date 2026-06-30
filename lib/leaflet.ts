/* Lazy-load Leaflet from CDN, once, on the client. Mirrors the original
   design which pulled leaflet 1.9.4 from unpkg. */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type L = any;

let loader: Promise<L> | null = null;

export function ensureLeaflet(): Promise<L> {
  if (typeof window === "undefined") return Promise.reject(new Error("ssr"));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (w.L) return Promise.resolve(w.L);
  if (loader) return loader;

  loader = new Promise<L>((resolve, reject) => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => resolve(w.L);
    script.onerror = () => reject(new Error("leaflet failed to load"));
    document.head.appendChild(script);
  });
  return loader;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pin(L: any, color: string, pulse: boolean) {
  return L.divIcon({
    className: "",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    html: `<div style="width:18px;height:18px;border-radius:50%;background:${color};border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);${
      pulse ? "animation:ratPulse 1.8s infinite" : ""
    }"></div>`,
  });
}
