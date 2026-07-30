import Link from "next/link";
import { Red } from "@/components/Brand";

/* Every entry points at a route that exists. These used to be plain <span>s, so the
   footer looked like navigation but nothing in it was clickable. */
const COLS: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: "Boutique",
    items: [
      { label: "Tous les produits", href: "/boutique" },
      { label: "Maison", href: "/boutique?cat=maison" },
      { label: "Voiture", href: "/boutique?cat=voiture" },
      { label: "Cuisine", href: "/boutique?cat=cuisine" },
      { label: "Entreprise & ERP", href: "/boutique?cat=entreprise" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Ratalerte, alerte géolocalisée", href: "/signaler" },
      { label: "Formation incendie sur site", href: "/formation" },
      { label: "Plans d'évacuation", href: "/secteurs" },
      { label: "Solutions par secteur", href: "/secteurs" },
      { label: "Suivi de livraison", href: "/suivi" },
      { label: "Devis gratuit", href: "/devis" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "rgba(255,255,255,.7)" }}>
      {/* mirrors the header caution stripe — bookends every page */}
      <div className="hazard" />
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
            {/* white chip so the emblem's black/dark shapes stay visible on the dark footer */}
            <span
              style={{
                width: 42,
                height: 42,
                borderRadius: 8,
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-emblem.svg" alt="" style={{ width: 34, height: 34, display: "block" }} />
            </span>
            <span
              className="display"
              style={{
                fontSize: 21,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#e30613",
                lineHeight: 1,
              }}
            >
              <span style={{ fontSize: 28 }}>R</span>atel
            </span>
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, maxWidth: "22em" }}>
            La vie n’a pas de prix. Prévention Sécurité Incendie — pour protéger ce qui compte.
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
                <Link
                  key={i.label}
                  href={i.href}
                  style={{ color: "rgba(255,255,255,.7)", textDecoration: "none" }}
                >
                  {i.label}
                </Link>
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
          <span>
            © 2026 <Red>Ratel</Red> — Prévention Sécurité Incendie
          </span>
          {/* "Mentions légales · CGV" was printed here as inert text with no pages behind
              it. The client's legal adviser is drafting the contracts; link these once the
              real pages exist rather than implying they are already available. */}
          <span>Paiement par mobile money</span>
        </div>
      </div>
    </footer>
  );
}
