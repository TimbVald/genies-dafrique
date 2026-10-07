"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Star, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { Locale } from "@/types/testimonial-submission";

/* ── Props ────────────────────────────────────────────────────────── */
interface TestimonialFormProps {
  onSuccess?: () => void;
}

/* ── UI Messages ───────────────────────────────────────────────────── */
const UI_MESSAGES: Record<Locale, {
  title: string;
  nameLabel: string;
  namePlaceholder: string;
  commentLabel: string;
  commentPlaceholder: string;
  submitButton: string;
  submitting: string;
  ratingLabel: string;
  successTitle: string;
  successMessage: string;
  submitAnother: string;
  errorTitle: string;
  nameError: string;
  commentError: string;
  ratingError: string;
}> = {
  fr: {
    title: "Partagez votre expérience",
    nameLabel: "Votre nom (optionnel)",
    namePlaceholder: "Ex: Marie Dupont",
    commentLabel: "Votre avis",
    commentPlaceholder: "Dites-nous ce que vous pensez de Les Génies d'Afrique...",
    submitButton: "Envoyer mon avis",
    submitting: "Envoi en cours...",
    ratingLabel: "Votre note",
    successTitle: "Merci pour votre avis !",
    successMessage: "Votre témoignage a été envoyé avec succès. Il sera publié après modération.",
    submitAnother: "Envoyer un autre avis",
    errorTitle: "Une erreur est survenue",
    nameError: "Le nom doit contenir entre 2 et 100 caractères",
    commentError: "Le commentaire doit contenir entre 10 et 1000 caractères",
    ratingError: "Veuillez sélectionner une note",
  },
  en: {
    title: "Share your experience",
    nameLabel: "Your name (optional)",
    namePlaceholder: "Ex: Marie Dupont",
    commentLabel: "Your review",
    commentPlaceholder: "Tell us what you think about Les Génies d'Afrique...",
    submitButton: "Submit review",
    submitting: "Submitting...",
    ratingLabel: "Your rating",
    successTitle: "Thank you for your review!",
    successMessage: "Your testimonial has been submitted successfully. It will be published after moderation.",
    submitAnother: "Submit another review",
    errorTitle: "An error occurred",
    nameError: "Name must be between 2 and 100 characters",
    commentError: "Comment must be between 10 and 1000 characters",
    ratingError: "Please select a rating",
  },
  ew: {
    title: "Yiba mfañ wua",
    nameLabel: "Nkom wua (optionnel)",
    namePlaceholder: "Ex: Marie Dupont",
    commentLabel: "Mfañ wua",
    commentPlaceholder: "Yiba mfañ wua na Les Génies d'Afrique...",
    submitButton: "Tɔ́l mfañ wua",
    submitting: "Tɔ́l...",
    ratingLabel: "Nkom wua",
    successTitle: "Zɔ́k na mfañ wua!",
    successMessage: "Mfañ wua a nga tɔ́l. A ne yen après moderation.",
    submitAnother: "Tɔ́l mfañ mumbɔ́g",
    errorTitle: "Erreur a ne",
    nameError: "Nkom a kɔ́bɔ́ 2 tii 100 characters",
    commentError: "Comment a kɔ́bɔ́ 10 tii 1000 characters",
    ratingError: "Yiba nkom wua",
  },
};

/* ── Star Rating Component ─────────────────────────────────────────── */
function StarRating({ rating, onRatingChange, size = 32 }: {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: number;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className="transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1A3A8F] focus:ring-offset-2 rounded-full"
          aria-label={`Rate ${star} stars`}
        >
          <Star
            size={size}
            className={`${
              star <= rating
                ? "fill-[#F5A623] text-[#F5A623]"
                : "fill-white text-[#CBD5E1]"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────────────── */
export default function TestimonialForm({ onSuccess }: TestimonialFormProps) {
  const locale = useLocale() as Locale;
  const ui = UI_MESSAGES[locale] || UI_MESSAGES.fr;

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; comment?: string; rating?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: { name?: string; comment?: string; rating?: string } = {};

    if (name.length > 0 && (name.length < 2 || name.length > 100)) {
      newErrors.name = ui.nameError;
    }

    if (comment.length < 10 || comment.length > 1000) {
      newErrors.comment = ui.commentError;
    }

    if (rating === 0) {
      newErrors.rating = ui.ratingError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/testimonials/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Anonyme",
          rating,
          comment: comment.trim(),
          locale,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        // Reset form
        setName("");
        setRating(0);
        setComment("");
        onSuccess?.();
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.message || data.error || ui.errorTitle);
      }
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(ui.errorTitle);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitStatus("idle");
    setErrorMessage("");
    setErrors({});
  };

  if (submitStatus === "success") {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#E2E8F0]">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#2E7D32]/10 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-[#2E7D32]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1A202C] mb-2">{ui.successTitle}</h3>
            <p className="text-sm text-[#4A5568]">{ui.successMessage}</p>
          </div>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-[#1A3A8F] text-white rounded-xl font-semibold hover:bg-[#2D5BE3] transition-colors"
          >
            {ui.submitAnother}
          </button>
        </div>
      </div>
    );
  }

  if (submitStatus === "error") {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#E2E8F0]">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#D32F2F]/10 flex items-center justify-center">
            <AlertCircle size={32} className="text-[#D32F2F]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1A202C] mb-2">{ui.errorTitle}</h3>
            <p className="text-sm text-[#4A5568]">{errorMessage}</p>
          </div>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-[#1A3A8F] text-white rounded-xl font-semibold hover:bg-[#2D5BE3] transition-colors"
          >
            {locale === "fr" ? "Réessayer" : locale === "en" ? "Try again" : "Retry"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#E2E8F0]">
      <h3 className="text-xl sm:text-2xl font-bold text-[#1A202C] mb-6">{ui.title}</h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-[#1A202C] mb-3">
            {ui.ratingLabel}
          </label>
          <StarRating rating={rating} onRatingChange={setRating} size={32} />
          {errors.rating && (
            <p className="text-sm text-[#D32F2F] mt-2">{errors.rating}</p>
          )}
        </div>

        {/* Name (Optional) */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#1A202C] mb-2">
            {ui.nameLabel}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={ui.namePlaceholder}
            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F7F9FC] text-[#1A202C] placeholder-[#A0AEC0] focus:outline-none focus:ring-2 focus:ring-[#1A3A8F]/25 focus:border-[#1A3A8F] transition-all"
            maxLength={100}
          />
          {errors.name && (
            <p className="text-sm text-[#D32F2F] mt-2">{errors.name}</p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-semibold text-[#1A202C] mb-2">
            {ui.commentLabel} <span className="text-[#D32F2F]">*</span>
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={ui.commentPlaceholder}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F7F9FC] text-[#1A202C] placeholder-[#A0AEC0] focus:outline-none focus:ring-2 focus:ring-[#1A3A8F]/25 focus:border-[#1A3A8F] transition-all resize-none"
            maxLength={1000}
          />
          <div className="flex justify-between mt-1">
            {errors.comment && (
              <p className="text-sm text-[#D32F2F]">{errors.comment}</p>
            )}
            <p className="text-xs text-[#A0AEC0] ml-auto">
              {comment.length}/1000
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3.5 bg-gradient-to-r from-[#1A3A8F] to-[#2D5BE3] text-white rounded-xl font-semibold hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              {ui.submitting}
            </>
          ) : (
            <>
              <Send size={18} />
              {ui.submitButton}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
