/* ── Global Search Service ───────────────────────────────────────── */
import { getNews } from "./news";
import { getEvents } from "./events";
import { getPrograms } from "./programs";
import { getDocuments } from "./documents";
import { getFAQ } from "./faq";

/* ── Search Result Type ─────────────────────────────────────────── */
export type SearchResult = {
  id: string;
  type: "news" | "event" | "program" | "document" | "faq";
  title: string;
  description: string;
  url: string;
  category?: string;
  date?: string;
};

/* ── Global Search Function ─────────────────────────────────────── */
export function globalSearch(query: string, locale: string = "fr"): SearchResult[] {
  if (!query || query.trim().length < 2) return [];

  const searchTerm = query.toLowerCase();
  const results: SearchResult[] = [];

  // Search in News
  const news = getNews();
  news.forEach((item) => {
    const title = item.title[locale as keyof typeof item.title] || item.title.fr;
    const excerpt = item.excerpt[locale as keyof typeof item.excerpt] || item.excerpt.fr;
    
    if (
      title.toLowerCase().includes(searchTerm) ||
      excerpt.toLowerCase().includes(searchTerm) ||
      item.category[locale as keyof typeof item.category]?.toLowerCase().includes(searchTerm)
    ) {
      results.push({
        id: item.id,
        type: "news",
        title,
        description: excerpt,
        url: `/actualites/${item.slug}`,
        category: item.category[locale as keyof typeof item.category],
        date: item.publishedAt,
      });
    }
  });

  // Search in Events
  const events = getEvents();
  events.forEach((item) => {
    const title = item.title[locale as keyof typeof item.title] || item.title.fr;
    const description = item.description[locale as keyof typeof item.description] || item.description.fr;
    
    if (
      title.toLowerCase().includes(searchTerm) ||
      description.toLowerCase().includes(searchTerm) ||
      item.category[locale as keyof typeof item.category]?.toLowerCase().includes(searchTerm)
    ) {
      results.push({
        id: item.id,
        type: "event",
        title,
        description: description.substring(0, 150) + "...",
        url: item.newsId ? `/actualites/${item.newsId}` : "/actualites",
        category: item.category[locale as keyof typeof item.category],
        date: item.startDate,
      });
    }
  });

  // Search in Programs
  const programs = getPrograms();
  programs.forEach((item) => {
    const title = item.name[locale as keyof typeof item.name] || item.name.fr;
    const description = item.description[locale as keyof typeof item.description] || item.description.fr;
    
    if (
      title.toLowerCase().includes(searchTerm) ||
      description.toLowerCase().includes(searchTerm) ||
      item.level.toLowerCase().includes(searchTerm)
    ) {
      results.push({
        id: item.id,
        type: "program",
        title,
        description: description.substring(0, 150) + "...",
        url: `/programmes#${item.slug}`,
        category: item.level,
      });
    }
  });

  // Search in Documents
  const documents = getDocuments();
  documents.forEach((item) => {
    const title = item.title[locale as keyof typeof item.title] || item.title.fr;
    const description = item.description ? (item.description[locale as keyof typeof item.description] || item.description.fr) : "";
    
    if (
      title.toLowerCase().includes(searchTerm) ||
      description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    ) {
      results.push({
        id: item.id,
        type: "document",
        title,
        description: description.substring(0, 150) + "...",
        url: `/documents/${item.slug}`,
        category: item.category,
        date: item.publishedAt,
      });
    }
  });

  // Search in FAQ
  const faqs = getFAQ();
  faqs.forEach((item) => {
    const question = item.question[locale as keyof typeof item.question] || item.question.fr;
    const answer = item.answer[locale as keyof typeof item.answer] || item.answer.fr;
    
    if (
      question.toLowerCase().includes(searchTerm) ||
      answer.toLowerCase().includes(searchTerm)
    ) {
      results.push({
        id: item.id,
        type: "faq",
        title: question,
        description: answer.substring(0, 150) + "...",
        url: `/#faq`,
        category: item.category,
      });
    }
  });

  // Sort by relevance (exact match first, then starts with, then contains)
  return results.sort((a, b) => {
    const aExact = a.title.toLowerCase() === searchTerm;
    const bExact = b.title.toLowerCase() === searchTerm;
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    
    const aStarts = a.title.toLowerCase().startsWith(searchTerm);
    const bStarts = b.title.toLowerCase().startsWith(searchTerm);
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    
    return 0;
  });
}

/* ── Search by Type Function ─────────────────────────────────────── */
export function searchByType(query: string, type: SearchResult["type"], locale: string = "fr"): SearchResult[] {
  const allResults = globalSearch(query, locale);
  return allResults.filter((r) => r.type === type);
}
