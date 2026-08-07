import type { LocalizedText, LocalizedContent, ContentStatus } from "./index";

/* ── FAQ Item Type ─────────────────────────────────────────────── */
export type FAQItem = {
  id: string;
  slug: string;
  status: ContentStatus;
  createdAt: string;
  question: LocalizedText;
  answer: LocalizedContent;
  category: string;
  order: number;
  visible: boolean;
};
