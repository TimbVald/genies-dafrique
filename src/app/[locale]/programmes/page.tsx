import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ProgrammesContent from "./ProgrammesContent";

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
    title: t("formations.title"),
    description: t("formations.description"),
    alternates: getSeoAlternates("/programmes", currentLocale),
  };
}

export default async function ProgrammesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProgrammesContent locale={locale} />;
}
