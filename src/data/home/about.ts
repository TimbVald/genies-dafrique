import type { LocalizedText } from "@/types";

/* ── About Section Configuration for Home Page ───────────────────── */
export interface AboutSectionData {
  badge: LocalizedText;
  title: LocalizedText;
  slogan: LocalizedText;
  mission: LocalizedText;
  vision: LocalizedText;
  values: LocalizedText;
  bilingual: LocalizedText;
  excellence: LocalizedText;
  cta: {
    label: LocalizedText;
    href: string;
  };
  directorName: LocalizedText;
  directorRole: LocalizedText;
  videoLabel: LocalizedText;
  accreditation: LocalizedText;
  since: LocalizedText;
  videoThumbnail: string;
  videoFr: string;
  videoEn: string;
  decorativeImages: string[];
}

/* ── About Section Data ────────────────────────────────────────────── */
export const ABOUT_SECTION_DATA: AboutSectionData = {
  badge: {
    fr: "À propos",
    en: "About Us",
    ew: "Mvon mvo",
  },
  title: {
    fr: "Une école née pour révéler le génie de chaque enfant",
    en: "A School Born to Reveal Every Child's Genius",
    ew: "Sukul a nga bɔ́g na yɔ́k génie ya mwana nyonso",
  },
  slogan: {
    fr: "Travail – Discipline – Succès",
    en: "Work – Discipline – Success",
    ew: "Akɔm – Dzam – Nyɔ́ñ",
  },
  mission: {
    fr: "Fondé à Nkozoa et agréé par le MINEDUB, le Complexe Scolaire Bilingue Les Génies d'Afrique est né d'une conviction profonde : chaque enfant porte un potentiel exceptionnel. Notre mission est de le révéler, de le nourrir et de le préparer à exceller dans un monde globalisé.",
    en: "Founded in Nkozoa and accredited by MINEDUB, the Bilingual School Complex Les Génies d'Afrique was born from a deep conviction: every child carries exceptional potential. Our mission is to reveal it, nurture it and prepare them to excel in a globalised world.",
    ew: "A tɔ́l na Nkozoa na a yɔ́k agrément ya MINEDUB, Complexe Scolaire Bilingue Les Génies d'Afrique a nga bɔ́g na mvon ya minene : mwana nyonso a ne génie ya mvoé. Ntii biso a ne a yɔ́k, a lɛ́g na a sɔ́m a yɔ́k na si ya mvoé.",
  },
  vision: {
    fr: "Nous aspirons à devenir l'établissement bilingue de référence au Cameroun, reconnu pour la qualité de son accompagnement, l'innovation de ses méthodes pédagogiques et l'épanouissement de ses élèves.",
    en: "We aspire to become the bilingual school of reference in Cameroon, recognised for the quality of our guidance, the innovation of our teaching methods and the holistic development of our students.",
    ew: "Biso bi ne avant sukul bilingue ya libɔ́g na Kamerun, a yen na si nyonso na mvoé ya akom, minlɔ́m ya akom na a yɔ́k bana.",
  },
  values: {
    fr: "L'excellence, l'intégrité, le bilinguisme et la bienveillance forment le fondement de notre projet éducatif. Chaque décision pédagogique est guidée par le bien-être et la progression de chaque enfant qui nous est confié.",
    en: "Excellence, integrity, bilingualism and care form the foundation of our educational project. Every pedagogical decision is guided by the well-being and progress of each child entrusted to us.",
    ew: "Nyɔ́ñ, mbɔ́g ya mfañ, bilinguisme na mvoé a ne base ya projet ya akom biso. Akom nyonso a ne dzam ya mfañ na a kɔ́l ya mwana nyonso a nga tɔ́l na biso.",
  },
  bilingual: {
    fr: "Notre approche bilingue intégrale — français et anglais dès la crèche — est bien plus qu'un avantage : c'est une ouverture à deux mondes culturels, un tremplin vers les meilleures opportunités académiques et professionnelles.",
    en: "Our fully bilingual approach — French and English from day care — is far more than an advantage: it is an opening to two cultural worlds, a springboard to the best academic and professional opportunities.",
    ew: "Minsili mibuma ya biso — français na anglais kobi na crèche — a nyɔ́n kɔ́l : a ne yiban na mvan mibuma mbaba, a ne nzame na si nyonso ya akom na ya misala.",
  },
  excellence: {
    fr: "De l'agriculture scolaire à l'entrepreneuriat junior, nous allons au-delà des programmes officiels pour façonner des individus complets, créatifs et responsables. Car les leaders de demain se façonnent aujourd'hui.",
    en: "From school farming to junior entrepreneurship, we go beyond official programmes to shape complete, creative and responsible individuals. Because tomorrow's leaders are shaped today.",
    ew: "Kobi na agriculture ya sukul tii entrepreneurship ya junior, biso bi lɔ́g na programme ya official a lɛ́g bana ba ne mfañ nyonso, ba nga dzam na ba nga mbɔ́g. Kɔ́l leaders ya ndɔ́ma bi nga lɛ́g lelo.",
  },
  cta: {
    label: {
      fr: "Découvrir notre histoire",
      en: "Discover Our Story",
      ew: "Yiba ntan biso",
    },
    href: "/a-propos",
  },
  directorName: {
    fr: "La Directrice",
    en: "The Principal",
    ew: "Mme Directrice",
  },
  directorRole: {
    fr: "Directrice Générale — Complexe Scolaire Bilingue Les Génies d'Afrique",
    en: "General Director — Bilingual School Complex Les Génies d'Afrique",
    ew: "Directrice Générale — Complexe Scolaire Bilingue Les Génies d'Afrique",
  },
  videoLabel: {
    fr: "Voir notre vidéo de présentation",
    en: "Watch our presentation video",
    ew: "Yiba video biso",
  },
  accreditation: {
    fr: "Agrément MINEDUB 2025",
    en: "MINEDUB Accredited 2025",
    ew: "Agrément MINEDUB 2025",
  },
  since: {
    fr: "Fondé en 2024",
    en: "Founded in 2024",
    ew: "A tɔ́l na 2024",
  },
  videoThumbnail: "/images/IMG-20260723-WA0024.jpg",
  videoFr: "/videos/VID-FR.mp4",
  videoEn: "/videos/VID-EN.mp4",
  decorativeImages: [
    "/images/pexels-ani-ani.jpg",
    "/images/IMG-20260723-WA0039.jpg",
    "/images/pexels-ai25studioai-7342628.jpg",
  ],
};
