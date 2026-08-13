'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Tag,
  Clock,
  MapPin,
  MessageCircle,
  ChevronLeft,
} from "lucide-react";
import { X } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import { format } from 'date-fns';
import { fr, enGB } from 'date-fns/locale';
import { EVENT_CATEGORIES } from '@/lib/data/events';
import { getUpcomingEvents } from '@/lib/data/events';
import type { Event } from '@/types';

const FacebookIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

interface EventDetailContentProps {
  event: Event;
  locale: string;
}

export default function EventDetailContent({ event, locale }: EventDetailContentProps) {
  const isFr = locale === "fr";
  const category = EVENT_CATEGORIES.find(cat => cat.key === event.categoryKey) || EVENT_CATEGORIES[0];
  const dateLocale = locale === 'en' ? enGB : fr;
  const allEvents = getUpcomingEvents(10);
  const relatedEvents = allEvents.filter((e) => e.id !== event.id).slice(0, 3);
  
  const formattedDate = format(new Date(event.startDate), 'EEEE d MMMM yyyy', { locale: dateLocale });
  const formattedEndDate = event.endDate ? format(new Date(event.endDate), 'EEEE d MMMM yyyy', { locale: dateLocale }) : null;
  const formattedTime = event.startTime ? event.startTime : null;

  const shareLabel = isFr ? "Partager l'événement" : "Share this event";
  const relatedLabel = isFr ? "Événements liés" : "Related Events";
  const backLabel = isFr ? "← Retour à la liste des actualités" : "← Back to all news";
  const dateLabel = isFr ? "Date" : "Date";
  const timeLabel = isFr ? "Heure" : "Time";
  const locationLabel = isFr ? "Lieu" : "Location";
  const categoryLabel = isFr ? "Catégorie" : "Category";

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
    <section className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Back to list */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-[#4A5568] hover:text-[#1A3A8F] font-semibold text-sm transition-colors duration-200"
          >
            <ChevronLeft size={16} />
            {backLabel}
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Main Event */}
          <article>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {category && (
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                    style={{ 
                      backgroundColor: category.bgColor, 
                      color: category.textColor 
                    }}
                  >
                    <Tag size={11} className="inline mr-1.5" />
                    {category.label[locale as "fr" | "en" | "ew"] || category.label.fr}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-[#4A5568] text-sm">
                  <Calendar size={14} /> {formattedDate}
                </span>
                {formattedEndDate && formattedEndDate !== formattedDate && (
                  <span className="text-[#4A5568] text-sm">
                    au {formattedEndDate}
                  </span>
                )}
              </div>

              <h1 className="font-display font-bold text-[#1A202C] text-3xl md:text-4xl leading-tight mb-4">
                {event.title[locale as "fr" | "en" | "ew"] || event.title.fr}
              </h1>

              {/* Share bar */}
              <div className="flex flex-wrap items-center gap-3 py-4 border-y border-[#F1F5F9]">
                <span className="text-sm text-[#94A3B8] font-semibold mr-2">
                  {shareLabel} :
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShare("facebook")}
                  className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-all shadow-md shadow-[#1877F2]/30"
                  aria-label="Facebook"
                >
                  <FacebookIcon size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShare("whatsapp")}
                  className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-all shadow-md shadow-[#25D366]/30"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShare("x")}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-all shadow-md shadow-black/20"
                  aria-label="X"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </motion.div>

            {/* Featured Image */}
            {event.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative aspect-video rounded-2xl overflow-hidden mb-10 shadow-lg shadow-[#1A202C]/10"
              >
                <Image
                  src={event.image}
                  alt={event.title[locale as "fr" | "en" | "ew"] || event.title.fr}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 800px"
                  priority
                />
              </motion.div>
            )}

            {/* Event Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              <div className="space-y-6">
                <p className="text-[#2D3748] leading-[1.9] text-[16.5px]">
                  {event.description[locale as "fr" | "en" | "ew"] || event.description.fr}
                </p>
              </div>
            </motion.div>

            {/* Recurring indicator */}
            {event.recurring && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 flex items-center gap-2 text-sm text-[#1A3A8F] bg-blue-50 px-4 py-3 rounded-xl"
              >
                <Calendar size={16} />
                <span className="font-medium">
                  {isFr ? "Événement récurrent annuel" : "Annual recurring event"}
                </span>
              </motion.div>
            )}

            {/* Bottom Share */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]"
            >
              <div>
                <p className="font-semibold text-[#1A202C] mb-1">{shareLabel}</p>
                <p className="text-sm text-[#94A3B8]">
                  {isFr
                    ? "Si cet événement vous intéresse, n'hésitez pas à le partager."
                    : "If you're interested in this event, please share it."}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShare("facebook")}
                  className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-all"
                  aria-label="Facebook"
                >
                  <FacebookIcon size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShare("whatsapp")}
                  className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-all"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShare("x")}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-all"
                  aria-label="X"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </motion.div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-8">
              {/* Event Details Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-6"
              >
                <h3 className="font-display font-bold text-[#1A202C] text-lg mb-5 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#1A3A8F] rounded-full" />
                  {isFr ? "Détails de l'événement" : "Event Details"}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-[#1A3A8F] to-[#0D2A6F] rounded-lg flex-shrink-0">
                      <Calendar size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-[#94A3B8] mb-1">{dateLabel}</p>
                      <p className="font-semibold text-[#1A202C] text-sm">{formattedDate}</p>
                      {formattedEndDate && formattedEndDate !== formattedDate && (
                        <p className="text-xs text-[#94A3B8]">au {formattedEndDate}</p>
                      )}
                    </div>
                  </div>
                  
                  {formattedTime && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-to-br from-[#1A3A8F] to-[#0D2A6F] rounded-lg flex-shrink-0">
                        <Clock size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-[#94A3B8] mb-1">{timeLabel}</p>
                        <p className="font-semibold text-[#1A202C] text-sm">{formattedTime}</p>
                      </div>
                    </div>
                  )}
                  
                  {event.location && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-to-br from-[#1A3A8F] to-[#0D2A6F] rounded-lg flex-shrink-0">
                        <MapPin size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-[#94A3B8] mb-1">{locationLabel}</p>
                        <p className="font-semibold text-[#1A202C] text-sm">
                          {event.location[locale as "fr" | "en" | "ew"] || event.location.fr}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-[#F1F5F9]">
                    <p className="text-xs text-[#94A3B8] mb-1">{categoryLabel}</p>
                    <p className="font-semibold text-[#1A3A8F] text-sm">
                      {category.label[locale as "fr" | "en" | "ew"] || category.label.fr}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Related Events */}
              {relatedEvents.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-6"
                >
                  <h3 className="font-display font-bold text-[#1A202C] text-lg mb-5 flex items-center gap-2">
                    <span className="w-1 h-5 bg-[#D32F2F] rounded-full" />
                    {relatedLabel}
                  </h3>
                  <div className="space-y-5">
                    {relatedEvents.map((relEvent, i) => {
                      const relCategory = EVENT_CATEGORIES.find(cat => cat.key === relEvent.categoryKey) || EVENT_CATEGORIES[0];
                      const relEventDate = new Date(relEvent.startDate);
                      
                      return (
                        <motion.div
                          key={relEvent.id}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.05 * i }}
                          whileHover={{ x: 4 }}
                        >
                          <Link
                            href={`/actualites/${relEvent.slug}`}
                            className="group flex gap-4 items-start"
                          >
                            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#1A3A8F] to-[#0D2A6F] flex flex-col items-center justify-center text-white">
                              <span className="text-xs font-medium">{relEventDate.toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { month: 'short' })}</span>
                              <span className="text-lg font-bold">{relEventDate.getDate()}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide"
                                  style={{ 
                                    backgroundColor: relCategory.bgColor, 
                                    color: relCategory.textColor 
                                  }}
                                >
                                  {relCategory.label[locale as "fr" | "en" | "ew"] || relCategory.label.fr}
                                </span>
                              </div>
                              <h4 className="font-semibold text-[#1A202C] text-sm leading-snug line-clamp-2 group-hover:text-[#1A3A8F] transition-colors mb-1">
                                {relEvent.title[locale as "fr" | "en" | "ew"] || relEvent.title.fr}
                              </h4>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  <Link
                    href="/calendrier"
                    className="mt-6 block text-center w-full inline-flex items-center justify-center gap-2 text-[#1A3A8F] hover:text-[#D32F2F] font-semibold text-sm border-t border-[#F1F5F9] pt-5 transition-colors"
                  >
                    {isFr ? "Voir tout le calendrier" : "View full calendar"}
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              )}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-2xl p-6 text-white relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #D32F2F 0%, #F5A623 100%)",
                }}
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute right-8 bottom-0 w-20 h-20 rounded-full bg-[#1A3A8F]/20" />
                <div className="relative z-10">
                  <div className="text-3xl mb-3">🎓</div>
                  <h4 className="font-display font-bold text-xl mb-2">
                    {isFr ? "Intéressé par nos programmes ?" : "Interested in our programmes?"}
                  </h4>
                  <p className="text-white/90 text-sm mb-4 leading-relaxed">
                    {isFr
                      ? "Contactez-nous pour une visite personnalisée de l'établissement."
                      : "Contact us for a personalised visit of the school."}
                  </p>
                  <Link
                    href="/admissions"
                    className="inline-flex items-center gap-2 bg-white text-[#D32F2F] px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#1A3A8F] hover:text-white transition-all duration-300 shadow-lg"
                  >
                    {isFr ? "Nous contacter" : "Contact us"}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
