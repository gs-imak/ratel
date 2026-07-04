"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SECTORS } from "@/lib/products";

export default function DevisPage() {
  const [secteur, setSecteur] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("secteur");
    if (q && SECTORS.some((s) => s.id === q)) setSecteur(q);
  }, []);

  if (sent) {
    return (
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 90px" }}>
        <div className="card" style={{ textAlign: "center", padding: "56px 32px" }}>
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
          <h1 className="display" style={{ fontSize: 30, color: "var(--ink)", marginBottom: 12 }}>
            Demande envoyée
          </h1>
          <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6, maxWidth: "36em", margin: "0 auto 8px" }}>
            Merci. Un conseiller Ratel vous recontacte avec votre{" "}
            <strong style={{ color: "var(--ink)" }}>devis gratuit sous 24 heures</strong>.
          </p>
          <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 28 }}>
            Référence <strong style={{ color: "var(--ink)" }}>#DV-4096</strong>
          </p>
          <Link
            href="/"
            className="btn-accent"
            style={{ display: "inline-block", padding: "14px 26px", fontSize: 15.5, textDecoration: "none" }}
          >
            Retour à l’accueil
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 90px" }}>
      <h1 className="display" style={{ fontSize: "clamp(32px,4.5vw,50px)", color: "var(--ink)", marginBottom: 12 }}>
        Demandez votre devis gratuitement
      </h1>

      {/* yellow highlight strip */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: "var(--hi)",
          color: "var(--hi-ink)",
          fontWeight: 700,
          fontSize: 15,
          padding: "10px 16px",
          borderRadius: "var(--radius)",
          marginBottom: 26,
        }}
      >
        ⚡ Devis gratuit en moins de 24H
      </div>

      <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6, marginBottom: 30 }}>
        Décrivez votre besoin en quelques mots. Un conseiller vous répond avec une étude et un tarif adaptés à votre
        site, sans engagement.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="card"
        style={{ padding: 28, display: "flex", flexDirection: "column", gap: 18 }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <label className="lbl">
            Nom / Société
            <input className="fld" required placeholder="Votre nom ou société" />
          </label>
          <label className="lbl">
            Téléphone
            <input className="fld" type="tel" placeholder="06 12 34 56 78" />
          </label>
          <label className="lbl" style={{ gridColumn: "1 / -1" }}>
            Email
            <input className="fld" type="email" required placeholder="vous@exemple.fr" />
          </label>
          <label className="lbl" style={{ gridColumn: "1 / -1" }}>
            Secteur
            <select className="fld" value={secteur} onChange={(e) => setSecteur(e.target.value)}>
              <option value="">— Sélectionnez votre secteur —</option>
              {SECTORS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
              <option value="autre">Autre</option>
            </select>
          </label>
          <label className="lbl" style={{ gridColumn: "1 / -1" }}>
            Votre besoin
            <textarea
              className="fld"
              rows={4}
              placeholder="Type de site, surface, nombre d’extincteurs, échéance…"
              style={{ resize: "vertical" }}
            />
          </label>
        </div>

        <button className="btn-accent" type="submit" style={{ padding: "16px 24px", fontSize: 16.5 }}>
          Oui — je souhaite un devis
        </button>
        <p style={{ fontSize: 12.5, color: "var(--muted)", textAlign: "center" }}>
          🔒 Vos informations restent confidentielles. Aucun engagement.
        </p>
      </form>
    </main>
  );
}
