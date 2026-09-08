import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import GalerieContent from "./GalerieContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageTitles" });

  return {
    title: t("gallery.title"),
    description: t("gallery.description"),
  };
}

export default async function GaleriePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GalerieContent locale={locale} />;
}
