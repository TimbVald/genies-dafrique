"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ALL_PHOTOS = [
  { src: "/images/IMG-20260722-WA0048.jpg", category: "school",  alt: "École Les Génies d'Afrique" },
  { src: "/images/IMG-20260722-WA0049.jpg", category: "school",  alt: "Locaux de l'école" },
  { src: "/images/IMG-20260723-WA0004.jpg", category: "classes", alt: "Activités en classe" },
  { src: "/images/IMG-20260723-WA0005.jpg", category: "classes", alt: "Élèves en activité" },
  { src: "/images/IMG-20260723-WA0006.jpg", category: "events",  alt: "Événement scolaire" },
  { src: "/images/IMG-20260723-WA0007.jpg", category: "classes", alt: "Cours bilingue" },
  { src: "/images/IMG-20260723-WA0008.jpg", category: "classes", alt: "Activité scolaire" },
  { src: "/images/IMG-20260723-WA0012.jpg", category: "events",  alt: "Cérémonie scolaire" },
  { src: "/images/IMG-20260723-WA0013.jpg", category: "classes", alt: "Atelier créatif" },
  { src: "/images/IMG-20260723-WA0015.jpg", category: "school",  alt: "Ambiance école" },
  { src: "/images/IMG-20260723-WA0017.jpg", category: "classes", alt: "Élèves en cours" },
  { src: "/images/IMG-20260723-WA0018.jpg", category: "events",  alt: "Portrait scolaire" },
  { src: "/images/IMG-20260723-WA0022.jpg", category: "sports",  alt: "Activité extérieure" },
  { src: "/images/IMG-20260723-WA0024.jpg", category: "classes", alt: "Salle de classe" },
  { src: "/images/IMG-20260723-WA0034.jpg", category: "events",  alt: "Groupe d'élèves" },
  { src: "/images/IMG-20260723-WA0037.jpg", category: "school",  alt: "Activité scolaire" },
  { src: "/images/IMG-20260723-WA0039.jpg", category: "events",  alt: "Événement école" },
  { src: "/images/IMG-20260723-WA0046.jpg", category: "events",  alt: "Remise de prix" },
  { src: "/images/IMG-20260723-WA0051.jpg", category: "events",  alt: "Vie scolaire" },
  { src: "/images/IMG-20260723-WA0056.jpg", category: "school",  alt: "Enceinte scolaire" },
  { src: "/images/IMG-20260723-WA0075.jpg", category: "school",  alt: "Équipe pédagogique" },
  { src: "/images/pexels-ani-ani.jpg",       category: "classes", alt: "Apprentissage bilingue" },
];

const TABS = [
  { id: "all",     labelFr: "Tout",      labelEn: "All" },
  { id: "classes", labelFr: "Classes",   labelEn: "Classrooms" },
  { id: "events",  labelFr: "Événements",labelEn: "Events" },
  { id: "sports",  labelFr: "Sports",    labelEn: "Sports" },
  { id: "school",  labelFr: "École",     labelEn: "School" },
];

export default function FullGallery() {
  const [activeTab, setActiveTab] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeTab === "all"
    ? ALL_PHOTOS
    : ALL_PHOTOS.filter((p) => p.category === activeTab);

  const openLightbox = (i: number) => { setLightbox(i); };
  const closeLightbox = () => setLightbox(null);
  const prevPhoto = () => setLightbox((l) => l !== null ? (l - 1 + filtered.length) % filtered.length : null);
  const nextPhoto = () => setLightbox((l) => l !== null ? (l + 1) % filtered.length : null);

  return (
    <>
      {/* Filtres */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-[#1A3A8F] text-white shadow-md"
                : "bg-white text-[#4A5568] border border-[#E2E8F0] hover:border-[#1A3A8F] hover:text-[#1A3A8F]"
            }`}
          >
            {tab.labelFr} / {tab.labelEn}
          </button>
        ))}
      </div>

      {/* Grille photos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => openLightbox(i)}
            className="relative aspect-square rounded-xl overflow-hidden group focus:outline-none
              focus-visible:ring-2 focus-visible:ring-[#1A3A8F]"
            aria-label={`Voir ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-[#1A3A8F]/0 group-hover:bg-[#1A3A8F]/50
              transition-colors duration-300 flex items-center justify-center">
              <span className="text-white text-2xl opacity-0 group-hover:opacity-100 scale-75
                group-hover:scale-100 transition-all duration-300">🔍</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Bouton fermer */}
          <button
            onClick={closeLightbox}
            aria-label="Fermer"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
              flex items-center justify-center text-white transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            aria-label="Photo précédente"
            className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20
              flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            aria-label="Photo suivante"
            className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20
              flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image principale */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              fill
              className="object-contain rounded-xl"
              sizes="100vw"
            />
          </div>

          {/* Compteur */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightbox + 1} / {filtered.length}
          </p>
        </div>
      )}
    </>
  );
}
