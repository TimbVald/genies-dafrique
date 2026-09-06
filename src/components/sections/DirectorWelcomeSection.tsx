"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Quote, ArrowRight, Sparkles, Award, CheckCircle2, HeartHandshake } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import { getDirectorMessage } from "@/lib/data/about";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function DirectorWelcomeSection() {
  const t = useTranslations("directorWelcome");
  const locale = useLocale();
  const directorData = getDirectorMessage();

  // Dynamic values fallback to directorData if localized in data object
  const directorName =
    directorData.name[locale as keyof typeof directorData.name] ||
    t("signatureName");
  const directorRole =
    directorData.role[locale as keyof typeof directorData.role] ||
    t("signatureRole");
  const quoteText =
    directorData.quote[locale as keyof typeof directorData.quote] ||
    t("quote");
  const photoUrl = directorData.photo;

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] overflow-hidden border-b border-[#E2E8F0]">
      {/* Dynamic Background Accents */}
      <div
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(26,58,143,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-10 right-0 w-80 h-80 rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ════════════════════════════════════════════════
              COLONNE GAUCHE — Portrait de la Directrice (5 cols)
          ═══════════════════════════════════════════════════ */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-5 relative flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[400px]">
              
              {/* Cadre Décoratif Arrière */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#1A3A8F] via-[#F5A623] to-[#D32F2F] rounded-[2.5rem] opacity-20 blur-md transform -rotate-1" />
              
              {/* Photo Container */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-white bg-[#0D1F6B]/5">
                <Image
                  src={photoUrl}
                  alt={directorName}
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 90vw, 400px"
                  priority
                />
                
                {/* Dégradé bas d'image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1842]/80 via-transparent to-transparent opacity-90" />
                
                {/* Information Directrice intégrée bas photo */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623] animate-pulse" />
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-white/90">
                      {t("excellenceTitle")}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg leading-tight text-white">
                    {directorName}
                  </h3>
                  <p className="text-xs text-white/80 font-medium mt-0.5">
                    {directorRole}
                  </p>
                </div>
              </div>

              {/* Floating Badge Experience — Haut Droite */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -top-4 -right-3 sm:-right-5 bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-xl rounded-2xl p-3.5 flex items-center gap-3 z-10"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFF8EE] text-[#F5A623] flex items-center justify-center font-bold shadow-inner">
                  <Award size={20} />
                </div>
                <div>
                  <p className="font-display font-bold text-[#1A3A8F] text-sm leading-tight">
                    {t("experienceYears")}
                  </p>
                  <p className="text-[11px] text-[#64748B] font-medium">
                    CSB Les Génies
                  </p>
                </div>
              </motion.div>

              {/* Floating Badge Confiance — Bas Gauche */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-5 -left-3 sm:-left-5 bg-[#1A3A8F] text-white shadow-xl rounded-2xl px-4 py-2.5 flex items-center gap-2.5 z-10 border border-white/20"
              >
                <HeartHandshake size={18} className="text-[#F5A623]" />
                <span className="text-xs font-semibold tracking-wide">
                  {t("tagline")}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════
              COLONNE DROITE — Discours & Actions (7 cols)
          ═══════════════════════════════════════════════════ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Header / Badge */}
            <div>
              <SectionBadge variant="blue">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#F5A623]" />
                  {t("badge")}
                </span>
              </SectionBadge>

              <h2
                className="font-display font-bold text-[#0F172A] leading-tight tracking-tight"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                {t("title")}
              </h2>
            </div>

            {/* Citation Signature */}
            <div className="relative bg-gradient-to-r from-[#FFF8EE] to-[#FFFBF5] border-l-4 border-[#F5A623] p-5 sm:p-6 rounded-r-2xl shadow-sm">
              <Quote className="absolute top-3 right-4 text-[#F5A623]/20 w-10 h-10 pointer-events-none" />
              <p className="font-display italic text-[#334155] text-base sm:text-lg leading-relaxed relative z-10 font-medium">
                « {quoteText} »
              </p>
            </div>

            {/* Corps du message */}
            <div className="space-y-4 text-[#475569] text-base leading-relaxed">
              <p className="font-medium text-[#1E293B]">
                {t("messageParagraph1")}
              </p>
              <p>
                {t("messageParagraph2")}
              </p>
            </div>

            {/* Piliers rapides d'engagement */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-[#1E293B] bg-white p-3 rounded-xl border border-[#E2E8F0] shadow-sm">
                <CheckCircle2 size={16} className="text-[#1A3A8F] flex-shrink-0" />
                <span>Bilinguisme Anglais - Français</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-[#1E293B] bg-white p-3 rounded-xl border border-[#E2E8F0] shadow-sm">
                <CheckCircle2 size={16} className="text-[#D32F2F] flex-shrink-0" />
                <span>Encadrement Pédagogique d'Élite</span>
              </div>
            </div>

            {/* Actions CTA & Signature */}
            <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              
              {/* Boutons CTA */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/${locale}/a-propos`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1A3A8F] text-white font-semibold text-sm hover:bg-[#122A6D] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>{t("ctaAbout")}</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white text-[#1A3A8F] border border-[#CBD5E1] font-semibold text-sm hover:bg-[#F8FAFC] hover:border-[#1A3A8F] transition-all duration-300"
                >
                  <span>{t("ctaContact")}</span>
                </Link>
              </div>

              {/* Cachet Signature */}
              <div className="text-right sm:text-right pt-2 sm:pt-0">
                <p className="font-display font-bold text-[#1A3A8F] text-sm">
                  {directorName}
                </p>
                <p className="text-xs text-[#64748B] italic">
                  {t("signatureRole")}
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
