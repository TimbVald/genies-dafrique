import type { LocalizedText } from "@/types";

/* ── Hero Slide Configuration ─────────────────────────────────────── */
export interface HeroSlide {
  id: string;
  image: string;
  position: string; // CSS object-position value
  kenFrom: string; // CSS transform for Ken Burns effect start
  kenTo: string;   // CSS transform for Ken Burns effect end
  visible: boolean;
  order: number;
}

/* ── Hero Content Configuration ───────────────────────────────────── */
export interface HeroContent {
  badge: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  primaryCta: {
    label: LocalizedText;
    href: string;
  };
  secondaryCta: {
    label: LocalizedText;
    href: string;
  };
  scrollHint: LocalizedText;
  videoLabel: LocalizedText;
}

/* ── Hero Slides Data ─────────────────────────────────────────────── */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-slide-1",
    image: "/images/IMG-20260723-WA0024.jpg",
    position: "center 20%",
    kenFrom: "scale(1.08) translateY(-2%)",
    kenTo: "scale(1.0)  translateY(2%)",
    visible: true,
    order: 1,
  },
  {
    id: "hero-slide-2",
    image: "/images/pexels-ani-ani.jpg",
    position: "center 15%",
    kenFrom: "scale(1.06) translateY(-1%)",
    kenTo: "scale(1.0)  translateY(3%)",
    visible: true,
    order: 2,
  },
  {
    id: "hero-slide-3",
    image: "/images/pexels-ai25studioai-7342628.jpg",
    position: "center 30%",
    kenFrom: "scale(1.07) translateY(0%)",
    kenTo: "scale(1.0)  translateY(4%)",
    visible: true,
    order: 3,
  },
];

/* ── Hero Content Data ────────────────────────────────────────────── */
export const HERO_CONTENT: HeroContent = {
  badge: {
    fr: "École bilingue d'excellence · Nkozoa, Yaoundé",
    en: "Bilingual School of Excellence · Nkozoa, Yaoundé",
    ew: "Sukul bilingue ya excellence · Nkozoa, Yaoundé",
  },
  title: {
    fr: "Former aujourd'hui les leaders de demain",
    en: "Shaping today's leaders for tomorrow",
    ew: "Bongwan amu mintô mi kië",
  },
  subtitle: {
    fr: "Un environnement d'excellence bilingue pour l'épanouissement complet de votre enfant — de la crèche au primaire.",
    en: "A bilingual excellence environment for your child's total development — from day care to primary school.",
    ew: "Akia ya bilingue ya excellence amu a yɔ́k mwana nyonso na mfañ — kobi na crèche tii primaire.",
  },
  primaryCta: {
    label: {
      fr: "Inscrire mon enfant",
      en: "Enroll My Child",
      ew: "Bengane mwana",
    },
    href: "/admissions",
  },
  secondaryCta: {
    label: {
      fr: "Découvrir notre école",
      en: "Discover Our School",
      ew: "Yiba sukul biso",
    },
    href: "/a-propos",
  },
  scrollHint: {
    fr: "Défiler",
    en: "Scroll",
    ew: "Sɔ́m",
  },
  videoLabel: {
    fr: "Voir notre vidéo de présentation",
    en: "Watch our presentation video",
    ew: "Yiba video biso",
  },
};

/* ── Hero Configuration ───────────────────────────────────────────── */
export const HERO_CONFIG = {
  slideDuration: 7000, // ms per slide
  transitionDuration: 1600, // ms for crossfade
  autoplay: true,
  pauseOnHover: true,
};
