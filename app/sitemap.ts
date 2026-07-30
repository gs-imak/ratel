import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

const SITE = "https://ratel-self.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/boutique", priority: 0.9 },
    { path: "/formation", priority: 0.9 },
    { path: "/secteurs", priority: 0.8 },
    { path: "/devis", priority: 0.8 },
    { path: "/signaler", priority: 0.7 },
    { path: "/suivi", priority: 0.4 },
  ].map((p) => ({
    url: `${SITE}${p.path}`,
    changeFrequency: "monthly" as const,
    priority: p.priority,
  }));

  const products = PRODUCTS.map((p) => ({
    url: `${SITE}/produit/${p.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...products];
}
