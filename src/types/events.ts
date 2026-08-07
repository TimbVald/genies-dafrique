import type { LocalizedText, LocalizedContent, ContentStatus } from "./index";

/* ── Event Type ─────────────────────────────────────────────────── */
export type Event = {
  id: string;
  slug: string;
  status: ContentStatus;
  createdAt: string;
  title: LocalizedText;
  description: LocalizedContent;
  startDate: string; // ISO 8601 format
  endDate?: string; // ISO 8601 format
  startTime?: string; // Format: "HH:mm"
  endTime?: string; // Format: "HH:mm"
  location?: LocalizedText;
  category: LocalizedText;
  categoryKey: string;
  image?: string;
  newsId?: string; // Link to related news article
  updatedAt?: string;
  featured: boolean;
  allDay: boolean;
  recurring?: boolean;
  recurrencePattern?: string;
};
