/* ═══════════════════════════════════════════════════════════════
   TYPES POUR LE CALENDRIER SCOLAIRE
══════════════════════════════════════════════════════════════════ */

/* ── Catégories d'événements ───────────────────────────────────── */
export type EventCategory =
  | "rentree"
  | "examens"
  | "reunions-parents"
  | "vacances"
  | "sorties-pedagogiques"
  | "activites-sportives"
  | "activites-culturelles"
  | "celebrations"
  | "concours"
  | "evenements-administratifs";

/* ── Statut d'événement ─────────────────────────────────────────── */
export type EventStatus = "upcoming" | "ongoing" | "completed";

/* ── Événement complet ─────────────────────────────────────────── */
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO 8601 (YYYY-MM-DD)
  endDate: string;   // ISO 8601 (YYYY-MM-DD)
  startTime?: string; // HH:mm format
  endTime?: string;   // HH:mm format
  category: EventCategory;
  color?: string;     // Couleur personnalisée (optionnelle)
  image?: string;     // URL de l'image (optionnelle)
  location: string;
  organizer: string;
  status: EventStatus;
  relatedNewsId?: string; // ID de l'actualité associée (optionnel)
  createdAt: string;
  updatedAt: string;
  published: boolean;    // Visible ou non sur le calendrier
}

/* ── Configuration des catégories avec couleurs ────────────────── */
export const CATEGORY_CONFIG: Record<
  EventCategory,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  rentree: {
    label: "Rentrée scolaire",
    color: "#1A3A8F",
    bgColor: "#EEF2FF",
    borderColor: "#1A3A8F",
  },
  examens: {
    label: "Examens",
    color: "#D32F2F",
    bgColor: "#FFF0F0",
    borderColor: "#D32F2F",
  },
  "reunions-parents": {
    label: "Réunions de parents",
    color: "#F5A623",
    bgColor: "#FFF8EE",
    borderColor: "#F5A623",
  },
  vacances: {
    label: "Vacances",
    color: "#2E7D32",
    bgColor: "#E8F5E9",
    borderColor: "#2E7D32",
  },
  "sorties-pedagogiques": {
    label: "Sorties pédagogiques",
    color: "#7B1FA2",
    bgColor: "#F3E5F5",
    borderColor: "#7B1FA2",
  },
  "activites-sportives": {
    label: "Activités sportives",
    color: "#E65100",
    bgColor: "#FFF3E0",
    borderColor: "#E65100",
  },
  "activites-culturelles": {
    label: "Activités culturelles",
    color: "#0097A7",
    bgColor: "#E0F7FA",
    borderColor: "#0097A7",
  },
  celebrations: {
    label: "Célébrations",
    color: "#C2185B",
    bgColor: "#FCE4EC",
    borderColor: "#C2185B",
  },
  concours: {
    label: "Concours",
    color: "#1976D2",
    bgColor: "#E3F2FD",
    borderColor: "#1976D2",
  },
  "evenements-administratifs": {
    label: "Événements administratifs",
    color: "#616161",
    bgColor: "#F5F5F5",
    borderColor: "#616161",
  },
};

/* ── Fonction utilitaire pour obtenir la configuration ─────────── */
export function getCategoryConfig(category: EventCategory) {
  return CATEGORY_CONFIG[category];
}

/* ── Format pour FullCalendar ──────────────────────────────────── */
export interface FullCalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  startTime?: string;
  endTime?: string;
  allDay?: boolean;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  extendedProps: {
    description: string;
    category: EventCategory;
    location: string;
    organizer: string;
    status: EventStatus;
    image?: string;
    relatedNewsId?: string;
  };
}

/* ── Fonction pour convertir CalendarEvent en FullCalendarEvent ── */
export function toFullCalendarEvent(
  event: CalendarEvent
): FullCalendarEvent {
  const config = getCategoryConfig(event.category);
  const hasTime = event.startTime && event.endTime;

  return {
    id: event.id,
    title: event.title,
    start: hasTime
      ? `${event.startDate}T${event.startTime}`
      : event.startDate,
    end: hasTime
      ? `${event.endDate}T${event.endTime}`
      : event.endDate,
    allDay: !hasTime,
    backgroundColor: event.color || config.bgColor,
    borderColor: event.color || config.borderColor,
    textColor: event.color ? "#FFFFFF" : "#1A202C",
    extendedProps: {
      description: event.description,
      category: event.category,
      location: event.location,
      organizer: event.organizer,
      status: event.status,
      image: event.image,
      relatedNewsId: event.relatedNewsId,
    },
  };
}

/* ── Événement simplifié pour l'affichage sur la page d'accueil ── */
export interface UpcomingEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  category: EventCategory;
  location: string;
}
