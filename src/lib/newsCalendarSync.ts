/* ═══════════════════════════════════════════════════════════════
   SYNCHRONISATION AUTOMATIQUE ACTUALITÉS → CALENDRIER
══════════════════════════════════════════════════════════════════ */

import type { CalendarEvent } from "@/types/calendar";

/* ── Interface pour une actualité ───────────────────────────────── */
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  date?: string;       // Date de publication
  eventDate?: string;  // Date de l'événement (si applicable)
  eventEndDate?: string; // Date de fin de l'événement
  eventTime?: string;  // Heure de l'événement
  eventEndTime?: string; // Heure de fin
  location?: string;
  category?: string;   // Catégorie suggérée
  image?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

/* ── Catégories par défaut basées sur les mots-clés ─────────────── */
const KEYWORD_CATEGORIES: Record<string, CalendarEvent["category"]> = {
  "rentree": "rentree",
  "rentrée": "rentree",
  "back to school": "rentree",
  "examen": "examens",
  "exam": "examens",
  "test": "examens",
  "evaluation": "examens",
  "reunion": "reunions-parents",
  "réunion": "reunions-parents",
  "parent": "reunions-parents",
  "meeting": "reunions-parents",
  "vacance": "vacances",
  "vacances": "vacances",
  "holiday": "vacances",
  "conge": "vacances",
  "sortie": "sorties-pedagogiques",
  "excursion": "sorties-pedagogiques",
  "visit": "sorties-pedagogiques",
  "visite": "sorties-pedagogiques",
  "sport": "activites-sportives",
  "football": "activites-sportives",
  "competition": "activites-sportives",
  "athletisme": "activites-sportives",
  "culture": "activites-culturelles",
  "cultural": "activites-culturelles",
  "dance": "activites-culturelles",
  "musique": "activites-culturelles",
  "music": "activites-culturelles",
  "fete": "celebrations",
  "fête": "celebrations",
  "celebration": "celebrations",
  "anniversaire": "celebrations",
  "concur": "concours",
  "concours": "concours",
  "admin": "evenements-administratifs",
  "administratif": "evenements-administratifs",
  "inscription": "evenements-administratifs",
  "registration": "evenements-administratifs",
};

/* ── Détecter la catégorie à partir du titre et description ─────── */
export function detectCategoryFromContent(title: string, description: string): CalendarEvent["category"] {
  const content = `${title} ${description}`.toLowerCase();
  
  for (const [keyword, category] of Object.entries(KEYWORD_CATEGORIES)) {
    if (content.includes(keyword)) {
      return category;
    }
  }
  
  // Catégorie par défaut si aucun mot-clé n'est trouvé
  return "evenements-administratifs";
}

/* ── Extraire les dates d'une chaîne de texte ───────────────────── */
export function extractDatesFromText(text: string): { startDate?: string; endDate?: string } {
  // Formats de date supportés: DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD
  const datePatterns = [
    /(\d{2})\/(\d{2})\/(\d{4})/g,  // DD/MM/YYYY
    /(\d{2})-(\d{2})-(\d{4})/g,  // DD-MM-YYYY
    /(\d{4})-(\d{2})-(\d{2})/g,  // YYYY-MM-DD
  ];
  
  const dates: string[] = [];
  
  for (const pattern of datePatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      let dateStr: string;
      if (match[0].includes('/')) {
        // DD/MM/YYYY → YYYY-MM-DD
        dateStr = `${match[3]}-${match[2]}-${match[1]}`;
      } else if (match[0].includes('-') && match[1].length === 4) {
        // YYYY-MM-DD → déjà correct
        dateStr = match[0];
      } else {
        // DD-MM-YYYY → YYYY-MM-DD
        dateStr = `${match[3]}-${match[2]}-${match[1]}`;
      }
      
      if (!dates.includes(dateStr)) {
        dates.push(dateStr);
      }
    }
  }
  
  // Trier les dates chronologiquement
  dates.sort();
  
  return {
    startDate: dates[0],
    endDate: dates.length > 1 ? dates[dates.length - 1] : dates[0],
  };
}

