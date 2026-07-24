"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, type Variants, type Transition } from "framer-motion";
import {
  Users, GraduationCap, Calendar, Star, Zap,
  type LucideIcon,
} from "lucide-react";

/* ── Icônes disponibles ──────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  Users, GraduationCap, Calendar, Star, Zap,
};

/* ── Type d'une statistique ─────────────────────────────────── */
interface StatItem {
  value: string;
  suffix: string;
  label: string;
  sublabel: string;
  icon: string;
}

/* ── Animations ─────────────────────────────────────────────── */
const ease: Transition  = { duration: 0.6, ease: "easeOut" };

const headerAnim: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: ease },
};

const gridAnim: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};

const cardAnim: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: ease },
};

/* ── Hook compteur animé ─────────────────────────────────────── */
function useCounter(target: number, duration = 1800) {
  const [count,     setCount]     = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Déclencher via IntersectionObserver
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Animer le compteur quand déclenché
  useEffect(() => {
    if (!triggered || target === 0) return;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutQuart — courbe rapide puis ralentissement
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [triggered, target, duration]);

  return { count, ref };
}

/* ── Sous-composant : une carte statistique ─────────────────── */
function StatCard({ item, index }: { item: StatItem; index: number }) {
  const numeric = parseInt(item.value, 10);
  const isNumeric = !isNaN(numeric);

  const { count, ref } = useCounter(isNumeric ? numeric : 0);

  const Icon = ICON_MAP[item.icon] ?? Users;

  // Affichage : valeur numérique animée ou valeur brute
  const displayValue = isNumeric ? count : item.value;

  return (
    <motion.div
      variants={cardAnim}
      ref={ref}
      className="group relative flex flex-col items-center text-center
        px-6 py-10 rounded-2xl overflow-hidden cursor-default"
    >
      {/* ── Fond de la carte ── */}
      {/* Séparateur vertical (affiché entre les cartes, pas à gauche de la 1ère) */}
      {index > 0 && (
        <div className="absolute left-0 top-8 bottom-8 w-px bg-white/10" />
      )}

      {/* Halo d'icône centré en fond (décoratif) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(245,166,35,0.12), transparent)",
        }}
      />

      {/* ── Icône ── */}
      <motion.div
        className="relative w-14 h-14 rounded-2xl mb-5 flex items-center justify-center
          bg-white/10 border border-white/15
          group-hover:bg-[#F5A623]/20 group-hover:border-[#F5A623]/40
          transition-all duration-300"
        whileHover={{ rotate: 6, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
      >
        <Icon
          size={24}
          className="text-white/70 group-hover:text-[#F5A623] transition-colors duration-300"
          strokeWidth={1.8}
        />
      </motion.div>

      {/* ── Chiffre animé ── */}
      <div className="flex items-end justify-center gap-0.5 mb-2">
        <span
          className="font-display font-bold text-white leading-none tabular-nums"
          style={{ fontSize: "clamp(2.8rem, 5vw, 4.2rem)" }}
        >
          {displayValue}
        </span>
        {item.suffix && (
          <span
            className="font-display font-bold text-[#F5A623] pb-1"
            style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)" }}
          >
            {item.suffix}
          </span>
        )}
      </div>

      {/* ── Ligne décorative ── */}
      <div className="w-10 h-0.5 bg-[#F5A623]/50 rounded-full mb-3
        group-hover:w-16 group-hover:bg-[#F5A623] transition-all duration-400" />

      {/* ── Label principal ── */}
      <p className="text-white font-semibold text-base leading-tight mb-1">
        {item.label}
      </p>

      {/* ── Sous-label (langue secondaire) ── */}
      <p className="text-white/45 text-xs italic">
        {item.sublabel}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
export default function StatsSection() {
  const t     = useTranslations("stats");
  const items = t.raw("items") as StatItem[];

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* ── Fond principal dégradé ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1A3A8F 0%, #0F2A7A 40%, #0D1F6B 100%)",
        }}
      />

      {/* ── Texture de fond : grille de points ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Demi-cercle décoratif gauche ── */}
      <div
        className="absolute -left-32 top-1/2 -translate-y-1/2
          w-64 h-64 rounded-full border border-white/5 pointer-events-none"
      />
      <div
        className="absolute -left-16 top-1/2 -translate-y-1/2
          w-64 h-64 rounded-full border border-white/5 pointer-events-none"
      />

      {/* ── Demi-cercle décoratif droit ── */}
      <div
        className="absolute -right-32 top-1/2 -translate-y-1/2
          w-64 h-64 rounded-full border border-white/5 pointer-events-none"
      />

      {/* ── Accent rouge bas ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #D32F2F 30%, #F5A623 50%, #D32F2F 70%, transparent 100%)",
        }}
      />

      {/* ── Contenu ── */}
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* En-tête */}
        <motion.div
          className="text-center mb-16"
          variants={headerAnim}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-white/10 border border-white/15 backdrop-blur-sm
            text-white/80 text-xs font-bold uppercase tracking-[0.16em] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" />
            {t("badge")}
          </span>

          <h2
            className="font-display font-bold text-white mb-3 block"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}
          >
            {t("title")}
          </h2>
          <p className="text-white/55 text-base italic">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Grille de statistiques */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-5 gap-2 relative"
          variants={gridAnim}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Fond commun pour la grille (effet glass card) */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(4px)",
            }}
          />

          {items.map((item, i) => (
            <StatCard key={i} item={item} index={i} />
          ))}
        </motion.div>

        {/* Mention éditoriale bas */}
        <motion.p
          className="text-center text-white/30 text-xs mt-10 italic"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          * Données de l&apos;année scolaire 2025–2026 ·
          Data from school year 2025–2026
        </motion.p>
      </div>
    </section>
  );
}
