import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { Red } from "@/components/Brand";
import { FORMATION_DELAIS, FORMATION_POINTS, FORMATION_PROGRAMME } from "@/lib/products";

const MAX = 1200;

/* Client-supplied photo for the booking block ("une dame en communication").
   Save the file to public/images/formation-contact.jpg and point this at it —
   the block renders a designed panel until then, so nothing looks broken. */
const CONTACT_PHOTO: string | null = null;

export const metadata: Metadata = {
  title: "Formation incendie sur site | Ratel",
  description:
    "Formation incendie dans vos locaux : manipulation d’extincteur sur feu réel, réglementation ERP et exercices en conditions réelles. Sous 48h à Kinshasa, sous 96h sur toute la République.",
};

export default function FormationPage() {
  return (
    <main style={{ maxWidth: MAX, margin: "0 auto", padding: "48px 24px 80px" }}>
      {/* ---------------- INTRO ---------------- */}
      <div style={{ maxWidth: "46em", marginBottom: 38 }}>
        <Eyebrow>Formation incendie</Eyebrow>
        <h1
          className="display on-bg"
          style={{ fontSize: "clamp(34px,4.5vw,52px)", color: "var(--ink)", marginBottom: 14, lineHeight: 1.02 }}
        >
          Vos équipes face à un vrai départ de feu
        </h1>
        <p className="on-bg-soft" style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.65 }}>
          Apprendre à vos équipes à manipuler un extincteur sur feu réel, et comprendre les bons réflexes
          d’évacuation. Une formation sérieuse, menée directement dans vos locaux.
        </p>
      </div>

      {/* ---------------- BOOKING ---------------- */}
      <section className="card" style={{ marginBottom: 56 }}>
        <div className="hazard" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 34,
            padding: "30px 28px 34px",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              className="display"
              style={{
                fontSize: "clamp(24px,3.2vw,36px)",
                color: "var(--ink)",
                textTransform: "uppercase",
                lineHeight: 1.05,
                marginBottom: 14,
              }}
            >
              Réservez votre session de formation
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--muted)", marginBottom: 18 }}>
              Contactez notre équipe pour organiser votre formation incendie sur site, sous 48h dans la ville
              province de Kinshasa, et sous 96h à travers la République. Devis gratuit.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
              {FORMATION_DELAIS.map((d) => (
                <div
                  key={d.big}
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius)",
                    background: "var(--bg)",
                    padding: "12px 16px",
                  }}
                >
                  <div className="display" style={{ fontWeight: 700, fontSize: 26, color: "var(--accent)", lineHeight: 1 }}>
                    {d.big}
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>{d.small}</div>
                </div>
              ))}
            </div>

            <Link
              href="/devis?objet=formation"
              className="btn-accent"
              style={{ display: "inline-block", padding: "16px 26px", fontSize: 15.5, textDecoration: "none" }}
            >
              Planifier votre session maintenant →
            </Link>
          </div>

          {CONTACT_PHOTO ? (
            <div
              style={{
                aspectRatio: "16 / 10",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                border: "1px solid var(--line)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CONTACT_PHOTO}
                alt="Notre équipe à votre écoute pour organiser votre formation"
                className="pimg"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ) : (
            <div
              style={{
                aspectRatio: "16 / 10",
                borderRadius: "var(--radius)",
                background: "var(--ink)",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                textAlign: "center",
                padding: 28,
              }}
            >
              <span className="display" style={{ fontSize: 44, fontWeight: 700, color: "var(--hi)", lineHeight: 1 }}>
                48H
              </span>
              <span style={{ fontSize: 15, lineHeight: 1.5, color: "rgba(255,255,255,.82)", maxWidth: "18em" }}>
                {/* Client's wording, minus "ci-dessus": the 48H/96H badges sit above this
                    panel on mobile but beside it on desktop, so the pointer would be wrong
                    on half the viewports. */}
                Notre équipe vous rappelle dans le délai indiqué.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- ON-SITE POINTS ---------------- */}
      <section style={{ marginBottom: 56 }}>
        <Eyebrow>Une formation sur site</Eyebrow>
        <h2
          className="display on-bg"
          style={{ fontSize: "clamp(26px,3.4vw,40px)", color: "var(--ink)", marginBottom: 22, maxWidth: "20em" }}
        >
          Adaptée à votre réalité de terrain
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {FORMATION_POINTS.map((p) => (
            <div key={p.title} className="card" style={{ padding: 24 }}>
              <h3 className="display" style={{ fontSize: 19, color: "var(--ink)", marginBottom: 8 }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--muted)" }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- PROGRAMME ---------------- */}
      <section style={{ marginBottom: 48 }}>
        <Eyebrow>Programme de la formation</Eyebrow>
        <h2
          className="display on-bg"
          style={{ fontSize: "clamp(26px,3.4vw,40px)", color: "var(--ink)", marginBottom: 22, maxWidth: "20em" }}
        >
          Ce que vos équipes savent faire à la fin
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {FORMATION_PROGRAMME.map((m) => (
            <div key={m.num} className="card" style={{ display: "flex", flexDirection: "column" }}>
              <div className="hazard" />
              <div style={{ padding: 24 }}>
                <div
                  className="display"
                  style={{ fontWeight: 700, fontSize: 30, color: "var(--accent)", lineHeight: 1, marginBottom: 8 }}
                >
                  {m.num}
                </div>
                <h3 className="display" style={{ fontSize: 19, color: "var(--ink)", marginBottom: 8 }}>
                  {m.title}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--muted)" }}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- BOTTOM CTA ---------------- */}
      <div
        className="band-gold"
        style={{
          borderRadius: "var(--radius)",
          padding: "40px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 className="display" style={{ fontSize: "clamp(24px,3vw,34px)", marginBottom: 8 }}>
            Former vos équipes, sans les déplacer
          </h2>
          <p style={{ color: "rgba(22,17,13,.75)", fontSize: 15.5, maxWidth: "34em" }}>
            Un formateur <Red>Ratel</Red> se déplace dans vos locaux. Devis gratuit, sans engagement.
          </p>
        </div>
        <Link
          href="/devis?objet=formation"
          className="btn-accent"
          style={{ padding: "16px 26px", fontSize: 15.5, textDecoration: "none", whiteSpace: "nowrap" }}
        >
          Réserver ma session →
        </Link>
      </div>
    </main>
  );
}
