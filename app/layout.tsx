import type { Metadata } from "next";
import { Oswald, Public_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-public-sans",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  title: "Ratel — Prévention, formation & sécurité incendie",
  description:
    "Extincteurs certifiés NF/CE livrés vite et bien, et une alerte géolocalisée qui prévient les secours en un seul geste. La vie n'a pas de prix.",
  metadataBase: new URL("https://ratel-self.vercel.app"),
  openGraph: {
    title: "Ratel — Prévention, formation & sécurité incendie",
    description:
      "Extincteurs certifiés et alerte géolocalisée. Protégez votre foyer, votre véhicule, votre entreprise.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${oswald.variable} ${publicSans.variable} ${sourceSerif.variable}`}
    >
      <body
        className="theme-ratel"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Providers>
          <Header />
          <div style={{ flex: 1 }}>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
