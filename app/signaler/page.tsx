"use client";

import { useEffect, useRef, useState } from "react";
import ReportMap from "@/components/ReportMap";
import Eyebrow from "@/components/Eyebrow";
import { REPORT_TYPES } from "@/lib/products";

type Stage = "idle" | "locating" | "located" | "sent";
const COORDS = "45.7589° N, 4.8472° E";

export default function SignalerPage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [type, setType] = useState("maison");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const startReport = () => {
    setStage("locating");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStage("located"), 1700);
  };

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "44px 24px 80px" }}>
      <Eyebrow>Urgence · Réservé aux abonnés</Eyebrow>
      <h1 className="display on-bg" style={{ fontSize: "clamp(30px,4vw,46px)", color: "var(--ink)", marginBottom: 10 }}>
        Signaler un incendie
      </h1>
      <p className="on-bg-soft" style={{ fontSize: 16, color: "var(--muted)", maxWidth: "42em", marginBottom: 30 }}>
        En cas d’urgence réelle, déclenchez l’alerte. Votre position GPS sera transmise aux secours (18 · 112) et à vos
        contacts de confiance.
      </p>

      <div className="card">
        {/* map */}
        <div style={{ position: "relative", height: 300 }}>
          <ReportMap />
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 14,
              zIndex: 500,
              pointerEvents: "none",
              fontFamily: "ui-monospace,monospace",
              fontSize: 11,
              color: "var(--ink)",
              background: "var(--surface)",
              padding: "5px 9px",
              borderRadius: 6,
              boxShadow: "0 1px 5px rgba(0,0,0,.18)",
            }}
          >
            CARTE · position en temps réel
          </div>
          {stage === "located" && (
            <div
              style={{
                position: "absolute",
                bottom: 14,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 500,
                pointerEvents: "none",
                background: "var(--ink)",
                color: "#fff",
                fontSize: 12,
                padding: "6px 12px",
                borderRadius: 6,
                whiteSpace: "nowrap",
                fontFamily: "ui-monospace,monospace",
                boxShadow: "0 2px 8px rgba(0,0,0,.3)",
              }}
            >
              📍 {COORDS}
            </div>
          )}
          {stage === "locating" && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(20,17,14,.55)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                color: "#fff",
                zIndex: 600,
              }}
            >
              <div
                className="rat-spin"
                style={{ width: 38, height: 38, border: "3px solid rgba(255,255,255,.3)", borderTopColor: "#fff", borderRadius: "50%" }}
              />
              <span style={{ fontWeight: 600 }}>Localisation en cours…</span>
            </div>
          )}
        </div>

        <div style={{ padding: 28 }}>
          {stage === "idle" && (
            <div style={{ textAlign: "center" }}>
              <button
                className="btn-accent rat-pulse"
                onClick={startReport}
                style={{
                  width: 170,
                  height: 170,
                  borderRadius: "50%",
                  fontFamily: "var(--font-display)",
                  textTransform: "uppercase",
                  fontSize: 19,
                  letterSpacing: "0.03em",
                  lineHeight: 1.1,
                }}
              >
                Signaler
                <br />
                un incendie
              </button>
              <p style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 20 }}>
                Appuyez uniquement en cas d’urgence réelle. La géolocalisation se déclenche immédiatement.
              </p>
            </div>
          )}

          {stage === "locating" && (
            <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 15 }}>
              Acquisition de votre position GPS…
            </p>
          )}

          {stage === "located" && (
            <>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "var(--muted)",
                  marginBottom: 12,
                }}
              >
                Nature du sinistre
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {REPORT_TYPES.map((rt) => {
                  const active = type === rt.id;
                  return (
                    <button
                      key={rt.id}
                      onClick={() => setType(rt.id)}
                      style={{
                        padding: "11px 18px",
                        borderRadius: 999,
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: 14,
                        border: "1px solid var(--line)",
                        background: active ? "var(--accent)" : "var(--surface)",
                        color: active ? "#fff" : "var(--ink)",
                        borderColor: active ? "var(--accent)" : "var(--line)",
                      }}
                    >
                      {rt.label}
                    </button>
                  );
                })}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                  background: "var(--bg)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius)",
                  padding: 16,
                  marginBottom: 22,
                }}
              >
                <span style={{ color: "var(--accent)", fontSize: 20 }}>📍</span>
                <div style={{ fontSize: 13.5, color: "var(--ink)" }}>
                  <strong>Position confirmée</strong> · {COORDS}
                  <br />
                  <span style={{ color: "var(--muted)" }}>14 rue des Lilas, 69003 Lyon (précision ±8 m)</span>
                </div>
              </div>
              <button
                className="btn-accent"
                onClick={() => setStage("sent")}
                style={{ width: "100%", padding: 17, fontSize: 16.5, textTransform: "uppercase", letterSpacing: "0.03em" }}
              >
                Envoyer l’alerte aux secours
              </button>
              <p style={{ textAlign: "center", fontSize: 12.5, color: "var(--muted)", marginTop: 12 }}>
                Les services d’urgence (18 · 112) et vos contacts seront notifiés avec votre position.
              </p>
            </>
          )}

          {stage === "sent" && (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  margin: "0 auto 18px",
                  borderRadius: "50%",
                  background: "color-mix(in srgb, var(--accent) 14%, transparent)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                }}
              >
                ✓
              </div>
              <h2 className="display" style={{ textTransform: "uppercase", fontSize: 26, color: "var(--ink)", marginBottom: 10 }}>
                Alerte transmise
              </h2>
              <p style={{ fontSize: 15.5, color: "var(--muted)", lineHeight: 1.6, maxWidth: "34em", margin: "0 auto 22px" }}>
                Les secours ont été notifiés avec votre position.{" "}
                <strong style={{ color: "var(--ink)" }}>Mettez-vous en sécurité, éloignez-vous des flammes</strong> et
                n’inhalez pas les fumées.
              </p>
              <div
                style={{
                  display: "inline-flex",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  marginBottom: 24,
                }}
              >
                <div style={{ padding: "14px 22px", borderRight: "1px solid var(--line)" }}>
                  <div style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Intervention estimée
                  </div>
                  <div className="display" style={{ fontWeight: 700, fontSize: 26, color: "var(--accent)" }}>
                    ≈ 6 min
                  </div>
                </div>
                <div style={{ padding: "14px 22px" }}>
                  <div style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Réf. alerte
                  </div>
                  <div className="display" style={{ fontWeight: 700, fontSize: 26, color: "var(--ink)" }}>
                    #A-7731
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href="tel:112"
                  className="btn-accent"
                  style={{ padding: "14px 24px", textDecoration: "none" }}
                >
                  📞 Appeler le 112
                </a>
                <button
                  onClick={() => {
                    setStage("idle");
                    setType("maison");
                  }}
                  style={{
                    padding: "14px 24px",
                    background: "transparent",
                    color: "var(--ink)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius)",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Nouvelle alerte
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
