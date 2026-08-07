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
