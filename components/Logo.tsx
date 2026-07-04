/* Interim Ratel crest — honey badger + flame in a shield, in the brand
   colours (red / gold / black). Placeholder until the client's finished logo
   arrives. idPrefix keeps gradient ids unique when several render on one page. */
export default function Logo({
  size = 44,
  idPrefix = "rl",
}: {
  size?: number;
  idPrefix?: string;
}) {
  const fl = `${idPrefix}-fl`;
  const sh = `${idPrefix}-sh`;
  return (
    <svg
      viewBox="0 0 240 288"
      width={size}
      height={(size * 288) / 240}
      role="img"
      aria-label="Ratel"
      style={{ display: "block", flex: "none" }}
    >
      <defs>
        <linearGradient id={fl} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#d81e27" />
          <stop offset="0.5" stopColor="#f5820a" />
          <stop offset="1" stopColor="#f7c53a" />
        </linearGradient>
        <linearGradient id={sh} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e5252e" />
          <stop offset="1" stopColor="#a81219" />
        </linearGradient>
      </defs>

      <path
        d="M120 10 L214 38 Q220 40 220 47 L220 152 Q220 216 120 274 Q20 216 20 152 L20 47 Q20 40 26 38 Z"
        fill={`url(#${sh})`}
        stroke="#f5b301"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <path d="M120 88 L200 88 L200 154 Q200 206 120 252 Q40 206 40 154 L40 88 Z" fill="#f7f1e6" />

      {/* flame behind badger */}
      <path
        d="M120 60 C111 92 131 104 122 128 C144 108 141 152 126 178 C154 152 154 210 130 236 C154 212 151 256 120 262 C89 256 86 212 110 236 C86 210 86 152 114 178 C99 152 99 108 118 128 C109 104 129 92 120 60 Z"
        fill={`url(#${fl})`}
      />
      <path
        d="M120 150 C114 172 124 180 120 198 C133 184 131 212 120 230 C109 212 107 184 120 198 C116 180 126 172 120 150 Z"
        fill="#f7c53a"
      />

      {/* ears */}
      <path d="M90 90 L79 70 L104 82 Z" fill="#171512" />
      <path d="M150 90 L161 70 L136 82 Z" fill="#171512" />
      {/* head */}
      <path
        d="M120 66 C158 66 182 94 182 128 C182 152 171 174 153 188 L120 220 L87 188 C69 174 58 152 58 128 C58 94 82 66 120 66 Z"
        fill="#171512"
      />
      {/* white honey-badger cap */}
      <path
        d="M120 72 C156 72 179 96 182 128 L154 133 C150 116 138 110 120 132 C102 110 90 116 86 133 L58 128 C61 96 84 72 120 72 Z"
        fill="#f4efe4"
      />
      {/* angry brows */}
      <path d="M78 128 L118 142 L112 152 L80 140 Z" fill="#d81e27" />
      <path d="M162 128 L122 142 L128 152 L160 140 Z" fill="#d81e27" />
      {/* fierce amber eyes */}
      <path d="M88 140 L116 147 L99 156 Z" fill="#f5b301" />
      <path d="M152 140 L124 147 L141 156 Z" fill="#f5b301" />
      <path d="M102 146 L107 155 L98 153 Z" fill="#171512" />
      <path d="M138 146 L133 155 L142 153 Z" fill="#171512" />
      {/* muzzle */}
      <path
        d="M94 164 C94 184 105 200 120 206 C135 200 146 184 146 164 C133 172 120 172 120 172 C120 172 107 172 94 164 Z"
        fill="#f4efe4"
      />
      {/* nose */}
      <path d="M120 162 L131 172 L120 181 L109 172 Z" fill="#171512" />
      {/* snarl + fangs */}
      <path d="M103 185 Q120 183 137 185 Q140 196 120 207 Q100 196 103 185 Z" fill="#a5121a" />
      <path d="M108 186 L112 197 L117 187 Z" fill="#fff" />
      <path d="M132 186 L128 197 L123 187 Z" fill="#fff" />
      <path d="M113 206 L115 198 L119 205 Z" fill="#fff" />
      <path d="M127 206 L125 198 L121 205 Z" fill="#fff" />
    </svg>
  );
}
