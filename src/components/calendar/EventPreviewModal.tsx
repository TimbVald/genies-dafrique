'use client';

import { useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, MapPin, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr, enGB } from 'date-fns/locale';
import { EVENT_CATEGORIES } from '@/lib/data/events';
import { useTranslations, useLocale } from 'next-intl';
import type { Event } from '@/types';

interface EventPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  onNavigateToDetails: (eventSlug: string) => void;
}

export default function EventPreviewModal({ isOpen, onClose, event, onNavigateToDetails }: EventPreviewModalProps) {
  const t = useTranslations('calendar');
  const locale = useLocale();
  const category = EVENT_CATEGORIES.find(cat => cat.key === event.categoryKey) || EVENT_CATEGORIES[0];
  
  const dateLocale = locale === 'en' ? enGB : fr;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const formattedDate = format(new Date(event.startDate), 'EEEE d MMMM yyyy', { locale: dateLocale });
  const formattedEndDate = event.endDate ? format(new Date(event.endDate), 'EEEE d MMMM yyyy', { locale: dateLocale }) : null;
  const formattedTime = event.startTime ? event.startTime : null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300">
        {/* Header */}
        <div className="relative p-6 md:p-8 border-b border-gray-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 hover:scale-110"
            aria-label={t('close')}
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
          
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
              {category.label[locale as "fr" | "en" | "ew"] || category.label.fr}
            </div>
          )}

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 pr-8">
            {event.title[locale as "fr" | "en" | "ew"] || event.title.fr}
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Meta information */}
          <div className="space-y-4 mb-6">
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
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('about')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {event.description[locale as "fr" | "en" | "ew"] || event.description.fr}
            </p>
          </div>

          {/* Recurring indicator */}
          {event.recurring && (
            <div className="mb-6 flex items-center gap-2 text-sm text-[#1A3A8F] bg-blue-50 px-4 py-2 rounded-lg">
              <CalendarIcon className="w-4 h-4" />
              <span className="font-medium">Événement récurrent annuel</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigateToDetails(event.slug)}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-[#1A3A8F] to-[#0D2A6F] text-white font-semibold rounded-xl hover:from-[#0D2A6F] hover:to-[#1A3A8F] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {t('viewDetails')}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="px-6 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200"
            >
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
