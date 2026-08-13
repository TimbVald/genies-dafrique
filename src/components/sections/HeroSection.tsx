"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  motion, useScroll, useTransform,
  AnimatePresence, type Variants, type Transition,
} from "framer-motion";
import {
  Play, X, ArrowRight, ChevronDown,
  ChevronLeft, ChevronRight, Settings,
} from "lucide-react";
import { getHeroCycles, getHeroConfig } from "@/lib/data/home";
import type { HeroCycle } from "@/data/home/hero-cycles";

/* ─── Config + Données ────────────────────────────────────────────── */
const CYCLES   = getHeroCycles();          // données depuis src/data/home/hero-cycles.ts
const CFG      = getHeroConfig();
const SLIDE_MS = CFG.slideDuration;
const TRANS_S  = CFG.transitionDuration;

/* ── Types ────────────────────────────────────────────────────────── */
type L = "fr" | "en" | "ew";

/* ─── Animations ──────────────────────────────────────────────────── */
const TV: Transition = { duration: TRANS_S / 1000, ease: "easeInOut" };

const SLIDE_V: Variants = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: TV },
  exit:   { opacity: 0, transition: { duration: (TRANS_S * 0.55) / 1000, ease: "easeInOut" } },
};

const captionV: Variants = {
  enter:  { opacity: 0, y: 32 },
  center: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 } },
  exit:   { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

/* ══════════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const t      = useTranslations("hero");
  const locale = useLocale();
  const L      = locale as L;

  const [current,   setCurrent]   = useState(0);
  const [paused,    setPaused]    = useState(false);
  const [loaded,    setLoaded]    = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const videoSrc   = locale === "en" ? "/videos/VID-EN.mp4" : "/videos/VID-FR.mp4";

  /* Parallaxe léger */
  const { scrollY } = useScroll({ target: sectionRef });
  const bgY = useTransform(scrollY, [0, 600], ["0%", "10%"]);

  /* Auto-avance */
  const advance = useCallback(() => {
    if (!paused && CFG.autoplay) setCurrent(c => (c + 1) % CYCLES.length);
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

  const prev = () => setCurrent(c => (c - 1 + CYCLES.length) % CYCLES.length);
  const next = () => setCurrent(c => (c + 1) % CYCLES.length);

  const slide = CYCLES[current];

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          HERO PLEIN ÉCRAN — fusionne avec le header sur desktop
      ═══════════════════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-[#0D1F6B]
          lg:-mt-[var(--header-h)] hero-section"
        style={{ height: "100svh", minHeight: 580, maxHeight: 1080 }}
        onMouseEnter={() => CFG.pauseOnHover && setPaused(true)}
        onMouseLeave={() => CFG.pauseOnHover && setPaused(false)}
        aria-label={locale === "fr" ? "Bienvenue aux Génies d'Afrique" : "Welcome to Les Génies d'Afrique"}
      >

        {/* ── FOND : images plein écran Ken Burns ── */}
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <AnimatePresence mode="sync">
            <motion.div key={`bg-${current}`} variants={SLIDE_V} initial="enter" animate="center" exit="exit" className="absolute inset-0">
              <motion.div
                className="absolute inset-0"
                initial={{ transform: slide.kenFrom }}
                animate={{ transform: slide.kenTo }}
                transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  className="object-cover"
                  style={{ objectPosition: slide.position }}
                  sizes="100vw"
                  priority={current === 0}
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── OVERLAYS légers — image visible à ~60% ── */}
        {/* Vignette bords */}
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 120% 110% at 50% 50%, transparent 42%, rgba(0,0,0,0.25) 100%)" }}
          aria-hidden="true" />
        {/* Dégradé bas (zone texte) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{ height: "58%", background: "linear-gradient(to top, rgba(13,31,107,0.85) 0%, rgba(13,31,107,0.48) 42%, transparent 100%)" }}
          aria-hidden="true" />
        {/* Dégradé haut (zone header) */}
        <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
          style={{ height: "32%", background: "linear-gradient(to bottom, rgba(0,0,0,0.40) 0%, transparent 100%)" }}
          aria-hidden="true" />

        {/* ── CONTENU ÉDITORIAL — bas gauche ── */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end">
          <div className="max-w-[1280px] mx-auto w-full px-8 lg:px-14 pb-20 lg:pb-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={`caption-${current}`}
                variants={captionV}
                initial="enter"
                animate="center"
                exit="exit"
                className="max-w-xl"
              >
                {/* Pré-titre — nom du cycle en bleu clair / doré */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="h-px w-8 bg-[#F5A623]" aria-hidden="true" />
                  <span className="text-[#F5A623] text-[0.68rem] font-bold uppercase tracking-[0.26em]">
                    {slide.label[L]}
                  </span>
                </div>

                {/* Titre du cycle — grand et gras */}
                <h1
                  className="font-display font-bold text-white leading-[1.05] mb-3
                    drop-shadow-[0_3px_24px_rgba(0,0,0,0.55)]"
                  style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.4rem)" }}
                >
                  {slide.title[L]}
                </h1>

                {/* Accroche courte */}
                <p
                  className="text-white/80 leading-relaxed mb-7"
                  style={{ fontSize: "clamp(0.88rem, 1.4vw, 1.02rem)" }}
                >
                  {slide.accroche[L]}
                </p>

                {/* CTA bouton — bleu, spécifique au cycle */}
                <div className="flex flex-col sm:flex-row items-start gap-3">
                  <Link href={slide.ctaHref}>
                    <motion.span
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg
                        bg-[#1A3A8F] text-white font-bold text-sm tracking-wide
                        cursor-pointer whitespace-nowrap
                        shadow-[0_4px_22px_rgba(26,58,143,0.55)]"
                      whileHover={{ scale: 1.03, y: -2, boxShadow: "0 8px_28px rgba(26,58,143,0.65)" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 380, damping: 24 }}
                    >
                      <Settings size={14} className="opacity-80" />
                      {slide.cta[L]}
                    </motion.span>
                  </Link>

                  {/* Bouton vidéo */}
                  <motion.button
                    onClick={() => setVideoOpen(true)}
                    className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-lg
                      bg-white/12 hover:bg-white/22 backdrop-blur-sm
                      border border-white/28 hover:border-white/50
                      text-white font-medium text-sm cursor-pointer whitespace-nowrap
                      transition-all duration-200"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                    aria-label={locale === "fr" ? "Voir la vidéo de présentation" : "Watch presentation video"}
                  >
                    <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Play size={11} fill="#D32F2F" className="text-[#D32F2F] ml-0.5" />
                    </span>
                    {locale === "fr" ? "Voir la vidéo" : locale === "en" ? "Watch Video" : "Yiba video"}
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── FLÈCHES — bas droite ── */}
        <div className="absolute z-30 flex items-center gap-0" style={{ right: "2rem", bottom: "2rem" }}>
          <button
            onClick={prev}
            aria-label={locale === "fr" ? "Slide précédent" : "Previous slide"}
            className="w-11 h-11 flex items-center justify-center rounded-l-lg
              bg-white/15 hover:bg-white/28 backdrop-blur-sm
              border border-white/20 text-white transition-all duration-200"
          >
            <ChevronLeft size={19} />
          </button>
          <button
            onClick={next}
            aria-label={locale === "fr" ? "Slide suivant" : "Next slide"}
            className="w-11 h-11 flex items-center justify-center rounded-r-lg
              bg-white/25 hover:bg-white/40 backdrop-blur-sm
              border border-white/20 text-white transition-all duration-200"
          >
            <ChevronRight size={19} />
          </button>
        </div>

        {/* ── DOTS + compteur — bas centre ── */}
        <div className="absolute z-30 bottom-[2.2rem] left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          {CYCLES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === current}
              className={`rounded-full transition-all duration-400 ${
                i === current ? "w-7 h-[3px] bg-white" : "w-[4px] h-[4px] bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
          <span className="text-white/35 text-[10px] font-bold tabular-nums ml-1">
            {String(current + 1).padStart(2, "0")}/{String(CYCLES.length).padStart(2, "0")}
          </span>
        </div>

        {/* ── Scroll hint ── */}
        <motion.div
          className="absolute z-20 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1"
          style={{ bottom: "5.8rem" }}
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 2.0, duration: 0.6 }}
          aria-hidden="true"
        >
          <ChevronDown size={16} className="text-white/30 animate-bounce" strokeWidth={1.5} />
        </motion.div>

        {/* ── Barre de progression ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-30 bg-white/10" aria-hidden="true">
          <motion.div
            key={current}
            className="h-full bg-[#F5A623]/80"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
          />
        </div>
      </section>

      {/* ── LIGHTBOX VIDÉO ── */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setVideoOpen(false)}
            role="dialog" aria-modal="true"
            aria-label={locale === "fr" ? "Vidéo de présentation" : "Presentation video"}
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-video"
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <video
                src={videoSrc} controls autoPlay
                className="w-full h-full rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.75)]"
              />
            </motion.div>
            <button
              onClick={() => setVideoOpen(false)}
              aria-label={locale === "fr" ? "Fermer" : "Close"}
              className="absolute top-5 right-5 w-11 h-11 rounded-full
                bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20
                flex items-center justify-center text-white transition-colors duration-200"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
