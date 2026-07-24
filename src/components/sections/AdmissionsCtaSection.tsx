"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { Calendar, Phone, MapPin, ArrowRight, Download } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

/* ── Animations ─────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* ══════════════════════════════════════════════════════════════ */
export default function AdmissionsCtaSection() {
  const t      = useTranslations("admissionsCta");
  const tc     = useTranslations("contact");
  const locale = useLocale();

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-60px" });

  /* ── Parallaxe image de fond ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      aria-label={
        locale === "fr"
          ? "Inscriptions ouvertes"
          : "Enrollment now open"
      }
    >
      {/* ── Image de fond avec parallaxe ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale: 1.1 }}
      >
        <Image
          src="/images/IMG-20260723-WA0039.jpg"
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden="true"
          sizes="100vw"
        />
      </motion.div>

      {/* ── Overlays multicouches ── */}
      {/* Couche principale rouge profond */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(183,28,28,0.88)" }}
        aria-hidden="true"
      />
      {/* Dégradé d'intensification bas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(107,0,0,0.4) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      {/* Texture grain subtil */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* ── Contenu ── */}
      <motion.div
        className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 text-center"
        variants={stagger}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <SectionBadge variant="white">{t("badge")}</SectionBadge>
        </motion.div>

        {/* Titre */}
        <motion.h2
          variants={fadeUp}
          className="font-display font-bold text-white mb-4 mt-1"
          style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)" }}
        >
          {t("title")}
        </motion.h2>

        {/* Sous-titre */}
        <motion.p
          variants={fadeUp}
          className="text-white/82 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        {/* ── Encadré info glassmorphism ── */}
        <motion.div
          variants={fadeUp}
          className="inline-block bg-white/12 backdrop-blur-md rounded-2xl
            px-6 sm:px-8 py-6 mb-10 border border-white/22
            shadow-[0_4px_32px_rgba(0,0,0,0.2)]"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center
            gap-5 sm:gap-8 text-white text-left">
            {/* Horaires */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center
                justify-center flex-shrink-0 mt-0.5">
                <Calendar size={17} className="text-[#F5A623]" aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-sm">{t("scheduleLabel")}</p>
                <p className="text-white/70 text-sm">{t("schedule")}</p>
              </div>
            </div>

            {/* Séparateur */}
            <div className="hidden sm:block w-px h-10 bg-white/20" aria-hidden="true" />

            {/* Téléphone */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center
                justify-center flex-shrink-0 mt-0.5">
                <Phone size={17} className="text-[#F5A623]" aria-hidden="true" />
              </div>
              <div>
                <a
                  href="tel:+237651111506"
                  className="font-bold text-sm hover:text-[#F5A623] transition-colors block"
                >
                  {tc("phone1")}
                </a>
                <a
                  href="tel:+237656663848"
                  className="text-white/70 text-sm hover:text-white transition-colors block"
                >
                  {tc("phone2")}
                </a>
              </div>
            </div>

            {/* Séparateur */}
            <div className="hidden sm:block w-px h-10 bg-white/20" aria-hidden="true" />

            {/* Adresse */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center
                justify-center flex-shrink-0 mt-0.5">
                <MapPin size={17} className="text-[#F5A623]" aria-hidden="true" />
              </div>
              <p className="text-white/70 text-sm leading-snug">{t("address")}</p>
            </div>
          </div>
        </motion.div>

        {/* ── Boutons CTA ── */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Bouton primaire blanc */}
          <Link href="/contact">
            <motion.span
              className="inline-flex items-center justify-center gap-2.5
                px-8 py-4 rounded-xl bg-white text-[#D32F2F] font-bold text-sm
                tracking-wide shadow-[0_6px_24px_rgba(0,0,0,0.25)] cursor-pointer"
              whileHover={{
                scale: 1.03,
                y: -3,
                boxShadow: "0 12px 36px rgba(0,0,0,0.30)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 360, damping: 24 }}
            >
              {t("ctaPrimary")}
              <ArrowRight size={17} aria-hidden="true" />
            </motion.span>
          </Link>

          {/* Bouton secondaire outline blanc */}
          <Link href="/admissions">
            <motion.span
              className="inline-flex items-center justify-center gap-2.5
                px-8 py-4 rounded-xl border-2 border-white/75
                text-white font-semibold text-sm cursor-pointer"
              whileHover={{
                scale: 1.03,
                y: -3,
                backgroundColor: "rgba(255,255,255,0.14)",
                borderColor: "rgba(255,255,255,1)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 360, damping: 24 }}
            >
              <Download size={17} aria-hidden="true" />
              {t("ctaSecondary")}
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
