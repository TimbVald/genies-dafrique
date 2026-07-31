import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageTitles.gallery" });
  return { title: t("title"), description: t("description") };
}

type PhotoCategory = "activites" | "infrastructures" | "ceremonies" | "salles" | "excursions";

interface PhotoItem {
  src: string;
  alt: string;
  category: PhotoCategory;
  heightClass: string;
}

interface VideoItem {
  thumbnail: string;
  src: string;
  title: string;
}

const PHOTOS: PhotoItem[] = [
  { src: "/images/IMG-20260722-WA0048.jpg", alt: "Activité scolaire", category: "activites", heightClass: "h-64" },
  { src: "/images/IMG-20260722-WA0049.jpg", alt: "Infrastructure école", category: "infrastructures", heightClass: "h-80" },
  { src: "/images/IMG-20260723-WA0004.jpg", alt: "Salle de classe", category: "salles", heightClass: "h-56" },
  { src: "/images/IMG-20260723-WA0005.jpg", alt: "Élèves en activité", category: "activites", heightClass: "h-72" },
  { src: "/images/IMG-20260723-WA0006.jpg", alt: "Cérémonie scolaire", category: "ceremonies", heightClass: "h-64" },
  { src: "/images/IMG-20260723-WA0007.jpg", alt: "Cours en classe", category: "salles", heightClass: "h-80" },
  { src: "/images/IMG-20260723-WA0008.jpg", alt: "Activité pédagogique", category: "activites", heightClass: "h-56" },
  { src: "/images/IMG-20260723-WA0012.jpg", alt: "Cérémonie officielle", category: "ceremonies", heightClass: "h-72" },
  { src: "/images/IMG-20260723-WA0013.jpg", alt: "Atelier créatif", category: "activites", heightClass: "h-64" },
  { src: "/images/IMG-20260723-WA0015.jpg", alt: "Bâtiment scolaire", category: "infrastructures", heightClass: "h-80" },
  { src: "/images/IMG-20260723-WA0017.jpg", alt: "Leçon en classe", category: "salles", heightClass: "h-56" },
  { src: "/images/IMG-20260723-WA0018.jpg", alt: "Portraits cérémonie", category: "ceremonies", heightClass: "h-72" },
  { src: "/images/IMG-20260723-WA0022.jpg", alt: "Excursion sportive", category: "excursions", heightClass: "h-64" },
  { src: "/images/IMG-20260723-WA0024.jpg", alt: "Salle de classe lumineuse", category: "salles", heightClass: "h-80" },
  { src: "/images/IMG-20260723-WA0034.jpg", alt: "Groupe cérémonie", category: "ceremonies", heightClass: "h-56" },
  { src: "/images/IMG-20260723-WA0037.jpg", alt: "Cour de l'école", category: "infrastructures", heightClass: "h-72" },
  { src: "/images/IMG-20260723-WA0039.jpg", alt: "Remise de prix", category: "ceremonies", heightClass: "h-64" },
  { src: "/images/IMG-20260723-WA0046.jpg", alt: "Cérémonie de fin d'année", category: "ceremonies", heightClass: "h-80" },
  { src: "/images/IMG-20260723-WA0051.jpg", alt: "Activité collective", category: "activites", heightClass: "h-56" },
  { src: "/images/IMG-20260723-WA0056.jpg", alt: "Vue des infrastructures", category: "infrastructures", heightClass: "h-72" },
  { src: "/images/IMG-20260723-WA0075.jpg", alt: "Équipe pédagogique", category: "activites", heightClass: "h-64" },
  { src: "/images/pexels-ani-ani.jpg", alt: "Apprentissage en classe", category: "salles", heightClass: "h-80" },
  { src: "/images/pexels-karola-g-7269671.jpg", alt: "Sortie éducative", category: "excursions", heightClass: "h-56" },
  { src: "/images/pexels-ai25studioai-7342628.jpg", alt: "Excursion scolaire", category: "excursions", heightClass: "h-72" },
];

const VIDEOS: VideoItem[] = [
  {
    thumbnail: "/images/IMG-20260723-WA0034.jpg",
    src: "/videos/video1.mp4",
    title: "Cérémonie de fin d'année",
  },
  {
    thumbnail: "/images/IMG-20260723-WA0022.jpg",
    src: "/videos/video2.mp4",
    title: "Journée sportive inter-classes",
  },
  {
    thumbnail: "/images/IMG-20260723-WA0013.jpg",
    src: "/videos/video3.mp4",
    title: "Atelier créatif des élèves",
  },
];

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return <GalleryContent />;
}

