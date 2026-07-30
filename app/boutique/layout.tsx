import type { Metadata } from "next";

/* The page itself is a client component, so its metadata lives here. */
export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Extincteurs, détecteurs de fumée et couvertures anti-feu certifiés, livrés à Kinshasa. Choisissez selon votre risque : maison, voiture, cuisine ou entreprise.",
};

export default function BoutiqueLayout({ children }: { children: React.ReactNode }) {
  return children;
}
