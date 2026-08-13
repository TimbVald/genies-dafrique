"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { getDirectriceSectionData } from "@/lib/data/home";
import { motion, useInView, type Variants, type Transition } from "framer-motion";

const ease: Transition = { duration: 0.7, ease: "easeOut" };
const fadeUp: Variants = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: ease } };
const fadeLeft: Variants = { hidden: { opacity: 0, x: -44 }, show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: "easeOut" } } };
const fadeRight: Variants = { hidden: { opacity: 0, x: 44 }, show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: "easeOut" } } };

export default function DirectriceSection() {
  const locale = useLocale();
  const directriceData = getDirectriceSectionData();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#F8FAFC] overflow-hidden"
    >
      {/* Décoration fond */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, rgba(13,31,107,0.04) 0%, transparent 70%)" }} />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ════════════════════════════════════════════════
              COLONNE GAUCHE — Photo (~45%)
          ═══════════════════════════════════════════════════ */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="relative lg:order-1"
          >
            {/* Bloc décoratif bleu en arrière-plan */}
            <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl -z-10"
              style={{ background: "#0D1F6B", transform: "translate(12px, 12px)" }} />
            
            {/* Photo */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "3/4" }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={directriceData.photo}
                alt={directriceData.name[locale as keyof typeof directriceData.name]}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
            </motion.div>
          </motion.div>

          {/* ════════════════════════════════════════════════
              COLONNE DROITE — Texte (~55%)
          ═══════════════════════════════════════════════════ */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="lg:order-2"
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              className="text-[#D32F2F] text-xs font-bold uppercase tracking-[0.2em] mb-3"
            >
              {directriceData.eyebrow[locale as keyof typeof directriceData.eyebrow]}
            </motion.p>

            {/* Titre */}
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold text-[#1A202C] mb-6 leading-tight"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {directriceData.title[locale as keyof typeof directriceData.title]}
            </motion.h2>

            {/* Paragraphe */}
            <motion.p
              variants={fadeUp}
              className="text-[#4A5568] leading-relaxed mb-6 text-[1rem]"
            >
              {directriceData.paragraph[locale as keyof typeof directriceData.paragraph]}
            </motion.p>

            {/* Citation en exergue */}
            <motion.blockquote
              variants={fadeUp}
              className="relative pl-6 border-l-4 border-[#0D1F6B] mb-8"
            >
              <p className="text-[#1A3A8F] font-semibold italic text-lg leading-relaxed">
                "{directriceData.quote[locale as keyof typeof directriceData.quote]}"
              </p>
            </motion.blockquote>

            {/* Signature */}
            <motion.div
              variants={fadeUp}
              className="pt-6 border-t border-[#E2E8F0]"
            >
              <p className="font-display font-bold text-[#1A202C] text-base mb-1">
                {directriceData.name[locale as keyof typeof directriceData.name]}
              </p>
              <p className="text-[#4A5568] text-sm leading-snug">
                {directriceData.role[locale as keyof typeof directriceData.role]}
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
