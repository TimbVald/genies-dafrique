/* ── News Data Service Functions ────────────────────────────────────── */
import { NEWS_DATA } from "@/data/newsData";

/* ── Get All Published News ───────────────────────────────────────────── */
export function getNews() {
  return NEWS_DATA;
}

/* ── Get Featured News ───────────────────────────────────────────────── */
export function getFeaturedNews() {
  // Return first 3 news items as featured
  return NEWS_DATA.slice(0, 3);
}

/* ── Get Latest News ──────────────────────────────────────────────────── */
export function getLatestNews(limit: number = 3) {
  return NEWS_DATA.slice(0, limit);
}

/* ── Get News by Slug ─────────────────────────────────────────────────── */
export function getNewsBySlug(slug: string) {
  return NEWS_DATA.find((news) => news.id === slug);
}

/* ── Get News by Category ───────────────────────────────────────────── */
export function getNewsByCategory(categoryKey: string) {
  if (categoryKey === "all") return NEWS_DATA;
  return NEWS_DATA.filter((news) => news.categoryKey === categoryKey);
}
