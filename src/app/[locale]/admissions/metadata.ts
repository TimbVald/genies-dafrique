import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
    title: t("admissions.title"),
    description: t("admissions.description"),
    alternates: getSeoAlternates("/admissions", currentLocale),
  };
}
