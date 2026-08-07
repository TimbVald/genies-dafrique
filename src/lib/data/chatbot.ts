/* ── Chatbot Data Preparation Service ─────────────────────────────── */
/* This service prepares all data sources for chatbot consumption */
import { getNews } from "./news";
import { getEvents } from "./events";
import { getPrograms } from "./programs";
import { getFAQ } from "./faq";
import { getDocuments } from "./documents";
import { getSiteInfo } from "./global";
import { getAdmissionSteps, getAdmissionDocuments, getAdmissionFees } from "./admissions";

/* ── Chatbot Knowledge Item Type ───────────────────────────────── */
export type ChatbotKnowledgeItem = {
  id: string;
  type: string;
  title: string;
  content: string;
  metadata: Record<string, any>;
};

/* ── Prepare Knowledge Base for Chatbot ─────────────────────────── */
export function prepareChatbotKnowledge(locale: string = "fr"): ChatbotKnowledgeItem[] {
  const knowledge: ChatbotKnowledgeItem[] = [];

  // Site Information
  const siteInfo = getSiteInfo();
  knowledge.push({
    id: "site-info",
    type: "general",
    title: siteInfo.name[locale as keyof typeof siteInfo.name],
    content: `${siteInfo.description[locale as keyof typeof siteInfo.description]} ${siteInfo.address[locale as keyof typeof siteInfo.address]} ${siteInfo.openingHours[locale as keyof typeof siteInfo.openingHours]}`,
    metadata: {
      phone: siteInfo.phone,
      email: siteInfo.email,
      whatsapp: siteInfo.whatsapp,
    },
  });

  // Admission Information
  const admissionSteps = getAdmissionSteps();
  admissionSteps.forEach((step) => {
    knowledge.push({
      id: `admission-step-${step.id}`,
      type: "admission",
      title: step.title[locale as keyof typeof step.title],
      content: step.description[locale as keyof typeof step.description],
      metadata: { step: step.step, order: step.order },
    });
  });

  const admissionDocs = getAdmissionDocuments();
  admissionDocs.forEach((doc) => {
    knowledge.push({
      id: `admission-doc-${doc.id}`,
      type: "admission",
      title: doc.name[locale as keyof typeof doc.name],
      content: doc.required ? "Required document" : "Optional document",
      metadata: { required: doc.required, order: doc.order },
    });
  });

  const admissionFees = getAdmissionFees();
  admissionFees.forEach((fee) => {
    knowledge.push({
      id: `admission-fee-${fee.id}`,
      type: "admission",
      title: fee.level[locale as keyof typeof fee.level],
      content: `${fee.ageRange[locale as keyof typeof fee.ageRange]} - ${fee.tuition[locale as keyof typeof fee.tuition]}`,
      metadata: { order: fee.order },
    });
  });

  // Programs
  const programs = getPrograms();
  programs.forEach((program) => {
    knowledge.push({
      id: `program-${program.id}`,
      type: "program",
      title: program.name[locale as keyof typeof program.name],
      content: program.description[locale as keyof typeof program.description],
      metadata: { level: program.level, section: program.section },
    });
  });

  // FAQ (Primary source for chatbot)
  const faqs = getFAQ();
  faqs.forEach((faq) => {
    knowledge.push({
      id: `faq-${faq.id}`,
      type: "faq",
      title: faq.question[locale as keyof typeof faq.question],
      content: faq.answer[locale as keyof typeof faq.answer],
      metadata: { category: faq.category, order: faq.order },
    });
  });

  // Recent News
  const news = getNews().slice(0, 10); // Limit to recent 10
  news.forEach((item) => {
    knowledge.push({
      id: `news-${item.id}`,
      type: "news",
      title: item.title[locale as keyof typeof item.title],
      content: item.excerpt[locale as keyof typeof item.excerpt],
      metadata: { category: item.categoryKey, date: item.publishedAt },
    });
  });

  // Upcoming Events
  const events = getEvents().slice(0, 10); // Limit to upcoming 10
  events.forEach((event) => {
    knowledge.push({
      id: `event-${event.id}`,
      type: "event",
      title: event.title[locale as keyof typeof event.title],
      content: event.description[locale as keyof typeof event.description],
      metadata: { category: event.categoryKey, date: event.startDate },
    });
  });

  // Documents
  const documents = getDocuments();
  documents.forEach((doc) => {
    knowledge.push({
      id: `document-${doc.id}`,
      type: "document",
      title: doc.title[locale as keyof typeof doc.title],
      content: doc.description ? doc.description[locale as keyof typeof doc.description] : "",
      metadata: { category: doc.category, fileType: doc.fileType },
    });
  });

  return knowledge;
}

/* ── Get FAQ for Chatbot (Quick Answers) ────────────────────────── */
export function getChatbotFAQ(locale: string = "fr"): Array<{ question: string; answer: string }> {
  const faqs = getFAQ();
  return faqs.map((faq) => ({
    question: faq.question[locale as keyof typeof faq.question],
    answer: faq.answer[locale as keyof typeof faq.answer],
  }));
}

/* ── Search Knowledge Base ──────────────────────────────────────── */
export function searchKnowledgeBase(query: string, locale: string = "fr"): ChatbotKnowledgeItem[] {
  const knowledge = prepareChatbotKnowledge(locale);
  const searchTerm = query.toLowerCase();

  return knowledge.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm) ||
      item.content.toLowerCase().includes(searchTerm)
    );
  });
}
