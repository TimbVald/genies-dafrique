export interface NewsItem {
  id: string;
  date: string;
  category: string;
  categoryKey: string;
  titleFr: string;
  titleEn: string;
  excerpt: string;
  image: string;
  galleryCount: number;
  author: string;
  eventDate?: string; // Pour la liaison avec le calendrier
  eventType?: string; // Type d'événement pour le calendrier
}

export const NEWS_DATA: NewsItem[] = [
  {
    id: "rentree-2025",
    date: "Septembre 2025",
    category: "Événements",
    categoryKey: "evenements",
    titleFr: "Rentrée scolaire 2025-2026 : un nouveau chapitre !",
    titleEn: "Back to School 2025-2026: A New Chapter!",
    excerpt: "L'école a officiellement ouvert ses portes à la rentrée de septembre 2025 avec enthousiasme et de nombreux nouveaux élèves. Une rentrée historique pour Les Génies d'Afrique.",
    image: "/images/IMG-20260723-WA0006.jpg",
    galleryCount: 4,
    author: "Rédaction Les Génies d'Afrique",
    eventDate: "2025-09-01",
    eventType: "rentree",
  },
  {
    id: "agrement-minedub",
    date: "Février 2025",
    category: "Institutionnel",
    categoryKey: "institutionnel",
    titleFr: "Obtention de l'agrément officiel MINEDUB",
    titleEn: "Official MINEDUB Accreditation Obtained",
    excerpt: "Le Complexe Scolaire Bilingue Les Génies d'Afrique a obtenu son agrément officiel du Ministère de l'Éducation de Base du Cameroun, une étape fondatrice pour l'établissement.",
    image: "/images/IMG-20260723-WA0022.jpg",
    galleryCount: 4,
    author: "Rédaction Les Génies d'Afrique",
    eventDate: "2025-02-15",
    eventType: "evenements_administratifs",
  },
  {
    id: "projets-agricoles",
    date: "Octobre 2025",
    category: "Pédagogie",
    categoryKey: "pedagogie",
    titleFr: "Lancement des projets agricoles et d'élevage",
    titleEn: "Launch of Farming and Livestock Projects",
    excerpt: "Les élèves du primaire ont lancé leurs premiers projets d'agriculture scolaire et d'élevage, découvrant la culture des légumes et l'élevage de volaille sur le terrain de l'école.",
    image: "/images/IMG-20260723-WA0013.jpg",
    galleryCount: 4,
    author: "Rédaction Les Génies d'Afrique",
    eventDate: "2025-10-15",
    eventType: "sorties_pedagogiques",
  },
  {
    id: "fete-noel-2025",
    date: "Décembre 2025",
    category: "Événements",
    categoryKey: "evenements",
    titleFr: "Fête de fin d'année : spectacle et remise de prix",
    titleEn: "End-of-Year Celebration: Show and Prize Giving",
    excerpt: "La première grande fête scolaire des Génies d'Afrique a réuni parents, élèves et enseignants pour une soirée inoubliable, couronnée par la remise des prix d'excellence.",
    image: "/images/IMG-20260723-WA0034.jpg",
    galleryCount: 4,
    author: "Rédaction Les Génies d'Afrique",
    eventDate: "2025-12-20",
    eventType: "celebrations",
  },
  {
    id: "inscriptions-2026",
    date: "Juillet 2026",
    category: "Admissions",
    categoryKey: "admissions",
    titleFr: "Inscriptions ouvertes pour l'année scolaire 2026-2027",
    titleEn: "Enrollment Open for the 2026-2027 School Year",
    excerpt: "Les inscriptions pour la rentrée de septembre 2026 sont officiellement ouvertes. Venez déposer votre dossier au secrétariat du lundi au vendredi de 8h à 13h.",
    image: "/images/IMG-20260723-WA0039.jpg",
    galleryCount: 4,
    author: "Rédaction Les Génies d'Afrique",
    eventDate: "2026-07-01",
    eventType: "evenements_administratifs",
  },
  {
    id: "journee-sport",
    date: "Novembre 2025",
    category: "Sports",
    categoryKey: "sports",
    titleFr: "Journée sportive inter-classes : les champions sont désignés !",
    titleEn: "Inter-class Sports Day: Champions Are Crowned!",
    excerpt: "La première journée sportive de l'école a mobilisé tous les élèves autour de compétitions de football et d'athlétisme dans une ambiance festive et compétitive.",
    image: "/images/IMG-20260723-WA0017.jpg",
    galleryCount: 4,
    author: "Rédaction Les Génies d'Afrique",
    eventDate: "2025-11-20",
    eventType: "activites_sportives",
  },
];

export const CATEGORY_COLORS: Record<string, string> = {
  "Événements": "bg-[#EEF2FF] text-[#1A3A8F]",
  "Institutionnel": "bg-[#FFF0F0] text-[#D32F2F]",
  "Pédagogie": "bg-[#F0FFF4] text-[#2E7D32]",
  "Admissions": "bg-[#FFF8EE] text-[#F5A623]",
  "Sports": "bg-[#F0F9FF] text-[#0284C7]",
};

export const CATEGORY_KEYS = ["all", "evenements", "institutionnel", "pedagogie", "admissions", "sports"];

export const CATEGORY_LABELS_FR: Record<string, string> = {
  all: "Toutes les actualités",
  evenements: "Événements",
  institutionnel: "Institutionnel",
  pedagogie: "Pédagogie",
  admissions: "Admissions",
  sports: "Sports & Vie scolaire",
};

export const CATEGORY_LABELS_EN: Record<string, string> = {
  all: "All News",
  evenements: "Events",
  institutional: "Institutional",
  pedagogy: "Pedagogy",
  admissions: "Admissions",
  sports: "Sports & School Life",
};