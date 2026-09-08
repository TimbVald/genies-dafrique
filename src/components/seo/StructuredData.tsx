/**
 * StructuredData — Données structurées Schema.org racine (School + WebSite)
 *
 * Ce composant génère le graphe JSON-LD combinant l'entité scolaire principale
 * (School / EducationalOrganization) et le site officiel (WebSite) avec identifiants stables @id.
 *
 * Documentation: https://schema.org/School & https://schema.org/WebSite
 */

import { getRootGraphJsonLd, cleanJsonLd, type ValidLocale } from "@/lib/schema";

interface StructuredDataProps {
  locale: ValidLocale;
}

export default function StructuredData({ locale }: StructuredDataProps) {
  const rootGraph = getRootGraphJsonLd(locale);
  const cleanSchema = cleanJsonLd(rootGraph);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  );
}
