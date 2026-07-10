import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Eyebrow from "@/components/Eyebrow";
import DemoVideo from "@/components/DemoVideo";
import { Red, RedPill } from "@/components/Brand";
import { featured, PASS_STEPS, TRUST, ALERT_POINTS } from "@/lib/products";

const MAX = 1200;

export default function HomePage() {
  return (
    <main>
      {/* ---------------- HERO ---------------- */}
      <section style={{ background: "var(--ink)", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            maxWidth: MAX,
            margin: "0 auto",
            padding: "72px 24px 80px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div>
            <Eyebrow style={{ marginBottom: 22 }}>Prévention Sécurité Incendie</Eyebrow>
            <h1
              className="display"
              style={{ fontWeight: 700, fontSize: "clamp(44px,6vw,76px)", lineHeight: 0.98, marginBottom: 24 }}
            >
              La vie n’a pas de prix.
            </h1>
            <div style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,.78)", maxWidth: "32em", marginBottom: 34 }}>
              <p style={{ marginBottom: 12 }}>
                Des extincteurs certifiés. Une livraison rapide et suivie en temps réel.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong style={{ color: "#fff" }}>Ratalerte</strong>, réservée pour les abonnés <Red>Ratel</Red> : une alerte
                géolocalisée en cas d’urgence réelle. Déclenchez l’alerte, votre position GPS sera transmise pour une
                intervention rapide.
              </p>
              <p>
                Protégez votre foyer, votre véhicule, votre moto, vos entreprises ainsi que vos bâtiments.
              </p>
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link
                href="/boutique"
                className="btn-accent"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 26px",
                  fontSize: 15.5,
                  textDecoration: "none",
                }}
              >
                Découvrir la boutique →
              </Link>
              <Link
                href="#demo"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 26px",
                  background: "transparent",
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,.32)",
                  borderRadius: "var(--radius)",
                  fontWeight: 600,
                  fontSize: 15.5,
                  textDecoration: "none",
                }}
              >
                ▶ Voir la démo
              </Link>
            </div>
            <div style={{ display: "flex", gap: 28, marginTop: 42, flexWrap: "wrap" }}>
              {[
                ["24-48h", "Livraison sécurisée"],
                ["NF · CE", "Matériel certifié"],
                ["< 7 min", "Alerte aux secours"],
              ].map(([big, small]) => (
                <div key={small}>
                  <div className="display" style={{ fontWeight: 700, fontSize: 30 }}>
                    {big}
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "rgba(255,255,255,.6)",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {small}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                aspectRatio: "4 / 5",
                borderRadius: "var(--radius)",
                border: "1px solid rgba(255,255,255,.14)",
                overflow: "hidden",
                background: "#0e0b08",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-fire.jpg"
                alt="Flammes — un départ de feu"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div
              className="display"
              style={{
                position: "absolute",
                top: -16,
                right: -12,
                background: "var(--hi)",
                color: "var(--hi-ink)",
                padding: "14px 18px",
                borderRadius: "var(--radius)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                fontWeight: 700,
                fontSize: 15,
                boxShadow: "0 18px 40px rgba(245,179,1,.35)",
              }}
            >
              Chaque seconde compte
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TRUST BAR ---------------- */}
      <section style={{ background: "var(--surface)", borderBottom: "1px solid var(--line)" }}>
        <div
          style={{
            maxWidth: MAX,
            margin: "0 auto",
            padding: "26px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 20,
          }}
        >
          {TRUST.map((t) => (
            <div key={t.title} style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
              <span
                style={{
                  width: 34,
                  height: 34,
                  flex: "none",
                  borderRadius: 999,
                  background: "color-mix(in srgb, var(--accent) 12%, transparent)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                }}
              >
                ✓
              </span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--ink)" }}>{t.title}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.4 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- DEMO ---------------- */}
      <section id="demo" style={{ maxWidth: MAX, margin: "0 auto", padding: "84px 24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 36,
          }}
        >
          <div>
            <Eyebrow style={{ marginBottom: 12 }}>
              Réservé aux <RedPill>abonnés Ratalerte</RedPill>
            </Eyebrow>
            <h2 className="display on-bg" style={{ fontSize: "clamp(30px,4vw,46px)", lineHeight: 1, color: "var(--ink)" }}>
              La méthode en 4 gestes
            </h2>
          </div>
          <p className="on-bg-soft" style={{ maxWidth: "24em", fontSize: 15, color: "var(--muted)", lineHeight: 1.6 }}>
            Face à un départ de feu, chaque seconde compte. Regardez la démonstration, puis retenez les quatre gestes
            de la méthode P.A.S.S.
          </p>
        </div>

        <div
          className="card"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 0,
          }}
        >
          <div
            style={{
              position: "relative",
              background: "#000",
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 240,
            }}
          >
            <DemoVideo />
          </div>

          <div style={{ padding: "36px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: "var(--accent)",
                }}
              >
                Méthode P.A.S.S
              </span>
              <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
            </div>
            {PASS_STEPS.map((st) => (
              <div
                key={st.num}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  padding: "13px 0",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <span
                  className="display"
                  style={{ fontWeight: 700, fontSize: 26, lineHeight: 1.1, color: "var(--accent)", minWidth: 34 }}
                >
                  {st.num}
                </span>
                <div>
                  <div
                    className="display"
                    style={{ textTransform: "uppercase", letterSpacing: "0.02em", fontSize: 19, color: "var(--ink)" }}
                  >
                    {st.title}
                  </div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.5, color: "var(--muted)" }}>{st.desc}</div>
                </div>
              </div>
            ))}
            <p className="warn" style={{ fontSize: 13, color: "var(--muted)", marginTop: 16, lineHeight: 1.5 }}>
              En cas de doute ou de fumée importante, n’insistez pas :{" "}
              <strong style={{ color: "var(--ink)" }}>évacuez et appelez les pompiers (118)</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURED ---------------- */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: "0 24px 84px" }}>
        <Eyebrow>La boutique</Eyebrow>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 30,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <h2 className="display on-bg" style={{ fontSize: "clamp(28px,3.4vw,40px)", color: "var(--ink)" }}>
            Les plus choisis
          </h2>
          <Link href="/boutique" className="link-blue on-bg" style={{ fontSize: 15 }}>
            Voir toute la boutique →
          </Link>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 22 }}
        >
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} variant="featured" />
          ))}
        </div>
      </section>

      {/* ---------------- ALERT TEASER (gold promo band) ---------------- */}
      <section className="band-gold">
        <div
          style={{
            maxWidth: MAX,
            margin: "0 auto",
            padding: "64px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div>
            <Eyebrow tone="ink">
              Ratalerte — Réservé aux abonnés <Red>Ratel</Red>
            </Eyebrow>
            <h2
              className="display"
              style={{ fontWeight: 700, fontSize: "clamp(30px,4vw,48px)", lineHeight: 1.02, marginBottom: 18 }}
            >
              Un départ de feu ?
              <br />
              Un seul geste.
            </h2>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.6,
                color: "rgba(22,17,13,.78)",
                maxWidth: "30em",
                marginBottom: 28,
              }}
            >
              Ratalerte transmet instantanément votre position GPS aux secours et à vos contacts de confiance pour une
              intervention rapide. Pendant ce temps, restez en sécurité.
            </p>
            <Link
              href="/signaler"
              className="btn-accent"
              style={{
                display: "inline-block",
                padding: "16px 28px",
                fontSize: 15.5,
                textDecoration: "none",
              }}
            >
              Découvrir l’alerte géolocalisée →
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {ALERT_POINTS.map((a) => (
              <div
                key={a.n}
                className="card"
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                  padding: 18,
                }}
              >
                <span
                  className="display"
                  style={{ fontWeight: 700, fontSize: 22, width: 38, flex: "none", color: "var(--accent)" }}
                >
                  {a.n}
                </span>
                <span style={{ fontSize: 15, lineHeight: 1.45, color: "var(--ink)" }}>{a.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
