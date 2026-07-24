import Image from "next/image";
import { CheckCircle2, Star, Globe, Sprout, Heart, Shield, Lightbulb } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "L'École",
  description:
    "Découvrez la mission, les valeurs et l'équipe du Complexe Scolaire Bilingue Les Génies d'Afrique.",
};

const VALEURS = [
  {
    icon: <Star size={28} className="text-[#1A3A8F]" />,
    titleFr: "Excellence",
    titleEn: "Excellence",
    fr: "Nous croyons que chaque enfant est capable de grandes choses. Nous cultivons une culture de l'effort, de l'ambition raisonnée et du dépassement de soi.",
    en: "We believe every child is capable of great things. We cultivate a culture of effort, measured ambition and self-surpassing.",
  },
  {
    icon: <Shield size={28} className="text-[#1A3A8F]" />,
    titleFr: "Intégrité",
    titleEn: "Integrity",
    fr: "Honnêteté, responsabilité et respect sont les piliers du comportement que nous inculquons dès le plus jeune âge.",
    en: "Honesty, responsibility and respect are the pillars of the behaviour we instil from the earliest age.",
  },
  {
    icon: <Globe size={28} className="text-[#1A3A8F]" />,
    titleFr: "Bilinguisme",
    titleEn: "Bilingualism",
    fr: "Maîtriser le français et l'anglais, c'est s'ouvrir à deux univers culturels et se donner les moyens de réussir partout dans le monde.",
    en: "Mastering French and English means opening up to two cultural worlds and giving yourself the means to succeed anywhere in the world.",
  },
  {
    icon: <Lightbulb size={28} className="text-[#1A3A8F]" />,
    titleFr: "Innovation",
    titleEn: "Innovation",
    fr: "De l'agriculture scolaire à l'entrepreneuriat junior, nous préparons nos élèves au monde de demain.",
    en: "From school farming to junior entrepreneurship, we prepare our students for tomorrow's world.",
  },
  {
    icon: <Heart size={28} className="text-[#1A3A8F]" />,
    titleFr: "Bienveillance",
    titleEn: "Care",
    fr: "Un enfant épanoui apprend mieux. Notre école est un espace de confiance, de respect mutuel et de soutien affectif.",
    en: "A happy child learns better. Our school is a space of trust, mutual respect and emotional support.",
  },
  {
    icon: <Sprout size={28} className="text-[#1A3A8F]" />,
    titleFr: "Développement global",
    titleEn: "Holistic Development",
    fr: "Nous développons l'enfant dans toutes ses dimensions : intellectuelle, physique, créative et morale.",
    en: "We develop the child in all their dimensions: intellectual, physical, creative and moral.",
  },
];

const TIMELINE = [
  { year: "2024", fr: "Fondation de l'établissement et construction des locaux à Nkozoa, Yaoundé.", en: "Foundation of the school and construction of premises in Nkozoa, Yaoundé." },
  { year: "Fév. 2025", fr: "Obtention de l'agrément officiel du MINEDUB — Arrêté N°103/j1/7/A/MINEDUB/SG/DSEPB/SDAAP.", en: "Official MINEDUB accreditation obtained — Order No. 103/j1/7/A/MINEDUB/SG/DSEPB/SDAAP." },
  { year: "Sept. 2025", fr: "Ouverture officielle et accueil des premiers élèves de la crèche au primaire.", en: "Official opening and welcome of first students from day care to primary school." },
  { year: "2026", fr: "Extension des programmes pédagogiques, lancement du site web et développement de la communauté scolaire.", en: "Extension of educational programmes, website launch and development of the school community." },
];

