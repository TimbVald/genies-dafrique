"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useInView,
  type Variants,
  type Transition,
} from "framer-motion";
import {
  Globe,
  Shield,
  Trophy,
  Heart,
  Lightbulb,
  Palette,
  ShieldCheck,
  Plane,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

/* ── Icônes disponibles ──────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  Shield,
  Trophy,
  Heart,
  Lightbulb,
  Palette,
  ShieldCheck,
  Plane,
};

/* ── Couleurs d'accent par index (8 cartes) ─────────────────── */
const ACCENTS = [
  { bg: "#EEF2FF", icon: "#1A3A8F", border: "#1A3A8F", glow: "rgba(26,58,143,0.15)" },   // Bleu
  { bg: "#FFF0F0", icon: "#D32F2F", border: "#D32F2F", glow: "rgba(211,47,47,0.12)" },    // Rouge
  { bg: "#FFF8EE", icon: "#F5A623", border: "#F5A623", glow: "rgba(245,166,35,0.15)" },   // Or
  { bg: "#FFF0F6", icon: "#C2185B", border: "#C2185B", glow: "rgba(194,24,91,0.12)" },    // Rose
  { bg: "#F0F4FF", icon: "#2D5BE3", border: "#2D5BE3", glow: "rgba(45,91,227,0.12)" },    // Bleu clair
  { bg: "#F0FFF4", icon: "#2E7D32", border: "#2E7D32", glow: "rgba(46,125,50,0.12)" },    // Vert
  { bg: "#EEF2FF", icon: "#1A3A8F", border: "#1A3A8F", glow: "rgba(26,58,143,0.15)" },   // Bleu
  { bg: "#FFF8F0", icon: "#E65100", border: "#E65100", glow: "rgba(230,81,0,0.12)" },     // Orange
];

/* ── Animations Framer Motion ───────────────────────────────── */
const sectionEase: Transition = { duration: 0.65, ease: "easeOut" };

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: sectionEase },
};

const gridVariants: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show:   {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

/* ══════════════════════════════════════════════════════════════ */
export default function WhyUsSection() {
  const t     = useTranslations("whyUs");
  const items = t.raw("items") as { icon: string; title: string; body: string }[];

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #F7F9FC 0%, #FFFFFF 50%, #F7F9FC 100%)" }}
    >
      {/* ── Décorations de fond ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Cercle déco haut-droit */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(26,58,143,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Cercle déco bas-gauche */}
        <div
          className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(211,47,47,0.10) 0%, transparent 70%)",
          }}
        />
        {/* Grille de points subtile */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1A3A8F 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* ── En-tête de section ── */}
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <SectionBadge>{t("badge")}</SectionBadge>
          <h2
            className="font-display font-bold text-[#1A202C] mt-1 mb-4"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}
          >
            {t("title")}
          </h2>
          <p className="text-[#4A5568] leading-relaxed text-[1rem]">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* ── Grille 8 cartes ── */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={gridVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {items.map((item, i) => {
            const Icon   = ICON_MAP[item.icon] ?? Globe;
            const accent = ACCENTS[i % ACCENTS.length];

            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.025,
                  boxShadow: `0 20px 48px ${accent.glow}`,
                  transition: { type: "spring", stiffness: 340, damping: 22 },
                }}
                className="group relative bg-white rounded-2xl p-7 cursor-default
                  border border-[#E2E8F0] shadow-[0_2px_12px_rgba(0,0,0,0.05)]
                  overflow-hidden flex flex-col gap-4"
              >
                {/* Barre d'accent top */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: accent.border }}
                />

                {/* Fond décoratif en coin */}
                <div
                  className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full
                    opacity-0 group-hover:opacity-100 transition-all duration-500
                    group-hover:scale-150"
                  style={{ background: accent.bg }}
                />

                {/* Icône */}
                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center
                    flex-shrink-0 transition-all duration-300
                    group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: accent.bg }}
                >
                  <Icon
                    size={26}
                    style={{ color: accent.icon }}
                    strokeWidth={1.8}
                  />
                  {/* Halo animé au hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 scale-110"
                    style={{
                      boxShadow: `0 0 0 6px ${accent.bg}`,
                    }}
                  />
                </div>

                {/* Contenu */}
                <div className="relative">
                  <h3
                    className="font-display font-bold text-[#1A202C] text-[1.05rem] mb-2
                      leading-snug transition-colors duration-200"
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>

                {/* Numéro décoratif */}
                <div
                  className="absolute top-4 right-5 font-display font-bold text-4xl
                    leading-none select-none transition-all duration-300
                    opacity-5 group-hover:opacity-15 group-hover:scale-110"
                  style={{ color: accent.border }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Bandeau résumé bas ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="mt-14 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)",
          }}
        >
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 px-2">
            {[
              {
                value: "FR + EN",
                labelFr: "Bilinguisme intégral",
                labelEn: "Full bilingualism",
              },
              {
                value: "2025",
                labelFr: "Agrément MINEDUB",
                labelEn: "MINEDUB Accreditation",
              },
              {
                value: "0 – 12",
                labelFr: "Ans, de la crèche au CM2",
                labelEn: "Years, from day care to Grade 6",
              },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center py-7 px-4 text-center">
                <span
                  className="font-display font-bold text-[#F5A623] mb-1"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
                >
                  {stat.value}
                </span>
                <span className="text-white/75 text-sm">{stat.labelFr}</span>
                <span className="text-white/40 text-xs italic mt-0.5">
                  {stat.labelEn}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
