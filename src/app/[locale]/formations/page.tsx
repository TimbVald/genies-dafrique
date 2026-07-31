import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import type { Metadata } from "next";
import { CheckCircle2, ArrowRight, Globe, Users, Clock } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageTitles.formations" });
  return { title: t("title"), description: t("description") };
}

export default async function FormationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FormationsContent />;
}

function FormationsContent() {
  "use client";
  const t = useTranslations("formationsPage");
  const tn = useTranslations("nav");
  const tm = useTranslations("common");

  const levelImages = [
    "/images/IMG-20260723-WA0024.jpg",
    "/images/Generated_Image.png",
    "/images/IMG-20260723-WA0007.jpg",
  ];

  const timelineIcons = [
    <CheckCircle2 key="check" size={26} className="text-white" />,
    <Clock key="clock" size={26} className="text-white" />,
    <Users key="users" size={26} className="text-white" />,
    <Globe key="globe" size={26} className="text-white" />,
  ];

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image={t("hero.image")}
        breadcrumbs={[
          { label: tn("home"), href: "/" },
          { label: tn("formations") },
        ]}
      />

      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 text-center">
          <SectionBadge>{t("intro.badge")}</SectionBadge>
          <h2
            className="font-display font-bold text-[#1A202C] mb-5"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
          >
            {t("intro.title")}
          </h2>
          <p className="text-[#4A5568] max-w-3xl mx-auto leading-relaxed text-lg">
            {t("intro.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 space-y-24">
          {Array.from({ length: 3 }).map((_, idx) => {
            const level = t(`levels.${idx}`) as unknown as {
              id: string;
              title: string;
              subtitle: string;
              image: string;
              presentation: string;
              programme: string[];
              objectifs: string[];
            };
            const isReversed = idx % 2 === 1;
            const actualImage = levelImages[idx] || level.image;
            return (
              <div
                key={level.id}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  isReversed ? "[&>div:first-child]:order-2 lg:[&>div:first-child]:order-none lg:[&>div:last-child]:order-first" : ""
                }`}
              >
                <div className="relative">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={actualImage}
                      alt={level.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="absolute -top-4 -left-4 bg-[#F5A623] text-white rounded-xl px-4 py-2 shadow-lg">
                    <span className="font-bold text-sm">{level.subtitle}</span>
                  </div>
                </div>

                <div>
                  <SectionBadge variant="gold">{level.subtitle}</SectionBadge>
                  <h3
                    className="font-display font-bold text-[#1A202C] mb-4"
                    style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)" }}
                  >
                    {level.title}
                  </h3>
                  <p className="text-[#4A5568] leading-relaxed mb-6">
                    {level.presentation}
                  </p>

                  <div className="mb-5">
                    <h4 className="font-bold text-[#1A3A8F] text-sm uppercase tracking-wide mb-3">
                      Programme
                    </h4>
                    <ul className="space-y-2">
                      {level.programme.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 size={18} className="text-[#1A3A8F] flex-shrink-0 mt-0.5" />
                          <span className="text-[#4A5568] text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#D32F2F] text-sm uppercase tracking-wide mb-3">
                      Objectifs
                    </h4>
                    <ul className="space-y-2">
                      {level.objectifs.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 size={18} className="text-[#D32F2F] flex-shrink-0 mt-0.5" />
                          <span className="text-[#4A5568] text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <SectionBadge>{t("sections.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mb-4"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("sections.title")}
            </h2>
            <p className="text-[#4A5568] max-w-2xl mx-auto leading-relaxed">
              {t("sections.subtitle")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {Array.from({ length: 2 }).map((_, idx) => {
              const card = t(`sections.cards.${idx}`) as unknown as {
                id: string;
                flag: string;
                title: string;
                description: string;
                features: string[];
              };
              const accentColor = idx === 0 ? "#1A3A8F" : "#D32F2F";
              return (
                <div
                  key={card.id}
                  className="group bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden
                    hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(26,58,143,0.12)]
                    transition-all duration-300"
                >
                  <div
                    className="p-7 border-b border-[#F0F2F8]"
                    style={{ borderLeft: `5px solid ${accentColor}` }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{card.flag}</span>
                      <h3
                        className="font-display font-bold text-[#1A202C]"
                        style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)" }}
                      >
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-[#4A5568] leading-relaxed text-sm mt-3">
                      {card.description}
                    </p>
                  </div>
                  <div className="p-7">
                    <ul className="space-y-3">
                      {card.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: idx === 0 ? "#EEF2FF" : "#FFF0F0" }}
                          >
                            <CheckCircle2
                              size={16}
                              style={{ color: accentColor }}
                            />
                          </div>
                          <span className="text-[#1A202C] text-sm leading-relaxed font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <SectionBadge variant="red">{t("admissionConditions.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C]"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("admissionConditions.title")}
            </h2>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-[#E2E8F0]" />
            <div className="lg:hidden absolute left-[31px] top-0 bottom-0 w-0.5 bg-[#E2E8F0]" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {Array.from({ length: 4 }).map((_, idx) => {
                const step = t(`admissionConditions.timeline.${idx}`) as unknown as {
                  step: string;
                  title: string;
                  description: string;
                };
                return (
                  <div key={idx} className="lg:flex lg:flex-col lg:items-center lg:text-center">
                    <div className="flex items-start gap-4 lg:block">
                      <div className="relative flex-shrink-0 w-[64px] h-[64px] mx-auto mb-4">
                        <div
                          className="absolute inset-0 rounded-full opacity-10"
                          style={{ backgroundColor: "#1A3A8F" }}
                        />
                        <div
                          className="absolute inset-1 rounded-full flex items-center justify-center shadow-lg z-10"
                          style={{ backgroundColor: "#1A3A8F" }}
                        >
                          {timelineIcons[idx]}
                        </div>
                        <div
                          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md z-20"
                          style={{ backgroundColor: "#D32F2F" }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div className="flex-1 lg:mt-0 lg:px-3">
                        <h3 className="font-display font-bold text-[#1A202C] text-base mb-2">
                          {step.title}
                        </h3>
                        <p className="text-[#4A5568] text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}
      >
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: "#F5A623" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-10"
          style={{ backgroundColor: "#D32F2F" }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 text-center">
          <h2
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
          >
            Prêt à inscrire votre enfant ?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
            Rejoignez la communauté des Génies d'Afrique et donnez à votre enfant les clefs
            d'un avenir brillant, dans un cadre bilingue d'exception.
          </p>
          <Link
            href="/admissions"
            className="group inline-flex items-center gap-2.5 bg-[#F5A623] hover:bg-[#F5A623]/90 text-white
              font-bold px-8 py-4 rounded-2xl shadow-[0_8px_24px_rgba(245,166,35,0.4)]
              hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>Accéder aux Admissions</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>
      </section>
    </>
  );
}
