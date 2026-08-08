"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { getStatistics, getStatisticsConfig } from "@/lib/data/home";
import type { LocalizedText } from "@/types";
import {
  motion, useInView, useScroll, useTransform, type Variants,
} from "framer-motion";

interface StatItem { value: string; suffix: string; label: LocalizedText; sublabel: LocalizedText; icon: string; }

const gridAnim: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const statAnim: Variants = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };

function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [on, setOn]       = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!on || target === 0) return;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [on, target, duration]);
  return { count, ref };
}

function StatCard({ item, index, inView, locale }: {
  item: StatItem; index: number; inView: boolean; locale: string;
}) {
  const numeric = parseInt(item.value, 10);
  const isNum   = !isNaN(numeric);
  const { count, ref } = useCounter(isNum ? numeric : 0, 1600 + index * 120);
  const display = isNum ? count : item.value;

  return (
    <motion.div ref={ref} variants={statAnim}
      className="relative flex flex-col items-center text-center py-10 px-4 lg:px-8 group">
      {index > 0 && <div className="absolute left-0 top-6 bottom-6 w-px bg-white/18 hidden lg:block" />}

      {/* Chiffre principal */}
      <div className="flex items-baseline justify-center gap-0.5 mb-3 leading-none">
        <span className="font-display font-bold text-white tabular-nums drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          style={{ fontSize: "clamp(3.2rem, 6.5vw, 5.5rem)" }}>
          {display}
        </span>
        {item.suffix && (
          <span className="font-display font-bold text-[#F5A623] drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
            {item.suffix}
          </span>
        )}
      </div>

      {/* Tiret doré */}
      <motion.div className="h-[2px] bg-[#F5A623] rounded-full mb-3"
        initial={{ width: 0 }}
        animate={inView ? { width: "2rem" } : { width: 0 }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.45, ease: "easeOut" }} />

      <p className="text-white font-bold leading-snug mb-1 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]"
        style={{ fontSize: "clamp(0.85rem, 1.4vw, 1rem)" }}>
        {item.label[locale as keyof typeof item.label] || item.label.fr}
      </p>
      <p className="text-white/50 text-xs italic drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
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
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ minHeight: "480px" }}
      aria-label={statsConfig.title[locale as keyof typeof statsConfig.title] || t("title")}>

      {/* Image fond parallaxe */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: 1.1 }}>
        <Image src="/images/pexels-ai25studioai-7342628.jpg" alt="" fill
          className="object-cover object-center" sizes="100vw" aria-hidden="true" />
      </motion.div>

      {/* Overlay — laisse l'image visible */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(13,25,80,0.52) 0%, rgba(13,31,107,0.56) 55%, rgba(13,25,80,0.65) 100%)" }}
        aria-hidden="true" />

      {/* Ligne dorée top */}
      <div className="absolute top-0 inset-x-0 h-[3px] z-20"
        style={{ background: "linear-gradient(90deg, transparent, #F5A623 30%, #D32F2F 50%, #F5A623 70%, transparent)" }} />

      <div className="relative z-20 py-16 lg:py-24 max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* En-tête */}
        <motion.div className="text-center mb-10 lg:mb-16"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-10 bg-[#F5A623]/70" />
            <span className="text-[#F5A623] text-xs font-bold uppercase tracking-[0.22em]
              drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
              {statsConfig.badge[locale as keyof typeof statsConfig.badge] || t("badge")}
            </span>
            <div className="h-px w-10 bg-[#F5A623]/70" />
          </div>
          <h2 className="font-display font-bold text-white leading-tight
            drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}>
            {statsConfig.title[locale as keyof typeof statsConfig.title] || t("title")}
          </h2>
        </motion.div>

        {/* Grille stats */}
        <motion.div className="grid grid-cols-2 lg:grid-cols-5"
          variants={gridAnim} initial="hidden" animate={inView ? "show" : "hidden"}>
          {items.map((item, i) => (
            <StatCard key={i} item={item} index={i} inView={inView} locale={locale} />
          ))}
        </motion.div>

        {/* Ligne bas */}
        <motion.div className="mt-10 lg:mt-14 flex items-center gap-4"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.6 }}>
          <div className="h-px flex-1 bg-white/15" />
          <p className="text-white/35 text-xs italic drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            Données 2025–2026 · Data 2025–2026
          </p>
          <div className="h-px flex-1 bg-white/15" />
        </motion.div>
      </div>

      {/* Ligne colorée bas */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] z-20"
        style={{ background: "linear-gradient(90deg, transparent, #D32F2F 25%, #F5A623 50%, #D32F2F 75%, transparent)" }}
        aria-hidden="true" />
    </section>
  );
}
