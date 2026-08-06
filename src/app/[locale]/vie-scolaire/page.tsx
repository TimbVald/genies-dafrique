import { useTranslations } from 'next-intl';
import { BookOpen, Palette, Music, Dumbbell, Sprout, Briefcase, Sparkles } from 'lucide-react';

export default function VieScolairePage() {
  const t = useTranslations('nav');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Vie Scolaire</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            La Vie Scolaire
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Bien plus que des cours : des clubs, des projets, des sorties, des fêtes et des souvenirs gravés pour la vie.
          </p>
        </div>
      </section>

      {/* Clubs Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Clubs Scolaires
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              6 clubs pour révéler tous les talents de nos élèves
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ClubCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Club Débat & Lecture"
              description="Développer l'argumentation, l'éloquence et l'amour de la lecture."
              emoji="📚"
            />
            <ClubCard
              icon={<Palette className="w-8 h-8" />}
              title="Club des Arts"
              description="Peinture, dessin, sculpture et arts plastiques."
              emoji="🎨"
            />
            <ClubCard
              icon={<Music className="w-8 h-8" />}
              title="Club Musique & Chant"
              description="Chorale, éveil musical et pratique d'instruments."
              emoji="🎵"
            />
            <ClubCard
              icon={<Dumbbell className="w-8 h-8" />}
              title="Club Sportif"
              description="Football, basketball, athlétisme et sports collectifs."
              emoji="⚽"
            />
            <ClubCard
              icon={<Sprout className="w-8 h-8" />}
              title="Club Agriculture & Élevage"
              description="Jardinage, petits élevages et culture de légumes."
              emoji="🌱"
            />
            <ClubCard
              icon={<Briefcase className="w-8 h-8" />}
              title="Club Entreprenariat Junior"
              description="Mini-entreprises et éducation financière."
              emoji="💼"
            />
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">À venir</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Plus de contenu à venir
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous travaillons sur d'autres sections pour enrichir la vie scolaire : galerie d'activités, sorties pédagogiques et événements culturels.
          </p>
        </div>
      </section>
    </div>
  );
}

function ClubCard({ icon, title, description, emoji }: { icon: React.ReactNode; title: string; description: string; emoji: string }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
          {emoji}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}