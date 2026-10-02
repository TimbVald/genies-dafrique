/* ── Chatbot Data Preparation & Integration Service ───────────────── */
import { buildComprehensiveKnowledgeBase, getKnowledgeContextForPrompt, INTENT_ACTION_LINKS } from "@/lib/chatbot/knowledge-base";
import { generateLocalFallbackResponse, detectUserIntent, searchBestKnowledgeItems } from "@/lib/chatbot/nlp-engine";
import { getFAQ } from "./faq";
import type { ChatbotKnowledgeItem, Locale, ChatActionLink, ChatIntent } from "@/lib/chatbot/types";

export type { ChatbotKnowledgeItem, Locale, ChatActionLink, ChatIntent };

/* ── Prepare Knowledge Base for Chatbot ─────────────────────────── */
export function prepareChatbotKnowledge(locale: string = "fr"): ChatbotKnowledgeItem[] {
  return buildComprehensiveKnowledgeBase((["fr", "en", "ew"].includes(locale) ? locale : "fr") as Locale);
}

/* ── Get Knowledge Context for AI System Prompt ─────────────────── */
export function getChatbotSystemContext(locale: string = "fr"): string {
  return getKnowledgeContextForPrompt((["fr", "en", "ew"].includes(locale) ? locale : "fr") as Locale);
}

/* ── Get FAQ for Chatbot (Quick Answers) ────────────────────────── */
export function getChatbotFAQ(locale: string = "fr"): Array<{ question: string; answer: string }> {
  const faqs = getFAQ();
  const loc = (["fr", "en", "ew"].includes(locale) ? locale : "fr") as Locale;
  return faqs.map((faq) => ({
    question: faq.question[loc] || faq.question.fr,
    answer: faq.answer[loc] || faq.answer.fr,
  }));
}

/* ── Search Knowledge Base ──────────────────────────────────────── */
export function searchKnowledgeBase(query: string, locale: string = "fr"): ChatbotKnowledgeItem[] {
  const loc = (["fr", "en", "ew"].includes(locale) ? locale : "fr") as Locale;
  return searchBestKnowledgeItems(query, loc, 10);
}

/* ── Re-export NLP Utilities ────────────────────────────────────── */
export { generateLocalFallbackResponse, detectUserIntent, INTENT_ACTION_LINKS };
