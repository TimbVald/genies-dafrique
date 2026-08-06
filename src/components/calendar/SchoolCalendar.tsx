'use client';

import { useState, useMemo } from 'react';
import { Calendar, dateFnsLocalizer, Views, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Newspaper } from 'lucide-react';
import { NEWS_DATA } from '@/data/newsData';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const EVENT_COLORS: Record<string, string> = {
  rentree: '#3B82F6',
  reunions_parents: '#10B981',
  examens: '#F59E0B',
  vacances: '#8B5CF6',
  sorties_pedagogiques: '#06B6D4',
  activites_sportives: '#EF4444',
  activites_culturelles: '#EC4899',
  celebrations: '#F97316',
  concours: '#84CC16',
  evenements_administratifs: '#6B7280',
};

export default function SchoolCalendar() {
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const availableViews = [Views.MONTH, Views.WEEK, Views.DAY];

  // Convertir les actualités en événements de calendrier
  const events = useMemo(() => {
    return NEWS_DATA
      .filter(news => news.eventDate && news.eventType)
      .map((news, index) => {
        const eventDate = new Date(news.eventDate!);
        const color = EVENT_COLORS[news.eventType!] || '#3B82F6';
        
        return {
          id: news.id,
          title: news.titleFr,
          start: eventDate,
          end: eventDate,
          color,
          category: news.category,
          newsId: news.id,
        } as CalendarEvent;
      });
  }, []);

  const eventStyleGetter = (event: CalendarEvent) => {
    return {
      style: {
        backgroundColor: event.color || '#3B82F6',
        borderRadius: '6px',
        color: 'white',
        border: 'none',
        padding: '4px 8px',
        fontSize: '13px',
        fontWeight: 500,
      },
    } as any;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Calendrier Scolaire</h2>
            <p className="text-gray-600 flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              Synchronisé avec les actualités
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView(Views.MONTH)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                view === Views.MONTH
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mois
            </button>
            <button
              onClick={() => setView(Views.WEEK)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                view === Views.WEEK
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Semaine
            </button>
            <button
              onClick={() => setView(Views.DAY)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                view === Views.DAY
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Jour
            </button>
          </div>
        </div>

        {/* Légende des catégories */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(EVENT_COLORS).map(([key, color]) => (
            <div key={key} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: color }}
              />
              <span className="text-gray-600 capitalize">
                {key.replace(/-/g, ' ')}
              </span>
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
          views={availableViews}
          messages={{
            today: 'Aujourd\'hui',
            previous: 'Précédent',
            next: 'Suivant',
            month: 'Mois',
            week: 'Semaine',
            day: 'Jour',
            agenda: 'Agenda',
            date: 'Date',
            time: 'Heure',
            event: 'Événement',
            noEventsInRange: 'Aucun événement dans cette période',
            showMore: (count: number) => `+${count} autres`,
          }}
        />
      </div>
    </div>
  );
}