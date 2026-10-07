import type { TestimonialSubmission } from "@/types/testimonial-submission";

/* ── In-Memory Storage for Testimonials ─────────────────────────────
   En production, remplacer par une base de données (PostgreSQL, MongoDB, etc.)
   ────────────────────────────────────────────────────────────────── */
export const testimonialsStorage: TestimonialSubmission[] = [];

/* ── Helper Functions ─────────────────────────────────────────────── */
export function addTestimonial(submission: TestimonialSubmission): void {
  testimonialsStorage.push(submission);
}

export function getApprovedTestimonials(): TestimonialSubmission[] {
  return testimonialsStorage.filter((t) => t.status === "approved");
}

export function getAllTestimonials(): TestimonialSubmission[] {
  return [...testimonialsStorage];
}

export function getTestimonialById(id: string): TestimonialSubmission | undefined {
  return testimonialsStorage.find((t) => t.id === id);
}

export function updateTestimonialStatus(
  id: string,
  status: "pending" | "approved" | "rejected"
): boolean {
  const testimonial = getTestimonialById(id);
  if (testimonial) {
    testimonial.status = status;
    return true;
  }
  return false;
}

/* ── Admin helper for testing (remove in production) ──────────────── */
export function approveAllPending(): void {
  testimonialsStorage.forEach((t) => {
    if (t.status === "pending") {
      t.status = "approved";
    }
  });
}
