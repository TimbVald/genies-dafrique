import type { LocalizedText } from "@/types";

/* ── À Propos Section Configuration (3-column layout) ───────────── */
export interface AproposSectionData {
  eyebrow: LocalizedText;
  title: LocalizedText;
  paragraph: LocalizedText;
  keyPoints: LocalizedText[];
  statistics: StatCardData[];
  photo: string;
}

export interface StatCardData {
  icon: string;
  value: string;
  suffix: string;
  label: LocalizedText;
  isHighlighted: boolean; // Middle card gets brand blue background
}

/* ── À Propos Section Data ────────────────────────────────────────── */
export const APROPOS_SECTION_DATA: AproposSectionData = {
  eyebrow: {
    fr: "À propos de nous",
    en: "About Us",
    ew: "Mvon mvo",
  },
  title: {
    fr: "Une école née pour révéler le génie de chaque enfant",
    en: "A School Born to Reveal Every Child's Genius",
    ew: "Sukul a nga bɔ́g na yɔ́k génie ya mwana nyonso",
  },
  paragraph: {
    fr: "Former des individus complets, équilibrés et compétitifs, capables de réussir dans un monde globalisé, tout en restant ancrés dans leurs valeurs culturelles africaines. Notre approche pédagogique innovante combine excellence académique et développement global de l'enfant.",
    en: "To shape complete, balanced and competitive individuals, capable of succeeding in a globalized world while remaining anchored in their African cultural values. Our innovative pedagogical approach combines academic excellence and holistic child development.",
    ew: "A lɛ́g bana ba ne na mfañ nyonso, ba yeme a kɔ́l na si ya mvoé, na a bɔ́g mimbɔ́g ya Afrika. Minsili mibuma ya biso bi lɛ́g nyɔ́n ya akom na a yɔ́k mwana nyonso.",
  },
  keyPoints: [
    {
      fr: "Enseignement bilingue français-anglais dès la crèche",
      en: "Bilingual French-English teaching from day care",
      ew: "Akom mibuma français-anglais kobi na crèche",
    },
    {
      fr: "Pédagogie active et projets éducatifs innovants",
      en: "Active pedagogy and innovative educational projects",
      ew: "Akom ya dzam na minkɔ́lɔ́ ya akom mibuma",
    },
    {
      fr: "Cadre bienveillant et sécurisant pour chaque enfant",
      en: "Caring and secure environment for every child",
      ew: "Ase ya mvoé na a yen mfañ na mwana nyonso",
    },
    {
      fr: "Agrément officiel MINEDUB et programmes reconnus",
      en: "Official MINEDUB accreditation and recognized programs",
      ew: "Agrément official MINEDUB na programme ya dzam",
    },
  ],
  statistics: [
    {
      icon: "Home",
      value: "2",
      suffix: "",
      label: {
        fr: "Sections bilingues",
        en: "Bilingual sections",
        ew: "Nzɔ́g mibuma",
      },
      isHighlighted: false,
    },
    {
      icon: "Award",
      value: "2025",
      suffix: "",
      label: {
        fr: "Année de création",
        en: "Year founded",
        ew: "Osu a tɔ́l",
      },
      isHighlighted: true, // Middle card highlighted in brand blue
    },
    {
      icon: "Eye",
      value: "100",
      suffix: "%",
      label: {
        fr: "Vision bilingue",
        en: "Bilingual vision",
        ew: "Mvon mibuma",
      },
      isHighlighted: false,
    },
  ],
  photo: "/images/IMG-20260723-WA0075.jpg", // Photo of the Director/Promoter
};

/* ── Get Apropos Section Data Function ─────────────────────────────── */
export function getAproposSectionData(): AproposSectionData {
  return APROPOS_SECTION_DATA;
}
