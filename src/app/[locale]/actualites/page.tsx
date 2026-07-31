import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ActualitesContent from "./_components/ActualitesContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageTitles.news" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ActualitesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "newsPage" });

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image={t("hero.image")}
        breadcrumbs={[
          { label: locale === "fr" ? "Accueil" : "Home", href: "/" },
          { label: locale === "fr" ? "Actualités" : "News" },
        ]}
      />
      <ActualitesContent locale={locale} />
    </>
  );
}
