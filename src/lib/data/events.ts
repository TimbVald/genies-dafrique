/* ── Events Data Service Functions ───────────────────────────────────── */
import { NEWS_DATA } from "@/data/newsData";

/* ── Event Type ─────────────────────────────────────────────────────── */
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  category: string;
  newsId?: string;
}

/* ── Get All Events ─────────────────────────────────────────────────── */
export function getEvents(): CalendarEvent[] {
  const events = NEWS_DATA
    .filter((news) => news.eventDate && news.eventType)
    .map((news) => {
      const eventDate = new Date(news.eventDate!);
      const startDate = new Date(eventDate);
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(eventDate);
      endDate.setHours(23, 59, 59, 999);
      
      return {
        id: news.id,
        title: news.titleFr, // Default to French, will be localized in component
        start: startDate,
        end: endDate,
        color: getCategoryColor(news.eventType!),
        category: news.eventType!,
        newsId: news.id,
      } as CalendarEvent;
    });
  
  return events;
}

/* ── Get Upcoming Events ───────────────────────────────────────────── */
export function getUpcomingEvents(limit: number = 3): CalendarEvent[] {
  const now = new Date();
  const events = getEvents()
    .filter((event) => event.start >= now)
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, limit);
  
  return events;
}

/* ── Get Event by Slug ──────────────────────────────────────────────── */
export function getEventBySlug(slug: string): CalendarEvent | undefined {
  return getEvents().find((event) => event.id === slug);
}

/* ── Helper: Get Category Color ─────────────────────────────────────── */
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    rentree: "#1A3A8F",
    reunions_parents: "#059669",
    examens: "#D97706",
    vacances: "#7C3AED",
    sorties_pedagogiques: "#0891B2",
    activites_sportives: "#DC2626",
    activites_culturelles: "#DB2777",
    club: "#2563EB",
    ceremonie: "#EA580C",
    journee_speciale: "#65A30D",
    actualite: "#4B5563",
    celebrations: "#EA580C",
    concours: "#65A30D",
    evenements_administratifs: "#6B7280",
  };
  
  return colors[category] || "#1A3A8F";
}
