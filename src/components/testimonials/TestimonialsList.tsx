"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Star, MessageCircle, Loader2 } from "lucide-react";
import type { TestimonialSubmission, Locale } from "@/types/testimonial-submission";

/* ── Props ────────────────────────────────────────────────────────── */
interface TestimonialsListProps {
  refreshTrigger?: number;
}

/* ── UI Messages ───────────────────────────────────────────────────── */
const UI_MESSAGES: Record<Locale, {
  title: string;
  noReviews: string;
  beFirst: string;
  loading: string;
  months: Record<string, string>;
}> = {
  fr: {
    title: "Avis de nos visiteurs",
    noReviews: "Aucun avis publié pour le moment",
    beFirst: "Soyez le premier à partager votre expérience !",
    loading: "Chargement des avis...",
    months: {
      "0": "janvier",
      "1": "février",
      "2": "mars",
      "3": "avril",
      "4": "mai",
      "5": "juin",
      "6": "juillet",
      "7": "août",
      "8": "septembre",
      "9": "octobre",
      "10": "novembre",
      "11": "décembre",
    },
  },
  en: {
    title: "Visitor reviews",
    noReviews: "No reviews published yet",
    beFirst: "Be the first to share your experience!",
    loading: "Loading reviews...",
    months: {
      "0": "January",
      "1": "February",
      "2": "March",
      "3": "April",
      "4": "May",
      "5": "June",
      "6": "July",
      "7": "August",
      "8": "September",
      "9": "October",
      "10": "November",
      "11": "December",
    },
  },
  ew: {
    title: "Mfañ ya visitors",
    noReviews: "Aucun avis publié pour le moment",
    beFirst: "Soyez le premier à partager votre expérience !",
    loading: "Chargement des avis...",
    months: {
      "0": "janvier",
      "1": "février",
      "2": "mars",
      "3": "avril",
      "4": "mai",
      "5": "juin",
      "6": "juillet",
      "7": "août",
      "8": "septembre",
      "9": "octobre",
      "10": "novembre",
      "11": "décembre",
    },
  },
};

/* ── Star Display Component ───────────────────────────────────────── */
function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${
            star <= rating
              ? "fill-[#F5A623] text-[#F5A623]"
              : "fill-white text-[#CBD5E1]"
          }`}
        />
      ))}
    </div>
  );
}

/* ── Date Formatter ──────────────────────────────────────────────── */
function formatDate(dateString: string, locale: Locale): string {
  const date = new Date(dateString);
  const ui = UI_MESSAGES[locale] || UI_MESSAGES.fr;
  const day = date.getDate();
  const month = ui.months[date.getMonth().toString()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

/* ── Testimonial Card Component ─────────────────────────────────────── */
function TestimonialCard({ testimonial, locale }: { testimonial: TestimonialSubmission; locale: Locale }) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#E2E8F0] hover:shadow-md transition-shadow">
      {/* Header: Rating + Date */}
      <div className="flex items-start justify-between mb-3">
        <StarDisplay rating={testimonial.rating} />
        <span className="text-xs text-[#A0AEC0]">
          {formatDate(testimonial.createdAt, locale)}
        </span>
      </div>

      {/* Comment */}
      <p className="text-sm sm:text-base text-[#1A202C] leading-relaxed mb-4">
        {testimonial.comment}
      </p>

      {/* Footer: Name */}
      <div className="flex items-center gap-2 pt-3 border-t border-[#E2E8F0]/50">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1A3A8F] to-[#2D5BE3] flex items-center justify-center text-white font-bold text-sm">
          {testimonial.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-semibold text-[#1A202C]">
          {testimonial.name}
        </span>
      </div>
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────────────── */
export default function TestimonialsList({ refreshTrigger }: TestimonialsListProps) {
  const locale = useLocale() as Locale;
  const ui = UI_MESSAGES[locale] || UI_MESSAGES.fr;

  const [testimonials, setTestimonials] = useState<TestimonialSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/testimonials");
      const data = await response.json();

      if (response.ok && data.success) {
        setTestimonials(data.testimonials);
      } else {
        setError(data.error || "Failed to load testimonials");
      }
    } catch (err) {
      setError("Failed to load testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [refreshTrigger]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 size={32} className="text-[#1A3A8F] animate-spin mb-4" />
        <p className="text-sm text-[#4A5568]">{ui.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#F7F9FC] to-[#EDF2F7] rounded-2xl p-8 sm:p-12 text-center border border-[#E2E8F0]">
        <div className="w-16 h-16 rounded-full bg-[#1A3A8F]/10 flex items-center justify-center mx-auto mb-4">
          <MessageCircle size={32} className="text-[#1A3A8F]" />
        </div>
        <h3 className="text-xl font-bold text-[#1A202C] mb-2">{ui.noReviews}</h3>
        <p className="text-sm text-[#4A5568]">{ui.beFirst}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1A202C] mb-6">{ui.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} locale={locale} />
        ))}
      </div>
    </div>
  );
}
