"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { getUpcomingEvents } from "@/data/mockEvents";
import { getCategoryConfig } from "@/types/calendar";
import SectionBadge from "@/components/ui/SectionBadge";

/* ═══════════════════════════════════════════════════════════════
   SECTION PROCHAINS ÉVÉNEMENTS (PAGE D'ACCUEIL)
══════════════════════════════════════════════════════════════════ */

export default function UpcomingEventsSection() {
  const t = useTranslations("calendar.home");
  const tCal = useTranslations("calendar");
  const locale = useLocale();
  const upcomingEvents = getUpcomingEvents(3);

  /* ── Formater la date ─────────────────────────────────────────── */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
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
    return tCal(`categories.${category}` as any);
  };

  if (upcomingEvents.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="text-center mb-12 sm:mb-16">
          <SectionBadge>{t("badge")}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-satoshi text-[#1A202C] mt-4 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-[#4A5568] max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* ── Events Grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {upcomingEvents.map((event, index) => {
            const config = getCategoryConfig(event.category);
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#E2E8F0]"
              >
                {/* ── Category Badge ─────────────────────────────────── */}
                <div className="px-4 py-3 border-b border-[#E2E8F0]">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: config.color }}
                  >
                    {getCategoryLabel(event.category)}
                  </span>
                </div>

                {/* ── Content ─────────────────────────────────────────── */}
                <div className="p-5 sm:p-6">
                  {/* Title */}
                  <h3 className="text-lg font-bold font-satoshi text-[#1A202C] mb-3 group-hover:text-[#1A3A8F] transition-colors">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#4A5568] mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Meta Information */}
                  <div className="space-y-2 mb-4">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-[#4A5568]">
                      <Calendar size={16} className="text-[#1A3A8F] flex-shrink-0" />
                      <span>{formatDate(event.startDate)}</span>
                    </div>

                    {/* Time */}
                    {event.startTime && event.endTime && (
                      <div className="flex items-center gap-2 text-sm text-[#4A5568]">
                        <Clock size={16} className="text-[#1A3A8F] flex-shrink-0" />
                        <span>
                          {formatTime(event.startTime)} – {formatTime(event.endTime)}
                        </span>
                      </div>
                    )}

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-[#4A5568]">
                      <MapPin size={16} className="text-[#1A3A8F] flex-shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  {/* Link */}
                  <Link
                    href="/calendrier"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A3A8F] hover:text-[#0D1F6B] transition-colors group/link"
                  >
                    {tCal("viewFullCalendar")}
                    <ArrowRight
                      size={16}
                      className="group-hover/link:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── View All Button ─────────────────────────────────────── */}
        <div className="text-center mt-10 sm:mt-12">
          <Link
            href="/calendrier"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A3A8F] text-white rounded-lg hover:bg-[#0D1F6B] transition-colors font-semibold shadow-md hover:shadow-lg"
          >
            {tCal("viewFullCalendar")}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
