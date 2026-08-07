import type { LocalizedText, LocalizedContent, ContentStatus } from "./index";

/* ── School Life Activity Type ──────────────────────────────────── */
export type SchoolLifeActivity = {
  id: string;
  slug: string;
  status: ContentStatus;
  createdAt: string;
  title: LocalizedText;
  description: LocalizedContent;
  category: string; // clubs, sports, culture, activities
  schedule?: LocalizedText;
  image?: string;
  ageRange?: LocalizedText;
  featured: boolean;
  visible: boolean;
  order: number;
  tags?: string[];
};
