import type { LocalizedText, BaseContent, Media } from "@/types";

/* ── Gallery Item Configuration ───────────────────────────────────── */
export interface GalleryItem extends BaseContent {
  title: LocalizedText;
  description?: LocalizedText;
  media: Media;
  category: string;
  featured: boolean;
  visible: boolean;
  order: number;
}

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
    media: {
      url: "/images/IMG-20260723-WA0024.jpg",
      alt: {
        fr: "Élèves en activité pédagogique",
        en: "Students in learning activity",
        ew: "Bana ba akom",
      },
    },
    category: "activities",
    featured: true,
    visible: true,
    order: 1,
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
    media: {
      url: "/images/Generated_Image.png",
      alt: {
        fr: "Atelier créatif à l'école",
        en: "Creative workshop at school",
        ew: "Atelier ya dzam",
      },
    },
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
    media: {
      url: "/images/pexels-ai25studioai-7342628.jpg",
      alt: {
        fr: "Vie scolaire au quotidien",
        en: "Daily school life",
        ew: "Mvog sukul ya lekela",
      },
    },
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
    media: {
      url: "/images/pexels-karola-g-7269671.jpg",
      alt: {
        fr: "Activités extérieures des élèves",
        en: "Outdoor student activities",
        ew: "Bisala ya nɔ́n",
      },
    },
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
    media: {
      url: "/images/pexels-ani-ani.jpg",
      alt: {
        fr: "Groupe d'élèves heureux",
        en: "Group of happy students",
        ew: "Mbog ya bana ba yɔ́m",
      },
    },
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
