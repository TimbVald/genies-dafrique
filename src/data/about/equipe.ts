import type { LocalizedText } from "@/types";

/* ════════════════════════════════════════════════════════════════════
   ÉQUIPE PÉDAGOGIQUE — Les Génies d'Afrique
   ────────────────────────────────────────────────────────────────────
   ⚠️  VALIDATION REQUISE AVANT MISE EN LIGNE :
       - Association nom ↔ photo : à confirmer par la direction
       - Orthographe exacte des noms (ex: "Ongueng Elanga" — prénom
         manquant ou nom composé ?)
       - Matière/rôle exact de chaque enseignant
       - Photos : déposer dans /public/images/equipe/<slug>.jpg
         et mettre à jour le champ `photo` ci-dessous
   ════════════════════════════════════════════════════════════════════ */

/** Placeholder utilisé tant que la vraie photo n'est pas fournie */
const PHOTO_PLACEHOLDER = "/images/IMG-20260723-WA0075.jpg";

/* ── Type principal ──────────────────────────────────────────────── */
export interface TeachingStaff {
  /** Identifiant unique / slug URL-friendly */
  id: string;
  /**
   * Nom complet — convention "Prénom Nom" (casse titre).
   * Les noms fournis en MAJUSCULES ont été normalisés en casse titre
   * pour cohérence visuelle. À valider avec la direction.
   */
  name: string;
  /** Rôle / matière enseignée — traduit FR/EN/EW */
  role: LocalizedText;
  /**
   * Chemin vers la photo portrait.
   * Format recommandé : carré 400×400 px ou portrait 4:5 (400×500 px).
   * ⚠️ Remplacer PHOTO_PLACEHOLDER par le vrai chemin après validation.
   */
  photo: string;
  /**
   * true = photo réelle fournie, false = placeholder en attente.
   * Permet d'afficher un badge "Photo à venir" sur les cartes provisoires.
   */
  photoConfirmed: boolean;
  /** Ordre d'affichage (1 = premier affiché) */
  order: number;
  /** Visible ou masqué */
  visible: boolean;
}

/* ── Données des 8 membres de l'équipe pédagogique ─────────────── */
export const TEACHING_STAFF: TeachingStaff[] = [
  {
    id:             "mbaku-jemina",
    name:           "Mrs. Jemina MBAKU",           // ← fourni : MBAKU JEMINA
    role: {
      fr: "Enseignant d'anglais",
      en: "English Teacher",
      ew: "Munya ya English",
    },
    photo:          "https://res.cloudinary.com/dyetkan86/image/upload/v1786836019/IMG-20260815-WA0035_jphzta.jpg",         // ⚠️ À remplacer
    photoConfirmed: true,
    order:          7,
    visible:        true,
  },
  {
    id:             "mofa",
    name:           "M. MOFA",                   // ← fourni : MOFA (prénom manquant — à clarifier)
    role: {
      fr: "Enseignant d'anglais",
      en: "English Teacher",
      ew: "Munya ya English",
    },
    photo:          "https://res.cloudinary.com/dyetkan86/image/upload/v1786611378/IMG-20260810-WA0079_hoixjk.jpg",         // ⚠️ À remplacer
    photoConfirmed: true,
    order:          8,
    visible:        true,
  },
  {
    id:             "ongueng-elanga",
    name:           "Mrs. ONGUENG ELANGA",          // ← fourni : ONGUENG ELANGA (prénom manquant — à clarifier)
    role: {
      fr: "Enseignant d'anglais",
      en: "English Teacher",
      ew: "Munya ya English",
    },
    photo:          "https://res.cloudinary.com/dyetkan86/image/upload/v1786611365/IMG-20260810-WA0067_mb7kg0.jpg",         // ⚠️ À remplacer
    photoConfirmed: true,
    order:          3,
    visible:        true,
  },
  {
    id:             "tcheutchoua-gladis",
    name:           "Mrs. Gladis TCHEUTCHOUA",      // ← fourni tel quel
    role: {
      fr: "Enseignante d'anglais",
      en: "English Teacher",
      ew: "Munya ya English",
    },
    photo:          "https://res.cloudinary.com/dyetkan86/image/upload/v1786836020/IMG-20260815-WA0039_hdmc9i.jpg",         // ⚠️ À remplacer
    photoConfirmed: true,
    order:          2,
    visible:        true,
  },
  {
    id:             "onana-reine",
    name:           "Mrs. Reine ONANA",             // ← fourni : ONANA Reine
    role: {
      fr: "Enseignante de français",
      en: "French Teacher",
      ew: "Munya ya Français",
    },
    photo:          "https://res.cloudinary.com/dyetkan86/image/upload/v1786836019/IMG-20260815-WA0037_hvrn7u.jpg",         // ⚠️ À remplacer
    photoConfirmed: true,
    order:          1,
    visible:        true,
  },
  {
    id:             "mengoua-jeanne",
    name:           "Mrs. Jeanne MENGOUA",          // ← fourni : MENGOUA JEANNE
    role: {
      fr: "Enseignante",
      en: "Teacher",
      ew: "Munya ya sukul",
    },
    photo:          "https://res.cloudinary.com/dyetkan86/image/upload/v1786611384/IMG-20260810-WA0083_oy9f6a.jpg",         // ⚠️ À remplacer
    photoConfirmed: true,
    order:          4,
    visible:        true,
  },
  {
    id:             "ebessi-marie",
    name:           "Mrs. Marie EBESSI",            // ← fourni : EBESSI MARIE
    role: {
      fr: "Enseignante",
      en: "Teacher",
      ew: "Munya ya sukul",
    },
    photo:          "https://res.cloudinary.com/dyetkan86/image/upload/v1786836018/IMG-20260810-WA0081_alukii.jpg",         // ⚠️ À remplacer
    photoConfirmed: true,
    order:          5,
    visible:        true,
  },
  {
    id:             "nga-agnes",
    name:           "Mrs.NGA Agnès",               // ← fourni : NGA AGNES (accent ajouté)
    role: {
      fr: "Enseignante",
      en: "Teacher",
      ew: "Munya ya sukul",
    },
    photo:          "https://res.cloudinary.com/dyetkan86/image/upload/v1786611386/IMG-20260810-WA0087_g3uaus.jpg",         // ⚠️ À remplacer
    photoConfirmed: true,
    order:          6,
    visible:        true,
  },
];

/* ── Fonction de service ─────────────────────────────────────────── */
/** Retourne les membres visibles triés par ordre */
export function getTeachingStaff(): TeachingStaff[] {
  return TEACHING_STAFF
    .filter(m => m.visible)
    .sort((a, b) => a.order - b.order);
}

/** Retourne un membre par son id */
export function getTeachingStaffById(id: string): TeachingStaff | undefined {
  return TEACHING_STAFF.find(m => m.id === id);
}
