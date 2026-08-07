'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, Views, View, EventProps, ToolbarProps } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr, enGB } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { getEvents, EVENT_CATEGORIES } from '@/lib/data/events';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import EventModal from './EventModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Import useEffect for the CustomToolbar component

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  category: string;
  newsId?: string;
}

const locales = {
  'fr': fr,
  'en': enGB,
};

// Use imported EVENT_CATEGORIES from data service
const EVENT_COLORS: Record<string, string> = EVENT_CATEGORIES.reduce((acc, cat) => {
  acc[cat.key] = cat.color;
  return acc;
}, {} as Record<string, string>);

function CustomEvent({ event }: any) {
  const category = EVENT_CATEGORIES.find(cat => cat.key === event.category) || EVENT_CATEGORIES[0];
  
  return (
    <div className="rbc-event-content">
      <span className="rbc-event-title">{event.title}</span>
    </div>
  );
}

function CustomToolbar({ label, onNavigate, onView, view }: any) {
  const t = useTranslations('calendar');
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const views = [Views.MONTH, Views.WEEK, Views.AGENDA, Views.DAY];
  const mobileViews = [Views.MONTH, Views.AGENDA];
  const displayViews = isMobile ? mobileViews : views;
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate('PREV')}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={t('previous')}
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={() => onNavigate('TODAY')}
          className="px-4 py-2 rounded-lg bg-[#1A3A8F] text-white font-medium hover:bg-[#0D2A6F] transition-colors"
        >
          {t('today')}
        </button>
        <button
          onClick={() => onNavigate('NEXT')}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={t('next')}
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-xl font-bold text-gray-900 ml-2">{label}</h2>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {displayViews.map((v) => (
          <button
            key={v}
            onClick={() => onView(v)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              view === v
                ? 'bg-[#1A3A8F] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {v === Views.MONTH ? t('month') : v === Views.WEEK ? t('week') : v === Views.AGENDA ? t('agenda') : t('day')}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SchoolCalendar() {
  const router = useRouter();
  const t = useTranslations('calendar');
  const locale = useLocale();
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set default view to AGENDA on mobile
  useEffect(() => {
    if (isMobile && view === Views.WEEK) {
      setView(Views.AGENDA);
    }
  }, [isMobile, view]);

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const availableViews = isMobile ? [Views.MONTH, Views.AGENDA] : [Views.MONTH, Views.WEEK, Views.AGENDA, Views.DAY];

  // Convertir les événements en format calendrier
  const events = useMemo(() => {
    return getEvents()
      .filter(event => selectedCategory === 'all' || event.categoryKey === selectedCategory)
      .map((event) => {
        const startDate = new Date(event.startDate);
        const category = EVENT_CATEGORIES.find(cat => cat.key === event.categoryKey) || EVENT_CATEGORIES[0];
        
        // Créer les dates de début et fin
        const startDateTime = new Date(startDate);
        if (event.startTime) {
          const [hours, minutes] = event.startTime.split(':').map(Number);
          startDateTime.setHours(hours, minutes, 0, 0);
        } else {
          startDateTime.setHours(0, 0, 0, 0);
        }
        
        const endDateTime = event.endDate ? new Date(event.endDate) : new Date(startDate);
        if (event.endTime) {
          const [hours, minutes] = event.endTime.split(':').map(Number);
          endDateTime.setHours(hours, minutes, 0, 0);
        } else {
          endDateTime.setHours(23, 59, 59, 999);
        }
        
        return {
          id: event.id,
          title: event.title[locale as keyof typeof event.title] || event.title.fr,
          start: startDateTime,
          end: endDateTime,
          color: category.color,
          category: event.categoryKey,
          newsId: event.newsId,
        } as CalendarEvent;
      });
  }, [selectedCategory, locale]);

  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    if (event.newsId) {
      setSelectedEventId(event.newsId);
      setIsModalOpen(true);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEventId(null);
  }, []);

  const handleNavigateToDetails = useCallback((eventId: string) => {
    handleCloseModal();
    router.push(`/actualites/${eventId}`);
  }, [router, handleCloseModal]);

  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    const category = EVENT_CATEGORIES.find(cat => cat.key === event.category) || EVENT_CATEGORIES[0];
    return {
      className: 'custom-calendar-event',
      style: {
        backgroundColor: category.bgColor,
        color: category.textColor,
        borderLeft: `3px solid ${category.color}`,
        borderRadius: '6px',
        border: 'none',
      },
    } as any;
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h2>
          <p className="text-gray-600 flex items-center gap-2 text-base">
            <CalendarIcon className="w-5 h-5 text-[#1A3A8F]" />
            {t('description')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
            {t('filterByCategory')}
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A3A8F] focus:border-transparent focus:outline-none"
            aria-label={t('filterByCategory')}
          >
            <option value="all">{t('eventCategories.all')}</option>
            {EVENT_CATEGORIES.map((category) => (
              <option key={category.key} value={category.key}>
                {t(`eventCategories.${category.key}` as any)}
              </option>
            ))}
          </select>
        </div>

        {/* Légende des catégories */}
        <div className="flex flex-wrap gap-3 mb-6">
          {EVENT_CATEGORIES.map((category) => (
            <div 
              key={category.key} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity"
              style={{ 
                backgroundColor: category.bgColor, 
                color: category.textColor 
              }}
              onClick={() => setSelectedCategory(category.key)}
              role="button"
              tabIndex={0}
              aria-label={`${t('category')}: ${t(`eventCategories.${category.key}` as any)}`}
            >
              <div 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: category.color }}
              />
              <span>{t(`eventCategories.${category.key}` as any)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-[600px]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          components={{
            event: CustomEvent,
            toolbar: CustomToolbar,
          }}
          views={availableViews}
          messages={{
            today: t('today'),
            previous: t('previous'),
            next: t('next'),
            month: t('month'),
            week: t('week'),
            day: t('day'),
            agenda: t('agenda'),
            date: t('date'),
            time: t('time'),
            event: t('event'),
            noEventsInRange: t('noEventsInRange'),
            showMore: (count: number) => `+${count} ${t('showMore')}`,
          }}
        />
      </div>

      {/* Event Detail Modal */}
      {selectedEventId && (
        <EventModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          eventId={selectedEventId}
          onNavigateToDetails={handleNavigateToDetails}
        />
      )}
    </div>
  );
}