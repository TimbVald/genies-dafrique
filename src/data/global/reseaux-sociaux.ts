/**
 * Réseaux sociaux — Les Génies d'Afrique
 * ────────────────────────────────────────
 * Source unique de vérité pour tous les liens sociaux du site.
 * Footer, page Contact et tout composant futur doivent importer
 * uniquement depuis ce fichier — jamais hardcoder les URLs.
 *
 * Pour mettre à jour un lien ou le message WhatsApp :
 * modifier uniquement ce fichier.
 */

export interface SocialLink {
  /** Identifiant de la plateforme — stable, utilisé comme key React */
  id: "whatsapp" | "facebook" | "tiktok" | "email";
  /** Nom affiché (aria-label, légende) */
  label: {
    fr: string;
    en: string;
    ew: string;
  };
  /** URL de base (sans paramètres dynamiques) */
  url: string;
  /** true = ouvrir dans un nouvel onglet */
  external: boolean;
  /** Couleur de marque pour le hover */
  brandColor: string;
  /** Afficher ou masquer */
  visible: boolean;
  /** Ordre d'affichage (1 = premier) */
  order: number;
}

/* ── Numéro WhatsApp de l'établissement ─────────────────────────── */
const WHATSAPP_NUMBER = "237651111506"; // format international sans +

/**
 * Messages WhatsApp pré-définis par langue.
 * Quand un visiteur clique sur un lien WhatsApp, ce message
 * s'affiche automatiquement dans la zone de saisie.
 *
 * → Pour modifier le message : changer uniquement ces valeurs.
 */
export const WHATSAPP_MESSAGES = {
  fr: "Bonjour, je suis intéressé(e) par l'école Les Génies d'Afrique. Pourriez-vous m'informer sur les inscriptions et les frais de scolarité ? Merci.",
  en: "Hello, I am interested in Les Génies d'Afrique school. Could you provide information about enrolment and tuition fees? Thank you.",
  ew: "Mbolo, ma jɔ́l sukul ya Les Génies d'Afrique. A yeme ngai mfañ na inscription na mimbɔ́g ya sukul? Kolé.",
} as const;

/**
 * Construit l'URL WhatsApp complète avec message pré-défini.
 * @param locale - code langue : "fr" | "en" | "ew"
 * @returns URL encodée prête à utiliser dans un href
 */
export function getWhatsAppUrl(locale: "fr" | "en" | "ew" = "fr"): string {
  const msg = WHATSAPP_MESSAGES[locale] ?? WHATSAPP_MESSAGES.fr;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/* ── Données réelles — à maintenir ici uniquement ──────────────── */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id:         "whatsapp",
    // URL de base — les composants appellent getWhatsAppUrl(locale)
    // pour avoir le message localisé
    url:        `https://wa.me/${WHATSAPP_NUMBER}`,
    external:   true,
    brandColor: "#25D366",
    visible:    true,
    order:      1,
    label: {
      fr: "Nous écrire sur WhatsApp",
      en: "Message us on WhatsApp",
      ew: "Tɔ́l mfañ na WhatsApp",
    },
  },
  {
    id:         "facebook",
    url:        "https://www.facebook.com/share/1PzKtpzfF9/?mibextid=wwXIfr",
    external:   true,
    brandColor: "#1877F2",
    visible:    true,
    order:      2,
    label: {
      fr: "Suivez-nous sur Facebook",
      en: "Follow us on Facebook",
      ew: "Yiba biso na Facebook",
    },
  },
  {
    id:         "tiktok",
    url:        "https://www.tiktok.com/@les_genies_dafrique?_r=1&_t=ZS-93y1R6iTwaS",
    external:   true,
    brandColor: "#000000",
    visible:    true,
    order:      3,
    label: {
      fr: "Suivez-nous sur TikTok",
      en: "Follow us on TikTok",
      ew: "Yiba biso na TikTok",
    },
  },
  {
    id:         "email",
    url:        "mailto:lesgeniesdafrique836@gmail.com",
    external:   false,
    brandColor: "#D32F2F",
    visible:    true,
    order:      4,
    label: {
      fr: "Nous envoyer un email",
      en: "Send us an email",
      ew: "Tɔ́l email na biso",
    },
  },
];

/* ── Fonctions de service ───────────────────────────────────────── */

/** Retourne tous les liens sociaux visibles triés par ordre */
export function getSocialLinks(): SocialLink[] {
  return SOCIAL_LINKS
    .filter(s => s.visible)
    .sort((a, b) => a.order - b.order);
}

/** Retourne un lien social par son id */
export function getSocialLink(id: SocialLink["id"]): SocialLink | undefined {
  return SOCIAL_LINKS.find(s => s.id === id && s.visible);
}
