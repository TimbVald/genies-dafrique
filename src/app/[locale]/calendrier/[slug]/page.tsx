import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getEventBySlug } from '@/lib/data/events';
import { format } from 'date-fns';
import { fr, enGB } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, MapPin, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { EVENT_CATEGORIES } from '@/lib/data/events';

interface EventPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  const event = getEventBySlug(params.slug);
  const t = useTranslations('calendar');
  
  if (!event) {
    notFound();
  }

  const category = EVENT_CATEGORIES.find(cat => cat.key === event.categoryKey) || EVENT_CATEGORIES[0];
  const dateLocale = params.locale === 'en' ? enGB : fr;
  
  const formattedDate = format(new Date(event.startDate), 'EEEE d MMMM yyyy', { locale: dateLocale });
  const formattedEndDate = event.endDate ? format(new Date(event.endDate), 'EEEE d MMMM yyyy', { locale: dateLocale }) : null;
  const formattedTime = event.startTime ? event.startTime : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-[#1A3A8F] via-[#0D2A6F] to-[#1A3A8F] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/calendrier"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour au calendrier</span>
          </Link>
          
          {category && (
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              style={{ 
                backgroundColor: category.bgColor, 
                color: category.textColor 
              }}
            >
              <div 
                className="w-2.5 h-2.5 rounded-full shadow-sm" 
                style={{ backgroundColor: category.color }}
              />
              {category.label[params.locale as "fr" | "en" | "ew"] || category.label.fr}
            </div>
          )}
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {event.title[params.locale as "fr" | "en" | "ew"] || event.title.fr}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-blue-200">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <span>{formattedDate}</span>
            </div>
            {formattedEndDate && formattedEndDate !== formattedDate && (
              <span>au {formattedEndDate}</span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            {/* Meta information */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 text-gray-700">
                <div className="p-2 bg-gradient-to-br from-[#1A3A8F] to-[#0D2A6F] rounded-lg">
                  <CalendarIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{formattedDate}</p>
                  {formattedEndDate && formattedEndDate !== formattedDate && (
                    <p className="text-sm text-gray-500">au {formattedEndDate}</p>
                  )}
                </div>
              </div>
              
              {formattedTime && (
                <div className="flex items-start gap-3 text-gray-700">
                  <div className="p-2 bg-gradient-to-br from-[#1A3A8F] to-[#0D2A6F] rounded-lg">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{formattedTime}</p>
                  </div>
                </div>
              )}
              
              {event.location && (
                <div className="flex items-start gap-3 text-gray-700">
                  <div className="p-2 bg-gradient-to-br from-[#1A3A8F] to-[#0D2A6F] rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {event.location[params.locale as "fr" | "en" | "ew"] || event.location.fr}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('about')}</h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                <p>{event.description[params.locale as "fr" | "en" | "ew"] || event.description.fr}</p>
              </div>
            </div>

            {/* Recurring indicator */}
            {event.recurring && (
              <div className="mb-8 flex items-center gap-2 text-sm text-[#1A3A8F] bg-blue-50 px-4 py-3 rounded-xl">
                <CalendarIcon className="w-4 h-4" />
                <span className="font-medium">Événement récurrent annuel</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-6 py-4 bg-gradient-to-r from-[#1A3A8F] to-[#0D2A6F] text-white font-semibold rounded-xl hover:from-[#0D2A6F] hover:to-[#1A3A8F] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                Partager l'événement
              </button>
              <Link 
                href="/calendrier"
                className="px-6 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 text-center"
              >
                Retour au calendrier
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
