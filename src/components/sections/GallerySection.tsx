"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, useInView, type Variants, AnimatePresence } from "framer-motion";
import { ZoomIn, X, ArrowRight, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

const PHOTOS = [
  { src: "/images/IMG-20260723-WA0024.jpg",          altFr: "Élèves en activité pédagogique",    altEn: "Students in learning activity",     span: "lg:col-span-2 lg:row-span-2" },
  { src: "/images/Generated_Image.png",              altFr: "Atelier créatif à l'école",          altEn: "Creative workshop at school",       span: "" },
  { src: "/images/pexels-ai25studioai-7342628.jpg",  altFr: "Vie scolaire au quotidien",          altEn: "Daily school life",                 span: "" },
  { src: "/images/pexels-karola-g-7269671.jpg",      altFr: "Activités extérieures",              altEn: "Outdoor activities",                span: "" },
  { src: "/images/pexels-ani-ani.jpg",               altFr: "Groupe d'élèves épanouis",           altEn: "Group of happy students",           span: "" },
];

const hdrAnim: Variants  = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };
const gridAnim: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const photoAnim: Variants= { hidden: { opacity: 0, scale: 0.97 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } };

export default function GallerySection() {
  const t      = useTranslations("gallery");
  const locale = useLocale();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  const prev = () => setLightbox(l => l !== null ? (l - 1 + PHOTOS.length) % PHOTOS.length : null);
  const next = () => setLightbox(l => l !== null ? (l + 1) % PHOTOS.length : null);

  return (
    <>
      <section ref={sectionRef} className="py-24 lg:py-28 bg-[#F7F9FC]"
        aria-label={locale === "fr" ? "Galerie photos" : "Photo gallery"}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

          {/* En-tête avec compteur */}
          <motion.div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4"
            variants={hdrAnim} initial="hidden" animate={inView ? "show" : "hidden"}>
            <div>
              <SectionBadge>{t("badge")}</SectionBadge>
              <h2 className="font-display font-bold text-[#1A202C] mb-2 mt-1"
                style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}>
                {t("title")}
              </h2>
              <p className="text-[#4A5568] text-base max-w-lg">{t("subtitle")}</p>
            </div>
            {/* Compteur photos */}
            <div className="flex items-center gap-2 text-[#4A5568] flex-shrink-0">
              <Camera size={18} className="text-[#1A3A8F]" />
              <span className="font-bold text-[#1A202C]">{PHOTOS.length}</span>
              <span className="text-sm">{locale === "fr" ? "photos" : "photos"}</span>
            </div>
          </motion.div>

          {/* Mosaïque éditorial */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-10"
            style={{ gridAutoRows: "210px" }}
            variants={gridAnim} initial="hidden" animate={inView ? "show" : "hidden"}>
            {PHOTOS.map((photo, i) => {
              const alt = locale === "fr" ? photo.altFr : photo.altEn;
              return (
                <motion.div key={i} variants={photoAnim}
                  className={`relative overflow-hidden rounded-2xl group cursor-pointer
                    ring-2 ring-transparent hover:ring-[#1A3A8F]/40 focus-within:ring-[#1A3A8F]
                    transition-all duration-300 ${photo.span}`}>
                  <Image src={photo.src} alt={alt} fill
                    className="object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-in-out"
                    sizes={photo.span ? "(max-width: 640px) 50vw, 66vw" : "(max-width: 640px) 50vw, 33vw"} />

                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A8F]/72 via-[#1A3A8F]/18
                    to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Bouton zoom */}
                  <button onClick={() => setLightbox(i)} aria-label={`${locale === "fr" ? "Agrandir" : "Expand"}: ${alt}`}
                    className="absolute inset-0 flex items-center justify-center focus:outline-none">
                    <span className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center
                      justify-center shadow-lg opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100
                      transition-all duration-300" aria-hidden="true">
                      <ZoomIn size={22} className="text-[#1A3A8F]" />
                    </span>
                  </button>

                  {/* Légende grande photo */}
                  {photo.span && (
                    <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm font-semibold drop-shadow">{alt}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div className="text-center"
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}>
            <Link href="/vie-scolaire">
              <motion.span
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl
                  bg-[#1A3A8F] text-white font-bold text-sm tracking-wide
                  shadow-[0_4px_20px_rgba(26,58,143,0.30)] cursor-pointer"
                whileHover={{ scale: 1.03, y: -2, boxShadow: "0 8px 28px rgba(26,58,143,0.40)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 360, damping: 24 }}>
                {t("cta")}
                <ArrowRight size={18} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div role="dialog" aria-modal="true"
            aria-label={locale === "fr" ? "Visionneuse" : "Photo viewer"}
            className="fixed inset-0 bg-black/96 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }} onClick={() => setLightbox(null)}>

            <button onClick={() => setLightbox(null)} aria-label={locale === "fr" ? "Fermer" : "Close"}
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25
                backdrop-blur-sm border border-white/20 flex items-center justify-center text-white
                transition-colors z-10">
              <X size={20} />
            </button>

            <button onClick={e => { e.stopPropagation(); prev(); }}
              aria-label={locale === "fr" ? "Précédent" : "Previous"}
              className="absolute left-3 sm:left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25
                backdrop-blur-sm border border-white/20 flex items-center justify-center text-white
                transition-colors z-10">
              <ChevronLeft size={24} />
            </button>

            <motion.div key={lightbox} className="relative w-full max-w-4xl aspect-video"
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={e => e.stopPropagation()}>
              <Image src={PHOTOS[lightbox].src}
                alt={locale === "fr" ? PHOTOS[lightbox].altFr : PHOTOS[lightbox].altEn}
                fill className="object-contain rounded-xl" sizes="100vw" priority />
            </motion.div>

            <button onClick={e => { e.stopPropagation(); next(); }}
              aria-label={locale === "fr" ? "Suivant" : "Next"}
              className="absolute right-3 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25
                backdrop-blur-sm border border-white/20 flex items-center justify-center text-white
                transition-colors z-10">
              <ChevronRight size={24} />
            </button>

            <p aria-live="polite"
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm tabular-nums">
              {lightbox + 1} / {PHOTOS.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
