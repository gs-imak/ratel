import type { Metadata } from "next";
import { productById } from "@/lib/products";

/* The product page is a client component, so its title is resolved here from the
   route param. Without this every product shared the same generic tab title. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = productById(id);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: product.name,
    description: product.blurb,
  };
}

export default function ProduitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
