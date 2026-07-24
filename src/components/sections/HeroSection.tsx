"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, AnimatePresence, type Variants, type Transition } from "framer-motion";
import { Play, GraduationCap, Globe, Shield } from "lucide-react";

/* ── Slides (image fallback + vidéo) ─────────────────────────── */
const SLIDES = [
  "/images/IMG-20260723-WA0006.jpg",
  "/images/IMG-20260723-WA0039.jpg",
  "/images/IMG-20260723-WA0012.jpg",
  "/images/IMG-20260722-WA0048.jpg",
];

/* ── Transition spring partagée ──────────────────────────────── */
const springTransition: Transition = { type: "spring", stiffness: 380, damping: 28 };
const fadeTransition:   Transition = { duration: 0.7, ease: "easeOut" };

/* ── Variants Framer Motion ───────────────────────────────────── */
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: fadeTransition },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: -12 },
  show:   { opacity: 1, scale: 1,    y: 0,  transition: fadeTransition },
};

const overlayVariants: Variants = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: { duration: 1.2, ease: "easeInOut" } as Transition },
  exit:   { opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } as Transition },
};

/* ── Composant principal ─────────────────────────────────────── */
export default function HeroSection() {
  const t      = useTranslations("hero");
  const locale = useLocale();

  const [current,     setCurrent]     = useState(0);
  const [videoReady,  setVideoReady]  = useState(false);
  const [showVideo,   setShowVideo]   = useState(false);
  const [videoOpen,   setVideoOpen]   = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);

  /* ── Parallaxe au scroll ── */
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ["0%", "22%"]);

  /* ── Sélection vidéo selon locale ── */
  const videoSrc = locale === "en" ? "/videos/VID-EN.mp4" : "/videos/VID-FR.mp4";

  /* ── Autoplay diaporama ── */
  useEffect(() => {
    const id = setInterval(() => {
      if (!showVideo) setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(id);
  }, [showVideo]);

  /* ── Charger la vidéo en différé (après 1.5s) ── */
  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  /* ── Fermer lightbox avec Echap ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setVideoOpen(false); };
    if (videoOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [videoOpen]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════ */}
      {/*  HERO SECTION                                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ height: "100svh", minHeight: 600, maxHeight: 960 }}
      >
        {/* ── Fond vidéo (chargé en différé) ── */}
        {showVideo && (
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y: bgY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              onCanPlay={() => setVideoReady(true)}
              className="absolute inset-0 w-full h-full object-cover object-center scale-105"
              aria-hidden="true"
            />
          </motion.div>
        )}

        {/* ── Diaporama images (affiché tant que vidéo non prête) ── */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: bgY }}
          animate={{ opacity: videoReady ? 0 : 1 }}
          transition={{ duration: 1.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={overlayVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={SLIDES[current]}
                alt=""
                fill
                className="object-cover object-center scale-105"
                sizes="100vw"
                priority={current === 0}
                aria-hidden="true"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Overlay multicouche ── */}
        {/* Couche 1 : dégradé directionnel (gauche→droite bleu/rouge) */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(120deg, rgba(13,31,107,0.88) 0%, rgba(13,31,107,0.65) 50%, rgba(183,28,28,0.45) 100%)",
          }}
        />
        {/* Couche 2 : fondu bas (pour les éléments du bas) */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(13,31,107,0.75) 0%, transparent 45%)",
          }}
        />
        {/* Couche 3 : grain subtil */}
        <div
          className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "180px",
          }}
        />

        {/* ── Contenu principal (centré verticalement) ── */}
        <motion.div
          className="relative z-20 text-center px-6 max-w-5xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Badge d'excellence */}
          <motion.div variants={badgeVariants} className="flex justify-center mb-7">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full
              bg-white/12 backdrop-blur-md border border-white/25 text-white
              text-xs font-bold uppercase tracking-[0.18em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse flex-shrink-0" />
              {t("badge")}
            </span>
          </motion.div>

          {/* Titre H1 */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold text-white leading-[1.1] mb-6"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 5rem)" }}
          >
            {t("title")}
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            variants={itemVariants}
            className="text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
          >
            {t("subtitle")}
          </motion.p>

          {/* Boutons CTA */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Bouton primaire */}
            <Link href="/admissions">
              <motion.span
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl
                  bg-[#D32F2F] text-white font-bold text-base tracking-wide
                  shadow-[0_6px_28px_rgba(211,47,47,0.50)] cursor-pointer select-none"
                whileHover={{ scale: 1.04, y: -2, boxShadow: "0 10px 36px rgba(211,47,47,0.55)" }}
                whileTap={{ scale: 0.97 }}
                transition={springTransition}
              >
                {t("ctaPrimary")}
              </motion.span>
            </Link>

            {/* Bouton secondaire */}
            <Link href="/presentation">
              <motion.span
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl
                  border-2 border-white/65 text-white font-semibold text-base
                  backdrop-blur-sm cursor-pointer select-none"
                whileHover={{ scale: 1.04, y: -2, backgroundColor: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.9)" }}
                whileTap={{ scale: 0.97 }}
                transition={springTransition}
              >
                {t("ctaSecondary")}
              </motion.span>
            </Link>

            {/* Bouton Watch Video */}
            <motion.button
              onClick={() => setVideoOpen(true)}
              className="inline-flex items-center gap-2.5 text-white/80 font-medium text-sm
                hover:text-white transition-colors duration-200 group"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={springTransition}
            >
              <span className="w-10 h-10 rounded-full border-2 border-white/50 group-hover:border-white
                flex items-center justify-center transition-colors duration-200 bg-white/10">
                <Play size={14} className="ml-0.5" fill="white" />
              </span>
              {locale === "fr" ? "Voir la vidéo" : "Watch Video"}
            </motion.button>
          </motion.div>

          {/* Badges de confiance */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            {[
              { icon: Shield,        label: locale === "fr" ? "Agréé MINEDUB"     : "MINEDUB Accredited" },
              { icon: Globe,         label: locale === "fr" ? "Bilingue FR / EN"  : "Bilingual FR / EN" },
              { icon: GraduationCap, label: locale === "fr" ? "De la crèche au CM2" : "Day Care to Primary" },
            ].map(({ icon: Icon, label }, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                  bg-white/10 backdrop-blur-sm border border-white/15 text-white/85
                  text-xs font-medium"
              >
                <Icon size={13} className="text-[#F5A623]" />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Dots diaporama (uniquement sans vidéo) ── */}
        {!videoReady && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`transition-all duration-400 rounded-full ${
                  i === current
                    ? "w-8 h-2 bg-white"
                    : "w-2 h-2 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}

        {/* ── Scroll indicator ── */}
        <motion.div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20
            flex flex-col items-center gap-1.5 text-white/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.7 }}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
            {t("scrollHint")}
          </span>
          {/* Souris animée */}
          <div className="w-5 h-8 rounded-full border-2 border-white/40 flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-1.5 rounded-full bg-white/70"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* ── Barre de progression slide (durée 5.5s) ── */}
        {!videoReady && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
            <motion.div
              key={current}
              className="h-full bg-[#F5A623]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5.5, ease: "linear" }}
            />
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  LIGHTBOX VIDÉO                                        */}
      {/* ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 bg-black/92 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-video"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              exit={{ scale: 0.9,    opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={videoSrc}
                controls
                autoPlay
                className="w-full h-full rounded-2xl object-cover shadow-2xl"
              />

              {/* Bouton fermer */}
              <button
                onClick={() => setVideoOpen(false)}
                aria-label={locale === "fr" ? "Fermer la vidéo" : "Close video"}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white/15
                  hover:bg-white/30 flex items-center justify-center text-white
                  transition-colors duration-200 backdrop-blur-sm border border-white/20"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
