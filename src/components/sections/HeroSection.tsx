"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const SLIDES = [
  "/images/Generated_Image.png",
  "/images/pexels-ai25studioai-7342628.jpg",
  "/images/IMG-20260723-WA0024.jpg",
  "/images/pexels-karola-g-7269671.jpg",
];

export default function HeroSection() {
  const t = useTranslations("hero");
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Déclencher l'animation d'entrée via RAF pour éviter setState direct dans effect
    const raf = requestAnimationFrame(() => setMounted(true));
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden flex items-center justify-center">

      {/* ── Diaporama images de fond ── */}
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={i === 0}
            aria-hidden="true"
          />
        </div>
      ))}

      {/* ── Overlay dégradé ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,31,107,0.82) 0%, rgba(211,47,47,0.38) 100%)",
        }}
      />

      {/* ── Contenu centré ── */}
      <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        {/* Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
          {t("badge")}
        </span>

        {/* Titre H1 */}
        <h1
          className="font-display text-white font-bold mb-6 leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
        >
          {t("title")}
        </h1>

        {/* Sous-titre */}
        <p
          className="text-white/85 mb-10 max-w-2xl mx-auto"
          style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: 1.7 }}
        >
          {t("subtitle")}
        </p>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/admissions"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[#D32F2F] text-white
              font-semibold text-base shadow-[0_4px_20px_rgba(211,47,47,0.45)]
              hover:bg-[#B71C1C] hover:-translate-y-1 transition-all duration-200"
          >
            {t("ctaPrimary")}
          </Link>
          <Link
            href="/presentation"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-white/80
              text-white font-semibold text-base hover:bg-white/15 hover:-translate-y-1 transition-all duration-200"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>

      {/* ── Dots navigation ── */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 text-xs">
        <span className="tracking-widest uppercase text-[10px]">{t("scrollHint")}</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
}
