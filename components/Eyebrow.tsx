import type { CSSProperties, ReactNode } from "react";

/* Shared section-label: gold dash + caps text. tone="ink" for gold bands. */
export default function Eyebrow({
  children,
  tone = "gold",
  style,
}: {
  children: ReactNode;
  tone?: "gold" | "ink";
  style?: CSSProperties;
}) {
  return (
    <div className={`eyebrow${tone === "ink" ? " eyebrow-ink" : ""}`} style={style}>
      <span className="eyebrow-dash" />
      <span>{children}</span>
    </div>
  );
}
