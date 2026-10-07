"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import TestimonialsList from "./TestimonialsList";
import TestimonialForm from "./TestimonialForm";
import type { Locale } from "@/types/testimonial-submission";

/* ── Props ────────────────────────────────────────────────────────── */
interface TestimonialsSectionProps {
  showForm?: boolean;
  layout?: "side-by-side" | "stacked";
  standalone?: boolean; // If true, includes section wrapper
}

/* ── UI Messages ───────────────────────────────────────────────────── */
const UI_MESSAGES: Record<Locale, {
  sectionTitle: string;
  toggleForm: string;
  hideForm: string;
}> = {
  fr: {
    sectionTitle: "Témoignages",
    toggleForm: "Laisser un avis",
    hideForm: "Masquer le formulaire",
  },
  en: {
    sectionTitle: "Testimonials",
    toggleForm: "Leave a review",
    hideForm: "Hide form",
  },
  ew: {
    sectionTitle: "Témoignages",
    toggleForm: "Laisser un avis",
    hideForm: "Masquer le formulaire",
  },
};

/* ── Main Component ───────────────────────────────────────────────── */
export default function TestimonialsSection({
  showForm = true,
  layout = "stacked",
  standalone = false,
}: TestimonialsSectionProps) {
  const locale = useLocale() as Locale;
  const ui = UI_MESSAGES[locale] || UI_MESSAGES.fr;

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFormSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
    setIsFormVisible(false);
  };

  const content = layout === "side-by-side" ? (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1A202C] mb-8">{ui.sectionTitle}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Testimonials List */}
        <div>
          <TestimonialsList refreshTrigger={refreshTrigger} />
        </div>

        {/* Form */}
        {showForm && (
          <div className="lg:sticky lg:top-24">
            {isFormVisible ? (
              <div>
                <button
                  onClick={() => setIsFormVisible(false)}
                  className="text-sm text-[#1A3A8F] font-semibold mb-4 hover:underline"
                >
                  ← {ui.hideForm}
                </button>
                <TestimonialForm onSuccess={handleFormSuccess} />
              </div>
            ) : (
              <button
                onClick={() => setIsFormVisible(true)}
                className="w-full bg-gradient-to-r from-[#1A3A8F] to-[#2D5BE3] text-white rounded-2xl p-6 sm:p-8 font-semibold hover:opacity-95 transition-all shadow-md"
              >
                {ui.toggleForm}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1A202C] mb-8">{ui.sectionTitle}</h2>

      {/* Testimonials List */}
      <div className="mb-12">
        <TestimonialsList refreshTrigger={refreshTrigger} />
      </div>

      {/* Form */}
      {showForm && (
        <div>
          {isFormVisible ? (
            <div>
              <button
                onClick={() => setIsFormVisible(false)}
                className="text-sm text-[#1A3A8F] font-semibold mb-4 hover:underline"
              >
                ← {ui.hideForm}
              </button>
              <TestimonialForm onSuccess={handleFormSuccess} />
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={() => setIsFormVisible(true)}
                className="px-8 py-3.5 bg-gradient-to-r from-[#1A3A8F] to-[#2D5BE3] text-white rounded-xl font-semibold hover:opacity-95 transition-all shadow-md"
              >
                {ui.toggleForm}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (standalone) {
    return (
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">{content}</div>
      </section>
    );
  }

  return content;
}
