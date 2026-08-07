import type { SiteInfo } from "@/types";

/* ── Site Information Data ─────────────────────────────────────── */
export const SITE_INFO: SiteInfo = {
  name: {
    fr: "Complexe Scolaire Bilingue Les Génies d'Afrique",
    en: "Bilingual School Complex Les Génies d'Afrique",
    ew: "Complexe Scolaire Bilingue Les Génies d'Afrique",
  },
  tagline: {
    fr: "L'excellence bilingue pour un avenir brillant",
    en: "Bilingual excellence for a bright future",
    ew: "Excellence bilingue ya future",
  },
  description: {
    fr: "Le Complexe Scolaire Bilingue Les Génies d'Afrique offre une éducation de qualité bilingue français-anglais aux enfants de 0 à 11 ans.",
    en: "The Bilingual School Complex Les Génies d'Afrique offers quality bilingual French-English education to children aged 0 to 11.",
    ew: "Complexe Scolaire Bilingue Les Génies d'Afrique a offer education bilingue FR-EN.",
  },
  logo: "/images/logo.png",
  favicon: "/favicon.ico",
  address: {
    fr: "Yaoundé, Cameroun",
    en: "Yaoundé, Cameroon",
    ew: "Yaoundé, Cameroon",
  },
  phone: ["651 11 15 06", "656 66 38 48"],
  email: "contact@geniesdafrique.com",
  whatsapp: "651 11 15 06",
  socialNetworks: [
    {
      platform: "facebook",
      url: "https://facebook.com/geniesdafrique",
      icon: "facebook",
      visible: true,
    },
    {
      platform: "instagram",
      url: "https://instagram.com/geniesdafrique",
      icon: "instagram",
      visible: true,
    },
    {
      platform: "whatsapp",
      url: "https://wa.me/237651111506",
      icon: "whatsapp",
      visible: true,
    },
  ],
  openingHours: {
    fr: "Lun–Ven : 7h30–16h00",
    en: "Mon–Fri: 7:30 AM–4:00 PM",
    ew: "Lɔ́n–Vɛn: 7h30–16h00",
  },
  foundedYear: 2024,
  studentCount: 150,
  teacherCount: 12,
};

/* ── Get Site Info Function ─────────────────────────────────────── */
export function getSiteInfo(): SiteInfo {
  return SITE_INFO;
}
