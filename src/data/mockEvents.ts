/* ═══════════════════════════════════════════════════════════════
   DONNÉES D'EXEMPLE POUR LE CALENDRIER SCOLAIRE
══════════════════════════════════════════════════════════════════ */

import type { CalendarEvent, ReactBigCalendarEvent } from "@/types/calendar";
import { getPublishedNews } from "@/data/mockNews";
import { syncNewsToCalendar } from "@/lib/newsCalendarSync";
import { toReactBigCalendarEvent } from "@/types/calendar";

/* ── Événements créés manuellement (sans liaison actualités) ───── */
const MANUAL_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    title: "Réunion de parents d'élèves - Maternelle",
    description:
      "Première réunion de parents pour présenter le programme de l'année et répondre aux questions.",
    startDate: "2025-09-12",
    endDate: "2025-09-12",
    startTime: "16:00",
    endTime: "18:00",
    category: "reunions-parents",
    location: "Salle polyvalente",
    organizer: "Direction Pédagogique",
    status: "upcoming",
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z",
    published: true,
  },
  {
    id: "2",
    title: "Journée sportive",
    description:
      "Compétitions sportives inter-classes : athlétisme, football, basketball. Parents bienvenus!",
    startDate: "2025-10-15",
    endDate: "2025-10-15",
    startTime: "08:00",
    endTime: "16:00",
    category: "activites-sportives",
    location: "Terrain sportif",
    organizer: "Service des sports",
    status: "upcoming",
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z",
    published: true,
  },
  {
    id: "3",
    title: "Examens du premier trimestre",
    description:
      "Période d'examens du premier trimestre pour tous les niveaux. Emploi du temps spécifique.",
    startDate: "2025-11-25",
    endDate: "2025-12-05",
    category: "examens",
    location: "Salles de classe",
    organizer: "Direction des Études",
    status: "upcoming",
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z",
    published: true,
  },
  {
    id: "4",
    title: "Vacances de fin d'année",
    description:
      "Fermeture de l'établissement pour les vacances de fin d'année 2025.",
    startDate: "2025-12-20",
    endDate: "2026-01-05",
    category: "vacances",
    location: "Établissement fermé",
    organizer: "Direction",
    status: "upcoming",
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z",
    published: true,
  },
  {
    id: "5",
    title: "Fête de l'indépendance",
    description:
      "Célébration de la fête nationale avec activités culturelles et exposés.",
    startDate: "2026-02-11",
    endDate: "2026-02-11",
    startTime: "08:00",
    endTime: "13:00",
    category: "celebrations",
    location: "Cour de l'école",
    organizer: "Direction",
    status: "upcoming",
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z",
    published: true,
  },
  {
    id: "6",
    title: "Conseil d'établissement",
    description:
      "Réunion du conseil d'établissement pour faire le bilan de l'année et préparer la suivante.",
    startDate: "2026-06-10",
    endDate: "2026-06-10",
    startTime: "15:00",
    endTime: "18:00",
    category: "evenements-administratifs",
    location: "Salle de réunion",
    organizer: "Direction",
    status: "upcoming",
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z",
    published: true,
  },
];

/* ── Événements synchronisés depuis les actualités ───────────────── */
const SYNCED_EVENTS: CalendarEvent[] = (() => {
  const newsEvents = syncNewsToCalendar(getPublishedNews());
  
  return newsEvents.map((event: any, index: number) => ({
    ...event,
    id: `synced-${index + 10}`, // IDs uniques pour les événements synchronisés
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
})();

/* ── Fusion des événements manuels et synchronisés ───────────────── */
export const MOCK_EVENTS: CalendarEvent[] = [...MANUAL_EVENTS, ...SYNCED_EVENTS];

/* ── Fonction pour obtenir les prochains événements ────────────── */
export function getUpcomingEvents(limit: number = 3) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return MOCK_EVENTS
    .filter((event) => {
      const eventDate = new Date(event.startDate);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today && event.published;
    })
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, limit);
}

/* ── Fonction pour obtenir tous les événements publiés ─────────── */
export function getPublishedEvents(): CalendarEvent[] {
  return MOCK_EVENTS.filter((event) => event.published);
}

/* ── Fonction pour obtenir les événements au format React Big Calendar ─── */
export function getReactBigCalendarEvents(): ReactBigCalendarEvent[] {
  return getPublishedEvents().map(toReactBigCalendarEvent);
}
