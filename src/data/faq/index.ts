import type { FAQItem } from "@/types";

/* ── FAQ Data ───────────────────────────────────────────────────── */
export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    slug: "age-admission",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    question: {
      fr: "À quel âge mon enfant peut-il être admis ?",
      en: "At what age can my child be admitted?",
      ew: "Age ya admission?",
    },
    answer: {
      fr: "L'école accueille les enfants de 0 à 11 ans : crèche (0-2 ans), maternelle (2-5 ans) et primaire (6-11 ans).",
      en: "The school welcomes children aged 0 to 11: day care (0-2 years), nursery (2-5 years) and primary (6-11 years).",
      ew: "Sukul a accept bana 0 tii 11 ans : crèche, maternelle, primaire.",
    },
    category: "admissions",
    order: 1,
    visible: true,
  },
  {
    id: "faq-2",
    slug: "documents-necessaires",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    question: {
      fr: "Quels documents sont nécessaires pour l'inscription ?",
      en: "What documents are needed for enrollment?",
      ew: "Documents ya inscription?",
    },
    answer: {
      fr: "Extrait d'acte de naissance, carnet de vaccinations, 4 photos d'identité, photocopie CNI/passeport des parents, fiche de renseignements.",
      en: "Birth certificate, vaccination booklet, 4 ID photos, copy of parents' ID card/passport, information form.",
      ew: "Acte ya naissance, vaccinations, photos, CNI ya parents, fiche.",
    },
    category: "admissions",
    order: 2,
    visible: true,
  },
  {
    id: "faq-3",
    slug: "horaires",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    question: {
      fr: "Quels sont les horaires de l'école ?",
      en: "What are the school hours?",
      ew: "Hours ya sukul?",
    },
    answer: {
      fr: "L'école est ouverte du lundi au vendredi de 7h30 à 16h00. Les cours ont lieu de 8h00 à 13h00.",
      en: "The school is open Monday to Friday from 7:30 AM to 4:00 PM. Classes run from 8:00 AM to 1:00 PM.",
      ew: "Sukul a open Lɔ́n tii Vɛn 7h30 tii 16h00. Courses 8h00 tii 13h00.",
    },
    category: "general",
    order: 3,
    visible: true,
  },
  {
    id: "faq-4",
    slug: "cantine",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    question: {
      fr: "Y a-t-il une cantine ?",
      en: "Is there a cafeteria?",
      ew: "Cantine a exist?",
    },
    answer: {
      fr: "Oui, une cantine est disponible pour les élèves. Les repas sont préparés sur place avec des produits frais.",
      en: "Yes, a cafeteria is available for students. Meals are prepared on site with fresh products.",
      ew: "Yes, cantine a exist. Meals a prepared na fresh products.",
    },
    category: "general",
    order: 4,
    visible: true,
  },
  {
    id: "faq-5",
    slug: "transport",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    question: {
      fr: "Y a-t-il un service de transport scolaire ?",
      en: "Is there a school bus service?",
      ew: "Transport scolaire?",
    },
    answer: {
      fr: "Pour le moment, nous n'avons pas de service de transport scolaire. Les parents doivent assurer le transport de leurs enfants.",
      en: "Currently, we do not have a school bus service. Parents must arrange their children's transportation.",
      ew: "Transport scolaire a exist pas. Parents bi lɔ́g transport.",
    },
    category: "general",
    order: 5,
    visible: true,
  },
];

/* ── Get FAQ Functions ──────────────────────────────────────────── */
export function getFAQ(): FAQItem[] {
  return FAQ_DATA.filter((f) => f.visible && f.status === "published").sort((a, b) => a.order - b.order);
}

export function getFAQByCategory(category: string): FAQItem[] {
  if (category === "all") return getFAQ();
  return FAQ_DATA.filter((f) => f.category === category && f.visible && f.status === "published").sort((a, b) => a.order - b.order);
}
