import type { Testimonial } from "@/types";

/* ── Testimonials Data ───────────────────────────────────────────── */
export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "testimonial-1",
    slug: "parent-mbarga",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    name: "Mme Nkodo",
    role: {
      fr: "Parent d'élève",
      en: "Parent",
      ew: "Parent",
    },
    content: {
      fr: "Les Génies d'Afrique a transformé l'éducation de mon fils. Les enseignants sont dévoués et l'environnement est excellent.",
      en: "Les Génies d'Afrique has transformed my son's education. The teachers are dedicated and the environment is excellent.",
      ew: "Les Génies d'Afrique a transformed education ya mwana mɔ́n. Teachers a dedicated.",
    },
    rating: 5,
    featured: true,
    order: 1,
    visible: true,
  },
  {
    id: "testimonial-2",
    slug: "parent-ewane",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    name: "M. Ewane",
    role: {
      fr: "Parent d'élève",
      en: "Parent",
      ew: "Parent",
    },
    content: {
      fr: "Je recommande vivement cette école. Le bilinguisme et l'approche pédagogique sont exceptionnels.",
      en: "I highly recommend this school. The bilingual approach and pedagogy are exceptional.",
      ew: "I recommend sukul yi. Bilingualism na pedagogy a exceptional.",
    },
    rating: 5,
    featured: true,
    order: 2,
    visible: true,
  },
  {
    id: "testimonial-3",
    slug: "enseignant",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    name: "Mme Atangana",
    role: {
      fr: "Enseignante",
      en: "Teacher",
      ew: "Teacher",
    },
    content: {
      fr: "Travailler aux Génies d'Afrique est un vrai plaisir. L'équipe pédagogique est passionnée et soutenue.",
      en: "Working at Les Génies d'Afrique is a true pleasure. The pedagogical team is passionate and supported.",
      ew: "Work na Les Génies d'Afrique a pleasure. Team a passionate.",
    },
    rating: 5,
    featured: false,
    order: 3,
    visible: true,
  },
];

/* ── Get Testimonials Functions ──────────────────────────────────── */
export function getTestimonials(): Testimonial[] {
  return TESTIMONIALS_DATA.filter((t) => t.visible && t.status === "published").sort((a, b) => a.order - b.order);
}

export function getFeaturedTestimonials(): Testimonial[] {
  return TESTIMONIALS_DATA.filter((t) => t.featured && t.visible && t.status === "published").sort((a, b) => a.order - b.order);
}
