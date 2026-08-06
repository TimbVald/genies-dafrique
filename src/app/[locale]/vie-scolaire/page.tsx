import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { BookOpen, Palette, Music, Dumbbell, Sprout, Briefcase, Calendar, Users, MapPin, PartyPopper } from 'lucide-react';
import SectionBadge from '@/components/ui/SectionBadge';

export default function VieScolairePage() {
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
          <SectionBadge>Vie Scolaire</SectionBadge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            La Vie Scolaire
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Bien plus que des cours : des clubs, des projets, des sorties, des fêtes et des souvenirs gravés pour la vie.
          </p>
        </div>
      </section>

      {/* Clubs Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge>Clubs Scolaires</SectionBadge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              6 clubs pour révéler tous les talents
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Chaque élève peut explorer ses passions et développer ses compétences dans nos clubs parascolaires
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ClubCard
              icon={<BookOpen className="w-6 h-6" />}
              title="Club Débat & Lecture"
              description="Développer l'argumentation, l'éloquence et l'amour de la lecture. Séances hebdomadaires : débats, cercles littéraires, concours d'éloquence."
              emoji="📚"
              color="blue"
            />
            <ClubCard
              icon={<Palette className="w-6 h-6" />}
              title="Club des Arts"
              description="Peinture, dessin, sculpture, collage, arts plastiques et visuels. Expositions finales et projets de décoration murale de l'école."
              emoji="🎨"
              color="purple"
            />
            <ClubCard
              icon={<Music className="w-6 h-6" />}
              title="Club Musique & Chant"
              description="Chorale, éveil musical, pratique d'instruments (percussions, piano, guitare). Présentations lors des manifestations culturelles."
              emoji="🎵"
              color="pink"
            />
            <ClubCard
              icon={<Dumbbell className="w-6 h-6" />}
              title="Club Sportif"
              description="Football, basketball, athlétisme, natation et sports collectifs. Tournois inter-classes et rencontres amicales inter-établissements."
              emoji="⚽"
              color="green"
            />
            <ClubCard
              icon={<Sprout className="w-6 h-6" />}
              title="Club Agriculture & Élevage"
              description="Pratique de jardinage, petits élevages (lapins, poules), culture de légumes et fruits. Sensibilisation à l'environnement et au monde rural."
              emoji="🌱"
              color="emerald"
            />
            <ClubCard
              icon={<Briefcase className="w-6 h-6" />}
              title="Club Entreprenariat Junior"
              description="Mini-entreprises créées et gérées par les élèves : mini-coopératives, fabrication de savons, vente de produits du potager, éducation financière."
              emoji="💼"
              color="orange"
            />
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge>Activités Quotidiennes</SectionBadge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Apprendre autrement, s'épanouir toujours
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Au-delà des programmes officiels, nous organisons toute l'année une multitude d'activités pour rendre l'école attrayante et vivante
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ActivityCard
              icon={<Users className="w-8 h-8" />}
              title="Travail collaboratif"
              description="Projets de groupe et activités d'équipe qui développent la coopération, l'entraide et les compétences sociales."
              color="blue"
            />
            <ActivityCard
              icon={<Calendar className="w-8 h-8" />}
              title="Temps de lecture"
              description="Moment quotidien de lecture en français et en anglais pour cultiver l'amour des livres et développer la fluidité de lecture."
              color="indigo"
            />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge>Grands Événements</SectionBadge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Les moments forts de l'année scolaire
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Manifestations culturelles et sportives qui rythment notre année et rassemblent toute la communauté
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <EventCard
              month="Octobre"
              title="Journée Portes Ouvertes"
              description="Découverte de l'école, démonstrations pédagogiques et rencontres avec les enseignants."
              icon={<MapPin className="w-5 h-5" />}
            />
            <EventCard
              month="Décembre"
              title="Festival Bilingue"
              description="Célébration du bilinguisme, des cultures africaines et de la diversité."
              icon={<PartyPopper className="w-5 h-5" />}
            />
            <EventCard
              month="Mars"
              title="Olympiades Sportives"
              description="Tournoi sportif inter-classes : athlétisme, football, basketball et remise de trophées."
              icon={<Dumbbell className="w-5 h-5" />}
            />
            <EventCard
              month="Juin"
              title="Cérémonie de Fin d'Année"
              description="Spectacle des élèves, remise des prix d'excellence et pot final entre familles et enseignants."
              icon={<Calendar className="w-5 h-5" />}
            />
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <SectionBadge>À venir</SectionBadge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Plus de contenu à venir
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Nous travaillons sur d'autres sections pour enrichir la vie scolaire : galerie d'activités, sorties pédagogiques et événements culturels.
          </p>
        </div>
      </section>
    </div>
  );
}

function ClubCard({ icon, title, description, emoji, color }: { icon: React.ReactNode; title: string; description: string; emoji: string; color: string }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    pink: "bg-pink-100 text-pink-600",
    green: "bg-green-100 text-green-600",
    emerald: "bg-emerald-100 text-emerald-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-14 h-14 ${colorClasses[color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center text-3xl flex-shrink-0`}>
          {emoji}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-2 text-lg">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ActivityCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) {
  const colorClasses = {
    blue: "bg-blue-600",
    indigo: "bg-indigo-600",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100"
    >
      <div className={`${colorClasses[color as keyof typeof colorClasses]} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6`}>
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 mb-3 text-xl">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function EventCard({ month, title, description, icon }: { month: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
    >
      <div className="text-blue-600 font-bold text-sm mb-2">{month}</div>
      <div className="flex items-center gap-2 mb-3">
        <div className="text-blue-600">{icon}</div>
        <h3 className="font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}