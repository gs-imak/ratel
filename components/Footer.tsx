const COLS = [
  { title: "Boutique", items: ["Extincteurs", "Détecteurs", "Couvertures anti-feu", "Entreprises & ERP"] },
  { title: "Services", items: ["Alerte géolocalisée", "Suivi de livraison", "Conseil & diagnostic", "Maintenance"] },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "rgba(255,255,255,.7)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "54px 24px 30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 32,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 14 }}>
            <span
              className="display"
              style={{ fontSize: 21, letterSpacing: "0.04em", textTransform: "uppercase", color: "#fff" }}
            >
              Ratel
            </span>
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, maxWidth: "22em" }}>
            La vie n’a pas de prix. Prévention, formation et sécurité incendie — pour protéger ce qui compte.
          </p>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 14,
              }}
            >
              {col.title}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: 14 }}>
              {col.items.map((i) => (
                <span key={i}>{i}</span>
              ))}
            </div>
          </div>
        ))}

        <div>
          <div
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: 14,
            }}
          >
            Certifications
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["NF", "CE", "EN 3"].map((c) => (
              <span
                key={c}
                style={{
                  border: "1px solid rgba(120,170,230,.55)",
                  background: "rgba(30,99,176,.22)",
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontWeight: 700,
                  color: "#cfe0f5",
                  fontSize: 13,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.12)" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10,
            fontSize: 12.5,
            color: "rgba(255,255,255,.5)",
          }}
        >
          <span>© 2026 Ratel — Prévention &amp; Sécurité anti-incendie</span>
          <span>Paiement sécurisé · Mentions légales · CGV</span>
        </div>
      </div>
    </footer>
  );
}
