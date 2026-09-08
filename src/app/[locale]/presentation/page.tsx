import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import PresentationContent from "./PresentationContent";
import { getSeoAlternates, type Locale } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "pageTitles" });

  return {
    title: t("about.title"),
    description: t("about.description"),
    alternates: getSeoAlternates("/presentation", currentLocale),
  };
}

export default async function PresentationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PresentationContent locale={locale} />;
}
