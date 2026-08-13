import type { LocalizedText, LocalizedContent, BaseContent } from "@/types";

/* ── Director Section Configuration for Home Page ───────────────────── */
export interface DirectriceSectionData extends BaseContent {
  eyebrow: LocalizedText;
  title: LocalizedText;
  paragraph: LocalizedContent;
  quote: LocalizedText;
  name: LocalizedText;
  role: LocalizedText;
  photo: string;
  signature?: LocalizedText;
}

/* ── Director Section Data ──────────────────────────────────────────── */
export const DIRECTRICE_SECTION_DATA: DirectriceSectionData = {
  id: "directrice-section",
  slug: "mot-directrice",
  status: "published",
  createdAt: "2024-01-01T00:00:00Z",
  eyebrow: {
    fr: "MOT DE LA DIRECTRICE",
    en: "DIRECTOR'S MESSAGE",
    ew: "MOT YA DIRECTRICE",
  },
  title: {
    fr: "Une vie dédiée à l'éducation des enfants",
    en: "A Life Dedicated to Children's Education",
    ew: "Akom a nga bɔ́g na bana",
  },
  paragraph: {
    fr: "Je crois profondément que chaque enfant porte en lui un génie unique. Notre rôle en tant qu'éducateurs est de créer les conditions pour qu'il s'éveille et s'épanouisse. Au Complexe Scolaire Bilingue Les Génies d'Afrique, nous avons bâti un environnement où l'excellence académique se conjugue avec le bien-être de chaque élève. Notre approche bilingue, nos infrastructures modernes et notre équipe passionnée sont au service d'une seule mission : former les leaders de demain, dès aujourd'hui.",
    en: "I deeply believe that every child carries a unique genius within them. Our role as educators is to create the conditions for it to awaken and flourish. At the Bilingual School Complex Les Génies d'Afrique, we have built an environment where academic excellence goes hand in hand with the well-being of each student. Our bilingual approach, modern infrastructure and passionate team are all dedicated to a single mission: shaping tomorrow's leaders, starting today.",
    ew: "Mvom ya minene a ne mwana nyonso a ne génie ya mvoé. Misala ya biso a ne a tɔ́l ase ayi a yɔ́k. Na Complexe Scolaire Bilingue Les Génies d'Afrique, biso bi nga kɔ́bɔ́talane na nyɔ́ñ ya akom na a kɔ́l ya mwana nyonso. Minsili mibuma ya biso, bika bya mvoé na bikɔ́l bya misala bi ne dzam ya misala mɔ́k : a lɛ́g leaders ya ndɔ́ma, kobi lelo.",
  },
  quote: {
    fr: "Chaque enfant porte en lui un génie unique. Notre rôle est de créer les conditions pour qu'il s'éveille et s'épanouisse.",
    en: "Every child carries a unique genius within them. Our role is to create the conditions for it to awaken and flourish.",
    ew: "Mwana nyonso a ne génie ya mvoé. Misala ya biso a ne a tɔ́l ase ayi a yɔ́k.",
  },
  name: {
    fr: "Mme Mbarga",
    en: "Mrs. Mbarga",
    ew: "Mme Mbarga",
  },
  role: {
    fr: "Directrice Générale — Complexe Scolaire Bilingue Les Génies d'Afrique",
    en: "General Director — Bilingual School Complex Les Génies d'Afrique",
    ew: "Directrice Générale — Complexe Scolaire Bilingue Les Génies d'Afrique",
  },
  photo: "/images/IMG-20260723-WA0075.jpg",
  signature: {
    fr: "Mme Mbarga",
    en: "Mrs. Mbarga",
    ew: "Mme Mbarga",
  },
};

/* ── Export Function ─────────────────────────────────────────────────── */
export function getDirectriceSectionData() {
  return DIRECTRICE_SECTION_DATA;
}
