import { getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import React from "react";
import Image from "next/image";
import {
  Trophy,
  Shield,
  Globe,
  Lightbulb,
  Heart,
  Users,
  ShieldCheck,
  Star,
  CheckCircle2,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import {
  getSchoolInfo,
  getHistory,
  getMission,
  getVision,
  getValues,
  getDirectorMessage,
  getTeam,
} from "@/lib/data/about";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageTitles.about" });
  return { title: t("title"), description: t("description") };
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Trophy: <Trophy size={28} className="text-[#1A3A8F]" />,
  Shield: <Shield size={28} className="text-[#1A3A8F]" />,
  ShieldCheck: <ShieldCheck size={28} className="text-[#1A3A8F]" />,
  Globe: <Globe size={28} className="text-[#1A3A8F]" />,
  Lightbulb: <Lightbulb size={28} className="text-[#1A3A8F]" />,
  Heart: <Heart size={28} className="text-[#1A3A8F]" />,
  Users: <Users size={28} className="text-[#1A3A8F]" />,
  Star: <Star size={28} className="text-[#1A3A8F]" />,
};

function getIcon(iconName: string): React.ReactNode {
  return ICON_MAP[iconName] ?? <Star size={28} className="text-[#1A3A8F]" />;
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AboutContent />;
}

function AboutContent() {
  "use client";
  const t = useTranslations("aboutPage");
  const tn = useTranslations("nav");
  const locale = useLocale();

  // Use data services
  const schoolInfo = getSchoolInfo();
  const history = getHistory();
  const mission = getMission();
  const vision = getVision();
  const values = getValues();
  const directorMessage = getDirectorMessage();
  const team = getTeam();

  return (
    <>
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
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative aspect-[3/4] max-w-[380px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={directorMessage.photo}
                  alt={directorMessage.name[locale as keyof typeof directorMessage.name] || t("founderMessage.signature")}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 lg:right-8 bg-[#D32F2F] text-white rounded-2xl px-5 py-3 shadow-lg">
                <p className="font-bold text-sm">{directorMessage.name[locale as keyof typeof directorMessage.name] || t("founderMessage.signature")}</p>
                <p className="text-white/70 text-xs">{directorMessage.role[locale as keyof typeof directorMessage.role] || t("founderMessage.signatureTitle")}</p>
              </div>
            </div>

            <div>
              <SectionBadge>{t("founderMessage.badge")}</SectionBadge>
              <h2
                className="font-display font-bold text-[#1A202C] mb-6"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
              >
                {t("founderMessage.title")}
              </h2>

              <blockquote className="border-l-4 border-[#F5A623] pl-6 mb-6">
                <p className="font-display italic text-[#4A5568] text-lg leading-relaxed">
                  {directorMessage.quote[locale as keyof typeof directorMessage.quote] || t("founderMessage.messageQuote")}
                </p>
              </blockquote>

              <div className="space-y-4">
                <p className="text-[#4A5568] leading-relaxed">
                  {directorMessage.message[locale as keyof typeof directorMessage.message] || t("founderMessage.messageBody")}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
                <p className="font-display font-bold text-[#1A3A8F] text-xl mb-1">
                  {directorMessage.signature[locale as keyof typeof directorMessage.signature] || t("founderMessage.signature")}
                </p>
                <p className="text-[#4A5568] text-sm italic">
                  {directorMessage.signatureTitle[locale as keyof typeof directorMessage.signatureTitle] || t("founderMessage.signatureTitle")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NOTRE HISTOIRE / TIMELINE ── */}
      <section id="histoire" className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[800px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <SectionBadge>{t("history.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C]"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("history.title")}
            </h2>
            <p className="text-[#4A5568] mt-3">{t("history.subtitle")}</p>
          </div>

          <div className="relative">
            <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-[#E2E8F0]" />

            <div className="space-y-10">
              {history.map((item) => {
                return (
                  <div key={item.id} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-[#1A3A8F] flex items-center justify-center shadow-md z-10">
                        <span className="text-white text-xs font-bold text-center leading-tight px-1">
                          {item.year}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E2E8F0] flex-1 mt-2 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(26,58,143,0.10)] transition-all duration-300">
                      <p className="text-[#1A3A8F] font-display font-bold text-sm mb-2">
                        {item.title[locale as keyof typeof item.title] || item.title.fr}
                      </p>
                      <p className="text-[#4A5568] text-sm leading-relaxed">
                        {item.description[locale as keyof typeof item.description] || item.description.fr}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION, VISION, VALEURS ── */}
      <section id="mission" className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <SectionBadge>{t("missionVision.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C]"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("missionVision.title")}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div
              className="rounded-2xl p-8 shadow-lg"
              style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                <Trophy size={24} className="text-[#F5A623]" />
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-4">
                {mission.title[locale as keyof typeof mission.title] || "Mission"}
              </h3>
              <p className="text-white/85 leading-relaxed">
                {mission.content[locale as keyof typeof mission.content] || t("missionVision.mission")}
              </p>
            </div>

            <div className="bg-[#F7F9FC] rounded-2xl p-8 border border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center mb-5">
                <Globe size={24} className="text-[#1A3A8F]" />
              </div>
              <h3 className="font-display font-bold text-[#1A202C] text-xl mb-4">
                {vision.title[locale as keyof typeof vision.title] || "Vision"}
              </h3>
              <p className="text-[#4A5568] leading-relaxed">
                {vision.content[locale as keyof typeof vision.content] || t("missionVision.vision")}
              </p>
            </div>
          </div>

          <div id="valeurs" className="scroll-mt-24">
            <h3
              className="font-display font-bold text-[#1A202C] text-center mb-12"
              style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
            >
              Nos Valeurs
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((v) => (
                <div
                  key={v.id}
                  className="group p-7 rounded-2xl border border-[#E2E8F0]
                    hover:border-[#1A3A8F]/30 hover:shadow-[0_8px_32px_rgba(26,58,143,0.10)]
                    hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center mb-4
                    group-hover:bg-[#1A3A8F] group-hover:scale-110 transition-all duration-300">
                    <span className="group-hover:[&>svg]:text-white transition-colors duration-300">
                      {getIcon(v.icon)}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-[#1A202C] text-lg mb-2">
                    {v.title[locale as keyof typeof v.title] || v.title.fr}
                  </h4>
                  <p className="text-[#4A5568] text-sm leading-relaxed">
                    {v.description[locale as keyof typeof v.description] || v.description.fr}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CORPS ADMINISTRATIF / TEAM ── */}
      <section id="equipe" className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <SectionBadge>{t("team.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C]"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("team.title")}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E2E8F0]
                  hover:shadow-[0_8px_32px_rgba(26,58,143,0.10)]
                  hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.photo ?? "/images/IMG-20260723-WA0075.jpg"}
                    alt={member.name}
                    fill
                    className="object-cover object-center rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A8F]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5 text-center">
                  <h4 className="font-display font-bold text-[#1A202C] text-lg mb-1">
                    {member.name}
                  </h4>
                  <p className="text-[#1A3A8F] text-sm font-medium">
                    {member.role[locale as keyof typeof member.role] || member.role.fr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGRÉMENT MINEDUB ── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}
      >
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 text-center">
          <SectionBadge variant="white">
            Agrément Officiel
          </SectionBadge>
          <h2
            className="font-display font-bold text-white mb-6"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
          >
            Un établissement reconnu par l&apos;État du Cameroun
          </h2>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur-sm
            rounded-2xl px-8 py-6 border border-white/20">
            <CheckCircle2 size={40} className="text-[#F5A623] flex-shrink-0" />
            <div className="text-left">
              <p className="text-white font-bold text-base">
                {schoolInfo.accreditation.number}
              </p>
              <p className="text-white/70 text-sm">
                {schoolInfo.accreditation.date} — {schoolInfo.accreditation.authority}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
