'use client';

import { useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, Newspaper } from 'lucide-react';
import { format } from 'date-fns';
import { fr, enGB } from 'date-fns/locale';
import { NEWS_DATA } from '@/data/newsData';
import { EVENT_CATEGORIES } from './SchoolCalendar';
import { useTranslations, useLocale } from 'next-intl';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  onNavigateToDetails: (eventId: string) => void;
}

export default function EventModal({ isOpen, onClose, eventId, onNavigateToDetails }: EventModalProps) {
  const t = useTranslations('calendar');
  const locale = useLocale();
  const newsItem = NEWS_DATA.find(item => item.id === eventId);
  const category = EVENT_CATEGORIES.find(cat => cat.key === newsItem?.eventType);
  
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

  if (!isOpen || !newsItem) return null;

  const formattedDate = newsItem.eventDate 
    ? format(new Date(newsItem.eventDate), 'EEEE d MMMM yyyy', { locale: dateLocale })
    : newsItem.date;

  const formattedTime = newsItem.eventDate 
    ? format(new Date(newsItem.eventDate), 'HH:mm', { locale: dateLocale })
    : null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in duration-200">
        {/* Header with image */}
        {newsItem.image && (
          <div className="relative h-48 md:h-64 overflow-hidden rounded-t-2xl">
            <img 
              src={newsItem.image} 
              alt={newsItem.titleFr}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
              aria-label={t('close')}
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            {category && (
              <div 
                className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: category.bgColor, 
                  color: category.textColor 
                }}
              >
                {category.label}
              </div>
            )}
          </div>
        )}

        {!newsItem.image && (
          <div className="relative p-6 border-b">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label={t('close')}
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            {category && (
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4"
                style={{ 
                  backgroundColor: category.bgColor, 
                  color: category.textColor 
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                {category.label}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Type badge */}
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="w-4 h-4 text-[#1A3A8F]" />
            <span className="text-sm font-medium text-gray-600">{t('newsType')}</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {locale === 'en' ? newsItem.titleEn : newsItem.titleFr}
          </h2>

          {/* Meta information */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-gray-600">
              <CalendarIcon className="w-5 h-5 text-[#1A3A8F]" />
              <span className="font-medium">{formattedDate}</span>
            </div>
            
            {formattedTime && (
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-5 h-5 text-[#1A3A8F]" />
                <span className="font-medium">{formattedTime}</span>
              </div>
            )}
            
            {newsItem.author && (
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-5 h-5 rounded-full bg-[#1A3A8F] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{newsItem.author.charAt(0)}</span>
                </div>
                <span className="text-sm">{newsItem.author}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('about')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {newsItem.excerpt}
            </p>
          </div>

          {/* Gallery count indicator */}
          {newsItem.galleryCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <div className="flex -space-x-2">
                {[...Array(Math.min(3, newsItem.galleryCount))].map((_, i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center"
                  >
                    <span className="text-xs text-gray-500">📷</span>
                  </div>
                ))}
              </div>
              <span>{newsItem.galleryCount} {t('photosAvailable')}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigateToDetails(newsItem.id)}
              className="flex-1 px-6 py-3 bg-[#1A3A8F] text-white font-medium rounded-lg hover:bg-[#0D2A6F] transition-colors flex items-center justify-center gap-2"
            >
              {t('viewDetails')}
              <CalendarIcon className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
