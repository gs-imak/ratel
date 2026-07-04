"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/lib/products";

export default function BoutiquePage() {
  const [cat, setCat] = useState("tous");
  const filtered = cat === "tous" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat);

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
      <div style={{ marginBottom: 30 }}>
        <h1 className="display on-bg" style={{ fontSize: "clamp(34px,4.5vw,52px)", color: "var(--ink)", marginBottom: 10 }}>
          Boutique
        </h1>
        <p className="on-bg-soft" style={{ fontSize: 16, color: "var(--muted)", maxWidth: "42em" }}>
          Extincteurs et équipements certifiés NF/CE, sélectionnés pour leur fiabilité. Le bon appareil dépend du
          risque — filtrez par usage.
        </p>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 30 }}>
        {CATEGORIES.map((c) => {
          const active = cat === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              style={{
                padding: "9px 18px",
                borderRadius: 999,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14,
                border: "1px solid var(--line)",
                background: active ? "var(--ink)" : "var(--surface)",
                color: active ? "#fff" : "var(--ink)",
                borderColor: active ? "var(--ink)" : "var(--line)",
              }}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 22 }}>
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} variant="shop" />
        ))}
      </div>
    </main>
  );
}
