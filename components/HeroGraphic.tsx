/* Flat vector illustration used in the hero while real product photos are
   pending. Extinguisher (red) knocking down a flame (yellow) — on-brand
   red/yellow, with the safety-blue accent on the gauge. */
export default function HeroGraphic() {
  return (
    <svg
      viewBox="0 0 460 560"
      role="img"
      aria-label="Extincteur Ratel neutralisant un départ de feu"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <defs>
        <linearGradient id="rg-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e5252e" />
          <stop offset="1" stopColor="#b3161d" />
        </linearGradient>
        <linearGradient id="rg-flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#f5b301" />
          <stop offset="0.6" stopColor="#f5820a" />
          <stop offset="1" stopColor="#e0341f" />
        </linearGradient>
        <radialGradient id="rg-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgba(245,179,1,.28)" />
          <stop offset="1" stopColor="rgba(245,179,1,0)" />
        </radialGradient>
      </defs>

      {/* soft warm glow behind the flame */}
      <circle cx="340" cy="360" r="150" fill="url(#rg-glow)" />

      {/* ---- Extinguisher ---- */}
      <g transform="translate(96 96)">
        {/* handle + neck */}
        <rect x="34" y="8" width="60" height="16" rx="5" fill="#211a14" />
        <rect x="20" y="-6" width="34" height="16" rx="5" fill="#3a2f26" />
        <rect x="52" y="24" width="30" height="26" rx="4" fill="#211a14" />
        {/* pressure gauge (safety blue) */}
        <circle cx="106" cy="20" r="14" fill="#fff" stroke="#211a14" strokeWidth="3" />
        <circle cx="106" cy="20" r="8" fill="#1e63b0" />
        {/* body */}
        <rect x="30" y="48" width="76" height="150" rx="26" fill="url(#rg-body)" />
        <rect x="30" y="48" width="20" height="150" rx="20" fill="rgba(255,255,255,.14)" />
        {/* label */}
        <rect x="40" y="92" width="56" height="66" rx="6" fill="#faf6ef" />
        <rect x="47" y="102" width="42" height="7" rx="3.5" fill="#d81e27" />
        <rect x="47" y="116" width="42" height="5" rx="2.5" fill="#c9c1b6" />
        <rect x="47" y="126" width="34" height="5" rx="2.5" fill="#c9c1b6" />
        <text x="68" y="150" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontWeight="700" fontSize="12" fill="#16110d">
          ABC
        </text>
        {/* hose */}
        <path d="M82 40 C150 30 168 96 150 150" fill="none" stroke="#211a14" strokeWidth="9" strokeLinecap="round" />
        <rect x="140" y="146" width="26" height="12" rx="4" transform="rotate(24 153 152)" fill="#3a2f26" />
      </g>

      {/* ---- Flame being knocked down ---- */}
      <g transform="translate(300 300)" className="rat-flame">
        <path
          d="M40 150 C 4 120 16 84 34 66 C 30 92 52 96 50 72 C 66 84 86 110 78 140 C 100 120 96 92 88 78 C 116 104 120 150 86 178 C 60 200 20 190 40 150 Z"
          fill="url(#rg-flame)"
        />
        <path
          d="M52 150 C 36 134 42 112 54 100 C 54 120 70 120 66 104 C 82 122 82 150 64 166 C 48 178 44 164 52 150 Z"
          fill="#ffd66b"
        />
      </g>

      {/* ---- Spray particles ---- */}
      <g fill="#eef3f7" opacity="0.9">
        <circle cx="250" cy="268" r="6" />
        <circle cx="272" cy="286" r="4" />
        <circle cx="262" cy="250" r="3.5" />
        <circle cx="238" cy="290" r="3" />
        <circle cx="284" cy="262" r="3" />
      </g>
    </svg>
  );
}
