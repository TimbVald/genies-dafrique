"use client";

import { useRef } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Monitor, Library, Sprout, Droplets,
  Dumbbell, Users, ArrowRight,
} from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

const hdrV: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const gridV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const cardV: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const POLES = [
  {
    icon: Monitor,
    color: "#1A3A8F",
    bg:    "#EEF2FF",
    href:  "/vie-scolaire",
    fr: {
      title: "Salle Informatique",
      desc:  "Des équipements numériques modernes pour initier les élèves au codage, à la bureautique et aux outils du monde de demain.",
    },
    en: {
      title: "Computer Lab",
      desc:  "Modern digital equipment to introduce students to coding, office tools and the technologies of tomorrow.",
    },
    ew: {
      title: "Bisɔ́m bya Informatique",
      desc:  "Bikɔ́l bya numérique bya mvoé amu a yeme bana coding na technologies ya ndɔ́ma.",
    },
  },
  {
    icon: Library,
    color: "#D32F2F",
    bg:    "#FFF0F0",
    href:  "/vie-scolaire",
    fr: {
      title: "Bibliothèque",
      desc:  "Un espace de lecture riche en ouvrages bilingues FR/EN pour cultiver le goût de lire dès le plus jeune âge.",
    },
    en: {
      title: "Library",
      desc:  "A reading space rich in FR/EN bilingual books to cultivate a love of reading from the earliest age.",
    },
    ew: {
      title: "Bibliothèque",
      desc:  "Ase ya a lɔ́g na minlɔ́m mingi FR/EN amu a yɔ́k mvoé ya a lɔ́g a tɔ́l mvoé mvoé.",
    },
  },
  {
    icon: Sprout,
    color: "#2E7D32",
    bg:    "#F0FFF4",
    href:  "/vie-scolaire",
    fr: {
      title: "Jardin & Ferme Pédagogique",
      desc:  "Agriculture scolaire, élevage et pisciculture : apprendre en cultivant, en nourrissant et en créant.",
    },
    en: {
      title: "School Garden & Farm",
      desc:  "School farming, livestock and aquaculture: learning by growing, raising and creating.",
    },
    ew: {
      title: "Jardin & Ferme ya Sukul",
      desc:  "Agriculture, élevage na pisciculture ya sukul : a yeme na a lɛ́g, na a lɔ́g na a tɔ́l.",
    },
  },
  {
    icon: Droplets,
    color: "#0288D1",
    bg:    "#E3F2FD",
    href:  "/vie-scolaire",
    fr: {
      title: "Hygiène & Coin d'Eau",
      desc:  "Infrastructures sanitaires adaptées et sensibilisation quotidienne à l'hygiène des mains et à la santé.",
    },
    en: {
      title: "Hygiene & Water Station",
      desc:  "Appropriate sanitary facilities and daily awareness of hand hygiene and health.",
    },
    ew: {
      title: "Nnam & Coin d'Eau",
      desc:  "Bikɔ́l bya nnam bya mbɔ́g na a yeme bana nnam ya miboko na mfañ ngon nyonso.",
    },
  },
  {
    icon: Dumbbell,
    color: "#F5A623",
    bg:    "#FFF8EE",
    href:  "/vie-scolaire",
    fr: {
      title: "Sport & Épanouissement",
      desc:  "Football, athlétisme, jeux collectifs : le sport au cœur du développement physique et de l'esprit d'équipe.",
    },
    en: {
      title: "Sports & Well-being",
      desc:  "Football, athletics, team games: sport at the heart of physical development and team spirit.",
    },
    ew: {
      title: "Nyam & Mfañ",
      desc:  "Football, athlétisme, bisala bya fam : nyam a ne nzame ya mfañ ya nyam na mfañ ya fam.",
    },
  },
  {
    icon: Users,
    color: "#7B1FA2",
    bg:    "#F3E8FF",
    href:  "/a-propos",
    fr: {
      title: "Encadrement Personnalisé",
      desc:  "Petits effectifs, suivi individuel de chaque élève et partenariat fort avec les familles pour une réussite garantie.",
    },
    en: {
      title: "Personalised Support",
      desc:  "Small class sizes, individual monitoring of each student and a strong partnership with families for guaranteed success.",
    },
    ew: {
      title: "A yen mwana nyonso",
      desc:  "Bana ba ne mvoé, a yen mwana nyonso na a kɔ́bɔ́talane na mbɔ́g na balɛ́g bana amu nyɔ́ñ.",
    },
  },
] as const;

