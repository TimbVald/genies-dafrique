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
    photo:          "https://res.cloudinary.com/dyetkan86/image/upload/v1787026217/file_000000009108820ebb0eeaacdb109785_wx5dew.png",         // ⚠️ À remplacer
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
    photo:          "https://res.cloudinary.com/dyetkan86/image/upload/v1787026215/file_000000009660820e8e351cb3e8e96e89_vtbtgx.png",         // ⚠️ À remplacer
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
    photo:          "https://res.cloudinary.com/dyetkan86/image/upload/v1787026286/file_0000000086e8820e8602ab99d4240928_s3ed9c.png",         // ⚠️ À remplacer
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
    photo:          "https://res.cloudinary.com/dyetkan86/image/upload/v1787026216/file_00000000a1bc820eb6cc1e30f2819c8a_ziojio.png",         // ⚠️ À remplacer
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
    photo:          "https://res.cloudinary.com/dyetkan86/image/upload/v1787026215/file_00000000222881f4bda4190ba5b996df_a0xbsc.png",         // ⚠️ À remplacer
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
    photo:          "https://res.cloudinary.com/dyetkan86/image/upload/v1787026215/file_00000000a178820ebd0f4b29ce0c9c7f_cguzjb.png",         // ⚠️ À remplacer
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
    photo:          "https://res.cloudinary.com/dyetkan86/image/upload/v1787026217/file_00000000e21c820e9dc5fbf66af177ee_yfhqun.png",         // ⚠️ À remplacer
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
    photo:          "https://res.cloudinary.com/dyetkan86/image/upload/v1787026216/file_00000000c780820ea8be84154e5d7e0a_vz2sry.png",         // ⚠️ À remplacer
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
