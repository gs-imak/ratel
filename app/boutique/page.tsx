import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Eyebrow from "@/components/Eyebrow";
import { PRODUCTS, CATEGORIES } from "@/lib/products";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Extincteurs, détecteurs de fumée et couvertures anti-feu certifiés, livrés à Kinshasa. Choisissez selon votre risque : maison, voiture, cuisine ou entreprise.",
};

/* Server component on purpose. An earlier version read the category with
   useSearchParams, which forced a Suspense boundary around the whole page and
   left the server HTML empty: a crawler, or anyone on a slow connection, got a
   blank shop. Reading searchParams here renders the real catalogue on the
   server, and the filters are plain links, so the page needs no client
   JavaScript to work at all. */
export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat: requested } = await searchParams;
  const cat = requested && CATEGORIES.some((c) => c.id === requested) ? requested : "tous";
  const filtered = cat === "tous" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat);

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
      <div style={{ marginBottom: 30 }}>
        <Eyebrow>Catalogue certifié NF · CE · EN 3</Eyebrow>
        <h1 className="display on-bg" style={{ fontSize: "clamp(34px,4.5vw,52px)", color: "var(--ink)", marginBottom: 10 }}>
          Boutique
        </h1>
        <p className="on-bg-soft" style={{ fontSize: 16, color: "var(--muted)", maxWidth: "42em" }}>
          Extincteurs et équipements certifiés NF/CE, sélectionnés pour leur fiabilité. Le bon appareil dépend du
          risque, filtrez par usage.
        </p>
      </div>

      <nav
        aria-label="Filtrer par usage"
        style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 30 }}
      >
        {CATEGORIES.map((c) => {
          const active = cat === c.id;
          return (
            <Link
              key={c.id}
              href={c.id === "tous" ? "/boutique" : `/boutique?cat=${c.id}`}
              scroll={false}
              aria-current={active ? "page" : undefined}
              style={{
                padding: "9px 18px",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                border: "1px solid var(--line)",
                background: active ? "var(--ink)" : "var(--surface)",
                color: active ? "#fff" : "var(--ink)",
                borderColor: active ? "var(--ink)" : "var(--line)",
              }}
            >
              {c.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 22 }}>
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} variant="shop" />
        ))}
      </div>
    </main>
  );
}
