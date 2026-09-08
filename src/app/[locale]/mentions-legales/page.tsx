import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { getSeoAlternates, type Locale } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const isEn = locale === "en";

  return {
    title: isEn ? "Legal Notice | Les Génies d'Afrique" : "Mentions Légales | Les Génies d'Afrique",
    description: isEn
      ? "Legal notice and official accreditation information for Bilingual School Complex Les Génies d'Afrique in Nkozoa, Yaoundé."
      : "Mentions légales, agrément MINEDUB et informations administratives officielles du Complexe Scolaire Bilingue Les Génies d'Afrique à Nkozoa, Yaoundé.",
    alternates: getSeoAlternates("/mentions-legales", currentLocale),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function MentionsLegalesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";

  return (
    <>
      <PageHero
        title={isEn ? "Legal Notice" : "Mentions Légales"}
        subtitle={isEn ? "Administrative and legal information" : "Informations administratives et juridiques officielles"}
        image="/images/IMG-20260723-WA0004.jpg"
        breadcrumbs={[
          { label: isEn ? "Home" : "Accueil", href: "/" },
          { label: isEn ? "Legal Notice" : "Mentions Légales" },
        ]}
      />

      <section className="py-16 px-6 lg:px-10 max-w-4xl mx-auto text-[#1A202C]">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 md:p-12 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#0D1F6B] mb-4">
              {isEn ? "1. Institutional Information" : "1. Éditeur de l'établissement"}
            </h2>
            <p className="leading-relaxed text-[#4A5568]">
              <strong>{isEn ? "School Name:" : "Dénomination :"}</strong> Complexe Scolaire Bilingue Les Génies d&apos;Afrique<br />
              <strong>{isEn ? "Official Accreditation:" : "Agrément officiel :"}</strong> MINEDUB N° 103/2025 (Ministère de l&apos;Éducation de Base, Cameroun)<br />
              <strong>{isEn ? "Location:" : "Siège & Localisation :"}</strong> Nkozoa, Face Tradex Nkozoa, Sortie Nord de Yaoundé, Cameroun<br />
              <strong>{isEn ? "Phone:" : "Téléphones :"}</strong> (+237) 651 11 15 06 / 656 66 38 48<br />
              <strong>{isEn ? "Email:" : "Courriel :"}</strong> contact@csbgeniesdafrique.com<br />
              <strong>{isEn ? "Head of Institution:" : "Direction de l'établissement :"}</strong> Mme Mbarga
            </p>
          </div>

          <div className="border-t border-[#E2E8F0] pt-6">
            <h2 className="text-2xl font-bold text-[#0D1F6B] mb-4">
              {isEn ? "2. Official Website Hosting" : "2. Hébergement du site"}
            </h2>
            <p className="leading-relaxed text-[#4A5568]">
              {isEn
                ? "The website https://www.csbgeniesdafrique.com is hosted on secure cloud infrastructure provided by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723."
                : "Le site officiel https://www.csbgeniesdafrique.com est hébergé sur les infrastructures sécurisées de Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723."}
            </p>
          </div>

          <div className="border-t border-[#E2E8F0] pt-6">
            <h2 className="text-2xl font-bold text-[#0D1F6B] mb-4">
              {isEn ? "3. Intellectual Property" : "3. Propriété intellectuelle"}
            </h2>
            <p className="leading-relaxed text-[#4A5568]">
              {isEn
                ? "All contents (texts, logos, images, curriculum documents, educational materials) presented on this site are the exclusive property of Complexe Scolaire Bilingue Les Génies d'Afrique, unless otherwise specified. Any reproduction or representation without prior authorization is strictly prohibited."
                : "L'ensemble des contenus (textes, photographies des activités scolaires, logos, documents pédagogiques) présents sur ce site relève de la propriété exclusive du Complexe Scolaire Bilingue Les Génies d'Afrique. Toute reproduction ou utilisation non autorisée est interdite."}
            </p>
          </div>

          <div className="border-t border-[#E2E8F0] pt-6">
            <h2 className="text-2xl font-bold text-[#0D1F6B] mb-4">
              {isEn ? "4. Child Protection & Image Rights" : "4. Droit à l'image et protection des mineurs"}
            </h2>
            <p className="leading-relaxed text-[#4A5568]">
              {isEn
                ? "The publication of photographs and videos of students adheres to the parental authorization framework gathered during school registration. Parents may exercise their right of withdrawal or modification at any time by contacting the school administration."
                : "La publication d'images et photographies illustrant les activités scolaires fait l'objet d'une autorisation parentale préalable recueillie lors de l'inscription. Tout parent ou représentant légal peut demander le retrait ou la modification d'un cliché sur simple demande adressée au secrétariat."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
