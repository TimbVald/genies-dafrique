import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { getEventBySlug } from '@/lib/data/events';
import EventContent from './EventContent';

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
  const event = getEventBySlug(slug);
  
  if (!event) {
    return {
      title: 'Événement non trouvé',
    };
  }

  const t = await getTranslations({ locale, namespace: 'calendar' });
  const eventTitle = event.title[locale as "fr" | "en" | "ew"] || event.title.fr;
  const eventDescription = event.description[locale as "fr" | "en" | "ew"] || event.description.fr;

  return {
    title: `${eventTitle} - ${t('title')}`,
    description: eventDescription.substring(0, 160),
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  const event = getEventBySlug(slug);
  
  if (!event) {
    notFound();
  }

  return <EventContent locale={locale} slug={slug} event={event} />;
}
