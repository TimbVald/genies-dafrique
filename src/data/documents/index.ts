import type { Document } from "@/types";

/* ── Documents Data ─────────────────────────────────────────────── */
export const DOCUMENTS_DATA: Document[] = [
  {
    id: "doc-reglement-interieur",
    slug: "reglement-interieur",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    publishedAt: "2024-01-01T00:00:00Z",
    title: {
      fr: "Règlement intérieur",
      en: "School Rules",
      ew: "Règlement",
    },
    description: {
      fr: "Règlement intérieur de l'établissement scolaire.",
      en: "School rules and regulations.",
      ew: "Rules ya sukul.",
    },
    fileUrl: "/documents/reglement-interieur.pdf",
    fileType: "pdf",
    category: "administratif",
    size: "250 KB",
    downloadable: true,
    visible: true,
    order: 1,
  },
  {
    id: "doc-fiche-inscription",
    slug: "fiche-inscription",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    publishedAt: "2024-01-01T00:00:00Z",
    title: {
      fr: "Fiche d'inscription",
      en: "Enrollment Form",
      ew: "Fiche ya inscription",
    },
    description: {
      fr: "Formulaire d'inscription à remplir pour les nouveaux élèves.",
      en: "Enrollment form to fill out for new students.",
      ew: "Form ya inscription.",
    },
    fileUrl: "/documents/fiche-inscription.pdf",
    fileType: "pdf",
    category: "administratif",
    size: "180 KB",
    downloadable: true,
    visible: true,
    order: 2,
  },
  {
    id: "doc-calendrier-scolaire",
    slug: "calendrier-scolaire",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    publishedAt: "2024-01-01T00:00:00Z",
    title: {
      fr: "Calendrier scolaire",
      en: "School Calendar",
      ew: "Calendar ya sukul",
    },
    description: {
      fr: "Calendrier de l'année scolaire avec les dates importantes.",
      en: "School calendar with important dates.",
      ew: "Calendar ya année sukul.",
    },
    fileUrl: "/documents/calendrier-scolaire.pdf",
    fileType: "pdf",
    category: "pedagogique",
    size: "320 KB",
    downloadable: true,
    visible: true,
    order: 3,
  },
  {
    id: "doc-program-courses",
    slug: "program-courses",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    publishedAt: "2024-01-01T00:00:00Z",
    title: {
      fr: "Programme des cours",
      en: "Course Program",
      ew: "Programme ya courses",
    },
    description: {
      fr: "Programme détaillé des cours par niveau.",
      en: "Detailed course program by level.",
      ew: "Programme ya courses.",
    },
    fileUrl: "/documents/program-courses.pdf",
    fileType: "pdf",
    category: "pedagogique",
    size: "450 KB",
    downloadable: true,
    visible: true,
    order: 4,
  },
];

/* ── Get Documents Functions ────────────────────────────────────── */
export function getDocuments(): Document[] {
  return DOCUMENTS_DATA.filter((d) => d.visible && d.status === "published").sort((a, b) => a.order - b.order);
}

export function getDocumentsByCategory(category: string): Document[] {
  if (category === "all") return getDocuments();
  return DOCUMENTS_DATA.filter((d) => d.category === category && d.visible && d.status === "published").sort((a, b) => a.order - b.order);
}

export function getDocumentBySlug(slug: string): Document | undefined {
  return DOCUMENTS_DATA.find((d) => d.slug === slug && d.status === "published");
}
