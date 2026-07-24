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
import { Play, X, ArrowRight } from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   SLIDES — médias plein écran (cinématographiques 16:9 / full)
══════════════════════════════════════════════════════════════════ */
const SLIDES = [
  {
    src: "/pexels-ai25studioai-7342628.jpg",
    focus: "center 40%",
  },
  {
    src: "/images/Generated_Image.png",
    focus: "center center",
  },
] as const;

const SLIDE_DURATION = 6000; // ms par slide

/* ── Transitions Framer Motion ────────────────────────────────── */
const T_EASE: Transition = { duration: 0.75, ease: [0.22, 1, 0.36, 1] };

const SLIDE_VARIANTS: Variants = {
  enter:  { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1,   transition: { duration: 1.4, ease: "easeInOut" } },
  exit:   { opacity: 0, scale: 1.02, transition: { duration: 1.0, ease: "easeInOut" } },
};

const TEXT_STAGGER: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.16, delayChildren: 0.5 } },
};

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: T_EASE },
};

const FADE_DOWN: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.92 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: T_EASE },
};

/* ══════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const t      = useTranslations("hero");
  const locale = useLocale();

  const [current,    setCurrent]    = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [showVideo,  setShowVideo]  = useState(false);
  const [videoOpen,  setVideoOpen]  = useState(false);
  const [paused,     setPaused]     = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);

  const videoSrc = locale === "en" ? "/videos/VID-EN.mp4" : "/videos/VID-FR.mp4";

  /* ── Parallaxe ── */
  const { scrollY } = useScroll({ target: sectionRef });
  const bgY    = useTransform(scrollY, [0, 700], ["0%", "18%"]);
  const textY  = useTransform(scrollY, [0, 700], ["0%", "-12%"]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  /* ── Autoplay slides ── */
  const advance = useCallback(() => {
    if (!paused && !videoReady) setCurrent((c) => (c + 1) % SLIDES.length);
  }, [paused, videoReady]);

  useEffect(() => {
    const id = setInterval(advance, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [advance]);

  /* ── Vidéo en différé ── */
  useEffect(() => {
    const t = setTimeout(() => setShowVideo(true), 1800);
    return () => clearTimeout(t);
  }, []);

  /* ── Lightbox escape ── */
  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setVideoOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [videoOpen]);

  return (
    <>
      {/* ╔════════════════════════════════════════════════════╗
          ║  HERO — PLEIN ÉCRAN CINÉMATOGRAPHIQUE              ║
          ╚════════════════════════════════════════════════════╝ */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ height: "100svh", minHeight: 640, maxHeight: 1080 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label={t("badge")}
      >

        {/* ══ COUCHE 1 : MÉDIAS (priorité absolue) ══ */}

        {/* Vidéo en arrière-plan (chargée après 1.8s) */}
        {showVideo && (
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y: bgY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: videoReady ? 1 : 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              onCanPlay={() => setVideoReady(true)}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center 30%" }}
              aria-hidden="true"
            />
          </motion.div>
        )}

        {/* Diaporama images (pendant chargement vidéo ou si pas de vidéo) */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: bgY }}
          animate={{ opacity: videoReady ? 0 : 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={current}
              variants={SLIDE_VARIANTS}
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
                style={{ objectPosition: SLIDES[current].focus }}
                sizes="100vw"
                priority={current === 0}
                aria-hidden="true"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ══ COUCHE 2 : OVERLAYS DÉGRADÉS (texte lisible, médias visibles) ══ */}

        {/* Dégradé principal — bas lourd, haut léger */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: [
              /* Haut : transparence totale → légère couche */
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 25%,",
              /* Milieu : transition douce */
              "rgba(0,0,0,0.22) 50%,",
              /* Bas : dégradé profond pour le texte */
              "rgba(13,25,80,0.72) 78%, rgba(13,25,80,0.92) 100%)",
            ].join(""),
          }}
        />

        {/* Vignette subtile sur les côtés */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.22) 100%)",
          }}
        />

        {/* ══ COUCHE 3 : CONTENU TEXTE (superposé, aéré) ══ */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col justify-end"
          style={{ y: textY, opacity }}
        >
          <div className="max-w-[1280px] mx-auto w-full px-8 lg:px-16 pb-20 lg:pb-28">
            <motion.div
              variants={TEXT_STAGGER}
              initial="hidden"
              animate="show"
              className="max-w-3xl"
            >
              {/* Badge accréditation */}
              <motion.div variants={FADE_DOWN} className="mb-6">
                <span className="inline-flex items-center gap-2.5 px-4 py-1.5
                  rounded-full bg-white/10 backdrop-blur-md border border-white/20
                  text-white/90 text-xs font-bold uppercase tracking-[0.2em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" />
                  {t("badge")}
                </span>
              </motion.div>

              {/* Titre H1 — grande taille, Satoshi Bold */}
              <motion.h1
                variants={FADE_UP}
                className="font-display font-bold text-white leading-[1.05] mb-5
                  drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
                style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}
              >
                {t("title")}
              </motion.h1>

              {/* Sous-titre — plus léger */}
              <motion.p
                variants={FADE_UP}
                className="text-white/75 leading-relaxed mb-10 max-w-xl"
                style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)" }}
              >
                {t("subtitle")}
              </motion.p>

              {/* CTA — horizontal, aéré */}
              <motion.div
                variants={FADE_UP}
                className="flex flex-wrap items-center gap-4"
              >
                {/* Bouton primaire — rouge plein */}
                <Link href="/admissions">
                  <motion.span
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl
                      bg-[#D32F2F] text-white font-bold text-sm tracking-wide
                      shadow-[0_6px_32px_rgba(211,47,47,0.55)] cursor-pointer"
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 360, damping: 22 }}
                  >
                    {t("ctaPrimary")}
                    <ArrowRight size={16} />
                  </motion.span>
                </Link>

                {/* Bouton secondaire — contour blanc */}
                <Link href="/presentation">
                  <motion.span
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl
                      border-2 border-white/60 text-white font-semibold text-sm
                      backdrop-blur-sm cursor-pointer"
                    whileHover={{ scale: 1.03, y: -3, borderColor: "rgba(255,255,255,1)", backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 360, damping: 22 }}
                  >
                    {t("ctaSecondary")}
                  </motion.span>
                </Link>

                {/* Bouton vidéo — pill transparent */}
                <motion.button
                  onClick={() => setVideoOpen(true)}
                  className="inline-flex items-center gap-3 text-white/80
                    hover:text-white transition-colors duration-200 group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 360, damping: 22 }}
                  aria-label={locale === "fr" ? "Voir la vidéo de présentation" : "Watch our video"}
                >
                  <span className="relative flex items-center justify-center
                    w-12 h-12 rounded-full border-2 border-white/50
                    bg-white/10 group-hover:bg-white/20 group-hover:border-white
                    transition-all duration-300">
                    <Play size={14} fill="white" className="ml-0.5 text-white" />
                    {/* Pulse ring */}
                    <span className="absolute inset-0 rounded-full border-2
                      border-white/30 animate-ping" />
                  </span>
                  <span className="text-sm font-medium">
                    {locale === "fr" ? "Voir la vidéo" : "Watch Video"}
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* ══ COUCHE 4 : ÉLÉMENTS BAS D'ÉCRAN ══ */}

        {/* Dots slides (seulement sans vidéo) */}
        {!videoReady && (
          <div
            className="absolute bottom-8 right-8 lg:right-16 flex gap-2 z-20"
            role="tablist"
            aria-label="Diaporama"
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
                    ? "w-8 h-2 bg-white"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}

        {/* Indicateur de scroll — bas centre */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20
            flex flex-col items-center gap-2 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          {/* Souris animée SVG */}
          <div className="w-[22px] h-[34px] rounded-full border-[1.5px] border-white/35
            flex justify-center pt-[6px]">
            <motion.div
              className="w-[4px] h-[6px] rounded-full bg-white/60"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-[9px] font-medium uppercase tracking-[0.22em] mt-0.5">
            {t("scrollHint")}
          </span>
        </motion.div>

        {/* Barre de progression slide */}
        {!videoReady && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] z-20 bg-white/8">
            <motion.div
              key={current}
              className="h-full bg-white/40"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
            />
          </div>
        )}
      </section>

      {/* ╔════════════════════════════════════════════════════╗
          ║  LIGHTBOX VIDÉO                                    ║
          ╚════════════════════════════════════════════════════╝ */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setVideoOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={locale === "fr" ? "Vidéo de présentation" : "Presentation video"}
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-video"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{ scale: 0.94,    opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={videoSrc}
                controls
                autoPlay
                className="w-full h-full rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
              />
            </motion.div>

            <button
              onClick={() => setVideoOpen(false)}
              aria-label={locale === "fr" ? "Fermer" : "Close"}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10
                hover:bg-white/25 backdrop-blur-sm border border-white/20
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
