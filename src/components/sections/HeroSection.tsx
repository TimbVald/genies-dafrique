"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
  type Transition,
} from "framer-motion";
import { Play, X, ChevronDown, ArrowRight } from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   3 SLIDES — images plein écran, aucun texte par-dessus
══════════════════════════════════════════════════════════════════ */
const SLIDES = [
  { src: "/images/IMG-20260723-WA0024.jpg", pos: "center 25%" },
  { src: "/images/pexels-karola-g-7269671.jpg", pos: "center center" },
  { src: "/images/Generated_Image.png", pos: "center center" },
] as const;

const SLIDE_MS   = 6500;
const TRANSITION = 1400;

/* ── Variants ────────────────────────────────────────────────── */
const TV: Transition = { duration: TRANSITION / 1000, ease: "easeInOut" };

const SLIDE_V: Variants = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: TV },
  exit:   { opacity: 0, transition: { duration: (TRANSITION * 0.75) / 1000, ease: "easeInOut" } },
};

const CAP_V: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.6 } },
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

  const videoSrc = locale === "en" ? "/videos/VID-EN.mp4" : "/videos/VID-FR.mp4";

  /* ── Parallaxe scroll ── */
  const { scrollY } = useScroll({ target: sectionRef });
  const bgY = useTransform(scrollY, [0, 700], ["0%", "14%"]);

  /* ── Autoplay slides ── */
  const advance = useCallback(() => {
    if (!paused) setCurrent((c) => (c + 1) % SLIDES.length);
  }, [paused]);

  useEffect(() => {
    const id = setInterval(advance, SLIDE_MS);
    return () => clearInterval(id);
  }, [advance]);

  /* ── Caption fade-in au montage ── */
  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* ── Lightbox Escape ── */
  useEffect(() => {
    if (!videoOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setVideoOpen(false); };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [videoOpen]);

  return (
    <>
      {/* ╔════════════════════════════════════════════════════╗
          ║  HERO — IMAGES PLEIN ÉCRAN (ISK-style)             ║
          ║  Aucun texte sur les images.                       ║
          ╚════════════════════════════════════════════════════╝ */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-[#0D1F6B]"
        style={{ height: "100svh", minHeight: 580, maxHeight: 1080 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label={
          locale === "fr"
            ? "Bienvenue aux Génies d'Afrique"
            : "Welcome to Les Génies d'Afrique"
        }
      >
        {/* ── Diaporama 3 images ── */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: bgY }}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={current}
              variants={SLIDE_V}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={SLIDES[current].src}
                alt=""
                fill
                className="object-cover"
                style={{ objectPosition: SLIDES[current].pos }}
                sizes="100vw"
                priority={current === 0}
                aria-hidden="true"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Vignette bords — profondeur uniquement ── */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 110% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.18) 100%)",
          }}
          aria-hidden="true"
        />

        {/* ── Fondu bas — pour les contrôles UI ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-36 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.26) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* ── Dots navigation — coin bas droit ── */}
        <div
          className="absolute bottom-8 right-8 flex items-center gap-2 z-20"
          role="tablist"
          aria-label={locale === "fr" ? "Navigation diaporama" : "Slideshow navigation"}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-500 ${
                i === current
                  ? "w-7 h-[3px] bg-white"
                  : "w-[3px] h-[3px] bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* ── Scroll indicator — bas centre ── */}
        <motion.div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 text-white/35"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          aria-hidden="true"
        >
          <ChevronDown size={20} className="animate-bounce" strokeWidth={1.5} />
        </motion.div>

        {/* ── Barre de progression slide ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] z-20 bg-black/15"
          aria-hidden="true"
        >
          <motion.div
            key={current}
            className="h-full bg-white/45"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
          />
        </div>
      </section>

      {/* ╔════════════════════════════════════════════════════╗
          ║  CAPTION BAND — sous le hero, fond bleu marine     ║
          ║  Titre · Sous-titre · CTAs · Bouton vidéo          ║
          ╚════════════════════════════════════════════════════╝ */}
      <motion.div
        className="bg-[#0D1F6B] text-white"
        variants={CAP_V}
        initial="hidden"
        animate={loaded ? "show" : "hidden"}
      >
        <div className="max-w-[1280px] mx-auto px-8 lg:px-16 py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            {/* Titre + sous-titre */}
            <div className="flex-1 min-w-0">
              <h1
                className="font-display font-bold text-white leading-tight mb-2"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}
              >
                {t("title")}
              </h1>
              <p
                className="text-white/60 leading-relaxed max-w-2xl"
                style={{ fontSize: "clamp(0.875rem, 1.4vw, 1rem)" }}
              >
                {t("subtitle")}
              </p>
            </div>

            {/* Actions droite */}
            <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
              {/* CTA principal */}
              <Link href="/admissions">
                <motion.span
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                    bg-[#D32F2F] text-white font-bold text-sm tracking-wide
                    shadow-[0_4px_20px_rgba(211,47,47,0.45)] cursor-pointer whitespace-nowrap"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 24 }}
                >
                  {t("ctaPrimary")}
                  <ArrowRight size={15} />
                </motion.span>
              </Link>

              {/* CTA secondaire */}
              <Link href="/presentation">
                <motion.span
                  className="inline-flex items-center px-6 py-3 rounded-lg
                    border border-white/30 text-white/80 font-medium text-sm
                    hover:border-white/60 hover:text-white cursor-pointer whitespace-nowrap
                    transition-colors duration-200"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 24 }}
                >
                  {t("ctaSecondary")}
                </motion.span>
              </Link>

              {/* Bouton Voir la vidéo — dans la caption band, pas sur le hero */}
              <motion.button
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg
                  bg-white/10 hover:bg-white/18 border border-white/20
                  hover:border-white/40 text-white/75 hover:text-white
                  font-medium text-sm transition-all duration-200 cursor-pointer
                  whitespace-nowrap"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 24 }}
                aria-label={
                  locale === "fr"
                    ? "Voir la vidéo de présentation"
                    : "Watch our presentation video"
                }
              >
                <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Play size={11} fill="white" className="text-white ml-0.5" />
                </span>
                {locale === "fr" ? "Voir la vidéo" : "Watch Video"}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ╔════════════════════════════════════════════════════╗
          ║  LIGHTBOX VIDÉO                                    ║
          ╚════════════════════════════════════════════════════╝ */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[100]
              flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setVideoOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={
              locale === "fr" ? "Vidéo de présentation" : "Presentation video"
            }
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-video"
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{ scale: 0.95,    opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={videoSrc}
                controls
                autoPlay
                className="w-full h-full rounded-2xl
                  shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
              />
            </motion.div>

            <button
              onClick={() => setVideoOpen(false)}
              aria-label={locale === "fr" ? "Fermer" : "Close"}
              className="absolute top-5 right-5 w-11 h-11 rounded-full
                bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20
                flex items-center justify-center text-white
                transition-colors duration-200"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
