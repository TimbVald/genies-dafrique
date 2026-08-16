"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy, Shield, Globe, Lightbulb, Heart,
  Users, ShieldCheck, Star, CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import { Card, CardContent } from "@/components/ui/card";
import {
  getSchoolInfo, getHistory, getMission, getVision,
  getValues, getDirectorMessage,
} from "@/lib/data/about";

const ICON_MAP: Record<string, React.ReactNode> = {
  Trophy:     <Trophy     size={24} className="text-[#1A3A8F]" />,
  Shield:     <Shield     size={24} className="text-[#1A3A8F]" />,
  ShieldCheck:<ShieldCheck size={24} className="text-[#1A3A8F]" />,
  Globe:      <Globe      size={24} className="text-[#1A3A8F]" />,
  Lightbulb:  <Lightbulb  size={24} className="text-[#1A3A8F]" />,
  Heart:      <Heart      size={24} className="text-[#1A3A8F]" />,
  Users:      <Users      size={24} className="text-[#1A3A8F]" />,
  Star:       <Star       size={24} className="text-[#1A3A8F]" />,
};
function getIcon(name: string) {
  return ICON_MAP[name] ?? <Star size={24} className="text-[#1A3A8F]" />;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function AboutPageContent() {
  const t      = useTranslations("aboutPage");
  const tn     = useTranslations("nav");
  const locale = useLocale();

  const schoolInfo      = getSchoolInfo();
  const history         = getHistory();
  const mission         = getMission();
  const vision          = getVision();
  const values          = getValues();
  const directorMessage = getDirectorMessage();
  // const team            = getTeam();

  return (
    <>
      {/* ── HERO ── */}
      <PageHero
        image="/images/IMG-20260723-WA0024.jpg"
        breadcrumbs={[
          { label: tn("home"), href: "/" },
          { label: tn("about") },
        ]}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* ── MOT DE LA FONDATRICE ── */}
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
                  src={directorMessage.photo}
                  alt={directorMessage.name[locale as keyof typeof directorMessage.name] || t("founderMessage.signature")}
                  fill className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F6B]/50 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-2 lg:right-4 bg-[#D32F2F] text-white rounded-2xl px-5 py-3 shadow-xl">
                <p className="font-bold text-sm">{directorMessage.name[locale as keyof typeof directorMessage.name] || t("founderMessage.signature")}</p>
                <p className="text-white/75 text-xs">{directorMessage.role[locale as keyof typeof directorMessage.role] || t("founderMessage.signatureTitle")}</p>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true }}
              transition={{ staggerChildren: 0.12 }}
            >
              <motion.div variants={fadeUp}>
                <SectionBadge>{t("founderMessage.badge")}</SectionBadge>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display font-bold text-[#1A202C] mb-6 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
              >
                {t("founderMessage.title")}
              </motion.h2>
              <motion.blockquote
                variants={fadeUp}
                className="border-l-4 border-[#F5A623] pl-6 mb-6 bg-[#FFF8EE]/50 py-3 rounded-r-xl"
              >
                <p className="font-display italic text-[#4A5568] text-lg leading-relaxed">
                  {directorMessage.quote[locale as keyof typeof directorMessage.quote] || t("founderMessage.messageQuote")}
                </p>
              </motion.blockquote>
              <motion.p variants={fadeUp} className="text-[#4A5568] leading-relaxed mb-6">
                {directorMessage.message[locale as keyof typeof directorMessage.message] || t("founderMessage.messageBody")}
              </motion.p>
              <motion.div variants={fadeUp} className="pt-5 border-t border-[#E2E8F0]">
                <p className="font-display font-bold text-[#1A3A8F] text-lg mb-0.5">
                  {directorMessage.signature[locale as keyof typeof directorMessage.signature] || t("founderMessage.signature")}
                </p>
                <p className="text-[#4A5568] text-sm italic">
                  {directorMessage.signatureTitle[locale as keyof typeof directorMessage.signatureTitle] || t("founderMessage.signatureTitle")}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HISTOIRE ── */}
      <section id="histoire" className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[860px] mx-auto px-6 lg:px-10">
          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionBadge>{t("history.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mt-2"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("history.title")}
            </h2>
            <p className="text-[#4A5568] mt-3 max-w-xl mx-auto">{t("history.subtitle")}</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-[#E2E8F0]" />
            <div className="space-y-8">
              {history.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="flex gap-6 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-[#1A3A8F] flex items-center justify-center shadow-md z-10 relative">
                      <span className="text-white text-[11px] font-bold text-center leading-tight px-1">{item.year}</span>
                    </div>
                  </div>
                  <Card className="flex-1 mt-2 border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <CardContent className="p-5">
                      <p className="text-[#1A3A8F] font-bold text-sm mb-1.5">
                        {item.title[locale as keyof typeof item.title] || item.title.fr}
                      </p>
                      <p className="text-[#4A5568] text-sm leading-relaxed">
                        {item.description[locale as keyof typeof item.description] || item.description.fr}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION · VISION · VALEURS ── */}
      <section id="mission" className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionBadge>{t("missionVision.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mt-2"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("missionVision.title")}
            </h2>
          </motion.div>

          {/* Mission + Vision */}
          <div className="grid lg:grid-cols-2 gap-6 mb-14">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="rounded-3xl p-8 shadow-xl text-white"
              style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                <Trophy size={22} className="text-[#F5A623]" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3">
                {mission.title[locale as keyof typeof mission.title] || "Mission"}
              </h3>
              <p className="text-white/85 leading-relaxed text-sm">
                {mission.content[locale as keyof typeof mission.content]}
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl p-8 bg-[#F7F9FC] border border-[#E2E8F0] shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] flex items-center justify-center mb-5">
                <Globe size={22} className="text-[#1A3A8F]" />
              </div>
              <h3 className="font-display font-bold text-[#1A202C] text-xl mb-3">
                {vision.title[locale as keyof typeof vision.title] || "Vision"}
              </h3>
              <p className="text-[#4A5568] leading-relaxed text-sm">
                {vision.content[locale as keyof typeof vision.content]}
              </p>
            </motion.div>
          </div>

          {/* Valeurs */}
          <div id="valeurs" className="scroll-mt-24">
            <motion.h3
              className="font-display font-bold text-[#1A202C] text-center mb-10"
              style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp}
            >
              {locale === "fr" ? "Nos Valeurs" : locale === "en" ? "Our Values" : "Mekat Misu"}
            </motion.h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.id}
                  className="group p-6 rounded-2xl border border-[#E2E8F0] bg-white
                    hover:border-[#1A3A8F]/30 hover:shadow-lg hover:-translate-y-1
                    transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                >
                  <div className="w-11 h-11 rounded-xl bg-[#EEF2FF] flex items-center justify-center mb-4
                    group-hover:bg-[#1A3A8F] group-hover:scale-110 transition-all duration-300">
                    <span className="group-hover:[&>svg]:!text-white transition-colors duration-300">
                      {getIcon(v.icon)}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-[#1A202C] text-base mb-2">
                    {v.title[locale as keyof typeof v.title] || v.title.fr}
                  </h4>
                  <p className="text-[#4A5568] text-sm leading-relaxed">
                    {v.description[locale as keyof typeof v.description] || v.description.fr}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ÉQUIPE ── */}
      <section id="equipe" className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionBadge>{t("team.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mt-2"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("team.title")}
            </h2>
          </motion.div>

          {/*<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E2E8F0]
                  hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.photo ?? "/images/IMG-20260723-WA0075.jpg"}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A8F]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5 text-center">
                  <h4 className="font-display font-bold text-[#1A202C] text-base mb-1">
                    {member.name}
                  </h4>
                  <p className="text-[#1A3A8F] text-sm font-medium">
                    {member.role[locale as keyof typeof member.role] || member.role.fr}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>*/}
          {/* ── Section équipe : lien vers la page dédiée ── */}
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link href="/a-propos/equipe">
              <motion.span
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl
                  bg-[#1A3A8F] text-white font-bold text-sm cursor-pointer"
                style={{ boxShadow: "0 4px 20px rgba(26,58,143,0.30)" }}
                whileHover={{ scale: 1.03, y: -2, boxShadow: "0 8px 28px rgba(26,58,143,0.40)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              >
                <Users size={16} />
                {locale === "fr"
                  ? "Découvrir notre équipe pédagogique"
                  : locale === "en"
                  ? "Meet our teaching team"
                  : "Yiba ekipa ya biso"}
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}
      >
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 text-center">
          <SectionBadge variant="white">
            {locale === "fr" ? "Agrément Officiel" : locale === "en" ? "Official Accreditation" : "Agrément"}
          </SectionBadge>
          <h2
            className="font-display font-bold text-white mb-8"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
          >
            {locale === "fr"
              ? "Un établissement reconnu par l'État du Cameroun"
              : locale === "en"
              ? "An institution recognised by the State of Cameroon"
              : "Sukul a yen na État ya Kamerun"}
          </h2>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/20">
            <CheckCircle2 size={40} className="text-[#F5A623] flex-shrink-0" />
            <div className="text-left">
              <p className="text-white font-bold text-base">{schoolInfo.accreditation.number}</p>
              <p className="text-white/70 text-sm">{schoolInfo.accreditation.date} — {schoolInfo.accreditation.authority}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
