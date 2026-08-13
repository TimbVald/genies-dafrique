"use client";

import { useRef } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Monitor, Library, Sprout, Droplets,
  Dumbbell, Users, ArrowRight,
  type LucideIcon,
} from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import { getExcellencePoles } from "@/lib/data/home";

/* ── Map icône : nom string → composant Lucide ──────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  Monitor, Library, Sprout, Droplets, Dumbbell, Users,
};

/* ── Animations ──────────────────────────────────────────────────── */
const hdrV: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const gridV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const cardV: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * ExcellenceSection — 6 pôles d'excellence / infrastructures.
 * Données lues depuis src/data/home/excellence.ts via getExcellencePoles().
 * Textes de l'en-tête via useTranslations("excellenceSection").
 * Pour ajouter/modifier un pôle, éditer uniquement le fichier de données.
 */
export default function ExcellenceSection() {
  const t      = useTranslations("excellenceSection");
  const locale = useLocale();
  const L      = locale as "fr" | "en" | "ew";

  const poles  = getExcellencePoles();         // ← données

  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-24 lg:py-28 bg-[#F7F9FC] overflow-hidden">

      {/* Décoration fond */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage: "radial-gradient(circle, #1A3A8F 1.5px, transparent 1.5px)",
          backgroundSize: "34px 34px",
        }}
        aria-hidden="true"
      />
      {/* Ligne top */}
      <div
        className="absolute top-0 inset-x-0 h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #1A3A8F 30%, #2D5BE3 50%, #1A3A8F 70%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* En-tête — via i18n */}
        <motion.div
          className="text-center mb-14 max-w-2xl mx-auto"
          variants={hdrV}
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
          <p className="text-[#4A5568] leading-relaxed">{t("subtitle")}</p>
        </motion.div>

        {/* Grille 6 pôles */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={gridV}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {poles.map((pole, i) => {
            const Icon  = ICON_MAP[pole.icon] ?? Monitor;
            const title = pole.title[L] || pole.title.fr;
            const desc  = pole.desc[L]  || pole.desc.fr;

            return (
              <motion.div
                key={pole.id}
                variants={cardV}
                className="group bg-white rounded-2xl p-6 border border-[#E2E8F0]
                  shadow-sm hover:shadow-xl hover:-translate-y-1.5
                  transition-all duration-300 flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Barre couleur haut */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${pole.color}, ${pole.color}88)`,
                  }}
                  aria-hidden="true"
                />

                {/* Icône */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0
                    group-hover:scale-110 group-hover:rotate-2 transition-all duration-300"
                  style={{ backgroundColor: pole.bg }}
                >
                  <Icon size={26} style={{ color: pole.color }} strokeWidth={1.8} />
                </div>

                {/* Texte */}
                <div className="flex-1">
                  <h3 className="font-display font-bold text-[#1A202C] text-[1rem] mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed">{desc}</p>
                </div>

                {/* Lien */}
                <Link
                  href={pole.href}
                  className="inline-flex items-center gap-1.5 text-sm font-bold
                    transition-colors duration-200 group/link mt-auto"
                  style={{ color: pole.color }}
                >
                  {t("learnMore")}
                  <ArrowRight
                    size={14}
                    className="group-hover/link:translate-x-1 transition-transform duration-200"
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
