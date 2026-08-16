export type Product = {
  id: string;
  name: string;
  type: string;
  classes: string;
  cap: string;
  price: number;
  cat: "voiture" | "maison" | "cuisine" | "entreprise";
  tag: string;
  blurb: string;
  priceLabel: string;
  kind: "extincteur" | "couverture" | "detecteur";
  img: string;
  gallery?: string[];
  /** Units available. 0 means out of stock: the card greys out and ordering is blocked. */
  stock: number;
  /** ISO date the product is expected back, shown to the customer while out of stock. */
  restockAt?: string;
  inStock: boolean;
  /** "de retour le 15 septembre", or undefined when no date is known. */
  restockLabel?: string;
};

/** Stock per product. Until the catalogue moves to the database this is the single
    place to edit; afterwards the same two fields come from `products.stock` and
    `products.restock_at`, so nothing downstream changes. */
const PRODUCT_STOCK: Record<string, { stock: number; restockAt?: string }> = {
  p1: { stock: 24 },
  p2: { stock: 12 },
  p3: { stock: 6 },
  p4: { stock: 9 },
  p5: { stock: 4 },
  p6: { stock: 0, restockAt: "2026-09-15" },
  p7: { stock: 31 },
  p8: { stock: 0 },
  p9: { stock: 18 },
};

const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** Formatted by hand so the server and the browser always produce the same string. */
function restockLabelFrom(iso?: string): string | undefined {
  if (!iso) return undefined;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  return `de retour le ${d} ${MONTHS_FR[m - 1]}`;
}

/* Interim product photos (public/images) — replace files in place with the
   client's own photos, keeping the same filenames. See public/images/CREDITS.md. */
const PRODUCT_IMG: Record<string, string> = {
  p1: "/images/ext-powder.jpg",
  p2: "/images/ext-powder.jpg",
  p3: "/images/ext-co2.jpg",
  p4: "/images/ext-water.jpg",
  p5: "/images/ext-powder.jpg",
  p6: "/images/blanket.jpg",
  p7: "/images/detector.jpg",
  p8: "/images/ext-powder.jpg",
  p9: "/images/firestop-3.jpg", // client-supplied supplier photos (VEAE FIRE STOP)
};

/* Extra views for the product-page gallery (client-supplied). */
const PRODUCT_GALLERY: Record<string, string[]> = {
  p9: [
    "/images/firestop-3.jpg", // marketing shot + use cases
    "/images/firestop-2.jpg", // front + back with bracket
    "/images/firestop-4.jpg", // carton 24 pcs
    "/images/firestop-1.jpg", // four bottles
    "/images/reinold-max.jpg", // earlier multi-usage visual
  ],
};

/**
 * Format a price in Congolese francs: 125 000 FC.
 *
 * Prices are displayed in CDF ONLY. Arrete ministeriel
 * n. 007/CAB/VPM/MINECONAT/DMS/AKM/2025 (art. 6 bis) requires every economic
 * actor, explicitly including "plateformes en ligne", to display prices
 * exclusively in francs congolais, and prohibits announcing a price in a
 * foreign currency "sous n'importe quelle forme" — which also rules out
 * showing a USD figure alongside. Settling a transaction in another currency
 * stays legal; only the display is constrained.
 *
 * Amounts are integers: CDF is not used with decimals in practice, and the
 * M-Pesa rail rejects fractional amounts outright.
 *
 * Grouping is done by hand rather than with toLocaleString so the server and
 * the browser always emit the same string (differing ICU data would break
 * hydration). Non-breaking spaces keep an amount from wrapping mid-number.
 */
