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
      <section className="bg-white border-b border-[#E2E8F0] shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0]">
            {[
              {
                icon: CalendarIcon,
                fr: "Événements scolaires",
                en: "School events",
                ew: "Biyem ya sukul",
                descFr: "Activités, examens, sorties",
                descEn: "Activities, exams, outings",
                descEw: "Bikɔ́l, examens, minsili",
              },
              {
                icon: Filter,
                fr: "Filtrage par catégorie",
                en: "Filter by category",
                ew: "Lɔ́g dzam na mfañ",
                descFr: "Vie scolaire, pédagogie, culture…",
                descEn: "School life, pedagogy, culture…",
                descEw: "Mvog sukul, akom, minlɔ́m…",
              },
              {
                icon: Grid3X3,
                fr: "Vues multiples",
                en: "Multiple views",
                ew: "A yen mvoé mvoé",
                descFr: "Mois, semaine, jour, agenda",
                descEn: "Month, week, day, agenda",
                descEw: "Ngon, sonde, mɔ́s, agenda",
              },
            ].map(({ icon: Icon, fr, en, ew, descFr, descEn, descEw }, i) => (
              <div key={i} className="flex items-start gap-4 py-6 px-4 lg:px-8 group hover:bg-[#F8FAFC] transition-colors">
                <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] group-hover:bg-[#1A3A8F] flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300">
                  <Icon size={19} className="text-[#1A3A8F] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-bold text-[#1A202C] text-sm group-hover:text-[#1A3A8F] transition-colors">
                    {locale === "en" ? en : locale === "ew" ? ew : fr}
                  </p>
                  <p className="text-[#4A5568] text-xs mt-0.5 leading-relaxed">
                    {locale === "en" ? descEn : locale === "ew" ? descEw : descFr}
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
