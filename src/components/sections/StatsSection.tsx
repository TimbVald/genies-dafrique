"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { getStatistics, getStatisticsConfig } from "@/lib/data/home";
import type { LocalizedText } from "@/types";
import {
  motion, useInView, useScroll, useTransform, type Variants,
} from "framer-motion";

interface StatItem {
  value: string;
  suffix: string;
  label: LocalizedText;
  sublabel: LocalizedText;
  icon: string;
}

const gridAnim: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};
const statAnim: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/**
 * useCounter — anime un nombre de 0 à target.
 * FIX : le déclenchement est contrôlé par la prop `trigger` (boolean)
 * passée depuis le parent, qui utilise useInView de Framer Motion.
 * Plus de IntersectionObserver interne qui peut manquer le premier rendu.
 */
function useCounter(target: number, duration = 1800, trigger = false) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current || target === 0) return;
    started.current = true;

    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      // Easing ease-out-quart
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);

  return count;
}

function StatCard({
  item, index, trigger, locale,
}: {
  item: StatItem;
  index: number;
  trigger: boolean;
  locale: string;
}) {
  const numeric = parseInt(item.value, 10);
  const isNum   = !isNaN(numeric);
  const count   = useCounter(isNum ? numeric : 0, 1600 + index * 100, trigger);
  const display = isNum ? count : item.value;

  return (
    <motion.div
      variants={statAnim}
      className="relative flex flex-col items-center text-center py-10 px-4 lg:px-8"
    >
      {/* Séparateur vertical desktop */}
      {index > 0 && (
        <div className="absolute left-0 top-8 bottom-8 w-px bg-white/15 hidden lg:block" />
      )}

      {/* Chiffre */}
      <div className="flex items-baseline justify-center gap-0.5 mb-3 leading-none">
        <span
          className="font-display font-bold text-white tabular-nums
            drop-shadow-[0_2px_12px_rgba(0,0,0,0.40)]"
          style={{ fontSize: "clamp(3.0rem, 6vw, 5.2rem)" }}
        >
          {display}
        </span>
        {item.suffix && (
          <span
            className="font-display font-bold text-[#F5A623]
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.30)]"
            style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.8rem)" }}
          >
            {item.suffix}
          </span>
        )}
      </div>

      {/* Tiret doré animé */}
      <motion.div
        className="h-[2px] bg-[#F5A623] rounded-full mb-3"
        initial={{ width: 0 }}
        animate={trigger ? { width: "2rem" } : { width: 0 }}
        transition={{ delay: 0.4 + index * 0.1, duration: 0.45, ease: "easeOut" }}
      />

      <p
        className="text-white font-bold leading-snug mb-1
          drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]"
        style={{ fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)" }}
      >
        {item.label[locale as keyof typeof item.label] || item.label.fr}
      </p>
      <p className="text-white/48 text-[0.72rem] italic">
        {item.sublabel[locale as keyof typeof item.sublabel] || item.sublabel.fr}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  const t           = useTranslations("stats");
  const locale      = useLocale();
  const statsConfig = getStatisticsConfig();
  const items       = getStatistics();

  const sectionRef = useRef<HTMLElement>(null);
  /*
   * FIX BUG COMPTEURS :
   * - once: true  → ne déclenche qu'une fois
   * - margin: "-40px"  → déclenche légèrement avant d'être pleinement visible
   * - amount: 0.1  → dès que 10% de la section est visible
   */
  const inView = useInView(sectionRef, {
    once:   true,
    margin: "-40px",
    amount: 0.1,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: "460px" }}
      aria-label={statsConfig.title[locale as keyof typeof statsConfig.title]}
    >
      {/* Image fond parallaxe */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: 1.1 }}>
        <Image
          src="/images/pexels-ai25studioai-7342628.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
      </motion.div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(13,25,80,0.50) 0%, rgba(13,31,107,0.58) 55%, rgba(13,25,80,0.65) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Ligne dorée top */}
      <div
        className="absolute top-0 inset-x-0 h-[3px] z-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, #F5A623 30%, #D32F2F 50%, #F5A623 70%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-20 py-16 lg:py-22 max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* En-tête */}
        <motion.div
          className="text-center mb-10 lg:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-10 bg-[#F5A623]/70" />
            <span
              className="text-[#F5A623] text-xs font-bold uppercase tracking-[0.22em]
                drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]"
            >
              {statsConfig.badge[locale as keyof typeof statsConfig.badge]}
            </span>
            <div className="h-px w-10 bg-[#F5A623]/70" />
          </div>
          <h2
            className="font-display font-bold text-white leading-tight
              drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]"
            style={{ fontSize: "clamp(1.55rem, 2.8vw, 2.5rem)" }}
          >
            {statsConfig.title[locale as keyof typeof statsConfig.title]}
          </h2>
        </motion.div>

        {/* Grille compteurs */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-5"
          variants={gridAnim}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {items.map((item, i) => (
            <StatCard
              key={item.id}
              item={item}
              index={i}
              trigger={inView}  /* ← FIX : trigger contrôlé par Framer Motion */
              locale={locale}
            />
          ))}
        </motion.div>

        {/* Ligne données */}
        <motion.div
          className="mt-10 lg:mt-12 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <div className="h-px flex-1 bg-white/12" />
          <p className="text-white/32 text-xs italic">
            Données 2025–2026 · Data 2025–2026
          </p>
          <div className="h-px flex-1 bg-white/12" />
        </motion.div>
      </div>

      {/* Ligne colorée bas */}
      <div
        className="absolute bottom-0 inset-x-0 h-[3px] z-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, #D32F2F 25%, #F5A623 50%, #D32F2F 75%, transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
