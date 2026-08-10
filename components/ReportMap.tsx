"use client";

import { useEffect, useRef } from "react";
import { ensureLeaflet, pin } from "@/lib/leaflet";

export default function ReportMap() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    ensureLeaflet()
      .then((L) => {
        if (cancelled) return;
        const el = document.getElementById("ratel-map-report");
        if (!el || mapRef.current) return;
        // Avenue de la Victoire, Kinshasa (client-supplied location)
        const home: [number, number] = [-4.33876, 15.30725];
        const map = L.map(el, {
          zoomControl: true,
          /* Required by the OpenStreetMap tile policy. See TrackMap. */
          attributionControl: true,
          scrollWheelZoom: false,
        }).setView(home, 16);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
        L.marker(home, { icon: pin(L, "#D81E27", true) }).addTo(map);
        mapRef.current = map;
        setTimeout(() => map.invalidateSize(), 120);
        setTimeout(() => map.invalidateSize(), 500);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="ratel-map-report" style={{ position: "absolute", inset: 0, background: "#e7ebe3", zIndex: 0 }} />;
}
