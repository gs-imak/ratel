import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ratalerte, l’alerte incendie géolocalisée",
  description:
    "Réservée aux abonnés Ratel : une alerte géolocalisée en un seul geste. Les sapeurs-pompiers sont prévenus et une équipe Ratel se déplace pour la première intervention.",
};

export default function SignalerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
