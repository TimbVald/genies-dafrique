"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  motion, useInView,
  type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import { getLang, getLangArray } from "@/lib/utils/getLang";
import { getPrograms } from "@/lib/data/programs";

/* ── Types ─────────────────────────────────────────────────────── */
import type { Program } from "@/types";
type CycleCard = Program & { flag: string; accent: string };

/* ── Animations ─────────────────────────────────────────────────── */
const hdrAnim: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const cardAnim: Variants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const gridAnim: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

/* ── CycleCard — style La Gaieté "Nos institutions" ──────────────── */
function CycleCard({
  prog, locale, ctaLabel,
}: {
  prog: CycleCard;
  locale: string;
  ctaLabel: string;
}) {
  const name      = getLang(prog.name,             locale);
  const shortDesc = getLang(prog.shortDescription, locale);
  const badge     = getLang(prog.badge,            locale);
  const features  = getLangArray(prog.features,    locale).slice(0, 3);

  const isFr = prog.section !== "anglophone";
  const accent = prog.accent;

  return (
    <motion.article
      variants={cardAnim}
      className="group relative rounded-2xl overflow-hidden cursor-pointer
        shadow-[0_4px_24px_rgba(0,0,0,0.10)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]
        transition-shadow duration-400"
      style={{ aspectRatio: "3/4" }}
    >
      {/* Image plein-fond */}
      <Image
        src={prog.image}
        alt={name}
        fill
        className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-in-out"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />

      {/* Overlay dégradé du bas — très sombre pour lisibilité */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to top,
            rgba(6,16,58,0.96) 0%,
            rgba(6,16,58,0.75) 30%,
            rgba(6,16,58,0.25) 60%,
            transparent 100%
          )`,
        }}
        aria-hidden="true"
      />

      {/* Badge section — haut gauche */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
            text-white text-xs font-bold uppercase tracking-wide backdrop-blur-sm"
          style={{ background: `${accent}cc` }}
        >
          <span className="text-base leading-none">
            {prog.section === "anglophone" ? "🇬🇧" : "🇫🇷"}
          </span>
          {badge}
        </span>
      </div>

      {/* Contenu bas — titre + desc + CTA */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5 lg:p-6">
        {/* Titre cycle */}
        <h3
          className="font-display font-bold text-white leading-tight mb-2"
          style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}
        >
          {name}
        </h3>

        {/* Description courte — visible au hover sur desktop, toujours sur mobile */}
        <p
          className="text-white/70 text-sm leading-relaxed mb-4
            max-h-0 overflow-hidden opacity-0
            group-hover:max-h-24 group-hover:opacity-100
            transition-all duration-500 ease-in-out
            sm:max-h-24 sm:opacity-100"
        >
          {shortDesc}
        </p>

        {/* CTA */}
        <Link
          href={`/programmes#${prog.slug}`}
          className="inline-flex items-center gap-2 text-white text-sm font-bold
            border-b border-white/40 hover:border-white pb-0.5
            transition-colors duration-200 group/link"
          onClick={e => e.stopPropagation()}
        >
          {ctaLabel}
          <ArrowRight
            size={14}
            className="group-hover/link:translate-x-1 transition-transform duration-200"
          />
        </Link>
      </div>

      {/* Trait de couleur en bas */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}88)` }}
        aria-hidden="true"
      />
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
export default function ProgramsSection() {
  const t       = useTranslations("programs");
  const locale  = useLocale();
  const allProgs = getPrograms();

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-60px" });

  /* Tous les programmes avec couleur d'accent */
  const cycleCards: CycleCard[] = allProgs.map(p => ({
    ...p,
    flag:    p.section === "anglophone" ? "🇬🇧" : "🇫🇷",
    accent:  p.section === "anglophone" ? "#D32F2F" : "#1A3A8F",
  }));

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-28 bg-white overflow-hidden"
    >
      {/* Décoration fond pois */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.020]"
        style={{
          backgroundImage: "radial-gradient(circle, #1A3A8F 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* ── En-tête ── */}
        <motion.div
          className="text-center mb-14 max-w-2xl mx-auto"
          variants={hdrAnim}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <SectionBadge>{t("badge")}</SectionBadge>
          <h2
            className="font-display font-bold text-[#0D1F6B] mt-1 mb-4"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}
          >
            {t("title")}
          </h2>
          <p className="text-[#4A5568] leading-relaxed">{t("subtitle")}</p>
        </motion.div>

        {/* ── Grille de cycles — style "Nos institutions" La Gaieté ── */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={gridAnim}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {cycleCards.map(prog => (
            <CycleCard
              key={prog.slug}
              prog={prog}
              locale={locale}
              ctaLabel={t("cta")}
            />
          ))}
        </motion.div>

        {/* ── Lien bas "Voir tous" ── */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Link
            href="/formations"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg
              bg-[#0D1F6B] text-white font-bold text-sm
              hover:bg-[#1A3A8F] transition-colors duration-200
              shadow-[0_4px_18px_rgba(13,31,107,0.30)] group"
          >
            {locale === "fr"
              ? "Voir toutes nos formations"
              : locale === "en"
              ? "View all our programs"
              : "A yen bikɔ́l nyonso"}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
