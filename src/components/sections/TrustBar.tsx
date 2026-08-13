"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import {
  Trophy, Globe, BookOpen, ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { getTrustBarPillars } from "@/lib/data/home";

/* ── Map icône : nom (string dans les données) → composant Lucide ── */
const ICON_MAP: Record<string, LucideIcon> = {
  Trophy, Globe, BookOpen, ShieldCheck,
};

/**
 * TrustBar — 4 piliers de confiance sur fond blanc.
 * Données lues depuis src/data/home/trustbar.ts via getTrustBarPillars().
 * Pour modifier un pilier (titre, description, icône, couleur),
 * éditer uniquement le fichier de données — pas ce composant.
 */
export default function TrustBar() {
  const locale  = useLocale();
  const pillars = getTrustBarPillars();          // ← données
  const L       = locale as "fr" | "en" | "ew";

  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <section
      ref={ref}
      aria-label={locale === "fr" ? "Nos piliers d'excellence" : "Our pillars of excellence"}
      className="relative bg-white border-b border-[#E2E8F0]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-[#E2E8F0]">
          {pillars.map((pillar, i) => {
            const Icon  = ICON_MAP[pillar.icon] ?? Trophy;
            const title = pillar.title[L] || pillar.title.fr;
            const desc  = pillar.desc[L]  || pillar.desc.fr;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.09, duration: 0.5, ease: "easeOut" }}
                className="flex items-start gap-4 py-7 px-6 lg:px-8 group
                  hover:bg-[#F7F9FC] transition-colors duration-200"
              >
                {/* Icône ronde colorée */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center
                    flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: pillar.bg }}
                >
                  <Icon size={22} style={{ color: pillar.color }} strokeWidth={1.8} />
                </div>

                {/* Texte */}
                <div className="min-w-0">
                  <p
                    className="font-display font-bold text-[#1A202C] text-[0.93rem] leading-snug mb-1
                      group-hover:text-[#1A3A8F] transition-colors duration-200"
                  >
                    {title}
                  </p>
                  <p className="text-[#4A5568] text-xs leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Ligne accent multicolore bas */}
      <div
        className="h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, #1A3A8F 0%, #2D5BE3 25%, #F5A623 50%, #D32F2F 75%, #1A3A8F 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
