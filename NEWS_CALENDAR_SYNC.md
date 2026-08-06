# Liaison Actualités ↔ Calendrier - Guide d'implémentation

## Vue d'ensemble

Le système de liaison automatique entre les actualités et le calendrier est maintenant **fonctionnel**. Les actualités publiées avec des dates sont automatiquement synchronisées avec le calendrier scolaire.

## Fonctionnement actuel

### 1. Détection automatique

Le système détecte automatiquement si une actualité doit être synchronisée avec le calendrier en analysant :

- **Champs explicites** : `eventDate`, `eventEndDate`, `eventTime`, `eventEndTime`
- **Extraction automatique** : Dates et heures extraites du titre et de la description

### 2. Catégorisation intelligente

Le système catégorise automatiquement les événements en analysant les mots-clés dans le titre et la description :

| Mots-clés | Catégorie |
|-----------|-----------|
| rentree, rentrée, back to school | Rentrée scolaire |
| examen, exam, test, evaluation | Examens |
| reunion, parent, meeting | Réunions de parents |
| vacance, vacances, holiday, conge | Vacances |
| sortie, excursion, visit, visite | Sorties pédagogiques |
| sport, football, competition, athletisme | Activités sportives |
| culture, cultural, dance, musique | Activités culturelles |
| fete, fête, celebration, anniversaire | Célébrations |
| concur, concours, competition | Concours |
| admin, administratif, inscription | Événements administratifs |

### 3. Indicateur visuel

Les événements provenant d'actualités sont marqués avec un indicateur 📰 dans le calendrier pour les distinguer des événements créés manuellement.

### 4. Lien bidirectionnel

- **Calendrier → Actualité** : Un bouton dans le modal de l'événement permet d'accéder à l'actualité associée
- **Actualité → Calendrier** : L'actualité crée automatiquement un événement dans le calendrier

## Fichiers impliqués

### 1. `src/lib/newsCalendarSync.ts`

Fonctionnalités principales :
- `detectCategoryFromContent()` : Détecte la catégorie à partir du contenu
- `extractDatesFromText()` : Extrait les dates du texte
- `extractTimesFromText()` : Extrait les heures du texte
- `newsToCalendarEvent()` : Convertit une actualité en événement
- `syncNewsToCalendar()` : Synchronise plusieurs actualités
- `shouldSyncToCalendar()` : Détermine si une actualité doit être synchronisée

### 2. `src/data/mockNews.ts`

Données d'exemple pour les actualités avec champs de synchronisation :
- `eventDate` / `eventEndDate` : Dates de l'événement
- `eventTime` / `eventEndTime` : Heures de l'événement
- `location` : Lieu de l'événement
- `category` : Catégorie suggérée (optionnelle)

### 3. `src/data/mockEvents.ts`

Fusionne les événements manuels et synchronisés :
- `MANUAL_EVENTS` : Événements créés manuellement
- `SYNCED_EVENTS` : Événements synchronisés depuis les actualités

### 4. `src/components/calendar/SchoolCalendar.tsx`

Interface utilisateur :
- Indicateur 📰 pour les événements synchronisés
- Modal amélioré avec lien vers l'actualité associée
- Affichage enrichi de l'actualité liée

## Comment utiliser

### Pour les développeurs

#### Ajouter une actualité synchronisée

```typescript
import { MOCK_NEWS } from "@/data/mockNews";

const newNews = {
  id: "news-6",
  title: "Nouvel événement important",
  description: "Description avec date: 15/09/2025 à 14h",
  date: "2025-09-01",
  eventDate: "2025-09-15",  // Optionnel: extrait automatiquement du texte
  eventTime: "14:00",       // Optionnel: extrait automatiquement du texte
  location: "Salle principale",
  category: "evenements-administratifs", // Optionnel: détecté automatiquement
  published: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

MOCK_NEWS.push(newNews);
```

#### Créer un événement manuel (sans actualité)

```typescript
import { MANUAL_EVENTS } from "@/data/mockEvents";

const manualEvent = {
  id: "manual-1",
  title: "Événement sans actualité",
  description: "Cet événement n'est lié à aucune actualité",
  startDate: "2025-09-20",
  endDate: "2025-09-20",
  category: "activites-sportives",
  location: "Terrain sportif",
  organizer: "Service des sports",
  status: "upcoming",
  published: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

MANUAL_EVENTS.push(manualEvent);
```

### Pour les administrateurs (futur CMS)

Lors de l'intégration avec un CMS, les champs suivants devront être ajoutés au content type "News" :

