import type { LocalizedText, BaseContent } from "@/types";

/* ── Team Member Configuration ───────────────────────────────────── */
export interface TeamMember extends BaseContent {
  name: string;
  role: LocalizedText;
  bio?: LocalizedText;
  photo?: string;
  department?: string;
  visible: boolean;
  order: number;
}

/* ── Team Data ─────────────────────────────────────────────────── */
export const TEAM_DATA: TeamMember[] = [
  {
    id: "team-mbarga",
    slug: "mme-mbarga",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    name: "Mme Mbarga",
    role: {
      fr: "Présidente – Fondatrice",
      en: "President – Founder",
      ew: "Présidente – Fondatrice",
    },
    bio: {
      fr: "Fondatrice de l'établissement avec une vision pour l'éducation bilingue d'excellence au Cameroun.",
      en: "Founder of the school with a vision for bilingual education of excellence in Cameroon.",
      ew: "Fondatrice ya sukul na vision ya bilingue ya excellence na Kamerun.",
    },
    photo: "/images/IMG-20260723-WA0075.jpg",
    department: "direction",
    visible: true,
    order: 1,
  },
  {
    id: "team-atangana",
    slug: "mme-atangana",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    name: "Mme Atangana",
    role: {
      fr: "Directrice Générale",
      en: "General Director",
      ew: "Directrice Générale",
    },
    bio: {
      fr: "Directrice pédagogique avec plus de 15 ans d'expérience dans l'enseignement bilingue.",
      en: "Pedagogical director with over 15 years of experience in bilingual education.",
      ew: "Directrice ya akom na 15+ osu ya akom na bilingue.",
    },
    photo: "/images/IMG-20260723-WA0075.jpg",
    department: "direction",
    visible: true,
    order: 2,
  },
  {
    id: "team-ngo",
    slug: "mme-ngo",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    name: "Mme Ngo",
    role: {
      fr: "Directrice des Études",
      en: "Director of Studies",
      ew: "Directrice ya Études",
    },
    bio: {
      fr: "Responsable du programme académique et de la coordination des enseignants.",
      en: "Responsible for the academic program and teacher coordination.",
      ew: "Responsable ya programme ya akom na coordination ya basa.",
    },
    photo: "/images/IMG-20260723-WA0075.jpg",
    department: "pedagogy",
    visible: true,
    order: 3,
  },
];

/* ── Get Visible Team Members Function ─────────────────────────── */
export function getVisibleTeamMembers(): TeamMember[] {
  return TEAM_DATA.filter(
    (t) => t.visible && t.status === "published"
  ).sort((a, b) => a.order - b.order);
}

/* ── Get Team Members by Department Function ───────────────────── */
export function getTeamMembersByDepartment(department: string): TeamMember[] {
  return TEAM_DATA.filter(
    (t) => t.department === department && t.visible && t.status === "published"
  ).sort((a, b) => a.order - b.order);
}
