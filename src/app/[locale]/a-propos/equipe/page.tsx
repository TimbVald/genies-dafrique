import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import EquipeContent from "@/components/sections/EquipeContent";

import { getSeoAlternates, type Locale } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "equipePage" });
  return {
    title:       t("meta.title"),
    description: t("meta.description"),
    alternates: getSeoAlternates("/a-propos/equipe", currentLocale),
  };
}

export default async function EquipePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EquipeContent />;
}
