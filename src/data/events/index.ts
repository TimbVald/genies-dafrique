import type { Event } from "@/types";

/* ── Event Categories ────────────────────────────────────────────── */
export const EVENT_CATEGORIES = [
  {
    key: 'rentree',
    label: { fr: 'Rentrée scolaire', en: 'Back to School', ew: 'Rentrée' },
    color: '#1A3A8F',
    bgColor: '#EEF2FF',
    textColor: '#1A3A8F',
  },
  {
    key: 'reunions_parents',
    label: { fr: 'Réunion parents', en: 'Parent Meeting', ew: 'Meeting' },
    color: '#059669',
    bgColor: '#ECFDF5',
    textColor: '#059669',
  },
  {
    key: 'examens',
    label: { fr: 'Examen', en: 'Exam', ew: 'Exam' },
    color: '#D97706',
    bgColor: '#FFFBEB',
    textColor: '#D97706',
  },
  {
    key: 'vacances',
    label: { fr: 'Vacances scolaires', en: 'School Holidays', ew: 'Vacances' },
    color: '#7C3AED',
    bgColor: '#F5F3FF',
    textColor: '#7C3AED',
  },
  {
    key: 'sorties_pedagogiques',
    label: { fr: 'Sortie pédagogique', en: 'Educational Trip', ew: 'Trip' },
    color: '#0891B2',
    bgColor: '#ECFEFF',
    textColor: '#0891B2',
  },
  {
    key: 'activites_sportives',
    label: { fr: 'Activité sportive', en: 'Sports Activity', ew: 'Sports' },
    color: '#DC2626',
    bgColor: '#FEF2F2',
    textColor: '#DC2626',
  },
  {
    key: 'activites_culturelles',
    label: { fr: 'Activité culturelle', en: 'Cultural Activity', ew: 'Culture' },
    color: '#DB2777',
    bgColor: '#FDF2F8',
    textColor: '#DB2777',
  },
  {
    key: 'club',
    label: { fr: 'Club', en: 'Club', ew: 'Club' },
    color: '#2563EB',
    bgColor: '#EFF6FF',
    textColor: '#2563EB',
  },
  {
    key: 'ceremonie',
    label: { fr: 'Cérémonie', en: 'Ceremony', ew: 'Ceremony' },
    color: '#EA580C',
    bgColor: '#FFF7ED',
    textColor: '#EA580C',
  },
  {
    key: 'evenements_administratifs',
    label: { fr: 'Événement administratif', en: 'Administrative Event', ew: 'Admin' },
    color: '#6B7280',
    bgColor: '#F3F4F6',
    textColor: '#6B7280',
  },
  {
    key: 'celebrations',
    label: { fr: 'Célébration', en: 'Celebration', ew: 'Celebration' },
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    textColor: '#B45309',
  },
];

