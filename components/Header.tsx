"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/store";

const NAV = [
  { href: "/", label: "Accueil", match: (p: string) => p === "/" },
  { href: "/boutique", label: "Boutique", match: (p: string) => p.startsWith("/boutique") || p.startsWith("/produit") },
  { href: "/secteurs", label: "Secteurs", match: (p: string) => p.startsWith("/secteurs") },
  { href: "/#demo", label: "Démo", match: () => false },
  { href: "/signaler", label: "Signaler", match: (p: string) => p.startsWith("/signaler") },
  { href: "/suivi", label: "Suivi", match: (p: string) => p.startsWith("/suivi") },
];

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--surface)",
        borderBottom: "1px solid var(--line)",
        backdropFilter: "saturate(1.1)",
      }}
    >
      {/* fire-safety caution stripe */}
      <div className="hazard" />
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-emblem.svg"
            alt="Ratel — emblème"
            style={{ width: 46, height: 46, flex: "none", display: "block" }}
          />
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
            <span
              className="display"
              style={{ fontSize: 22, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ink)" }}
            >
              Ratel
            </span>
            <span
              style={{
                fontSize: 10.5,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--muted)",
                fontWeight: 600,
              }}
            >
              Prévention, formation &amp; sécurité incendie
            </span>
          </span>
        </Link>

        <nav style={{ display: "flex", gap: 20, alignItems: "center", marginLeft: "auto", flexWrap: "wrap" }}>
          {NAV.map((n) => {
            const active = n.match(pathname);
            return (
              <Link
                key={n.label}
                href={n.href}
                style={{
                  padding: "8px 2px",
                  fontSize: 14.5,
                  fontWeight: 600,
                  textDecoration: "none",
                  borderBottom: "2px solid transparent",
                  borderBottomColor: active ? "var(--accent)" : "transparent",
                  color: active ? "var(--ink)" : "var(--muted)",
                }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/devis"
            className="btn-hi"
            style={{
              padding: "9px 16px",
              fontSize: 14,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Devis gratuit
          </Link>
          <Link
            href="/panier"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 16px",
              border: "1px solid var(--line)",
              borderRadius: 999,
              background: "var(--surface)",
              color: "var(--ink)",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Panier
            <span
              style={{
                minWidth: 20,
                height: 20,
                padding: "0 5px",
                borderRadius: 999,
                background: "var(--accent)",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {count}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
