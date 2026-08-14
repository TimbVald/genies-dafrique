import type { LocalizedText, LocalizedContent, BaseContent } from "@/types";

/* ── Director Message Configuration ───────────────────────────────── */
export interface DirectorMessage extends BaseContent {
  name: LocalizedText;
  role: LocalizedText;
  photo: string;
  quote: LocalizedText;
  message: LocalizedContent;
  signature: LocalizedText;
  signatureTitle: LocalizedText;
  visible: boolean;
}

/* ── Director Message Data ───────────────────────────────────────── */
export const DIRECTOR_MESSAGE: DirectorMessage = {
  id: "director-message",
  slug: "mot-directeur",
  status: "published",
  createdAt: "2024-01-01T00:00:00Z",
  name: {
    fr: "Mme Mbarga",
    en: "Mrs. Mbarga",
    ew: "Mme Mbarga",
  },
  role: {
    fr: "Présidente – Fondatrice",
    en: "President – Founder",
    ew: "Présidente – Fondatrice",
  },
  photo: "https://res.cloudinary.com/dyetkan86/image/upload/v1786697123/ChatGPT_Image_13_ao%C3%BBt_2026_13_10_54_vxd68p.png",
  quote: {
    fr: "Chaque enfant porte en lui un génie unique. Notre rôle est de créer les conditions pour qu'il s'éveille et s'épanouisse.",
    en: "Every child carries a unique genius within them. Our role is to create the conditions for it to awaken and flourish.",
    ew: "Mwana nyonso a ne génie ya mvoé. Misala ya biso a ne a tɔ́l ase ayi a yen a yɔ́k.",
  },
  message: {
    fr: "Chers parents, chers élèves, chers visiteurs. Le Complexe Scolaire Bilingue Les Génies d'Afrique est né d'une conviction profonde : l'Afrique de demain se construit aujourd'hui dans les salles de classe, à travers l'éducation de ses enfants. Nous avons réuni une équipe passionnée, des infrastructures de qualité et un projet éducatif ambitieux pour offrir à chaque enfant qui nous est confié un environnement propice à la réussite et à l'épanouissement. Notre approche bilingue intégrale, notre ouverture sur les autres cultures et notre engagement en faveur d'un développement global sont autant d'atouts que nous mettons au service de votre famille. Ensemble, construisons l'avenir.",
    en: "Dear parents, dear students, dear visitors. The Bilingual School Complex Les Génies d'Afrique was born from a deep conviction: Africa of tomorrow is built today in classrooms, through the education of its children. We have brought together a passionate team, quality infrastructure and an ambitious educational project to offer each child entrusted to us an environment conducive to success and fulfillment. Our comprehensive bilingual approach, our openness to other cultures and our commitment to holistic development are assets that we place at the service of your family. Together, let's build the future.",
    ew: "Bana ba fam, bana ba sukul, na bɔ́ngɔ́ ba yen biso. Complexe Scolaire Bilingue Les Génies d'Afrique a nga bɔ́g na mvon ya minene: Afrika ya ndɔ́ma a bɔ́g lelo na bisɔ́m bya sukul, na a lɛ́g bana ba ayi. Biso bi nga kɔ́bɔ́talane na bikɔ́l bya misala, bika bya mvoé na projet ya akom ya libɔ́g amu a yɔ́k mwana nyonso a nga tɔ́l na biso. Minsili mibuma ya biso, a kɔ́l si ya minsili na a lɛ́g mwana nyonso bi ne bikɔ́l bia tɔ́l na bana. Ke ne mbog, a tɔ́l a ndɔ́ma.",
  },
  signature: {
    fr: "Mme Mbarga",
    en: "Mrs. Mbarga",
    ew: "Mme Mbarga",
  },
  signatureTitle: {
    fr: "Présidente – Fondatrice du Complexe Scolaire Bilingue Les Génies d'Afrique",
    en: "President – Founder of the Bilingual School Complex Les Génies d'Afrique",
    ew: "Présidente – Fondatrice du Complexe Scolaire Bilingue Les Génies d'Afrique",
  },
  visible: true,
};
