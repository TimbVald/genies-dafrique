"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  motion, AnimatePresence,
  type Variants, type Transition,
} from "framer-motion";
import { Play, X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getHeroSlides, getHeroConfig } from "@/lib/data/home";

/* ─── Data ───────────────────────────────────────────────────── */
const SLIDES   = getHeroSlides();
const CFG      = getHeroConfig();
const SLIDE_MS = CFG.slideDuration;
const TRANS_S  = CFG.transitionDuration;

/* ─── Crossfade ──────────────────────────────────────────────── */
const TV: Transition = { duration: TRANS_S / 1000, ease: "easeInOut" };
const SLIDE_V: Variants = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: TV },
  exit:   { opacity: 0, transition: { duration: (TRANS_S * 0.6) / 1000, ease: "easeInOut" } },
};

/* ─── Caption ────────────────────────────────────────────────── */
const capV: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.35 } },
};

/* ══════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const t      = useTranslations("hero");
  const locale = useLocale();

  const [current,   setCurrent]   = useState(0);
  const [paused,    setPaused]    = useState(false);
  const [loaded,    setLoaded]    = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const videoSrc = locale === "en" ? "/videos/VID-EN.mp4" : "/videos/VID-FR.mp4";

  const advance = useCallback(() => {
    if (!paused && CFG.autoplay) setCurrent(c => (c + 1) % SLIDES.length);
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

  const prev = () => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent(c => (c + 1) % SLIDES.length);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
        HERO
        • Hauteur stable : 100dvh bornée entre 520px et 980px
        • Remonte sous le header (lg:-mt-[--header-h]) pour la fusion
        • Pas de parallaxe ni de transform qui fait déborder l'image
        • object-cover + objectPosition par slide = images cadrées partout
      ═══════════════════════════════════════════════════════ */}
      <section
        className="hero-section relative w-full overflow-hidden bg-[#0D1F6B] lg:-mt-[var(--header-h)]"
        onMouseEnter={() => CFG.pauseOnHover && setPaused(true)}
        onMouseLeave={() => CFG.pauseOnHover && setPaused(false)}
        aria-label={locale === "fr" ? "Bienvenue aux Génies d'Afrique" : "Welcome to Les Génies d'Afrique"}
      >
        {/* ── Images plein-écran stables ── */}
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            variants={SLIDE_V}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 z-0"
          >
            {/* Ken Burns uniquement sur l'image elle-même, pas sur le conteneur */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1.0 }}
              transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
            >
              <Image
                src={SLIDES[current].image}
                alt=""
                fill
                className="object-cover"
                style={{ objectPosition: SLIDES[current].position }}
                sizes="100vw"
                priority={current === 0}
                quality={85}
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* ── Overlays ── */}
        {/* Voile sombre global léger — image visible à ~60% */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[#06103A]/40" aria-hidden="true" />

        {/* Dégradé haut fort — header transparent lisible */}
        <div className="absolute top-0 inset-x-0 z-10 pointer-events-none"
          style={{ height: "30%", background: "linear-gradient(to bottom, rgba(6,16,58,0.72) 0%, rgba(6,16,58,0.30) 50%, transparent 100%)" }}
          aria-hidden="true" />

        {/* Dégradé bas — zone texte */}
        <div className="absolute bottom-0 inset-x-0 z-10 pointer-events-none"
          style={{ height: "60%", background: "linear-gradient(to top, rgba(6,16,58,0.90) 0%, rgba(6,16,58,0.55) 40%, transparent 100%)" }}
          aria-hidden="true" />

        {/* ── Contenu — aligné bas-gauche ── */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end">
          <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 lg:px-16
            pb-16 sm:pb-20 lg:pb-28">
            <motion.div
              className="max-w-[600px]"
              variants={capV}
              initial="hidden"
              animate={loaded ? "show" : "hidden"}
            >
              {/* Pré-titre */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-px w-8 bg-[#F5A623] flex-shrink-0" aria-hidden="true" />
                <span className="text-[#F5A623] text-[0.67rem] font-bold uppercase tracking-[0.25em]">
                  {locale === "fr" ? "Complexe Scolaire Bilingue · Nkozoa, Yaoundé"
                   : locale === "en" ? "Bilingual School Complex · Nkozoa, Yaoundé"
                   : "Sukul Bilingue · Nkozoa, Yaoundé"}
                </span>
              </div>

              {/* Titre H1 */}
              <h1
                className="font-display font-bold text-white leading-[1.07] mb-5"
                style={{
                  fontSize: "clamp(1.75rem, 5vw, 3.8rem)",
                  textShadow: "0 2px 24px rgba(0,0,0,0.55)",
                }}
              >
                {t("title")}
              </h1>

              {/* Sous-titre */}
              <p
                className="text-white/78 mb-8 leading-relaxed max-w-lg"
                style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.05rem)" }}
              >
                {t("subtitle")}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/formations">
                  <motion.span
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl
                      bg-[#D32F2F] text-white font-bold text-sm tracking-wide
                      cursor-pointer whitespace-nowrap
                      shadow-[0_4px_20px_rgba(211,47,47,0.55)]"
                    whileHover={{ scale: 1.03, y: -2, boxShadow: "0 8px_28px rgba(211,47,47,0.65)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  >
                    {t("ctaPrimary")}
                    <ArrowRight size={15} />
                  </motion.span>
                </Link>

                <motion.button
                  onClick={() => setVideoOpen(true)}
                  className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl
                    bg-white/12 hover:bg-white/20 backdrop-blur-sm
                    border border-white/30 hover:border-white/55
                    text-white font-medium text-sm cursor-pointer whitespace-nowrap
                    transition-all duration-200"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  aria-label={locale === "fr" ? "Voir la vidéo" : "Watch Video"}
                >
                  <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Play size={11} fill="#D32F2F" className="text-[#D32F2F] ml-0.5" />
                  </span>
                  {locale === "fr" ? "Voir la vidéo" : locale === "en" ? "Watch Video" : "Yiba video"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Flèches — bas droite ── */}
        <div className="absolute z-30 right-4 sm:right-8 bottom-6 sm:bottom-8 flex items-center gap-0">
          <button onClick={prev} aria-label={locale === "fr" ? "Précédent" : "Previous"}
            className="w-11 h-11 flex items-center justify-center rounded-l-lg
              bg-white/12 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white
              transition-all duration-200">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} aria-label={locale === "fr" ? "Suivant" : "Next"}
            className="w-11 h-11 flex items-center justify-center rounded-r-lg
              bg-white/22 hover:bg-white/35 backdrop-blur-sm border border-white/20 text-white
              transition-all duration-200">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* ── Dots — bas centre ── */}
        <div className="absolute z-30 bottom-[1.85rem] left-1/2 -translate-x-1/2 flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`} aria-current={i === current}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-7 h-[3px] bg-white" : "w-[5px] h-[5px] bg-white/38 hover:bg-white/65"
              }`}
            />
          ))}
        </div>

        {/* ── Barre de progression ── */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] z-30 bg-white/10" aria-hidden="true">
          <motion.div
            key={current}
            className="h-full bg-[#F5A623]/65"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
          />
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }} onClick={() => setVideoOpen(false)}
            role="dialog" aria-modal="true"
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-video"
              initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <video src={videoSrc} controls autoPlay className="w-full h-full rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.75)]" />
            </motion.div>
            <button onClick={() => setVideoOpen(false)}
              aria-label={locale === "fr" ? "Fermer" : "Close"}
              className="absolute top-5 right-5 w-11 h-11 rounded-full
                bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20
                flex items-center justify-center text-white transition-colors duration-200">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
