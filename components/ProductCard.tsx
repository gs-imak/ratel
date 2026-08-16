"use client";

import Image from "next/image";
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
        {/* next/image serves a resized AVIF or WebP instead of the full-size JPEG.
            The source photos are 150 to 460 KB each and this page shows nine of them,
            which is the single heaviest thing a customer on Kinshasa mobile data
            downloads. `fill` needs a positioned parent, hence position: relative. */}
        <div style={{ position: "relative", aspectRatio: aspect, background: "#fff", overflow: "hidden" }}>
          <Image
            src={product.img}
            alt={product.name}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 300px"
            className="pimg"
            style={{
              objectFit: "cover",
              /* Greyed out when out of stock, per the client's brief. */
              filter: product.inStock ? undefined : "grayscale(1)",
              opacity: product.inStock ? 1 : 0.55,
            }}
          />
          {!product.inStock && (
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(22,17,13,.88)",
                color: "#fff",
                textAlign: "center",
                padding: "8px 10px",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              En rupture de stock
              {product.restockLabel ? (
                <span style={{ display: "block", fontWeight: 500, textTransform: "none", letterSpacing: 0, fontSize: 11.5, color: "var(--hi)" }}>
                  {product.restockLabel}
                </span>
              ) : null}
            </span>
          )}
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
        {/* The detector has no fire class, so it stores "—". Printing "Classes —"
            reads as missing data rather than as not applicable. */}
        <div style={{ fontSize: 13, color: "var(--muted)" }}>
          {product.type}
          {variant === "shop" ? ` · ${product.cap}` : ""}
          {product.classes !== "—" ? ` · Classes ${product.classes}` : ""}
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
            className={product.inStock ? "btn-accent" : undefined}
            onClick={() => add(product.id)}
            disabled={!product.inStock}
            aria-label={
              product.inStock
                ? `Ajouter ${product.name} au panier`
                : `${product.name} est en rupture de stock`
            }
            style={{
              padding: "10px 16px",
              fontSize: 13.5,
              ...(product.inStock
                ? {}
                : {
                    background: "var(--bg)",
                    color: "var(--muted)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius)",
                    fontWeight: 600,
                    cursor: "not-allowed",
                  }),
            }}
          >
            {product.inStock ? "Ajouter" : "Indisponible"}
          </button>
        </div>
      </div>
    </div>
  );
}