function GalleryContent() {
  const t = useTranslations();
  const navT = useTranslations("nav");
  const tGallery = useTranslations("galleryPage");

  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filterKeys: Array<"all" | PhotoCategory> = ["all", "activites", "infrastructures", "ceremonies", "salles", "excursions"];

  const filteredPhotos = activeFilter === "all"
    ? PHOTOS
    : PHOTOS.filter((p) => p.category === activeFilter);

  const lightboxItems = activeTab === "photos" ? filteredPhotos : VIDEOS;
  const currentItem = lightboxIndex !== null ? lightboxItems[lightboxIndex] : null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevItem = () =>
    setLightboxIndex((l) =>
      l !== null ? (l - 1 + lightboxItems.length) % lightboxItems.length : null
    );
  const nextItem = () =>
    setLightboxIndex((l) =>
      l !== null ? (l + 1) % lightboxItems.length : null
    );

  return (
    <>
      <PageHero
        image="/images/IMG-20260723-WA0034.jpg"
        breadcrumbs={[
          { label: navT("home"), href: "/" },
          { label: navT("gallery") },
        ]}
        title={tGallery("hero.title")}
        subtitle={tGallery("hero.subtitle")}
      />

      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <SectionBadge>{navT("gallery")}</SectionBadge>
          </div>

          <div className="flex justify-center gap-3 mb-10">
            <button
              onClick={() => { setActiveTab("photos"); setActiveFilter("all"); }}
              className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeTab === "photos"
                  ? "bg-[#1A3A8F] text-white shadow-md"
                  : "bg-white border border-[#E2E8F0] text-[#4A5568] hover:border-[#1A3A8F] hover:text-[#1A3A8F]"
              }`}
            >
              {tGallery("tabs.photos")}
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeTab === "videos"
                  ? "bg-[#1A3A8F] text-white shadow-md"
                  : "bg-white border border-[#E2E8F0] text-[#4A5568] hover:border-[#1A3A8F] hover:text-[#1A3A8F]"
              }`}
            >
              {tGallery("tabs.videos")}
            </button>
          </div>

          {activeTab === "photos" && (
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {filterKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeFilter === key
                      ? "bg-[#1A3A8F] text-white shadow-md"
                      : "bg-white text-[#4A5568] border border-[#E2E8F0] hover:border-[#1A3A8F] hover:text-[#1A3A8F]"
                  }`}
                >
                  {tGallery(`filters.${key}`)}
                </button>
              ))}
            </div>
          )}

          {activeTab === "photos" ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
              {filteredPhotos.map((photo, i) => (
                <div
                  key={`${photo.src}-${i}`}
                  className="break-inside-avoid mb-4"
                >
                  <button
                    onClick={() => openLightbox(i)}
                    className={`relative w-full ${photo.heightClass} rounded-2xl overflow-hidden group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A3A8F] block`}
                    aria-label={`Voir ${photo.alt}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-[#1A3A8F]/0 group-hover:bg-[#1A3A8F]/50 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white text-3xl opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                        🔍
                      </span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {VIDEOS.map((video, i) => (
                <button
                  key={`${video.src}-${i}`}
                  onClick={() => openLightbox(i)}
                  className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A3A8F] block"
                  aria-label={`Lire ${video.title}`}
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <Play size={36} className="text-white fill-white ml-1" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && currentItem && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label="Fermer"
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <X size={24} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevItem(); }}
            aria-label="Élément précédent"
            className="absolute left-4 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextItem(); }}
            aria-label="Élément suivant"
            className="absolute right-4 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronRight size={28} />
          </button>

          <div
            className="relative max-w-6xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {activeTab === "photos" && "src" in currentItem && (
              <div className="relative w-full max-h-[85vh] aspect-auto">
                <Image
                  src={(currentItem as PhotoItem).src}
                  alt={(currentItem as PhotoItem).alt}
                  width={1200}
                  height={800}
                  className="object-contain mx-auto max-h-[85vh] w-auto h-auto rounded-2xl"
                  style={{ maxHeight: "85vh" }}
                  sizes="100vw"
                />
              </div>
            )}
            {activeTab === "videos" && "src" in currentItem && (
              <video
                src={(currentItem as VideoItem).src}
                controls
                autoPlay
                className="max-w-full max-h-[85vh] rounded-2xl mx-auto shadow-2xl"
              />
            )}
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
            {lightboxIndex + 1} / {lightboxItems.length}
          </p>
        </div>
      )}
    </>
  );
}
