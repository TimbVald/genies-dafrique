# Architecture du Calendrier Scolaire - Guide d'intégration CMS

## Vue d'ensemble

Le calendrier scolaire a été conçu avec une architecture modulaire et évolutive, prête pour l'intégration avec un CMS futur (Strapi, Contentful, Sanity, etc.).

## Structure actuelle

### 1. Types et interfaces (`src/types/calendar.ts`)
- `CalendarEvent`: Interface principale des événements
- `EventCategory`: Catégories prédéfinies avec couleurs
- `EventStatus`: Statuts des événements (à venir, en cours, terminé)
- `FullCalendarEvent`: Format adapté pour FullCalendar
- `UpcomingEvent`: Format simplifié pour l'affichage sur la page d'accueil

### 2. Service de calendrier (`src/lib/calendarService.ts`)
- `ICalendarRepository`: Interface à implémenter selon le CMS choisi
- `CalendarService`: Service principal avec méthodes CRUD
- `MockCalendarRepository`: Implémentation mock pour le développement
- Fonctions utilitaires pour l'export iCal, les rappels email, etc.

### 3. Composants
- `SchoolCalendar`: Composant principal FullCalendar
- `UpcomingEventsSection`: Section des prochains événements (page d'accueil)
- Modal de détails d'événement intégré

## Intégration avec un CMS

### Étape 1: Choisir le CMS

Options recommandées:
- **Strapi**: CMS headless open-source, très adapté aux projets Next.js
- **Contentful**: CMS headless cloud avec excellent support TypeScript
- **Sanity**: CMS headless flexible avec studio en temps réel
- **Directus**: CMS headless open-source avec base de données SQL

### Étape 2: Créer le content type dans le CMS

#### Exemple de structure pour Strapi:

```json
{
  "kind": "collectionType",
  "collectionName": "events",
  "info": {
    "name": "Event",
    "description": "School calendar events"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text",
      "required": true
    },
    "startDate": {
      "type": "datetime",
      "required": true
    },
    "endDate": {
      "type": "datetime",
      "required": true
    },
    "startTime": {
      "type": "time"
    },
    "endTime": {
      "type": "time"
    },
    "category": {
      "type": "enumeration",
      "enum": [
        "rentree",
        "examens",
        "reunions-parents",
        "vacances",
        "sorties-pedagogiques",
        "activites-sportives",
        "activites-culturelles",
        "celebrations",
        "concours",
        "evenements-administratifs"
      ],
      "required": true
    },
    "color": {
      "type": "string"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "location": {
      "type": "string",
      "required": true
    },
    "organizer": {
      "type": "string",
      "required": true
    },
    "status": {
      "type": "enumeration",
      "enum": ["upcoming", "ongoing", "completed"],
      "default": "upcoming"
    },
    "relatedNews": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::news.news"
    },
    "published": {
      "type": "boolean",
      "default": true
    }
  }
}
```

### Étape 3: Implémenter le repository

Créer `src/lib/repositories/strapiCalendarRepository.ts`:

```typescript
import type { ICalendarRepository } from "../calendarService";
import type { CalendarEvent, UpcomingEvent } from "@/types/calendar";

export class StrapiCalendarRepository implements ICalendarRepository {
  private apiUrl: string;
  private apiKey: string;

  constructor(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  private async fetchFromStrapi(endpoint: string, options?: RequestInit) {
    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      ...options,
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`);
    }

    return response.json();
  }

  private mapStrapiEventToCalendarEvent(strapiEvent: any): CalendarEvent {
    return {
      id: strapiEvent.id.toString(),
      title: strapiEvent.title,
      description: strapiEvent.description,
      startDate: strapiEvent.startDate,
      endDate: strapiEvent.endDate,
      startTime: strapiEvent.startTime,
      endTime: strapiEvent.endTime,
      category: strapiEvent.category,
      color: strapiEvent.color,
      image: strapiEvent.image?.url,
      location: strapiEvent.location,
      organizer: strapiEvent.organizer,
      status: strapiEvent.status,
      relatedNewsId: strapiEvent.relatedNews?.id?.toString(),
      createdAt: strapiEvent.createdAt,
      updatedAt: strapiEvent.updatedAt,
      published: strapiEvent.published,
    };
  }

  async getAllEvents(): Promise<CalendarEvent[]> {
    const data = await this.fetchFromStrapi("/api/events");
    return data.data.map(this.mapStrapiEventToCalendarEvent);
  }

  async getEventById(id: string): Promise<CalendarEvent | null> {
    const data = await this.fetchFromStrapi(`/api/events/${id}`);
    return this.mapStrapiEventToCalendarEvent(data.data);
  }

  async getPublishedEvents(): Promise<CalendarEvent[]> {
    const data = await this.fetchFromStrapi(
      "/api/events?filters[published]=true&sort=startDate:asc"
    );
    return data.data.map(this.mapStrapiEventToCalendarEvent);
  }

  async getUpcomingEvents(limit: number = 3): Promise<UpcomingEvent[]> {
    const today = new Date().toISOString().split("T")[0];
    const data = await this.fetchFromStrapi(
      `/api/events?filters[startDate][$gte]=${today}&filters[published]=true&sort=startDate:asc&pagination[limit]=${limit}`
    );

    return data.data.map((event: any) => ({
      id: event.id.toString(),
      title: event.title,
      description: event.description,
      date: event.startDate,
      time: event.startTime,
      category: event.category,
      location: event.location,
    }));
  }

  async getEventsByCategory(category: string): Promise<CalendarEvent[]> {
    const data = await this.fetchFromStrapi(
      `/api/events?filters[category]=${category}&filters[published]=true`
    );
    return data.data.map(this.mapStrapiEventToCalendarEvent);
  }

  async getEventsByDateRange(startDate: string, endDate: string): Promise<CalendarEvent[]> {
    const data = await this.fetchFromStrapi(
      `/api/events?filters[startDate][$gte]=${startDate}&filters[endDate][$lte]=${endDate}&filters[published]=true`
    );
    return data.data.map(this.mapStrapiEventToCalendarEvent);
  }

  async createEvent(event: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt">): Promise<CalendarEvent> {
    const data = await this.fetchFromStrapi("/api/events", {
      method: "POST",
      body: JSON.stringify({
        data: event,
      }),
    });
    return this.mapStrapiEventToCalendarEvent(data.data);
  }

  async updateEvent(id: string, event: Partial<CalendarEvent>): Promise<CalendarEvent> {
    const data = await this.fetchFromStrapi(`/api/events/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        data: event,
      }),
    });
    return this.mapStrapiEventToCalendarEvent(data.data);
  }

  async deleteEvent(id: string): Promise<void> {
    await this.fetchFromStrapi(`/api/events/${id}`, {
      method: "DELETE",
    });
  }
}
```

### Étape 4: Initialiser le service

Dans `src/lib/calendarService.ts`, remplacer l'instance par défaut:

```typescript
import { StrapiCalendarRepository } from "./repositories/strapiCalendarRepository";

export function getCalendarService(): CalendarService {
  if (!calendarServiceInstance) {
    const strapiRepository = new StrapiCalendarRepository(
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "",
      process.env.STRAPI_API_KEY || ""
    );
    calendarServiceInstance = new CalendarService(strapiRepository);
  }
  return calendarServiceInstance;
}
```

### Étape 5: Variables d'environnement

Ajouter dans `.env.local`:

```env
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-instance.com
STRAPI_API_KEY=your-api-key
```

## Fonctionnalités évolutives (prêtes à implémenter)

### 1. Inscription aux événements
- Ajouter un champ `maxParticipants` dans le content type
- Créer une table `event_registrations` dans le CMS
- Implémenter la méthode `registerForEvent(eventId, userId)` dans le service

### 2. Rappels automatiques par email
- Intégrer avec un service d'email (SendGrid, Mailgun, Resend)
- Implémenter `sendEventReminders(eventId)` avec cron jobs
- Ajouter des préférences de notification pour les utilisateurs

### 3. Export iCal (.ics)
- Implémenter `exportToICal(eventIds)` en utilisant une librairie comme `ical-generator`
- Ajouter un bouton "Exporter" dans l'interface du calendrier
- Permettre l'export de tout le calendrier ou d'événements sélectionnés

### 4. Synchronisation avec Google Calendar/Outlook
- Utiliser les APIs Google Calendar et Microsoft Graph
- Implémenter `syncWithExternalCalendar(calendarType, eventId)`
- Ajouter des boutons de synchronisation dans le modal d'événement

### 5. Filtres avancés
- Ajouter des champs pour `classLevel`, `language`, `targetAudience`
- Créer des composants de filtre dans l'interface
- Implémenter les méthodes de recherche correspondantes dans le service

## Liaison avec les actualités

L'architecture prévoit déjà un champ `relatedNewsId` dans les événements. Pour lier automatiquement une actualité au calendrier:

1. Dans le CMS, créer une relation entre les content types `news` et `events`
2. Lors de la création/modification d'une actualité avec des dates, proposer de créer un événement lié
3. Utiliser la méthode `syncWithNews(newsId, eventId)` pour maintenir la synchronisation

## Panneau d'administration

Le service de calendrier inclut déjà toutes les méthodes nécessaires pour l'administration:

- `createEvent()`: Créer un événement
- `updateEvent()`: Modifier un événement
- `deleteEvent()`: Supprimer un événement
- Méthodes de filtrage et de recherche

Il suffit de créer une interface d'administration (page `/admin/calendar`) qui utilise ces méthodes.

## Sécurité

- Ajouter l'authentification pour les opérations d'administration
- Valider les données côté serveur avant de les envoyer au CMS
- Implémenter le rate limiting pour les API publiques
- Utiliser des variables d'environnement pour les clés API

## Performance

- Implémenter le caching avec Redis ou un CDN
- Utiliser ISR (Incremental Static Regeneration) pour les pages statiques
- Optimiser les images avec Next.js Image component
- Implémenter la pagination pour les listes d'événements

## Tests

Créer des tests pour:
- Le service de calendrier
- Les repositories
- Les composants React
- L'intégration avec le CMS

## Conclusion

Cette architecture modulaire permet de:
1. Remplacer facilement l'implémentation mock par un vrai CMS
2. Ajouter de nouvelles fonctionnalités sans modifier le code existant
3. Maintenir une séparation claire entre l'interface et la logique métier
4. Tester chaque composant indépendamment

Le calendrier est prêt pour une intégration CMS complète tout en restant fonctionnel avec les données de démonstration actuelles.
