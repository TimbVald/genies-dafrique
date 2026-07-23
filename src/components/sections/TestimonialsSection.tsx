"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as {
    name: string;
    role: string;
    text: string;
    stars: number;
  }[];
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <SectionBadge variant="white">{t("badge")}</SectionBadge>
          <h2
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.75rem)" }}
          >
            {t("title")}
          </h2>
        </div>

        {/* Slider */}
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <Quote size={40} className="text-[#F5A623] mb-6 opacity-80" />

            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 font-display italic">
              &ldquo;{items[current].text}&rdquo;
            </p>

            {/* Étoiles */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: items[current].stars }).map((_, i) => (
                <Star key={i} size={18} className="text-[#F5A623] fill-[#F5A623]" />
              ))}
            </div>

            <div>
              <p className="text-white font-bold text-base">{items[current].name}</p>
              <p className="text-white/60 text-sm">{items[current].role}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Précédent"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center
                text-white transition-colors duration-200"
            >
              <ChevronLeft size={20} />
            </button>

            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Témoignage ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "w-8 h-2.5 bg-[#F5A623]" : "w-2.5 h-2.5 bg-white/30"
                }`}
              />
            ))}

            <button
              onClick={next}
              aria-label="Suivant"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center
                text-white transition-colors duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
