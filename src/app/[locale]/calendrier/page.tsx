import { useTranslations } from 'next-intl';
import SchoolCalendar from '@/components/calendar/SchoolCalendar';

export default function CalendrierPage() {
  const t = useTranslations('nav');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Calendrier Scolaire
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Consultez toutes les activités importantes de l'établissement : rentrées, examens, réunions, sorties et événements culturels.
          </p>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <SchoolCalendar />
        </div>
      </section>
    </div>
  );
}