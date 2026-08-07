import type { LocalizedText, LocalizedContent, ContentStatus } from "./index";

/* ── Testimonial Type ──────────────────────────────────────────── */
export type Testimonial = {
  id: string;
  slug: string;
  status: ContentStatus;
  createdAt: string;
  name: string;
  role: LocalizedText;
  content: LocalizedContent;
  photo?: string;
  rating: number; // 1-5
  featured: boolean;
  order: number;
  visible: boolean;
};
