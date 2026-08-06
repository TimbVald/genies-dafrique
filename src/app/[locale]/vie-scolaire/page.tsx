"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  BookOpen, Palette, Music, Dumbbell, Sprout, Briefcase,
  MapPin, PartyPopper, GraduationCap,
  Trophy, ArrowRight, Handshake, Monitor, Globe,
} from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from "@/components/ui/tabs";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent,
} from "@/components/ui/card";

/* ─── Animation helpers ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

/* ─── Static icon maps ──────────────────────────────────────────────────── */
const CLUB_ICONS = [BookOpen, Palette, Music, Dumbbell, Sprout, Briefcase];

const CLUB_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  blue:    { bg: "bg-[#EEF2FF]", text: "text-[#1A3A8F]", border: "border-[#C7D7FF]" },
  purple:  { bg: "bg-[#F3E8FF]", text: "text-[#7B1FA2]", border: "border-[#E0BBFF]" },
  pink:    { bg: "bg-[#FFF0F5]", text: "text-[#E91E63]", border: "border-[#FFB3CE]" },
  green:   { bg: "bg-[#E8F5E9]", text: "text-[#2E7D32]", border: "border-[#A5D6A7]" },
  emerald: { bg: "bg-[#E0F2F1]", text: "text-[#00796B]", border: "border-[#80CBC4]" },
  orange:  { bg: "bg-[#FFF8EE]", text: "text-[#E65100]", border: "border-[#FFCC80]" },
};

const ACTIVITY_ICONS = [Handshake, BookOpen, Monitor, Palette, Globe, Trophy];

const EVENT_ICONS = [MapPin, PartyPopper, Trophy, GraduationCap];

const EVENT_COLORS: Record<string, { accent: string; badge: string }> = {
  blue:  { accent: "bg-[#1A3A8F]", badge: "bg-[#EEF2FF] text-[#1A3A8F]" },
  gold:  { accent: "bg-[#F5A623]", badge: "bg-[#FFF8EE] text-[#B37000]" },
  red:   { accent: "bg-[#D32F2F]", badge: "bg-[#FFF0F0] text-[#D32F2F]" },
  green: { accent: "bg-[#2E7D32]", badge: "bg-[#E8F5E9] text-[#2E7D32]" },
};

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface ClubItem {
  emoji: string;
  title: string;
  description: string;
  color: string;
}

interface ActivityItem {
  emoji: string;
  title: string;
  description: string;
}

