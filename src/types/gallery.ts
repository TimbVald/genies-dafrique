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
};
