"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ─── Types ─────────────────────────────────────────────────────── */
interface LevelData {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  presentation: string;
  programme: string[];
  objectifs: string[];
}

interface SectionCard {
  id: string;
  flag: string;
  title: string;
  description: string;
  features: string[];
}

interface TimelineStep {
  step: string;
  title: string;
  description: string;
}

/* ─── Animation ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

/* ─── Accordion Item ─────────────────────────────────────────────── */
function AccordionItem({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-[#F7F9FC] hover:bg-[#EEF2FF] transition-colors text-left"
      >
        <span className="font-semibold text-[#1A202C] text-sm">{title}</span>
        <ChevronDown
          size={18}
          className={`text-[#4A5568] flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <ul className="px-5 py-4 space-y-2 bg-white">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: accent }}
                  />
                  <span className="text-[#4A5568] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Level Images ───────────────────────────────────────────────── */
const LEVEL_IMAGES = [
  "/images/IMG-20260723-WA0024.jpg",
  "/images/Generated_Image.png",
  "/images/IMG-20260723-WA0007.jpg",
];

const SECTION_ACCENT = ["#1A3A8F", "#D32F2F"];

/* ─── Main Component ─────────────────────────────────────────────── */
export default function FormationsContent() {
  const t  = useTranslations("formationsPage");
  const tn = useTranslations("nav");
  const locale = useLocale();

  /* Raw arrays from JSON */
  const levels  = t.raw("levels")  as LevelData[];
  const cards   = t.raw("sections.cards") as SectionCard[];
  const timeline = t.raw("admissionConditions.timeline") as TimelineStep[];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/images/IMG-20260723-WA0024.jpg"
        breadcrumbs={[
          { label: tn("home"), href: "/" },
          { label: tn("formations") },
        ]}
      />

      {/* ── INTRO ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[860px] mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <SectionBadge>{t("intro.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mt-4 mb-4"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("intro.title")}
            </h2>
            <p className="text-[#4A5568] text-lg leading-relaxed">
              {t("intro.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── NIVEAUX — Tabs ───────────────────────────────────────── */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <SectionBadge variant="gold">{t("admissionConditions.badge") ?? "Niveaux"}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mt-4"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("admissionConditions.title")}
            </h2>
          </motion.div>

          <Tabs defaultValue="0" className="gap-6">
            {/* Tab triggers — scrollable horizontalement sur mobile */}
            <TabsList className="
              h-auto gap-2 bg-white border border-[#E2E8F0] rounded-2xl p-2
              w-full shadow-sm
              flex overflow-x-auto
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            ">
              {levels.map((level, i) => (
                <TabsTrigger
                  key={i}
                  value={String(i)}
                  className="rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#4A5568]
                    whitespace-nowrap flex-shrink-0
                    data-[state=active]:bg-[#1A3A8F] data-[state=active]:text-white
                    data-[state=active]:shadow-md transition-all duration-200"
                >
                  {level.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {levels.map((level, i) => (
              <TabsContent key={i} value={String(i)} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <Card className="overflow-hidden border-[#E2E8F0] shadow-lg">
                    {/* Sur mobile : empilé vertical. Sur desktop : côte à côte */}
                    <div className="grid lg:grid-cols-[380px_1fr]">
                      {/* Image */}
                      <div className="relative aspect-video lg:aspect-auto min-h-[220px] lg:min-h-[280px]">
                        <Image
                          src={LEVEL_IMAGES[i] ?? "/images/IMG-20260723-WA0024.jpg"}
                          alt={level.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 380px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F6B]/60 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-[#F5A623] text-white border-0 text-sm font-bold px-3 py-1">
                            {level.subtitle}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-5 sm:p-8">
                        <CardTitle className="text-xl sm:text-2xl font-bold text-[#1A202C] mb-3">
                          {level.title}
                        </CardTitle>
                        <p className="text-[#4A5568] leading-relaxed mb-5 text-sm sm:text-base">
                          {level.presentation}
                        </p>

                        {/* Accordions — toujours ouverts sur desktop, cliquables sur mobile */}
                        <div className="grid sm:grid-cols-2 gap-3">
                          <AccordionItem
                            title={locale === "fr" ? "Programme" : "Curriculum"}
                            items={level.programme}
                            accent="#1A3A8F"
                          />
                          <AccordionItem
                            title={locale === "fr" ? "Objectifs" : "Objectives"}
                            items={level.objectifs}
                            accent="#D32F2F"
                          />
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Quick overview cards below tabs */}
          <div className="grid sm:grid-cols-3 gap-5 mt-10">
            {levels.map((level, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
              >
                <Card className="h-full border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-2">
                    <Badge className="bg-[#EEF2FF] text-[#1A3A8F] border-0 w-fit mb-2">
                      {level.subtitle}
                    </Badge>
                    <CardTitle className="text-base font-bold text-[#1A202C]">
                      {level.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#4A5568] text-sm leading-relaxed line-clamp-3">
                      {level.presentation}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTIONS LINGUISTIQUES ───────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <SectionBadge>{t("sections.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mt-4 mb-4"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("sections.title")}
            </h2>
            <p className="text-[#4A5568] max-w-2xl mx-auto leading-relaxed">
              {t("sections.subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {cards.map((card, idx) => {
              const accent = SECTION_ACCENT[idx] ?? "#1A3A8F";
              const bgLight = idx === 0 ? "#EEF2FF" : "#FFF0F0";
              return (
                <motion.div
                  key={card.id}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                >
                  <Card
                    className="h-full border-[#E2E8F0] shadow-sm hover:shadow-lg
                      hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    {/* Colored top bar */}
                    <div className="h-1.5 w-full" style={{ backgroundColor: accent }} />

                    <CardHeader className="pb-3 pt-6">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{card.flag}</span>
                        <div>
                          <CardTitle className="text-xl font-bold text-[#1A202C]">
                            {card.title}
                          </CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-[#4A5568] mt-3 leading-relaxed">
                        {card.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-2.5">
                        {card.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div
                              className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ backgroundColor: bgLight }}
                            >
                              <CheckCircle2 size={14} style={{ color: accent }} />
                            </div>
                            <span className="text-[#1A202C] text-sm leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CALENDRIER D'ADMISSION ───────────────────────────────── */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <SectionBadge variant="red">{t("admissionConditions.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mt-4"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("admissionConditions.title")}
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-[900px] mx-auto">
            {/* Vertical line — mobile */}
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-[#E2E8F0] sm:hidden" />
            {/* Horizontal connector — desktop */}
            <div className="hidden sm:block absolute top-7 left-[12%] right-[12%] h-0.5 bg-[#E2E8F0]" />

            <div className="grid sm:grid-cols-4 gap-8">
              {timeline.map((step, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  className="flex sm:flex-col items-start sm:items-center sm:text-center gap-4 sm:gap-0"
                >
                  {/* Circle */}
                  <div className="relative flex-shrink-0 w-14 h-14 sm:mb-5">
                    <div className="absolute inset-0 rounded-full bg-[#1A3A8F]/10" />
                    <div className="absolute inset-1 rounded-full bg-[#1A3A8F] flex items-center justify-center shadow-md z-10">
                      <span className="text-white font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  </div>

                  <div className="sm:px-2">
                    <h3 className="font-bold text-[#1A202C] text-sm mb-1.5">{step.title}</h3>
                    <p className="text-[#4A5568] text-xs leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#F5A623]/10 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#D32F2F]/10 pointer-events-none" />

        <div className="relative z-10 max-w-[760px] mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <h2
              className="font-display font-bold text-white mb-4"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {locale === "fr"
                ? "Prêt à inscrire votre enfant ?"
                : "Ready to enroll your child?"}
            </h2>
            <p className="text-white/75 max-w-xl mx-auto mb-8 leading-relaxed">
              {locale === "fr"
                ? "Rejoignez la communauté des Génies d'Afrique et donnez à votre enfant les clefs d'un avenir brillant, dans un cadre bilingue d'exception."
                : "Join the Les Génies d'Afrique community and give your child the keys to a brilliant future in an exceptional bilingual environment."}
            </p>
            <Link
              href="/admissions"
              className="group inline-flex items-center gap-2.5 bg-[#F5A623] hover:bg-[#F5A623]/90
                text-white font-bold px-8 py-4 rounded-2xl shadow-[0_8px_24px_rgba(245,166,35,0.4)]
                hover:-translate-y-0.5 transition-all duration-300"
            >
              {locale === "fr" ? "Accéder aux Admissions" : "Go to Admissions"}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
