"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  stars: number;
}

/* ── Animations ─────────────────────────────────────────────── */
const headerAnim: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const AUTOPLAY_DELAY = 6000;

/* ══════════════════════════════════════════════════════════════ */
export default function TestimonialsSection() {
  const t      = useTranslations("testimonials");
  const locale = useLocale();
  const items  = t.raw("items") as TestimonialItem[];

  const [current,   setCurrent]   = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused,    setPaused]    = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  /* ── Navigation ── */
  const goTo = useCallback((index: number, dir: 1 | -1) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const prev = useCallback(() => {
    goTo((current - 1 + items.length) % items.length, -1);
  }, [current, items.length, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % items.length, 1);
  }, [current, items.length, goTo]);

  /* ── Autoplay ── */
  useEffect(() => {
    if (paused || !inView) return;
    intervalRef.current = setInterval(next, AUTOPLAY_DELAY);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next, paused, inView]);

  /* ── Swipe tactile ── */
  const touchStartX = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) { next(); } else { prev(); }
    }
  };

  /* ── Labels aria i18n ── */
  const ariaLabelPrev = locale === "fr" ? "Témoignage précédent" : "Previous testimonial";
  const ariaLabelNext = locale === "fr" ? "Témoignage suivant"   : "Next testimonial";
  const ariaLabelGoto = (i: number) =>
    locale === "fr" ? `Aller au témoignage ${i + 1}` : `Go to testimonial ${i + 1}`;

  /* ── Variants directionnels ── */
  const directedSlide: Variants = {
    enter:  { opacity: 0, x: direction * 36 },
    center: { opacity: 1, x: 0, transition: { duration: 0.42, ease: "easeOut" } },
    exit:   { opacity: 0, x: direction * -28, transition: { duration: 0.28, ease: "easeIn" } },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-28 overflow-hidden"
      style={{ background: "linear-gradient(140deg, #1A3A8F 0%, #0F2A7A 45%, #0D1F6B 100%)" }}
      aria-label={locale === "fr" ? "Témoignages des parents" : "Parent testimonials"}
    >
      {/* ── Décorations de fond ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full
          border border-white/5" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full
          border border-white/5" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* ── En-tête ── */}
        <motion.div
          className="text-center mb-14"
          variants={headerAnim}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <SectionBadge variant="white">{t("badge")}</SectionBadge>
          <h2
            className="font-display font-bold text-white mt-1"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}
          >
            {t("title")}
          </h2>
        </motion.div>

        {/* ── Slider ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="relative max-w-3xl mx-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Carte témoignage */}
            <div
              className="bg-white/10 backdrop-blur-md rounded-3xl
                border border-white/15 shadow-[0_8px_40px_rgba(0,0,0,0.25)]
                overflow-hidden"
              style={{ minHeight: "280px" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current}
                  variants={directedSlide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="p-8 md:p-12"
                >
                  {/* Icône guillemets */}
                  <Quote
                    size={36}
                    className="text-[#F5A623] mb-5 opacity-90"
                    aria-hidden="true"
                  />

                  {/* Texte */}
                  <blockquote>
                    <p
                      className="font-display italic text-white/90 leading-relaxed mb-8"
                      style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
                    >
                      &ldquo;{items[current].text}&rdquo;
                    </p>

                    <footer>
                      {/* Étoiles */}
                      <div
                        className="flex gap-1 mb-3"
                        aria-label={`${items[current].stars} étoiles sur 5`}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < items[current].stars
                                ? "text-[#F5A623] fill-[#F5A623]"
                                : "text-white/20"
                            }
                            aria-hidden="true"
                          />
                        ))}
                      </div>

                      {/* Auteur */}
                      <div className="flex items-center gap-3">
                        {/* Avatar initial */}
                        <div
                          className="w-11 h-11 rounded-full bg-[#F5A623]/20
                            border-2 border-[#F5A623]/40 flex items-center
                            justify-center flex-shrink-0"
                          aria-hidden="true"
                        >
                          <span className="text-[#F5A623] font-bold text-base">
                            {items[current].name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <cite className="not-italic font-bold text-white text-sm block">
                            {items[current].name}
                          </cite>
                          <span className="text-white/55 text-xs">
                            {items[current].role}
                          </span>
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Barre de progression autoplay ── */}
            {!paused && (
              <div className="h-0.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                <motion.div
                  key={`progress-${current}`}
                  className="h-full bg-[#F5A623] origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTOPLAY_DELAY / 1000, ease: "linear" }}
                />
              </div>
            )}

            {/* ── Navigation ── */}
            <div
              className="flex items-center justify-center gap-5 mt-8"
              role="group"
              aria-label={locale === "fr" ? "Navigation témoignages" : "Testimonial navigation"}
            >
              {/* Précédent */}
              <button
                onClick={prev}
                aria-label={ariaLabelPrev}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/22
                  border border-white/15 flex items-center justify-center
                  text-white transition-all duration-200 hover:scale-105
                  focus-invert"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > current ? 1 : -1)}
                    aria-label={ariaLabelGoto(i)}
                    aria-current={i === current ? "true" : undefined}
                    className={`rounded-full transition-all duration-350 focus-invert ${
                      i === current
                        ? "w-8 h-2.5 bg-[#F5A623]"
                        : "w-2.5 h-2.5 bg-white/30 hover:bg-white/55"
                    }`}
                  />
                ))}
              </div>

              {/* Suivant */}
              <button
                onClick={next}
                aria-label={ariaLabelNext}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/22
                  border border-white/15 flex items-center justify-center
                  text-white transition-all duration-200 hover:scale-105
                  focus-invert"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
