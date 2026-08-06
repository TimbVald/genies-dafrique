"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Tag,
  Search,
  User,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { X } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import { NEWS_DATA, CATEGORY_COLORS, CATEGORY_KEYS, CATEGORY_LABELS_FR, CATEGORY_LABELS_EN } from "@/data/newsData";
import type { NewsItem } from "@/data/newsData";

const FacebookIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

interface ActualitesContentProps {
  locale: string;
}

export default function ActualitesContent({ locale }: ActualitesContentProps) {
  const isFr = locale === "fr";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const catLabels = isFr ? CATEGORY_LABELS_FR : CATEGORY_LABELS_EN;

  const searchPlaceholder = isFr
    ? "Rechercher un article, un événement…"
    : "Search an article, an event…";

  const recentTitle = isFr ? "Articles récents" : "Recent Articles";
  const featuredLabel = isFr ? "À la une" : "Featured";
  const pageLabel = isFr ? "Page" : "Page";
  const prevLabel = isFr ? "Précédent" : "Previous";
  const nextLabel = isFr ? "Suivant" : "Next";
  const galleryLabel = isFr ? "Galerie" : "Gallery";
  const authorLabel = isFr ? "Rédigé par" : "By";
  const shareLabel = isFr ? "Partager" : "Share";
  const readMoreLabel = isFr ? "Lire la suite" : "Read More";

  const filteredNews = useMemo(() => {
    return NEWS_DATA.filter((article) => {
      const matchesCategory =
        selectedCategory === "all" || article.categoryKey === selectedCategory;
      const search = searchQuery.toLowerCase();
      const matchesSearch =
        search === "" ||
        article.titleFr.toLowerCase().includes(search) ||
        article.titleEn.toLowerCase().includes(search) ||
        article.excerpt.toLowerCase().includes(search) ||
        article.category.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featured = NEWS_DATA[0];
  const restAll = filteredNews.filter((a) => a.id !== featured.id);
  const rest = restAll.length > 0 ? restAll : filteredNews;

  const totalPages = Math.max(1, Math.ceil(rest.length / itemsPerPage));
  const paginatedNews = rest.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const recentArticles = NEWS_DATA.slice(0, 3);

  const handleShare = (platform: string, article: NewsItem) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = isFr ? article.titleFr : article.titleEn;
    let shareUrl = "";
    if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === "whatsapp") {
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
    } else if (platform === "x") {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    }
    if (shareUrl && typeof window !== "undefined") {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Search + Filters */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={searchPlaceholder}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#E2E8F0]
                  focus:outline-none focus:ring-2 focus:ring-[#1A3A8F]/30 focus:border-[#1A3A8F]
                  bg-white text-[#1A202C] placeholder-[#94A3B8] text-sm transition-all"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORY_KEYS.map((catKey) => {
              const isActive = selectedCategory === catKey;
              return (
                <motion.button
                  key={catKey}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedCategory(catKey);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#1A3A8F] text-white shadow-md shadow-[#1A3A8F]/20"
                        : "bg-white text-[#4A5568] border border-[#E2E8F0] hover:border-[#1A3A8F]/30 hover:text-[#1A3A8F]"
                    }`}
                >
                  {catLabels[catKey]}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Main Layout: Articles + Sidebar */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Left: Articles */}
          <div className="space-y-12">
            {/* Featured Article */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionBadge>{featuredLabel}</SectionBadge>
              <Link
                href={`/actualites/${featured.id}`}
                className="group mt-4 grid lg:grid-cols-2 gap-8 items-center rounded-2xl overflow-hidden
                  border border-[#E2E8F0] hover:shadow-[0_8px_40px_rgba(26,58,143,0.12)]
                  hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-video lg:aspect-auto lg:h-full min-h-[260px] overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.titleFr}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {featured.galleryCount > 0 && (
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      📷 {galleryLabel} {featured.galleryCount} photos
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        CATEGORY_COLORS[featured.category] ??
                        "bg-[#EEF2FF] text-[#1A3A8F]"
                      }`}
                    >
                      {featured.category}
                    </span>
                    <span className="flex items-center gap-1 text-[#4A5568] text-xs">
                      <Calendar size={13} /> {featured.date}
                    </span>
                    <span className="flex items-center gap-1 text-[#4A5568] text-xs">
                      <User size={13} /> {featured.author}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-[#1A202C] text-2xl mb-2">
                    {isFr ? featured.titleFr : featured.titleEn}
                  </h2>
                  <p className="text-[#4A5568]/70 text-sm italic mb-4">
                    {isFr ? featured.titleEn : featured.titleFr}
                  </p>
                  <p className="text-[#4A5568] leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>

                  {/* Share buttons */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs text-[#94A3B8] font-medium mr-1">
                      {shareLabel} :
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleShare("facebook", featured);
                      }}
                      className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                      aria-label="Facebook"
                    >
                      <FacebookIcon size={14} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleShare("whatsapp", featured);
                      }}
                      className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle size={14} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleShare("x", featured);
                      }}
                      className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                      aria-label="X"
                    >
                      <X size={13} />
                    </motion.button>
                  </div>

                  <span
                    className="inline-flex items-center gap-2 text-[#1A3A8F] font-semibold text-sm
                  group-hover:gap-3 transition-all duration-200"
                  >
                    {readMoreLabel} <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Articles Grid */}
            <div className="grid sm:grid-cols-2 gap-8">
              {paginatedNews.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link
                    href={`/actualites/${article.id}`}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E2E8F0]
                      hover:shadow-[0_8px_32px_rgba(26,58,143,0.10)] hover:-translate-y-1 transition-all duration-300 h-full"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.titleFr}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {article.galleryCount > 0 && (
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                          📷 +{article.galleryCount} photos
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                            CATEGORY_COLORS[article.category] ??
                            "bg-[#EEF2FF] text-[#1A3A8F]"
                          }`}
                        >
                          <Tag size={9} className="inline mr-1" />
                          {article.category}
                        </span>
                        <span className="text-[#4A5568] text-[11px] flex items-center gap-1">
                          <Calendar size={10} /> {article.date}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-[#1A202C] text-lg mb-2 line-clamp-2">
                        {isFr ? article.titleFr : article.titleEn}
                      </h3>
                      <div className="flex items-center gap-1 text-[#94A3B8] text-[11px] mb-3">
                        <User size={10} />
                        <span>{authorLabel} : {article.author}</span>
                      </div>
                      <p className="text-[#4A5568] text-sm leading-relaxed line-clamp-3 flex-1">
                        {article.excerpt}
                      </p>

                      {/* Share buttons */}
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#F1F5F9]">
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleShare("facebook", article);
                          }}
                          className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all"
                          aria-label="Facebook"
                        >
                          <FacebookIcon size={13} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleShare("whatsapp", article);
                          }}
                          className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all"
                          aria-label="WhatsApp"
                        >
                          <MessageCircle size={13} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleShare("x", article);
                          }}
                          className="w-8 h-8 rounded-full bg-[#F1F5F9] text-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
                          aria-label="X"
                        >
                          <X size={12} />
                        </motion.button>
                        <span className="ml-auto inline-flex items-center gap-1.5 text-[#1A3A8F] font-semibold text-xs
                          group-hover:gap-2.5 transition-all duration-200">
                          {readMoreLabel} <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Empty state */}
            {paginatedNews.length === 0 && filteredNews.length === 0 && (
              <div className="text-center py-16 rounded-2xl border-2 border-dashed border-[#E2E8F0]">
                <p className="text-[#4A5568] text-lg mb-2">
                  {isFr ? "Aucun article trouvé" : "No articles found"}
                </p>
                <p className="text-[#94A3B8] text-sm">
                  {isFr
                    ? "Essayez de modifier vos critères de recherche ou de filtrage."
                    : "Try adjusting your search or filter criteria."}
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#E2E8F0]
                    text-sm font-semibold text-[#4A5568] bg-white
                    hover:border-[#1A3A8F]/30 hover:text-[#1A3A8F] transition-all
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#E2E8F0] disabled:hover:text-[#4A5568]"
                >
                  <ChevronLeft size={16} />
                  {prevLabel}
                </motion.button>

                <div className="px-5 py-2.5 rounded-full bg-[#1A3A8F] text-white text-sm font-bold">
                  {pageLabel} {currentPage} / {totalPages}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#E2E8F0]
                    text-sm font-semibold text-[#4A5568] bg-white
                    hover:border-[#1A3A8F]/30 hover:text-[#1A3A8F] transition-all
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#E2E8F0] disabled:hover:text-[#4A5568]"
                >
                  {nextLabel}
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            )}
          </div>

          {/* Right: Sidebar (desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-8">
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="font-display font-bold text-[#1A202C] text-lg mb-5 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#1A3A8F] rounded-full" />
                  {recentTitle}
                </h3>
                <div className="space-y-5">
                  {recentArticles.map((article, i) => (
                    <motion.div
                      key={article.id}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={`/actualites/${article.id}`}
                        className="group flex gap-4 items-start"
                      >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-[#E2E8F0]">
                          <Image
                            src={article.image}
                            alt={article.titleFr}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide ${
                                CATEGORY_COLORS[article.category] ??
                                "bg-[#EEF2FF] text-[#1A3A8F]"
                              }`}
                            >
                              {article.category}
                            </span>
                          </div>
                          <h4 className="font-semibold text-[#1A202C] text-sm leading-snug line-clamp-2 group-hover:text-[#1A3A8F] transition-colors mb-1">
                            {isFr ? article.titleFr : article.titleEn}
                          </h4>
                          <span className="text-[11px] text-[#94A3B8] flex items-center gap-1">
                            <Calendar size={10} /> {article.date}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Newsletter / CTA card */}
              <div
                className="rounded-2xl p-6 text-white relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #1A3A8F 0%, #2a5bd7 100%)",
                }}
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -right-4 bottom-0 w-24 h-24 rounded-full bg-[#F5A623]/20" />
                <div className="relative z-10">
                  <div className="text-3xl mb-3">📢</div>
                  <h4 className="font-display font-bold text-xl mb-2">
                    {isFr ? "Restez informés" : "Stay informed"}
                  </h4>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">
                    {isFr
                      ? "Suivez toutes nos actualités et événements."
                      : "Follow all our news and events."}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-[#1A3A8F] px-5 py-2.5 rounded-full font-bold text-sm
                      hover:bg-[#F5A623] hover:text-white transition-all duration-300"
                  >
                    {isFr ? "Nous contacter" : "Contact us"}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
