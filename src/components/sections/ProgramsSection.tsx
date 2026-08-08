"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
} from "framer-motion";
import { CheckCircle2, ArrowRight, BookOpen, Layers, ChevronRight } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import { getPrograms } from "@/lib/data/programs";
import { getLang, getLangArray } from "@/lib/utils/getLang";

const easeOut: Transition = { duration: 0.65, ease: "easeOut" };

const headerAnim: Variants = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: easeOut } };
const cardAnim:   Variants = { hidden: { opacity: 0, y: 40, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } } };
const listAnim:   Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const listItem:   Variants = { hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } } };

/* ── Composant ProgramCard ─────────────────────────────────────────── */
function ProgramCard({ prog, index, locale, ctaLabel, levelsLabel, strengthsLabel, inView }: {
  prog: ReturnType<typeof getPrograms>[0];
  index: number;
  locale: string;
  ctaLabel: string;
  levelsLabel: string;
  strengthsLabel: string;
  inView: boolean;
}) {
  const [tab, setTab]           = useState<"levels" | "strengths">("levels");
  const [imgHovered, setHovered] = useState(false);

  const accent   = prog.section === "anglophone" ? "#D32F2F" : "#1A3A8F";
  const gradEnd  = prog.section === "anglophone" ? "#B71C1C" : "#2D5BE3";
  const bgLight  = prog.section === "anglophone" ? "#FFF0F0" : "#EEF2FF";
  const name        = getLang(prog.name,             locale);
  const badge       = getLang(prog.badge,            locale);
  const shortDesc   = getLang(prog.shortDescription, locale);
  const description = getLang(prog.description,      locale);
  const features    = getLangArray(prog.features,    locale);

  return (
    <motion.article
      variants={cardAnim}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      id={prog.slug}
      className="group relative bg-white rounded-3xl overflow-hidden
        shadow-[0_4px_40px_rgba(0,0,0,0.09)] border border-[#E2E8F0] flex flex-col"
    >
      {/* Barre accent gauche */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl" style={{ background: accent }} />

      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <motion.div className="absolute inset-0"
          animate={{ scale: imgHovered ? 1.07 : 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}>
          <Image src={prog.image} alt={name} fill className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw" />
        </motion.div>

        {/* Overlay dégradé */}
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${accent}e0 0%, ${accent}60 38%, transparent 72%)` }} />

        {/* Badge langue */}
        <div className="absolute top-4 left-4">
          <span className="flex items-center gap-2 pl-2.5 pr-4 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-md">
            <span className="text-xl leading-none">{prog.section === "anglophone" ? "🇬🇧" : "🇫🇷"}</span>
            <span className="text-xs font-bold text-[#1A202C] uppercase tracking-wider">
              {prog.section === "anglophone" ? "EN" : "FR"}
            </span>
          </span>
        </div>

        {/* Badge section */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm"
            style={{ background: `${accent}cc` }}>
            {badge}
          </span>
        </div>

        {/* Titre sur l'image */}
        <div className="absolute bottom-0 left-0 right-0 p-7 pb-6">
          <h3 className="font-display font-bold text-white leading-tight mb-1"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
            {name}
          </h3>
          <p className="text-white/75 text-sm font-medium">{shortDesc}</p>
        </div>
      </div>

      {/* Corps de la carte */}
      <div className="flex flex-col flex-1 p-7 pt-5 gap-5">
        <p className="text-[#4A5568] leading-relaxed text-[0.95rem]">{description}</p>

        {/* Onglets */}
        <div>
          <div className="flex gap-2 mb-4">
            {(["levels", "strengths"] as const).map(tabKey => {
              const Icon  = tabKey === "levels" ? Layers : BookOpen;
              const label = tabKey === "levels" ? levelsLabel : strengthsLabel;
              const active = tab === tabKey;
              return (
                <button key={tabKey} onClick={() => setTab(tabKey)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold
                    uppercase tracking-wide transition-all duration-200 ${
                    active ? "text-white shadow-md" : "bg-[#F7F9FC] text-[#4A5568] hover:bg-[#EEF2FF]"
                  }`}
                  style={active ? { background: accent } : {}}>
                  <Icon size={12} />{label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22, ease: "easeOut" }}>
              {tab === "levels" ? (
                <div className="flex flex-wrap gap-2">
                  {[badge].map((level, i) => (
                    <span key={i} className="px-3.5 py-1.5 rounded-full text-xs font-semibold border"
                      style={{ color: accent, borderColor: `${accent}40`, background: `${accent}0d` }}>
                      {level}
                    </span>
                  ))}
                </div>
              ) : (
                <motion.ul className="space-y-2" variants={listAnim} initial="hidden" animate="show">
                  {features.map((s, i) => (
                    <motion.li key={i} variants={listItem}
                      className="flex items-start gap-2.5 text-sm text-[#4A5568]">
                      <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: accent }} />
                      {s}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <Link href={`/programmes#${prog.slug}`} className="w-full">
            <motion.span
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
                text-white font-bold text-sm shadow-lg cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${accent} 0%, ${gradEnd} 100%)`, boxShadow: `0 4px 18px ${accent}45` }}
              whileHover={{ scale: 1.02, y: -2, boxShadow: `0 8px 28px ${accent}55` }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}>
              {ctaLabel}
              <ArrowRight size={16} />
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
export default function ProgramsSection() {
  const t       = useTranslations("programs");
  const locale  = useLocale();
  const programs = getPrograms();

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  /* Niveaux courts pour la bande bas */
  const LEVELS = [
    { ageFr: "0–2 ans",   ageEn: "0–2 yrs",  nameFr: "Crèche",    nameEn: "Day Care" },
    { ageFr: "2–5 ans",   ageEn: "2–5 yrs",  nameFr: "Maternelle",nameEn: "Nursery"  },
    { ageFr: "5–12 ans",  ageEn: "5–12 yrs", nameFr: "Primaire",  nameEn: "Primary"  },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #F7F9FC 0%, #FAFBFF 50%, #F7F9FC 100%)" }}>

      {/* Lignes décoratives */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(26,58,143,0.18), transparent)" }} />
      <div className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(211,47,47,0.18), transparent)" }} />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* En-tête */}
        <motion.div className="text-center mb-6 max-w-2xl mx-auto"
          variants={headerAnim} initial="hidden" animate={inView ? "show" : "hidden"}>
          <SectionBadge>{t("badge")}</SectionBadge>
          <h2 className="font-display font-bold text-[#1A202C] mt-1 mb-4"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}>
            {t("title")}
          </h2>
          <p className="text-[#4A5568] leading-relaxed">{t("subtitle")}</p>
        </motion.div>

        {/* Bande niveaux scolaires — style La Gaieté "nos institutions" */}
        <motion.div
          className="flex justify-center gap-3 flex-wrap mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}>
          {LEVELS.map((lv, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white
              border border-[#E2E8F0] shadow-sm text-sm">
              <span className="font-bold text-[#1A3A8F]">{locale === "en" ? lv.nameEn : lv.nameFr}</span>
              <span className="text-[#A0AEC0] text-xs">·</span>
              <span className="text-[#4A5568] text-xs">{locale === "en" ? lv.ageEn : lv.ageFr}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A3A8F] text-white
            border border-[#1A3A8F] shadow-sm text-sm">
            <ChevronRight size={14} />
            <span className="font-bold text-xs">{locale === "en" ? "Bilingual FR + EN" : "Bilingue FR + EN"}</span>
          </div>
        </motion.div>

        {/* Grille 2 grandes cartes */}
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-10">
          {programs.slice(0, 2).map((prog, i) => (
            <ProgramCard key={prog.id} prog={prog} index={i} locale={locale}
              ctaLabel={t("cta")} levelsLabel={t("levels")} strengthsLabel={t("strengths")} inView={inView} />
          ))}
        </div>

        {/* Bandeau de réassurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="mt-12 py-5 px-8 rounded-2xl flex flex-col sm:flex-row items-center
            justify-center gap-5 sm:gap-10 bg-white border border-[#E2E8F0] shadow-sm">
          {[
            { emoji: "✅", fr: "Agréé MINEDUB 2025",      en: "MINEDUB Accredited 2025"      },
            { emoji: "🌍", fr: "Bilingue FR & EN",         en: "Bilingual FR & EN"             },
            { emoji: "📚", fr: "Petits effectifs",         en: "Small class sizes"             },
            { emoji: "🏆", fr: "Projets innovants",        en: "Innovative projects"           },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-sm text-[#4A5568] font-medium">
              <span>{item.emoji}</span>
              {locale === "en" ? item.en : item.fr}
            </span>
          ))}
        </motion.div>

        {/* Lien voir tous les programmes */}
        <motion.div className="text-center mt-8"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.5 }}>
          <Link href="/programmes"
            className="inline-flex items-center gap-2 text-[#1A3A8F] font-bold text-sm
              hover:text-[#D32F2F] transition-colors duration-200 group">
            {locale === "en" ? "View all programs" : "Voir tous les programmes"}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
