import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import HeroSection          from "@/components/sections/HeroSection";
import TrustBar             from "@/components/sections/TrustBar";
import DirectorWelcomeSection from "@/components/sections/DirectorWelcomeSection";
import AboutSection         from "@/components/sections/AboutSection";
import ProgramsSection      from "@/components/sections/ProgramsSection";
import ExcellenceSection    from "@/components/sections/ExcellenceSection";
import StatsSection         from "@/components/sections/StatsSection";
import GallerySection       from "@/components/sections/GallerySection";
import TestimonialsSection  from "@/components/sections/TestimonialsSection";
import AdmissionsCtaSection from "@/components/sections/AdmissionsCtaSection";

import { getSeoAlternates, getLocalizedUrl, type Locale } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("siteName"),
    description: t("description"),
    alternates: getSeoAlternates("/", currentLocale),
    openGraph: {
      title: t("siteName"),
      description: t("description"),
      url: getLocalizedUrl("/", currentLocale),
      siteName: t("siteName"),
      locale: locale === "fr" ? "fr_FR" : locale === "en" ? "en_US" : "ew_CM",
      type: "website",
      images: [
        {
          url: "/images/IMG-20260723-WA0006.jpg",
          width: 1200,
          height: 630,
          alt: t("siteName"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteName"),
      description: t("description"),
      images: ["/images/IMG-20260723-WA0006.jpg"],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <TrustBar />
      <DirectorWelcomeSection />
      <AboutSection />
      <ProgramsSection />
      <ExcellenceSection />
      <StatsSection />
      <GallerySection />
      <TestimonialsSection />
      <AdmissionsCtaSection />
    </>
  );
}
