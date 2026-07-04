import TrackMap from "@/components/TrackMap";
import { TIMELINE } from "@/lib/products";

export default function SuiviPage() {
  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "44px 24px 80px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div>
          <h1 className="display on-bg" style={{ fontSize: "clamp(30px,4vw,46px)", color: "var(--ink)", lineHeight: 1 }}>
            Suivi de livraison
          </h1>
          <p className="on-bg-soft" style={{ fontSize: 15, color: "var(--muted)", marginTop: 8 }}>
            Commande <strong style={{ color: "#fff" }}>#RTL-2048</strong> · livreur en route
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="on-bg-soft" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)" }}>
            Arrivée estimée
          </div>
          <div className="display on-bg-gold" style={{ fontWeight: 700, fontSize: 34, color: "var(--accent)" }}>
            17 : 42
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1.5fr))",
          gap: 28,
          alignItems: "start",
        }}
      >
        <div className="card">
          <div style={{ position: "relative", height: 360 }}>
            <TrackMap />
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
              CARTE · itinéraire en temps réel
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 14,
                left: 14,
                zIndex: 500,
                pointerEvents: "none",
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 6,
                padding: "8px 12px",
                fontSize: 12.5,
                color: "var(--ink)",
                boxShadow: "0 2px 8px rgba(0,0,0,.15)",
              }}
            >
              <strong>Yanis · livreur Ratel</strong> · à 2,3 km
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 26 }}>
          <h3 className="display" style={{ textTransform: "uppercase", fontSize: 17, color: "var(--ink)", marginBottom: 22 }}>
            État de la commande
          </h3>
          {TIMELINE.map((tl, i) => {
            const last = i === TIMELINE.length - 1;
            const done = tl.state === "done";
            const active = tl.state === "active";
            return (
              <div key={tl.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                  <span
                    className={active ? "rat-pulse" : undefined}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      ...(done
                        ? { background: "var(--accent)", color: "#fff" }
                        : active
                        ? { background: "#fff", border: "3px solid var(--accent)", color: "var(--accent)" }
                        : { background: "var(--bg)", border: "2px solid var(--line)", color: "var(--muted)" }),
                    }}
                  >
                    {done ? "✓" : ""}
                  </span>
                  <span
                    style={{
                      width: 2,
                      height: 34,
                      background: last ? "transparent" : done ? "var(--accent)" : "var(--line)",
                    }}
                  />
                </div>
                <div style={{ paddingBottom: 18 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: done || active ? "var(--ink)" : "var(--muted)" }}>
                    {tl.title}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>{tl.time}</div>
                </div>
              </div>
            );
          })}
          <button
            style={{
              width: "100%",
              marginTop: 6,
              padding: 13,
              background: "transparent",
              color: "var(--ink)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius)",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Contacter le livreur
          </button>
        </div>
      </div>
    </main>
  );
}
