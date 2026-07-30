import type { MetadataRoute } from "next";

const SITE = "https://ratel-self.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* Cart and checkout are per-visitor states, not pages worth indexing. */
      disallow: ["/panier", "/paiement"],
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
