import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import FullGallery from "@/components/sections/FullGallery";
import Link from "next/link";
import { ArrowRight, Sprout, Music, Trophy, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vie Scolaire",
  description:
    "Galerie photos, projets et activités périscolaires du Complexe Scolaire Bilingue Les Génies d'Afrique.",
};

const ACTIVITES = [
  {
    icon: <Sprout size={28} className="text-[#1A3A8F]" />,
    titleFr: "Projets agricoles",
    titleEn: "Farming Projects",
    descFr: "Agriculture, élevage et pisciculture au programme pour une éducation ancrée dans la réalité africaine.",
    descEn: "Farming, livestock and aquaculture as part of an education rooted in African reality.",
  },
  {
    icon: <Music size={28} className="text-[#1A3A8F]" />,
    titleFr: "Arts & Culture",
    titleEn: "Arts & Culture",
    descFr: "Théâtre, musique, danse et arts plastiques tout au long de l'année scolaire.",
    descEn: "Theatre, music, dance and visual arts throughout the school year.",
  },
  {
    icon: <Trophy size={28} className="text-[#1A3A8F]" />,
    titleFr: "Sport & Compétitions",
    titleEn: "Sports & Competitions",
    descFr: "Football, athlétisme et jeux collectifs pour le développement physique et l'esprit d'équipe.",
    descEn: "Football, athletics and team games for physical development and team spirit.",
  },
  {
    icon: <Users size={28} className="text-[#1A3A8F]" />,
    titleFr: "Événements scolaires",
    titleEn: "School Events",
    descFr: "Fêtes, cérémonies, journées portes ouvertes et remises de prix rythment la vie de l'école.",
    descEn: "Celebrations, ceremonies, open days and award ceremonies mark the school year.",
  },
];

export default function VieScolairePage() {
  return (
    <>
      <PageHero
        title="Vie Scolaire / School Life"
        subtitle="Un cadre inspirant, des élèves épanouis"
        image="/images/IMG-20260723-WA0051.jpg"
        breadcrumbs={[
          { label: "Accueil / Home", href: "/" },
          { label: "Vie Scolaire / School Life" },
        ]}
      />

      {/* ── ACTIVITÉS PÉRISCOLAIRES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <SectionBadge>Activités / Activities</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C]"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              Une école qui vit !
            </h2>
            <p className="text-[#4A5568] mt-2 max-w-xl mx-auto">
              Au-delà des cours, les élèves s&apos;épanouissent à travers une multitude d&apos;activités
              enrichissantes. <span className="italic text-sm block">Beyond classes, students thrive through a wide range of enriching activities.</span>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACTIVITES.map((act, i) => (
              <div
                key={i}
                className="group p-7 rounded-2xl border border-[#E2E8F0] text-center
                  hover:border-[#1A3A8F]/30 hover:shadow-[0_8px_32px_rgba(26,58,143,0.10)]
                  hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] flex items-center justify-center mb-5 mx-auto
                  group-hover:bg-[#1A3A8F] group-hover:scale-110 transition-all duration-300">
                  <span className="group-hover:[&>svg]:text-white transition-colors duration-300">
                    {act.icon}
                  </span>
                </div>
                <h3 className="font-display font-bold text-[#1A202C] text-base mb-1">
                  {act.titleFr}
                </h3>
                <p className="text-[#4A5568]/60 text-xs italic mb-3">{act.titleEn}</p>
                <p className="text-[#4A5568] text-sm leading-relaxed">{act.descFr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERIE COMPLÈTE ── */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <SectionBadge>Galerie / Gallery</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C]"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              La vie à l&apos;école en images
            </h2>
            <p className="text-[#4A5568] mt-2 italic text-sm">School life in pictures</p>
          </div>
          <FullGallery />
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}
      >
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-white text-2xl mb-4">
            Votre enfant mérite le meilleur
          </h2>
          <p className="text-white/75 mb-8 italic text-sm">
            Your child deserves the best. Join us — enrollment is open.
          </p>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#D32F2F] text-white
              font-semibold shadow-[0_4px_20px_rgba(211,47,47,0.4)]
              hover:bg-[#B71C1C] hover:-translate-y-0.5 transition-all duration-200"
          >
            S&apos;inscrire maintenant / Enroll Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
