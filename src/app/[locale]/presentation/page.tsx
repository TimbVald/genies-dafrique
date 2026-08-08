"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { CheckCircle2, Star, Globe, Sprout, Heart, Shield, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";

/* ─── Types ─────────────────────────────────────────────────────────── */
interface HistoryItem { year: string; text: string; }
interface ValueItem   { icon: string; title: string; body: string; }

/* ─── Icon map ───────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ReactNode> = {
  Star:      <Star      size={24} className="text-[#1A3A8F]" />,
  Shield:    <Shield    size={24} className="text-[#1A3A8F]" />,
  Globe:     <Globe     size={24} className="text-[#1A3A8F]" />,
  Lightbulb: <Lightbulb size={24} className="text-[#1A3A8F]" />,
  Heart:     <Heart     size={24} className="text-[#1A3A8F]" />,
  Sprout:    <Sprout    size={24} className="text-[#1A3A8F]" />,
};

/* ─── Animation ─────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* ═════════════════════════════════════════════════════════════════════ */
export default function PresentationPage() {
  const t   = useTranslations("presentationPage");
  const tn  = useTranslations("nav");

  /* Lire les tableaux depuis les messages (toute langue lue automatiquement) */
  const historyItems = t.raw("history.items") as HistoryItem[];
  const valuesItems  = t.raw("values.items")  as ValueItem[];

  return (
    <>
      {/* ── HERO ── */}
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/images/IMG-20260723-WA0024.jpg"
        breadcrumbs={[
          { label: tn("home"), href: "/" },
          { label: t("hero.title") },
        ]}
      />

      {/* ── MOT DU DIRECTEUR ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative aspect-[3/4] max-w-[380px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-[#E2E8F0]">
                <Image
                  src="/images/IMG-20260723-WA0024.jpg"
                  alt={t("director.altPhoto")}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F6B]/50 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-2 lg:right-4 bg-[#D32F2F] text-white rounded-2xl px-5 py-3 shadow-xl">
                <p className="font-bold text-sm">{t("director.altPhoto")}</p>
                <p className="text-white/75 text-xs">{t("director.roleLabel")}</p>
              </div>
            </motion.div>

            {/* Texte */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.12 }}
            >
              <motion.div variants={fadeUp}>
                <SectionBadge>{t("director.badge")}</SectionBadge>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display font-bold text-[#1A202C] mb-6 mt-2 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
              >
                {t("director.title")}
              </motion.h2>
              <motion.blockquote
                variants={fadeUp}
                className="border-l-4 border-[#F5A623] pl-6 mb-6 bg-[#FFF8EE]/50 py-3 rounded-r-xl"
              >
                <p className="font-display italic text-[#4A5568] text-lg leading-relaxed">
                  {t("director.quote")}
                </p>
              </motion.blockquote>
              <motion.p variants={fadeUp} className="text-[#4A5568] leading-relaxed">
                {t("director.body")}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HISTOIRE ── */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[800px] mx-auto px-6 lg:px-10">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionBadge>{t("history.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mt-2"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("history.title")}
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-[#E2E8F0]" />
            <div className="space-y-8">
              {historyItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex gap-6 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-[#1A3A8F] flex items-center justify-center shadow-md z-10 relative">
                      <span className="text-white text-[11px] font-bold text-center leading-tight px-1">
                        {item.year}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-5 shadow-sm border border-[#E2E8F0] mt-2
                    hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <p className="text-[#1A202C] font-semibold text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALEURS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionBadge>{t("values.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mt-2"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("values.title")}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valuesItems.map((v, i) => (
              <motion.div
                key={i}
                className="group p-7 rounded-2xl border border-[#E2E8F0] bg-white
                  hover:border-[#1A3A8F]/30 hover:shadow-xl hover:-translate-y-1.5
                  transition-all duration-300 cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <div
                  className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center mb-4
                    group-hover:bg-[#1A3A8F] group-hover:scale-110 transition-all duration-300"
                >
                  <span className="group-hover:[&>svg]:!text-white transition-colors duration-300">
                    {ICON_MAP[v.icon] ?? <Star size={24} className="text-[#1A3A8F]" />}
                  </span>
                </div>
                <h3 className="font-display font-bold text-[#1A202C] text-base mb-2">
                  {v.title}
                </h3>
                <p className="text-[#4A5568] text-sm leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGRÉMENT ── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}
      >
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 text-center">
          <SectionBadge variant="white">{t("accreditation.badge")}</SectionBadge>
          <h2
            className="font-display font-bold text-white mb-8 mt-2"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
          >
            {t("accreditation.title")}
          </h2>
          <motion.div
            className="inline-flex flex-col sm:flex-row items-center gap-5
              bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle2 size={44} className="text-[#F5A623] flex-shrink-0" />
            <div className="text-left">
              <p className="text-white font-bold text-base">{t("accreditation.decree")}</p>
              <p className="text-white/70 text-sm mt-1">{t("accreditation.date")}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
