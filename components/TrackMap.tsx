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
        // Kinshasa route (client-supplied): Avenue de la Victoire → centre-ville
        const depot: [number, number] = [-4.33876, 15.30725];
        const home: [number, number] = [-4.30325, 15.31053];
        const route: [number, number][] = [
          depot,
          [-4.332, 15.3078],
          [-4.3245, 15.3084],
          [-4.3165, 15.3094],
          [-4.3095, 15.31],
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
