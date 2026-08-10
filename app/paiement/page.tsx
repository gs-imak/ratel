"use client";

import { useState } from "react";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { useCart } from "@/lib/store";

/* The three rails that matter in the DRC: together M-Pesa, Airtel Money and Orange
   Money cover about 99% of mobile-money transactions (ARPTC Q4-2025). */
const MOBILE_MONEY = [
  { id: "mpesa", label: "M-Pesa", hint: "Vodacom" },
  { id: "airtel", label: "Airtel Money", hint: "Airtel" },
  { id: "orange", label: "Orange Money", hint: "Orange" },
];

export default function PaiementPage() {
  const { items, shippingLabel, totalLabel, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [operateur, setOperateur] = useState("");
  /* Captured before the cart is emptied, because the confirmation screen prints it. */
  const [paidLabel, setPaidLabel] = useState("");

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
          <h1 className="display" style={{ textTransform: "uppercase", fontSize: 30, color: "var(--ink)", marginBottom: 12 }}>
            Votre demande est prête
          </h1>
          <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6, marginBottom: 8 }}>
            Récapitulatif de votre commande, <strong style={{ color: "var(--ink)" }}>{paidLabel}</strong>.
          </p>
          {/* This flow takes no money and records no order. Telling a visitor his payment
              was accepted would be false, and it is the kind of false statement a customer
              acts on. Stated plainly until the payment rails and the orders table exist. */}
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, marginBottom: 28 }}>
            La commande en ligne n’est pas encore ouverte. Aucun paiement n’a été prélevé et aucune commande n’a été
            enregistrée. Contactez-nous pour finaliser votre achat, nous vous rappelons pour la livraison et le
            paiement mobile money.
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
                <input className="fld" placeholder="Votre prénom" />
              </label>
              <label className="lbl">
                Nom
                <input className="fld" placeholder="Votre nom" />
              </label>
              <label className="lbl" style={{ gridColumn: "1 / -1" }}>
                Adresse
                <input className="fld" placeholder="Avenue et numéro" />
              </label>
              <label className="lbl">
                Commune
                <input className="fld" placeholder="Ex. Kalamu" />
              </label>
              <label className="lbl">
                Ville
                {/* Kinshasa is a real default rather than a placeholder: it is correct
                    for essentially every customer and saves them typing. */}
                <input className="fld" defaultValue="Kinshasa" />
              </label>
            </div>
          </div>

          {/* Mobile money, not card. The client was explicit: M-Pesa, Airtel Money or
              Orange Money, and he refused cash on delivery. Card penetration in the DRC
              is marginal, so the previous "Carte bancaire" step offered the one rail his
              customers mostly do not hold. */}
          <div className="card" style={{ padding: 24 }}>
            <h3
              className="display"
              style={{ textTransform: "uppercase", fontSize: 16, color: "var(--ink)", marginBottom: 6 }}
            >
              2 · Moyen de paiement
            </h3>
            <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.5, marginBottom: 16 }}>
              Choisissez votre opérateur. Vous recevrez une demande de confirmation sur votre téléphone.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginBottom: 16 }}>
              {MOBILE_MONEY.map((m) => {
                const active = operateur === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setOperateur(m.id)}
                    aria-pressed={active}
                    style={{
                      padding: "14px 12px",
                      borderRadius: "var(--radius)",
                      border: active ? "2px solid var(--accent)" : "1px solid var(--line)",
                      background: active ? "color-mix(in srgb, var(--accent) 8%, transparent)" : "var(--surface)",
                      color: "var(--ink)",
                      fontWeight: 700,
                      fontSize: 14.5,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {m.label}
                    <span style={{ display: "block", fontWeight: 500, fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                      {m.hint}
                    </span>
                  </button>
                );
              })}
            </div>
            <label className="lbl">
              Numéro {operateur ? MOBILE_MONEY.find((m) => m.id === operateur)?.label : "mobile money"}
              <input className="fld" type="tel" placeholder="0999 000 000" />
            </label>
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
            onClick={() => {
              setPaidLabel(totalLabel);
              clear();
              setPlaced(true);
            }}
            style={{ width: "100%", marginTop: 10, padding: 16, fontSize: 16 }}
          >
            Payer {totalLabel}
          </button>
        </div>
      </div>
    </main>
  );
}
