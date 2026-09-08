import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getNews } from "@/lib/data/news";
import { getEvents } from "@/lib/data/events";
import { SITE_URL, getLocalizedUrl } from "@/lib/seo";

// Pages statiques publiques importantes
const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/a-propos", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/a-propos/equipe", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/formations", priority: 0.95, changeFrequency: "monthly" as const },
  { path: "/programmes", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/admissions", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/actualites", priority: 0.85, changeFrequency: "daily" as const },
  { path: "/calendrier", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/vie-scolaire", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/galerie", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/presentation", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/politique-confidentialite", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // 1. Pages statiques
  for (const route of staticRoutes) {
    for (const locale of routing.locales) {
      urls.push({
        url: getLocalizedUrl(route.path, locale),
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            "fr": getLocalizedUrl(route.path, "fr"),
            "en": getLocalizedUrl(route.path, "en"),
            "ew": getLocalizedUrl(route.path, "ew"),
          } as Record<string, string>,
        },
      });
    }
  }

  // 2. Articles d'actualités dynamiques
  const newsList = getNews();
  for (const article of newsList) {
    const articlePath = `/actualites/${article.slug}`;
    const lastMod = article.publishedAt ? new Date(article.publishedAt) : new Date();

    for (const locale of routing.locales) {
      urls.push({
        url: getLocalizedUrl(articlePath, locale),
        lastModified: lastMod,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            "fr": getLocalizedUrl(articlePath, "fr"),
            "en": getLocalizedUrl(articlePath, "en"),
            "ew": getLocalizedUrl(articlePath, "ew"),
          } as Record<string, string>,
        },
      });
    }
  }

  // 3. Événements dynamiques du calendrier
  const eventsList = getEvents();
  for (const event of eventsList) {
    const eventPath = `/calendrier/${event.slug}`;
    const lastMod = event.createdAt ? new Date(event.createdAt) : new Date();

    for (const locale of routing.locales) {
      urls.push({
        url: getLocalizedUrl(eventPath, locale),
        lastModified: lastMod,
        changeFrequency: "monthly",
        priority: 0.65,
        alternates: {
          languages: {
            "fr": getLocalizedUrl(eventPath, "fr"),
            "en": getLocalizedUrl(eventPath, "en"),
            "ew": getLocalizedUrl(eventPath, "ew"),
          } as Record<string, string>,
        },
      });
    }
  }

  return urls;
}

