"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface Crumb { label: string; href?: string; }

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  breadcrumbs: Crumb[];
  /** Optional accent color for the bottom bar (defaults to brand red) */
  accentColor?: string;
}

export default function PageHero({ title, subtitle, image, breadcrumbs, accentColor = "#D32F2F" }: PageHeroProps) {
  return (
    <section className="relative h-[40vh] min-h-[350px] md:h-[50vh] md:min-h-[450px] lg:h-[55vh] lg:min-h-[500px] flex items-end overflow-hidden">
      {/* Background image */}
      <Image src={image} alt="" fill className="object-cover object-center" sizes="100vw" priority aria-hidden="true" />

      {/* Layered overlays for depth (adjusted for better image visibility) */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,31,107,0.75) 0%, rgba(13,31,107,0.4) 40%, rgba(13,31,107,0.1) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,31,107,0.8) 0%, transparent 60%)" }} />

      {/* Decorative geometric accent */}
      <div className="absolute top-0 right-0 w-[40%] h-full opacity-10 pointer-events-none"
        style={{ background: "linear-gradient(135deg, transparent 0%, rgba(245,166,35,0.4) 100%)" }} />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* Accent left bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)` }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-10 pb-10 lg:pb-14">
        {/* Breadcrumb */}
        <motion.nav
          aria-label="breadcrumb" className="mb-4"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ol className="flex items-center gap-1.5 text-white/60 text-xs font-medium flex-wrap">
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} className="text-white/30 flex-shrink-0" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors duration-150 hover:underline underline-offset-2">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/95 font-semibold">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </motion.nav>

        {/* Title */}
        <motion.h1
          className="font-display font-bold text-white leading-tight mb-3"
          style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, ${accentColor} 0%, #F5A623 50%, ${accentColor} 100%)` }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        />
      </div>
    </section>
  );
}
