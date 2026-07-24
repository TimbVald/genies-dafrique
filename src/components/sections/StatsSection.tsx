"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
  type Transition,
} from "framer-motion";

/* ── Type statistique ────────────────────────────────────────── */
interface StatItem {
  value: string;
  suffix: string;
  label: string;
  sublabel: string;
  icon: string;
}

/* ── Animations ──────────────────────────────────────────────── */
const T: Transition = { duration: 0.65, ease: "easeOut" };

const headerAnim: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: T },
};

const gridAnim: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};

const statAnim: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: T },
};

/* ── Hook compteur easeOutQuart ──────────────────────────────── */
function useCounter(target: number, duration = 2000) {
  const [count,     setCount]     = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTriggered(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered || target === 0) return;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4); // easeOutQuart
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [triggered, target, duration]);

  return { count, ref };
}

/* ── Compteur individuel ─────────────────────────────────────── */
function StatCounter({
  item,
  index,
  inView,
}: {
  item: StatItem;
  index: number;
  inView: boolean;
}) {
  const numeric   = parseInt(item.value, 10);
  const isNumeric = !isNaN(numeric);
  const { count, ref } = useCounter(isNumeric ? numeric : 0, 1800 + index * 120);
  const display = isNumeric ? count : item.value;

  return (
    <motion.div
      ref={ref}
      variants={statAnim}
      className="group relative flex flex-col items-center text-center
        py-10 px-6 lg:px-8"
    >
      {/* Séparateur vertical entre items (desktop) */}
      {index > 0 && (
        <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-white/15
          hidden lg:block" />
      )}

      {/* Chiffre — très grand, dominateur */}
      <div className="flex items-baseline justify-center gap-1 mb-3">
        <span
          className="font-display font-bold text-white leading-none tabular-nums
            drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
        >
          {display}
        </span>
        {item.suffix && (
          <span
            className="font-display font-bold text-[#F5A623] leading-none"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            {item.suffix}
          </span>
        )}
      </div>

      {/* Ligne décorative or */}
      <motion.div
        className="h-[2px] bg-[#F5A623] rounded-full mb-4"
        initial={{ width: 0 }}
        animate={inView ? { width: "2.5rem" } : { width: 0 }}
        transition={{ delay: 0.4 + index * 0.1, duration: 0.5, ease: "easeOut" }}
      />

      {/* Label principal — blanc */}
      <p className="text-white font-bold text-base lg:text-lg leading-tight mb-1.5">
        {item.label}
      </p>

      {/* Sous-label — langue secondaire, discret */}
      <p className="text-white/45 text-xs italic tracking-wide">
        {item.sublabel}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   STATS SECTION — Grande image de fond + compteurs
══════════════════════════════════════════════════════════════════ */
export default function StatsSection() {
  const t     = useTranslations("stats");
  const items = t.raw("items") as StatItem[];

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  /* ── Parallaxe sur l'image de fond ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      /* Proportion cinématographique : plus grand que les cartes ordinaires */
      style={{ minHeight: "520px" }}
      aria-label={t("title")}
    >
      {/* ══ COUCHE 1 : GRANDE IMAGE DE FOND ══ */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, scale: 1.08 }}
      >
        <Image
          src="/images/pexels-ai25studioai-7342628.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
      </motion.div>

      {/* ══ COUCHE 2 : OVERLAY DÉGRADÉ — bleu profond semi-transparent ══ */}
      {/* L'image reste visible à travers l'overlay — c'est l'objectif */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,25,80,0.88) 0%, rgba(13,31,107,0.82) 50%, rgba(13,25,80,0.90) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Texture très légère */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      {/* ══ COUCHE 3 : CONTENU ══ */}
      <div className="relative z-20 py-20 lg:py-28 max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* En-tête centré — sobre */}
        <motion.div
          className="text-center mb-14 lg:mb-20"
          variants={headerAnim}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Ligne décorative */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12 bg-[#F5A623]/60" />
            <span className="text-[#F5A623] text-xs font-bold uppercase tracking-[0.22em]">
              {t("badge")}
            </span>
            <div className="h-px w-12 bg-[#F5A623]/60" />
          </div>

          <h2
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
          >
            {t("title")}
          </h2>

          <p className="text-white/50 mt-3 text-sm italic">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Grille de statistiques — large, aérée, ISK-style */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-5 gap-0"
          variants={gridAnim}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Contenant glassmorphism unificateur */}
          <div className="contents">
            {items.map((item, i) => (
              <StatCounter
                key={i}
                item={item}
                index={i}
                inView={inView}
              />
            ))}
          </div>
        </motion.div>

        {/* Ligne de bas */}
        <motion.div
          className="mt-14 lg:mt-20 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="h-px flex-1 bg-white/12" />
          <p className="text-white/30 text-xs italic text-center">
            Données 2025–2026 · Data 2025–2026
          </p>
          <div className="h-px flex-1 bg-white/12" />
        </motion.div>
      </div>

      {/* ══ Accent rouge en bas de section ══ */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] z-20"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #D32F2F 25%, #F5A623 50%, #D32F2F 75%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
