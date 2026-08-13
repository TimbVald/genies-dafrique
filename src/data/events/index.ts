import type { Event } from "@/types";

/* ── Event Categories ────────────────────────────────────────────── */
export const EVENT_CATEGORIES = [
  {
    key: 'vie_scolaire',
    label: { fr: 'Vie scolaire', en: 'School Life', ew: 'Vie scolaire' },
    color: '#1A3A8F',
    bgColor: '#EEF2FF',
    textColor: '#1A3A8F',
  },
  {
    key: 'culturel',
    label: { fr: 'Culturel', en: 'Cultural', ew: 'Culturel' },
    color: '#DB2777',
    bgColor: '#FDF2F8',
    textColor: '#DB2777',
  },
  {
    key: 'pedagogique',
    label: { fr: 'Pédagogique', en: 'Educational', ew: 'Pédagogique' },
    color: '#0891B2',
    bgColor: '#ECFEFF',
    textColor: '#0891B2',
  },
  {
    key: 'sensibilisation',
    label: { fr: 'Sensibilisation', en: 'Awareness', ew: 'Sensibilisation' },
    color: '#059669',
    bgColor: '#ECFDF5',
    textColor: '#059669',
  },
  {
    key: 'jour_ferie',
    label: { fr: 'Jour férié', en: 'Public Holiday', ew: 'Jour férié' },
    color: '#7C3AED',
    bgColor: '#F5F3FF',
    textColor: '#7C3AED',
  },
];