export default function PresentationPage() {
  return (
    <>
      <PageHero
        title="L'École / The School"
        subtitle="Notre mission, nos valeurs, notre histoire"
        image="/images/IMG-20260723-WA0056.jpg"
        breadcrumbs={[
          { label: "Accueil / Home", href: "/" },
          { label: "L'École / The School" },
        ]}
      />

      {/* ── MOT DU DIRECTEUR ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative aspect-[3/4] max-w-[380px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/IMG-20260723-WA0075.jpg"
                  alt="Le Directeur du Complexe Scolaire Bilingue Les Génies d'Afrique"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              {/* Badge signature */}
              <div className="absolute -bottom-4 -right-4 lg:right-8 bg-[#D32F2F] text-white rounded-2xl px-5 py-3 shadow-lg">
                <p className="font-bold text-sm">Le Directeur</p>
                <p className="text-white/70 text-xs">The Principal</p>
              </div>
            </div>

            <div>
              <SectionBadge>Mot du Directeur / Director&apos;s Message</SectionBadge>
              <h2
                className="font-display font-bold text-[#1A202C] mb-6"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
              >
                Bienvenue dans notre famille
              </h2>

              <blockquote className="border-l-4 border-[#F5A623] pl-6 mb-6">
                <p className="font-display italic text-[#4A5568] text-lg leading-relaxed mb-4">
                  &laquo; Notre établissement est né d&apos;une conviction profonde : chaque enfant porte en lui
                  un génie unique, qu&apos;il revient à l&apos;école de révéler et de cultiver. Ici, nous ne
                  nous contentons pas d&apos;instruire — nous éduquons, nous accompagnons, nous inspirons. &raquo;
                </p>
                <p className="font-display italic text-[#4A5568] text-base leading-relaxed">
                  &ldquo;Our institution was born from a deep conviction: every child carries a unique
                  genius within them, and it is the school&apos;s role to reveal and nurture it. Here,
                  we do not merely instruct — we educate, we support, we inspire.&rdquo;
                </p>
              </blockquote>

              <p className="text-[#4A5568] leading-relaxed mb-4">
                Notre équipe s&apos;engage chaque jour à offrir à votre enfant le meilleur environnement
                d&apos;apprentissage bilingue, dans le respect de ses rythmes et de sa personnalité.
              </p>
              <p className="text-[#4A5568] leading-relaxed">
                Our team is committed every day to providing your child with the best bilingual
                learning environment, respecting their rhythm and personality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── NOTRE HISTOIRE / TIMELINE ── */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[800px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <SectionBadge>Notre Histoire / Our History</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C]"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              Une école née d&apos;une vision
            </h2>
          </div>

          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-[#E2E8F0]" />

            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  {/* Point + Année */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-[#1A3A8F] flex items-center justify-center shadow-md z-10">
                      <span className="text-white text-xs font-bold text-center leading-tight px-1">
                        {item.year}
                      </span>
                    </div>
                  </div>

                  {/* Texte */}
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E2E8F0] flex-1 mt-2">
                    <p className="text-[#1A202C] font-medium text-sm mb-1">{item.fr}</p>
                    <p className="text-[#4A5568] text-sm italic">{item.en}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NOS VALEURS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <SectionBadge>Nos Valeurs / Our Values</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C]"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              Ce en quoi nous croyons
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {VALEURS.map((v, i) => (
              <div
                key={i}
                className="group p-7 rounded-2xl border border-[#E2E8F0]
                  hover:border-[#1A3A8F]/30 hover:shadow-[0_8px_32px_rgba(26,58,143,0.10)]
                  hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center mb-4
                  group-hover:bg-[#1A3A8F] group-hover:scale-110 transition-all duration-300">
                  <span className="group-hover:[&>svg]:text-white transition-colors duration-300">
                    {v.icon}
                  </span>
                </div>
                <h3 className="font-display font-bold text-[#1A202C] text-lg mb-1">
                  {v.titleFr}
                  <span className="text-[#4A5568] font-normal text-sm ml-2">/ {v.titleEn}</span>
                </h3>
                <p className="text-[#4A5568] text-sm leading-relaxed mb-2">{v.fr}</p>
                <p className="text-[#4A5568]/70 text-sm leading-relaxed italic">{v.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGRÉMENT ── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}
      >
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 text-center">
          <SectionBadge variant="white">Accréditation officielle / Official Accreditation</SectionBadge>
          <h2
            className="font-display font-bold text-white mb-6"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
          >
            Un établissement reconnu par l&apos;État du Cameroun
          </h2>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur-sm
            rounded-2xl px-8 py-6 border border-white/20">
            <CheckCircle2 size={40} className="text-[#F5A623] flex-shrink-0" />
            <div className="text-left">
              <p className="text-white font-bold text-base">Arrêté N°103/j1/7/A/MINEDUB/SG/DSEPB/SDAAP</p>
              <p className="text-white/70 text-sm">14 février 2025 — Ministère de l&apos;Éducation de Base</p>
              <p className="text-white/50 text-xs mt-1 italic">Ministry of Basic Education — February 14, 2025</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
