// /* ═══════════════════════════════════════════════════════════════
//    DONNÉES D'EXEMPLE POUR LES ACTUALITÉS
// ══════════════════════════════════════════════════════════════════ */

// import type { NewsItem } from "@/lib/newsCalendarSync";
// import { syncNewsToCalendar } from "@/lib/newsCalendarSync";

// // Réexporter pour faciliter l'import
// export { syncNewsToCalendar };

// export const MOCK_NEWS: NewsItem[] = [
//   {
//     id: "news-1",
//     title: "Rentrée scolaire 2025-2026 : Inscriptions ouvertes",
//     description: "Les inscriptions pour l'année scolaire 2025-2026 sont maintenant ouvertes. Venez découvrir notre établissement et inscrire vos enfants.",
//     date: "2025-08-15",
//     eventDate: "2025-09-02",
//     eventEndDate: "2025-09-02",
//     eventTime: "07:30",
//     eventEndTime: "12:00",
//     location: "Ensemble de l'établissement",
//     category: "rentree",
//     image: "/images/IMG-20260723-WA0024.jpg",
//     published: true,
//     createdAt: "2025-08-01T00:00:00Z",
//     updatedAt: "2025-08-15T00:00:00Z",
//   },
//   {
//     id: "news-2",
//     title: "Journée portes ouvertes : Samedi 5 Septembre",
//     description: "Venez découvrir nos installations, rencontrer l'équipe pédagogique et en savoir plus sur nos programmes bilingues. De 9h à 13h.",
//     date: "2025-08-20",
//     eventDate: "2025-09-05",
//     eventEndDate: "2025-09-05",
//     eventTime: "09:00",
//     eventEndTime: "13:00",
//     location: "Ensemble de l'établissement",
//     category: "evenements-administratifs",
//     image: "/images/IMG-20260723-WA0024.jpg",
//     published: true,
//     createdAt: "2025-08-20T00:00:00Z",
//     updatedAt: "2025-08-20T00:00:00Z",
//   },
//   {
//     id: "news-3",
//     title: "Semaine culturelle : Du 19 au 23 Mai 2026",
//     description: "Une semaine dédiée aux cultures africaines avec expositions, danses, musique et gastronomie. Parents et familles sont les bienvenus !",
//     date: "2026-05-10",
//     eventDate: "2026-05-19",
//     eventEndDate: "2026-05-23",
//     location: "Ensemble de l'établissement",
//     category: "activites-culturelles",
//     image: "/images/IMG-20260723-WA0024.jpg",
//     published: true,
//     createdAt: "2026-05-01T00:00:00Z",
//     updatedAt: "2026-05-10T00:00:00Z",
//   },
//   {
//     id: "news-4",
//     title: "Concours de lecture : Inscriptions jusqu'au 15 Avril",
//     description: "Le concours de lecture inter-classes aura lieu le 22 Avril 2026. Les inscriptions sont ouvertes jusqu'au 15 Avril.",
//     date: "2026-04-01",
//     eventDate: "2026-04-22",
//     eventEndDate: "2026-04-22",
//     eventTime: "09:00",
//     eventEndTime: "12:00",
//     location: "Bibliothèque",
//     category: "concours",
//     image: "/images/IMG-20260723-WA0024.jpg",
//     published: true,
//     createdAt: "2026-04-01T00:00:00Z",
//     updatedAt: "2026-04-01T00:00:00Z",
//   },
//   {
//     id: "news-5",
//     title: "Sortie pédagogique au Zoo de Mvog-Betsi",
//     description: "Les classes de CP1 et CP2 visiteront le zoo de Mvog-Betsi le 18 Mars 2026. Départ à 8h, retour à 14h.",
//     date: "2026-03-10",
//     eventDate: "2026-03-18",
//     eventEndDate: "2026-03-18",
//     eventTime: "08:00",
//     eventEndTime: "14:00",
//     location: "Zoo de Mvog-Betsi",
//     category: "sorties-pedagogiques",
//     image: "/images/IMG-20260723-WA0024.jpg",
//     published: true,
//     createdAt: "2026-03-01T00:00:00Z",
//     updatedAt: "2026-03-10T00:00:00Z",
//   },
// ];

// /* ── Fonction pour obtenir toutes les actualités publiées ───────── */
// export function getPublishedNews(): NewsItem[] {
//   return MOCK_NEWS.filter(news => news.published);
// }

// /* ── Fonction pour obtenir une actualité par ID ─────────────────── */
// export function getNewsById(id: string): NewsItem | undefined {
//   return MOCK_NEWS.find(news => news.id === id);
// }
