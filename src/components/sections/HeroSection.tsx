"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  motion, useScroll, useTransform,
  AnimatePresence, type Variants, type Transition,
} from "framer-motion";
import { Play, X, ArrowRight, BookOpen, Globe, ShieldCheck, Trophy } from "lucide-react";
import { getHeroSlides, getHeroContent, getHeroConfig } from "@/lib/data/home";

const SLIDES   = getHeroSlides();
const HERO_CFG = getHeroConfig();
const SLIDE_MS = HERO_CFG.slideDuration;
const TRANS_S  = HERO_CFG.transitionDuration;

const TV: Transition = { duration: TRANS_S / 1000, ease: "easeInOut" };

const SLIDE_V: Variants = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: TV },
  exit:   { opacity: 0, transition: { duration: (TRANS_S * 0.7) / 1000, ease: "easeInOut" } },
};

/* 4 piliers de confiance — style La Gaieté */
const PILLARS = [
  { icon: Trophy,     keyFr: "Excellence Académique",   keyEn: "Academic Excellence",   descFr: "Enseignement rigoureux, résultats d'exception.", descEn: "Rigorous teaching, outstanding results." },
  { icon: Globe,      keyFr: "Ouverture Internationale",keyEn: "International Outlook",  descFr: "Bilinguisme FR/EN dès la crèche.",               descEn: "FR/EN bilingualism from day care." },
  { icon: BookOpen,   keyFr: "Innovation & Pédagogie",  keyEn: "Innovation & Pedagogy",  descFr: "Agriculture, entrepreneuriat, numérique.",       descEn: "Farming, entrepreneurship, digital tools." },
  { icon: ShieldCheck,keyFr: "Encadrement & Valeurs",   keyEn: "Care & Values",          descFr: "Bienveillance, discipline, épanouissement.",     descEn: "Well-being, discipline, fulfilment." },
];

