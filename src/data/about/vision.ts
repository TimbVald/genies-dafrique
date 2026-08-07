import type { LocalizedText, BaseContent } from "@/types";

/* ── Vision Configuration ─────────────────────────────────────────── */
export interface VisionData extends BaseContent {
  title: LocalizedText;
  content: LocalizedText;
  icon?: string;
  visible: boolean;
}

/* ── Vision Data ─────────────────────────────────────────────────── */
export const VISION_DATA: VisionData = {
  id: "vision",
  slug: "vision",
  status: "published",
  createdAt: "2024-01-01T00:00:00Z",
  title: {
    fr: "Vision",
    en: "Vision",
    ew: "Vision",
  },
  content: {
    fr: "Devenir d'ici 2030 l'établissement bilingue de référence au Cameroun, reconnu à l'international pour l'excellence de ses résultats, l'innovation de ses méthodes et l'épanouissement de ses élèves.",
    en: "To become by 2030 the reference bilingual school in Cameroon, recognized internationally for the excellence of its results, the innovation of its methods and the holistic development of its students.",
    ew: "A ne avant 2030 sukul bilingue ya libɔ́g na Kamerun, a yen na si nyonso na mvoé ya résultats, minlɔ́m ya akom na a yɔ́k bana.",
  },
  icon: "Globe",
  visible: true,
};
