import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import CalendrierContent from "./CalendrierContent";
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
    title: t("calendar.title"),
    description: t("calendar.description"),
    alternates: getSeoAlternates("/calendrier", currentLocale),
  };
}

export default async function CalendrierPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CalendrierContent locale={locale} />;
}
