"use client";

import { useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin, User, Tag } from "lucide-react";
import type { CalendarEvent, FullCalendarEvent } from "@/types/calendar";
import { toFullCalendarEvent, getCategoryConfig } from "@/types/calendar";
import { getPublishedEvents } from "@/data/mockEvents";
import { getNewsById } from "@/data/mockNews";

// @ts-ignore - FullCalendar types are bundled with @fullcalendar/react
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventClickArg = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventDidMountArg = any;

/* ═══════════════════════════════════════════════════════════════
   CALENDRIER SCOLAIRE INTERACTIF
══════════════════════════════════════════════════════════════════ */

export default function SchoolCalendar() {
  const t = useTranslations("calendar");
  const locale = useLocale();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [view, setView] = useState<"dayGridMonth" | "timeGridWeek" | "timeGridDay" | "listMonth">("dayGridMonth");

  /* ── Charger les événements ───────────────────────────────────── */
  const events = getPublishedEvents();
  const calendarEvents: FullCalendarEvent[] = events.map(toFullCalendarEvent);

  /* ── Gestion du clic sur un événement ─────────────────────────── */
  const handleEventClick = useCallback((info: any) => {
    const eventData = events.find((e) => e.id === info.event.id);
    if (eventData) {
      setSelectedEvent(eventData);
    }
  }, [events]);

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
          {[
            { value: "dayGridMonth", label: t("views.month") },
            { value: "timeGridWeek", label: t("views.week") },
            { value: "timeGridDay", label: t("views.day") },
            { value: "listMonth", label: t("views.list") },
          ].map((viewOption) => (
            <button
              key={viewOption.value}
              onClick={() => setView(viewOption.value as any)}
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
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          CALENDRIER FULLCALENDAR
      ═════════════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          initialView={view}
          events={calendarEvents}
          eventClick={handleEventClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          height="auto"
          aspectRatio={1.8}
          editable={false}
          selectable={false}
          selectMirror={false}
          dayMaxEvents={true}
          weekends={true}
          nowIndicator={true}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          displayEventTime={true}
          displayEventEnd={true}
          eventDidMount={(info: any) => {
            // Personnalisation de l'apparence des événements
            const element = info.el as HTMLElement;
            element.style.borderRadius = "8px";
            element.style.borderLeftWidth = "4px";
            element.style.padding = "4px 8px";
            element.style.fontSize = "12px";
            element.style.cursor = "pointer";
            element.style.transition = "all 0.2s ease";
            
            // Ajouter un indicateur si l'événement provient d'une actualité
            const eventData = events.find((e) => e.id === info.event.id);
            if (eventData?.relatedNewsId) {
              const indicator = document.createElement("span");
              indicator.innerHTML = "📰";
              indicator.style.marginLeft = "4px";
              indicator.style.fontSize = "10px";
              element.appendChild(indicator);
            }
            
            element.addEventListener("mouseenter", () => {
              element.style.transform = "scale(1.02)";
              element.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            });
            
            element.addEventListener("mouseleave", () => {
              element.style.transform = "scale(1)";
              element.style.boxShadow = "none";
            });
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
                    <Calendar className="w-5 h-5 text-[#1A3A8F] mt-0.5 flex-shrink-0" />
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
