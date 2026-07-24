import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Users, Globe, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Crèche, maternelle et primaire bilingue à Yaoundé. Découvrez nos programmes FR/EN et nos projets pédagogiques.",
};

const PROGRAMMES = [
  {
    id: "creche",
    badge: "0 – 2 ans",
    badgeEn: "0 – 2 years",
    titleFr: "Crèche",
    titleEn: "Day Care",
    image: "/images/IMG-20260723-WA0004.jpg",
    descFr:
      "Un environnement sécurisé, chaleureux et affectif pour les tout-petits de 0 à 2 ans. Nos éducatrices diplômées proposent des activités d'éveil sensoriel, de motricité et de socialisation adaptées à chaque stade du développement. Les premiers mots en français et en anglais sont introduits naturellement dès cet âge.",
    descEn:
      "A safe, warm and affectionate environment for toddlers aged 0 to 2. Our qualified educators offer sensory, motor and social development activities tailored to each developmental stage. First words in French and English are naturally introduced from this age.",
    points: [
      "Éveil sensoriel / Sensory development",
      "Motricité fine et globale / Fine & gross motor skills",
      "Premiers mots FR & EN / First words in FR & EN",
      "Activités musicales / Musical activities",
      "Socialisation en petits groupes / Small group socialisation",
    ],
  },
  {
    id: "maternelle",
    badge: "2 – 5 ans",
    badgeEn: "2 – 5 years",
    titleFr: "Maternelle",
    titleEn: "Nursery",
    image: "/images/IMG-20260723-WA0005.jpg",
    descFr:
      "De 2 à 5 ans, la section maternelle (Pré-nursery et Nursery) offre à l'enfant un espace d'épanouissement complet. Jeux éducatifs, arts plastiques, éveil musical, initiation à la lecture et aux mathématiques, jardinage pédagogique : chaque journée est une aventure d'apprentissage. L'immersion bilingue est totale et naturelle.",
    descEn:
      "From 2 to 5 years, the nursery section (Pre-Nursery and Nursery) offers children a complete space for development. Educational games, arts and crafts, musical awakening, introduction to reading and mathematics, educational gardening: every day is a learning adventure. Bilingual immersion is total and natural.",
    points: [
      "Pré-lecture et pré-écriture / Pre-reading & pre-writing",
      "Initiation aux mathématiques / Maths introduction",
      "Arts plastiques & créatifs / Arts & crafts",
      "Jardinage pédagogique / Educational gardening",
      "Éveil musical bilingue / Bilingual musical awakening",
    ],
  },
  {
    id: "primaire-fr",
    badge: "6 – 12 ans · Français",
    badgeEn: "6 – 12 years · French",
    titleFr: "Primaire Francophone",
    titleEn: "French Primary",
    image: "/images/IMG-20260723-WA0007.jpg",
    descFr:
      "La section primaire francophone suit les programmes officiels du MINEDUB, enrichis de contenus pédagogiques complémentaires. Du CP au CM2, les élèves développent des compétences solides en français, mathématiques, sciences et histoire-géographie. L'anglais est enseigné en intensif à raison de plusieurs heures par semaine.",
    descEn:
      "The French primary section follows the official MINEDUB programmes, enriched with complementary teaching content. From Grade 1 to Grade 6, students develop strong skills in French, maths, sciences and social studies. English is taught intensively for several hours per week.",
    points: [
      "Programme officiel MINEDUB / Official MINEDUB curriculum",
      "Anglais intensif (4h/semaine) / Intensive English (4h/week)",
      "Sciences & environnement / Science & environment",
      "Éducation civique & morale / Civic & moral education",
      "Activités agricoles / Agricultural activities",
    ],
  },
  {
    id: "primaire-en",
    badge: "6 – 12 ans · Anglais",
    badgeEn: "6 – 12 years · English",
    titleFr: "Primaire Anglophone",
    titleEn: "English Primary",
    image: "/images/IMG-20260723-WA0012.jpg",
    descFr:
      "La section primaire anglophone propose un curriculum anglophone rigoureux, en conformité avec les directives du MINEDUB. L'enseignement se fait majoritairement en anglais, avec une place importante accordée au français comme langue seconde. Les élèves progressent vers les meilleures filières secondaires anglophones.",
    descEn:
      "The English primary section offers a rigorous anglophone curriculum, in full compliance with MINEDUB guidelines. Teaching is conducted primarily in English, with significant space given to French as a second language. Students confidently progress towards the best anglophone secondary schools.",
    points: [
      "Curriculum anglophone MINEDUB / MINEDUB anglophone curriculum",
      "Français langue seconde / French as second language",
      "English literacy & numeracy",
      "Sciences en anglais / Science in English",
      "Préparation lycée anglophone / Anglophone secondary prep",
    ],
  },
];

