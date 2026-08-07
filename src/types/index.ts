/* ═══════════════════════════════════════════════════════════════
   BASE TYPES FOR DYNAMIC DATA ARCHITECTURE
   Complexe Scolaire Bilingue Les Génies d'Afrique
═════════════════════════════════════════════════════════════════ */

/* ── Localized Text Type ───────────────────────────────────────── */
export type LocalizedText = {
  fr: string;
  en: string;
  ew: string;
};

/* ── Localized Content Type (for longer content) ─────────────── */
export type LocalizedContent = {
  fr: string;
  en: string;
  ew: string;
};

/* ── Content Status Type ───────────────────────────────────────── */
export type ContentStatus = "draft" | "published" | "archived";

/* ── Media Type ────────────────────────────────────────────────── */
export type Media = {
  url: string;
  alt?: LocalizedText;
  title?: LocalizedText;
};

/* ── Category Type ────────────────────────────────────────────── */
export type Category = {
  id: string;
  name: LocalizedText;
  slug: string;
};

/* ── Base Content Type ────────────────────────────────────────── */
export type BaseContent = {
  id: string;
  slug: string;
  status: ContentStatus;
  createdAt: string; // ISO 8601 format
  updatedAt?: string; // ISO 8601 format
};

/* ── Re-export specialized types from submodules ───────────────── */
export type { AdmissionStep, AdmissionDocument, AdmissionRequirement, AdmissionFee, Application } from "./admissions";
export type { Program } from "./programs";
export type { NewsArticle } from "./news";
export type { Event } from "./events";
export type { GalleryItem } from "./gallery";
export type { Document } from "./documents";
export type { FAQItem } from "./faq";
export type { Testimonial } from "./testimonials";
export type { SiteInfo, SocialNetwork } from "./global";
export type { NavigationItem, FooterLink, FooterSection } from "./navigation";
export type { SchoolLifeActivity } from "./school-life";