/* ── Events Data ─────────────────────────────────────────────────── */
export const EVENTS_DATA: Event[] = [
  {
    id: "event-rentree-2025",
    slug: "rentree-2025",
    status: "published",
    createdAt: "2025-01-01T00:00:00Z",
    title: {
      fr: "Rentrée scolaire 2025-2026",
      en: "Back to School 2025-2026",
      ew: "Rentrée 2025-2026",
    },
    description: {
      fr: "Ouverture officielle de l'année scolaire 2025-2026.",
      en: "Official opening of the 2025-2026 school year.",
      ew: "Opening ya année 2025-2026.",
    },
    startDate: "2025-09-01",
    endDate: "2025-09-02",
    allDay: true,
    category: {
      fr: "Rentrée scolaire",
      en: "Back to School",
      ew: "Rentrée",
    },
    categoryKey: "rentree",
    image: "/images/IMG-20260723-WA0006.jpg",
    newsId: "news-rentree-2025",
    featured: true,
  },
  {
    id: "event-agrement",
    slug: "agrement-minedub",
    status: "published",
    createdAt: "2025-01-01T00:00:00Z",
    title: {
      fr: "Obtention agrément MINEDUB",
      en: "MINEDUB Accreditation Obtained",
      ew: "Agrément MINEDUB",
    },
    description: {
      fr: "Cérémonie officielle de remise de l'agrément MINEDUB.",
      en: "Official ceremony for MINEDUB accreditation.",
      ew: "Ceremony ya agrément.",
    },
    startDate: "2025-02-15",
    allDay: true,
    category: {
      fr: "Événement administratif",
      en: "Administrative Event",
      ew: "Admin",
    },
    categoryKey: "evenements_administratifs",
    image: "/images/IMG-20260723-WA0022.jpg",
    newsId: "news-agrement-minedub",
    featured: false,
  },
  {
    id: "event-projets-agricoles",
    slug: "projets-agricoles",
    status: "published",
    createdAt: "2025-01-01T00:00:00Z",
    title: {
      fr: "Lancement projets agricoles",
      en: "Launch of Farming Projects",
      ew: "Agriculture",
    },
    description: {
      fr: "Lancement des projets d'agriculture scolaire et d'élevage.",
      en: "Launch of school farming and livestock projects.",
      ew: "Agriculture na élevage.",
    },
    startDate: "2025-10-15",
    endDate: "2025-10-15",
    startTime: "08:00",
    endTime: "12:00",
    allDay: false,
    category: {
      fr: "Sortie pédagogique",
      en: "Educational Trip",
      ew: "Trip",
    },
    categoryKey: "sorties_pedagogiques",
    image: "/images/IMG-20260723-WA0013.jpg",
    newsId: "news-projets-agricoles",
    featured: false,
  },
  {
    id: "event-fete-noel",
    slug: "fete-noel-2025",
    status: "published",
    createdAt: "2025-01-01T00:00:00Z",
    title: {
      fr: "Fête de fin d'année",
      en: "End-of-Year Celebration",
      ew: "Fête ya fin d'année",
    },
    description: {
      fr: "Spectacle et remise des prix d'excellence.",
      en: "Show and prize giving ceremony.",
      ew: "Show na prizes.",
    },
    startDate: "2025-12-20",
    startTime: "14:00",
    endTime: "18:00",
    allDay: false,
    category: {
      fr: "Célébration",
      en: "Celebration",
      ew: "Celebration",
    },
    categoryKey: "celebrations",
    image: "/images/IMG-20260723-WA0034.jpg",
    newsId: "news-fete-noel-2025",
    featured: true,
  },
  {
    id: "event-inscriptions",
    slug: "inscriptions-2026",
    status: "published",
    createdAt: "2025-01-01T00:00:00Z",
    title: {
      fr: "Inscriptions 2026-2027",
      en: "Enrollment 2026-2027",
      ew: "Inscriptions 2026-2027",
    },
    description: {
      fr: "Ouverture des inscriptions pour l'année scolaire 2026-2027.",
      en: "Opening of enrollments for 2026-2027 school year.",
      ew: "Opening ya inscriptions.",
    },
    startDate: "2026-07-01",
    endDate: "2026-09-01",
    allDay: true,
    recurring: true,
    recurrencePattern: "daily",
    category: {
      fr: "Événement administratif",
      en: "Administrative Event",
      ew: "Admin",
    },
    categoryKey: "evenements_administratifs",
    image: "/images/IMG-20260723-WA0039.jpg",
    newsId: "news-inscriptions-2026",
    featured: false,
  },
  {
    id: "event-journee-sport",
    slug: "journee-sport",
    status: "published",
    createdAt: "2025-01-01T00:00:00Z",
    title: {
      fr: "Journée sportive",
      en: "Sports Day",
      ew: "Journée sportive",
    },
    description: {
      fr: "Compétitions de football et d'athlétisme.",
      en: "Football and athletics competitions.",
      ew: "Football na athletics.",
    },
    startDate: "2025-11-20",
    startTime: "08:00",
    endTime: "16:00",
    allDay: false,
    category: {
      fr: "Activité sportive",
      en: "Sports Activity",
      ew: "Sports",
    },
    categoryKey: "activites_sportives",
    image: "/images/IMG-20260723-WA0017.jpg",
    newsId: "news-journee-sport",
    featured: false,
  },
];

/* ── Get Events Functions ────────────────────────────────────────── */
export function getEvents(): Event[] {
  return EVENTS_DATA.filter((e) => e.status === "published").sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
}

export function getEventBySlug(slug: string): Event | undefined {
  return EVENTS_DATA.find((e) => e.slug === slug && e.status === "published");
}

export function getEventsByCategory(categoryKey: string): Event[] {
  if (categoryKey === "all") return getEvents();
  return EVENTS_DATA.filter((e) => e.categoryKey === categoryKey && e.status === "published").sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
}

export function getUpcomingEvents(limit: number = 5): Event[] {
  const now = new Date();
  return getEvents()
    .filter((e) => new Date(e.startDate) >= now)
    .slice(0, limit);
}

export function getFeaturedEvents(): Event[] {
  return EVENTS_DATA.filter((e) => e.featured && e.status === "published").sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
}
