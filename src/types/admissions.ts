import type { LocalizedText, LocalizedContent, ContentStatus } from "./index";

/* ── Admission Step Type ─────────────────────────────────────────── */
export type AdmissionStep = {
  id: string;
  slug: string;
  status: ContentStatus;
  createdAt: string;
  step: number;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  order: number;
  visible: boolean;
};

/* ── Admission Document Type ─────────────────────────────────────── */
export type AdmissionDocument = {
  id: string;
  slug: string;
  status: ContentStatus;
  createdAt: string;
  name: LocalizedText;
  description?: LocalizedText;
  required: boolean;
  order: number;
  visible: boolean;
};

/* ── Admission Requirement Type ──────────────────────────────────── */
export type AdmissionRequirement = {
  id: string;
  slug: string;
  status: ContentStatus;
  createdAt: string;
  title: LocalizedText;
  description: LocalizedContent;
  order: number;
  visible: boolean;
};

/* ── Admission Fee Type ─────────────────────────────────────────── */
export type AdmissionFee = {
  id: string;
  slug: string;
  status: ContentStatus;
  createdAt: string;
  level: LocalizedText;
  ageRange: LocalizedText;
  tuition: LocalizedText;
  order: number;
  visible: boolean;
};

/* ── Application Type (for future Supabase integration) ───────────── */
export type Application = {
  id: string;
  parentId?: string;
  studentName: string;
  studentBirthDate: string;
  program: string;
  parentEmail: string;
  parentPhone: string;
  parentAddress: string;
  message?: string;
  status: "pending" | "approved" | "rejected" | "completed";
  submittedAt: string;
  updatedAt?: string;
};
