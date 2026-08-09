"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  motion, AnimatePresence,
  type Variants, type Transition,
} from "framer-motion";
import { Play, X, ArrowRight, ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { getHeroSlides, getHeroContent, getHeroConfig } from "@/lib/data/home";

/* ─── Data ────────────────────────────────────────────────────────── */
const SLIDES   = getHeroSlides();
const CFG      = getHeroConfig();
const SLIDE_MS = CFG.slideDuration;
const TRANS_S  = CFG.transitionDuration;

/* ─── Per-slide metadata ─────────────────────────────────────────── */
const SLIDE_META = [
  {
    labelFr: "Les Génies d'Afrique",
    labelEn: "Les Génies d'Afrique",
    titleFr: "Former aujourd'hui\nles leaders de demain",
    titleEn: "Shaping today's\nleaders for tomorrow",
    subFr:   "Un environnement bilingue d'excellence pour l'épanouissement de votre enfant, de la crèche au primaire.",
    subEn:   "A bilingual excellence environment for your child's total development, from day care to primary school.",
  },
  {
    labelFr: "Crèche & Maternelle",
    labelEn: "Day Care & Nursery",
    titleFr: "Un univers d'éveil,\nde découvertes et de tendresse",
    titleEn: "A world of awakening,\ndiscovery and warmth",
    subFr:   "Chaque enfant grandit en confiance et développe tout son potentiel dès ses premiers pas.",
    subEn:   "Every child grows in confidence and develops their full potential from their very first steps.",
  },
  {
    labelFr: "Section Primaire",
    labelEn: "Primary Section",
    titleFr: "L'excellence académique\nau cœur de chaque journée",
    titleEn: "Academic excellence\nat the heart of every day",
    subFr:   "Programmes officiels MINEDUB enrichis, bilingues FR/EN, avec des projets pédagogiques innovants.",
    subEn:   "Enhanced MINEDUB programmes, FR/EN bilingual, with innovative educational projects.",
  },
];

/* ─── Transitions slide image ────────────────────────────────────── */
const TV: Transition = { duration: TRANS_S / 1000, ease: "easeInOut" };
const IMG_V: Variants = {
  enter:  { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0, transition: { ...TV, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, x: -30, transition: { duration: (TRANS_S * 0.5) / 1000, ease: "easeIn" } },
};

/* ─── Transitions texte ──────────────────────────────────────────── */
const TXT_V: Variants = {
  enter:  { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 } },
  exit:   { opacity: 0, y: -16, transition: { duration: 0.3, ease: "easeIn" } },
};

/* ══════════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const t      = useTranslations("hero");
  const locale = useLocale();
  const L      = locale as "fr" | "en" | "ew";

  const [current,   setCurrent]   = useState(0);
  const [paused,    setPaused]    = useState(false);
  const [loaded,    setLoaded]    = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const videoSrc = locale === "en" ? "/videos/VID-EN.mp4" : "/videos/VID-FR.mp4";

  /* ── Auto-avance ── */
  const advance = useCallback((dir = 1) => {
    if (!paused && CFG.autoplay) {
      setDirection(dir);
      setCurrent(c => (c + dir + SLIDES.length) % SLIDES.length);
    }
  }, [paused]);

  useEffect(() => {
    const id = setInterval(() => advance(1), SLIDE_MS);
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

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };
  const prev = () => { setDirection(-1); setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length); };
  const next = () => { setDirection(1);  setCurrent(c => (c + 1) % SLIDES.length); };

  const meta = SLIDE_META[current] ?? SLIDE_META[0];
  const label = locale === "en" ? meta.labelEn : meta.labelFr;
  const title = (locale === "en" ? meta.titleEn : meta.titleFr).split("\n");
  const sub   = locale === "en" ? meta.subEn   : meta.subFr;

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HERO — Layout La Gaieté :
          GAUCHE : fond blanc + texte
          DROITE : image pleine hauteur très visible
          SÉPARATEUR : arc SVG doré
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full bg-white overflow-hidden"
        style={{ height: "100svh", minHeight: 560, maxHeight: 960 }}
        onMouseEnter={() => CFG.pauseOnHover && setPaused(true)}
        onMouseLeave={() => CFG.pauseOnHover && setPaused(false)}
        aria-label={locale === "fr" ? "Bienvenue aux Génies d'Afrique" : "Welcome to Les Génies d'Afrique"}
      >

        {/* ──────────────────────────────────────────────────────
            IMAGE DROITE — occupe ~60% dès md, 100% sur mobile
        ───────────────────────────────────────────────────── */}
        <div className="absolute inset-0 md:inset-y-0 md:left-[38%] md:right-0 z-0">
          <AnimatePresence mode="sync" custom={direction}>
            <motion.div
              key={`img-${current}`}
              custom={direction}
              variants={IMG_V}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={SLIDES[current].image}
                alt=""
                fill
                className="object-cover object-center"
                style={{ objectPosition: SLIDES[current].position }}
                sizes="(max-width: 768px) 100vw, 62vw"
                priority={current === 0}
                aria-hidden="true"
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay très léger sur mobile seulement (pour lisibilité) */}
          <div
            className="absolute inset-0 md:hidden pointer-events-none"
            style={{ background: "rgba(6,16,58,0.60)" }}
            aria-hidden="true"
          />
        </div>

        {/* ──────────────────────────────────────────────────────
            ARC DÉCORATIF SVG — séparation fond blanc / image
            Visible uniquement desktop (md+)
        ───────────────────────────────────────────────────── */}
        <div
          className="absolute inset-y-0 left-0 z-10 pointer-events-none hidden md:block"
          style={{ width: "50%" }}
          aria-hidden="true"
        >
          {/* Fond blanc qui couvre la gauche */}
          <div className="absolute inset-0 bg-white" />

          {/* Arc SVG doré — décoration La Gaieté */}
          <svg
            className="absolute top-0 right-0 h-full"
            style={{ width: "140px", right: "-70px" }}
            viewBox="0 0 140 960"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Fond blanc qui "déborde" sur l'image */}
            <path
              d="M0 0 Q 140 480 0 960 L 0 0 Z"
              fill="white"
            />
            {/* Trait doré principal */}
            <path
              d="M 0 0 Q 140 480 0 960"
              stroke="#F5A623"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            {/* Trait doré secondaire décalé */}
            <path
              d="M 14 0 Q 154 480 14 960"
              stroke="#F5A623"
              strokeWidth="1"
              strokeOpacity="0.35"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* ──────────────────────────────────────────────────────
            CONTENU GAUCHE — texte éditorial
        ───────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-center
            px-8 md:px-14 lg:px-20
            md:w-[48%]"
        >
          <motion.div
            className="max-w-lg"
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >

            {/* Décoration points — fond */}
            <div
              className="absolute inset-0 opacity-[0.025] pointer-events-none hidden md:block"
              style={{
                backgroundImage: "radial-gradient(circle, #1A3A8F 1.5px, transparent 1.5px)",
                backgroundSize: "28px 28px",
              }}
              aria-hidden="true"
            />

            {/* Label institution — en bleu petits caps, comme La Gaieté */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`label-${current}`}
                variants={TXT_V}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex items-center gap-2 mb-4"
              >
                <span
                  className="text-[#1A3A8F] text-xs font-bold uppercase tracking-[0.22em]
                    md:text-white/0 md:[text-shadow:none]"
                  style={{ color: "#1A3A8F" }}
                >
                  {label}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Titre principal — très grand, gras, comme La Gaieté */}
            <AnimatePresence mode="wait">
              <motion.div key={`title-${current}`} variants={TXT_V} initial="enter" animate="center" exit="exit">
                <h1
                  className="font-display font-bold text-[#0D1F6B] leading-[1.05] mb-5
                    md:text-[#0D1F6B]"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}
                >
                  {title.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < title.length - 1 && <br />}
                    </span>
                  ))}
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Sous-titre court */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                variants={TXT_V}
                initial="enter"
                animate="center"
                exit="exit"
                className="text-[#4A5568] leading-relaxed mb-8 max-w-sm"
                style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)" }}
              >
                {sub}
              </motion.p>
            </AnimatePresence>

            {/* CTA principal — bouton bleu, style La Gaieté */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`cta-${current}`}
                variants={TXT_V}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col sm:flex-row items-start gap-3"
              >
                <Link href="/formations">
                  <motion.span
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg
                      bg-[#1A3A8F] text-white font-bold text-sm tracking-wide
                      cursor-pointer whitespace-nowrap shadow-[0_4px_20px_rgba(26,58,143,0.40)]"
                    whileHover={{ scale: 1.03, y: -2, boxShadow: "0 8px_28px rgba(26,58,143,0.50)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  >
                    <Settings size={15} />
                    {locale === "fr" ? "Découvrir nos formations" : locale === "en" ? "Discover Our Programs" : "Yiba bikɔ́l bya biso"}
                  </motion.span>
                </Link>

                {/* Bouton vidéo discret */}
                <motion.button
                  onClick={() => setVideoOpen(true)}
                  className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-lg
                    border-2 border-[#1A3A8F]/30 text-[#1A3A8F] font-semibold text-sm
                    cursor-pointer whitespace-nowrap hover:border-[#1A3A8F] hover:bg-[#EEF2FF]
                    transition-all duration-200"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  aria-label={locale === "fr" ? "Voir la vidéo" : "Watch video"}
                >
                  <span className="w-7 h-7 rounded-full bg-[#1A3A8F] flex items-center justify-center flex-shrink-0">
                    <Play size={11} fill="white" className="text-white ml-0.5" />
                  </span>
                  {locale === "fr" ? "Voir la vidéo" : locale === "en" ? "Watch Video" : "Yiba video"}
                </motion.button>
              </motion.div>
            </AnimatePresence>

            {/* Badge accréditation discret */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={loaded ? { opacity: 1 } : {}}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="flex items-center gap-2 mt-8 pt-6 border-t border-[#E2E8F0]"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#1A3A8F]/15 flex-shrink-0">
                <Image src="/logo/logo.png" alt="" width={32} height={32} className="object-cover w-full h-full" />
              </div>
              <span className="text-[#4A5568] text-[0.7rem] font-semibold uppercase tracking-[0.14em]">
                {locale === "fr"
                  ? "Agréé MINEDUB 2025 · Bilingue FR / EN"
                  : locale === "en"
                  ? "MINEDUB Accredited 2025 · Bilingual FR / EN"
                  : "Agréé MINEDUB 2025 · Bilingue FR / EN"}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* ──────────────────────────────────────────────────────
            NAVIGATION — flèches bas droite, style La Gaieté
        ───────────────────────────────────────────────────── */}
        <div
          className="absolute z-30 flex items-center gap-0"
          style={{ right: "2rem", bottom: "2rem" }}
        >
          <button
            onClick={prev}
            aria-label={locale === "fr" ? "Slide précédent" : "Previous slide"}
            className="w-11 h-11 flex items-center justify-center
              bg-white border border-[#E2E8F0] text-[#1A3A8F]
              hover:bg-[#1A3A8F] hover:text-white hover:border-[#1A3A8F]
              transition-all duration-200 rounded-l-lg shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label={locale === "fr" ? "Slide suivant" : "Next slide"}
            className="w-11 h-11 flex items-center justify-center
              bg-[#1A3A8F] border border-[#1A3A8F] text-white
              hover:bg-[#0D1F6B] hover:border-[#0D1F6B]
              transition-all duration-200 rounded-r-lg shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Compteur slides — bas gauche */}
        <div
          className="absolute z-30 bottom-6 left-8 md:left-14 lg:left-20
            flex items-center gap-3"
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === current}
              className={`rounded-full transition-all duration-400 ${
                i === current
                  ? "w-6 h-2 bg-[#1A3A8F]"
                  : "w-2 h-2 bg-[#1A3A8F]/25 hover:bg-[#1A3A8F]/50"
              }`}
            />
          ))}
          <span className="text-[#4A5568]/50 text-[11px] font-bold tabular-nums ml-1">
            {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Barre de progression fine — bas */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-30 bg-[#E2E8F0]">
          <motion.div
            key={current}
            className="h-full bg-[#F5A623]"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          LIGHTBOX VIDÉO
      ═══════════════════════════════════════════════════════════ */}
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