const PROJETS = [
  { emoji: "🌱", titleFr: "Agriculture scolaire", titleEn: "School Farming", descFr: "Les élèves cultivent leur propre jardin, apprenant les bases de l'agronomie.", descEn: "Students grow their own garden, learning the basics of agronomy." },
  { emoji: "🐄", titleFr: "Élevage", titleEn: "Livestock", descFr: "Initiation à l'élevage responsable (poules, lapins) dans l'enceinte de l'école.", descEn: "Introduction to responsible livestock rearing (chickens, rabbits) on campus." },
  { emoji: "🐟", titleFr: "Pisciculture", titleEn: "Aquaculture", descFr: "Découverte de l'aquaculture et de la gestion d'un bassin piscicole.", descEn: "Introduction to aquaculture and fish pond management." },
  { emoji: "💡", titleFr: "Mini-entreprises", titleEn: "Junior Entrepreneurship", descFr: "Projets entrepreneuriaux supervisés pour développer l'esprit d'initiative.", descEn: "Supervised entrepreneurial projects to develop initiative and creativity." },
  { emoji: "🎭", titleFr: "Arts & Culture", titleEn: "Arts & Culture", descFr: "Théâtre, danse, musique africaine et internationale tout au long de l'année.", descEn: "Theatre, dance, African and international music throughout the year." },
  { emoji: "⚽", titleFr: "Sport", titleEn: "Sports", descFr: "Football, athlétisme, jeux collectifs pour le développement physique et l'esprit d'équipe.", descEn: "Football, athletics, team games for physical development and team spirit." },
];

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        title="Nos Programmes / Our Programs"
        subtitle="Un parcours complet de 0 à 12 ans"
        image="/images/IMG-20260723-WA0008.jpg"
        breadcrumbs={[
          { label: "Accueil / Home", href: "/" },
          { label: "Programmes / Programs" },
        ]}
      />

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <SectionBadge>Programmes / Programs</SectionBadge>
          <h2
            className="font-display font-bold text-[#1A202C] mb-4"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
          >
            Une pédagogie adaptée à chaque âge
          </h2>
          <p className="text-[#4A5568] text-lg leading-relaxed mb-2">
            Du tout premier âge jusqu&apos;à la fin du cycle primaire, chaque programme est conçu pour
            correspondre précisément aux besoins développementaux de l&apos;enfant.
          </p>
          <p className="text-[#4A5568]/80 text-base italic">
            From early childhood through the end of primary school, every programme is designed to
            precisely match the developmental needs of the child.
          </p>
        </div>
      </section>

      {/* Programmes détaillés */}
      <section className="pb-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 space-y-20">
          {PROGRAMMES.map((prog, i) => (
            <article
              key={prog.id}
              id={prog.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video">
                <Image
                  src={prog.image}
                  alt={prog.titleFr}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1A3A8F]/90
                  text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  {prog.badge}
                </span>
              </div>

              {/* Contenu */}
              <div>
                <div className="mb-2">
                  <span className="text-xs font-bold text-[#D32F2F] uppercase tracking-widest">{prog.titleEn}</span>
                </div>
                <h3
                  className="font-display font-bold text-[#1A202C] mb-4"
                  style={{ fontSize: "clamp(1.4rem, 2vw, 2rem)" }}
                >
                  {prog.titleFr}
                </h3>
                <p className="text-[#4A5568] leading-relaxed mb-2">{prog.descFr}</p>
                <p className="text-[#4A5568]/75 text-sm italic leading-relaxed mb-6">{prog.descEn}</p>

                {/* Points forts */}
                <ul className="space-y-2.5 mb-8">
                  {prog.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#D32F2F] flex-shrink-0 mt-0.5" />
                      <span className="text-[#4A5568] text-sm">{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Infos pratiques */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-[#4A5568]">
                    <Clock size={16} className="text-[#1A3A8F]" />
                    <span>Lun–Ven · 7h30–15h00</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4A5568]">
                    <Users size={16} className="text-[#1A3A8F]" />
                    <span>Petits effectifs (&lt;25 élèves)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4A5568]">
                    <Globe size={16} className="text-[#1A3A8F]" />
                    <span>FR + EN</span>
                  </div>
                </div>

                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#D32F2F] text-white
                    font-semibold text-sm shadow-[0_4px_15px_rgba(211,47,47,0.3)]
                    hover:bg-[#B71C1C] hover:-translate-y-0.5 transition-all duration-200"
                >
                  S&apos;inscrire dans ce programme / Enroll
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Projets pédagogiques */}
      <section
        className="py-24"
        style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <SectionBadge variant="white">Projets Pédagogiques / Educational Projects</SectionBadge>
            <h2
              className="font-display font-bold text-white"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              Apprendre par l&apos;action
            </h2>
            <p className="text-white/70 mt-2 max-w-xl mx-auto">
              Des projets uniques qui distinguent Les Génies d&apos;Afrique de tous les autres établissements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJETS.map((p, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20
                  hover:bg-white/15 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{p.emoji}</div>
                <h3 className="font-display font-bold text-white text-lg mb-1">
                  {p.titleFr}
                  <span className="text-white/50 font-normal text-sm ml-2">/ {p.titleEn}</span>
                </h3>
                <p className="text-white/75 text-sm leading-relaxed mb-1">{p.descFr}</p>
                <p className="text-white/50 text-xs italic">{p.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA inscription */}
      <section className="py-16 bg-white">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-[#1A202C] text-2xl mb-4">
            Prêt à rejoindre les Génies d&apos;Afrique ?
          </h2>
          <p className="text-[#4A5568] mb-8">
            Ready to join Les Génies d&apos;Afrique? Our team is available Monday to Friday, 8AM–1PM.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg
                bg-[#D32F2F] text-white font-semibold shadow-[0_4px_15px_rgba(211,47,47,0.35)]
                hover:bg-[#B71C1C] hover:-translate-y-0.5 transition-all duration-200"
            >
              Procédure d&apos;admission / Enroll Now
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg
                border-2 border-[#1A3A8F] text-[#1A3A8F] font-semibold
                hover:bg-[#1A3A8F] hover:text-white transition-all duration-200"
            >
              Nous contacter / Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
