import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { getEventBySlug } from '@/lib/data/events';
import EventContent from './EventContent';
import { getSeoAlternates, getLocalizedUrl, type Locale } from '@/lib/seo';
import { getEventJsonLd, getBreadcrumbJsonLd, cleanJsonLd, type ValidLocale } from '@/lib/schema';

interface EventPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const currentLocale = locale as Locale;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: 'Événement non trouvé',
      robots: { index: false },
    };
  }

  const t = await getTranslations({ locale, namespace: 'calendar' });
  const eventTitle = event.title[locale as "fr" | "en" | "ew"] || event.title.fr;
  const eventDescription = event.description[locale as "fr" | "en" | "ew"] || event.description.fr;

  return {
    title: `${eventTitle} - ${t('title')}`,
    description: eventDescription.substring(0, 160),
    alternates: getSeoAlternates(`/calendrier/${slug}`, currentLocale),
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  const event = getEventBySlug(slug);
  
  if (!event) {
    notFound();
  }

  const validLocale = (locale || "fr") as ValidLocale;
  const pageUrl = getLocalizedUrl(`/calendrier/${slug}`, validLocale);
  const eventTitle = event.title[validLocale] || event.title.fr;

  const eventJsonLd = cleanJsonLd(getEventJsonLd(event, validLocale, pageUrl));
  const breadcrumbJsonLd = cleanJsonLd(
    getBreadcrumbJsonLd([
      { label: locale === "en" ? "Home" : "Accueil", href: "/" },
      { label: locale === "en" ? "Calendar" : "Calendrier", href: "/calendrier" },
      { label: eventTitle },
    ], pageUrl)
  );

  return (
    <>
      {eventJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      )}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      <EventContent locale={locale} slug={slug} event={event} />
    </>
  );
}
