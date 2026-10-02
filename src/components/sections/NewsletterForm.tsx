"use client";

import { useState } from "react";
import { CheckCircle2, Info, Loader2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

type Status = "idle" | "loading" | "success" | "already-subscribed" | "error";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-white text-[#1A202C] text-sm " +
  "placeholder-[#A0AEC0] focus:outline-none focus:border-[#1A3A8F] " +
  "focus:ring-2 focus:ring-[#1A3A8F]/15 transition-colors duration-200";

const labelClass = "block text-sm font-semibold text-white mb-1.5";

export default function NewsletterForm() {
  const t = useTranslations("footer.newsletter");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!email.trim()) {
      setError(t("required"));
      return;
    }

    if (!validateEmail(email)) {
      setError(t("invalidEmail"));
      return;
    }

    if (!consent) {
      setError(t("required"));
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          language: locale,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.alreadySubscribed) {
          setStatus("already-subscribed");
        } else {
          setStatus("success");
        }
        setEmail("");
        setConsent(false);
      } else {
        setError(data.error || t("error"));
        setStatus("error");
      }
    } catch {
      setError(t("error"));
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-6 px-4 bg-[#EEF2FF] rounded-lg border border-[#1A3A8F]/20 animate-fadeIn">
        <div className="w-12 h-12 rounded-full bg-[#1A3A8F] flex items-center justify-center mx-auto mb-3 shadow-md">
          <CheckCircle2 size={24} className="text-white" />
        </div>
        <p className="text-[#1A3A8F] text-sm font-semibold mb-1">
          {t("success")}
        </p>
      </div>
    );
  }

  if (status === "already-subscribed") {
    return (
      <div className="text-center py-6 px-4 bg-[#FFF8E1] rounded-lg border border-[#F5A623]/30 animate-fadeIn">
        <div className="w-12 h-12 rounded-full bg-[#F5A623] flex items-center justify-center mx-auto mb-3 shadow-md">
          <Info size={24} className="text-white" />
        </div>
        <p className="text-[#8D5B00] text-sm font-semibold">
          {t("alreadySubscribed")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="newsletter-email" className={labelClass}>
          {t("placeholder")}
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder={t("placeholder")}
          className={`${inputClass} ${error ? "border-[#D32F2F] ring-1 ring-[#D32F2F]" : ""}`}
          disabled={status === "loading"}
          autoComplete="email"
        />
        {error && (
          <p className="mt-1.5 text-xs text-[#FFEAEA] bg-[#D32F2F]/20 px-2 py-1 rounded border border-[#D32F2F]/30 font-medium">
            {error}
          </p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="newsletter-consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-[#1A3A8F] flex-shrink-0 cursor-pointer"
          disabled={status === "loading"}
        />
        <label
          htmlFor="newsletter-consent"
          className="text-xs text-white/80 cursor-pointer select-none leading-relaxed"
        >
          {t("consent")}
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg
          bg-[#D32F2F] text-white font-semibold text-sm
          hover:bg-[#B71C1C] hover:-translate-y-0.5 disabled:opacity-70 disabled:translate-y-0
          transition-all duration-200 shadow-[0_4px_15px_rgba(211,47,47,0.3)] cursor-pointer"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {t("buttonLoading")}
          </>
        ) : (
          t("button")
        )}
      </button>
    </form>
  );
}
