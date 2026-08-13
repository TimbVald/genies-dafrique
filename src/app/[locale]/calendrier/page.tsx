import { useTranslations } from 'next-intl';
import SchoolCalendar from '@/components/calendar/SchoolCalendar';
import SectionBadge from '@/components/ui/SectionBadge';
import { Calendar as CalendarIcon, Sparkles } from 'lucide-react';

export default function CalendrierPage() {
  const t = useTranslations('nav');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1A3A8F] via-[#0D2A6F] to-[#1A3A8F] text-white py-20 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-300 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <CalendarIcon className="w-8 h-8 text-white" />
            </div>
            <SectionBadge variant="white">Calendrier Scolaire</SectionBadge>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Calendrier Scolaire
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
            Retrouvez les principales activités, événements et rendez-vous de la vie de notre établissement.
          </p>

          <div className="flex items-center justify-center gap-2 text-blue-200">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Cliquez sur un événement pour voir les détails</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SchoolCalendar />
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1A3A8F] to-[#0D2A6F] rounded-xl flex items-center justify-center mb-4">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Événements à venir</h3>
              <p className="text-sm text-gray-600">Consultez tous les événements programmés pour l'année scolaire.</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl border border-purple-100 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Filtrage par catégorie</h3>
              <p className="text-sm text-gray-600">Trouvez facilement les événements par type : vie scolaire, culturel, pédagogique...</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center mb-4">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Vues multiples</h3>
              <p className="text-sm text-gray-600">Affichez le calendrier par mois, semaine, jour ou en liste agenda.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}