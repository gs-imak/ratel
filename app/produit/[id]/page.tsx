"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/lib/store";
import { PRODUCTS, productById } from "@/lib/products";

const THUMB_BG = "repeating-linear-gradient(135deg,#f0ece7 0 8px,#e8e3dd 8px 16px)";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const { add } = useCart();
  const sel = productById(params.id) ?? PRODUCTS[0];

  const meta: [string, string][] = [
    ["Agent", sel.type],
    ["Capacité", sel.cap],
    ["Classes de feu", sel.classes],
    ["Norme", "NF · CE · EN 3"],
  ];

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 80px" }}>
      <Link
        href="/boutique"
        style={{ color: "var(--muted)", fontWeight: 600, fontSize: 14, textDecoration: "none", display: "inline-block", marginBottom: 24 }}
      >
        ← Retour à la boutique
      </Link>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 48 }}>
        <div>
          <div
            style={{
              aspectRatio: "1 / 1",
              borderRadius: "var(--radius)",
              background: "#fff",
              overflow: "hidden",
              border: "1px solid var(--line)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sel.img}
              alt={sel.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginTop: 10 }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  aspectRatio: "1 / 1",
                  borderRadius: 6,
                  backgroundImage: THUMB_BG,
                  border: "1px solid var(--line)",
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--accent)",
              background: "color-mix(in srgb, var(--accent) 10%, transparent)",
              padding: "5px 11px",
              borderRadius: 999,
              marginBottom: 16,
            }}
          >
            {sel.tag}
          </span>
          <h1
            className="display"
            style={{ fontSize: "clamp(30px,3.6vw,44px)", color: "var(--ink)", lineHeight: 1.05, marginBottom: 14 }}
          >
            {sel.name}
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--muted)", marginBottom: 24 }}>{sel.blurb}</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
              background: "var(--line)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              marginBottom: 28,
            }}
          >
            {meta.map(([label, val]) => (
              <div key={label} style={{ background: "var(--surface)", padding: 16 }}>
                <div
                  style={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--muted)",
                    marginBottom: 4,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontWeight: 700, color: "var(--ink)" }}>{val}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
              padding: 22,
              border: "1px solid var(--line)",
              borderRadius: "var(--radius)",
              background: "var(--surface)",
            }}
          >
            <span className="display" style={{ fontWeight: 700, fontSize: 38, color: "var(--ink)" }}>
              {sel.priceLabel}
            </span>
            <button
              className="btn-accent"
              onClick={() => add(sel.id)}
              style={{ flex: 1, minWidth: 180, padding: "16px 24px", fontSize: 16 }}
            >
              Ajouter au panier
            </button>
          </div>
          <div style={{ display: "flex", gap: 22, marginTop: 18, flexWrap: "wrap", fontSize: 13.5, color: "var(--muted)" }}>
            <span>🚚 Livraison 24-48h</span>
            <span>🛡️ Garantie 6 mois</span>
            <span>↩ Retour 30 jours</span>
          </div>
        </div>
      </div>
    </main>
  );
}