```json
{
  "eventDate": {
    "type": "datetime",
    "required": false
  },
  "eventEndDate": {
    "type": "datetime", 
    "required": false
  },
  "eventTime": {
    "type": "time",
    "required": false
  },
  "eventEndTime": {
    "type": "time",
    "required": false
  },
  "location": {
    "type": "string",
    "required": false
  },
  "syncToCalendar": {
    "type": "boolean",
    "default": true
  }
}
```

## Personnalisation

### Modifier les règles de catégorisation

Éditez `src/lib/newsCalendarSync.ts` :

```typescript
const KEYWORD_CATEGORIES: Record<string, CalendarEvent["category"]> = {
  // Ajoutez vos propres mots-clés
  "mon-mot-clé": "ma-categorie",
  // ...
};
```

### Modifier les formats de date reconnus

Éditez `src/lib/newsCalendarSync.ts` :

```typescript
const datePatterns = [
  /(\d{2})\/(\d{2})\/(\d{4})/g,  // DD/MM/YYYY
  // Ajoutez vos propres formats
  /(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/g,
];
```

### Désactiver la synchronisation automatique

Pour empêcher une actualité d'être synchronisée :

```typescript
const newsWithoutSync = {
  // ... autres champs
  published: true,
  // Pas de champs eventDate ou de dates dans le texte
};
```

Ou désactivez complètement la synchronisation :

```typescript
// Dans src/data/mockEvents.ts
export const MOCK_EVENTS: CalendarEvent[] = MANUAL_EVENTS; // Sans SYNCED_EVENTS
```

## Avantages de cette approche

1. **Évite la double saisie** : Les informations ne sont saisies qu'une fois dans les actualités
2. **Automatisation** : Pas besoin de créer manuellement les événements
3. **Flexibilité** : Possibilité de créer des événements manuels si nécessaire
4. **Cohérence** : Les informations sont toujours synchronisées
5. **Évolutivité** : Facile à étendre avec de nouvelles règles

## Limitations actuelles

1. **Données mock** : Utilise des données statiques, pas de base de données réelle
2. **Extraction basique** : L'extraction de dates/heures peut ne pas être parfaite
3. **Pas d'interface admin** : Pas d'interface pour gérer les liaisons manuellement
4. **Pas de mise à jour automatique** : Les modifications d'actualités ne mettent pas à jour les événements existants

## Prochaines améliorations

1. **Interface d'administration** pour gérer les liaisons
2. **Mise à jour automatique** des événements lors de la modification d'actualités
3. **Règles de synchronisation** configurables
4. **Extraction avancée** avec IA pour une meilleure détection
5. **Prévisualisation** avant synchronisation
6. **Historique** des synchronisations

## Exemples d'utilisation

### Exemple 1 : Actualité avec dates explicites

```typescript
{
  id: "news-1",
  title: "Rentrée scolaire 2025-2026",
  description: "Les inscriptions sont ouvertes",
  eventDate: "2025-09-02",
  eventTime: "07:30",
  location: "Ensemble de l'établissement",
  // → Crée automatiquement un événement le 02/09/2025 à 07:30
}
```

### Exemple 2 : Actualité avec dates dans le texte

```typescript
{
  id: "news-2", 
  title: "Réunion parents le 15/09/2025 à 16h",
  description: "Réunion importante pour tous les parents",
  // → Extrait automatiquement: date=15/09/2025, heure=16:00
}
```

### Exemple 3 : Actualité sans dates (pas de synchronisation)

```typescript
{
  id: "news-3",
  title: "Nouveau programme pédagogique",
  description: "Découvrez notre nouveau programme innovant",
  // → Aucune synchronisation (pas de dates détectées)
}
```

## Dépannage

### Problème : L'actualité n'apparaît pas dans le calendrier

**Solutions possibles :**
1. Vérifiez que `published: true`
2. Vérifiez qu'il y a une date (champ `eventDate` ou dans le texte)
3. Vérifiez que la catégorie est valide
4. Consultez la console pour les erreurs

### Problème : La catégorie détectée est incorrecte

**Solutions possibles :**
1. Spécifiez manuellement la catégorie avec le champ `category`
2. Ajoutez des mots-clés personnalisés dans `KEYWORD_CATEGORIES`
3. Modifiez le titre/description pour inclure des mots-clés plus clairs

### Problème : Les dates/heures ne sont pas extraites correctement

**Solutions possibles :**
1. Utilisez les champs explicites (`eventDate`, `eventTime`)
2. Vérifiez le format de date utilisé
3. Ajoutez votre format de date dans `datePatterns`

## Conclusion

Le système de liaison actualités-calendrier est maintenant opérationnel et automatique. Il suffit d'ajouter des dates aux actualités pour qu'elles apparaissent dans le calendrier, avec une catégorisation intelligente et des liens bidirectionnels.
