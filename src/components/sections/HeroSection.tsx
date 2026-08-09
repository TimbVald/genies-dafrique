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
  Trophy, Globe, BookOpen, ShieldCheck,
} from "lucide-react";
import { getHeroSlides, getHeroContent, getHeroConfig } from "@/lib/data/home";

/* ── Data ────────────────────────────────────────────────────── */
const SLIDES   = getHeroSlides();
const CFG      = getHeroConfig();
const SLIDE_MS = CFG.slideDuration;
const TRANS_S  = CFG.transitionDuration;

/* ── Slide crossfade ─────────────────────────────────────────── */
const slideTV: Transition = { duration: TRANS_S / 1000, ease: "easeInOut" };
const SLIDE_V: Variants = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: slideTV },
  exit:   { opacity: 0, transition: { duration: (TRANS_S * 0.6) / 1000, ease: "easeInOut" } },
};

/* ── 4 piliers La Gaieté ─────────────────────────────────────── */
const PILLARS = [
  {
    icon: Trophy,
    fr: { title: "Excellence Académique",    desc: "Enseignement rigoureux, résultats d'exception à chaque niveau." },
    en: { title: "Academic Excellence",       desc: "Rigorous teaching, outstanding results at every level." },
    ew: { title: "Nyɔ́ñ ya Akom",             desc: "Akom ya mbɔ́g, bikɔ́l bya mvoé na nkan nyonso." },
  },
  {
    icon: Globe,
    fr: { title: "Ouverture Internationale", desc: "Bilinguisme FR/EN intégral dès la crèche." },
    en: { title: "International Outlook",     desc: "Full FR/EN bilingualism from day care." },
    ew: { title: "Bilinguisme",               desc: "Bilingue FR/EN a tɔ́l crèche." },
  },
  {
    icon: BookOpen,
    fr: { title: "Innovation & Pédagogie",   desc: "Agriculture, entrepreneuriat et outils numériques." },
    en: { title: "Innovation & Pedagogy",     desc: "Farming, entrepreneurship and digital tools." },
    ew: { title: "Minlɔ́m & Akom",            desc: "Agriculture, entrepreneuriat na technologies." },
  },
  {
    icon: ShieldCheck,
    fr: { title: "Encadrement & Valeurs",    desc: "Bienveillance, discipline et épanouissement de chaque enfant." },
    en: { title: "Care & Values",             desc: "Well-being, discipline and fulfilment of every child." },
    ew: { title: "A yen mwana",              desc: "Mvoé, mbɔ́g na mfañ ya mwana nyonso." },
  },
];

