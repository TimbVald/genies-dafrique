import type { Metadata } from "next";

export const SITE_URL = "https://www.csbgeniesdafrique.com";

export type Locale = "fr" | "en" | "ew";

/**
 * Construit l'URL complète pour un chemin donné et une langue donnée.
 * En mode `localePrefix: "as-needed"`, la langue par défaut ('fr') n'a pas de préfixe.
 */
export function getLocalizedUrl(path: string, locale: Locale): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const cleanPath = normalizedPath === "/" ? "" : normalizedPath;

  if (locale === "fr") {
    return cleanPath ? `${SITE_URL}${cleanPath}` : SITE_URL;
  }
  return `${SITE_URL}/${locale}${cleanPath}`;
}

/**
 * Génère l'objet `alternates` complet pour Next.js Metadata :
 * - canonical : URL canonique pour la langue courante
 * - languages : hreflang pour fr, en, ew + x-default (pointant vers fr)
 * Note : "ew" (Ewondo) n'est pas un code BCP 47 standard ; on utilise un cast
 * pour permettre son utilisation tout en conservant la cohérence SEO du site.
 */
export function getSeoAlternates(path: string, currentLocale: Locale): NonNullable<Metadata["alternates"]> {
  const canonical = getLocalizedUrl(path, currentLocale);

  return {
    canonical,
    languages: {
      "fr": getLocalizedUrl(path, "fr"),
      "en": getLocalizedUrl(path, "en"),
      "ew": getLocalizedUrl(path, "ew"),
      "x-default": getLocalizedUrl(path, "fr"),
    } as Record<string, string>,
  };
}
