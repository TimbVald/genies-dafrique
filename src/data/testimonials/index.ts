import type { LocalizedText, BaseContent } from "@/types";

/* ── Testimonial Item Configuration ───────────────────────────────── */
export interface TestimonialItem extends BaseContent {
  name: LocalizedText;
  role: LocalizedText;
  text: LocalizedText;
  stars: number;
  featured: boolean;
  visible: boolean;
  order: number;
}

/* ── Testimonials Data ─────────────────────────────────────────────── */
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "testimonial-1",
    slug: "testimonial-maman-sarah",
    status: "published",
    createdAt: "2025-01-15T00:00:00Z",
    name: {
      fr: "Sarah M.",
      en: "Sarah M.",
      ew: "Sarah M.",
    },
    role: {
      fr: "Maman d'élève en CP1",
      en: "CP1 Parent",
      ew: "Mama wa bana wa CP1",
    },
    text: {
      fr: "Depuis que mon fils fréquente Les Génies d'Afrique, j'ai remarqué une amélioration spectaculaire dans son niveau de français et d'anglais. Les enseignants sont dévoués et l'environnement est propice à l'apprentissage.",
      en: "Since my son started attending Les Génies d'Afrique, I've noticed a spectacular improvement in his French and English levels. The teachers are dedicated and the environment is conducive to learning.",
      ew: "Kɔ́kɔ́ mwa mwa a kɔ́l na Les Génies d'Afrique, ma ye ɓɔl amelioration ya minene na français na anglais na be. Basa ba akom ba ne dedication na environment a ne amus amu akom.",
    },
    stars: 5,
    featured: true,
    visible: true,
    order: 1,
  },
  {
    id: "testimonial-2",
    slug: "testimonial-papa-jean",
    status: "published",
    createdAt: "2025-02-20T00:00:00Z",
    name: {
      fr: "Jean-Pierre K.",
      en: "Jean-Pierre K.",
      ew: "Jean-Pierre K.",
    },
    role: {
      fr: "Papa d'élève en CE2",
      en: "CE2 Parent",
      ew: "Papa wa bana wa CE2",
    },
    text: {
      fr: "L'approche bilingue est vraiment exceptionnelle. Ma fille parle maintenant couramment les deux langues et développe une ouverture d'esprit remarquable. Je recommande vivement cette école.",
      en: "The bilingual approach is truly exceptional. My daughter now speaks both languages fluently and develops a remarkable openness of mind. I highly recommend this school.",
      ew: "Minsili ya bilingue a ne minene kɔ́kɔ́. Mwa mwa a kɔ́l lokota mibuma mbaba a ne dzam ya mvoé. Ma kɔ́l sukul yi kɔ́kɔ́.",
    },
    stars: 5,
    featured: true,
    visible: true,
    order: 2,
  },
  {
    id: "testimonial-3",
    slug: "testimonial-maman-marie",
    status: "published",
    createdAt: "2025-03-10T00:00:00Z",
    name: {
      fr: "Marie-Claire N.",
      en: "Marie-Claire N.",
      ew: "Marie-Claire N.",
    },
    role: {
      fr: "Maman d'élève en maternelle",
      en: "Nursery Parent",
      ew: "Mama wa bana wa maternelle",
    },
    text: {
      fr: "Les valeurs enseignées à l'école — discipline, respect, excellence — se reflètent dans le comportement de mon enfant à la maison. C'est plus qu'une école, c'est une véritable famille éducative.",
      en: "The values taught at school — discipline, respect, excellence — are reflected in my child's behavior at home. It's more than a school, it's a true educational family.",
      ew: "Mekat ma akom kɔ́l na sukul — dzam, mbɔ́g, nyɔ́ñ — ma ye na be na mfañ ya mwa mwa na nɔ́n. A nyɔ́n kɔ́l sukul, a ne mbog ya akom ya mvoé.",
    },
    stars: 5,
    featured: false,
    visible: true,
    order: 3,
  },
];

/* ── Get Featured Testimonials Function ───────────────────────────── */
export function getFeaturedTestimonials(): TestimonialItem[] {
  return TESTIMONIALS_DATA.filter(
    (t) => t.featured && t.visible && t.status === "published"
  );
}

/* ── Get All Visible Testimonials Function ────────────────────────── */
export function getVisibleTestimonials(): TestimonialItem[] {
  return TESTIMONIALS_DATA.filter(
    (t) => t.visible && t.status === "published"
  ).sort((a, b) => a.order - b.order);
}
