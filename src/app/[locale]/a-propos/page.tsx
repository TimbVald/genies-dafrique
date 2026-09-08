import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import AboutPageContent from "@/components/sections/AboutPageContent";

import { getSeoAlternates, type Locale } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "pageTitles.about" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getSeoAlternates("/a-propos", currentLocale),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPageContent />;
}
