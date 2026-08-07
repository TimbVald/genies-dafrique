import type { LocalizedText, LocalizedContent, ContentStatus } from "./index";

/* ── Document Type ─────────────────────────────────────────────── */
export type Document = {
  id: string;
  slug: string;
  status: ContentStatus;
  createdAt: string;
  title: LocalizedText;
  description?: LocalizedContent;
  fileUrl: string;
  fileType: string; // pdf, doc, docx, etc.
  category: string;
  size: string; // File size in KB/MB
  publishedAt: string;
  downloadable: boolean;
  visible: boolean;
  order: number;
  tags?: string[];
};
