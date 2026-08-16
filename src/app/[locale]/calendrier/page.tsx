"use client";

import { useTranslations, useLocale } from "next-intl";
import SchoolCalendar from "@/components/calendar/SchoolCalendar";
import PageHero from "@/components/ui/PageHero";
import { Calendar as CalendarIcon, Filter, Grid3X3 } from "lucide-react";

export default function CalendrierPage() {
  const t  = useTranslations("calendar");
  const tn = useTranslations("nav");
  const locale = useLocale();

  return (
    <>
      {/* ── PageHero standard du site ── */}
      <PageHero
        image="/images/IMG-20260723-WA0012.jpg"
        title={t("title")}
        subtitle={t("description")}
        breadcrumbs={[
          { label: tn("home"),     href: "/" },
          { label: tn("news"),     href: "/actualites" },
          { label: tn("calendar") },
        ]}
      />

      {/* ── Infos rapides ── */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-3 divide-x divide-[#E2E8F0]">
            {[
              {
                icon: CalendarIcon,
                fr: "Événements scolaires",
                en: "School events",
                descFr: "Activités, examens, sorties",
                descEn: "Activities, exams, outings",
              },
              {
                icon: Filter,
                fr: "Filtrage par catégorie",
                en: "Filter by category",
                descFr: "Vie scolaire, pédagogie, culture…",
                descEn: "School life, pedagogy, culture…",
              },
              {
                icon: Grid3X3,
                fr: "Vues multiples",
                en: "Multiple views",
                descFr: "Mois, semaine, jour, agenda",
                descEn: "Month, week, day, agenda",
              },
            ].map(({ icon: Icon, fr, en, descFr, descEn }, i) => (
              <div key={i} className="flex items-start gap-3 py-5 px-5 lg:px-8">
                <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={17} className="text-[#1A3A8F]" />
                </div>
                <div>
                  <p className="font-bold text-[#1A202C] text-sm">
                    {locale === "en" ? en : fr}
                  </p>
                  <p className="text-[#4A5568] text-xs mt-0.5">
                    {locale === "en" ? descEn : descFr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calendrier ── */}
      <section className="py-10 md:py-16 bg-[#F7F9FC]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SchoolCalendar />
        </div>
      </section>
    </>
  );
}
