"use client";

import Link from "next/link";
import { useCart } from "@/lib/store";
import type { Product } from "@/lib/products";

export default function ProductCard({
  product,
  variant = "shop",
}: {
  product: Product;
  variant?: "featured" | "shop";
}) {
  const { add } = useCart();
  // One image ratio across the whole catalog (also keeps the client's square
  // marketing visual uncropped).
  const aspect = "1 / 1";

  return (
    <div
      className="card card-hover"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Link
        href={`/produit/${product.id}`}
        style={{ display: "block", textDecoration: "none" }}
      >
        <div style={{ aspectRatio: aspect, background: "#fff", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.img}
            alt={product.name}
            loading="lazy"
            className="pimg"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </Link>
      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 9, flex: 1 }}>
        <span
          style={{
            alignSelf: "flex-start",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--accent)",
            background: "color-mix(in srgb, var(--accent) 10%, transparent)",
            padding: "4px 9px",
            borderRadius: 999,
          }}
        >
          {product.tag}
        </span>
        {/* The title links too. Previously only the photo navigated, which is a small
            target and invisible to anyone tabbing through the catalogue. */}
        <h3 style={{ fontSize: variant === "featured" ? 18 : 17, fontWeight: 700, lineHeight: 1.2 }}>
          <Link href={`/produit/${product.id}`} style={{ color: "var(--ink)", textDecoration: "none" }}>
            {product.name}
          </Link>
        </h3>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>
          {product.type}
          {variant === "shop" ? ` · ${product.cap}` : ""} · Classes {product.classes}
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            paddingTop: 8,
          }}
        >
          <span
            className="display"
            style={{ fontWeight: 700, fontSize: variant === "featured" ? 24 : 23, color: "var(--ink)" }}
          >
            {product.priceLabel}
          </span>
          {/* Nine buttons all reading just "Ajouter" are indistinguishable to a screen
              reader listing the page's controls, so the accessible name carries the
              product while the visible label stays short. */}
          <button
            className="btn-accent"
            onClick={() => add(product.id)}
            aria-label={`Ajouter ${product.name} au panier`}
            style={{ padding: "10px 16px", fontSize: 13.5 }}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
