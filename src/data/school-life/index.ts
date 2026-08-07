import type { SchoolLifeActivity } from "@/types";

/* ── School Life Activities Data ─────────────────────────────────── */
export const SCHOOL_LIFE_DATA: SchoolLifeActivity[] = [
  {
    id: "activity-football",
    slug: "football-club",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    title: {
      fr: "Club de football",
      en: "Football Club",
      ew: "Football Club",
    },
    description: {
      fr: "Entraînement de football pour les élèves du primaire. Développement de l'esprit d'équipe et des compétences sportives.",
      en: "Football training for primary students. Team spirit and sports skills development.",
      ew: "Football training ya bana primaire.",
    },
    category: "sports",
    schedule: {
      fr: "Mercredi 14h00–16h00",
      en: "Wednesday 2:00 PM–4:00 PM",
      ew: "Wednesday 2:00 PM–4:00 PM",
    },
    image: "/images/IMG-20260723-WA0017.jpg",
    ageRange: {
      fr: "6–11 ans",
      en: "6–11 years",
      ew: "6–11 years",
    },
    featured: true,
    visible: true,
    order: 1,
  },
  {
    id: "activity-music",
    slug: "music-club",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    title: {
      fr: "Club de musique",
      en: "Music Club",
      ew: "Music Club",
    },
    description: {
      fr: "Initiation à la musique, chant et percussion. Découverte des instruments et du rythme.",
      en: "Introduction to music, singing and percussion. Discovery of instruments and rhythm.",
      ew: "Music introduction, singing, percussion.",
    },
    category: "culture",
    schedule: {
      fr: "Jeudi 15h00–16h30",
      en: "Thursday 3:00 PM–4:30 PM",
      ew: "Thursday 3:00 PM–4:30 PM",
    },
    image: "/images/IMG-20260723-WA0024.jpg",
    ageRange: {
      fr: "4–11 ans",
      en: "4–11 years",
      ew: "4–11 years",
    },
    featured: true,
    visible: true,
    order: 2,
  },
  {
    id: "activity-dance",
    slug: "dance-club",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    title: {
      fr: "Club de danse",
      en: "Dance Club",
      ew: "Dance Club",
    },
    description: {
      fr: "Cours de danse moderne et traditionnelle. Expression corporelle et créativité.",
      en: "Modern and traditional dance classes. Body expression and creativity.",
      ew: "Dance classes modern na traditional.",
    },
    category: "culture",
    schedule: {
      fr: "Vendredi 15h00–16h30",
      en: "Friday 3:00 PM–4:30 PM",
      ew: "Friday 3:00 PM–4:30 PM",
    },
    image: "/images/IMG-20260723-WA0034.jpg",
    ageRange: {
      fr: "4–11 ans",
      en: "4–11 years",
      ew: "4–11 years",
    },
    featured: false,
    visible: true,
    order: 3,
  },
  {
    id: "activity-art",
    slug: "art-club",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    title: {
      fr: "Club d'arts plastiques",
      en: "Art Club",
      ew: "Art Club",
    },
    description: {
      fr: "Atelier de dessin, peinture et artisanat. Développement de la créativité artistique.",
      en: "Drawing, painting and crafts workshop. Artistic creativity development.",
      ew: "Drawing, painting, crafts workshop.",
    },
    category: "activities",
    schedule: {
      fr: "Mardi 15h00–16h30",
      en: "Tuesday 3:00 PM–4:30 PM",
      ew: "Tuesday 3:00 PM–4:30 PM",
    },
    image: "/images/Generated_Image.png",
    ageRange: {
      fr: "3–11 ans",
      en: "3–11 years",
      ew: "3–11 years",
    },
    featured: false,
    visible: true,
    order: 4,
  },
  {
    id: "activity-gardening",
    slug: "gardening-club",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    title: {
      fr: "Club de jardinage",
      en: "Gardening Club",
      ew: "Gardening Club",
    },
    description: {
      fr: "Jardin scolaire et élevage. Apprentissage de l'agriculture et respect de l'environnement.",
      en: "School garden and livestock. Learning agriculture and environmental respect.",
      ew: "School garden, agriculture, environment.",
    },
    category: "activities",
    schedule: {
      fr: "Lundi 15h00–16h30",
      en: "Monday 3:00 PM–4:30 PM",
      ew: "Monday 3:00 PM–4:30 PM",
    },
    image: "/images/IMG-20260723-WA0013.jpg",
    ageRange: {
      fr: "5–11 ans",
      en: "5–11 years",
      ew: "5–11 years",
    },
    featured: true,
    visible: true,
    order: 5,
  },
];

/* ── Get School Life Functions ──────────────────────────────────── */
export function getSchoolLifeActivities(): SchoolLifeActivity[] {
  return SCHOOL_LIFE_DATA.filter((a) => a.visible && a.status === "published").sort((a, b) => a.order - b.order);
}

export function getSchoolLifeByCategory(category: string): SchoolLifeActivity[] {
  if (category === "all") return getSchoolLifeActivities();
  return SCHOOL_LIFE_DATA.filter((a) => a.category === category && a.visible && a.status === "published").sort((a, b) => a.order - b.order);
}

export function getFeaturedSchoolLife(): SchoolLifeActivity[] {
  return SCHOOL_LIFE_DATA.filter((a) => a.featured && a.visible && a.status === "published").sort((a, b) => a.order - b.order);
}
