import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

const GALLERY_PHOTOS = [
  { src: "/images/IMG-20260723-WA0017.jpg", span: "lg:col-span-2 lg:row-span-2" },
  { src: "/images/IMG-20260723-WA0013.jpg", span: "" },
  { src: "/images/IMG-20260723-WA0015.jpg", span: "" },
  { src: "/images/IMG-20260723-WA0022.jpg", span: "" },
  { src: "/images/IMG-20260723-WA0034.jpg", span: "" },
];

export default function GallerySection() {
  const t = useTranslations("gallery");

  return (
    <section className="py-24 bg-[#F7F9FC]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

        <div className="text-center mb-12">
          <SectionBadge>{t("badge")}</SectionBadge>
          <h2
            className="font-display font-bold text-[#1A202C] mb-3"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.75rem)" }}
          >
            {t("title")}
          </h2>
          <p className="text-[#4A5568] text-lg">{t("subtitle")}</p>
        </div>

        {/* Grille mosaïque */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {GALLERY_PHOTOS.map((photo, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl group ${photo.span}`}
              style={{ aspectRatio: photo.span ? "1/1" : "4/3" }}
            >
              <Image
                src={photo.src}
                alt={`Photo école ${i + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-[#1A3A8F]/0 group-hover:bg-[#1A3A8F]/40
                transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl">
                  🔍
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/vie-scolaire/galerie"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#D32F2F] text-white
              font-semibold shadow-[0_4px_15px_rgba(211,47,47,0.35)]
              hover:bg-[#B71C1C] hover:-translate-y-1 transition-all duration-200"
          >
            {t("cta")}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
