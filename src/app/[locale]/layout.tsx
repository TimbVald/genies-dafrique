import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingHub from "@/components/ui/FloatingHub";
import StructuredData from "@/components/seo/StructuredData";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, getSeoAlternates, type Locale } from "@/lib/seo";
import { PwaProvider } from "@/components/pwa/PwaProvider";

/* ── Polices ────────────────────────────────────────────────── */
/*
 * Satoshi Bold est chargée localement via @font-face dans globals.css
 * (public/fonts/Satoshi-Bold.woff2) — pas besoin de next/font ici.
 *
 * Montserrat reste pour les corps de texte, navigation, boutons, labels.
 */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

/* ── Params statiques ───────────────────────────────────────── */
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* ── Viewport (séparé de metadata — Next.js 15+) ───────────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,        // Permet le zoom d'accessibilité
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1A3A8F" },
    { media: "(prefers-color-scheme: dark)",  color: "#0D1F6B" },
  ],
};

/* ── Metadata dynamique ────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });

  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: t("siteNameShort"),
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: t("siteNameShort"),
    },
    formatDetection: {
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: ["/icons/favicon-32x32.png"],
    },
    title: {
      default: t("siteName"),
      template: `%s | ${t("siteNameShort")}`,
    },
    description: t("description"),
    keywords: [
      "école bilingue Yaoundé",
      "complexe scolaire Nkozoa",
      "école maternelle Cameroun",
      "école primaire bilingue",
      "MINEDUB",
      "bilingual school Yaoundé",
    ],
    authors: [{ name: "Les Génies d'Afrique" }],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      siteName: t("siteName"),
      locale: locale === "fr" ? "fr_FR" : locale === "en" ? "en_US" : "ew_CM",
      alternateLocale: locale === "fr" ? "en_US" : locale === "en" ? "fr_FR" : "fr_FR",
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
    },
    alternates: getSeoAlternates("/", currentLocale),
    verification: googleVerification
      ? {
          google: googleVerification,
        }
      : undefined,
  };
}

/* ── Layout ─────────────────────────────────────────────────── */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "en" | "ew")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={montserrat.variable}
      suppressHydrationWarning
    >
      <head>
        <StructuredData locale={locale as "fr" | "en" | "ew"} />
      </head>
      <body className="antialiased bg-white text-[#1A202C] overflow-x-hidden">
        {/* ── Skip link accessibilité ── */}
        <a href="#main-content" className="skip-link">
          {locale === "fr" ? "Aller au contenu principal" : "Skip to main content"}
        </a>

        <NextIntlClientProvider messages={messages}>
          <PwaProvider>
            <Header />

            <main id="main-content" tabIndex={-1} className="outline-none">
              {children}
            </main>

            <Analytics />

            <Footer />
            <FloatingHub />
          </PwaProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
