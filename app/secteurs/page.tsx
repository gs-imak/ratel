import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { Red } from "@/components/Brand";
import { SECTORS } from "@/lib/products";

export default function SecteursPage() {
  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
      <div style={{ maxWidth: "46em", marginBottom: 36 }}>
        <Eyebrow>Solutions par secteur</Eyebrow>
        <h1 className="display on-bg" style={{ fontSize: "clamp(34px,4.5vw,52px)", color: "var(--ink)", marginBottom: 12 }}>
          Chaque secteur, son risque
        </h1>
        <p className="on-bg-soft" style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6 }}>
          De l’aéroport à la salle de classe, chaque établissement a ses obligations et ses risques propres. Nous
          équipons et accompagnons chaque type de site — demandez un devis adapté à votre activité.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 22 }}>
        {SECTORS.map((s) => (
          <div key={s.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
            <div className="hazard" />
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
              <span
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: "color-mix(in srgb, var(--trust) 12%, transparent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
                aria-hidden
              >
                {s.icon}
              </span>
              <h2 className="display" style={{ fontSize: 21, color: "var(--ink)" }}>
                {s.label}
              </h2>
              <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.55, flex: 1 }}>{s.desc}</p>
              <Link
                href={`/devis?secteur=${s.id}`}
                className="link-blue"
                style={{ marginTop: 4, fontSize: 14.5 }}
              >
                Demander un devis →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ---- Plan d'évacuation service ---- */}
      <section style={{ marginTop: 56 }}>
        <Eyebrow>Service clé — ERP &amp; locaux professionnels</Eyebrow>
        <h2
          className="display on-bg"
          style={{ fontSize: "clamp(26px,3.4vw,40px)", color: "var(--ink)", marginBottom: 20, maxWidth: "24em" }}
        >
          Plan d’évacuation : conception, pose &amp; mise à jour
        </h2>

        <div className="card">
          <div className="hazard" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 32,
              padding: "28px 28px 32px",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--muted)", marginBottom: 16 }}>
                Affiché à chaque niveau du bâtiment, le plan d’évacuation est bien plus qu’une formalité : c’est le
                repère qui permet à vos équipes et à votre public de retrouver en un coup d’œil{" "}
                <strong style={{ color: "var(--ink)" }}>la sortie la plus proche</strong> et{" "}
                <strong style={{ color: "var(--ink)" }}>le point de rassemblement</strong> en cas d’incendie.
              </p>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--muted)", marginBottom: 16 }}>
                Obligatoire dans la quasi-totalité des ERP et des locaux professionnels, il doit respecter la norme{" "}
                <span className="badge-cert" style={{ fontSize: 12.5, padding: "3px 9px" }}>NF X 08-070</span> pour
                avoir une réelle valeur réglementaire.
              </p>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--ink)", fontWeight: 600 }}>
                <Red>Ratel</Red> conçoit, imprime, pose et met à jour vos plans d’évacuation sur toute l’étendue de la
                ville de Kinshasa et sur toute la République.
              </p>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
                {[
                  ["01", "Conception", "Relevé sur site et dessin conforme du plan"],
                  ["02", "Impression", "Supports rigides, lisibles et durables"],
                  ["03", "Pose", "Affichage à chaque niveau du bâtiment"],
                  ["04", "Mise à jour", "Suivi des évolutions de vos locaux"],
                ].map(([num, title, desc]) => (
                  <div
                    key={num}
                    style={{
                      border: "1px solid var(--line)",
                      borderRadius: "var(--radius)",
                      padding: "14px 16px",
                      background: "var(--bg)",
                    }}
                  >
                    <div className="display" style={{ fontWeight: 700, fontSize: 20, color: "var(--accent)" }}>
                      {num}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--ink)", margin: "2px 0" }}>{title}</div>
                    <div style={{ fontSize: 12.5, lineHeight: 1.45, color: "var(--muted)" }}>{desc}</div>
                  </div>
                ))}
              </div>
              <Link
                href="/devis"
                className="btn-accent"
                style={{ display: "block", textAlign: "center", padding: "15px 24px", fontSize: 15.5, textDecoration: "none" }}
              >
                Demander un devis plan d’évacuation →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* bottom CTA */}
      <div
        className="band-gold"
        style={{
          marginTop: 44,
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
            Un projet, un site à équiper ?
          </h2>
          <p style={{ color: "rgba(22,17,13,.75)", fontSize: 15.5, maxWidth: "34em" }}>
            Recevez une étude et un devis gratuits, adaptés à votre secteur, en moins de 24 heures.
          </p>
        </div>
        <Link
          href="/devis"
          className="btn-accent"
          style={{ padding: "16px 26px", fontSize: 15.5, textDecoration: "none", whiteSpace: "nowrap" }}
        >
          Devis gratuit →
        </Link>
      </div>
    </main>
  );
}
