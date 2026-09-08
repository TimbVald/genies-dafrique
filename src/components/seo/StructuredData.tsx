/**
 * StructuredData — Données structurées Schema.org pour le SEO local
 *
 * Ce composant génère le JSON-LD pour le type School de Schema.org
 * afin d'aider Google à comprendre l'identité locale de l'établissement.
 *
 * Documentation: https://schema.org/School
 */

import { getSiteInfo } from "@/lib/data/global";

interface StructuredDataProps {
  locale: "fr" | "en" | "ew";
}

export default function StructuredData({ locale }: StructuredDataProps) {
  const siteInfo = getSiteInfo();

  const baseUrl = "https://www.csbgeniesdafrique.com";
  const localeUrl = locale === "fr" ? baseUrl : `${baseUrl}/${locale}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "School",
    "@id": `${localeUrl}#school`,
    name: siteInfo.name[locale],
    alternateName: siteInfo.nameShort,
    url: localeUrl,
    description: siteInfo.description[locale],
    logo: `${baseUrl}${siteInfo.logo}`,
    image: [
      `${baseUrl}/images/IMG-20260723-WA0006.jpg`,
      `${baseUrl}/images/IMG-20260723-WA0046.jpg`,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nkozoa, derrière la Boulangerie Massa",
      addressLocality: "Yaoundé",
      addressRegion: "Centre",
      addressCountry: "CM",
      postalCode: "",
    },
    geo: siteInfo.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: siteInfo.coordinates.latitude,
          longitude: siteInfo.coordinates.longitude,
        }
      : undefined,
    telephone: siteInfo.phone.map((p) => `+237${p.replace(/\s/g, "")}`),
    email: siteInfo.email,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "16:00",
      },
    ],
    sameAs: siteInfo.socialNetworks
      .filter((s) => s.visible)
      .map((s) => s.url),
    foundingDate: siteInfo.foundedYear.toString(),
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: siteInfo.coordinates
        ? {
            "@type": "GeoCoordinates",
            latitude: siteInfo.coordinates.latitude,
            longitude: siteInfo.coordinates.longitude,
          }
        : undefined,
      geoRadius: "10000", // 10km radius
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "fr" ? "Programmes scolaires" : locale === "en" ? "School Programs" : "Mekol ya sukul",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: locale === "fr" ? "Crèche" : locale === "en" ? "Day Care" : "Crèche",
            description: locale === "fr" ? "Programme pour les enfants de 0 à 3 ans" : locale === "en" ? "Program for children aged 0 to 3" : "Programme kobi na 0 tii 3 ans",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: locale === "fr" ? "Maternelle" : locale === "en" ? "Nursery" : "Maternelle",
            description: locale === "fr" ? "Programme pour les enfants de 3 à 6 ans" : locale === "en" ? "Program for children aged 3 to 6" : "Programme kobi na 3 tii 6 ans",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: locale === "fr" ? "Primaire" : locale === "en" ? "Primary" : "Primaire",
            description: locale === "fr" ? "Programme pour les enfants de 6 à 11 ans" : locale === "en" ? "Program for children aged 6 to 11" : "Programme kobi na 6 tii 11 ans",
          },
        },
      ],
    },
  };

  // Remove undefined values
  const cleanSchema = JSON.parse(JSON.stringify(schema, (key, value) => (value === undefined ? null : value)));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  );
}
