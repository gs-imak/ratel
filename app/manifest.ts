import type { MetadataRoute } from "next";

/* Makes the site installable on a phone home screen, which is what the client and
   his customers mean by "l'application". One codebase serves both the public site
   and the installed app (see docs/adr/0001), so there is nothing separate to ship. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ratel — Prévention & Sécurité Incendie",
    short_name: "Ratel",
    description:
      "Extincteurs certifiés, formation incendie sur site et alerte géolocalisée Ratalerte. Kinshasa et toute la République.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#c11620",
    theme_color: "#c11620",
    lang: "fr",
    dir: "ltr",
    categories: ["business", "shopping", "utilities"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Ratalerte", short_name: "Alerte", url: "/signaler" },
      { name: "Boutique", short_name: "Boutique", url: "/boutique" },
      { name: "Suivi de livraison", short_name: "Suivi", url: "/suivi" },
    ],
  };
}
