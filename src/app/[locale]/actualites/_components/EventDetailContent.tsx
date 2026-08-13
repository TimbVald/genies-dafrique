'use client';

import { format } from 'date-fns';
import { fr, enGB } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, MapPin, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { EVENT_CATEGORIES } from '@/lib/data/events';
import type { Event } from '@/types';

interface EventDetailContentProps {
  event: Event;
  locale: string;
}

export default function EventDetailContent({ event, locale }: EventDetailContentProps) {
  const category = EVENT_CATEGORIES.find(cat => cat.key === event.categoryKey) || EVENT_CATEGORIES[0];
  const dateLocale = locale === 'en' ? enGB : fr;
  const isFr = locale === 'fr';
  
  const formattedDate = format(new Date(event.startDate), 'EEEE d MMMM yyyy', { locale: dateLocale });
  const formattedEndDate = event.endDate ? format(new Date(event.endDate), 'EEEE d MMMM yyyy', { locale: dateLocale }) : null;
  const formattedTime = event.startTime ? event.startTime : null;

  const handleShare = (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = event.title[locale as "fr" | "en" | "ew"] || event.title.fr;
    let shareUrl = "";
    if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === "whatsapp") {
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
    } else if (platform === "x") {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    }
    if (shareUrl && typeof window !== "undefined") {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
        {/* Category badge */}
        {category && (
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ 
              backgroundColor: category.bgColor, 
              color: category.textColor 
            }}
          >
            <div 
              className="w-2.5 h-2.5 rounded-full shadow-sm" 
              style={{ backgroundColor: category.color }}
            />
            {category.label[locale as "fr" | "en" | "ew"] || category.label.fr}
          </div>
        )}

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
                  {event.location[locale as "fr" | "en" | "ew"] || event.location.fr}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isFr ? "À propos de cet événement" : "About this event"}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p>{event.description[locale as "fr" | "en" | "ew"] || event.description.fr}</p>
          </div>
        </div>

        {/* Recurring indicator */}
        {event.recurring && (
          <div className="mb-8 flex items-center gap-2 text-sm text-[#1A3A8F] bg-blue-50 px-4 py-3 rounded-xl">
            <CalendarIcon className="w-4 h-4" />
            <span className="font-medium">
              {isFr ? "Événement récurrent annuel" : "Annual recurring event"}
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => handleShare('facebook')}
            className="flex-1 px-6 py-4 bg-[#1877F2] text-white font-semibold rounded-xl hover:bg-[#166FE5] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            {isFr ? "Partager sur Facebook" : "Share on Facebook"}
          </button>
          <button 
            onClick={() => handleShare('whatsapp')}
            className="flex-1 px-6 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20BD5A] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            {isFr ? "Partager sur WhatsApp" : "Share on WhatsApp"}
          </button>
          <Link 
            href="/actualites"
            className="px-6 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 text-center"
          >
            {isFr ? "Retour aux actualités" : "Back to news"}
          </Link>
        </div>
      </div>

      {/* Back to calendar link */}
      <div className="mt-6 text-center">
        <Link 
          href="/calendrier"
          className="inline-flex items-center gap-2 text-[#1A3A8F] font-semibold hover:underline"
        >
          <CalendarIcon className="w-4 h-4" />
          {isFr ? "Voir le calendrier complet" : "View full calendar"}
        </Link>
      </div>
    </div>
  );
}
