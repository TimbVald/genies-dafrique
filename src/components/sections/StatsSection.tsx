"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const numeric = parseInt(value.replace(/\D/g, ""), 10);
    if (isNaN(numeric)) {
      // Valeur non numérique (ex: "FR+EN") → afficher directement
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1500;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setDisplay(String(Math.round(ease * numeric)));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center px-6 py-8">
      <p
        className="font-display font-bold text-[#F5A623] mb-2"
        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
      >
        {display}
      </p>
      <p className="text-white/80 text-sm font-medium tracking-wide uppercase">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const t = useTranslations("stats");
  const items = t.raw("items") as { value: string; label: string }[];

  return (
    <section
      className="py-20"
      style={{
        background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <h2
          className="text-center font-display font-bold text-white mb-12"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
        >
          {t("title")}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {items.map((item, i) => (
            <AnimatedStat key={i} value={item.value} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
