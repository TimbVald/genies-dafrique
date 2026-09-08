import type { SiteInfo } from "@/types";

/* ── Site Information Data ─────────────────────────────────────── */
export const SITE_INFO: SiteInfo = {
  name: {
    fr: "Complexe Scolaire Bilingue Les Génies d'Afrique",
    en: "Bilingual School Complex Les Génies d'Afrique",
    ew: "Complexe Scolaire Bilingue Les Génies d'Afrique",
  },
  nameShort: "CSB Génies d'Afrique",
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
  logo: "/logo/logo.png",
  favicon: "/favicon.ico",
  address: {
    fr: "Nkozoa, derrière la Boulangerie Massa\nYaoundé, Cameroun",
    en: "Nkozoa, behind Boulangerie Massa\nYaoundé, Cameroon",
    ew: "Nkozoa, nyuma ya Boulangerie Massa\nYaoundé, Kamerun",
  },
  phone: ["651 11 15 06", "656 66 38 48"],
  email: "lesgeniesdafrique836@gmail.com",
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
  // Geographic coordinates for Schema.org and local SEO
  // Source: Google Maps Place ID 0x4890fbced24575f9:0xfb2c146b077eaf99
  coordinates: {
    latitude: 3.8520,
    longitude: 11.5090,
  },
  googleMapsPlaceId: "0x4890fbced24575f9:0xfb2c146b077eaf99",
  googleMapsDirectionsUrl: "https://maps.app.goo.gl/b6r6PyYzXz8Meeoh6",
};

/* ── Get Site Info Function ─────────────────────────────────────── */
export function getSiteInfo(): SiteInfo {
  return SITE_INFO;
}