/* ── Variants caption ── */
const capV: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut", delay: 0.5 } },
};
const pillarsV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.85 } },
};
const pillarItemV: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HeroSection() {
  const t      = useTranslations("hero");
  const locale = useLocale();

  const [current,   setCurrent]   = useState(0);
  const [paused,    setPaused]    = useState(false);
  const [loaded,    setLoaded]    = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const videoSrc   = locale === "en" ? "/videos/VID-EN.mp4" : "/videos/VID-FR.mp4";

  const { scrollY } = useScroll({ target: sectionRef });
  const bgY = useTransform(scrollY, [0, 700], ["0%", "14%"]);

  const advance = useCallback(() => {
    if (!paused && HERO_CFG.autoplay) setCurrent(c => (c + 1) % SLIDES.length);
  }, [paused]);

  useEffect(() => {
    const id = setInterval(advance, SLIDE_MS);
    return () => clearInterval(id);
  }, [advance]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!videoOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setVideoOpen(false); };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [videoOpen]);

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          HERO PLEIN ÉCRAN — diaporama + overlay éditorial + piliers
      ═══════════════════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-[#0D1F6B]"
        style={{ height: "100svh", minHeight: 620, maxHeight: 1080 }}
        onMouseEnter={() => HERO_CFG.pauseOnHover && setPaused(true)}
        onMouseLeave={() => HERO_CFG.pauseOnHover && setPaused(false)}
        aria-label={locale === "fr" ? "Bienvenue aux Génies d'Afrique" : "Welcome to Les Génies d'Afrique"}
      >
        {/* ── Diaporama ── */}
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <AnimatePresence mode="sync">
            <motion.div key={current} variants={SLIDE_V} initial="enter" animate="center" exit="exit" className="absolute inset-0">
              <motion.div
                className="absolute inset-0"
                initial={{ transform: SLIDES[current].kenFrom }}
                animate={{ transform: SLIDES[current].kenTo }}
                transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
              >
                <Image
                  src={SLIDES[current].image} alt="" fill
                  className="object-cover" style={{ objectPosition: SLIDES[current].position }}
                  sizes="100vw" priority={current === 0} aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Overlays multicouches — style La Gaieté ── */}
        {/* Couche gauche sombre (pour le texte) */}
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(13,31,107,0.88) 0%, rgba(13,31,107,0.70) 45%, rgba(13,31,107,0.30) 75%, transparent 100%)" }}
          aria-hidden="true" />
        {/* Couche bas pour les piliers */}
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.20) 28%, transparent 55%)" }}
          aria-hidden="true" />

        {/* ── Contenu principal — partie supérieure ── */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between">
          {/* Texte éditorial — aligné gauche, centre vertical */}
          <div className="flex items-center flex-1 max-w-[1280px] mx-auto w-full px-8 lg:px-16 pb-4">
            <motion.div
              className="max-w-2xl pt-8"
              variants={capV}
              initial="hidden"
              animate={loaded ? "show" : "hidden"}
            >
              {/* Pré-titre institutionnel */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#F5A623]" />
                <span className="text-[#F5A623] text-xs font-bold uppercase tracking-[0.22em]">
                  {locale === "fr" ? "Complexe Scolaire Bilingue · Nkozoa, Yaoundé" : "Bilingual School Complex · Nkozoa, Yaoundé"}
                </span>
              </div>

              {/* Titre H1 */}
              <h1
                className="font-display font-bold text-white leading-[1.08] mb-5 drop-shadow-xl"
                style={{ fontSize: "clamp(2.1rem, 5.5vw, 4.2rem)" }}
              >
                {t("title")}
              </h1>

              {/* Sous-titre */}
              <p
                className="text-white/75 leading-relaxed mb-8 max-w-xl"
                style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)" }}
              >
                {t("subtitle")}
              </p>

              {/* Badge accréditation */}
              <div className="flex items-center gap-2 mb-8">
                <ShieldCheck size={16} className="text-[#F5A623]" />
                <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                  {locale === "fr" ? "Agréé MINEDUB 2025 · Bilingue FR / EN" : "MINEDUB Accredited 2025 · Bilingual FR / EN"}
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/formations">
                  <motion.span
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5
                      rounded-xl bg-[#D32F2F] text-white font-bold text-sm tracking-wide
                      shadow-[0_6px_28px_rgba(211,47,47,0.50)] cursor-pointer whitespace-nowrap"
                    whileHover={{ scale: 1.03, y: -2, boxShadow: "0 10px 36px rgba(211,47,47,0.6)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  >
                    {t("ctaPrimary")}
                    <ArrowRight size={16} />
                  </motion.span>
                </Link>

                <Link href="/presentation">
                  <motion.span
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5
                      rounded-xl border-2 border-white/50 text-white font-semibold text-sm
                      hover:border-white hover:bg-white/10 cursor-pointer whitespace-nowrap
                      transition-all duration-200"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  >
                    {t("ctaSecondary")}
                  </motion.span>
                </Link>

                <motion.button
                  onClick={() => setVideoOpen(true)}
                  className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl
                    bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/50
                    text-white font-medium text-sm cursor-pointer whitespace-nowrap transition-all duration-200"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  aria-label={locale === "fr" ? "Voir la vidéo" : "Watch Video"}
                >
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Play size={11} fill="white" className="ml-0.5" />
                  </span>
                  {locale === "fr" ? "Voir la vidéo" : "Watch Video"}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* ── 4 PILIERS DE CONFIANCE — bande basse glass ── */}
          <motion.div
            className="w-full bg-black/40 backdrop-blur-md border-t border-white/10"
            variants={pillarsV}
            initial="hidden"
            animate={loaded ? "show" : "hidden"}
          >
            <div className="max-w-[1280px] mx-auto px-8 lg:px-16">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
                {PILLARS.map(({ icon: Icon, keyFr, keyEn, descFr, descEn }, i) => (
                  <motion.div
                    key={i}
                    variants={pillarItemV}
                    className="flex items-start gap-3 py-5 px-4 lg:px-6 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0
                      group-hover:bg-[#F5A623]/20 transition-colors duration-300 mt-0.5">
                      <Icon size={18} className="text-[#F5A623]" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm leading-snug mb-0.5">
                        {locale === "fr" ? keyFr : keyEn}
                      </p>
                      <p className="text-white/55 text-xs leading-relaxed">
                        {locale === "fr" ? descFr : descEn}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Dots navigation ── */}
        <div className="absolute bottom-28 right-8 flex items-center gap-2 z-30" role="tablist">
          {SLIDES.map((_, i) => (
            <button
              key={i} role="tab" aria-selected={i === current}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-400 ${i === current ? "w-7 h-[3px] bg-white" : "w-[4px] h-[4px] bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>

        {/* ── Barre de progression ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-30 bg-black/15" aria-hidden="true">
          <motion.div key={current} className="h-full bg-[#F5A623]/60"
            initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: SLIDE_MS / 1000, ease: "linear" }} />
        </div>

        {/* ── Numéro de slide décoratif ── */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-2">
          <div className="h-16 w-px bg-white/20" />
          <span className="text-white/40 text-xs font-bold tabular-nums">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="text-white/20 text-xs">/{SLIDES.length.toString().padStart(2, "0")}</span>
          <div className="h-16 w-px bg-white/20" />
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }} onClick={() => setVideoOpen(false)}
            role="dialog" aria-modal="true"
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-video"
              initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <video src={videoSrc} controls autoPlay className="w-full h-full rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.7)]" />
            </motion.div>
            <button onClick={() => setVideoOpen(false)}
              aria-label={locale === "fr" ? "Fermer" : "Close"}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-colors duration-200">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
