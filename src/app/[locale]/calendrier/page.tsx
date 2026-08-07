"use client";

import { useTranslations } from 'next-intl';
import SchoolCalendar from '@/components/calendar/SchoolCalendar';
import SectionBadge from '@/components/ui/SectionBadge';

export default function CalendrierPage() {
  const t = useTranslations('nav');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1A3A8F] to-[#0D1F6B] text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionBadge variant="white">Calendrier Scolaire</SectionBadge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Calendrier Scolaire
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Retrouvez les principales activités, événements et rendez-vous de la vie de notre établissement.
          </p>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <SchoolCalendar />
        </div>
      </section>
    </div>
  );
}