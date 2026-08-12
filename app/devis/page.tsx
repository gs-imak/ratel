"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { Red } from "@/components/Brand";
import { FORMATION_TYPES, SECTORS } from "@/lib/products";

export default function DevisPage() {
  const [secteur, setSecteur] = useState("");
  const [besoin, setBesoin] = useState("");
  const [adresse, setAdresse] = useState("");
  const [genre, setGenre] = useState("");
  const [dateSouhaitee, setDateSouhaitee] = useState("");
  const [sent, setSent] = useState(false);
  /* Booking a training session goes through this same form — the client asked
     that it be reached "exactement comme pour demander un devis". */
  const [isFormation, setIsFormation] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("secteur");
    if (q && SECTORS.some((s) => s.id === q)) setSecteur(q);
    if (params.get("objet") === "formation") {
      setIsFormation(true);
      setBesoin("Formation incendie sur site — ");
    }
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
            {isFormation ? (
              <>
                Merci. Un formateur <Red>Ratel</Red> vous rappelle pour confirmer votre{" "}
                <strong style={{ color: "var(--ink)" }}>formation sur site</strong>, sous 48h à Kinshasa et sous
                96h sur toute la République.
              </>
            ) : (
              <>
                Merci. Un conseiller <Red>Ratel</Red> vous recontacte avec votre{" "}
                <strong style={{ color: "var(--ink)" }}>devis gratuit sous 24 heures</strong>.
              </>
            )}
          </p>
          {/* No invented reference number. Nothing is stored yet, so a reference would be
              a number the customer could quote back at someone who has never seen it. */}
          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginBottom: 28, maxWidth: "34em", marginInline: "auto" }}>
            L’envoi automatique des demandes n’est pas encore activé. Si vous n’avez pas de retour rapidement,
            contactez-nous directement, votre demande sera traitée en priorité.
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
      <Eyebrow>{isFormation ? "Session de formation" : "Étude & devis gratuits"}</Eyebrow>
      <h1 className="display on-bg" style={{ fontSize: "clamp(32px,4.5vw,50px)", color: "var(--ink)", marginBottom: 12 }}>
        {isFormation ? "Réservez votre session de formation" : "Demandez votre devis gratuitement"}
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
        {isFormation ? "⚡ Formation sur site sous 48H à Kinshasa" : "⚡ Devis gratuit en moins de 24H"}
      </div>

      <p className="on-bg-soft" style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6, marginBottom: 30 }}>
        {isFormation
          ? "Indiquez votre adresse, le genre de formation et la date souhaitée. Notre équipe vous rappelle sous 48h dans la ville province de Kinshasa, et sous 96h sur toute la République. Devis gratuit."
          : "Décrivez votre besoin en quelques mots. Un conseiller vous répond avec une étude et un tarif adaptés à votre site, sans engagement."}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="card"
        style={{ padding: 28, display: "flex", flexDirection: "column", gap: 18 }}
      >
        {/* auto-fit rather than a hard two-column grid: at 390px the fixed version
            gave 119px fields that could not show a phone number. */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
          <label className="lbl">
            Nom / Société
            <input className="fld" required placeholder="Votre nom ou société" />
          </label>
          {/* Phone is the required field, not email. Every follow-up the site promises
              is a callback, and in Kinshasa a WhatsApp number reaches a prospect far
              more reliably than an email address. */}
          <label className="lbl">
            Téléphone (WhatsApp de préférence)
            <input className="fld" type="tel" required placeholder="0999 000 000" />
          </label>
          <label className="lbl" style={{ gridColumn: "1 / -1" }}>
            Email (facultatif)
            <input className="fld" type="email" placeholder="vous@exemple.cd" />
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
          {isFormation && (
            <>
              <label className="lbl" style={{ gridColumn: "1 / -1" }}>
                Adresse complète
                <input
                  className="fld"
                  required
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  placeholder="Avenue, numéro, commune, ville"
                />
              </label>
              <label className="lbl">
                Genre de formation souhaité
                <select className="fld" value={genre} onChange={(e) => setGenre(e.target.value)}>
                  <option value="">— Sélectionnez —</option>
                  {FORMATION_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="lbl">
                Date souhaitée
                <input
                  className="fld"
                  type="date"
                  value={dateSouhaitee}
                  onChange={(e) => setDateSouhaitee(e.target.value)}
                />
              </label>
            </>
          )}
          <label className="lbl" style={{ gridColumn: "1 / -1" }}>
            Votre besoin
            <textarea
              className="fld"
              rows={4}
              value={besoin}
              onChange={(e) => setBesoin(e.target.value)}
              placeholder={
                isFormation
                  ? "Nombre de participants, type de locaux, précisions utiles…"
                  : "Type de site, surface, nombre d’extincteurs, plans d’évacuation, échéance…"
              }
              style={{ resize: "vertical" }}
            />
          </label>
        </div>

        <button className="btn-accent" type="submit" style={{ padding: "16px 24px", fontSize: 16.5 }}>
          {isFormation ? "Réserver ma session de formation" : "Oui — je souhaite un devis"}
        </button>
        <p style={{ fontSize: 12.5, color: "var(--muted)", textAlign: "center" }}>
          🔒 Vos informations restent confidentielles. Aucun engagement.
        </p>
      </form>
    </main>
  );
}
