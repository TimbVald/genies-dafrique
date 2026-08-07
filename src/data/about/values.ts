import type { LocalizedText, BaseContent } from "@/types";

/* ── Value Configuration ──────────────────────────────────────────── */
export interface ValueItem extends BaseContent {
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  visible: boolean;
  order: number;
}

/* ── Values Data ─────────────────────────────────────────────────── */
export const VALUES_DATA: ValueItem[] = [
  {
    id: "value-excellence",
    slug: "excellence",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    title: {
      fr: "Excellence",
      en: "Excellence",
      ew: "Nyɔ́ñ",
    },
    description: {
      fr: "Viser le meilleur dans tous les domaines : académique, artistique, sportif et humain.",
      en: "Aim for the best in all areas: academic, artistic, sports and human.",
      ew: "A lɔ́g dzam ya libɔ́g na bikɔ́l nyonso: akom, misili, nyam na mfañ ya mwana.",
    },
    icon: "Trophy",
    visible: true,
    order: 1,
  },
  {
    id: "value-integrity",
    slug: "integrity",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    title: {
      fr: "Intégrité",
      en: "Integrity",
      ew: "Mbɔ́g ya mfañ",
    },
    description: {
      fr: "Cultiver l'honnêteté, la responsabilité et le respect des règles de vie collective.",
      en: "Cultivate honesty, responsibility and respect for collective life rules.",
      ew: "A yɔ́k mvoé, a tɔ́l dzam ya mfañ na a kɔ́l mimbɔ́g ya fam.",
    },
    icon: "ShieldCheck",
    visible: true,
    order: 2,
  },
  {
    id: "value-bilingualism",
    slug: "bilingualism",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    title: {
      fr: "Bilinguisme",
      en: "Bilingualism",
      ew: "Bilinguisme",
    },
    description: {
      fr: "Maîtriser le français et l'anglais comme outils d'ouverture sur le monde et d'excellence académique.",
      en: "Master French and English as tools for openness to the world and academic excellence.",
      ew: "A yeme français na anglais amu a kɔ́l si nyonso na a yeme akom.",
    },
    icon: "Globe",
    visible: true,
    order: 3,
  },
  {
    id: "value-innovation",
    slug: "innovation",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    title: {
      fr: "Innovation",
      en: "Innovation",
      ew: "Minlɔ́m ya mvoé",
    },
    description: {
      fr: "Explorer de nouvelles méthodes pédagogiques et développer la créativité et l'esprit critique.",
      en: "Explore new teaching methods and develop creativity and critical thinking.",
      ew: "A yen minkɔ́lɔ́ ya akom mibuma na a yɔ́k mfañ ya dzam na mfañ ya mwana.",
    },
    icon: "Lightbulb",
    visible: true,
    order: 4,
  },
  {
    id: "value-compassion",
    slug: "compassion",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    title: {
      fr: "Bienveillance",
      en: "Compassion",
      ew: "Mvoé ya mfañ",
    },
    description: {
      fr: "Accueillir chaque enfant avec empathie, dans un climat de confiance et de sécurité affective.",
      en: "Welcome each child with empathy, in a climate of trust and emotional security.",
      ew: "A zɔ́k mwana nyonso na mvoé, na ase ya mbɔ́g na a yen mfañ.",
    },
    icon: "Heart",
    visible: true,
    order: 5,
  },
  {
    id: "value-holistic",
    slug: "holistic-development",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    title: {
      fr: "Développement global",
      en: "Holistic Development",
      ew: "A yɔ́k mwana nyonso",
    },
    description: {
      fr: "Éduquer le corps, l'esprit et le cœur : intellectuel, physique, émotionnel, social et spirituel.",
      en: "Educate the body, mind and heart: intellectual, physical, emotional, social and spiritual.",
      ew: "A lɛ́g nyam, mvon na motema: akom, nyam, mfañ ya motema, minsili na dzam ya mvoé.",
    },
    icon: "Users",
    visible: true,
    order: 6,
  },
];

/* ── Get Visible Values Function ───────────────────────────────────── */
export function getVisibleValues(): ValueItem[] {
  return VALUES_DATA.filter(
    (v) => v.visible && v.status === "published"
  ).sort((a, b) => a.order - b.order);
}
