"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { getAboutSectionData, getStatistics } from "@/lib/data/home";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
} from "framer-motion";
import { Play, X, ArrowRight, Target, Eye, Heart, Globe, Trophy } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

const ease: Transition = { duration: 0.7, ease: "easeOut" };
const fadeUp: Variants   = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: ease } };
const fadeLeft: Variants = { hidden: { opacity: 0, x: -44 }, show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: "easeOut" } } };
const stagger: Variants  = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };

/* ── Onglets piliers (UI uniquement — le contenu vient des données) ── */
const PILLARS = [
  { icon: Target,  labelFr: "Mission",     labelEn: "Mission"     },
  { icon: Eye,     labelFr: "Vision",      labelEn: "Vision"      },
  { icon: Heart,   labelFr: "Valeurs",     labelEn: "Values"      },
  { icon: Globe,   labelFr: "Bilinguisme", labelEn: "Bilingualism" },
  { icon: Trophy,  labelFr: "Excellence",  labelEn: "Excellence"  },
] as const;

export default function AboutSection() {
  const t         = useTranslations("about");
  const locale    = useLocale();
  const aboutData = getAboutSectionData();

  const [videoOpen, setVideoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });
  const videoSrc   = locale === "en" ? "/videos/VID-EN.mp4" : "/videos/VID-FR.mp4";

  /* Images empilées depuis les données */
  const stackImages = aboutData.decorativeImages;   // src/data/home/about.ts

  /* Stats flottantes : students, experience + sections bilingues */
  const allStats = getStatistics();
  const floatStats = [
    allStats.find(s => s.id === "stat-students")    ?? { id: "stat-students",   value: "120", suffix: "+", label: { fr: "Élèves inscrits",   en: "Students enrolled",    ew: "Bana ba tɔ́l"     }, sublabel: { fr: "", en: "", ew: "" } },
    allStats.find(s => s.id === "stat-experience")  ?? { id: "stat-experience", value: "2",   suffix: "",  label: { fr: "Ans d'expérience",  en: "Years of experience",  ew: "Osu ya akom"     }, sublabel: { fr: "", en: "", ew: "" } },
    {                                                   id: "stat-sections",    value: "2",   suffix: "",  label: { fr: "Sections bilingues",en: "Bilingual sections",   ew: "Nzɔ́g mibuma"    }, sublabel: { fr: "", en: "", ew: "" } },
  ];

  const contentMap = [
    aboutData.mission, aboutData.vision, aboutData.values,
    aboutData.bilingual, aboutData.excellence,
  ] as const;

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-24 lg:py-32 bg-white overflow-hidden"
      >
        {/* Décoration fond */}
        <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none opacity-60"
          style={{ background: "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-[340px] h-[340px] rounded-full pointer-events-none opacity-60"
          style={{ background: "radial-gradient(circle, rgba(26,58,143,0.05) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-start">

            {/* ════════════════════════════════════════════════
                COLONNE GAUCHE — 3 photos empilées + stats flottant
            ═══════════════════════════════════════════════════ */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="relative"
            >
              {/* ── Stack de 3 photos décalées ── */}
              {/* Photo 1 — grande, en fond */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5"
                style={{ aspectRatio: "4/3" }}>
                <Image
                  src={stackImages[0]}
                  alt={locale === "fr" ? "Élèves en activité" : "Students in activity"}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Photo 2 — medium, décalée bas-droite */}
              <motion.div
                className="absolute rounded-2xl overflow-hidden shadow-xl ring-2 ring-white"
                style={{ width: "52%", aspectRatio: "4/3", bottom: "-2rem", right: "-1.5rem" }}
                initial={{ opacity: 0, scale: 0.88, y: 16 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src={stackImages[1]}
                  alt={locale === "fr" ? "Vie scolaire" : "School life"}
                  fill
                  className="object-cover object-top"
                  sizes="30vw"
                />
              </motion.div>

              {/* Photo 3 — petite, décalée haut-droite */}
              <motion.div
                className="absolute rounded-2xl overflow-hidden shadow-lg ring-2 ring-white hidden sm:block"
                style={{ width: "34%", aspectRatio: "1/1", top: "1rem", right: "-2rem" }}
                initial={{ opacity: 0, scale: 0.85, y: -12 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.55, ease: "easeOut" }}
              >
                <Image
                  src={stackImages[2]}
                  alt={locale === "fr" ? "École bilingue" : "Bilingual school"}
                  fill
                  className="object-cover object-center"
                  sizes="20vw"
                />
              </motion.div>

              {/* ── Bloc stats flottant — bas-gauche ── */}
              <motion.div
                className="absolute -bottom-3 -left-4 lg:-left-8
                  bg-white border border-[#E2E8F0] rounded-2xl shadow-xl z-20 px-5 py-4"
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ delay: 0.7, duration: 0.55, ease: "easeOut" }}
              >
                <div className="flex items-center divide-x divide-[#E2E8F0] gap-0">
                  {floatStats.map((s, i) => (
                    <div key={i} className={`text-center ${i > 0 ? "pl-4 ml-4" : ""}`}>
                      <p className="font-display font-bold text-[#1A3A8F] text-lg leading-none mb-0.5">
                        {s.value}{s.suffix}
                      </p>
                      <p className="text-[#4A5568] text-[0.68rem] leading-tight whitespace-nowrap">
                        {s.label[locale as keyof typeof s.label] || s.label.fr}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ── Badge accréditation flottant haut-gauche ── */}
              <motion.div
                className="absolute -top-3 -left-3 lg:-left-6
                  text-white rounded-xl px-4 py-2.5 shadow-lg z-20"
                style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              >
                <p className="text-[#F5A623] text-base font-bold font-display leading-none">2025</p>
                <p className="text-white/75 text-[0.62rem] font-semibold uppercase tracking-wider mt-0.5">
                  {aboutData.accreditation[locale as keyof typeof aboutData.accreditation]}
                </p>
              </motion.div>

              {/* ── Bouton play vidéo ── */}
              <motion.button
                onClick={() => setVideoOpen(true)}
                className="absolute inset-0 flex items-center justify-center group z-10"
                aria-label={aboutData.videoLabel[locale as keyof typeof aboutData.videoLabel]}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm
                  flex items-center justify-center shadow-[0_8px_40px_rgba(0,0,0,0.25)]
                  group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                  <Play size={24} fill="#D32F2F" className="text-[#D32F2F] ml-1" />
                </span>
              </motion.button>
            </motion.div>

            {/* ════════════════════════════════════════════════
                COLONNE DROITE — Texte éditorial
            ═══════════════════════════════════════════════════ */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              /* Décalage pour que le texte n'entre pas en collision avec la photo 3 décalée */
              className="lg:pl-8 xl:pl-10"
            >
              <motion.div variants={fadeUp}>
                <SectionBadge>{t("badge")}</SectionBadge>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="font-display font-bold text-[#1A202C] mt-1 mb-3 leading-tight"
                style={{ fontSize: "clamp(1.65rem, 2.8vw, 2.5rem)" }}
              >
                {aboutData.title[locale as keyof typeof aboutData.title]}
              </motion.h2>

              {/* Slogan */}
              <motion.p
                variants={fadeUp}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase
                  tracking-[0.18em] text-[#D32F2F] mb-7"
              >
                <span className="w-8 h-px bg-[#D32F2F]" />
                {aboutData.slogan[locale as keyof typeof aboutData.slogan]}
                <span className="w-8 h-px bg-[#D32F2F]" />
              </motion.p>

              {/* Onglets piliers */}
              <motion.div variants={fadeUp} className="mb-6">
                <div className="flex flex-wrap gap-2 mb-5">
                  {PILLARS.map((p, i) => {
                    const Icon  = p.icon;
                    const label = locale === "fr" ? p.labelFr : p.labelEn;
                    return (
                      <button
                        key={i}
                        onClick={() => setActiveTab(i)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                          text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
                          activeTab === i
                            ? "bg-[#1A3A8F] text-white shadow-md"
                            : "bg-[#F7F9FC] text-[#4A5568] hover:bg-[#EEF2FF] hover:text-[#1A3A8F]"
                        }`}
                      >
                        <Icon size={12} />
                        {label}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="relative pl-5 border-l-4 border-[#1A3A8F] py-1"
                  >
                    <p className="text-[#4A5568] leading-relaxed text-[0.96rem]">
                      {(() => {
                        const c = contentMap[activeTab];
                        return c[locale as keyof typeof c];
                      })()}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeUp}>
                <Link href={aboutData.cta.href}>
                  <motion.span
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl
                      text-white font-bold cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, #1A3A8F 0%, #2D5BE3 100%)",
                      boxShadow: "0 4px 20px rgba(26,58,143,0.30)",
                    }}
                    whileHover={{ scale: 1.03, y: -2, boxShadow: "0 8px 28px rgba(26,58,143,0.40)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  >
                    {aboutData.cta.label[locale as keyof typeof aboutData.cta.label]}
                    <ArrowRight size={17} />
                  </motion.span>
                </Link>
              </motion.div>

              {/* Signature directeur */}
              <motion.div
                variants={fadeUp}
                className="mt-9 pt-7 border-t border-[#E2E8F0] flex items-center gap-4"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-[#F5A623]/35 shadow-md">
                    <Image
                      src="https://res.cloudinary.com/dyetkan86/image/upload/v1786848130/file_0000000043b4820eb1db0b515c09febb_2_chkjj4.jpg"
                      alt={aboutData.directorName[locale as keyof typeof aboutData.directorName]}
                      width={56} height={56}
                      className="object-cover object-top w-full h-full"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#2E7D32] border-2 border-white shadow-sm" />
                </div>
                <div>
                  <p className="font-bold text-[#1A202C] text-sm">
                    {aboutData.directorName[locale as keyof typeof aboutData.directorName]}
                  </p>
                  <p className="text-[#4A5568] text-xs leading-snug max-w-[230px]">
                    {aboutData.directorRole[locale as keyof typeof aboutData.directorRole]}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX VIDÉO ── */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 bg-black/92 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setVideoOpen(false)}
            role="dialog" aria-modal="true"
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-video"
              initial={{ scale: 0.91, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              onClick={e => e.stopPropagation()}
            >
              <video
                src={videoSrc} controls autoPlay
                className="w-full h-full rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setVideoOpen(false)}
                aria-label={locale === "fr" ? "Fermer" : "Close"}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full
                  bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20
                  flex items-center justify-center text-white transition-colors"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
