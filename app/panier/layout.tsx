import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Votre panier",
  description: "Vérifiez votre commande avant de la valider.",
  robots: { index: false },
};

export default function PanierLayout({ children }: { children: React.ReactNode }) {
  return children;
}
