import type { NavigationItem, FooterSection } from "@/types";

/* ── Main Navigation Data ─────────────────────────────────────── */
export const NAVIGATION_DATA: NavigationItem[] = [
  {
    id: "nav-home",
    label: { fr: "Accueil", en: "Home", ew: "Home" },
    href: "/",
    order: 1,
    visible: true,
  },
  {
    id: "nav-about",
    label: { fr: "À propos", en: "About", ew: "About" },
    href: "/a-propos",
    order: 2,
    visible: true,
  },
  {
    id: "nav-programs",
    label: { fr: "Programmes", en: "Programs", ew: "Programs" },
    href: "/programmes",
    order: 3,
    visible: true,
  },
  {
    id: "nav-admissions",
    label: { fr: "Admissions", en: "Admissions", ew: "Admissions" },
    href: "/admissions",
    order: 4,
    visible: true,
  },
  {
    id: "nav-news",
    label: { fr: "Actualités", en: "News", ew: "News" },
    href: "/actualites",
    order: 5,
    visible: true,
  },
  {
    id: "nav-contact",
    label: { fr: "Contact", en: "Contact", ew: "Contact" },
    href: "/contact",
    order: 6,
    visible: true,
  },
];

/* ── Footer Sections Data ───────────────────────────────────────── */
export const FOOTER_DATA: FooterSection[] = [
  {
    id: "footer-about",
    title: { fr: "À propos", en: "About", ew: "About" },
    links: [
      {
        id: "footer-about-school",
        label: { fr: "Notre école", en: "Our School", ew: "Our School" },
        href: "/a-propos",
        order: 1,
        visible: true,
      },
      {
        id: "footer-about-vision",
        label: { fr: "Notre vision", en: "Our Vision", ew: "Our Vision" },
        href: "/a-propos#vision",
        order: 2,
        visible: true,
      },
      {
        id: "footer-about-team",
        label: { fr: "Notre équipe", en: "Our Team", ew: "Our Team" },
        href: "/a-propos#equipe",
        order: 3,
        visible: true,
      },
    ],
    order: 1,
    visible: true,
  },
  {
    id: "footer-programs",
    title: { fr: "Programmes", en: "Programs", ew: "Programs" },
    links: [
      {
        id: "footer-programs-primary",
        label: { fr: "Primaire", en: "Primary", ew: "Primary" },
        href: "/programmes#primaire",
        order: 1,
        visible: true,
      },
      {
        id: "footer-programs-nursery",
        label: { fr: "Maternelle", en: "Nursery", ew: "Nursery" },
        href: "/programmes#maternelle",
        order: 2,
        visible: true,
      },
      {
        id: "footer-programs-daycare",
        label: { fr: "Crèche", en: "Day Care", ew: "Day Care" },
        href: "/programmes#creche",
        order: 3,
        visible: true,
      },
    ],
    order: 2,
    visible: true,
  },
  {
    id: "footer-admissions",
    title: { fr: "Admissions", en: "Admissions", ew: "Admissions" },
    links: [
      {
        id: "footer-admissions-process",
        label: { fr: "Processus d'admission", en: "Admission Process", ew: "Admission Process" },
        href: "/admissions",
        order: 1,
        visible: true,
      },
      {
        id: "footer-admissions-documents",
        label: { fr: "Documents requis", en: "Required Documents", ew: "Required Documents" },
        href: "/admissions#documents",
        order: 2,
        visible: true,
      },
      {
        id: "footer-admissions-fees",
        label: { fr: "Frais de scolarité", en: "Tuition Fees", ew: "Tuition Fees" },
        href: "/admissions#frais",
        order: 3,
        visible: true,
      },
    ],
    order: 3,
    visible: true,
  },
  {
    id: "footer-info",
    title: { fr: "Informations", en: "Information", ew: "Information" },
    links: [
      {
        id: "footer-info-news",
        label: { fr: "Actualités", en: "News", ew: "News" },
        href: "/actualites",
        order: 1,
        visible: true,
      },
      {
        id: "footer-info-calendar",
        label: { fr: "Calendrier", en: "Calendar", ew: "Calendar" },
        href: "/actualites#calendar",
        order: 2,
        visible: true,
      },
      {
        id: "footer-info-contact",
        label: { fr: "Contact", en: "Contact", ew: "Contact" },
        href: "/contact",
        order: 3,
        visible: true,
      },
    ],
    order: 4,
    visible: true,
  },
];

/* ── Get Navigation Functions ────────────────────────────────────── */
export function getNavigation(): NavigationItem[] {
  return NAVIGATION_DATA.filter((n) => n.visible).sort((a, b) => a.order - b.order);
}

export function getFooterSections(): FooterSection[] {
  return FOOTER_DATA.filter((s) => s.visible).sort((a, b) => a.order - b.order);
}
