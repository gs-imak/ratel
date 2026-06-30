"use client";

import Link from "next/link";
import { useCart } from "@/lib/store";
import type { Product } from "@/lib/products";

const PHOTO_BG =
  "repeating-linear-gradient(135deg,#f0ece7 0 11px,#e8e3dd 11px 22px)";

export default function ProductCard({
  product,
  variant = "shop",
}: {
  product: Product;
  variant?: "featured" | "shop";
}) {
  const { add } = useCart();
  const aspect = variant === "featured" ? "4 / 3" : "1 / 1";

  return (
    <div
      className="card card-hover"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Link
        href={`/produit/${product.id}`}
        style={{ display: "block", textDecoration: "none" }}
      >
        <div
          style={{
            aspectRatio: aspect,
            backgroundImage: PHOTO_BG,
            display: "flex",
            alignItems: "flex-end",
            padding: 12,
          }}
        >
          <span style={{ fontFamily: "ui-monospace,monospace", fontSize: 10.5, color: "#9a948c" }}>
            PHOTO · {product.id}
          </span>
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
        <h3 style={{ fontSize: variant === "featured" ? 18 : 17, fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>
          {product.name}
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
          <button
            className="btn-accent"
            onClick={() => add(product.id)}
            style={{ padding: "10px 16px", fontSize: 13.5 }}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
