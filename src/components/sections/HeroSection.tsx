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
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { getHeroSlides, getHeroConfig } from "@/lib/data/home";

/* ─── Data ───────────────────────────────────────────────────── */
const SLIDES   = getHeroSlides();
const CFG      = getHeroConfig();
const SLIDE_MS = CFG.slideDuration;
const TRANS_S  = CFG.transitionDuration;

/* ─── Slide crossfade ────────────────────────────────────────── */
const TV: Transition = { duration: TRANS_S / 1000, ease: "easeInOut" };
const SLIDE_V: Variants = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: TV },
  exit:   { opacity: 0, transition: { duration: (TRANS_S * 0.6) / 1000, ease: "easeInOut" } },
};

/* ─── Caption animation ──────────────────────────────────────── */
const capV: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut", delay: 0.4 } },
};

/* ══════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const t      = useTranslations("hero");
  const locale = useLocale();

  const [current,   setCurrent]   = useState(0);
  const [paused,    setPaused]    = useState(false);
  const [loaded,    setLoaded]    = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const videoSrc   = locale === "en" ? "/videos/VID-EN.mp4" : "/videos/VID-FR.mp4";

  /* ── Parallaxe léger au scroll ── */
  const { scrollY } = useScroll({ target: sectionRef });
  const bgY = useTransform(scrollY, [0, 600], ["0%", "10%"]);

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
          HERO PLEIN ÉCRAN
          Sur desktop (lg+) : remonte sous le header transparent
          grâce à -mt-[var(--header-h)]. L'image fusionne
          avec le header. Sur mobile : comportement normal.
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-[#0D1F6B]
          lg:-mt-[var(--header-h)] hero-section"
        style={{ height: "100svh", minHeight: 580, maxHeight: 1080 }}
        onMouseEnter={() => CFG.pauseOnHover && setPaused(true)}
        onMouseLeave={() => CFG.pauseOnHover && setPaused(false)}
        aria-label={locale === "fr" ? "Bienvenue aux Génies d'Afrique" : "Welcome to Les Génies d'Afrique"}
      >
        {/* ── Images plein écran — Ken Burns ── */}
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <AnimatePresence mode="sync">
            <motion.div
              key={current}
              variants={SLIDE_V}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <motion.div
                className="absolute inset-0"
                initial={{ transform: SLIDES[current].kenFrom }}
                animate={{ transform: SLIDES[current].kenTo }}
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
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ─────────────────────────────────────────────────────
            OVERLAYS — très légers pour que l'image reste visible
            • Pas de couche sombre globale lourde
            • Vignette subtile sur les bords
            • Dégradé du bas uniquement pour la zone de texte
        ───────────────────────────────────────────────────── */}

        {/* Vignette bords — profondeur très légère */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 120% 110% at 50% 50%, transparent 45%, rgba(0,0,0,0.22) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Dégradé bas — uniquement pour la zone du texte et des contrôles */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: "55%",
            background:
              "linear-gradient(to top, rgba(13,31,107,0.82) 0%, rgba(13,31,107,0.45) 40%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Dégradé haut — couvre header + zone de navigation */}
        <div
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: "35%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* ── Contenu éditorial — bas gauche ── */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end">
          <div className="max-w-[1280px] mx-auto w-full px-8 lg:px-16 pb-20 lg:pb-24">
            <motion.div
              className="max-w-xl"
              variants={capV}
              initial="hidden"
              animate={loaded ? "show" : "hidden"}
            >
              {/* Pré-titre discret */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-px w-8 bg-[#F5A623]" aria-hidden="true" />
                <span className="text-[#F5A623] text-[0.68rem] font-bold uppercase tracking-[0.24em]">
                  {locale === "fr"
                    ? "Complexe Scolaire Bilingue · Nkozoa, Yaoundé"
                    : locale === "en"
                    ? "Bilingual School Complex · Nkozoa, Yaoundé"
                    : "Sukul Bilingue · Nkozoa, Yaoundé"}
                </span>
              </div>

              {/* Titre — grand mais pas écrasant */}
              <h1
                className="font-display font-bold text-white leading-[1.08] mb-4
                  drop-shadow-[0_2px_20px_rgba(0,0,0,0.50)]"
                style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.8rem)" }}
              >
                {t("title")}
              </h1>

              {/* Sous-titre — une seule ligne, sobre */}
              <p
                className="text-white/75 mb-7 leading-relaxed"
                style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}
              >
                {t("subtitle")}
              </p>

              {/* 2 CTAs seulement */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/formations">
                  <motion.span
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl
                      bg-[#D32F2F] text-white font-bold text-sm tracking-wide
                      cursor-pointer whitespace-nowrap
                      shadow-[0_4px_24px_rgba(211,47,47,0.50)]"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  >
                    {t("ctaPrimary")}
                    <ArrowRight size={15} />
                  </motion.span>
                </Link>

                {/* Bouton vidéo */}
                <motion.button
                  onClick={() => setVideoOpen(true)}
                  className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl
                    bg-white/12 hover:bg-white/22 backdrop-blur-sm
                    border border-white/25 hover:border-white/50
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

        {/* ── Flèches navigation — bas droite ── */}
        <div
          className="absolute z-30 flex items-center gap-0"
          style={{ right: "2rem", bottom: "2rem" }}
        >
          <button
            onClick={prev}
            aria-label={locale === "fr" ? "Précédent" : "Previous"}
            className="w-11 h-11 flex items-center justify-center rounded-l-lg
              bg-white/15 hover:bg-white/30 backdrop-blur-sm
              border border-white/20 text-white
              transition-all duration-200"
          >
            <ChevronLeft size={19} />
          </button>
          <button
            onClick={next}
            aria-label={locale === "fr" ? "Suivant" : "Next"}
            className="w-11 h-11 flex items-center justify-center rounded-r-lg
              bg-white/25 hover:bg-white/40 backdrop-blur-sm
              border border-white/20 text-white
              transition-all duration-200"
          >
            <ChevronRight size={19} />
          </button>
        </div>

        {/* ── Dots + compteur — bas centre ── */}
        <div
          className="absolute z-30 bottom-[2.2rem] left-1/2 -translate-x-1/2
            flex items-center gap-2"
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === current}
              className={`rounded-full transition-all duration-400 ${
                i === current
                  ? "w-7 h-[3px] bg-white"
                  : "w-[4px] h-[4px] bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* ── Scroll hint — très discret ── */}
        <motion.div
          className="absolute bottom-7 right-20 z-20 hidden lg:flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 2.0, duration: 0.6 }}
          aria-hidden="true"
        >
          <ChevronDown size={16} className="text-white/30 animate-bounce" strokeWidth={1.5} />
        </motion.div>

        {/* ── Barre de progression ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] z-30 bg-white/10"
          aria-hidden="true"
        >
          <motion.div
            key={current}
            className="h-full bg-[#F5A623]/70"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          LIGHTBOX VIDÉO
      ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setVideoOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={locale === "fr" ? "Vidéo de présentation" : "Presentation video"}
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-video"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <video
                src={videoSrc}
                controls
                autoPlay
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
