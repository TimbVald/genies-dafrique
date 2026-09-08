import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import VieScolaireContent from "./VieScolaireContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageTitles" });

  return {
    title: t("life.title"),
    description: t("life.description"),
  };
}

export default async function VieScolairePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <VieScolaireContent locale={locale} />;
}
