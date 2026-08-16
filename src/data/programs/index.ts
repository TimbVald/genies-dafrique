import type { Program } from "@/types";

/* ── Programs Data ─────────────────────────────────────────────────── */
export const PROGRAMS_DATA: Program[] = [
  {
    id: "program-creche",
    slug: "creche",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    name: {
      fr: "Crèche",
      en: "Day Care",
      ew: "Crèche",
    },
    badge: {
      fr: "0 – 2 ans",
      en: "0 – 2 years",
      ew: "0 – 2 osu",
    },
    shortDescription: {
      fr: "Un environnement sécurisé, chaleureux et affectif pour les tout-petits de 0 à 2 ans.",
      en: "A safe, warm and affectionate environment for toddlers aged 0 to 2.",
      ew: "Ase ya mvoé amu bana ba 0 tii 2 osu.",
    },
    description: {
      fr: "Un environnement sécurisé, chaleureux et affectif pour les tout-petits de 0 à 2 ans. Nos éducatrices diplômées proposent des activités d'éveil sensoriel, de motricité et de socialisation adaptées à chaque stade du développement. Les premiers mots en français et en anglais sont introduits naturellement dès cet âge.",
      en: "A safe, warm and affectionate environment for toddlers aged 0 to 2. Our qualified educators offer sensory, motor and social development activities tailored to each developmental stage. First words in French and English are naturally introduced from this age.",
      ew: "Ase ya mvoé amu bana ba 0 tii 2 osu. Basa ba akom bi diplomé ba ye bisala bya dzam, ya mvon na ya mfañ bya a kɔ́l na mbɔ́g ya mwana nyonso. Bala ya mbɔ́g bya français na English bi ne kɔ́l kɔ́k kɔ́k a osu yi.",
    },
    features: [
      {
        fr: "Éveil sensoriel",
        en: "Sensory development",
        ew: "Dzam ya mbɔ́g",
      },
      {
        fr: "Motricité fine et globale",
        en: "Fine & gross motor skills",
        ew: "Mbɔ́g ya nɔ́n na ya mbɔ́g",
      },
      {
        fr: "Premiers mots FR & EN",
        en: "First words in FR & EN",
        ew: "Bala ya mbɔ́g FR & EN",
      },
      {
        fr: "Activités musicales",
        en: "Musical activities",
        ew: "Bisala ya minlɔ́m",
      },
      {
        fr: "Socialisation en petits groupes",
        en: "Small group socialisation",
        ew: "Mvog na mbog ya mɛɛ",
      },
    ],
    level: "creche",
    section: "bilingual",
    image: "https://res.cloudinary.com/dyetkan86/image/upload/v1786842107/c174637a2281ede3ef2401f4e45add0ff7624ba58e7ec82a048183e53cb95ff2_zu6whr.png",
    order: 1,
    featured: true,
  },
  {
    id: "program-maternelle",
    slug: "maternelle",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    name: {
      fr: "Maternelle",
      en: "Nursery",
      ew: "Maternelle",
    },
    badge: {
      fr: "2 – 5 ans",
      en: "2 – 5 years",
      ew: "2 – 5 osu",
    },
    shortDescription: {
      fr: "De 2 à 5 ans, la section maternelle offre à l'enfant un espace d'épanouissement complet.",
      en: "From 2 to 5 years, the nursery section offers children a complete space for development.",
      ew: "Kobi na 2 tii 5 osu, section maternelle a ye ase ya mfañ amu mwana.",
    },
    description: {
      fr: "De 2 à 5 ans, la section maternelle (Pré-nursery et Nursery) offre à l'enfant un espace d'épanouissement complet. Jeux éducatifs, arts plastiques, éveil musical, initiation à la lecture et aux mathématiques, jardinage pédagogique : chaque journée est une aventure d'apprentissage. L'immersion bilingue est totale et naturelle.",
      en: "From 2 to 5 years, the nursery section (Pre-Nursery and Nursery) offers children a complete space for development. Educational games, arts and crafts, musical awakening, introduction to reading and mathematics, educational gardening: every day is a learning adventure. Bilingual immersion is total and natural.",
      ew: "Kobi na 2 tii 5 osu, section maternelle a ye ase ya mfañ amu mwana. Bisala ya akom, misili, minlɔ́m, akom na kɔ́l na mathematics, agriculture ya sukul : lekela a ne bisala ya akom. Minsili ya bilingue a ne mfañ na nɔ́n.",
    },
    features: [
      {
        fr: "Pré-lecture et pré-écriture",
        en: "Pre-reading & pre-writing",
        ew: "Akom na kɔ́l na kɔ́l",
      },
      {
        fr: "Initiation aux mathématiques",
        en: "Maths introduction",
        ew: "Akom na mathematics",
      },
      {
        fr: "Arts plastiques & créatifs",
        en: "Arts & crafts",
        ew: "Misili & bisala ya dzam",
      },
      {
        fr: "Jardinage pédagogique",
        en: "Educational gardening",
        ew: "Agriculture ya sukul",
      },
      {
        fr: "Éveil musical bilingue",
        en: "Bilingual musical awakening",
        ew: "Minlɔ́m ya bilingue",
      },
    ],
    level: "maternelle",
    section: "bilingual",
    image: "https://res.cloudinary.com/dyetkan86/image/upload/v1786841184/IMG-20260816-WA9732_da9wrx.jpg",
    order: 2,
    featured: true,
  },
  {
    id: "program-primaire-fr",
    slug: "primaire-francophone",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    name: {
      fr: "Primaire Francophone",
      en: "French Primary",
      ew: "Primaire Francophone",
    },
    badge: {
      fr: "6 – 12 ans · Français",
      en: "6 – 12 years · French",
      ew: "6 – 12 osu · Français",
    },
    shortDescription: {
      fr: "La section primaire francophone suit les programmes officiels du MINEDUB, enrichis de contenus pédagogiques complémentaires.",
      en: "The French primary section follows the official MINEDUB programmes, enriched with complementary teaching content.",
      ew: "Section primaire francophone a lɔ́g programme ya MINEDUB, a ye akom mibuma.",
    },
    description: {
      fr: "La section primaire francophone suit les programmes officiels du MINEDUB, enrichis de contenus pédagogiques complémentaires. Du CP au CM2, les élèves développent des compétences solides en français, mathématiques, sciences et histoire-géographie. L'anglais est enseigné en intensif à raison de plusieurs heures par semaine.",
      en: "The French primary section follows the official MINEDUB programmes, enriched with complementary teaching content. From Grade 1 to Grade 6, students develop strong skills in French, maths, sciences and social studies. English is taught intensively for several hours per week.",
      ew: "Section primaire francophone a lɔ́g programme ya MINEDUB, a ye akom mibuma. Kobi CP tii CM2, bana ba lɔ́g bisala mbo na français, mathematics, sciences na history-geography. English a kɔ́l na mɛɛ kɔ́k osu mibuma.",
    },
    features: [
      {
        fr: "Programme officiel MINEDUB",
        en: "Official MINEDUB curriculum",
        ew: "Programme ya MINEDUB",
      },
      {
        fr: "Anglais intensif (4h/semaine)",
        en: "Intensive English (4h/week)",
        ew: "English ya mɛɛ (4h/sɔ́m)",
      },
      {
        fr: "Sciences & environnement",
        en: "Science & environment",
        ew: "Sciences & environment",
      },
      {
        fr: "Éducation civique & morale",
        en: "Civic & moral education",
        ew: "Akom ya civic na moral",
      },
      {
        fr: "Activités agricoles",
        en: "Agricultural activities",
        ew: "Bisala ya agriculture",
      },
    ],
    level: "primaire",
    section: "francophone",
    image: "https://res.cloudinary.com/dyetkan86/image/upload/v1786841762/IMG-20260816-WA0090_2_xyaaki.jpg",
    order: 3,
    featured: false,
  },
  {
    id: "program-primaire-en",
    slug: "primaire-anglophone",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    name: {
      fr: "Primaire Anglophone",
      en: "English Primary",
      ew: "Primaire Anglophone",
    },
    badge: {
      fr: "6 – 12 ans · Anglais",
      en: "6 – 12 years · English",
      ew: "6 – 12 osu · English",
    },
    shortDescription: {
      fr: "La section primaire anglophone propose un curriculum anglophone rigoureux, en conformité avec les directives du MINEDUB.",
      en: "The English primary section offers a rigorous anglophone curriculum, in full compliance with MINEDUB guidelines.",
      ew: "Section primaire anglophone a ye curriculum anglophone ya libɔ́g, na lɔ́g na directives ya MINEDUB.",
    },
    description: {
      fr: "La section primaire anglophone propose un curriculum anglophone rigoureux, en conformité avec les directives du MINEDUB. L'enseignement se fait majoritairement en anglais, avec une place importante accordée au français comme langue seconde. Les élèves progressent vers les meilleures filières secondaires anglophones.",
      en: "The English primary section offers a rigorous anglophone curriculum, in full compliance with MINEDUB guidelines. Teaching is conducted primarily in English, with significant space given to French as a second language. Students confidently progress towards the best anglophone secondary schools.",
      ew: "Section primaire anglophone a ye curriculum anglophone ya libɔ́g, na lɔ́g na directives ya MINEDUB. Akom a ne kɔ́l kɔ́k na English, na mɛɛ ne French na lokota mibuma. Bana ba lɔ́g kɔ́k na lycées anglophones ya libɔ́g.",
    },
    features: [
      {
        fr: "Curriculum anglophone MINEDUB",
        en: "MINEDUB anglophone curriculum",
        ew: "Curriculum anglophone ya MINEDUB",
      },
      {
        fr: "Français langue seconde",
        en: "French as second language",
        ew: "French na lokota mibuma",
      },
      {
        fr: "English literacy & numeracy",
        en: "English literacy & numeracy",
        ew: "English literacy & numeracy",
      },
      {
        fr: "Sciences en anglais",
        en: "Science in English",
        ew: "Sciences na English",
      },
      {
        fr: "Préparation lycée anglophone",
        en: "Anglophone secondary prep",
        ew: "Preparation ya lycée anglophone",
      },
    ],
    level: "primaire",
    section: "anglophone",
    image: "https://res.cloudinary.com/dyetkan86/image/upload/v1786848131/file_00000000c594820ebdb2f66a1dcefc88_yhbdgd.png",
    order: 4,
    featured: false,
  },
];

/* ── Get All Programs Function ───────────────────────────────────── */
export function getPrograms(): Program[] {
  return PROGRAMS_DATA.filter((p) => p.status === "published").sort((a, b) => a.order - b.order);
}

/* ── Get Program by Slug Function ─────────────────────────────────── */
export function getProgramBySlug(slug: string): Program | undefined {
  return PROGRAMS_DATA.find((p) => p.slug === slug && p.status === "published");
}

/* ── Get Featured Programs Function ────────────────────────────────── */
export function getFeaturedPrograms(): Program[] {
  return PROGRAMS_DATA.filter((p) => p.featured && p.status === "published").sort((a, b) => a.order - b.order);
}

/* ── Get Programs by Level Function ─────────────────────────────────── */
export function getProgramsByLevel(level: string): Program[] {
  return PROGRAMS_DATA.filter((p) => p.level === level && p.status === "published").sort((a, b) => a.order - b.order);
}

/* ── Get Programs by Section Function ───────────────────────────────── */
export function getProgramsBySection(section: string): Program[] {
  return PROGRAMS_DATA.filter((p) => p.section === section && p.status === "published").sort((a, b) => a.order - b.order);
}
