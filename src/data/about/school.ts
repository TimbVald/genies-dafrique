import type { LocalizedText } from "@/types";

/* ── School Information Configuration ───────────────────────────── */
export interface SchoolInfo {
  name: LocalizedText;
  shortName: LocalizedText;
  slogan: LocalizedText;
  description: LocalizedText;
  foundedYear: string;
  location: LocalizedText;
  accreditation: {
    number: string;
    date: string;
    authority: string;
  };
}

/* ── School Information Data ───────────────────────────────────── */
export const SCHOOL_INFO: SchoolInfo = {
  name: {
    fr: "Complexe Scolaire Bilingue Les Génies d'Afrique",
    en: "Bilingual School Complex Les Génies d'Afrique",
    ew: "Complexe Scolaire Bilingue Les Génies d'Afrique",
  },
  shortName: {
    fr: "Les Génies d'Afrique",
    en: "Les Génies d'Afrique",
    ew: "Les Génies d'Afrique",
  },
  slogan: {
    fr: "Former aujourd'hui les leaders de demain",
    en: "Shaping today's leaders for tomorrow",
    ew: "Bongwan amu mintô mi kië",
  },
  description: {
    fr: "École bilingue privée de la crèche au primaire, agréée MINEDUB, à Nkozoa, Yaoundé, Cameroun.",
    en: "Private bilingual school from day care to primary, MINEDUB accredited, in Nkozoa, Yaoundé, Cameroon.",
    ew: "Sukul bilingue privé, kobi na crèche tii primaire, ya MINEDUB, na Nkozoa, Yaoundé, Kamerun.",
  },
  foundedYear: "2024",
  location: {
    fr: "Nkozoa, Yaoundé, Cameroun",
    en: "Nkozoa, Yaoundé, Cameroon",
    ew: "Nkozoa, Yaoundé, Kamerun",
  },
  accreditation: {
    number: "Arrêté N°103/j1/7/A/MINEDUB/SG/DSEPB/SDAAP",
    date: "14 février 2025",
    authority: "Ministère de l'Éducation de Base",
  },
};
