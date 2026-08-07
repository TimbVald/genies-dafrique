import type { LocalizedText, BaseContent } from "@/types";

/* ── History Timeline Item Configuration ─────────────────────────── */
export interface HistoryItem extends BaseContent {
  year: string;
  title: LocalizedText;
  description: LocalizedText;
  image?: string;
  visible: boolean;
  order: number;
}

/* ── History Data ───────────────────────────────────────────────── */
export const HISTORY_DATA: HistoryItem[] = [
  {
    id: "history-2024",
    slug: "genese-projet",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    year: "2024",
    title: {
      fr: "Genèse du projet",
      en: "Project Genesis",
      ew: "A tɔ́lɔ́g ya projet",
    },
    description: {
      fr: "Naissance de la vision : créer un établissement bilingue d'excellence à Nkozoa, centré sur l'épanouissement intégral de l'enfant. Élaboration du projet éducatif et du plan d'implantation.",
      en: "Birth of the vision: to create a bilingual school of excellence in Nkozoa, centered on the holistic development of the child. Development of the educational project and implementation plan.",
      ew: "A mvon a nga bɔ́g : a tɔ́l sukul bilingue ya excellence na Nkozoa, a yɔ́k mwana nyonso na mfañ. A tɔ́l projet ya akom na plan ya sukul.",
    },
    visible: true,
    order: 1,
  },
  {
    id: "history-2025-feb",
    slug: "fondation-inauguration",
    status: "published",
    createdAt: "2025-02-01T00:00:00Z",
    year: "Fév 2025",
    title: {
      fr: "Fondation & inauguration",
      en: "Foundation & Inauguration",
      ew: "A tɔ́lɔ́g na a fɔ́l sukul",
    },
    description: {
      fr: "Ouverture officielle du Complexe Scolaire Bilingue Les Génies d'Afrique. Accueil des premières promotions en crèche et maternelle dans un cadre neuf et adapté.",
      en: "Official opening of the Bilingual School Complex Les Génies d'Afrique. Welcome to the first cohorts in day care and nursery in a new and adapted environment.",
      ew: "A fɔ́l mvoé ya Complexe Scolaire Bilingue Les Génies d'Afrique. A kɔ́bɔ́talane na bana ba ntɔ́lɔ́g na crèche na maternelle na ase ya mvoé.",
    },
    visible: true,
    order: 2,
  },
  {
    id: "history-2025-sept",
    slug: "agrement-minedub",
    status: "published",
    createdAt: "2025-09-01T00:00:00Z",
    year: "Sept 2025",
    title: {
      fr: "Agrément MINEDUB",
      en: "MINEDUB Accreditation",
      ew: "Agrément MINEDUB",
    },
    description: {
      fr: "Obtention de l'agrément officiel du Ministère de l'Éducation de Base. Extension à l'école primaire et lancement des deux sections francophone et anglophone.",
      en: "Obtaining official accreditation from the Ministry of Basic Education. Extension to primary school and launch of both French and English sections.",
      ew: "A zɔ́k agrément ya MINEDUB. A kɔ́l a primaire na a fɔ́l bikɔ́l bibuma iba: francophone na anglophone.",
    },
    visible: true,
    order: 3,
  },
  {
    id: "history-2026",
    slug: "croissance-rayonnement",
    status: "published",
    createdAt: "2026-01-01T00:00:00Z",
    year: "2026",
    title: {
      fr: "Croissance & rayonnement",
      en: "Growth & Expansion",
      ew: "A kɔ́l na a yen mfañ",
    },
    description: {
      fr: "Plus de 120 élèves inscrits, développement des clubs scolaires, des projets agricoles et d'entrepreneuriat. L'établissement devient une référence locale.",
      en: "More than 120 students enrolled, development of school clubs, farming and entrepreneurship projects. The school becomes a local reference.",
      ew: "Bana balɛ́g 120+ ba nga tɔ́l, bikɔ́l bya sukul, agriculture na entrepreneurship bi nga kɔ́l. Sukul a nga ne dzam ya mvoé na mfañ.",
    },
    visible: true,
    order: 4,
  },
];

/* ── Get Visible History Items Function ───────────────────────────── */
export function getVisibleHistory(): HistoryItem[] {
  return HISTORY_DATA.filter(
    (h) => h.visible && h.status === "published"
  ).sort((a, b) => a.order - b.order);
}
