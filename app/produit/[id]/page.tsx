"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useCart } from "@/lib/store";
import { productById } from "@/lib/products";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const { add } = useCart();
  /* A wrong or stale URL used to silently serve the first product instead, so a
     customer following a dead link saw a different item than the one they asked
     for, at HTTP 200. */
  const sel = productById(params.id);

  /* Hooks stay above the notFound() bail-out so their order never varies. */
  const [imgIdx, setImgIdx] = useState(0);
  useEffect(() => setImgIdx(0), [sel?.id]);

  if (!sel) notFound();

  const gallery = sel.gallery ?? [sel.img];
  const mainImg = gallery[imgIdx] ?? sel.img;

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
        className="on-bg-soft"
        style={{ color: "var(--muted)", fontWeight: 600, fontSize: 14, textDecoration: "none", display: "inline-block", marginBottom: 24 }}
      >
        ← Retour à la boutique
      </Link>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 48 }}>
        <div>
          <div
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              borderRadius: "var(--radius)",
              background: "#fff",
              overflow: "hidden",
              border: "1px solid var(--line)",
            }}
          >
            <Image
              src={mainImg}
              alt={sel.name}
              fill
              priority
              sizes="(max-width: 700px) 100vw, 560px"
              className="pimg"
              style={{ objectFit: "cover" }}
            />
          </div>
          {gallery.length > 1 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10, marginTop: 10 }}>
              {gallery.map((g, i) => (
                <button
                  key={g}
                  onClick={() => setImgIdx(i)}
                  aria-label={`Photo ${i + 1}`}
                  style={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                    borderRadius: 6,
                    overflow: "hidden",
                    padding: 0,
                    cursor: "pointer",
                    background: "#fff",
                    border: i === imgIdx ? "2px solid var(--accent)" : "1px solid var(--line)",
                  }}
                >
                  <Image src={g} alt="" fill sizes="110px" style={{ objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
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
              background: "var(--surface)",
              border: "1px solid rgba(255,255,255,.4)",
              padding: "5px 11px",
              borderRadius: 999,
              marginBottom: 16,
            }}
          >
            {sel.tag}
          </span>
          <h1
            className="display on-bg"
            style={{ fontSize: "clamp(30px,3.6vw,44px)", color: "var(--ink)", lineHeight: 1.05, marginBottom: 14 }}
          >
            {sel.name}
          </h1>
          <p className="on-bg-soft" style={{ fontSize: 16, lineHeight: 1.65, color: "var(--muted)", marginBottom: 24 }}>
            {sel.blurb}
          </p>

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
              className={sel.inStock ? "btn-accent" : undefined}
              onClick={() => add(sel.id)}
              disabled={!sel.inStock}
              style={{
                flex: 1,
                minWidth: 180,
                padding: "16px 24px",
                fontSize: 16,
                ...(sel.inStock
                  ? {}
                  : {
                      background: "var(--bg)",
                      color: "var(--muted)",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--radius)",
                      fontWeight: 700,
                      cursor: "not-allowed",
                    }),
              }}
            >
              {sel.inStock ? "Ajouter au panier" : "En rupture de stock"}
            </button>
          </div>
          {!sel.inStock && (
            <p style={{ marginTop: 12, fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
              Ce produit est momentanément indisponible
              {sel.restockLabel ? `, ${sel.restockLabel}` : ""}. Contactez-nous pour être prévenu de son
              retour.
            </p>
          )}
          <div className="on-bg-soft" style={{ display: "flex", gap: 22, marginTop: 18, flexWrap: "wrap", fontSize: 13.5, color: "var(--muted)" }}>
            <span>🚚 Livraison 24-48h</span>
            <span>🛡️ Garantie 6 mois</span>
            <span>↩ Retour 30 jours</span>
          </div>
        </div>
      </div>
    </main>
  );
}
