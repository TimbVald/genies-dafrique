"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getTestimonials } from "@/lib/data/testimonials";
import { motion, useInView, type Variants } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const cardAnim: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function TestimonialsSection() {
  const t      = useTranslations("testimonials");
  const locale = useLocale();
  const items  = getTestimonials();

  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 lg:py-28 overflow-hidden"
      style={{ background: "linear-gradient(150deg, #0D1F6B 0%, #1A3A8F 50%, #0F2A7A 100%)" }}>

      {/* Texture points */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

      {/* Halo décoratif */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-white/5 pointer-events-none" />

      {/* Ligne dorée top */}
      <div className="absolute top-0 inset-x-0 h-[3px]"
        style={{ background: "linear-gradient(90deg, transparent, #F5A623 30%, #D32F2F 50%, #F5A623 70%, transparent)" }} />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* En-tête */}
        <motion.div className="text-center mb-14"
          variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}>
          <SectionBadge variant="white">{t("badge")}</SectionBadge>
          <h2 className="font-display font-bold text-white mt-2"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}>
            {t("title")}
          </h2>
          <p className="text-white/55 mt-3 max-w-md mx-auto text-sm">
            {locale === "fr"
              ? "Découvrez ce que les familles disent de nous."
              : locale === "en"
              ? "Discover what our families say about us."
              : "Dzam ba balɛ́g ba sukul ba kɔ́bɔ́."}
          </p>
        </motion.div>

        {/* 3 cartes */}
        <motion.div className="grid md:grid-cols-3 gap-6"
          variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          {items.map((item, i) => (
            <motion.article key={item.id} variants={cardAnim}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 320, damping: 22 } }}
              className={`relative flex flex-col rounded-3xl p-7 border overflow-hidden cursor-default
                ${i === 1
                  ? "bg-[#F5A623] border-[#F5A623] shadow-[0_8px_40px_rgba(245,166,35,0.35)]"
                  : "bg-white/10 backdrop-blur-sm border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.20)]"}`}>

              {/* Badge featured */}
              {i === 1 && (
                <div className="absolute top-5 right-5 bg-white/20 text-white text-[10px] font-bold
                  uppercase tracking-widest px-2.5 py-1 rounded-full">
                  {locale === "fr" ? "Coup de cœur" : "Featured"}
                </div>
              )}

              {/* Quote icon */}
              <Quote size={28} aria-hidden="true"
                className={`mb-4 opacity-70 ${i === 1 ? "text-white" : "text-[#F5A623]"}`} />

              {/* Étoiles */}
              <div className="flex gap-1 mb-4" aria-label={`${item.rating} étoiles`}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={13} aria-hidden="true"
                    className={s < item.rating
                      ? (i === 1 ? "text-white fill-white" : "text-[#F5A623] fill-[#F5A623]")
                      : (i === 1 ? "text-white/30" : "text-white/20")} />
                ))}
              </div>

              {/* Texte */}
              <blockquote className="flex-1 mb-6">
                <p className={`font-display italic leading-relaxed text-[0.96rem] ${i === 1 ? "text-white" : "text-white/90"}`}>
                  &ldquo;{item.content[locale as "fr" | "en" | "ew"] || item.content.fr}&rdquo;
                </p>
              </blockquote>

              {/* Auteur */}
              <footer className="flex items-center gap-3 mt-auto">
                <div aria-hidden="true"
                  className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-base
                    ${i === 1 ? "bg-white/20 text-white" : "bg-[#F5A623]/20 text-[#F5A623] border-2 border-[#F5A623]/40"}`}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <cite className={`not-italic font-bold text-sm block ${i === 1 ? "text-white" : "text-white"}`}>
                    {item.name}
                  </cite>
                  <span className={`text-xs ${i === 1 ? "text-white/75" : "text-white/55"}`}>
                    {item.role[locale as "fr" | "en" | "ew"] || item.role.fr}
                  </span>
                </div>
              </footer>
            </motion.article>
          ))}
        </motion.div>

        {/* Strip stats bas */}
        <motion.div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto text-center"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}>
          {[
            { value: "100%", fr: "Satisfaction",  en: "Satisfaction"  },
            { value: "120+", fr: "Familles",       en: "Families"      },
            { value: "5 ★",  fr: "Note moyenne",   en: "Avg. rating"   },
          ].map((s, i) => (
            <div key={i}>
              <p className="font-display font-bold text-[#F5A623] text-2xl">{s.value}</p>
              <p className="text-white/50 text-xs mt-0.5">{locale === "en" ? s.en : s.fr}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
