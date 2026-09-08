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
    title: isEn ? "Privacy Policy | Les Génies d'Afrique" : "Politique de Confidentialité | Les Génies d'Afrique",
    description: isEn
      ? "Privacy policy and personal data protection principles for students and families at Les Génies d'Afrique."
      : "Politique de confidentialité et protection des données personnelles des familles et élèves du Complexe Scolaire Bilingue Les Génies d'Afrique.",
    alternates: getSeoAlternates("/politique-confidentialite", currentLocale),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PolitiqueConfidentialitePage({
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
        title={isEn ? "Privacy Policy" : "Politique de Confidentialité"}
        subtitle={isEn ? "Protection of personal data and pupil privacy" : "Protection des données personnelles et respect de la vie privée"}
        image="/images/IMG-20260723-WA0004.jpg"
        breadcrumbs={[
          { label: isEn ? "Home" : "Accueil", href: "/" },
          { label: isEn ? "Privacy Policy" : "Confidentialité" },
        ]}
      />

      <section className="py-16 px-6 lg:px-10 max-w-4xl mx-auto text-[#1A202C]">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 md:p-12 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#0D1F6B] mb-4">
              {isEn ? "1. Commitment to Privacy" : "1. Notre engagement pour la vie privée"}
            </h2>
            <p className="leading-relaxed text-[#4A5568]">
              {isEn
                ? "The Bilingual School Complex Les Génies d'Afrique places paramount importance on the protection and confidentiality of information provided by pupils, parents, and website visitors."
                : "Le Complexe Scolaire Bilingue Les Génies d'Afrique accorde une importance capitale à la confidentialité et à la sécurité des données transmises par les familles, les élèves et les usagers de notre plateforme."}
            </p>
          </div>

          <div className="border-t border-[#E2E8F0] pt-6">
            <h2 className="text-2xl font-bold text-[#0D1F6B] mb-4">
              {isEn ? "2. Data Collected" : "2. Données collectées"}
            </h2>
            <p className="leading-relaxed text-[#4A5568]">
              {isEn
                ? "Information submitted via online forms (admission enquiries, contact requests, appointment bookings) is strictly used for school administrative and pedagogical purposes."
                : "Les données collectées via nos formulaires de contact, pré-inscriptions et demandes d'informations (noms, prénoms, coordonnées téléphoniques, adresses e-mail, niveau d'études de l'enfant) sont exclusivement destinées au suivi administratif et pédagogique au sein de l'école."}
            </p>
          </div>

          <div className="border-t border-[#E2E8F0] pt-6">
            <h2 className="text-2xl font-bold text-[#0D1F6B] mb-4">
              {isEn ? "3. No Commercial Use or Resale" : "3. Non-divulgation et absence d'usage commercial"}
            </h2>
            <p className="leading-relaxed text-[#4A5568]">
              {isEn
                ? "We do not sell, rent, or transfer any personal data to third-party commercial organizations under any circumstances."
                : "Les données de contact et informations scolaires ne font l'objet d'aucune cession, revente ou échange auprès d'organismes tiers ou commerciaux."}
            </p>
          </div>

          <div className="border-t border-[#E2E8F0] pt-6">
            <h2 className="text-2xl font-bold text-[#0D1F6B] mb-4">
              {isEn ? "4. Access and Modification Rights" : "4. Droits d'accès, rectification et suppression"}
            </h2>
            <p className="leading-relaxed text-[#4A5568]">
              {isEn
                ? "You may access, update, or request the deletion of your personal data at any time by contacting our administrative office at contact@csbgeniesdafrique.com."
                : "Conformément à la réglementation, vous disposez d'un droit d'accès, de rectification et d'effacement de vos données personnelles sur simple demande par email à contact@csbgeniesdafrique.com ou directement au secrétariat de l'école à Nkozoa."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
