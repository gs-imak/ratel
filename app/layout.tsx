import type { Metadata, Viewport } from "next";
import { Oswald, Public_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceWorker from "@/components/ServiceWorker";

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
/* Source Serif 4 used to be loaded and preloaded here in four weights and was never
   referenced by any stylesheet or component. Removed: it cost every visitor a
   render-blocking font download for nothing. */

export const metadata: Metadata = {
  /* Every route used to render the single title "Ratel", so browser tabs, bookmarks
     and search results were indistinguishable. Pages set their own title and the
     template appends the brand. */
  title: {
    default: "Ratel — Prévention & Sécurité Incendie à Kinshasa",
    template: "%s | Ratel",
  },
  description:
    "Extincteurs certifiés, formation incendie sur site et alerte géolocalisée Ratalerte, à Kinshasa et sur toute la République. La vie n'a pas de prix.",
  metadataBase: new URL("https://ratel-self.vercel.app"),
  openGraph: {
    title: "Ratel — Prévention & Sécurité Incendie",
    description:
      "Extincteurs certifiés, formation sur site et alerte géolocalisée. Kinshasa et toute la République.",
    type: "website",
    locale: "fr_CD",
    siteName: "Ratel",
  },
  twitter: { card: "summary_large_image" },
  /* iOS ignores the manifest, so the installed-app behaviour is declared here. */
  appleWebApp: {
    capable: true,
    title: "Ratel",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  /* Tints the phone's browser chrome in the brand red once installed. */
  themeColor: "#c11620",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${oswald.variable} ${publicSans.variable}`}
    >
      <body
        className="theme-ratel"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Providers>
          <Header />
          <div style={{ flex: 1 }}>{children}</div>
          <Footer />
          <ServiceWorker />
        </Providers>
      </body>
    </html>
  );
}
