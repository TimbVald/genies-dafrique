"use client";

import { useEffect, useRef } from "react";

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    // Observer l'élément lui-même et tous ses enfants animables
    const targets = el.querySelectorAll(".fade-in-up, .fade-in");
    targets.forEach((t) => observer.observe(t));
    if (el.classList.contains("fade-in-up") || el.classList.contains("fade-in")) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
