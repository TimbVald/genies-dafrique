"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";

/**
 * TrustBar — Bande de réassurance sobre, fond blanc ou gris très clair.
 * Inspiré de La Gaieté : pas voyant, texte discret, chiffres clés.
 */
export default function TrustBar() {
  const locale = useLocale();
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });

  const ITEMS = [
    {
      fr: { value: "Agréé MINEDUB", sub: "Depuis 2025" },
      en: { value: "MINEDUB Accredited", sub: "Since 2025" },
      ew: { value: "Agréé MINEDUB", sub: "2025" },
    },
    {
      fr: { value: "Bilingue FR / EN", sub: "Dès la crèche" },
      en: { value: "Bilingual FR / EN", sub: "From day care" },
      ew: { value: "Bilingue FR / EN", sub: "A tɔ́l crèche" },
    },
    {
      fr: { value: "120+ Élèves", sub: "Inscrits 2025–2026" },
      en: { value: "120+ Students", sub: "Enrolled 2025–2026" },
      ew: { value: "120+ Bana", sub: "2025–2026" },
    },
    {
      fr: { value: "0 à 12 ans", sub: "Crèche · Maternelle · Primaire" },
      en: { value: "0 to 12 years", sub: "Day Care · Nursery · Primary" },
      ew: { value: "0 na 12 osu", sub: "Crèche · Maternelle · Primaire" },
    },
  ];

  const L = locale as "fr" | "en" | "ew";

  return (
    <section
      ref={ref}
      aria-label={locale === "fr" ? "Chiffres clés" : "Key figures"}
      className="relative bg-[#F7F9FC] border-y border-[#E2E8F0]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E2E8F0]">
          {ITEMS.map((item, i) => {
            const d = item[L] ?? item.fr;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
                className="flex items-center gap-3 py-5 px-5 lg:px-8 group"
              >
                <CheckCircle
                  size={18}
                  className="text-[#1A3A8F] flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-bold text-[#1A202C] text-sm leading-tight">
                    {d.value}
                  </p>
                  <p className="text-[#4A5568] text-[0.72rem] mt-0.5 leading-tight">
                    {d.sub}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
