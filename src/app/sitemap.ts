import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const baseUrl = "https://www.csbgeniesdafrique.com";

// Static pages that should be indexed
const staticPages = [
  "",
  "/a-propos",
  "/a-propos/equipe",
  "/formations",
  "/programmes",
  "/admissions",
  "/actualites",
  "/calendrier",
  "/vie-scolaire",
  "/galerie",
  "/contact",
  "/presentation",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // Generate URLs for each locale
  for (const locale of routing.locales) {
    for (const page of staticPages) {
      const path = locale === "fr" ? page : `/${locale}${page}`;
      urls.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "" ? 1 : page === "/a-propos" || page === "/formations" || page === "/admissions" ? 0.9 : 0.8,
      });
    }
  }

  return urls;
}
