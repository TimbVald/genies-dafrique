import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import FormationsContent from "@/components/sections/FormationsContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageTitles.formations" });
  return { title: t("title"), description: t("description") };
}

export default async function FormationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FormationsContent />;
}