/* ── Animation variants ──────────────────────────────────────── */
const heroContentV: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
  },
};
const heroSubV: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.75 },
  },
};
const ctasV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 1.0 },
  },
};
const pillarsContainerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 1.15 } },
};
const pillarV: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ══════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const t      = useTranslations("hero");
  const locale = useLocale();
  const L      = locale as "fr" | "en" | "ew";

  const [current,   setCurrent]   = useState(0);
  const [paused,    setPaused]    = useState(false);
  const [loaded,    setLoaded]    = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const videoSrc   = locale === "en" ? "/videos/VID-EN.mp4" : "/videos/VID-FR.mp4";

  /* ── Parallaxe scroll ── */
  const { scrollY } = useScroll({ target: sectionRef });
  const bgY = useTransform(scrollY, [0, 600], ["0%", "12%"]);

  /* ── Auto-avance ── */
  const advance = useCallback(() => {
    if (!paused && CFG.autoplay) setCurrent(c => (c + 1) % SLIDES.length);
  }, [paused]);

  useEffect(() => {
    const id = setInterval(advance, SLIDE_MS);
    return () => clearInterval(id);
  }, [advance]);

  /* ── Chargement initial ── */
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
      {/* ════════════════════════════════════════════════════════
          HERO FULLSCREEN — La Gaieté composition :
          - Image plein écran en fond
          - Overlay dégradé sombre multicouche
          - Contenu centré : logo + titre + slogan + CTAs
          - 4 piliers de confiance en bande vitrée en bas
      ═══════════════════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-[#06103A]"
        style={{ height: "100svh", minHeight: 640, maxHeight: 1100 }}
        onMouseEnter={() => CFG.pauseOnHover && setPaused(true)}
        onMouseLeave={() => CFG.pauseOnHover && setPaused(false)}
        aria-label={
          locale === "fr"
            ? "Bienvenue aux Génies d'Afrique"
            : "Welcome to Les Génies d'Afrique"
        }
      >
        {/* ─────────────────────────────────────────────────────
            COUCHE 1 — Diaporama Ken Burns en fond
        ───────────────────────────────────────────────────── */}
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
            COUCHE 2 — Overlays multicouches sophistiqués
            Objectif : image encore visible (30-40%)
            tout en garantissant lisibilité du texte blanc
        ───────────────────────────────────────────────────── */}

        {/* Obscurcissement global de base */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "rgba(6,16,58,0.52)" }}
          aria-hidden="true"
        />
        {/* Dégradé dramatique du bas — pour la bande piliers */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(6,16,58,0.97) 0%, rgba(6,16,58,0.80) 18%, rgba(6,16,58,0.40) 38%, transparent 62%)",
          }}
          aria-hidden="true"
        />
        {/* Vignette bords — profondeur */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 95% at 50% 50%, transparent 50%, rgba(6,16,58,0.45) 100%)",
          }}
          aria-hidden="true"
        />

        {/* ─────────────────────────────────────────────────────
            COUCHE 3 — Ligne dorée top + bas
        ───────────────────────────────────────────────────── */}
        <div
          className="absolute top-0 inset-x-0 h-[3px] z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #F5A623 30%, #FFD700 50%, #F5A623 70%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* ─────────────────────────────────────────────────────
            COUCHE 4 — Contenu principal
        ───────────────────────────────────────────────────── */}
        <div className="absolute inset-0 z-20 flex flex-col">

          {/* Zone centrale — logo + texte + CTAs */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pb-8">

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={loaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="mb-6"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden
                ring-4 ring-white/25 shadow-[0_8px_40px_rgba(0,0,0,0.50)] mx-auto">
                <Image
                  src="/logo/logo.png"
                  alt="Les Génies d'Afrique"
                  fill
                  className="object-cover"
                  sizes="96px"
                  priority
                />
              </div>
            </motion.div>

            {/* Pré-titre institutionnel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={loaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-px w-8 bg-[#F5A623]" />
              <span className="text-[#F5A623] text-[0.7rem] font-bold uppercase tracking-[0.28em]">
                {locale === "fr"
                  ? "Complexe Scolaire Bilingue · Nkozoa, Yaoundé"
                  : locale === "en"
                  ? "Bilingual School Complex · Nkozoa, Yaoundé"
                  : "Sukul Bilingue · Nkozoa, Yaoundé"}
              </span>
              <div className="h-px w-8 bg-[#F5A623]" />
            </motion.div>

            {/* Titre H1 — grand, centré, dominant */}
            <motion.h1
              variants={heroContentV}
              initial="hidden"
              animate={loaded ? "show" : "hidden"}
              className="font-display font-bold text-white leading-[1.06] mb-5
                drop-shadow-[0_4px_32px_rgba(0,0,0,0.60)] max-w-4xl mx-auto"
              style={{ fontSize: "clamp(2.2rem, 6vw, 4.8rem)" }}
            >
              {t("title")}
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              variants={heroSubV}
              initial="hidden"
              animate={loaded ? "show" : "hidden"}
              className="text-white/72 leading-relaxed max-w-2xl mx-auto mb-8
                drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
              style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}
            >
              {t("subtitle")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={ctasV}
              initial="hidden"
              animate={loaded ? "show" : "hidden"}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
            >
              {/* CTA principal — rouge vif */}
              <Link href="/formations">
                <motion.span
                  className="inline-flex items-center justify-center gap-2.5
                    px-8 py-4 rounded-xl bg-[#D32F2F] text-white font-bold
                    text-sm tracking-wide cursor-pointer whitespace-nowrap
                    shadow-[0_6px_32px_rgba(211,47,47,0.55)]"
                  whileHover={{
                    scale: 1.04, y: -3,
                    boxShadow: "0 12px_40px rgba(211,47,47,0.65)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                >
                  {t("ctaPrimary")}
                  <ArrowRight size={16} />
                </motion.span>
              </Link>

              {/* CTA secondaire — outline blanc */}
              <Link href="/a-propos">
                <motion.span
                  className="inline-flex items-center justify-center gap-2.5
                    px-8 py-4 rounded-xl border-2 border-white/55 text-white
                    font-semibold text-sm cursor-pointer whitespace-nowrap
                    backdrop-blur-sm hover:border-white hover:bg-white/10
                    transition-all duration-200"
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                >
                  {t("ctaSecondary")}
                </motion.span>
              </Link>

              {/* Bouton vidéo — icône ronde */}
              <motion.button
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center gap-3 px-5 py-4 rounded-xl
                  bg-white/12 hover:bg-white/22 backdrop-blur-sm
                  border border-white/22 hover:border-white/45
                  text-white font-medium text-sm cursor-pointer whitespace-nowrap
                  transition-all duration-200"
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                aria-label={locale === "fr" ? "Voir la vidéo de présentation" : "Watch presentation video"}
              >
                <span
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center
                    flex-shrink-0 shadow-md"
                >
                  <Play size={13} fill="#D32F2F" className="text-[#D32F2F] ml-0.5" />
                </span>
                <span>
                  {locale === "fr" ? "Voir la vidéo" : locale === "en" ? "Watch Video" : "Yiba video"}
                </span>
              </motion.button>
            </motion.div>

            {/* Badge accréditation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={loaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex items-center gap-2"
            >
              <ShieldCheck size={14} className="text-[#F5A623]" />
              <span className="text-white/50 text-xs font-semibold uppercase tracking-[0.16em]">
                {locale === "fr"
                  ? "Agréé MINEDUB 2025 · Bilingue FR / EN · Nkozoa, Yaoundé"
                  : locale === "en"
                  ? "MINEDUB Accredited 2025 · Bilingual FR / EN · Nkozoa, Yaoundé"
                  : "Agréé MINEDUB 2025 · Bilingue FR / EN · Nkozoa, Yaoundé"}
              </span>
            </motion.div>
          </div>

          {/* ─────────────────────────────────────────────────
              BANDE DES 4 PILIERS — style La Gaieté exact
              Fond sombre semi-transparent, séparateurs,
              icône + titre + description, hover lumineux
          ───────────────────────────────────────────────── */}
          <motion.div
            className="w-full flex-shrink-0"
            style={{ background: "rgba(6,16,58,0.88)", backdropFilter: "blur(16px)" }}
            variants={pillarsContainerV}
            initial="hidden"
            animate={loaded ? "show" : "hidden"}
          >
            {/* Ligne de séparation lumineuse */}
            <div
              className="h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(245,166,35,0.40) 20%, rgba(255,255,255,0.15) 50%, rgba(245,166,35,0.40) 80%, transparent 100%)",
              }}
            />

            <div className="max-w-[1280px] mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {PILLARS.map(({ icon: Icon, fr, en, ew: ew_ }, i) => {
                  const pillar = L === "en" ? en : L === "ew" ? ew_ : fr;
                  return (
                    <motion.div
                      key={i}
                      variants={pillarV}
                      className="group relative flex items-start gap-4 px-6 py-5 lg:py-6
                        border-r border-b lg:border-b-0 border-white/[0.08]
                        last:border-r-0 hover:bg-white/[0.06] transition-colors duration-300
                        cursor-default"
                    >
                      {/* Trait vertical gauche doré au hover */}
                      <div
                        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "#F5A623" }}
                      />

                      {/* Icône */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center
                          flex-shrink-0 mt-0.5 transition-all duration-300
                          group-hover:scale-110"
                        style={{ background: "rgba(245,166,35,0.15)" }}
                      >
                        <Icon size={20} className="text-[#F5A623]" />
                      </div>

                      {/* Texte */}
                      <div className="min-w-0">
                        <p className="text-white font-bold text-sm leading-snug mb-1
                          group-hover:text-[#F5A623] transition-colors duration-300">
                          {pillar.title}
                        </p>
                        <p className="text-white/45 text-[0.72rem] leading-relaxed line-clamp-2">
                          {pillar.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─────────────────────────────────────────────────────
            Contrôles slide
        ───────────────────────────────────────────────────── */}

        {/* Dots */}
        <div
          className="absolute z-30 flex flex-col items-center gap-1.5"
          style={{ right: "1.5rem", top: "50%", transform: "translateY(-50%)" }}
          role="tablist"
          aria-label={locale === "fr" ? "Diaporama" : "Slideshow"}
        >
          <div className="h-10 w-px bg-white/20 mb-1" />
          {SLIDES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-400 ${
                i === current
                  ? "h-7 w-[3px] bg-[#F5A623]"
                  : "h-[4px] w-[4px] bg-white/35 hover:bg-white/65"
              }`}
            />
          ))}
          <div className="h-10 w-px bg-white/20 mt-1" />
          <span className="text-white/30 text-[10px] font-bold tabular-nums mt-1">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="text-white/15 text-[9px]">
            /{SLIDES.length.toString().padStart(2, "0")}
          </span>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute z-30 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ bottom: "calc(var(--pillar-h, 90px) + 1.5rem)" }}
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 2.0, duration: 0.7 }}
          aria-hidden="true"
        >
          <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">
            {t("scrollHint")}
          </span>
          <ChevronDown size={16} className="text-white/30 animate-bounce" strokeWidth={1.5} />
        </motion.div>

        {/* Barre de progression slide */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] z-30 bg-white/8"
          aria-hidden="true"
        >
          <motion.div
            key={current}
            className="h-full bg-[#F5A623]"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
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
