import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paiement",
  description: "Réglez votre commande par mobile money.",
  robots: { index: false },
};

export default function PaiementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
