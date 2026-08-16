import type { LocalizedText } from "@/types";

/* ── Statistics Item Configuration ─────────────────────────────────── */
export interface StatisticItem {
  id: string;
  value: string;
  suffix: string;
  label: LocalizedText;
  sublabel: LocalizedText;
  icon: string;
  visible: boolean;
  order: number;
}

/* ── Statistics Data ───────────────────────────────────────────────── */
export const STATISTICS_DATA: StatisticItem[] = [
  {
    id: "stat-students",
    value: "120",
    suffix: "+",
    label: {
      fr: "Élèves inscrits",
      en: "Enrolled students",
      ew: "Bana ba tɔ́l",
    },
    sublabel: {
      fr: "Enrolled students",
      en: "Bana ba tɔ́l",
      ew: "Élèves inscrits",
    },
    icon: "Users",
    visible: true,
    order: 1,
  },
  {
    id: "stat-teachers",
    value: "12",
    suffix: "",
    label: {
      fr: "Enseignants qualifiés",
      en: "Qualified teachers",
      ew: "Basa ba akom",
    },
    sublabel: {
      fr: "Qualified teachers",
      en: "Basa ba akom",
      ew: "Enseignants qualifiés",
    },
    icon: "GraduationCap",
    visible: true,
    order: 2,
  },
  {
    id: "stat-experience",
    value: "2",
    suffix: "",
    label: {
      fr: "Années d'expérience",
      en: "Years of experience",
      ew: "Osu ya akom",
    },
    sublabel: {
      fr: "Years of experience",
      en: "Osu ya akom",
      ew: "Années d'expérience",
    },
    icon: "Calendar",
    visible: true,
    order: 3,
  },
  {
    id: "stat-clubs",
    value: "6",
    suffix: "",
    label: {
      fr: "Clubs scolaires",
      en: "School clubs",
      ew: "Clubs ya sukul",
    },
    sublabel: {
      fr: "School clubs",
      en: "Clubs ya sukul",
      ew: "Clubs scolaires",
    },
    icon: "Star",
    visible: true,
    order: 4,
  },
  {
    id: "stat-activities",
    value: "10",
    suffix: "+",
    label: {
      fr: "Activités extrascolaires",
      en: "Extracurricular activities",
      ew: "Bisala ya mvog sukul",
    },
    sublabel: {
      fr: "Extracurricular activities",
      en: "Bisala ya mvog sukul",
      ew: "Activités extrascolaires",
    },
    icon: "Zap",
    visible: true,
    order: 5,
  },
];

/* ── Statistics Section Configuration ───────────────────────────────── */
export const STATISTICS_CONFIG = {
  backgroundImage: "https://res.cloudinary.com/dyetkan86/image/upload/v1786839369/file_000000004cfc820e87343ca75a6e0ce2_kulqmd.png",
  badge: {
    fr: "Les Génies d'Afrique par les chiffres",
    en: "Les Génies d'Afrique by the Numbers",
    ew: "Les Génies d'Afrique na bikɔ́l",
  },
  title: {
    fr: "Des chiffres qui parlent d'eux-mêmes",
    en: "Numbers that speak for themselves",
    ew: "Bikɔ́l bi a kɔ́l",
  },
  subtitle: {
    fr: "Une école qui grandit, une communauté qui s'engage.",
    en: "A school that grows, a community that commits.",
    ew: "Sukul a nga kɔ́l, mbog a nga bɔ́g.",
  },
};