/* ── Events Data ─────────────────────────────────────────────────── */
export const EVENTS_DATA: Event[] = [
  {
    id: "event-rentree-2026-2027",
    slug: "rentree-2026-2027",
    status: "published",
    createdAt: "2026-01-01T00:00:00Z",
    title: {
      fr: "Rentrée scolaire 2026-2027",
      en: "Back to School 2026-2027",
      ew: "Rentrée 2026-2027",
    },
    description: {
      fr: "Accueil des élèves pour la nouvelle année scolaire.",
      en: "Welcome students for the new school year.",
      ew: "Accueil ya élèves pour année scolaire nouvelle.",
    },
    startDate: "2026-09-07",
    allDay: true,
    category: {
      fr: "Vie scolaire",
      en: "School Life",
      ew: "Vie scolaire",
    },
    categoryKey: "vie_scolaire",
    location: {
      fr: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
      en: "Bilingual School Complex Les Génies d'Afrique, Nkozoa",
      ew: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
    },
    recurring: true,
    featured: true,
  },
  {
    id: "event-fete-enseignants-2026",
    slug: "fete-enseignants-2026",
    status: "published",
    createdAt: "2026-01-01T00:00:00Z",
    title: {
      fr: "Fête des enseignants",
      en: "Teachers' Day",
      ew: "Fête ya enseignants",
    },
    description: {
      fr: "Journée de reconnaissance envers le corps enseignant.",
      en: "Day of recognition for the teaching staff.",
      ew: "Journée ya reconnaissance pour enseignants.",
    },
    startDate: "2026-10-05",
    allDay: true,
    category: {
      fr: "Vie scolaire",
      en: "School Life",
      ew: "Vie scolaire",
    },
    categoryKey: "vie_scolaire",
    location: {
      fr: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
      en: "Bilingual School Complex Les Génies d'Afrique, Nkozoa",
      ew: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
    },
    recurring: true,
    featured: false,
  },
  {
    id: "event-jmlm-2026",
    slug: "journee-mondiale-lavage-mains-2026",
    status: "published",
    createdAt: "2026-01-01T00:00:00Z",
    title: {
      fr: "Journée mondiale du lavage des mains (JMLM)",
      en: "Global Handwashing Day",
      ew: "Journée mondiale ya lavage ya mains",
    },
    description: {
      fr: "Activités de sensibilisation à l'hygiène des mains pour les élèves.",
      en: "Hand hygiene awareness activities for students.",
      ew: "Activités ya sensibilisation pour hygiène ya mains.",
    },
    startDate: "2026-10-15",
    allDay: true,
    category: {
      fr: "Sensibilisation / Hygiène",
      en: "Awareness / Hygiene",
      ew: "Sensibilisation / Hygiène",
    },
    categoryKey: "sensibilisation",
    location: {
      fr: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
      en: "Bilingual School Complex Les Génies d'Afrique, Nkozoa",
      ew: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
    },
    recurring: true,
    featured: false,
  },
  {
    id: "event-arbre-noel-2026",
    slug: "ceremonie-arbre-noel-2026",
    status: "published",
    createdAt: "2026-01-01T00:00:00Z",
    title: {
      fr: "Cérémonie de l'arbre de Noël",
      en: "Christmas Tree Ceremony",
      ew: "Cérémonie ya arbre ya Noël",
    },
    description: {
      fr: "Célébration de fin d'année avec les élèves et les familles.",
      en: "End-of-year celebration with students and families.",
      ew: "Célébration ya fin d'année avec élèves na familles.",
    },
    startDate: "2026-12-18",
    allDay: true,
    category: {
      fr: "Vie scolaire / Culturel",
      en: "School Life / Cultural",
      ew: "Vie scolaire / Culturel",
    },
    categoryKey: "culturel",
    location: {
      fr: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
      en: "Bilingual School Complex Les Génies d'Afrique, Nkozoa",
      ew: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
    },
    recurring: true,
    featured: true,
  },
  {
    id: "event-semaine-bilinguisme-2027",
    slug: "semaine-bilinguisme-2027",
    status: "published",
    createdAt: "2026-01-01T00:00:00Z",
    title: {
      fr: "Semaine du bilinguisme",
      en: "Bilingualism Week",
      ew: "Semaine ya bilinguisme",
    },
    description: {
      fr: "Événement d'une semaine mettant à l'honneur le bilinguisme français-anglais de l'école.",
      en: "One-week event highlighting the school's French-English bilingualism.",
      ew: "Événement ya semaine ya bilinguisme français-anglais.",
    },
    startDate: "2027-02-03",
    endDate: "2027-02-10",
    allDay: true,
    category: {
      fr: "Vie scolaire / Pédagogique",
      en: "School Life / Educational",
      ew: "Vie scolaire / Pédagogique",
    },
    categoryKey: "pedagogique",
    location: {
      fr: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
      en: "Bilingual School Complex Les Génies d'Afrique, Nkozoa",
      ew: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
    },
    recurring: true,
    featured: false,
  },
  {
    id: "event-langue-maternelle-2027",
    slug: "journee-langue-maternelle-2027",
    status: "published",
    createdAt: "2026-01-01T00:00:00Z",
    title: {
      fr: "Journée internationale de la langue maternelle",
      en: "International Mother Language Day",
      ew: "Journée internationale ya langue maternelle",
    },
    description: {
      fr: "Sensibilisation à la richesse des langues maternelles et nationales.",
      en: "Awareness of the richness of mother tongues and national languages.",
      ew: "Sensibilisation ya richesse ya langues maternelles na nationales.",
    },
    startDate: "2027-02-21",
    allDay: true,
    category: {
      fr: "Culturel",
      en: "Cultural",
      ew: "Culturel",
    },
    categoryKey: "culturel",
    location: {
      fr: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
      en: "Bilingual School Complex Les Génies d'Afrique, Nkozoa",
      ew: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
    },
    recurring: true,
    featured: false,
  },
  {
    id: "event-arts-culture-2027",
    slug: "journee-arts-culture-2027",
    status: "published",
    createdAt: "2026-01-01T00:00:00Z",
    title: {
      fr: "Journée nationale des arts et de la culture",
      en: "National Arts and Culture Day",
      ew: "Journée nationale ya arts na culture",
    },
    description: {
      fr: "Activités artistiques et culturelles avec les élèves.",
      en: "Artistic and cultural activities with students.",
      ew: "Activités artistiques na culturelles avec élèves.",
    },
    startDate: "2027-03-05",
    allDay: true,
    category: {
      fr: "Culturel",
      en: "Cultural",
      ew: "Culturel",
    },
    categoryKey: "culturel",
    location: {
      fr: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
      en: "Bilingual School Complex Les Génies d'Afrique, Nkozoa",
      ew: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
    },
    recurring: true,
    featured: false,
  },
  {
    id: "event-femme-2027",
    slug: "journee-femme-2027",
    status: "published",
    createdAt: "2026-01-01T00:00:00Z",
    title: {
      fr: "Journée internationale de la femme",
      en: "International Women's Day",
      ew: "Journée internationale ya femme",
    },
    description: {
      fr: "Célébration en l'honneur des femmes (enseignantes, mères, personnel de l'école).",
      en: "Celebration in honor of women (teachers, mothers, school staff).",
      ew: "Célébration ya femmes (enseignantes, mères, personnel).",
    },
    startDate: "2027-03-08",
    allDay: true,
    category: {
      fr: "Culturel",
      en: "Cultural",
      ew: "Culturel",
    },
    categoryKey: "culturel",
    location: {
      fr: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
      en: "Bilingual School Complex Les Génies d'Afrique, Nkozoa",
      ew: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
    },
    recurring: true,
    featured: false,
  },
  {
    id: "event-travail-2027",
    slug: "fete-travail-2027",
    status: "published",
    createdAt: "2026-01-01T00:00:00Z",
    title: {
      fr: "Fête du travail",
      en: "Labor Day",
      ew: "Fête ya travail",
    },
    description: {
      fr: "Jour férié national.",
      en: "National public holiday.",
      ew: "Jour férié national.",
    },
    startDate: "2027-05-01",
    allDay: true,
    category: {
      fr: "Jour férié / Vie scolaire",
      en: "Public Holiday / School Life",
      ew: "Jour férié / Vie scolaire",
    },
    categoryKey: "jour_ferie",
    location: {
      fr: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
      en: "Bilingual School Complex Les Génies d'Afrique, Nkozoa",
      ew: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
    },
    recurring: true,
    featured: false,
  },
  {
    id: "event-fin-annee-2027",
    slug: "fete-fin-annee-2027",
    status: "published",
    createdAt: "2026-01-01T00:00:00Z",
    title: {
      fr: "Fête de fin d'année",
      en: "End-of-Year Celebration",
      ew: "Fête ya fin d'année",
    },
    description: {
      fr: "Cérémonie de clôture de l'année scolaire, remise de récompenses.",
      en: "School year closing ceremony, awards presentation.",
      ew: "Cérémonie ya clôture ya année scolaire, remise ya récompenses.",
    },
    startDate: "2027-06-10",
    allDay: true,
    category: {
      fr: "Vie scolaire",
      en: "School Life",
      ew: "Vie scolaire",
    },
    categoryKey: "vie_scolaire",
    location: {
      fr: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
      en: "Bilingual School Complex Les Génies d'Afrique, Nkozoa",
      ew: "Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa",
    },
    recurring: true,
    featured: true,
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