export function fmt(n: number): string {
  const grouped = Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${grouped} FC`;
}

/* PROVISIONAL PRICING. Every product, photo and price on the site is a
   placeholder: the client is sourcing the real catalogue from his supplier in
   China and will set final CDF prices with his accountant once the goods land.
   These figures were carried over from the original design and restated in
   round francs so the site is legal to publish in the meantime — they are not
   quotes. Replace the `price` values here and the whole site follows. */
const RAW: Omit<
  Product,
  "priceLabel" | "kind" | "img" | "stock" | "restockAt" | "inStock" | "restockLabel"
>[] = [
  { id: "p1", name: "Extincteur Poudre ABC 1 kg", type: "Poudre ABC", classes: "A B C", cap: "1 kg", price: 62000, cat: "voiture", tag: "Voiture & 2 roues", blurb: "Compact, idéal pour la boîte à gants ou le coffre. Polyvalent : feux de solides, de liquides et de gaz." },
  { id: "p2", name: "Extincteur Poudre ABC 6 kg", type: "Poudre ABC", classes: "A B C", cap: "6 kg", price: 125000, cat: "maison", tag: "Maison & garage", blurb: "La référence polyvalente pour la maison. Couvre la grande majorité des départs de feu domestiques." },
  { id: "p3", name: "Extincteur CO₂ 2 kg", type: "CO₂", classes: "B", cap: "2 kg", price: 160000, cat: "cuisine", tag: "Électrique & cuisine", blurb: "N’endommage pas les appareils. Parfait pour les tableaux électriques et les équipements sous tension." },
  { id: "p4", name: "Extincteur Eau pulvérisée 6 L", type: "Eau + additif", classes: "A B", cap: "6 L", price: 135000, cat: "maison", tag: "Bureau & habitation", blurb: "Refroidit et étouffe les feux de matériaux solides, sans résidu de poudre." },
  { id: "p5", name: "Extincteur Mousse 6 L", type: "Mousse", classes: "A B", cap: "6 L", price: 150000, cat: "entreprise", tag: "Entreprise & ERP", blurb: "Haute efficacité sur les liquides inflammables. Conforme aux exigences des établissements recevant du public." },
  { id: "p6", name: "Couverture anti-feu 1,2 m", type: "Couverture", classes: "F", cap: "1,2 m", price: 47000, cat: "cuisine", tag: "Cuisine", blurb: "Étouffe instantanément un feu de friture ou de poêle. Un geste simple, une vie sauvée." },
  { id: "p7", name: "Détecteur de fumée NF", type: "DAAF", classes: "—", cap: "pile 10 ans", price: 32000, cat: "maison", tag: "Maison", blurb: "Détecteur autonome certifié NF, pile longue durée. Recommandé dans chaque logement." },
  { id: "p8", name: "Extincteur Poudre ABC 2 kg", type: "Poudre ABC", classes: "A B C", cap: "2 kg", price: 82000, cat: "voiture", tag: "Voiture", blurb: "Le bon compromis encombrement / autonomie pour la voiture familiale." },
  { id: "p9", name: "Extincteur compact multi-usages 500 ml", type: "Spray extincteur", classes: "A B F", cap: "500 ml", price: 75000, cat: "maison", tag: "Multi-usages", blurb: "Le spray compact à garder partout : maison, voiture, camping, bateau. Support mural inclus, prêt à l’emploi en un geste — idéal pour les petits départs de feu." },
];

function kindOf(p: { id: string }): Product["kind"] {
  return p.id === "p6" ? "couverture" : p.id === "p7" ? "detecteur" : "extincteur";
}

export const PRODUCTS: Product[] = RAW.map((p) => {
  const { stock, restockAt } = PRODUCT_STOCK[p.id] ?? { stock: 0 };
  return {
    ...p,
    priceLabel: fmt(p.price),
    kind: kindOf(p),
    img: PRODUCT_IMG[p.id],
    gallery: PRODUCT_GALLERY[p.id],
    stock,
    restockAt,
    inStock: stock > 0,
    restockLabel: stock > 0 ? undefined : restockLabelFrom(restockAt),
  };
});

export const FEATURED_IDS = ["p9", "p2", "p3"];
export const featured = PRODUCTS.filter((p) => FEATURED_IDS.includes(p.id));

export function productById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export const CATEGORIES: { id: string; label: string }[] = [
  { id: "tous", label: "Tous" },
  { id: "maison", label: "Maison" },
  { id: "voiture", label: "Voiture" },
  { id: "cuisine", label: "Cuisine" },
  { id: "entreprise", label: "Entreprise" },
];

export const PASS_STEPS = [
  { num: "01", title: "Dégoupiller", desc: "Tirez fermement la goupille de sécurité pour débloquer la poignée de l’extincteur." },
  { num: "02", title: "Viser", desc: "Dirigez le jet vers la base des flammes, jamais vers le sommet du feu." },
  { num: "03", title: "Appuyer", desc: "Pressez fermement la poignée pour libérer l’agent extincteur de manière continue." },
  { num: "04", title: "Balayer", desc: "Balayez de gauche à droite à la base du feu jusqu’à extinction complète." },
];

export const TRUST = [
  /* Softened from "Normes NF, CE et EN 3 garanties": EN 3 covers portable
     extinguishers only, so it cannot apply to the blanket or the detector, and no
     supplier certificate is in hand yet. Restore the stronger claim once the real
     catalogue arrives with its documentation. */
  { title: "Matériel certifié", desc: "Conforme aux normes CE et EN." },
  { title: "Livraison 24-48h", desc: "Expédition rapide et suivie." },
  { title: "Garantie 6 mois", desc: "Sur tous les extincteurs." },
  { title: "Conseil expert", desc: "Le bon appareil pour votre risque." },
];

export type Sector = { id: string; label: string; icon: string; desc: string };

export const SECTORS: Sector[] = [
  { id: "entreprise", label: "Entreprise", icon: "🏭", desc: "Bureaux, ateliers et entrepôts : équipement complet, signalétique et plan d’évacuation adaptés à votre activité." },
  { id: "aeroport", label: "Aéroport", icon: "✈️", desc: "Zones à forte affluence et risques électriques : extincteurs CO₂, signalétique et couverture ERP conformes." },
  /* Labels stay singular to match the rest of the list. The ids are what /devis
     and the SECTORS lookup key on, so they must not change. */
  { id: "hopitaux", label: "Hôpital", icon: "🏥", desc: "Établissements de santé : équipements adaptés aux locaux sensibles et aux circulations d’évacuation." },
  { id: "station-service", label: "Station-service", icon: "⛽", desc: "Liquides inflammables : extincteurs poudre et mousse, contrôle réglementaire périodique." },
  { id: "salle-festivites", label: "Salle de festivités", icon: "🎉", desc: "Public nombreux : extincteurs accessibles, couverture ERP et plan d’évacuation." },
  { id: "scolaire", label: "Établissement scolaire", icon: "🏫", desc: "Écoles et collèges : sécurité des élèves, détecteurs et extincteurs vérifiés." },
  { id: "universite", label: "Université", icon: "🎓", desc: "Campus, amphis et laboratoires : protection adaptée aux locaux à risque." },
  { id: "batiment", label: "Bâtiment", icon: "🏢", desc: "Immeubles et copropriétés : équipement des parties communes et maintenance." },
];

export const ALERT_POINTS = [
  { n: "1", t: "Appuyez sur le bouton d’alerte depuis l’application." },
  { n: "2", t: "Votre position GPS est captée et envoyée instantanément." },
  { n: "3", t: "Secours et contacts notifiés — suivi en temps réel." },
];

export const REPORT_TYPES = [
  { id: "maison", label: "Maison" },
  { id: "vehicule", label: "Véhicule" },
  { id: "local", label: "Local pro" },
  { id: "public", label: "Espace public" },
];

export const TIMELINE = [
  { title: "Commande confirmée", time: "Aujourd’hui · 14:08", state: "done" as const },
  { title: "En préparation à l’entrepôt", time: "Aujourd’hui · 15:30", state: "done" as const },
  { title: "En cours de livraison", time: "Aujourd’hui · 17:12", state: "active" as const },
  { title: "Livré", time: "Estimé · 17:42", state: "todo" as const },
];

/* ------------------------- Formation (client copy) -------------------------
   Wording supplied by the client on 2026-07-19; kept close to his own text.
   Intervention windows: 48h across Kinshasa, 96h across the rest of the DRC. */

export const FORMATION_DELAIS = [
  { big: "48H", small: "Ville province de Kinshasa" },
  { big: "96H", small: "Sur toute la République" },
];

export const FORMATION_PROGRAMME = [
  {
    num: "01",
    title: "Manipulation des extincteurs",
    desc: "Les participants sont formés pour utiliser efficacement les extincteurs dans des environnements complexes et fréquentés, afin d’obtenir une réponse rapide et sécurisée en cas de départ de feu.",
  },
  {
    num: "02",
    title: "Normes et réglementation ERP",
    desc: "Nous mettons l’accent sur la réglementation incendie applicable aux ERP, pour que votre personnel soit non seulement préparé, mais aussi informé des obligations légales propres à votre établissement.",
  },
  {
    num: "03",
    title: "Exercices en conditions réelles",
    desc: "Nos formateurs conduisent des exercices pratiques dans vos locaux, en simulant des scénarios réalistes pour tester et ancrer les compétences acquises pendant la formation.",
  },
];

/* Options for the "genre de formation souhaité" field on the booking form.
   Derived from the programme above, plus a full-session option — the client
   asked for the field without naming the choices, so these follow his own
   module titles and should be confirmed with him. */
export const FORMATION_TYPES = [
  { id: "complete", label: "Formation complète (les 3 modules)" },
  { id: "manipulation", label: "Manipulation des extincteurs" },
  { id: "erp", label: "Normes et réglementation ERP" },
  { id: "exercices", label: "Exercices en conditions réelles" },
];

export const FORMATION_POINTS = [
  {
    title: "Directement dans vos locaux",
    desc: "Pas besoin de déplacer vos collaborateurs. Nous intervenons dans votre environnement de travail réel, là où vos équipes évoluent au quotidien.",
  },
  {
    title: "Organisée sous 48h",
    desc: "Nous sommes en capacité de réaliser votre formation sous 48h partout dans la ville province de Kinshasa, et sous 96h sur toute l’étendue de la République.",
  },
  {
    title: "Toutes tailles de groupes",
    desc: "De la session pour une petite équipe aux groupes plus importants, avec une attention personnalisée à chaque participant.",
  },
];

/** Shipping is free above this basket total (in CDF). */
export const FREE_SHIPPING_THRESHOLD = 200000;
export const SHIPPING_FLAT = 15000;
