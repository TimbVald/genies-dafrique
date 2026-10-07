import type { Locale } from "@/data/chatbot/faq";
export type { Locale };

/* ── Testimonial Submission Type ─────────────────────────────────── */
export type TestimonialSubmission = {
  id: string;
  name: string;
  rating: number; // 1-5
  comment: string;
  locale: Locale;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  ipAddress: string;
  userAgent?: string;
};

/* ── API Response Types ─────────────────────────────────────────── */
export type TestimonialSubmissionResponse = {
  success: boolean;
  message: string;
  submission?: TestimonialSubmission;
  error?: string;
};

export type TestimonialsListResponse = {
  success: boolean;
  testimonials: TestimonialSubmission[];
  error?: string;
};
