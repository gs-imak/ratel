import type { ReactNode } from "react";

/* Brand words in red (client rule: "Ratel" and "abonnés Ratalerte" always red). */
export function Red({ children }: { children: ReactNode }) {
  return <span style={{ color: "#e30613", fontWeight: 700 }}>{children}</span>;
}

/* Variant for text sitting ON the red page field, where red would vanish:
   white pill, red text — still red, still readable. */
export function RedPill({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        background: "#fff",
        color: "#e30613",
        fontWeight: 700,
        padding: "2px 9px",
        borderRadius: 999,
        display: "inline-block",
        lineHeight: 1.5,
      }}
    >
      {children}
    </span>
  );
}