interface EventItem {
  month: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function VieScolairePage() {
  const t = useTranslations("vieScolairePage");
  const tn = useTranslations("nav");

  const clubs = t.raw("clubs.items") as ClubItem[];
  const activities = t.raw("activities.items") as ActivityItem[];
  const events = t.raw("events.items") as EventItem[];

  return (
    <>
      {/* ── HERO ── */}
      <PageHero
        image={t("hero.image")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        breadcrumbs={[
          { label: tn("home"), href: "/" },
          { label: tn("life") },
        ]}
      />

      {/* ── CLUBS — Tabs layout ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <SectionBadge>{t("clubs.badge")}</SectionBadge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A202C] mt-4 mb-3">
              {t("clubs.title")}
            </h2>
            <p className="text-[#4A5568] max-w-2xl mx-auto text-lg">
              {t("clubs.subtitle")}
            </p>
          </motion.div>

          {/* Tabs — one per club */}
          <Tabs defaultValue="0" className="gap-4">
            {/* Tab triggers */}
            <TabsList
              className="
                flex-wrap h-auto gap-2 bg-[#F7F9FC] border border-[#E2E8F0]
                rounded-2xl p-2 w-full justify-start
              "
            >
              {clubs.map((club, i) => (
                <TabsTrigger
                  key={i}
                  value={String(i)}
                  className="
                    rounded-xl px-4 py-2 text-sm font-semibold text-[#4A5568]
                    data-active:bg-[#1A3A8F] data-active:text-white
                    data-active:shadow-md transition-all duration-200
                  "
                >
                  <span className="mr-1.5">{club.emoji}</span>
                  {club.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab panels */}
            {clubs.map((club, i) => {
              const IconComp = CLUB_ICONS[i];
              const colors = CLUB_COLORS[club.color] ?? CLUB_COLORS.blue;
              return (
                <TabsContent key={i} value={String(i)} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`
                      rounded-2xl border ${colors.border}
                      bg-white shadow-lg p-8 md:p-10
                      grid md:grid-cols-[auto_1fr] gap-8 items-start
                    `}
                  >
                    {/* Icon badge */}
                    <div
                      className={`
                        w-20 h-20 rounded-2xl flex flex-col items-center
                        justify-center ${colors.bg} ${colors.text}
                        flex-shrink-0 text-4xl
                      `}
                    >
                      {club.emoji}
                    </div>

                    {/* Content */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <IconComp size={18} className={colors.text} />
                        <h3 className="text-2xl font-bold text-[#1A202C]">
                          {club.title}
                        </h3>
                      </div>
                      <p className="text-[#4A5568] text-base leading-relaxed max-w-2xl">
                        {club.description}
                      </p>
                    </div>
                  </motion.div>
                </TabsContent>
              );
            })}
          </Tabs>

          {/* Club grid — quick overview cards below tabs */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {clubs.map((club, i) => {
              const colors = CLUB_COLORS[club.color] ?? CLUB_COLORS.blue;
              const IconComp = CLUB_ICONS[i];
              return (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                >
                  <Card className={`h-full border ${colors.border} shadow-sm hover:shadow-md transition-shadow duration-300`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`
                            w-10 h-10 rounded-xl flex items-center justify-center
                            text-xl flex-shrink-0 ${colors.bg}
                          `}
                        >
                          {club.emoji}
                        </span>
                        <CardTitle className={`text-base font-bold ${colors.text}`}>
                          {club.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-[#4A5568] leading-relaxed">
                        {club.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ACTIVITÉS QUOTIDIENNES ── */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <SectionBadge>{t("activities.badge")}</SectionBadge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A202C] mt-4 mb-3">
              {t("activities.title")}
            </h2>
            <p className="text-[#4A5568] max-w-2xl mx-auto text-lg">
              {t("activities.subtitle")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((act, i) => {
              const IconComp = ACTIVITY_ICONS[i];
              return (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg border border-[#E2E8F0] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center mb-5 text-[#1A3A8F]">
                    <IconComp size={22} />
                  </div>
                  <h3 className="font-bold text-[#1A202C] text-lg mb-2">{act.title}</h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed">{act.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GRANDS ÉVÉNEMENTS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <SectionBadge>{t("events.badge")}</SectionBadge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A202C] mt-4 mb-3">
              {t("events.title")}
            </h2>
            <p className="text-[#4A5568] max-w-2xl mx-auto text-lg">
              {t("events.subtitle")}
            </p>
          </motion.div>

          {/* Timeline-style event cards */}
          <div className="relative">
            {/* Connecting line — desktop only */}
            <div className="hidden lg:block absolute top-14 left-0 right-0 h-0.5 bg-[#E2E8F0] mx-[12.5%]" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {events.map((ev, i) => {
                const IconComp = EVENT_ICONS[i];
                const colors = EVENT_COLORS[ev.color] ?? EVENT_COLORS.blue;
                return (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                    whileHover={{ y: -6 }}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Circle with icon */}
                    <div
                      className={`
                        w-14 h-14 rounded-full ${colors.accent} text-white
                        flex items-center justify-center shadow-lg mb-5 relative z-10
                      `}
                    >
                      <IconComp size={22} />
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-[#E2E8F0] p-6 w-full transition-shadow duration-300">
                      <span
                        className={`
                          inline-block px-3 py-1 rounded-full text-xs font-bold
                          uppercase tracking-wide mb-3 ${colors.badge}
                        `}
                      >
                        {ev.month}
                      </span>
                      <h3 className="font-bold text-[#1A202C] text-base mb-2">{ev.title}</h3>
                      <p className="text-[#4A5568] text-sm leading-relaxed">{ev.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALERIE TEASER ── */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <SectionBadge>Galerie</SectionBadge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A202C] mt-4 mb-3">
              La vie scolaire en images
            </h2>
            <p className="text-[#4A5568] max-w-xl mx-auto">
              Découvrez quelques instants capturés de notre quotidien à l&apos;école.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              "/images/IMG-20260723-WA0006.jpg",
              "/images/IMG-20260723-WA0007.jpg",
              "/images/IMG-20260723-WA0012.jpg",
              "/images/IMG-20260723-WA0015.jpg",
              "/images/IMG-20260723-WA0017.jpg",
              "/images/IMG-20260723-WA0018.jpg",
              "/images/IMG-20260723-WA0022.jpg",
              "/images/IMG-20260723-WA0024.jpg",
            ].map((src, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-[#0D1F6B]/0 group-hover:bg-[#0D1F6B]/30 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/galerie"
              className="inline-flex items-center gap-2 bg-[#1A3A8F] text-white font-semibold px-7 py-3 rounded-full hover:bg-[#0D1F6B] transition-colors duration-200 shadow-md"
            >
              Voir toute la galerie
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 bg-gradient-to-br from-[#1A3A8F] to-[#0D1F6B] text-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <SectionBadge variant="white">{t("cta.badge")}</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4 leading-tight">
              {t("cta.title")}
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
              {t("cta.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admissions"
                className="
                  inline-flex items-center justify-center gap-2
                  bg-[#D32F2F] text-white font-bold px-8 py-4 rounded-full
                  hover:bg-[#B71C1C] transition-colors duration-200
                  shadow-lg text-base
                "
              >
                {t("cta.button")}
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/programmes"
                className="
                  inline-flex items-center justify-center gap-2
                  bg-white/15 text-white font-semibold px-8 py-4 rounded-full
                  hover:bg-white/25 border border-white/30 transition-all duration-200
                  text-base
                "
              >
                {t("cta.link")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
