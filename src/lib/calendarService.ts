/* ═══════════════════════════════════════════════════════════════
   SERVICE CALENDRIER - PRÊT POUR INTÉGRATION CMS
══════════════════════════════════════════════════════════════════ */

import type { CalendarEvent, UpcomingEvent } from "@/types/calendar";

/* ── Interface du repository (à implémenter selon le CMS) ──────── */
export interface ICalendarRepository {
  getAllEvents(): Promise<CalendarEvent[]>;
  getEventById(id: string): Promise<CalendarEvent | null>;
  getPublishedEvents(): Promise<CalendarEvent[]>;
  getUpcomingEvents(limit?: number): Promise<UpcomingEvent[]>;
  getEventsByCategory(category: string): Promise<CalendarEvent[]>;
  getEventsByDateRange(startDate: string, endDate: string): Promise<CalendarEvent[]>;
  createEvent(event: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt">): Promise<CalendarEvent>;
  updateEvent(id: string, event: Partial<CalendarEvent>): Promise<CalendarEvent>;
  deleteEvent(id: string): Promise<void>;
}

/* ── Service de calendrier avec abstraction ─────────────────────── */
export class CalendarService {
  private repository: ICalendarRepository;

  constructor(repository: ICalendarRepository) {
    this.repository = repository;
  }

  /* ── Obtenir tous les événements ─────────────────────────────── */
  async getAllEvents(): Promise<CalendarEvent[]> {
    return this.repository.getAllEvents();
  }

  /* ── Obtenir un événement par ID ─────────────────────────────── */
  async getEventById(id: string): Promise<CalendarEvent | null> {
    return this.repository.getEventById(id);
  }

  /* ── Obtenir les événements publiés ─────────────────────────── */
  async getPublishedEvents(): Promise<CalendarEvent[]> {
    return this.repository.getPublishedEvents();
  }

  /* ── Obtenir les prochains événements ────────────────────────── */
  async getUpcomingEvents(limit: number = 3): Promise<UpcomingEvent[]> {
    return this.repository.getUpcomingEvents(limit);
  }

  /* ── Obtenir les événements par catégorie ─────────────────────── */
  async getEventsByCategory(category: string): Promise<CalendarEvent[]> {
    return this.repository.getEventsByCategory(category);
  }

  /* ── Obtenir les événements par plage de dates ────────────────── */
  async getEventsByDateRange(
    startDate: string,
    endDate: string
  ): Promise<CalendarEvent[]> {
    return this.repository.getEventsByDateRange(startDate, endDate);
  }

  /* ── Créer un événement (pour admin) ─────────────────────────── */
  async createEvent(
    event: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt">
  ): Promise<CalendarEvent> {
    return this.repository.createEvent(event);
  }

  /* ── Mettre à jour un événement (pour admin) ─────────────────── */
  async updateEvent(
    id: string,
    event: Partial<CalendarEvent>
  ): Promise<CalendarEvent> {
    return this.repository.updateEvent(id, event);
  }

  /* ── Supprimer un événement (pour admin) ─────────────────────── */
  async deleteEvent(id: string): Promise<void> {
    return this.repository.deleteEvent(id);
  }

  /* ── Obtenir les événements pour FullCalendar ────────────────── */
  async getEventsForCalendar(startDate?: string, endDate?: string): Promise<CalendarEvent[]> {
    let events: CalendarEvent[];

    if (startDate && endDate) {
      events = await this.repository.getEventsByDateRange(startDate, endDate);
    } else {
      events = await this.repository.getPublishedEvents();
    }

    return events;
  }

  /* ── Synchroniser avec les actualités (pour future implémentation) */
  async syncWithNews(newsId: string, eventId: string): Promise<void> {
    // Cette méthode pourra être implémentée pour lier automatiquement
    // les actualités aux événements du calendrier
    // Pour l'instant, c'est un placeholder pour l'évolutivité
    console.log(`Syncing news ${newsId} with event ${eventId}`);
  }

  /* ── Exporter en iCal (pour future implémentation) ──────────── */
  async exportToICal(eventIds: string[]): Promise<string> {
    // Cette méthode pourra être implémentée pour exporter des événements
    // au format iCal (.ics) pour Google Calendar, Outlook, etc.
    // Pour l'instant, c'est un placeholder pour l'évolutivité
    console.log(`Exporting events ${eventIds.join(", ")} to iCal format`);
    return "";
  }

  /* ── Envoyer des rappels par email (pour future implémentation) ── */
  async sendEventReminders(eventId: string): Promise<void> {
    // Cette méthode pourra être implémentée pour envoyer des rappels
    // automatiques par email avant un événement
    // Pour l'instant, c'est un placeholder pour l'évolutivité
    console.log(`Sending reminders for event ${eventId}`);
  }
}

/* ── Mock Repository (pour développement) ───────────────────────── */
export class MockCalendarRepository implements ICalendarRepository {
  private events: CalendarEvent[] = [];

  constructor(initialEvents: CalendarEvent[] = []) {
    this.events = initialEvents;
  }

  async getAllEvents(): Promise<CalendarEvent[]> {
    return this.events;
  }

  async getEventById(id: string): Promise<CalendarEvent | null> {
    return this.events.find((e) => e.id === id) || null;
  }

  async getPublishedEvents(): Promise<CalendarEvent[]> {
    return this.events.filter((e) => e.published);
  }

  async getUpcomingEvents(limit: number = 3): Promise<UpcomingEvent[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = this.events
      .filter((event) => {
        const eventDate = new Date(event.startDate);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today && event.published;
      })
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, limit);

    return upcoming.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.startDate,
      time: event.startTime,
      category: event.category,
      location: event.location,
    }));
  }

  async getEventsByCategory(category: string): Promise<CalendarEvent[]> {
    return this.events.filter((e) => e.category === category && e.published);
  }

  async getEventsByDateRange(startDate: string, endDate: string): Promise<CalendarEvent[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return this.events.filter((event) => {
      const eventDate = new Date(event.startDate);
      return eventDate >= start && eventDate <= end && event.published;
    });
  }

  async createEvent(
    event: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt">
  ): Promise<CalendarEvent> {
    const newEvent: CalendarEvent = {
      ...event,
      id: `event-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.events.push(newEvent);
    return newEvent;
  }

  async updateEvent(id: string, updates: Partial<CalendarEvent>): Promise<CalendarEvent> {
    const index = this.events.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error(`Event with id ${id} not found`);
    }

    this.events[index] = {
      ...this.events[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return this.events[index];
  }

  async deleteEvent(id: string): Promise<void> {
    const index = this.events.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error(`Event with id ${id} not found`);
    }

    this.events.splice(index, 1);
  }
}

/* ── Instance par défaut (utilisant les mock data) ─────────────── */
// Cette instance pourra être remplacée par une vraie implémentation
// lorsque le CMS sera intégré
let calendarServiceInstance: CalendarService | null = null;

export function getCalendarService(): CalendarService {
  if (!calendarServiceInstance) {
    // Import des mock data pour le développement
    const { MOCK_EVENTS } = require("@/data/mockEvents");
    const mockRepository = new MockCalendarRepository(MOCK_EVENTS);
    calendarServiceInstance = new CalendarService(mockRepository);
  }
  return calendarServiceInstance;
}

export function setCalendarService(service: CalendarService): void {
  calendarServiceInstance = service;
}