/* ── Extraire les heures d'une chaîne de texte ─────────────────── */
export function extractTimesFromText(text: string): { startTime?: string; endTime?: string } {
  // Formats d'heure supportés: HH:MM, HHhMM, HH H MM
  const timePatterns = [
    /(\d{1,2})h(\d{2})/gi,  // HHhMM
    /(\d{1,2}):(\d{2})/g,   // HH:MM
    /(\d{1,2})[Hh](\d{2})/g, // HH H MM
  ];
  
  const times: string[] = [];
  
  for (const pattern of timePatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const hours = match[1].padStart(2, '0');
      const minutes = match[2];
      const timeStr = `${hours}:${minutes}`;
      
      if (!times.includes(timeStr)) {
        times.push(timeStr);
      }
    }
  }
  
  // Trier les heures chronologiquement
  times.sort();
  
  return {
    startTime: times[0],
    endTime: times.length > 1 ? times[times.length - 1] : times[0],
  };
}

/* ── Convertir une actualité en événement de calendrier ─────────── */
export function newsToCalendarEvent(news: NewsItem): Omit<CalendarEvent, "id" | "createdAt" | "updatedAt"> {
  // Utiliser les dates explicites si disponibles, sinon extraire du texte
  const dates = news.eventDate 
    ? { startDate: news.eventDate, endDate: news.eventEndDate || news.eventDate }
    : extractDatesFromText(`${news.title} ${news.description}`);
  
  const times = news.eventTime
    ? { startTime: news.eventTime, endTime: news.eventEndTime || news.eventTime }
    : extractTimesFromText(`${news.title} ${news.description}`);
  
  const category = news.category as CalendarEvent["category"] || detectCategoryFromContent(news.title, news.description);
  
  return {
    title: news.title,
    description: news.description,
    startDate: dates.startDate || news.date || new Date().toISOString().split('T')[0],
    endDate: dates.endDate || dates.startDate || news.date || new Date().toISOString().split('T')[0],
    startTime: times.startTime,
    endTime: times.endTime,
    category: category,
    location: news.location || "À déterminer",
    organizer: "Établissement",
    status: "upcoming",
    image: news.image,
    relatedNewsId: news.id,
    published: news.published,
  };
}

/* ── Synchroniser plusieurs actualités avec le calendrier ────────── */
export function syncNewsToCalendar(newsItems: NewsItem[]): Omit<CalendarEvent, "id" | "createdAt" | "updatedAt">[] {
  return newsItems
    .filter(news => news.published) // Ne synchroniser que les actualités publiées
    .filter(news => {
      // Vérifier si l'actualité contient des informations de date
      const hasDate = news.eventDate || news.date || extractDatesFromText(`${news.title} ${news.description}`).startDate;
      return !!hasDate;
    })
    .map(newsToCalendarEvent);
}

/* ── Détecter si une actualité devrait être dans le calendrier ──── */
export function shouldSyncToCalendar(news: NewsItem): boolean {
  if (!news.published) return false;
  
  // Vérifier si l'actualité a des dates explicites
  if (news.eventDate || news.date) return true;
  
  // Vérifier si le texte contient des dates
  const dates = extractDatesFromText(`${news.title} ${news.description}`);
  return !!dates.startDate;
}

/* ── Mettre à jour un événement existant à partir d'une actualité ── */
export function updateEventFromNews(existingEvent: CalendarEvent, news: NewsItem): CalendarEvent {
  const updates = newsToCalendarEvent(news);
  
  return {
    ...existingEvent,
    ...updates,
    id: existingEvent.id, // Conserver l'ID existant
    createdAt: existingEvent.createdAt,
    updatedAt: new Date().toISOString(),
  };
}
