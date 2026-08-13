/* ── Home Data Service Functions ────────────────────────────────────── */
import { HERO_SLIDES, HERO_CONTENT, HERO_CONFIG } from "@/data/home/hero";
import { getHeroCycles }                           from "@/data/home/hero-cycles";
import { STATISTICS_DATA, STATISTICS_CONFIG }      from "@/data/home/statistics";
import { ABOUT_SECTION_DATA }                      from "@/data/home/about";
import { getTrustBarPillars }                      from "@/data/home/trustbar";
import { getExcellencePoles }                      from "@/data/home/excellence";
import { getDirectriceSectionData as getDirectriceData } from "@/data/home/directrice";

/* ── Hero Data Functions ─────────────────────────────────────────────── */
/** Slides legacy (image + ken burns uniquement) */
export function getHeroSlides() {
  return HERO_SLIDES.filter((slide) => slide.visible).sort((a, b) => a.order - b.order);
}

/** Contenu global du hero (titre, sous-titre, CTAs communs) */
export function getHeroContent() {
  return HERO_CONTENT;
}

/** Configuration timing du slider (durée, transition, autoplay…) */
export function getHeroConfig() {
  return HERO_CONFIG;
}

/**
 * Cycles pédagogiques du slider hero.
 * Chaque cycle a sa propre image, titre, accroche et CTA localisés.
 */
export { getHeroCycles };

/* ── TrustBar ────────────────────────────────────────────────────────── */
/** 4 piliers de confiance (Excellence, Bilinguisme, Innovation, Encadrement) */
export { getTrustBarPillars };

/* ── Excellence Section ──────────────────────────────────────────────── */
/** 6 pôles d'excellence (Informatique, Bibliothèque, Jardin, Hygiène, Sport, Encadrement) */
export { getExcellencePoles };

/* ── Statistics Data Functions ───────────────────────────────────────── */
export function getStatistics() {
  return STATISTICS_DATA.filter((stat) => stat.visible).sort((a, b) => a.order - b.order);
}

export function getStatisticsConfig() {
  return STATISTICS_CONFIG;
}

/* ── About Section Data Functions ─────────────────────────────────────── */
export function getAboutSectionData() {
  return ABOUT_SECTION_DATA;
}

/* ── Directrice Section Data Functions ─────────────────────────────────── */
export function getDirectriceSectionData() {
  return getDirectriceData();
}
