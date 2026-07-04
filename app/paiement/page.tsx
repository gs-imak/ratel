"use client";

import { useState } from "react";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { useCart } from "@/lib/store";

export default function PaiementPage() {
  const { items, shippingLabel, totalLabel } = useCart();
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>
        <div
          className="card"
          style={{ maxWidth: 560, margin: "40px auto", textAlign: "center", padding: "56px 32px" }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              margin: "0 auto 24px",
              borderRadius: "50%",
              background: "color-mix(in srgb, var(--accent) 14%, transparent)",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
            }}
          >
            ✓
          </div>
          <h2 className="display" style={{ textTransform: "uppercase", fontSize: 30, color: "var(--ink)", marginBottom: 12 }}>
            Commande confirmée
          </h2>
          <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6, marginBottom: 8 }}>
            Merci. Votre paiement de <strong style={{ color: "var(--ink)" }}>{totalLabel}</strong> a été accepté.
          </p>
          <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 28 }}>
            Commande <strong style={{ color: "var(--ink)" }}>#RTL-2048</strong> · livraison estimée demain avant 18h.
          </p>
          <Link
            href="/suivi"
            className="btn-accent"
            style={{ display: "inline-block", padding: "15px 26px", fontSize: 15.5, textDecoration: "none" }}
          >
            Suivre ma livraison →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>
      <Link
        href="/panier"
        className="on-bg-soft"
        style={{ color: "var(--muted)", fontWeight: 600, fontSize: 14, textDecoration: "none", display: "inline-block", marginBottom: 18 }}
      >
        ← Retour au panier
      </Link>
      <Eyebrow>Finalisation de commande</Eyebrow>
      <h1 className="display on-bg" style={{ fontSize: "clamp(30px,4vw,46px)", color: "var(--ink)", marginBottom: 28 }}>
        Paiement sécurisé
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1.4fr))",
          gap: 32,
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3 className="display" style={{ textTransform: "uppercase", fontSize: 16, color: "var(--ink)", marginBottom: 18 }}>
              1 · Livraison
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <label className="lbl">
                Prénom
                <input className="fld" defaultValue="Camille" />
              </label>
              <label className="lbl">
                Nom
                <input className="fld" defaultValue="Moreau" />
              </label>
              <label className="lbl" style={{ gridColumn: "1 / -1" }}>
                Adresse
                <input className="fld" defaultValue="14 rue des Lilas" />
              </label>
              <label className="lbl">
                Code postal
                <input className="fld" defaultValue="69003" />
              </label>
              <label className="lbl">
                Ville
                <input className="fld" defaultValue="Lyon" />
              </label>
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <h3 className="display" style={{ textTransform: "uppercase", fontSize: 16, color: "var(--ink)" }}>
                2 · Carte bancaire
              </h3>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>🔒 Crypté SSL</span>
            </div>
            <label className="lbl" style={{ marginBottom: 14 }}>
              Numéro de carte
              <input className="fld" defaultValue="4242 4242 4242 4242" style={{ letterSpacing: "0.08em" }} />
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              <label className="lbl">
                Expiration
                <input className="fld" defaultValue="08 / 28" />
              </label>
              <label className="lbl">
                CVC
                <input className="fld" defaultValue="•••" />
              </label>
              <label className="lbl">
                Titulaire
                <input className="fld" defaultValue="C. MOREAU" />
              </label>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 24, position: "sticky", top: 90 }}>
          <h3 className="display" style={{ textTransform: "uppercase", fontSize: 16, color: "var(--ink)", marginBottom: 16 }}>
            Commande
          </h3>
          {items.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "7px 0", fontSize: 14, color: "var(--muted)" }}
            >
              <span>
                {item.qty} × {item.name}
              </span>
              <span style={{ color: "var(--ink)", fontWeight: 600, whiteSpace: "nowrap" }}>{item.lineLabel}</span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              fontSize: 14,
              color: "var(--muted)",
              borderTop: "1px solid var(--line)",
              marginTop: 8,
            }}
          >
            <span>Livraison</span>
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>{shippingLabel}</span>
          </div>
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
          <button
            className="btn-accent"
            onClick={() => setPlaced(true)}
            style={{ width: "100%", marginTop: 10, padding: 16, fontSize: 16 }}
          >
            Payer {totalLabel}
          </button>
        </div>
      </div>
    </main>
  );
}
