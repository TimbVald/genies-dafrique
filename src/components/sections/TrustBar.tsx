"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, type Variants } from "framer-motion";
import { School, BookOpen, Globe, Phone, type LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  School, BookOpen, Globe, Phone,
};

const itemAnim: Variants = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const containerAnim: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function TrustBar() {
  const t     = useTranslations("trustBar");
  const items = t.raw("items") as { icon: string; label: string }[];

  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <section
      ref={ref}
      aria-label={
        /* label accessible bilingue */
        "Indicateurs clés · Key indicators"
      }
      className="bg-white border-b border-[#E2E8F0]
        shadow-[0_2px_12px_rgba(26,58,143,0.06)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4"
          variants={containerAnim}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Globe;

            return (
              <motion.div
                key={i}
                variants={itemAnim}
                className={`
                  flex items-center justify-center gap-3 py-4 px-4 group
                  /* Séparateurs : droite sur desktop, bas sur mobile ligne 1 */
                  ${i < items.length - 1 ? "lg:border-r lg:border-[#E2E8F0]" : ""}
                  ${i === 0 ? "border-r border-b border-[#E2E8F0] lg:border-b-0" : ""}
                  ${i === 1 ? "border-b border-[#E2E8F0] lg:border-b-0" : ""}
                  ${i === 2 ? "border-r border-[#E2E8F0] lg:border-r-[#E2E8F0]" : ""}
                `}
              >
                {/* Icône dans un cercle */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full
                    bg-[#EEF2FF] flex items-center justify-center
                    group-hover:bg-[#1A3A8F] group-hover:scale-110
                    transition-all duration-250"
                >
                  <Icon
                    size={18}
                    className="text-[#1A3A8F] group-hover:text-white
                      transition-colors duration-250"
                    aria-hidden="true"
                  />
                </div>

                {/* Label */}
                <span
                  className="text-[#1A3A8F] font-semibold text-sm leading-tight
                    group-hover:text-[#0D1F6B] transition-colors duration-200"
                >
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
