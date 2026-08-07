/* ── Central Data Services Export ───────────────────────────────── */
/* Import all data services from a single location */

// Global
export { getSiteInfo } from "./global";

// Navigation
export { getNavigation, getFooterSections } from "./navigation";

// Admissions
export { getAdmissionSteps, getAdmissionDocuments, getAdmissionFees } from "./admissions";

// Programs
export { getPrograms, getProgramBySlug } from "./programs";

// News
export { 
  getNews, 
  getNewsBySlug, 
  getFeaturedNews, 
  getNewsByCategory, 
  getLatestNews,
  CATEGORY_COLORS,
  CATEGORY_KEYS,
  CATEGORY_LABELS_FR,
  CATEGORY_LABELS_EN
} from "./news";

// Events
export { 
  getEvents, 
  getEventBySlug, 
  getEventsByCategory, 
  getUpcomingEvents,
  getFeaturedEvents,
  EVENT_CATEGORIES
} from "./events";

// Gallery
export { getFeaturedGallery, getGalleryByCategory, getVisibleGallery } from "./gallery";

// Documents
export { getDocuments, getDocumentsByCategory, getDocumentBySlug } from "./documents";

// FAQ
export { getFAQ, getFAQByCategory } from "./faq";

// Testimonials
export { getTestimonials, getFeaturedTestimonials } from "./testimonials";

// School Life
export { getSchoolLifeActivities, getSchoolLifeByCategory, getFeaturedSchoolLife } from "./school-life";

// Search
export { globalSearch, searchByType } from "./search";
export type { SearchResult } from "./search";

// Chatbot
export { prepareChatbotKnowledge, getChatbotFAQ, searchKnowledgeBase } from "./chatbot";
export type { ChatbotKnowledgeItem } from "./chatbot";
