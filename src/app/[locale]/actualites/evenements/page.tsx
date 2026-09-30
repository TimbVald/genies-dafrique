import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import EvenementsContent from "./_components/EvenementsContent";
import { getSeoAlternates, type Locale } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "pageTitles.events" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: getSeoAlternates("/actualites/evenements", currentLocale),
  };
}

export default async function EvenementsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "eventsPage" });

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image={t("hero.image")}
        breadcrumbs={[
          { label: locale === "fr" ? "Accueil" : "Home", href: "/" },
          { label: locale === "fr" ? "Actualités" : "News", href: "/actualites" },
          { label: locale === "fr" ? "Événements" : "Events" },
        ]}
      />
      <EvenementsContent locale={locale} />
    </>
  );
}
