"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, type Variants } from "framer-motion";
import { School, BookOpen, Globe, Phone, type LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = { School, BookOpen, Globe, Phone };

const itemAnim: Variants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const containerAnim: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function TrustBar() {
  const t     = useTranslations("trustBar");
  const items = t.raw("items") as { icon: string; label: string }[];
  const ref   = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <section ref={ref} aria-label="Indicateurs clés" className="relative bg-[#0D1F6B] border-b border-white/10">
      {/* Subtle shine line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10"
          variants={containerAnim} initial="hidden" animate={inView ? "show" : "hidden"}
        >
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Globe;
            return (
              <motion.div
                key={i}
                variants={itemAnim}
                className="flex items-center justify-center gap-3 py-4 px-5 group
                  border-b border-white/10 lg:border-b-0
                  hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center
                  group-hover:bg-[#F5A623]/20 group-hover:scale-110 transition-all duration-250">
                  <Icon size={16} className="text-[#F5A623]" aria-hidden="true" />
                </div>
                <span className="text-white/90 font-semibold text-sm leading-tight group-hover:text-white transition-colors">
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
