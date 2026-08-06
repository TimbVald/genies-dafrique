'use client';

import { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  color: string;
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

export default function SchoolCalendar() {
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const availableViews = [Views.MONTH, Views.WEEK, Views.DAY];

  // Données d'événements statiques (chargées côté client)
  const events: CalendarEvent[] = [
    {
      id: 1,
      title: 'Rentrée scolaire',
      start: new Date(2026, 8, 1), // 1er septembre 2026
      end: new Date(2026, 8, 1),
      color: '#3B82F6',
    },
    {
      id: 2,
      title: 'Réunion de parents',
      start: new Date(2026, 8, 15), // 15 septembre 2026
      end: new Date(2026, 8, 15),
      color: '#10B981',
    },
    {
      id: 3,
      title: 'Examen du 1er trimestre',
      start: new Date(2026, 10, 20), // 20 novembre 2026
      end: new Date(2026, 10, 25),
      color: '#F59E0B',
    },
    {
      id: 4,
      title: 'Fête de fin d\'année',
      start: new Date(2026, 5, 30), // 30 juin 2026
      end: new Date(2026, 5, 30),
      color: '#EF4444',
    },
  ];

  const eventStyleGetter = (event: CalendarEvent) => {
    return {
      style: {
        backgroundColor: event.color || '#3B82F6',
        borderRadius: '4px',
        color: 'white',
        border: 'none',
        padding: '2px 4px',
      },
    } as any;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Calendrier</h2>
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