type L = "fr" | "en" | "ew";

export default function ExcellenceSection() {
  const locale = useLocale();
  const L      = locale as L;
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const badge  = locale === "fr" ? "Nos Pôles d'Excellence" : locale === "en" ? "Our Poles of Excellence" : "Bikɔ́l bya Nyɔ́ñ";
  const title  = locale === "fr" ? "Un environnement propice à l'excellence" : locale === "en" ? "An environment conducive to excellence" : "Ase ya mvoé amu nyɔ́ñ";
  const sub    = locale === "fr"
    ? "De nos salles informatiques à notre ferme pédagogique, chaque espace contribue à une formation complète adaptée au monde d'aujourd'hui."
    : locale === "en"
    ? "From our computer labs to our school farm, every space contributes to a complete education adapted to today's world."
    : "Kobi na bisɔ́m bya informatique tii ferme ya sukul, ase nyonso a ne akom ya nyonso ya mbɔ́g.";
  const learnMore = locale === "fr" ? "En savoir plus" : locale === "en" ? "Learn more" : "A yeme mfañ";

  return (
    <section ref={ref} className="relative py-24 lg:py-28 bg-[#F7F9FC] overflow-hidden">
      {/* Décoration fond */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage: "radial-gradient(circle, #1A3A8F 1.5px, transparent 1.5px)",
          backgroundSize: "34px 34px",
        }}
        aria-hidden="true"
      />
      {/* Ligne top */}
      <div
        className="absolute top-0 inset-x-0 h-[3px]"
        style={{ background: "linear-gradient(90deg, transparent, #1A3A8F 30%, #2D5BE3 50%, #1A3A8F 70%, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* En-tête */}
        <motion.div
          className="text-center mb-14 max-w-2xl mx-auto"
          variants={hdrV}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <SectionBadge>{badge}</SectionBadge>
          <h2
            className="font-display font-bold text-[#1A202C] mt-1 mb-4"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}
          >
            {title}
          </h2>
          <p className="text-[#4A5568] leading-relaxed">{sub}</p>
        </motion.div>

        {/* Grille 6 pôles */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={gridV}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {POLES.map(({ icon: Icon, color, bg, href, ...p }, i) => {
            const d = p[L];
            return (
              <motion.div
                key={i}
                variants={cardV}
                className="group bg-white rounded-2xl p-6 border border-[#E2E8F0]
                  shadow-sm hover:shadow-xl hover:-translate-y-1.5
                  transition-all duration-350 flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Barre couleur haut */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
                  aria-hidden="true"
                />

                {/* Icône */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0
                    group-hover:scale-110 group-hover:rotate-2 transition-all duration-300"
                  style={{ backgroundColor: bg }}
                >
                  <Icon size={26} style={{ color }} strokeWidth={1.8} />
                </div>

                {/* Texte */}
                <div className="flex-1">
                  <h3
                    className="font-display font-bold text-[#1A202C] text-[1rem] mb-2 leading-snug
                      group-hover:transition-colors group-hover:duration-200"
                    style={{ ["--hover-color" as string]: color }}
                  >
                    {d.title}
                  </h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed">
                    {d.desc}
                  </p>
                </div>

                {/* Lien */}
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 text-sm font-bold
                    transition-colors duration-200 group/link mt-auto"
                  style={{ color }}
                >
                  {learnMore}
                  <ArrowRight
                    size={14}
                    className="group-hover/link:translate-x-1 transition-transform duration-200"
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
