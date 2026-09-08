import { SITE_INFO } from "@/data/global";
import { SITE_URL, getLocalizedUrl } from "./seo";
import type { NewsArticle, Event } from "@/types";

export const SCHOOL_ID = `${SITE_URL}/#school`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export type ValidLocale = "fr" | "en" | "ew";

/**
 * Nettoie un objet JSON-LD pour enlever les clés undefined ou null
 */
export function cleanJsonLd<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) => {
      if (value === undefined || value === null || value === "") return undefined;
      return value;
    })
  );
}

/**
 * Schéma principal School / EducationalOrganization
 */
export function getSchoolJsonLd(locale: ValidLocale = "fr") {
  const isEn = locale === "en";
  const localizedUrl = getLocalizedUrl("/", locale);

  return {
    "@context": "https://schema.org",
    "@type": ["School", "EducationalOrganization"],
    "@id": SCHOOL_ID,
    name: SITE_INFO.name[locale] || SITE_INFO.name.fr,
    legalName: "Complexe Scolaire Bilingue Les Génies d'Afrique",
    alternateName: ["CSB Génies d'Afrique", "Les Génies d'Afrique"],
    url: localizedUrl,
    description: SITE_INFO.description[locale] || SITE_INFO.description.fr,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo/logo.png`,
      caption: "Logo Complexe Scolaire Bilingue Les Génies d'Afrique",
    },
    image: [
      `${SITE_URL}/images/IMG-20260723-WA0006.jpg`,
      `${SITE_URL}/images/IMG-20260723-WA0046.jpg`,
      `${SITE_URL}/images/IMG-20260723-WA0004.jpg`,
    ],
    telephone: SITE_INFO.phone.map((p) => `+237${p.replace(/\s/g, "")}`),
    email: SITE_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nkozoa, derrière la Boulangerie Massa",
      addressLocality: "Yaoundé",
      addressRegion: "Centre",
      addressCountry: "CM",
    },
    geo: SITE_INFO.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: SITE_INFO.coordinates.latitude,
          longitude: SITE_INFO.coordinates.longitude,
        }
      : undefined,
    hasMap: SITE_INFO.googleMapsDirectionsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "16:00",
      },
    ],
    sameAs: SITE_INFO.socialNetworks
      .filter((s) => s.visible)
      .map((s) => s.url),
    foundingDate: SITE_INFO.foundedYear.toString(),
    knowsLanguage: ["fr", "en"],
    areaServed: {
      "@type": "AdministrativeArea",
      name: isEn
        ? "Yaoundé, Nkozoa, Soa and Centre Region"
        : "Yaoundé, Nkozoa, Soa et région du Centre",
    },
  };
}

/**
 * Schéma WebSite
 */
export function getWebSiteJsonLd(locale: ValidLocale = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Complexe Scolaire Bilingue Les Génies d'Afrique",
    alternateName: "CSB Génies d'Afrique",
    url: SITE_URL,
    inLanguage: ["fr", "en", "ew"],
    publisher: {
      "@id": SCHOOL_ID,
    },
  };
}

/**
 * Graphe global combiné pour le Layout (School + WebSite)
 */
export function getRootGraphJsonLd(locale: ValidLocale = "fr") {
  return {
    "@context": "https://schema.org",
    "@graph": [getSchoolJsonLd(locale), getWebSiteJsonLd(locale)],
  };
}

/**
 * Schéma BreadcrumbList généré à partir des miettes de pain visibles
 */
export function getBreadcrumbJsonLd(
  breadcrumbs: Array<{ label: string; href?: string }>,
  currentUrl?: string
) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  const itemListElement = breadcrumbs.map((crumb, index) => {
    let itemUrl: string | undefined = undefined;
    if (crumb.href) {
      itemUrl = crumb.href.startsWith("http")
        ? crumb.href
        : `${SITE_URL}${crumb.href.startsWith("/") ? "" : "/"}${crumb.href}`;
    } else if (currentUrl && index === breadcrumbs.length - 1) {
      itemUrl = currentUrl;
    }

    return {
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: itemUrl,
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

/**
 * Schéma NewsArticle pour les articles de blog / actualités
 */
export function getNewsArticleJsonLd(
  article: NewsArticle,
  locale: ValidLocale,
  articleUrl: string
) {
  const title = article.title[locale] || article.title.fr;
  const description = article.excerpt[locale] || article.excerpt.fr;
  const image = article.image
    ? article.image.startsWith("http")
      ? article.image
      : `${SITE_URL}${article.image.startsWith("/") ? "" : "/"}${article.image}`
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${articleUrl}#article`,
    headline: title,
    description: description,
    image: image ? [image] : undefined,
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.publishedAt || article.createdAt,
    inLanguage: locale,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Organization",
      name: article.author || "Rédaction Les Génies d'Afrique",
      url: SITE_URL,
    },
    publisher: {
      "@id": SCHOOL_ID,
    },
  };
}

/**
 * Schéma EducationEvent pour les événements du calendrier scolaire
 */
export function getEventJsonLd(
  event: Event,
  locale: ValidLocale,
  eventUrl: string
) {
  const name = event.title[locale] || event.title.fr;
  const description = event.description[locale] || event.description.fr;
  const image = event.image
    ? event.image.startsWith("http")
      ? event.image
      : `${SITE_URL}${event.image.startsWith("/") ? "" : "/"}${event.image}`
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    "@id": `${eventUrl}#event`,
    name: name,
    description: description,
    image: image ? [image] : undefined,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Complexe Scolaire Bilingue Les Génies d'Afrique",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Nkozoa, derrière la Boulangerie Massa",
        addressLocality: "Yaoundé",
        addressRegion: "Centre",
        addressCountry: "CM",
      },
      geo: SITE_INFO.coordinates
        ? {
            "@type": "GeoCoordinates",
            latitude: SITE_INFO.coordinates.latitude,
            longitude: SITE_INFO.coordinates.longitude,
          }
        : undefined,
    },
    organizer: {
      "@id": SCHOOL_ID,
    },
    inLanguage: locale,
  };
}
