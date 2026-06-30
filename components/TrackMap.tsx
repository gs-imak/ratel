"use client";

import { useEffect, useRef } from "react";
import { ensureLeaflet, pin } from "@/lib/leaflet";

export default function TrackMap() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    ensureLeaflet()
      .then((L) => {
        if (cancelled) return;
        const el = document.getElementById("ratel-map-track");
        if (!el || mapRef.current) return;
        const depot: [number, number] = [45.7375, 4.82];
        const home: [number, number] = [45.7589, 4.8472];
        const route: [number, number][] = [
          depot,
          [45.7402, 4.829],
          [45.7461, 4.8331],
          [45.751, 4.8398],
          [45.7548, 4.8441],
          home,
        ];
        const map = L.map(el, { zoomControl: true, attributionControl: false, scrollWheelZoom: false });
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
        L.polyline(route, { color: "#D81E27", weight: 5, opacity: 0.9, lineCap: "round" }).addTo(map);
        L.marker(depot, { icon: pin(L, "#16110D", false) }).addTo(map);
        L.marker(home, { icon: pin(L, "#D81E27", true) }).addTo(map);
        const truck = L.divIcon({
          className: "",
          iconSize: [40, 26],
          iconAnchor: [20, 13],
          html: '<div style="width:40px;height:26px;background:#16110D;border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;box-shadow:0 3px 10px rgba(0,0,0,.35)">🚚</div>',
        });
        L.marker(route[3], { icon: truck }).addTo(map);
        map.fitBounds(L.latLngBounds(route), { padding: [44, 44] });
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

  return <div id="ratel-map-track" style={{ position: "absolute", inset: 0, background: "#e7ebe3", zIndex: 0 }} />;
}
