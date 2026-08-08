"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  motion, useInView, type Variants, type Transition,
} from "framer-motion";
import {
  Globe, Shield, Trophy, Heart, Lightbulb,
  Palette, ShieldCheck, Plane,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

const ICON_MAP: Record<string, LucideIcon> = {
  Globe, Shield, Trophy, Heart, Lightbulb, Palette, ShieldCheck, Plane,
};

const T: Transition  = { duration: 0.6, ease: "easeOut" };
const hdrV: Variants = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: T } };
const grdV: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } };
const crdV: Variants = { hidden: { opacity: 0, y: 32, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } };

/* Couleurs d'accent par index */
const ACCENTS = [
  { light: "#EEF2FF", icon: "#1A3A8F", border: "rgba(26,58,143,0.25)"  },
  { light: "#FFF0F0", icon: "#D32F2F", border: "rgba(211,47,47,0.25)"  },
  { light: "#FFF8EE", icon: "#F5A623", border: "rgba(245,166,35,0.25)" },
  { light: "#F0FFF4", icon: "#2E7D32", border: "rgba(46,125,50,0.25)"  },
  { light: "#F0F4FF", icon: "#2D5BE3", border: "rgba(45,91,227,0.25)"  },
  { light: "#FFF0F6", icon: "#C2185B", border: "rgba(194,24,91,0.25)"  },
  { light: "#EEF2FF", icon: "#1A3A8F", border: "rgba(26,58,143,0.25)"  },
  { light: "#FFF8F0", icon: "#E65100", border: "rgba(230,81,0,0.25)"   },
];

export default function WhyUsSection() {
  const t      = useTranslations("whyUs");
  const locale = useLocale();
  const items  = t.raw("items") as { icon: string; title: string; body: string }[];

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0D1F6B 0%, #1A3A8F 50%, #0D1F6B 100%)" }}
    >
      {/* Texture points */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      {/* Halos décoratifs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 65%)" }} />
      <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(211,47,47,0.07) 0%, transparent 65%)" }} />
      {/* Ligne dorée top */}
      <div className="absolute top-0 inset-x-0 h-[3px]"
        style={{ background: "linear-gradient(90deg, transparent, #F5A623 30%, #D32F2F 50%, #F5A623 70%, transparent)" }} />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* En-tête */}
        <motion.div className="text-center mb-16 max-w-2xl mx-auto"
          variants={hdrV} initial="hidden" animate={inView ? "show" : "hidden"}>
          <SectionBadge variant="white">{t("badge")}</SectionBadge>
          <h2 className="font-display font-bold text-white mt-1 mb-4"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}>
            {t("title")}
          </h2>
          <p className="text-white/65 leading-relaxed text-[1rem]">{t("subtitle")}</p>
        </motion.div>

        {/* Grille 8 cartes — fond semi-transparent, style "pôles d'excellence" */}
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={grdV} initial="hidden" animate={inView ? "show" : "hidden"}>
          {items.map((item, i) => {
            const Icon   = ICON_MAP[item.icon] ?? Globe;
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <motion.div key={i} variants={crdV}
                whileHover={{ y: -8, scale: 1.025, transition: { type: "spring", stiffness: 320, damping: 22 } }}
                className="group relative bg-white/8 backdrop-blur-sm rounded-2xl p-6 cursor-default
                  border border-white/12 hover:bg-white/15 hover:border-white/25
                  transition-all duration-300 flex flex-col gap-4 overflow-hidden">

                {/* Numéro décoratif */}
                <div className="absolute top-3 right-4 font-display font-bold text-4xl leading-none
                  select-none opacity-[0.07] group-hover:opacity-[0.15] transition-opacity duration-300 text-white">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Icône colorée sur fond clair */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0
                  group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                  style={{ backgroundColor: accent.light }}>
                  <Icon size={24} style={{ color: accent.icon }} strokeWidth={1.8} />
                </div>

                {/* Contenu */}
                <div>
                  <h3 className="font-display font-bold text-white text-[1rem] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.body}</p>
                </div>

                {/* Barre bas colorée */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0
                  group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: accent.icon }} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bandeau de chiffres bas — 3 stats institutionnelles */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="mt-14 rounded-2xl bg-white/8 border border-white/15 backdrop-blur-sm overflow-hidden">
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {[
              { value: "FR + EN", labelFr: "Bilinguisme intégral",        labelEn: "Full bilingualism"          },
              { value: "2025",    labelFr: "Agrément MINEDUB",            labelEn: "MINEDUB Accreditation"      },
              { value: "0 – 12",  labelFr: "Ans · De la crèche au CM2",   labelEn: "Years · Day Care to Grade 6"},
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center py-7 px-4 text-center">
                <span className="font-display font-bold text-[#F5A623] mb-1"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
                  {stat.value}
                </span>
                <span className="text-white/75 text-sm">
                  {locale === "en" ? stat.labelEn : stat.labelFr}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Ligne dorée bas */}
      <div className="absolute bottom-0 inset-x-0 h-[3px]"
        style={{ background: "linear-gradient(90deg, transparent, #F5A623 30%, #D32F2F 50%, #F5A623 70%, transparent)" }} />
    </section>
  );
}
