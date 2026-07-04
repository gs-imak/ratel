import Link from "next/link";
import { SECTORS } from "@/lib/products";

export default function SecteursPage() {
  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
      <div style={{ maxWidth: "46em", marginBottom: 36 }}>
        <div
          className="on-bg-gold"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontSize: 12,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "var(--accent)",
            marginBottom: 14,
          }}
        >
          <span style={{ width: 26, height: 2, background: "var(--hi)", display: "inline-block" }} />
          Solutions par secteur
        </div>
        <h1 className="display on-bg" style={{ fontSize: "clamp(34px,4.5vw,52px)", color: "var(--ink)", marginBottom: 12 }}>
          Chaque secteur, son risque
        </h1>
        <p className="on-bg-soft" style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6 }}>
          De l’aéroport à la salle de classe, chaque établissement a ses obligations et ses risques propres. Nous
          équipons et accompagnons chaque type de site — demandez un devis adapté à votre activité.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 22 }}>
        {SECTORS.map((s) => (
          <div key={s.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
            <div className="hazard" />
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
              <span
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: "color-mix(in srgb, var(--trust) 12%, transparent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
                aria-hidden
              >
                {s.icon}
              </span>
              <h2 className="display" style={{ fontSize: 21, color: "var(--ink)" }}>
                {s.label}
              </h2>
              <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.55, flex: 1 }}>{s.desc}</p>
              <Link
                href={`/devis?secteur=${s.id}`}
                className="link-blue"
                style={{ marginTop: 4, fontSize: 14.5 }}
              >
                Demander un devis →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* bottom CTA */}
      <div
        style={{
          marginTop: 44,
          background: "var(--ink)",
          color: "#fff",
          borderRadius: "var(--radius)",
          padding: "40px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 className="display" style={{ fontSize: "clamp(24px,3vw,34px)", marginBottom: 8 }}>
            Un projet, un site à équiper ?
          </h2>
          <p style={{ color: "rgba(255,255,255,.75)", fontSize: 15.5, maxWidth: "34em" }}>
            Recevez une étude et un devis gratuits, adaptés à votre secteur, en moins de 24 heures.
          </p>
        </div>
        <Link
          href="/devis"
          className="btn-hi"
          style={{ padding: "16px 26px", fontSize: 15.5, textDecoration: "none", whiteSpace: "nowrap" }}
        >
          Devis gratuit →
        </Link>
      </div>
    </main>
  );
}
