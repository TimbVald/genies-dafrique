import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Les dernières actualités du Complexe Scolaire Bilingue Les Génies d'Afrique.",
};

const NEWS = [
  {
    id: "rentree-2025",
    date: "Septembre 2025",
    category: "Événements",
    titleFr: "Rentrée scolaire 2025-2026 : un nouveau chapitre !",
    titleEn: "Back to School 2025-2026: A New Chapter!",
    excerpt: "L'école a officiellement ouvert ses portes à la rentrée de septembre 2025 avec enthousiasme et de nombreux nouveaux élèves. Une rentrée historique pour Les Génies d'Afrique.",
    image: "/images/IMG-20260723-WA0006.jpg",
  },
  {
    id: "agrement-minedub",
    date: "Février 2025",
    category: "Institutionnel",
    titleFr: "Obtention de l'agrément officiel MINEDUB",
    titleEn: "Official MINEDUB Accreditation Obtained",
    excerpt: "Le Complexe Scolaire Bilingue Les Génies d'Afrique a obtenu son agrément officiel du Ministère de l'Éducation de Base du Cameroun, une étape fondatrice pour l'établissement.",
    image: "/images/IMG-20260723-WA0022.jpg",
  },
  {
    id: "projets-agricoles",
    date: "Octobre 2025",
    category: "Pédagogie",
    titleFr: "Lancement des projets agricoles et d'élevage",
    titleEn: "Launch of Farming and Livestock Projects",
    excerpt: "Les élèves du primaire ont lancé leurs premiers projets d'agriculture scolaire et d'élevage, découvrant la culture des légumes et l'élevage de volaille sur le terrain de l'école.",
    image: "/images/IMG-20260723-WA0013.jpg",
  },
  {
    id: "fete-noel-2025",
    date: "Décembre 2025",
    category: "Événements",
    titleFr: "Fête de fin d'année : spectacle et remise de prix",
    titleEn: "End-of-Year Celebration: Show and Prize Giving",
    excerpt: "La première grande fête scolaire des Génies d'Afrique a réuni parents, élèves et enseignants pour une soirée inoubliable, couronnée par la remise des prix d'excellence.",
    image: "/images/IMG-20260723-WA0034.jpg",
  },
  {
    id: "inscriptions-2026",
    date: "Juillet 2026",
    category: "Admissions",
    titleFr: "Inscriptions ouvertes pour l'année scolaire 2026-2027",
    titleEn: "Enrollment Open for the 2026-2027 School Year",
    excerpt: "Les inscriptions pour la rentrée de septembre 2026 sont officiellement ouvertes. Venez déposer votre dossier au secrétariat du lundi au vendredi de 8h à 13h.",
    image: "/images/IMG-20260723-WA0039.jpg",
  },
  {
    id: "journee-sport",
    date: "Novembre 2025",
    category: "Sports",
    titleFr: "Journée sportive inter-classes : les champions sont désignés !",
    titleEn: "Inter-class Sports Day: Champions Are Crowned!",
    excerpt: "La première journée sportive de l'école a mobilisé tous les élèves autour de compétitions de football et d'athlétisme dans une ambiance festive et compétitive.",
    image: "/images/IMG-20260723-WA0017.jpg",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Événements:     "bg-[#EEF2FF] text-[#1A3A8F]",
  Institutionnel: "bg-[#FFF0F0] text-[#D32F2F]",
  Pédagogie:      "bg-[#F0FFF4] text-[#2E7D32]",
  Admissions:     "bg-[#FFF8EE] text-[#F5A623]",
  Sports:         "bg-[#F0F9FF] text-[#0284C7]",
};

export default function ActualitesPage() {
  const [featured, ...rest] = NEWS;

  return (
    <>
      <PageHero
        title="Actualités / News"
        subtitle="Toute la vie de l'école — All school news"
        image="/images/IMG-20260723-WA0034.jpg"
        breadcrumbs={[
          { label: "Accueil / Home", href: "/" },
          { label: "Actualités / News" },
        ]}
      />

      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

          {/* Article mis en avant */}
          <div className="mb-16">
            <SectionBadge>À la une / Featured</SectionBadge>
            <Link
              href={`/actualites/${featured.id}`}
              className="group grid lg:grid-cols-2 gap-8 items-center rounded-2xl overflow-hidden
                border border-[#E2E8F0] hover:shadow-[0_8px_40px_rgba(26,58,143,0.12)]
                hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-video lg:aspect-auto lg:h-full min-h-[260px] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.titleFr}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${CATEGORY_COLORS[featured.category] ?? "bg-[#EEF2FF] text-[#1A3A8F]"}`}>
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1 text-[#4A5568] text-xs">
                    <Calendar size={13} /> {featured.date}
                  </span>
                </div>
                <h2 className="font-display font-bold text-[#1A202C] text-2xl mb-2">
                  {featured.titleFr}
                </h2>
                <p className="text-[#4A5568]/70 text-sm italic mb-4">{featured.titleEn}</p>
                <p className="text-[#4A5568] leading-relaxed mb-6">{featured.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-[#1A3A8F] font-semibold text-sm
                  group-hover:gap-3 transition-all duration-200">
                  Lire la suite / Read More <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </div>

          {/* Grille articles */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article) => (
              <Link
                key={article.id}
                href={`/actualites/${article.id}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E2E8F0]
                  hover:shadow-[0_8px_32px_rgba(26,58,143,0.10)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.titleFr}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${CATEGORY_COLORS[article.category] ?? "bg-[#EEF2FF] text-[#1A3A8F]"}`}>
                      <Tag size={10} className="inline mr-1" />{article.category}
                    </span>
                    <span className="text-[#4A5568] text-xs flex items-center gap-1">
                      <Calendar size={11} /> {article.date}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-[#1A202C] text-lg mb-2 line-clamp-2">
                    {article.titleFr}
                  </h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[#1A3A8F] font-semibold text-sm
                    group-hover:gap-2.5 transition-all duration-200">
                    Lire la suite <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
