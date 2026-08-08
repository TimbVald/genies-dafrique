"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Clock, Users, Globe, CheckCircle2, ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import { getPrograms } from "@/lib/data/programs";
import { getLang, getLangArray } from "@/lib/utils/getLang";

/* ─── Types ─────────────────────────────────────────────────────────── */
interface ProjectItem { emoji: string; title: string; description: string; }

/* ─── Animation ─────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* ═════════════════════════════════════════════════════════════════════ */
export default function ProgrammesPage() {
  const t       = useTranslations("programmesPage");
  const tn      = useTranslations("nav");
  const locale  = useLocale();
  const programs = getPrograms();

  /* Lire les projets depuis les messages (extensible à N langues) */
  const projets = t.raw("projects.items") as ProjectItem[];

  return (
    <>
      {/* ── HERO ── */}
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/images/IMG-20260723-WA0024.jpg"
        breadcrumbs={[
          { label: tn("home"), href: "/" },
          { label: tn("programmes") },
        ]}
      />

      {/* ── INTRO ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <SectionBadge>{t("intro.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mt-4 mb-5"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("intro.title")}
            </h2>
            <p className="text-[#4A5568] text-lg leading-relaxed">{t("intro.body")}</p>
          </motion.div>
        </div>
      </section>

      {/* ── PROGRAMME CARDS ── */}
      <section className="pb-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 space-y-16">
          {programs.map((prog, i) => {
            /* getLang gère le fallback fr → première valeur dispo */
            const name      = getLang(prog.name,             locale);
            const badge     = getLang(prog.badge,            locale);
            const shortDesc = getLang(prog.shortDescription, locale);
            const desc      = getLang(prog.description,      locale);
            const features  = getLangArray(prog.features,    locale);

            const isReversed  = i % 2 === 1;
            const accentColor = prog.section === "francophone" ? "#1A3A8F" : "#D32F2F";
            const bgLight     = prog.section === "francophone" ? "#EEF2FF" : "#FFF0F0";
            const gradEnd     = prog.section === "francophone" ? "#2D5BE3" : "#B71C1C";

            return (
              <motion.article
                key={prog.id}
                id={prog.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  isReversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* ── Image ── */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group aspect-[4/3]">
                  <Image
                    src={prog.image}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${accentColor}cc 0%, ${accentColor}44 40%, transparent 70%)`,
                    }}
                  />
                  {/* Badge age */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm"
                      style={{ backgroundColor: `${accentColor}cc` }}
                    >
                      {badge}
                    </span>
                  </div>
                  {/* Name + shortDesc on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white font-display font-bold text-lg leading-tight drop-shadow">
                      {name}
                    </p>
                    <p className="text-white/75 text-sm mt-1 line-clamp-2">{shortDesc}</p>
                  </div>
                </div>

                {/* ── Content ── */}
                <div>
                  {/* Section tag — flags are always neutral labels, no locale needed */}
                  <div className="inline-flex items-center gap-2 mb-3">
                    <div className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: accentColor }}
                    >
                      {prog.section === "francophone" ? "🇫🇷 Francophone" : "🇬🇧 Anglophone"}
                    </span>
                  </div>

                  <h3
                    className="font-display font-bold text-[#1A202C] mb-4 leading-tight"
                    style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)" }}
                  >
                    {name}
                  </h3>
                  <p className="text-[#4A5568] leading-relaxed mb-6 text-sm">{desc}</p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-7">
                    {features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2
                          size={17}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: accentColor }}
                        />
                        <span className="text-[#4A5568] text-sm leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Practical info chips */}
                  <div className="flex flex-wrap gap-3 mb-7">
                    {[
                      { Icon: Clock, text: "Lun–Ven · 7h30–15h00" },
                      { Icon: Users, text: t("card.smallClasses") },
                      { Icon: Globe, text: "FR + EN" },
                    ].map(({ Icon, text }, k) => (
                      <div
                        key={k}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: bgLight,
                          border: `1px solid ${accentColor}30`,
                          color: "#4A5568",
                        }}
                      >
                        <Icon size={13} style={{ color: accentColor }} />
                        {text}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href="/formations">
                    <motion.span
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${accentColor} 0%, ${gradEnd} 100%)`,
                        boxShadow: `0 4px 18px ${accentColor}40`,
                      }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 380, damping: 24 }}
                    >
                      {t("card.learnMore")}
                      <ArrowRight size={16} />
                    </motion.span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── PROJETS PÉDAGOGIQUES ── */}
      <section
        className="py-24"
        style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionBadge variant="white">{t("projects.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-white mt-2"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("projects.title")}
            </h2>
            <p className="text-white/70 mt-3 max-w-xl mx-auto text-sm">
              {t("projects.subtitle")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projets.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.18)" }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{p.emoji}</div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{p.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2
              className="font-display font-bold text-[#1A202C] mb-4"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
            >
              {t("cta.title")}
            </h2>
            <p className="text-[#4A5568] mb-8 leading-relaxed">{t("cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/formations"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl
                  bg-[#1A3A8F] text-white font-bold hover:bg-[#0D1F6B] hover:-translate-y-0.5
                  transition-all duration-200 shadow-[0_4px_18px_rgba(26,58,143,0.30)]"
              >
                {t("cta.btnFormations")}
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl
                  border-2 border-[#1A3A8F] text-[#1A3A8F] font-bold
                  hover:bg-[#1A3A8F] hover:text-white transition-all duration-200"
              >
                {t("cta.btnContact")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
