import type { LocalizedText, BaseContent } from "@/types";

/* ── Mission Configuration ─────────────────────────────────────────── */
export interface MissionData extends BaseContent {
  title: LocalizedText;
  content: LocalizedText;
  icon?: string;
  visible: boolean;
}

/* ── Mission Data ─────────────────────────────────────────────────── */
export const MISSION_DATA: MissionData = {
  id: "mission",
  slug: "mission",
  status: "published",
  createdAt: "2024-01-01T00:00:00Z",
  title: {
    fr: "Mission",
    en: "Mission",
    ew: "Ntii",
  },
  content: {
    fr: "Former des individus complets, équilibrés et compétitifs, capables de réussir dans un monde globalisé, tout en restant ancrés dans leurs valeurs culturelles africaines.",
    en: "To shape complete, balanced and competitive individuals, capable of succeeding in a globalized world while remaining anchored in their African cultural values.",
    ew: "A lɛ́g bana ba ne na mfañ nyonso, ba yeme a kɔ́l na si ya mvoé, na a bɔ́g mimbɔ́g ya Afrika.",
  },
  icon: "Trophy",
  visible: true,
};
