import type { GalleryItem } from "@/types";

/* ── Gallery Data ─────────────────────────────────────────────────── */
export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gallery-1",
    slug: "eleves-activite-pedagogique",
    status: "published",
    createdAt: "2025-01-10T00:00:00Z",
    title: {
      fr: "Élèves en activité pédagogique",
      en: "Students in learning activity",
      ew: "Bana ba akom",
    },
    imageUrl: "https://res.cloudinary.com/dyetkan86/image/upload/v1786839369/file_000000008938820ebf8c99f7e916339c_qkbiae.png",
    category: "activities",
    featured: true,
    visible: true,
    order: 1,
    gridSpan: "lg:col-span-2 lg:row-span-2",  // grande photo en mosaïque homepage
  },
  {
    id: "gallery-2",
    slug: "atelier-creatif",
    status: "published",
    createdAt: "2025-01-15T00:00:00Z",
    title: {
      fr: "Atelier créatif à l'école",
      en: "Creative workshop at school",
      ew: "Atelier ya dzam",
    },
    imageUrl: "/images/Generated_Image.png",
    category: "activities",
    featured: false,
    visible: true,
    order: 2,
  },
  {
    id: "gallery-3",
    slug: "vie-scolaire-quotidien",
    status: "published",
    createdAt: "2025-01-20T00:00:00Z",
    title: {
      fr: "Vie scolaire au quotidien",
      en: "Daily school life",
      ew: "Mvog sukul ya lekela",
    },
    imageUrl: "https://res.cloudinary.com/dyetkan86/image/upload/v1786839370/file_00000000fee0820e961ac4b070de78d6_id9boj.png",
    category: "school-life",
    featured: false,
    visible: true,
    order: 3,
  },
  {
    id: "gallery-4",
    slug: "activites-exterieures",
    status: "published",
    createdAt: "2025-01-25T00:00:00Z",
    title: {
      fr: "Activités extérieures des élèves",
      en: "Outdoor student activities",
      ew: "Bisala ya nɔ́n",
    },
    imageUrl: "https://res.cloudinary.com/dyetkan86/image/upload/v1786839369/file_000000004cfc820e87343ca75a6e0ce2_kulqmd.png",
    category: "activities",
    featured: false,
    visible: true,
    order: 4,
  },
  {
    id: "gallery-5",
    slug: "groupe-eleves-heureux",
    status: "published",
    createdAt: "2025-02-01T00:00:00Z",
    title: {
      fr: "Groupe d'élèves heureux",
      en: "Group of happy students",
      ew: "Mbog ya bana ba yɔ́m",
    },
    imageUrl: "https://res.cloudinary.com/dyetkan86/image/upload/v1786839369/file_00000000720c820ebf4ef80185cbe899_xpg8q1.png",
    category: "school-life",
    featured: false,
    visible: true,
    order: 5,
  },
];

/* ── Get Featured Gallery Items Function ─────────────────────────── */
export function getFeaturedGallery(): GalleryItem[] {
  return GALLERY_DATA.filter(
    (g) => g.featured && g.visible && g.status === "published"
  ).sort((a, b) => a.order - b.order);
}

/* ── Get Gallery by Category Function ───────────────────────────────── */
export function getGalleryByCategory(category: string): GalleryItem[] {
  return GALLERY_DATA.filter(
    (g) => g.category === category && g.visible && g.status === "published"
  ).sort((a, b) => a.order - b.order);
}

/* ── Get All Visible Gallery Items Function ────────────────────────── */
export function getVisibleGallery(): GalleryItem[] {
  return GALLERY_DATA.filter(
    (g) => g.visible && g.status === "published"
  ).sort((a, b) => a.order - b.order);
}
