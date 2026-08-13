import type { LocalizedText } from "@/types";

/* ── TrustBarPillar — un pilier de la bande de confiance ──────────── */
export interface TrustBarPillar {
  /** Identifiant unique */
  id: string;
  /** Nom de l'icône Lucide-React (utilisé dans ICON_MAP du composant) */
  icon: string;
  /** Couleur hexadécimale de l'icône */
  color: string;
  /** Couleur de fond de l'icône */
  bg: string;
  /** Titre court du pilier */
  title: LocalizedText;
  /** Description courte (1–2 phrases) */
  desc: LocalizedText;
  /** Ordre d'affichage */
  order: number;
  /** Visible ou masqué */
  visible: boolean;
}

/* ── Données des 4 piliers de confiance ────────────────────────────── */
export const TRUST_BAR_PILLARS: TrustBarPillar[] = [
  {
    id:      "excellence-academique",
    icon:    "Trophy",
    color:   "#1A3A8F",
    bg:      "#EEF2FF",
    order:   1,
    visible: true,
    title: {
      fr: "Excellence Académique",
      en: "Academic Excellence",
      ew: "Nyɔ́ñ ya Akom",
    },
    desc: {
      fr: "Enseignement rigoureux fondé sur l'innovation pédagogique et la réussite de chaque élève.",
      en: "Rigorous teaching built on pedagogical innovation and the success of every student.",
      ew: "Akom ya mbɔ́g na minlɔ́m ya mvoé amu nyɔ́ñ ya mwana nyonso.",
    },
  },
  {
    id:      "bilinguisme",
    icon:    "Globe",
    color:   "#2D5BE3",
    bg:      "#EEF7FF",
    order:   2,
    visible: true,
    title: {
      fr: "Bilinguisme FR / EN",
      en: "FR / EN Bilingualism",
      ew: "Bilingue FR / EN",
    },
    desc: {
      fr: "Immersion totale français–anglais dès la crèche, une ouverture sur deux cultures et le monde.",
      en: "Full French–English immersion from day care, an opening to two cultures and the world.",
      ew: "A yɔ́k français na anglais a tɔ́l crèche, yiban na mvan mibuma na si nyonso.",
    },
  },
  {
    id:      "innovation-pedagogie",
    icon:    "BookOpen",
    color:   "#F5A623",
    bg:      "#FFF8EE",
    order:   3,
    visible: true,
    title: {
      fr: "Innovation & Pédagogie",
      en: "Innovation & Pedagogy",
      ew: "Minlɔ́m & Akom",
    },
    desc: {
      fr: "Agriculture scolaire, entrepreneuriat junior et outils numériques intégrés au quotidien.",
      en: "School farming, junior entrepreneurship and digital tools integrated into daily learning.",
      ew: "Agriculture ya sukul, entrepreneuriat junior na technologies na akom ya ngon nyonso.",
    },
  },
  {
    id:      "encadrement-valeurs",
    icon:    "ShieldCheck",
    color:   "#2E7D32",
    bg:      "#F0FFF4",
    order:   4,
    visible: true,
    title: {
      fr: "Encadrement & Valeurs",
      en: "Care & Values",
      ew: "A yen mwana & Mimbɔ́g",
    },
    desc: {
      fr: "Bienveillance, discipline et responsabilité pour l'épanouissement intégral de chaque enfant.",
      en: "Well-being, discipline and responsibility for the holistic development of every child.",
      ew: "Mvoé, mbɔ́g na mbɔ́g ya fam amu mfañ nyonso ya mwana nyonso.",
    },
  },
];

/* ── Fonction de service ────────────────────────────────────────────── */
export function getTrustBarPillars(): TrustBarPillar[] {
  return TRUST_BAR_PILLARS.filter(p => p.visible).sort((a, b) => a.order - b.order);
}
