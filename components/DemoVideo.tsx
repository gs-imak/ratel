"use client";

import { useState } from "react";
import Link from "next/link";

/* PASS-method video, reserved for Ratalerte subscribers (client request).
   Demo gate: no real auth on this site yet — "Je suis abonné" unlocks locally. */
export default function DemoVideo() {
  const [unlocked, setUnlocked] = useState(false);

  if (unlocked) {
    return (
      <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
        <iframe
          src="https://www.youtube-nocookie.com/embed/Fm8bQ0bFG38?rel=0&modestbranding=1&autoplay=1"
          title="Comment utiliser un extincteur — méthode PASS"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, display: "block" }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        background:
          "radial-gradient(90% 90% at 50% 10%, rgba(216,30,39,.25), transparent 60%), #171310",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: 24,
        textAlign: "center",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 58,
          height: 58,
          borderRadius: "50%",
          background: "rgba(245,179,1,.15)",
          border: "1.5px solid var(--hi)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
        }}
      >
        🔒
      </span>
      <div>
        <div
          className="display"
          style={{ color: "#fff", fontSize: 20, textTransform: "uppercase", letterSpacing: "0.03em" }}
        >
          Vidéo réservée aux abonnés Ratalerte
        </div>
        <p style={{ color: "rgba(255,255,255,.7)", fontSize: 13.5, marginTop: 6, maxWidth: "34em" }}>
          La démonstration complète de la méthode P.A.S.S est accessible avec votre abonnement Ratalerte.
        </p>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <button
          className="btn-hi"
          onClick={() => setUnlocked(true)}
          style={{ padding: "11px 18px", fontSize: 14 }}
        >
          Je suis abonné — regarder ▶
        </button>
        <Link
          href="/signaler"
          style={{
            padding: "11px 18px",
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            border: "1.5px solid rgba(255,255,255,.35)",
            borderRadius: "var(--radius)",
            textDecoration: "none",
          }}
        >
          Découvrir Ratalerte →
        </Link>
      </div>
    </div>
  );
}
