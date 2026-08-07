import type { LocalizedText, LocalizedContent, ContentStatus } from "./index";

/* ── News Article Type ───────────────────────────────────────────── */
export type NewsArticle = {
  id: string;
  slug: string;
  status: ContentStatus;
  createdAt: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  content: LocalizedContent;
  category: LocalizedText;
  categoryKey: string;
  image: string;
  gallery: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  tags?: string[];
  eventDate?: string; // For calendar integration
  eventType?: string; // Type of event for calendar
};
