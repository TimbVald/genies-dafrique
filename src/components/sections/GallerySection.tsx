"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, useInView, type Variants, AnimatePresence } from "framer-motion";
import { ZoomIn, X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

/* ── Photos de la galerie aperçu ─────────────────────────────── */
const GALLERY_PHOTOS = [
  {
    src: "/images/IMG-20260723-WA0017.jpg",
    altFr: "Élèves en activité pédagogique",
    altEn: "Students in learning activity",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/images/IMG-20260723-WA0013.jpg",
    altFr: "Atelier créatif à l'école",
    altEn: "Creative workshop at school",
    span: "",
  },
  {
    src: "/images/IMG-20260723-WA0015.jpg",
    altFr: "Vie scolaire au quotidien",
    altEn: "Daily school life",
    span: "",
  },
  {
    src: "/images/IMG-20260723-WA0022.jpg",
    altFr: "Activités extérieures des élèves",
    altEn: "Outdoor student activities",
    span: "",
  },
  {
    src: "/images/IMG-20260723-WA0034.jpg",
    altFr: "Groupe d'élèves heureux",
    altEn: "Group of happy students",
    span: "",
  },
];

/* ── Animations ─────────────────────────────────────────────── */
const headerAnim: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const gridAnim: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const photoAnim: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ══════════════════════════════════════════════════════════════ */
export default function GallerySection() {
  const t      = useTranslations("gallery");
  const locale = useLocale();

  const [lightbox, setLightbox] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((l) =>
    l !== null ? (l - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length : null
  );
  const next = () => setLightbox((l) =>
    l !== null ? (l + 1) % GALLERY_PHOTOS.length : null
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="py-24 lg:py-28 bg-[#F7F9FC]"
        aria-label={locale === "fr" ? "Galerie photos" : "Photo gallery"}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

          {/* ── En-tête ── */}
          <motion.div
            className="text-center mb-12"
            variants={headerAnim}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <SectionBadge>{t("badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mb-3 mt-1"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}
            >
              {t("title")}
            </h2>
            <p className="text-[#4A5568] text-lg max-w-none">{t("subtitle")}</p>
          </motion.div>

          {/* ── Grille mosaïque ── */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-10"
            /* CSS grid rows pour la grande photo */
            style={{ gridAutoRows: "200px" }}
            variants={gridAnim}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            {GALLERY_PHOTOS.map((photo, i) => {
              const altText = locale === "fr" ? photo.altFr : photo.altEn;

              return (
                <motion.div
                  key={i}
                  variants={photoAnim}
                  className={`relative overflow-hidden rounded-2xl group
                    cursor-pointer ring-2 ring-transparent
                    hover:ring-[#1A3A8F]/40 focus-within:ring-[#1A3A8F]
                    transition-all duration-300 ${photo.span}`}
                >
                  <Image
                    src={photo.src}
                    alt={altText}
                    fill
                    className="object-cover group-hover:scale-[1.06]
                      transition-transform duration-700 ease-in-out"
                    sizes={
                      photo.span
                        ? "(max-width: 640px) 50vw, 66vw"
                        : "(max-width: 640px) 50vw, 33vw"
                    }
                  />

                  {/* Overlay hover */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#1A3A8F]/70 via-[#1A3A8F]/20
                      to-transparent opacity-0 group-hover:opacity-100
                      transition-opacity duration-350"
                  />

                  {/* Bouton zoom accessible */}
                  <button
                    onClick={() => openLightbox(i)}
                    aria-label={
                      locale === "fr"
                        ? `Agrandir : ${altText}`
                        : `Expand: ${altText}`
                    }
                    className="absolute inset-0 flex items-center justify-center
                      focus:outline-none"
                    tabIndex={0}
                  >
                    <span
                      className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm
                        flex items-center justify-center shadow-lg
                        opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100
                        transition-all duration-300"
                      aria-hidden="true"
                    >
                      <ZoomIn size={22} className="text-[#1A3A8F]" />
                    </span>
                  </button>

                  {/* Légende au bas (grande photo) */}
                  {photo.span && (
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <p className="text-white text-sm font-medium drop-shadow-sm">
                        {altText}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          >
            <Link href="/vie-scolaire">
              <motion.span
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl
                  bg-[#D32F2F] text-white font-bold text-sm tracking-wide
                  shadow-[var(--shadow-red)] cursor-pointer"
                whileHover={{ scale: 1.03, y: -2, boxShadow: "0 8px 28px rgba(211,47,47,0.45)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 360, damping: 24 }}
              >
                {t("cta")}
                <ArrowRight size={18} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/* LIGHTBOX                                             */}
      {/* ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={locale === "fr" ? "Visionneuse de photos" : "Photo viewer"}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
          >
            {/* Bouton fermer */}
            <button
              onClick={closeLightbox}
              aria-label={locale === "fr" ? "Fermer la visionneuse" : "Close viewer"}
              className="absolute top-4 right-4 w-11 h-11 rounded-full
                bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20
                flex items-center justify-center text-white
                transition-colors duration-200 z-10 focus-invert"
            >
              <X size={20} />
            </button>

            {/* Navigation gauche */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label={locale === "fr" ? "Photo précédente" : "Previous photo"}
              className="absolute left-3 sm:left-6 w-12 h-12 rounded-full
                bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20
                flex items-center justify-center text-white
                transition-colors duration-200 z-10 focus-invert"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Image principale */}
            <motion.div
              key={lightbox}
              className="relative w-full max-w-4xl aspect-video"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_PHOTOS[lightbox].src}
                alt={
                  locale === "fr"
                    ? GALLERY_PHOTOS[lightbox].altFr
                    : GALLERY_PHOTOS[lightbox].altEn
                }
                fill
                className="object-contain rounded-xl"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Navigation droite */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label={locale === "fr" ? "Photo suivante" : "Next photo"}
              className="absolute right-3 sm:right-6 w-12 h-12 rounded-full
                bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20
                flex items-center justify-center text-white
                transition-colors duration-200 z-10 focus-invert"
            >
              <ChevronRight size={24} />
            </button>

            {/* Compteur */}
            <p
              aria-live="polite"
              className="absolute bottom-4 left-1/2 -translate-x-1/2
                text-white/50 text-sm tabular-nums"
            >
              {lightbox + 1} / {GALLERY_PHOTOS.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
