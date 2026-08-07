import type { LocalizedText, LocalizedContent, BaseContent, ContentStatus } from "./index";

/* ── Program Type Definition ─────────────────────────────────────── */
export type Program = BaseContent & {
  name: LocalizedText;
  badge: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedContent;
  features: LocalizedText[];
  level?: string;
  section?: "francophone" | "anglophone" | "bilingual";
  image: string;
  order: number;
  featured?: boolean;
  status: ContentStatus;
  createdAt: string;
  updatedAt?: string;
};
