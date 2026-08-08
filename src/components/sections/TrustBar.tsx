"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { School, BookOpen, Globe, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = { School, BookOpen, Globe, Phone };

export default function TrustBar() {
  const t     = useTranslations("trustBar");
  const items = t.raw("items") as { icon: string; label: string }[];
  const ref   = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <section
      ref={ref}
      aria-label="Indicateurs de confiance"
      className="relative bg-[#F5A623] overflow-hidden"
    >
      {/* Shine line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/30" />

      {/* Motif diagonal décoratif */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/20">
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Globe;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.45, ease: "easeOut" }}
                className="flex items-center justify-center gap-3 py-4 px-5 group
                  hover:bg-white/10 transition-colors duration-200"
              >
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center
                  flex-shrink-0 group-hover:bg-white/30 transition-colors duration-200">
                  <Icon size={16} className="text-white" aria-hidden="true" />
                </div>
                <span className="text-white font-bold text-sm leading-tight">
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20" />
    </section>
  );
}
