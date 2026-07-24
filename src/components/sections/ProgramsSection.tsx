"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  motion,
  useInView,
  AnimatePresence,
  type Variants,
  type Transition,
} from "framer-motion";
import { CheckCircle2, ArrowRight, BookOpen, Layers } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

/* ── Types ───────────────────────────────────────────────────── */
interface ProgramCard {
  id: string;
  flag: string;
  lang: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  levels: string[];
  strengths: string[];
  href: string;
  accentColor: string;
}

/* ── Animations ─────────────────────────────────────────────── */
const easeOut: Transition = { duration: 0.65, ease: "easeOut" };

const headerAnim: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: easeOut },
};

const cardLeftAnim: Variants = {
  hidden: { opacity: 0, x: -48 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const cardRightAnim: Variants = {
  hidden: { opacity: 0, x: 48 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const listAnim: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -14 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/* ── Composant carte programme ───────────────────────────────── */
function ProgramCard({
  card,
  index,
  levelsLabel,
  strengthsLabel,
  ctaLabel,
  ctaAdmissionsLabel,
  inView,
}: {
  card: ProgramCard;
  index: number;
  levelsLabel: string;
  strengthsLabel: string;
  ctaLabel: string;
  ctaAdmissionsLabel: string;
  inView: boolean;
}) {
  const [tab, setTab]         = useState<"levels" | "strengths">("levels");
  const [imgHovered, setImgHovered] = useState(false);

  const anim = index === 0 ? cardLeftAnim : cardRightAnim;

  // Couleur d'accent de la carte
  const accent = card.accentColor;
  const isBlue = accent === "#1A3A8F";

  return (
    <motion.article
      variants={anim}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="group relative bg-white rounded-3xl overflow-hidden
        shadow-[0_4px_32px_rgba(0,0,0,0.08)]
        border border-[#E2E8F0]
        flex flex-col"
    >
      {/* ══ IMAGE PLEINE LARGEUR avec zoom ══ */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "16/9" }}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: imgHovered ? 1.07 : 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        {/* Overlay dégradé bas */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top,
              ${accent}dd 0%,
              ${accent}55 40%,
              transparent 75%)`,
          }}
        />

        {/* Badge langue + drapeau */}
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <span
            className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full
              bg-white/95 backdrop-blur-sm shadow-md"
          >
            <span className="text-xl leading-none">{card.flag}</span>
            <span className="text-xs font-bold text-[#1A202C] uppercase tracking-wider">
              {card.lang}
            </span>
          </span>
        </div>

        {/* Badge section */}
        <div className="absolute top-5 right-5">
          <span
            className="px-3 py-1.5 rounded-full text-white text-xs font-bold
              uppercase tracking-wider backdrop-blur-sm"
            style={{ background: `${accent}cc` }}
          >
            {card.badge}
          </span>
        </div>

        {/* Titre et sous-titre sur l'image */}
        <div className="absolute bottom-0 left-0 right-0 p-7 pb-6">
          <h3
            className="font-display font-bold text-white leading-tight mb-1"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
          >
            {card.title}
          </h3>
          <p className="text-white/75 text-sm font-medium">
            {card.subtitle}
          </p>
        </div>
      </div>

      {/* ══ CORPS DE LA CARTE ══ */}
      <div className="flex flex-col flex-1 p-7 pt-6 gap-6">

        {/* Description */}
        <p className="text-[#4A5568] leading-relaxed text-[0.96rem]">
          {card.description}
        </p>

        {/* ── Onglets Niveaux / Points forts ── */}
        <div>
          {/* Boutons onglets */}
          <div className="flex gap-2 mb-4">
            {(["levels", "strengths"] as const).map((t) => {
              const Icon  = t === "levels" ? Layers : BookOpen;
              const label = t === "levels" ? levelsLabel : strengthsLabel;
              const active = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold
                    uppercase tracking-wide transition-all duration-200 ${
                    active
                      ? "text-white shadow-md"
                      : "bg-[#F7F9FC] text-[#4A5568] hover:bg-[#EEF2FF]"
                  }`}
                  style={active ? { background: accent } : {}}
                >
                  <Icon size={12} />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Contenu de l'onglet */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {tab === "levels" ? (
                /* Niveaux : pills colorées */
                <div className="flex flex-wrap gap-2">
                  {card.levels.map((level, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold border"
                      style={{
                        color: accent,
                        borderColor: `${accent}40`,
                        background: `${accent}0d`,
                      }}
                    >
                      {level}
                    </span>
                  ))}
                </div>
              ) : (
                /* Points forts : liste checkée */
                <motion.ul
                  className="space-y-2"
                  variants={listAnim}
                  initial="hidden"
                  animate="show"
                >
                  {card.strengths.map((s, i) => (
                    <motion.li
                      key={i}
                      variants={listItem}
                      className="flex items-start gap-2.5 text-sm text-[#4A5568]"
                    >
                      <CheckCircle2
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: accent }}
                      />
                      {s}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Ligne de séparation */}
        <div className="h-px bg-[#E2E8F0]" />

        {/* ── Boutons d'action ── */}
        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
          {/* Bouton principal "En savoir plus" */}
          <Link href={card.href} className="flex-1">
            <motion.span
              className="flex items-center justify-center gap-2 w-full
                py-3.5 rounded-xl text-white font-bold text-sm
                shadow-lg cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${accent} 0%, ${
                  isBlue ? "#2D5BE3" : "#B71C1C"
                } 100%)`,
                boxShadow: `0 4px 18px ${accent}45`,
              }}
              whileHover={{
                scale: 1.02,
                y: -2,
                boxShadow: `0 8px 28px ${accent}55`,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
            >
              {ctaLabel}
              <ArrowRight size={16} />
            </motion.span>
          </Link>

          {/* Bouton secondaire "S'inscrire" */}
          <Link href="/admissions">
            <motion.span
              className="flex items-center justify-center gap-2
                px-5 py-3.5 rounded-xl font-semibold text-sm
                border-2 cursor-pointer whitespace-nowrap"
              style={{
                color: accent,
                borderColor: `${accent}60`,
              }}
              whileHover={{
                scale: 1.02,
                y: -2,
                backgroundColor: `${accent}0d`,
                borderColor: accent,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
            >
              {ctaAdmissionsLabel}
            </motion.span>
          </Link>
        </div>
      </div>

      {/* Accent bordure gauche colorée */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl"
        style={{ background: accent }}
      />
    </motion.article>
  );
}

/* ══════════════════════════════════════════════════════════════ */
export default function ProgramsSection() {
  const t     = useTranslations("programs");
  const cards = t.raw("cards") as ProgramCard[];

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#F7F9FC] overflow-hidden"
    >
      {/* ── Décoration de fond ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px
          pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(26,58,143,0.2), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-px
          pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(211,47,47,0.2), transparent)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* ── En-tête ── */}
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          variants={headerAnim}
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
          <p className="text-[#4A5568] leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* ── Deux grandes cartes ── */}
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-10">
          {cards.map((card, i) => (
            <ProgramCard
              key={card.id}
              card={card}
              index={i}
              levelsLabel={t("levels")}
              strengthsLabel={t("strengths")}
              ctaLabel={t("cta")}
              ctaAdmissionsLabel={t("ctaAdmissions")}
              inView={inView}
            />
          ))}
        </div>

        {/* ── Bandeau de réassurance bas ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center
            gap-4 sm:gap-8 text-center"
        >
          {[
            { emoji: "✅", text: "Agréé MINEDUB 2025 · MINEDUB Accredited" },
            { emoji: "🌍", text: "Bilingue FR & EN dès la crèche · Bilingual from Day Care" },
            { emoji: "📚", text: "Petits effectifs · Small class sizes" },
          ].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-sm text-[#4A5568] font-medium"
            >
              <span>{item.emoji}</span>
              {item.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
