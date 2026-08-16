import type { LocalizedText } from "@/types";

/* ── HeroCycle — un slide par cycle pédagogique ────────────────────── */
export interface HeroCycle {
  /** Identifiant unique du cycle */
  id: string;
  /** Chemin de l'image (dans /public) */
  image: string;
  /** CSS object-position pour cadrage */
  position: string;
  /** CSS transform — point de départ Ken Burns */
  kenFrom: string;
  /** CSS transform — point d'arrivée Ken Burns */
  kenTo: string;
  /** URL de destination du bouton CTA */
  ctaHref: string;
  /** Pré-titre affiché au-dessus du titre principal */
  label: LocalizedText;
  /** Grand titre du cycle (H1 dans le hero) */
  title: LocalizedText;
  /** Courte phrase d'accroche sous le titre */
  accroche: LocalizedText;
  /** Libellé du bouton CTA spécifique à ce cycle */
  cta: LocalizedText;
  /** Ordre d'affichage dans le slider */
  order: number;
  /** Afficher ou masquer cette slide */
  visible: boolean;
}

/* ── Données des cycles pédagogiques ───────────────────────────────── */
export const HERO_CYCLES: HeroCycle[] = [
  {
    id:       "creche",
    image:    "https://res.cloudinary.com/dyetkan86/image/upload/v1786842107/c174637a2281ede3ef2401f4e45add0ff7624ba58e7ec82a048183e53cb95ff2_zu6whr.png",
    position: "center 20%",
    kenFrom:  "scale(1.08) translateY(-2%)",
    kenTo:    "scale(1.0)  translateY(2%)",
    ctaHref:  "/formations#creche",
    order:    1,
    visible:  true,
    label: {
      fr: "Les Génies d'Afrique",
      en: "Les Génies d'Afrique",
      ew: "Les Génies d'Afrique",
    },
    title: {
      fr: "La Crèche",
      en: "Day Care",
      ew: "Crèche",
    },
    accroche: {
      fr: "Un univers d'éveil, de découvertes et de tendresse où chaque enfant grandit en confiance.",
      en: "A world of awakening and discovery where every child grows in confidence and warmth.",
      ew: "Ase ya mfañ, ya dzam na ya mvoé amu mwana nyonso a nga kɔ́l na mbɔ́g.",
    },
    cta: {
      fr: "Découvrir la crèche",
      en: "Discover Day Care",
      ew: "Yiba Crèche",
    },
  },
  {
    id:       "maternelle",
    image:    "https://res.cloudinary.com/dyetkan86/image/upload/v1786841184/IMG-20260816-WA9732_da9wrx.jpg",
    position: "center 15%",
    kenFrom:  "scale(1.06) translateX(-1%)",
    kenTo:    "scale(1.0)  translateX(1%)",
    ctaHref:  "/formations#maternelle",
    order:    2,
    visible:  true,
    label: {
      fr: "Les Génies d'Afrique",
      en: "Les Génies d'Afrique",
      ew: "Les Génies d'Afrique",
    },
    title: {
      fr: "La Maternelle",
      en: "Nursery School",
      ew: "Maternelle",
    },
    accroche: {
      fr: "L'âge des grandes découvertes : éveil bilingue, curiosité et épanouissement de 2 à 5 ans.",
      en: "The age of great discoveries: bilingual awakening, curiosity and fulfilment from 2 to 5 years.",
      ew: "Osu ya a yen dzam minene : a yeme bilingue na mfañ kobi na 2 tii 5 osu.",
    },
    cta: {
      fr: "Découvrir la maternelle",
      en: "Discover Nursery",
      ew: "Yiba Maternelle",
    },
  },
  {
    id:       "primaire-fr",
    image:    "https://res.cloudinary.com/dyetkan86/image/upload/v1786848131/file_00000000c594820ebdb2f66a1dcefc88_yhbdgd.png",
    position: "center 30%",
    kenFrom:  "scale(1.07) translateY(0%)",
    kenTo:    "scale(1.0)  translateY(3%)",
    ctaHref:  "/formations#primaire-francophone",
    order:    3,
    visible:  true,
    label: {
      fr: "Les Génies d'Afrique",
      en: "Les Génies d'Afrique",
      ew: "Les Génies d'Afrique",
    },
    title: {
      fr: "Primaire Francophone",
      en: "French Primary",
      ew: "Primaire Francophone",
    },
    accroche: {
      fr: "Programme officiel MINEDUB enrichi, anglais intensif et projets pédagogiques innovants.",
      en: "Enhanced official MINEDUB curriculum, intensive English and innovative educational projects.",
      ew: "Programme MINEDUB na a yɔ́k, English ya mvoé na bikɔ́l bya akom bya minsili.",
    },
    cta: {
      fr: "Découvrir le primaire FR",
      en: "Discover French Primary",
      ew: "Yiba Primaire FR",
    },
  },
  {
    id:       "primaire-en",
    image:    "https://res.cloudinary.com/dyetkan86/image/upload/v1786848131/file_00000000c594820ebdb2f66a1dcefc88_yhbdgd.png",
    position: "center 25%",
    kenFrom:  "scale(1.06) translateX(1%)",
    kenTo:    "scale(1.0)  translateX(-1%)",
    ctaHref:  "/formations#primaire-anglophone",
    order:    4,
    visible:  true,
    label: {
      fr: "Les Génies d'Afrique",
      en: "Les Génies d'Afrique",
      ew: "Les Génies d'Afrique",
    },
    title: {
      fr: "Primaire Anglophone",
      en: "English Primary",
      ew: "Primaire Anglophone",
    },
    accroche: {
      fr: "Curriculum anglophone MINEDUB rigoureux, français langue seconde renforcée.",
      en: "Rigorous MINEDUB anglophone curriculum, strong French as a second language.",
      ew: "Curriculum anglophone ya MINEDUB, français a ne mfañ ya iba ya mvoé.",
    },
    cta: {
      fr: "Découvrir le primaire EN",
      en: "Discover English Primary",
      ew: "Yiba Primaire EN",
    },
  },
];

/* ── Fonction de service ────────────────────────────────────────────── */
export function getHeroCycles(): HeroCycle[] {
  return HERO_CYCLES.filter(c => c.visible).sort((a, b) => a.order - b.order);
}
