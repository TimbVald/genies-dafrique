import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ContactContent from "./ContactContent";
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
    title: t("contact.title"),
    description: t("contact.description"),
    alternates: getSeoAlternates("/contact", currentLocale),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent locale={locale} />;
}
