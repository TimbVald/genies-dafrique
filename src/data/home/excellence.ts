import type { LocalizedText } from "@/types";

/* ── ExcellencePole — un pôle d'excellence / infrastructure ────────── */
export interface ExcellencePole {
  /** Identifiant unique */
  id: string;
  /** Nom de l'icône Lucide-React (utilisé dans ICON_MAP du composant) */
  icon: string;
  /** Couleur hexadécimale de l'icône */
  color: string;
  /** Couleur de fond de l'icône */
  bg: string;
  /** Route interne vers la page de détail */
  href: string;
  /** Titre du pôle */
  title: LocalizedText;
  /** Description courte (2–3 phrases) */
  desc: LocalizedText;
  /** Ordre d'affichage */
  order: number;
  /** Visible ou masqué */
  visible: boolean;
}

/* ── Données des 6 pôles d'excellence ──────────────────────────────── */
export const EXCELLENCE_POLES: ExcellencePole[] = [
  {
    id:      "salle-informatique",
    icon:    "Monitor",
    color:   "#1A3A8F",
    bg:      "#EEF2FF",
    href:    "/vie-scolaire",
    order:   1,
    visible: true,
    title: {
      fr: "Salle Informatique",
      en: "Computer Lab",
      ew: "Bisɔ́m bya Informatique",
    },
    desc: {
      fr: "Des équipements numériques modernes pour initier les élèves au codage, à la bureautique et aux outils du monde de demain.",
      en: "Modern digital equipment to introduce students to coding, office tools and the technologies of tomorrow.",
      ew: "Bikɔ́l bya numérique bya mvoé amu a yeme bana coding na technologies ya ndɔ́ma.",
    },
  },
  {
    id:      "bibliotheque",
    icon:    "Library",
    color:   "#D32F2F",
    bg:      "#FFF0F0",
    href:    "/vie-scolaire",
    order:   2,
    visible: true,
    title: {
      fr: "Bibliothèque",
      en: "Library",
      ew: "Bibliothèque",
    },
    desc: {
      fr: "Un espace de lecture riche en ouvrages bilingues FR/EN pour cultiver le goût de lire dès le plus jeune âge.",
      en: "A reading space rich in FR/EN bilingual books to cultivate a love of reading from the earliest age.",
      ew: "Ase ya a lɔ́g na minlɔ́m mingi FR/EN amu a yɔ́k mvoé ya a lɔ́g a tɔ́l mvoé mvoé.",
    },
  },
  {
    id:      "jardin-ferme",
    icon:    "Sprout",
    color:   "#2E7D32",
    bg:      "#F0FFF4",
    href:    "/vie-scolaire",
    order:   3,
    visible: true,
    title: {
      fr: "Jardin & Ferme Pédagogique",
      en: "School Garden & Farm",
      ew: "Jardin & Ferme ya Sukul",
    },
    desc: {
      fr: "Agriculture scolaire, élevage et pisciculture : apprendre en cultivant, en nourrissant et en créant.",
      en: "School farming, livestock and aquaculture: learning by growing, raising and creating.",
      ew: "Agriculture, élevage na pisciculture ya sukul : a yeme na a lɛ́g, na a lɔ́g na a tɔ́l.",
    },
  },
  {
    id:      "hygiene-eau",
    icon:    "Droplets",
    color:   "#0288D1",
    bg:      "#E3F2FD",
    href:    "/vie-scolaire",
    order:   4,
    visible: true,
    title: {
      fr: "Hygiène & Coin d'Eau",
      en: "Hygiene & Water Station",
      ew: "Nnam & Coin d'Eau",
    },
    desc: {
      fr: "Infrastructures sanitaires adaptées et sensibilisation quotidienne à l'hygiène des mains et à la santé.",
      en: "Appropriate sanitary facilities and daily awareness of hand hygiene and health.",
      ew: "Bikɔ́l bya nnam bya mbɔ́g na a yeme bana nnam ya miboko na mfañ ngon nyonso.",
    },
  },
  {
    id:      "sport-epanouissement",
    icon:    "Dumbbell",
    color:   "#F5A623",
    bg:      "#FFF8EE",
    href:    "/vie-scolaire",
    order:   5,
    visible: true,
    title: {
      fr: "Sport & Épanouissement",
      en: "Sports & Well-being",
      ew: "Nyam & Mfañ",
    },
    desc: {
      fr: "Football, athlétisme, jeux collectifs : le sport au cœur du développement physique et de l'esprit d'équipe.",
      en: "Football, athletics, team games: sport at the heart of physical development and team spirit.",
      ew: "Football, athlétisme, bisala bya fam : nyam a ne nzame ya mfañ ya nyam na mfañ ya fam.",
    },
  },
  {
    id:      "encadrement-personnalise",
    icon:    "Users",
    color:   "#7B1FA2",
    bg:      "#F3E8FF",
    href:    "/a-propos",
    order:   6,
    visible: true,
    title: {
      fr: "Encadrement Personnalisé",
      en: "Personalised Support",
      ew: "A yen mwana nyonso",
    },
    desc: {
      fr: "Petits effectifs, suivi individuel de chaque élève et partenariat fort avec les familles pour une réussite garantie.",
      en: "Small class sizes, individual monitoring of each student and a strong partnership with families for guaranteed success.",
      ew: "Bana ba ne mvoé, a yen mwana nyonso na a kɔ́bɔ́talane na mbɔ́g na balɛ́g bana amu nyɔ́ñ.",
    },
  },
];

/* ── Fonction de service ────────────────────────────────────────────── */
export function getExcellencePoles(): ExcellencePole[] {
  return EXCELLENCE_POLES.filter(p => p.visible).sort((a, b) => a.order - b.order);
}
