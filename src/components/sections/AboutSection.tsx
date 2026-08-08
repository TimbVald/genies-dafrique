"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { getAboutSectionData } from "@/lib/data/home";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
} from "framer-motion";
import { Play, X, ArrowRight, Target, Eye, Heart, Globe, Trophy } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

const ease: Transition = { duration: 0.7, ease: "easeOut" };

const fadeUp: Variants    = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: ease } };
const fadeLeft: Variants  = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: "easeOut" } } };
const stagger: Variants   = { hidden: {}, show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } } };

const PILLARS = [
  { icon: Target,  keyFr: "mission",   keyEn: "mission",   labelFr: "Mission",     labelEn: "Mission"     },
  { icon: Eye,     keyFr: "vision",    keyEn: "vision",    labelFr: "Vision",      labelEn: "Vision"      },
  { icon: Heart,   keyFr: "values",    keyEn: "values",    labelFr: "Valeurs",     labelEn: "Values"      },
  { icon: Globe,   keyFr: "bilingual", keyEn: "bilingual", labelFr: "Bilinguisme", labelEn: "Bilingualism" },
  { icon: Trophy,  keyFr: "excellence",keyEn: "excellence",labelFr: "Excellence",  labelEn: "Excellence"  },
] as const;

export default function AboutSection() {
  const t      = useTranslations("about");
  const locale = useLocale();
  const aboutData = getAboutSectionData();

  const [videoOpen, setVideoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });
  const videoSrc   = locale === "en" ? "/videos/VID-EN.mp4" : "/videos/VID-FR.mp4";

  const contentMap = [
    aboutData.mission, aboutData.vision, aboutData.values,
    aboutData.bilingual, aboutData.excellence,
  ] as const;

  return (
    <>
      <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">

        {/* Décoration fond */}
        <div className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(26,58,143,0.05) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />
        {/* Ligne verticale décorative */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px pointer-events-none hidden xl:block"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(26,58,143,0.07) 30%, rgba(26,58,143,0.07) 70%, transparent)" }} />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-start">

            {/* ── COLONNE GAUCHE — Visuel ── */}
            <motion.div variants={fadeLeft} initial="hidden" animate={inView ? "show" : "hidden"} className="relative">

              {/* Carte vidéo principale */}
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group ring-1 ring-black/5"
                style={{ aspectRatio: "16/10" }}
                onClick={() => setVideoOpen(true)}
                role="button" tabIndex={0}
                onKeyDown={e => e.key === "Enter" && setVideoOpen(true)}
                aria-label={aboutData.videoLabel[locale as keyof typeof aboutData.videoLabel] || t("playLabel")}
              >
                <Image
                  src={aboutData.videoThumbnail} alt=""
                  fill className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(13,31,107,0.75) 0%, rgba(13,31,107,0.15) 55%, transparent 100%)" }} />

                {/* Bouton play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center
                      shadow-[0_8px_40px_rgba(0,0,0,0.30)] group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}
                  >
                    <Play size={26} className="text-[#D32F2F] ml-1.5" fill="#D32F2F" />
                  </motion.div>
                </div>

                {/* Label bas */}
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white font-bold text-base leading-tight drop-shadow-sm">
                    {aboutData.videoLabel[locale as keyof typeof aboutData.videoLabel] || t("playLabel")}
                  </p>
                </div>

                {/* Durée simulée */}
                <div className="absolute top-4 right-4 bg-black/50 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                  2:45
                </div>
              </div>

              {/* Badges flottants */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-6 -right-4 lg:-right-8 text-white rounded-2xl px-5 py-4 shadow-xl z-10"
                style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}
              >
                <p className="text-2xl font-bold text-[#F5A623] font-display leading-none">2025</p>
                <p className="text-[11px] font-semibold text-white/80 mt-0.5 uppercase tracking-wider">
                  {aboutData.accreditation[locale as keyof typeof aboutData.accreditation] || t("accreditation")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.65, duration: 0.5, ease: "easeOut" }}
                className="absolute -top-4 -left-4 lg:-left-6 bg-white border border-[#E2E8F0]
                  rounded-2xl px-4 py-3 shadow-lg z-10 flex items-center gap-2.5"
              >
                <div className="w-9 h-9 rounded-full bg-[#FFF0F0] flex items-center justify-center flex-shrink-0">
                  <Trophy size={17} className="text-[#D32F2F]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#4A5568] uppercase tracking-wider leading-none mb-0.5">
                    {aboutData.since[locale as keyof typeof aboutData.since] || t("since")}
                  </p>
                  <p className="text-sm font-bold text-[#1A202C]">Nkozoa, Yaoundé</p>
                </div>
              </motion.div>

              {/* Trois miniatures sous la vidéo */}
              <div className="mt-10 grid grid-cols-3 gap-3">
                {aboutData.decorativeImages.map((src, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden aspect-square shadow-md group/mini">
                    <Image src={src} alt="" fill
                      className="object-cover group-hover/mini:scale-110 transition-transform duration-500"
                      sizes="15vw" />
                    <div className="absolute inset-0 bg-[#1A3A8F]/0 group-hover/mini:bg-[#1A3A8F]/30 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── COLONNE DROITE — Éditorial ── */}
            <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>

              <motion.div variants={fadeUp}>
                <SectionBadge>{t("badge")}</SectionBadge>
              </motion.div>

              <motion.h2 variants={fadeUp}
                className="font-display font-bold text-[#1A202C] mt-1 mb-3 leading-tight"
                style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}>
                {aboutData.title[locale as keyof typeof aboutData.title] || t("title")}
              </motion.h2>

              {/* Slogan officiel */}
              <motion.p variants={fadeUp}
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#D32F2F] mb-7">
                <span className="w-8 h-px bg-[#D32F2F]" />
                {aboutData.slogan[locale as keyof typeof aboutData.slogan] || t("slogan")}
                <span className="w-8 h-px bg-[#D32F2F]" />
              </motion.p>

              {/* Onglets piliers */}
              <motion.div variants={fadeUp} className="mb-6">
                <div className="flex flex-wrap gap-2 mb-5">
                  {PILLARS.map((p, i) => {
                    const Icon  = p.icon;
                    const label = locale === "fr" ? p.labelFr : p.labelEn;
                    return (
                      <button key={i} onClick={() => setActiveTab(i)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                          text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
                          activeTab === i
                            ? "bg-[#1A3A8F] text-white shadow-md"
                            : "bg-[#F7F9FC] text-[#4A5568] hover:bg-[#EEF2FF] hover:text-[#1A3A8F]"
                        }`}>
                        <Icon size={12} />
                        {label}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={activeTab}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease: "easeOut" }}
                    className="relative pl-5 border-l-4 border-[#1A3A8F] py-1"
                  >
                    <p className="text-[#4A5568] leading-relaxed text-[0.97rem]">
                      {(() => {
                        const c = contentMap[activeTab];
                        return c[locale as keyof typeof c] || t(PILLARS[activeTab].keyFr as Parameters<typeof t>[0]);
                      })()}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeUp}>
                <Link href={aboutData.cta.href}>
                  <motion.span
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-bold cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #2D5BE3 100%)", boxShadow: "0 4px 20px rgba(26,58,143,0.30)" }}
                    whileHover={{ scale: 1.03, y: -2, boxShadow: "0 8px 28px rgba(26,58,143,0.40)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}>
                    {aboutData.cta.label[locale as keyof typeof aboutData.cta.label] || t("cta")}
                    <ArrowRight size={18} />
                  </motion.span>
                </Link>
              </motion.div>

              {/* Signature directeur */}
              <motion.div variants={fadeUp}
                className="mt-10 pt-8 border-t border-[#E2E8F0] flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-[#F5A623]/40 shadow-lg">
                      <Image src="/images/IMG-20260723-WA0075.jpg" alt={t("directorName")} width={64} height={64}
                        className="object-cover object-top w-full h-full" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#2E7D32] border-2 border-white shadow" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A202C] text-sm">
                      {aboutData.directorName[locale as keyof typeof aboutData.directorName] || t("directorName")}
                    </p>
                    <p className="text-[#4A5568] text-xs leading-snug max-w-[220px]">
                      {aboutData.directorRole[locale as keyof typeof aboutData.directorRole] || t("directorRole")}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
                  <div className="w-14 h-14 rounded-full overflow-hidden shadow-md ring-2 ring-[#1A3A8F]/20">
                    <Image src="/logo/logo.jpg" alt="Logo Les Génies d'Afrique" width={56} height={56}
                      className="object-cover w-full h-full" />
                  </div>
                  <p className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest text-center">CSB-LGA</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox vidéo */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 bg-black/92 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} onClick={() => setVideoOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-video"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={e => e.stopPropagation()}
            >
              <video src={videoSrc} controls autoPlay className="w-full h-full rounded-2xl object-cover shadow-2xl" />
              <button onClick={() => setVideoOpen(false)}
                aria-label={locale === "fr" ? "Fermer" : "Close"}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30
                  backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-colors duration-200">
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
