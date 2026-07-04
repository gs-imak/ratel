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
};

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
};

/** Format a number as French currency: 24,90 € (with non-breaking space). */
export function fmt(n: number): string {
  return n.toFixed(2).replace(".", ",") + " €";
}

const RAW: Omit<Product, "priceLabel" | "kind" | "img">[] = [
  { id: "p1", name: "Extincteur Poudre ABC 1 kg", type: "Poudre ABC", classes: "A B C", cap: "1 kg", price: 24.9, cat: "voiture", tag: "Voiture & 2 roues", blurb: "Compact, idéal pour la boîte à gants ou le coffre. Polyvalent : feux de solides, de liquides et de gaz." },
  { id: "p2", name: "Extincteur Poudre ABC 6 kg", type: "Poudre ABC", classes: "A B C", cap: "6 kg", price: 49.9, cat: "maison", tag: "Maison & garage", blurb: "La référence polyvalente pour la maison. Couvre la grande majorité des départs de feu domestiques." },
  { id: "p3", name: "Extincteur CO₂ 2 kg", type: "CO₂", classes: "B", cap: "2 kg", price: 64.9, cat: "cuisine", tag: "Électrique & cuisine", blurb: "N’endommage pas les appareils. Parfait pour les tableaux électriques et les équipements sous tension." },
  { id: "p4", name: "Extincteur Eau pulvérisée 6 L", type: "Eau + additif", classes: "A B", cap: "6 L", price: 54.9, cat: "maison", tag: "Bureau & habitation", blurb: "Refroidit et étouffe les feux de matériaux solides, sans résidu de poudre." },
  { id: "p5", name: "Extincteur Mousse 6 L", type: "Mousse", classes: "A B", cap: "6 L", price: 59.9, cat: "entreprise", tag: "Entreprise & ERP", blurb: "Haute efficacité sur les liquides inflammables. Conforme aux exigences des établissements recevant du public." },
  { id: "p6", name: "Couverture anti-feu 1,2 m", type: "Couverture", classes: "F", cap: "1,2 m", price: 18.9, cat: "cuisine", tag: "Cuisine", blurb: "Étouffe instantanément un feu de friture ou de poêle. Un geste simple, une vie sauvée." },
  { id: "p7", name: "Détecteur de fumée NF", type: "DAAF", classes: "—", cap: "pile 10 ans", price: 12.9, cat: "maison", tag: "Maison", blurb: "Détecteur autonome certifié NF, pile longue durée. Obligatoire dans chaque logement." },
  { id: "p8", name: "Extincteur Poudre ABC 2 kg", type: "Poudre ABC", classes: "A B C", cap: "2 kg", price: 32.9, cat: "voiture", tag: "Voiture", blurb: "Le bon compromis encombrement / autonomie pour la voiture familiale." },
];

function kindOf(p: { id: string }): Product["kind"] {
  return p.id === "p6" ? "couverture" : p.id === "p7" ? "detecteur" : "extincteur";
}

export const PRODUCTS: Product[] = RAW.map((p) => ({
  ...p,
  priceLabel: fmt(p.price),
  kind: kindOf(p),
  img: PRODUCT_IMG[p.id],
}));

export const FEATURED_IDS = ["p2", "p3", "p6"];
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
  { title: "Matériel certifié", desc: "Normes NF, CE et EN 3 garanties." },
  { title: "Livraison 24-48h", desc: "Expédition rapide et suivie." },
  { title: "Garantie 6 mois", desc: "Sur tous les extincteurs." },
  { title: "Conseil expert", desc: "Le bon appareil pour votre risque." },
];

export type Sector = { id: string; label: string; icon: string; desc: string };

export const SECTORS: Sector[] = [
  { id: "aeroport", label: "Aéroport", icon: "✈️", desc: "Zones à forte affluence et risques électriques : extincteurs CO₂, signalétique et couverture ERP conformes." },
  { id: "hopitaux", label: "Hôpitaux", icon: "🏥", desc: "Établissements de santé : équipements adaptés aux locaux sensibles et aux circulations d’évacuation." },
  { id: "station-service", label: "Station-service", icon: "⛽", desc: "Liquides inflammables : extincteurs poudre et mousse, contrôle réglementaire périodique." },
  { id: "salle-festivites", label: "Salle de festivités", icon: "🎉", desc: "Public nombreux : extincteurs accessibles, couverture ERP et plan d’évacuation." },
  { id: "scolaire", label: "Établissements scolaires", icon: "🏫", desc: "Écoles et collèges : sécurité des élèves, détecteurs et extincteurs vérifiés." },
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

/** Shipping is free over this threshold (in €). */
export const FREE_SHIPPING_THRESHOLD = 79;
export const SHIPPING_FLAT = 5.9;
