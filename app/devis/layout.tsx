import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devis gratuit",
  description:
    "Recevez une étude et un devis gratuits, adaptés à votre secteur, sous 24 heures. Sans engagement.",
};

export default function DevisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
