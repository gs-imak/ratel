"use client";

import Link from "next/link";
import { useCart } from "@/lib/store";

const THUMB_BG = "repeating-linear-gradient(135deg,#f0ece7 0 9px,#e8e3dd 9px 18px)";

export default function PanierPage() {
  const { items, changeQty, remove, subtotalLabel, shippingLabel, shipNote, totalLabel } = useCart();
  const empty = items.length === 0;

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px" }}>
      <h1 className="display" style={{ fontSize: "clamp(32px,4vw,48px)", color: "var(--ink)", marginBottom: 28 }}>
        Votre panier
      </h1>

      {empty ? (
        <div
          style={{
            textAlign: "center",
            padding: "70px 20px",
            border: "1px dashed var(--line)",
            borderRadius: "var(--radius)",
          }}
        >
          <p style={{ fontSize: 18, color: "var(--muted)", marginBottom: 20 }}>Votre panier est vide.</p>
          <Link
            href="/boutique"
            className="btn-accent"
            style={{ display: "inline-block", padding: "14px 24px", textDecoration: "none" }}
          >
            Aller à la boutique
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1.6fr))",
            gap: 32,
            alignItems: "start",
          }}
        >
          <div className="card" style={{ display: "flex", flexDirection: "column" }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: 18,
                  borderBottom: "1px solid var(--line)",
                  alignItems: "center",
                }}
              >
                <div style={{ width: 74, height: 74, flex: "none", borderRadius: 6, backgroundImage: THUMB_BG }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: "var(--ink)", fontSize: 15.5 }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>
                    {item.type} · {item.cap}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    border: "1px solid var(--line)",
                    borderRadius: 999,
                    padding: 4,
                  }}
                >
                  <button
                    onClick={() => changeQty(item.id, -1)}
                    aria-label="Diminuer la quantité"
                    style={{ width: 28, height: 28, borderRadius: "50%", border: "none", background: "var(--bg)", color: "var(--ink)", fontWeight: 700, cursor: "pointer" }}
                  >
                    −
                  </button>
                  <span style={{ minWidth: 20, textAlign: "center", fontWeight: 700, color: "var(--ink)" }}>
                    {item.qty}
                  </span>
                  <button
                    onClick={() => changeQty(item.id, 1)}
                    aria-label="Augmenter la quantité"
                    style={{ width: 28, height: 28, borderRadius: "50%", border: "none", background: "var(--bg)", color: "var(--ink)", fontWeight: 700, cursor: "pointer" }}
                  >
                    +
                  </button>
                </div>
                <div style={{ width: 88, textAlign: "right", fontWeight: 700, color: "var(--ink)" }}>
                  {item.lineLabel}
                </div>
                <button
                  onClick={() => remove(item.id)}
                  title="Retirer"
                  aria-label={`Retirer ${item.name}`}
                  style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 18 }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 24, position: "sticky", top: 90 }}>
            <h3
              className="display"
              style={{ textTransform: "uppercase", fontSize: 18, color: "var(--ink)", marginBottom: 18 }}
            >
              Récapitulatif
            </h3>
            <Row label="Sous-total" value={subtotalLabel} />
            <Row label="Livraison" value={shippingLabel} />
            <div style={{ fontSize: 12.5, color: "var(--muted)", paddingBottom: 12 }}>{shipNote}</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "14px 0",
                borderTop: "1px solid var(--line)",
                fontSize: 19,
                fontWeight: 700,
                color: "var(--ink)",
              }}
            >
              <span>Total</span>
              <span style={{ fontFamily: "var(--font-display)" }}>{totalLabel}</span>
            </div>
            <Link
              href="/paiement"
              className="btn-accent"
              style={{
                display: "block",
                textAlign: "center",
                width: "100%",
                marginTop: 12,
                padding: 16,
                fontSize: 16,
                textDecoration: "none",
              }}
            >
              Passer au paiement →
            </Link>
            <div style={{ textAlign: "center", fontSize: 12.5, color: "var(--muted)", marginTop: 12 }}>
              🔒 Paiement sécurisé · CB, Visa, Mastercard
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 15, color: "var(--muted)" }}>
      <span>{label}</span>
      <span style={{ color: "var(--ink)", fontWeight: 600 }}>{value}</span>
    </div>
  );
}
