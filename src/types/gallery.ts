import type { LocalizedText, ContentStatus } from "./index";

/* ── Gallery Item Type ──────────────────────────────────────────── */
export type GalleryItem = {
  id: string;
  slug: string;
  status: ContentStatus;
  createdAt: string;
  title: LocalizedText;
  description?: LocalizedText;
  imageUrl: string;
  thumbnailUrl?: string;
  category: string;
  featured: boolean;
  visible: boolean;
  order: number;
  tags?: string[];
  photographer?: string;
  date?: string;
  /**
   * Classes Tailwind pour le span dans la grille CSS de la mosaïque.
   * Exemples : "lg:col-span-2 lg:row-span-2" (grande photo), "" (normale).
   * Permet de contrôler la mise en page de la galerie homepage depuis les données.
   */
  gridSpan?: string;
};
