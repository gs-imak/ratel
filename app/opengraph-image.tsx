import { ImageResponse } from "next/og";

/* The client sends this link over WhatsApp, where a share with no picture looks
   broken. Generated rather than shipped as a file so it stays in sync with the
   brand colours and needs no binary asset in the repo. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ratel — Prévention Sécurité Incendie, Kinshasa";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 90px",
          background: "linear-gradient(160deg,#d92028 0%,#c11620 55%,#a91219 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        {/* hazard stripe, echoing the site header */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 18,
            background:
              "repeating-linear-gradient(45deg,#f5b301 0 22px,#16110d 22px 44px)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#f5b301",
            fontWeight: 700,
            marginBottom: 26,
          }}
        >
          Kinshasa · République Démocratique du Congo
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            marginBottom: 26,
          }}
        >
          La vie n’a pas de prix.
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "rgba(255,255,255,.9)", marginBottom: 52 }}>
          Extincteurs certifiés, formation et alerte géolocalisée.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              color: "#e30613",
              fontSize: 46,
              fontWeight: 800,
              padding: "14px 30px",
              borderRadius: 12,
              letterSpacing: 2,
            }}
          >
            RATEL
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,.85)" }}>
            Prévention &amp; Sécurité Incendie
          </div>
        </div>
      </div>
    ),
    size
  );
}
