"use client";

import { useState, useCallback, useMemo } from "react";
import { Calendar, dateFnsLocalizer, Views, View } from "react-big-calendar";
import { format, parseISO } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar as CalendarIcon, Clock, MapPin, User, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import type { CalendarEvent, ReactBigCalendarEvent } from "@/types/calendar";
import { getCategoryConfig } from "@/types/calendar";
import { getNewsById } from "@/data/mockNews";

/* ═══════════════════════════════════════════════════════════════
   CLIENT COMPONENT PRINCIPAL AVEC REACT BIG CALENDAR
══════════════════════════════════════════════════════════════════ */

// Configurer le localizer pour date-fns
const localizer = dateFnsLocalizer({
  format,
  parse: parseISO,
  startOfWeek: () => new Date(2025, 0, 1), // Lundi comme premier jour
  getDayOfWeek: (date: Date) => date.getDay(),
});

export function SchoolCalendarClient({ initialEvents, locale }: { initialEvents: ReactBigCalendarEvent[]; locale: string }) {
  const t = useTranslations("calendar");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());

  // Choisir la locale date-fns appropriée
  const dateFnsLocale = locale === "fr" ? fr : enUS;

  // Convertir les événements en format CalendarEvent pour le modal
  const calendarEvents: CalendarEvent[] = useMemo(() => {
    return initialEvents.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.extendedProps.description,
      startDate: event.start.toISOString().split('T')[0],
      endDate: event.end.toISOString().split('T')[0],
      startTime: event.allDay ? undefined : event.start.toTimeString().substring(0, 5),
      endTime: event.allDay ? undefined : event.end.toTimeString().substring(0, 5),
      category: event.extendedProps.category,
      color: event.extendedProps.color,
      image: event.extendedProps.image,
      location: event.extendedProps.location,
      organizer: event.extendedProps.organizer,
      status: event.extendedProps.status,
      relatedNewsId: event.extendedProps.relatedNewsId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: true,
    }));
  }, [initialEvents]);

  /* ── Gestion du clic sur un événement ─────────────────────────── */
  const handleEventClick = useCallback((event: ReactBigCalendarEvent) => {
    const eventData = calendarEvents.find((e) => e.id === event.id);
    if (eventData) {
      setSelectedEvent(eventData);
    }
  }, [calendarEvents]);

  /* ── Gestion de la navigation ─────────────────────────────────── */
  const handleNavigate = useCallback((newDate: Date, view: string, action: string) => {
    setDate(newDate);
  }, []);

  /* ── Gestion du changement de vue ─────────────────────────────── */
  const handleViewChange = useCallback((newView: string) => {
    setView(newView as View);
  }, []);

  /* ── Formater la date ─────────────────────────────────────────── */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  /* ── Formater l'heure ─────────────────────────────────────────── */
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString(locale === "fr" ? "fr-FR" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* ── Obtenir la configuration de la catégorie ─────────────────── */
  const getCategoryLabel = (category: string) => {
    return t(`categories.${category}` as any);
  };

  /* ── Obtenir la couleur de la catégorie ─────────────────────────── */
  const getCategoryColor = (category: string) => {
    const config = getCategoryConfig(category as any);
    return config.bgColor;
  };

  return (
    <div className="w-full">
      {/* ═══════════════════════════════════════════════════════════════
          BARRE D'OUTILS DU CALENDRIER
      ═════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold font-satoshi text-[#1A202C]">
          {t("title")}
        </h2>
        
        {/* ── Sélecteur de vue ─────────────────────────────────────── */}
        <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-1">
          {([
            { value: "month" as View, label: t("views.month") },
            { value: "week" as View, label: t("views.week") },
            { value: "day" as View, label: t("views.day") },
            { value: "agenda" as View, label: t("views.list") },
          ] as const).map((viewOption) => (
            <button
              key={viewOption.value}
              onClick={() => setView(viewOption.value)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                view === viewOption.value
                  ? "bg-[#1A3A8F] text-white"
                  : "text-[#4A5568] hover:bg-[#F7F9FC]"
              }`}
            >
              {viewOption.label}
            </button>
          ))}
        </div>

        {/* ── Navigation ─────────────────────────────────────────── */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const newDate = new Date(date);
              if (view === Views.MONTH) {
                newDate.setMonth(newDate.getMonth() - 1);
              } else if (view === Views.WEEK) {
                newDate.setDate(newDate.getDate() - 7);
              } else if (view === Views.DAY) {
                newDate.setDate(newDate.getDate() - 1);
              } else if (view === Views.AGENDA) {
                newDate.setMonth(newDate.getMonth() - 1);
              }
              setDate(newDate);
            }}
            className="p-2 rounded-lg hover:bg-[#F7F9FC] transition-colors"
            aria-label={t("previous")}
          >
            <ChevronLeft size={20} className="text-[#4A5568]" />
          </button>
          <button
            onClick={() => setDate(new Date())}
            className="px-4 py-2 rounded-lg hover:bg-[#F7F9FC] transition-colors font-medium text-[#4A5568]"
          >
            {t("today")}
          </button>
          <button
            onClick={() => {
              const newDate = new Date(date);
              if (view === Views.MONTH) {
                newDate.setMonth(newDate.getMonth() + 1);
              } else if (view === Views.WEEK) {
                newDate.setDate(newDate.getDate() + 7);
              } else if (view === Views.DAY) {
                newDate.setDate(newDate.getDate() + 1);
              } else if (view === Views.AGENDA) {
                newDate.setMonth(newDate.getMonth() + 1);
              }
              setDate(newDate);
            }}
            className="p-2 rounded-lg hover:bg-[#F7F9FC] transition-colors"
            aria-label={t("next")}
          >
            <ChevronRight size={20} className="text-[#4A5568]" />
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          CALENDRIER REACT BIG CALENDAR
      ═════════════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <Calendar
          localizer={localizer}
          events={initialEvents}
          view={view}
          date={date}
          onNavigate={handleNavigate}
          onView={handleViewChange}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={(event) => handleEventClick(event)}
          eventPropGetter={(event: ReactBigCalendarEvent) => ({
            style: {
              backgroundColor: event.extendedProps.color || getCategoryColor(event.extendedProps.category),
              borderLeftColor: event.extendedProps.color || getCategoryConfig(event.extendedProps.category).borderColor,
              borderRadius: "6px",
              padding: "4px 8px",
              fontSize: "12px",
              cursor: "pointer",
            },
            title: event.extendedProps.relatedNewsId ? `${event.title} 📰` : event.title,
          })}
          style={{ height: 600 }}
          messages={{
            today: t("today"),
            previous: t("previous"),
            next: t("next"),
            month: t("views.month"),
            week: t("views.week"),
            day: t("views.day"),
            agenda: t("views.list"),
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODAL DE DÉTAILS D'ÉVÉNEMENT
      ═════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Header avec image ─────────────────────────────────── */}
              {selectedEvent.image && (
                <div className="relative h-48 sm:h-64">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}

              {/* ── Contenu ───────────────────────────────────────────── */}
              <div className="p-6 sm:p-8">
                {/* ── Header ─────────────────────────────────────────── */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{
                          backgroundColor: getCategoryConfig(selectedEvent.category).color,
                        }}
                      >
                        {getCategoryLabel(selectedEvent.category)}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedEvent.status === "upcoming"
                            ? "bg-green-100 text-green-700"
                            : selectedEvent.status === "ongoing"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {t(`status.${selectedEvent.status}` as any)}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-satoshi text-[#1A202C] mb-2">
                      {selectedEvent.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="p-2 rounded-full hover:bg-[#F7F9FC] transition-colors"
                    aria-label={t("close")}
                  >
                    <X size={24} className="text-[#4A5568]" />
                  </button>
                </div>

                {/* ── Informations ────────────────────────────────────── */}
                <div className="space-y-4 mb-6">
                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="w-5 h-5 text-[#1A3A8F] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#4A5568]">
                        {t("labels.date")}
                      </p>
                      <p className="text-[#1A202C]">
                        {formatDate(selectedEvent.startDate)}
                        {selectedEvent.startDate !== selectedEvent.endDate && (
                          <> – {formatDate(selectedEvent.endDate)}</>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Heure */}
                  {selectedEvent.startTime && selectedEvent.endTime && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#1A3A8F] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[#4A5568]">
                          {t("labels.time")}
                        </p>
                        <p className="text-[#1A202C]">
                          {formatTime(selectedEvent.startTime)} – {formatTime(selectedEvent.endTime)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Lieu */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#1A3A8F] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#4A5568]">
                        {t("labels.location")}
                      </p>
                      <p className="text-[#1A202C]">{selectedEvent.location}</p>
                    </div>
                  </div>

                  {/* Organisateur */}
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-[#1A3A8F] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#4A5568]">
                        {t("labels.organizer")}
                      </p>
                      <p className="text-[#1A202C]">{selectedEvent.organizer}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-[#4A5568] mb-2">
                    {t("labels.description")}
                  </p>
                  <p className="text-[#1A202C] leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Lien vers l'actualité associée */}
                {selectedEvent.relatedNewsId && (() => {
                  const relatedNews = getNewsById(selectedEvent.relatedNewsId!);
                  if (!relatedNews) return null;
                  
                  return (
                    <div className="pt-4 border-t border-[#E2E8F0]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#F5A623]" />
                        <span className="text-sm font-medium text-[#4A5568]">
                          {t("labels.relatedNews")}
                        </span>
                      </div>
                      <a
                        href={`/actualites/${selectedEvent.relatedNewsId}`}
                        className="block p-4 bg-[#F7F9FC] rounded-lg hover:bg-[#EEF2FF] transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          {relatedNews.image && (
                            <img
                              src={relatedNews.image}
                              alt={relatedNews.title}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-[#1A202C] group-hover:text-[#1A3A8F] transition-colors line-clamp-2">
                              {relatedNews.title}
                            </h4>
                            <p className="text-sm text-[#4A5568] mt-1 line-clamp-2">
                              {relatedNews.description}
                            </p>
                          </div>
                          <Tag size={16} className="text-[#1A3A8F] flex-shrink-0 mt-1" />
                        </div>
                      </a>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
