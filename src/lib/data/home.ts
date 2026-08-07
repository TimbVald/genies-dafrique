/* ── Home Data Service Functions ────────────────────────────────────── */
import { HERO_SLIDES, HERO_CONTENT, HERO_CONFIG } from "@/data/home/hero";
import { STATISTICS_DATA, STATISTICS_CONFIG } from "@/data/home/statistics";
import { ABOUT_SECTION_DATA } from "@/data/home/about";

/* ── Hero Data Functions ─────────────────────────────────────────────── */
export function getHeroSlides() {
  return HERO_SLIDES.filter((slide) => slide.visible).sort((a, b) => a.order - b.order);
}

export function getHeroContent() {
  return HERO_CONTENT;
}

export function getHeroConfig() {
  return HERO_CONFIG;
}

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
