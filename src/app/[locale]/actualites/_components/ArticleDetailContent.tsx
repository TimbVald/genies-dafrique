"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Tag,
  User,
  MessageCircle,
  ChevronLeft,
} from "lucide-react";
import { X } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import type { NewsArticleFull } from "../[slug]/page";

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

const CATEGORY_COLORS: Record<string, string> = {
  Événements: "bg-[#EEF2FF] text-[#1A3A8F]",
  Institutionnel: "bg-[#FFF0F0] text-[#D32F2F]",
  Pédagogie: "bg-[#F0FFF4] text-[#2E7D32]",
  Admissions: "bg-[#FFF8EE] text-[#F5A623]",
  Sports: "bg-[#F0F9FF] text-[#0284C7]",
};

interface ArticleDetailContentProps {
  article: NewsArticleFull;
  locale: string;
  relatedArticles: NewsArticleFull[];
  isFr: boolean;
}

export default function ArticleDetailContent({
  article,
  locale,
  relatedArticles,
  isFr,
}: ArticleDetailContentProps) {
  const content = isFr ? article.contentFr : article.contentEn;

  const galleryLabel = isFr ? "Galerie photos" : "Photo Gallery";
  const authorLabel = isFr ? "Rédigé par" : "By";
  const shareLabel = isFr ? "Partager l'article" : "Share this article";
  const relatedLabel = isFr ? "Articles liés" : "Related Articles";
  const backLabel = isFr ? "← Retour à la liste des actualités" : "← Back to all news";
  const readMoreLabel = isFr ? "Lire la suite" : "Read More";
  const publishedLabel = isFr ? "Publié le" : "Published on";

  const handleShare = (platform: string) => {
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
        {/* Back to list */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-[#4A5568] hover:text-[#1A3A8F] font-semibold text-sm transition-colors duration-200"
          >
            <ChevronLeft size={16} />
            {backLabel}
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Main Article */}
          <article>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                    CATEGORY_COLORS[article.category] ??
                    "bg-[#EEF2FF] text-[#1A3A8F]"
                  }`}
                >
                  <Tag size={11} className="inline mr-1.5" />
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5 text-[#4A5568] text-sm">
                  <Calendar size={14} /> {publishedLabel} {article.date}
                </span>
                <span className="flex items-center gap-1.5 text-[#4A5568] text-sm">
                  <User size={14} /> {authorLabel} {article.author}
                </span>
              </div>

              <h1 className="font-display font-bold text-[#1A202C] text-3xl md:text-4xl leading-tight mb-4">
                {isFr ? article.titleFr : article.titleEn}
              </h1>
              <p className="text-[#4A5568]/70 text-base italic mb-8">
                {isFr ? article.titleEn : article.titleFr}
              </p>

              {/* Share bar */}
              <div className="flex flex-wrap items-center gap-3 py-4 border-y border-[#F1F5F9]">
                <span className="text-sm text-[#94A3B8] font-semibold mr-2">
                  {shareLabel} :
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShare("facebook")}
                  className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-all shadow-md shadow-[#1877F2]/30"
                  aria-label="Facebook"
                >
                  <FacebookIcon size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShare("whatsapp")}
                  className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-all shadow-md shadow-[#25D366]/30"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShare("x")}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-all shadow-md shadow-black/20"
                  aria-label="X"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-video rounded-2xl overflow-hidden mb-10 shadow-lg shadow-[#1A202C]/10"
            >
              <Image
                src={article.image}
                alt={article.titleFr}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 800px"
                priority
              />
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              <div className="space-y-6">
                {content.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[#2D3748] leading-[1.9] text-[16.5px]"
                    style={{
                      textIndent: i === 0 ? "2rem" : "0",
                    }}
                  >
                    {i === 0 && (
                      <span className="first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:text-[#1A3A8F] first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1">
                        {paragraph[0]}
                      </span>
                    )}
                    {i === 0 ? paragraph.slice(1) : paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Photo Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16"
            >
              <SectionBadge>
                📷 {galleryLabel} ({article.gallery.length})
              </SectionBadge>
              <h2 className="font-display font-bold text-[#1A202C] text-2xl mt-3 mb-6">
                {galleryLabel}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {article.gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-[#E2E8F0] shadow-sm"
                  >
                    <Image
                      src={img}
                      alt={`${isFr ? article.titleFr : article.titleEn} - photo ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Share */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]"
            >
              <div>
                <p className="font-semibold text-[#1A202C] mb-1">{shareLabel}</p>
                <p className="text-sm text-[#94A3B8]">
                  {isFr
                    ? "Si cet article vous a plu, n'hésitez pas à le partager."
                    : "If you enjoyed this article, please share it."}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShare("facebook")}
                  className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-all"
                  aria-label="Facebook"
                >
                  <FacebookIcon size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShare("whatsapp")}
                  className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-all"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShare("x")}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-all"
                  aria-label="X"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </motion.div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-8">
              {/* Author Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1A3A8F] to-[#D32F2F] flex items-center justify-center mx-auto mb-4 text-white font-display text-2xl font-bold shadow-lg">
                  {article.author[0]}
                </div>
                <h4 className="font-display font-bold text-[#1A202C] text-lg mb-1">
                  {article.author}
                </h4>
                <p className="text-sm text-[#94A3B8] mb-4">
                  {isFr
                    ? "Équipe de rédaction"
                    : "Editorial team"}
                </p>
                <div className="pt-4 border-t border-[#F1F5F9] space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">{publishedLabel}</span>
                    <span className="font-semibold text-[#1A202C]">{article.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">{isFr ? "Catégorie" : "Category"}</span>
                    <span className="font-semibold text-[#1A3A8F]">{article.category}</span>
                  </div>
                </div>
              </motion.div>

              {/* Related Articles */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-6"
              >
                <h3 className="font-display font-bold text-[#1A202C] text-lg mb-5 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#D32F2F] rounded-full" />
                  {relatedLabel}
                </h3>
                <div className="space-y-5">
                  {relatedArticles.map((relArticle, i) => (
                    <motion.div
                      key={relArticle.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * i }}
                      whileHover={{ x: 4 }}
                    >
                      <Link
                        href={`/actualites/${relArticle.id}`}
                        className="group flex gap-4 items-start"
                      >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-[#E2E8F0]">
                          <Image
                            src={relArticle.image}
                            alt={relArticle.titleFr}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide ${
                                CATEGORY_COLORS[relArticle.category] ??
                                "bg-[#EEF2FF] text-[#1A3A8F]"
                              }`}
                            >
                              {relArticle.category}
                            </span>
                          </div>
                          <h4 className="font-semibold text-[#1A202C] text-sm leading-snug line-clamp-2 group-hover:text-[#1A3A8F] transition-colors mb-1">
                            {isFr ? relArticle.titleFr : relArticle.titleEn}
                          </h4>
                          <span className="text-[11px] text-[#94A3B8] flex items-center gap-1">
                            <Calendar size={10} /> {relArticle.date}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/actualites"
                  className="mt-6 block text-center w-full inline-flex items-center justify-center gap-2 text-[#1A3A8F] hover:text-[#D32F2F] font-semibold text-sm border-t border-[#F1F5F9] pt-5 transition-colors"
                >
                  {isFr ? "Voir tous les articles" : "View all articles"}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-2xl p-6 text-white relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #D32F2F 0%, #F5A623 100%)",
                }}
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute right-8 bottom-0 w-20 h-20 rounded-full bg-[#1A3A8F]/20" />
                <div className="relative z-10">
                  <div className="text-3xl mb-3">🎓</div>
                  <h4 className="font-display font-bold text-xl mb-2">
                    {isFr ? "Intéressé par nos programmes ?" : "Interested in our programmes?"}
                  </h4>
                  <p className="text-white/90 text-sm mb-4 leading-relaxed">
                    {isFr
                      ? "Contactez-nous pour une visite personnalisée de l'établissement."
                      : "Contact us for a personalised visit of the school."}
                  </p>
                  <Link
                    href="/admissions"
                    className="inline-flex items-center gap-2 bg-white text-[#D32F2F] px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#1A3A8F] hover:text-white transition-all duration-300 shadow-lg"
                  >
                    {isFr ? "Nous contacter" : "Contact us"}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
