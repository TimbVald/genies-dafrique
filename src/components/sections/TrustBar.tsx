"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Trophy, Globe, BookOpen, ShieldCheck } from "lucide-react";

/**
 * TrustBar — 4 piliers iconographiques sur fond blanc.
 * Reproduit la bande de confiance du CSI La Gaieté :
 * icône + titre + description courte, 4 colonnes desktop.
 */

const PILLARS = [
  {
    icon: Trophy,
    color: "#1A3A8F",
    bg:    "#EEF2FF",
    fr: {
      title: "Excellence Académique",
      desc:  "Enseignement rigoureux fondé sur l'innovation pédagogique et la réussite de chaque élève.",
    },
    en: {
      title: "Academic Excellence",
      desc:  "Rigorous teaching built on pedagogical innovation and the success of every student.",
    },
    ew: {
      title: "Nyɔ́ñ ya Akom",
      desc:  "Akom ya mbɔ́g na minlɔ́m ya mvoé amu nyɔ́ñ ya mwana nyonso.",
    },
  },
  {
    icon: Globe,
    color: "#2D5BE3",
    bg:    "#EEF7FF",
    fr: {
      title: "Bilinguisme FR / EN",
      desc:  "Immersion totale français–anglais dès la crèche, une ouverture sur deux cultures et le monde.",
    },
    en: {
      title: "FR / EN Bilingualism",
      desc:  "Full French–English immersion from day care, an opening to two cultures and the world.",
    },
    ew: {
      title: "Bilingue FR / EN",
      desc:  "A yɔ́k français na anglais a tɔ́l crèche, yiban na mvan mibuma na si nyonso.",
    },
  },
  {
    icon: BookOpen,
    color: "#F5A623",
    bg:    "#FFF8EE",
    fr: {
      title: "Innovation & Pédagogie",
      desc:  "Agriculture scolaire, entrepreneuriat junior et outils numériques intégrés au quotidien.",
    },
    en: {
      title: "Innovation & Pedagogy",
      desc:  "School farming, junior entrepreneurship and digital tools integrated into daily learning.",
    },
    ew: {
      title: "Minlɔ́m & Akom",
      desc:  "Agriculture ya sukul, entrepreneuriat junior na technologies na akom ya ngon nyonso.",
    },
  },
  {
    icon: ShieldCheck,
    color: "#2E7D32",
    bg:    "#F0FFF4",
    fr: {
      title: "Encadrement & Valeurs",
      desc:  "Bienveillance, discipline et responsabilité pour l'épanouissement intégral de chaque enfant.",
    },
    en: {
      title: "Care & Values",
      desc:  "Well-being, discipline and responsibility for the holistic development of every child.",
    },
    ew: {
      title: "A yen mwana & Mimbɔ́g",
      desc:  "Mvoé, mbɔ́g na mbɔ́g ya fam amu mfañ nyonso ya mwana nyonso.",
    },
  },
] as const;

type L = "fr" | "en" | "ew";

export default function TrustBar() {
  const locale = useLocale();
  const L      = locale as L;
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
          {PILLARS.map(({ icon: Icon, color, bg, ...p }, i) => {
            const d = p[L];
            return (
              <motion.div
                key={i}
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
                  style={{ backgroundColor: bg }}
                >
                  <Icon size={22} style={{ color }} strokeWidth={1.8} />
                </div>

                {/* Texte */}
                <div className="min-w-0">
                  <p
                    className="font-display font-bold text-[#1A202C] text-[0.93rem] leading-snug mb-1
                      group-hover:text-[#1A3A8F] transition-colors duration-200"
                    style={{ color: undefined }}
                  >
                    {d.title}
                  </p>
                  <p className="text-[#4A5568] text-xs leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Ligne accent bleu bas */}
      <div
        className="h-[3px]"
        style={{
          background: "linear-gradient(90deg, #1A3A8F 0%, #2D5BE3 25%, #F5A623 50%, #D32F2F 75%, #1A3A8F 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
