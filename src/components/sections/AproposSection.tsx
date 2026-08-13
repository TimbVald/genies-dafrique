"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { getAproposSectionData, type StatCardData } from "@/lib/data/home";
import {
  motion, useInView, type Variants,
} from "framer-motion";
import { Home, Award, Eye, ArrowUp, Trophy } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

const ease = { duration: 0.6, ease: "easeOut" as const };
const fadeUp: Variants = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: ease } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };

/* ── Count-up animation hook ───────────────────────────────────────── */
function useCounter(target: number, duration = 1500, trigger = false) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current || target === 0) return;
    started.current = true;

    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);

  return count;
}

/* ── Icon mapping ──────────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  Home,
  Award,
  Eye,
};

/* ── Stat Card Component ──────────────────────────────────────────── */
function StatCard({
  item, index, trigger, locale,
}: {
  item: StatCardData;
  index: number;
  trigger: boolean;
  locale: string;
}) {
  const Icon = ICON_MAP[item.icon] || Trophy;
  const numeric = parseInt(item.value, 10);
  const isNum = !isNaN(numeric);
  const count = useCounter(isNum ? numeric : 0, 1400 + index * 150, trigger);
  const display = isNum ? count : item.value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: item.isHighlighted ? "0 12px 32px rgba(26,58,143,0.25)" : "0 8px 24px rgba(0,0,0,0.12)" }}
      className={`relative rounded-2xl p-6 transition-all duration-300 ${
        item.isHighlighted
          ? "bg-[#1A3A8F] text-white shadow-lg"
          : "bg-white border border-[#E2E8F0] shadow-md"
      }`}
    >
      {/* Icon */}
      <div className={`flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
        item.isHighlighted ? "bg-white/20" : "bg-[#EEF2FF]"
      }`}>
        <Icon size={24} className={item.isHighlighted ? "text-white" : "text-[#1A3A8F]" } />
      </div>

      {/* Number */}
      <div className="flex items-baseline gap-1 mb-2">
        <span className={`font-display font-bold leading-none ${
          item.isHighlighted ? "text-white" : "text-[#1A3A8F]"
        }`} style={{ fontSize: "2.25rem" }}>
          {display}
        </span>
        {item.suffix && (
          <span className={`font-display font-bold leading-none ${
            item.isHighlighted ? "text-[#F5A623]" : "text-[#F5A623]"
          }`} style={{ fontSize: "1.5rem" }}>
            {item.suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <p className={`text-sm font-semibold leading-snug ${
        item.isHighlighted ? "text-white/95" : "text-[#1A202C]"
      }`}>
        {item.label[locale as keyof typeof item.label] || item.label.fr}
      </p>
    </motion.div>
  );
}

/* ── Back to Top Button Component ───────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      transition={{ duration: 0.25 }}
      onClick={scrollToTop}
      aria-label="Retour en haut / Back to top"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#1A3A8F] text-white shadow-lg hover:bg-[#0D1F6B] hover:shadow-xl transition-all duration-300 flex items-center justify-center"
    >
      <ArrowUp size={20} />
    </motion.button>
  );
}

/* ── Main Apropos Section Component ────────────────────────────────── */
export default function AproposSection() {
  const t = useTranslations("apropos");
  const locale = useLocale();
  const data = getAproposSectionData();

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px", amount: 0.2 });

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-20 lg:py-28 bg-white overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-50"
          style={{ background: "radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 70%)", transform: "translate(40%, -40%)" }} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none opacity-50"
          style={{ background: "radial-gradient(circle, rgba(26,58,143,0.04) 0%, transparent 70%)", transform: "translate(-40%, 40%)" }} />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            {/* ════════════════════════════════════════════════
                COLONNE 1 (GAUCHE) — Texte ~40%
            ═══════════════════════════════════════════════════ */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-5 space-y-6"
            >
              {/* Eyebrow */}
              <SectionBadge>{data.eyebrow[locale as keyof typeof data.eyebrow]}</SectionBadge>

              {/* Title */}
              <h2
                className="font-display font-bold text-[#1A202C] leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
              >
                {data.title[locale as keyof typeof data.title]}
              </h2>

              {/* Paragraph */}
              <p className="text-[#4A5568] leading-relaxed text-[0.95rem]">
                {data.paragraph[locale as keyof typeof data.paragraph]}
              </p>

              {/* Key points - simple bullet list */}
              <ul className="space-y-3 pt-2">
                {data.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#1A3A8F] mt-2 flex-shrink-0" />
                    <span className="text-[#1A202C] font-semibold text-sm leading-relaxed">
                      {point[locale as keyof typeof point]}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ════════════════════════════════════════════════
                COLONNE 2 (CENTRE) — 3 cartes stats empilées
            ═══════════════════════════════════════════════════ */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-4 flex flex-col gap-4 lg:ml-8"
            >
              {data.statistics.map((stat, i) => (
                <StatCard
                  key={i}
                  item={stat}
                  index={i}
                  trigger={inView}
                  locale={locale}
                />
              ))}
            </motion.div>

            {/* ════════════════════════════════════════════════
                COLONNE 3 (DROITE) — Photo unique
            ═══════════════════════════════════════════════════ */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-3 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5"
                style={{ aspectRatio: "3/4" }}>
                <Image
                  src={data.photo}
                  alt={locale === "fr" ? "Directrice de l'école" : "School Director"}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 25vw"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Back to top button */}
      <BackToTop />
    </>
  );
}
