/**
 * Base de connaissance du chatbot FAQ
 * ─────────────────────────────────────
 * Source unique de vérité pour les réponses automatiques du chatbot.
 * Le composant ChatbotFab.tsx lit uniquement ce fichier.
 *
 * Structure :
 * - keywords  : mots-clés déclencheurs (minuscules, sans accents pour la robustesse)
 * - answer    : réponse localisée FR / EN / EW
 * - links     : (optionnel) liens d'action rattachés à la réponse
 * - category  : catégorie pour le filtrage
 *
 * Pour ajouter une question → ajouter une entrée dans CHATBOT_FAQ.
 * Pour modifier une réponse → changer uniquement le champ `answer`.
 */

export type Locale = "fr" | "en" | "ew";

export interface ChatbotLink {
  /** Libellé affiché sur le bouton */
  label: Record<Locale, string>;
  /** Chemin interne (/admissions) ou URL externe */
  href: string;
  /** true = ouvrir dans un nouvel onglet */
  external?: boolean;
}

export interface ChatbotFAQEntry {
  id: string;
  /** Mots-clés en minuscules sans accent — testés sur la saisie normalisée */
  keywords: string[];
  /** Réponse localisée */
  answer: Record<Locale, string>;
  /** Liens d'action optionnels affichés sous la réponse */
  links?: ChatbotLink[];
  /** Catégorie — pour les suggestions rapides */
  category: "admissions" | "formations" | "horaires" | "localisation" | "frais" | "general";
}

/* ══════════════════════════════════════════════════════════════════
   BASE DE CONNAISSANCE
   ══════════════════════════════════════════════════════════════════ */
export const CHATBOT_FAQ: ChatbotFAQEntry[] = [

  /* ── Salutations ─────────────────────────────────────────────── */
  {
    id:       "bonjour",
    keywords: ["bonjour", "bonsoir", "salut", "hello", "hi", "hey", "mbolo", "allo"],
    category: "general",
    answer: {
      fr: "Bonjour ! Je suis l'assistant virtuel des Génies d'Afrique. Je peux répondre à vos questions sur les inscriptions, les formations, les horaires, la localisation et bien plus. Comment puis-je vous aider ?",
      en: "Hello! I am the virtual assistant for Les Génies d'Afrique. I can answer questions about enrolment, programmes, school hours, location and more. How can I help you?",
      ew: "Mbolo! Ma ne assistant ya Les Génies d'Afrique. Nzɔ́g ya mfañ: inscription, bikɔ́l, minsan, ase. Ma yeme mfañ?",
    },
  },

  /* ── Inscription / Admissions ────────────────────────────────── */
  {
    id:       "inscription",
    keywords: [
      "inscription", "inscriptions", "inscrire", "enroll", "enrollment", "enrolment",
      "register", "registration", "admission", "admissions", "dossier", "candidature",
      "comment s'inscrire", "tɔ́l mwana sukul", "bengane",
    ],
    category: "admissions",
    answer: {
      fr: "Pour inscrire votre enfant :\n1. Constituez le dossier (acte de naissance, carnet de vaccinations, 4 photos d'identité, copie CNI des parents).\n2. Déposez-le au secrétariat du lundi au vendredi, de 8h00 à 13h00.\n3. Un entretien avec la direction est organisé.\n4. Confirmation et paiement des frais.",
      en: "To enrol your child:\n1. Prepare the file (birth certificate, vaccination booklet, 4 ID photos, copy of parent's ID).\n2. Submit it at the school office, Monday to Friday, 8:00 AM – 1:00 PM.\n3. An interview with the principal is arranged.\n4. Confirmation and payment of fees.",
      ew: "A tɔ́l mwana sukul:\n1. Lɛ́g dossier (acte ya naissance, vaccinations, 4 photos, CNI ya parents).\n2. Tɔ́l na secrétariat Mvul tii Mvul 8h–13h.\n3. Mvog na direction.\n4. Confirmation na mimbɔ́g.",
    },
    links: [
      {
        label: { fr: "Voir la page Admissions", en: "View Admissions page", ew: "Yiba page ya Admissions" },
        href: "/admissions",
      },
    ],
  },

  /* ── Documents requis ────────────────────────────────────────── */
  {
    id:       "documents",
    keywords: [
      "documents", "document", "pièces", "pieces", "dossier", "fichiers",
      "acte de naissance", "naissance", "vaccination", "vaccinations", "photo",
      "cni", "passeport", "birth certificate", "biyem",
    ],
    category: "admissions",
    answer: {
      fr: "Le dossier d'inscription comprend :\n• Extrait d'acte de naissance\n• Carnet de vaccinations à jour\n• 4 photos d'identité récentes\n• Photocopie de la CNI ou passeport des parents/tuteurs\n• Fiche de renseignements (fournie par l'école)\n• Bulletins scolaires des 2 dernières années (à partir du CP)",
      en: "The enrolment file includes:\n• Birth certificate\n• Up-to-date vaccination booklet\n• 4 recent ID photos\n• Copy of parent/guardian's ID card or passport\n• Information form (provided by the school)\n• Last 2 years' report cards (from Grade 1 onwards)",
      ew: "Dossier ya inscription:\n• Acte ya naissance\n• Vaccinations\n• 4 photos\n• CNI na passport ya parents\n• Fiche ya sukul\n• Bulletins ya 2 osu (kobi CP)",
    },
    links: [
      {
        label: { fr: "Admissions & documents", en: "Admissions & documents", ew: "Admissions & documents" },
        href: "/admissions",
      },
    ],
  },

  /* ── Formations / Niveaux ────────────────────────────────────── */
  {
    id:       "formations",
    keywords: [
      "formation", "formations", "niveau", "niveaux", "programme", "programmes",
      "cycle", "creche", "crèche", "maternelle", "primaire", "cp", "ce1", "ce2",
      "cm1", "cm2", "class", "nursery", "day care", "daycare", "section",
      "francophone", "anglophone", "bilingue", "bilingual", "mekol", "bikɔ́l",
    ],
    category: "formations",
    answer: {
      fr: "Nous proposons 4 niveaux bilingues (FR/EN) :\n• 🍼 Crèche : 0–2 ans\n• 🌱 Maternelle : 2–5 ans (PS, MS, GS)\n• 🇫🇷 Primaire Francophone : CP au CM2 (6–12 ans)\n• 🇬🇧 Primaire Anglophone : Class 1 à Class 6 (6–12 ans)\nChaque section suit le programme officiel MINEDUB enrichi d'une immersion dans la seconde langue.",
      en: "We offer 4 bilingual levels (FR/EN):\n• 🍼 Day Care: 0–2 years\n• 🌱 Nursery: 2–5 years (PS, MS, GS)\n• 🇫🇷 French Primary: CP to CM2 (6–12 years)\n• 🇬🇧 English Primary: Class 1 to Class 6 (6–12 years)\nEach section follows the official MINEDUB curriculum enriched with immersion in the second language.",
      ew: "Bikɔ́l bya biso 4 (bilingue FR/EN):\n• 🍼 Crèche: 0–2 ans\n• 🌱 Maternelle: 2–5 ans\n• 🇫🇷 Primaire Francophone: CP–CM2\n• 🇬🇧 Primaire Anglophone: Class 1–6\nProgramme MINEDUB + minsili mibuma.",
    },
    links: [
      {
        label: { fr: "Voir nos formations", en: "View our programmes", ew: "A yen bikɔ́l bya biso" },
        href: "/formations",
      },
    ],
  },

  /* ── Frais de scolarité ──────────────────────────────────────── */
  {
    id:       "frais",
    keywords: [
      "frais", "scolarité", "cout", "coût", "tarif", "tarifs", "prix", "combien",
      "fees", "tuition", "cost", "price", "how much", "mimbɔ́g", "argent",
      "paiement", "payment", "mensualité",
    ],
    category: "frais",
    answer: {
      fr: "La grille tarifaire détaillée est remise à chaque famille lors de la visite de l'établissement. Les frais varient selon le niveau et la section. Pour obtenir un devis personnalisé, contactez-nous directement.",
      en: "The full fee schedule is provided to each family during a school visit. Fees vary by level and section. Contact us directly for a personalised quote.",
      ew: "Mimbɔ́g ya sukul a yeme na fam nyonso a mvɔ́l a yen sukul. Kɔ́bɔ́talane na biso a zɔ́k mfañ.",
    },
    links: [
      {
        label: { fr: "Nous contacter", en: "Contact us", ew: "Kɔ́bɔ́talane na biso" },
        href: "/contact",
      },
      {
        label: { fr: "Écrire sur WhatsApp", en: "Message on WhatsApp", ew: "Tɔ́l mfañ na WhatsApp" },
        href: "https://wa.me/237651111506",
        external: true,
      },
    ],
  },

  /* ── Horaires ────────────────────────────────────────────────── */
  {
    id:       "horaires",
    keywords: [
      "horaire", "horaires", "heure", "heures", "ouverture", "fermeture",
      "schedule", "hours", "time", "quand", "matin", "après-midi", "apres-midi",
      "minsan", "njam", "cours", "classes",
    ],
    category: "horaires",
    answer: {
      fr: "🕐 Horaires de l'établissement :\n• Accueil des élèves : 7h30\n• Cours : 8h00 – 13h00\n• Gardiennage : jusqu'à 16h00\n• Secrétariat (inscriptions) : Lun–Ven, 8h00–13h00",
      en: "🕐 School hours:\n• Student reception: 7:30 AM\n• Classes: 8:00 AM – 1:00 PM\n• After-school care: until 4:00 PM\n• Admissions office: Mon–Fri, 8:00 AM – 1:00 PM",
      ew: "🕐 Minsan ya sukul:\n• A zɔ́k bana: 7h30\n• Cours: 8h00–13h00\n• Gardiennage: tii 16h00\n• Secrétariat: Mvul–Mvul 8h–13h",
    },
  },

  /* ── Localisation / Adresse ──────────────────────────────────── */
  {
    id:       "localisation",
    keywords: [
      "adresse", "localisation", "où", "ou", "situe", "situé", "trouvé", "trouve",
      "nkozoa", "yaoundé", "yaounde", "cameroun", "cameroon", "boulangerie",
      "massa", "itinéraire", "itineraire", "chemin", "direction",
      "address", "location", "where", "how to get", "ase", "endroit",
    ],
    category: "localisation",
    answer: {
      fr: "📍 L'école est située à Nkozoa, derrière la Boulangerie Massa — Yaoundé, Cameroun.\nFacile d'accès depuis tous les quartiers de Yaoundé.",
      en: "📍 The school is located in Nkozoa, behind Boulangerie Massa — Yaoundé, Cameroon.\nEasily accessible from all districts of Yaoundé.",
      ew: "📍 Sukul a ne na Nkozoa, nyuma ya Boulangerie Massa — Yaoundé, Kamerun.",
    },
    links: [
      {
        label: { fr: "Voir sur Google Maps", en: "View on Google Maps", ew: "A yen na Google Maps" },
        href: "https://maps.app.goo.gl/b6r6PyYzXz8Meeoh6",
        external: true,
      },
    ],
  },

  /* ── Contact / Téléphone ─────────────────────────────────────── */
  {
    id:       "contact",
    keywords: [
      "contact", "telephone", "téléphone", "appeler", "appel", "numéro",
      "numero", "email", "mail", "joindre", "joindrable",
      "call", "phone", "reach", "get in touch",
      "kɔ́bɔ́talane", "somin",
    ],
    category: "general",
    answer: {
      fr: "📞 Téléphones : 651 11 15 06 / 656 66 38 48\n📧 Email : lesgeniesdafrique836@gmail.com\n⏰ Disponibles : Lun–Ven, 8h00–13h00",
      en: "📞 Phone: 651 11 15 06 / 656 66 38 48\n📧 Email: lesgeniesdafrique836@gmail.com\n⏰ Available: Mon–Fri, 8:00 AM – 1:00 PM",
      ew: "📞 Téléphone: 651 11 15 06 / 656 66 38 48\n📧 Email: lesgeniesdafrique836@gmail.com\n⏰ Mvul–Mvul 8h–13h",
    },
    links: [
      {
        label: { fr: "Page Contact", en: "Contact page", ew: "Page ya Contact" },
        href: "/contact",
      },
    ],
  },

  /* ── Cantine ─────────────────────────────────────────────────── */
  {
    id:       "cantine",
    keywords: [
      "cantine", "repas", "dejeuner", "déjeuner", "manger", "nourriture",
      "cafeteria", "lunch", "food", "meal", "bilɔ́g",
    ],
    category: "general",
    answer: {
      fr: "🍽️ Oui, une cantine scolaire est disponible pour tous les élèves. Les repas sont préparés sur place avec des produits frais et équilibrés. Le menu est affiché chaque semaine.",
      en: "🍽️ Yes, a school cafeteria is available for all students. Meals are prepared on site with fresh, balanced ingredients. The weekly menu is posted each week.",
      ew: "🍽️ Yes, cantine a exist amu bana nyonso. Bilɔ́g bi nga bɔ́g ayi na sukul na products ya mvoé.",
    },
  },

  /* ── Transport ───────────────────────────────────────────────── */
  {
    id:       "transport",
    keywords: [
      "transport", "bus", "navette", "voiture", "ramassage", "scolaire",
      "school bus", "pickup", "drop", "commute",
    ],
    category: "general",
    answer: {
      fr: "🚌 Pour le moment, l'école ne dispose pas de service de transport scolaire. Les parents organisent le déplacement de leurs enfants. Un gardiennage est possible jusqu'à 16h00.",
      en: "🚌 The school currently does not have a bus service. Parents arrange their children's transport. After-school care is available until 4:00 PM.",
      ew: "🚌 Transport scolaire a exist pas. Parents bi lɔ́g transport ya bana. Gardiennage tii 16h00.",
    },
  },

  /* ── Âge d'admission ─────────────────────────────────────────── */
  {
    id:       "age",
    keywords: [
      "age", "âge", "ans", "quel age", "minimum", "maximum", "bébé", "bebe",
      "nourrisson", "enfant", "tout-petit", "years old", "how old",
      "mvula", "mwana",
    ],
    category: "admissions",
    answer: {
      fr: "Nous accueillons les enfants dès 0 an jusqu'à 12 ans :\n• Crèche : 0–2 ans\n• Maternelle : 2–5 ans\n• Primaire : 6–12 ans\nPas de limite supérieure pour les inscriptions tardives — chaque cas est étudié.",
      en: "We welcome children from 0 to 12 years old:\n• Day Care: 0–2 years\n• Nursery: 2–5 years\n• Primary: 6–12 years\nLate enrolments are assessed on a case-by-case basis.",
      ew: "Biso bi zɔ́k bana 0 tii 12 ans:\n• Crèche: 0–2 ans\n• Maternelle: 2–5 ans\n• Primaire: 6–12 ans",
    },
  },

  /* ── Agrément / Accréditation ────────────────────────────────── */
  {
    id:       "agrement",
    keywords: [
      "agréé", "agree", "agrément", "agrement", "accrédité", "accredite",
      "minedub", "officiel", "reconnu", "certifié", "certifie",
      "accredited", "official", "recognized", "arrêté",
    ],
    category: "general",
    answer: {
      fr: "✅ L'établissement est officiellement agréé par le MINEDUB (Ministère de l'Éducation de Base du Cameroun) depuis le 14 février 2025 — Arrêté N°103/j1/7/A/MINEDUB/SG/DSEPB/SDAAP.",
      en: "✅ The school has been officially accredited by MINEDUB (Cameroon Ministry of Basic Education) since 14 February 2025 — Order No. 103/j1/7/A/MINEDUB/SG/DSEPB/SDAAP.",
      ew: "✅ Sukul a nga yen agrément ya MINEDUB na 14 février 2025 — Arrêté N°103/j1/7/A/MINEDUB/SG/DSEPB/SDAAP.",
    },
  },

  /* ── Bilinguisme ─────────────────────────────────────────────── */
  {
    id:       "bilinguisme",
    keywords: [
      "bilingue", "bilingual", "bilinguisme", "français", "anglais", "french",
      "english", "langue", "language", "francophone", "anglophone", "minsili",
    ],
    category: "formations",
    answer: {
      fr: "L'école propose un enseignement bilingue complet dès la crèche :\n🇫🇷 Section Francophone : cours en français avec anglais renforcé (4h/semaine dès le CP)\n🇬🇧 Section Anglophone : cours en anglais avec français comme langue seconde renforcée\nL'objectif : maîtriser les deux langues à l'entrée dans le secondaire.",
      en: "The school offers full bilingual education from Day Care:\n🇫🇷 French Section: classes in French with intensive English (4h/week from Grade 1)\n🇬🇧 English Section: classes in English with reinforced French as a second language\nThe goal: mastery of both languages before secondary school.",
      ew: "Sukul a ne bilingue a tɔ́l crèche:\n🇫🇷 Francophone: français + anglais (4h/semaine)\n🇬🇧 Anglophone: anglais + français\nMvon: a yeme minsili mibuma iba a mvoé.",
    },
  },

  /* ── Réseaux sociaux ─────────────────────────────────────────── */
  {
    id:       "reseaux",
    keywords: [
      "facebook", "tiktok", "instagram", "réseau", "reseaux", "social",
      "suivre", "follow", "page", "compte", "account",
    ],
    category: "general",
    answer: {
      fr: "Retrouvez l'école sur les réseaux sociaux :\n📘 Facebook : facebook.com/share/1PzKtpzfF9\n🎵 TikTok : @les_genies_dafrique",
      en: "Follow the school on social media:\n📘 Facebook: facebook.com/share/1PzKtpzfF9\n🎵 TikTok: @les_genies_dafrique",
      ew: "Yiba biso na réseaux:\n📘 Facebook: facebook.com/share/1PzKtpzfF9\n🎵 TikTok: @les_genies_dafrique",
    },
    links: [
      {
        label: { fr: "Facebook", en: "Facebook", ew: "Facebook" },
        href: "https://www.facebook.com/share/1PzKtpzfF9/?mibextid=wwXIfr",
        external: true,
      },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════════
   MOTEUR DE RECHERCHE — normalisation + matching par mots-clés
   ══════════════════════════════════════════════════════════════════ */

/** Normalise une chaîne : minuscules, sans accents, sans ponctuation */
export function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // supprime les diacritiques
    .replace(/[^a-z0-9\s]/g, " ")   // ponctuation → espace
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Cherche la meilleure réponse pour une saisie utilisateur.
 * Retourne l'entrée avec le plus grand nombre de mots-clés correspondants.
 * Retourne null si aucun mot-clé ne correspond.
 */
export function findBestMatch(input: string): ChatbotFAQEntry | null {
  const normalized = normalize(input);
  const words = normalized.split(" ");

  let bestMatch: ChatbotFAQEntry | null = null;
  let bestScore = 0;

  for (const entry of CHATBOT_FAQ) {
    let score = 0;
    for (const keyword of entry.keywords) {
      const normKw = normalize(keyword);
      // Correspondance exacte du keyword dans la saisie normalisée
      if (normalized.includes(normKw)) {
        // Bonus si le keyword est long (évite les faux positifs sur mots courts)
        score += normKw.length >= 4 ? 2 : 1;
      }
      // Correspondance d'un mot individuel
      for (const word of words) {
        if (word.length >= 3 && normKw === word) {
          score += 1;
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestScore >= 1 ? bestMatch : null;
}

/* ── Suggestions rapides affichées au démarrage ─────────────────── */
export const QUICK_SUGGESTIONS: Record<Locale, string[]> = {
  fr: [
    "Comment s'inscrire ?",
    "Quels niveaux proposez-vous ?",
    "Quels sont les horaires ?",
    "Où est l'école ?",
    "Quels sont les frais ?",
  ],
  en: [
    "How to enrol?",
    "What levels do you offer?",
    "What are the school hours?",
    "Where is the school?",
    "What are the fees?",
  ],
  ew: [
    "A tɔ́l mwana sukul?",
    "Bikɔ́l bya nkan?",
    "Minsan ya sukul?",
    "Sukul a ne ase?",
    "Mimbɔ́g ya sukul?",
  ],
};

/* ── Messages d'interface localisés ────────────────────────────── */
export const CHATBOT_UI: Record<Locale, {
  title: string;
  placeholder: string;
  send: string;
  welcome: string;
  notFound: string;
  contactPrompt: string;
  contactBtn: string;
  whatsappBtn: string;
  ariaOpen: string;
  ariaClose: string;
  suggestionsLabel: string;
}> = {
  fr: {
    title:          "Assistant Génies d'Afrique",
    placeholder:    "Posez votre question…",
    send:           "Envoyer",
    welcome:        "Bonjour ! Comment puis-je vous aider ? Voici quelques questions fréquentes :",
    notFound:       "Je n'ai pas de réponse précise à cette question. Notre équipe peut vous renseigner directement :",
    contactPrompt:  "Besoin d'aide supplémentaire ?",
    contactBtn:     "Formulaire de contact",
    whatsappBtn:    "Écrire sur WhatsApp",
    ariaOpen:       "Ouvrir le chatbot",
    ariaClose:      "Fermer le chatbot",
    suggestionsLabel: "Questions fréquentes",
  },
  en: {
    title:          "Les Génies d'Afrique Assistant",
    placeholder:    "Ask your question…",
    send:           "Send",
    welcome:        "Hello! How can I help you? Here are some frequently asked questions:",
    notFound:       "I don't have a precise answer to that question. Our team can help you directly:",
    contactPrompt:  "Need more help?",
    contactBtn:     "Contact form",
    whatsappBtn:    "Message on WhatsApp",
    ariaOpen:       "Open chatbot",
    ariaClose:      "Close chatbot",
    suggestionsLabel: "Frequently asked questions",
  },
  ew: {
    title:          "Assistant ya Génies d'Afrique",
    placeholder:    "Tɔ́l minkɔ́bɔ́ wua…",
    send:           "Tɔ́l",
    welcome:        "Mbolo! Nzɔ́g ya mfañ? Minkɔ́bɔ́ mi jɔ́l mingi:",
    notFound:       "Ma ne te a jɔ́l minkɔ́bɔ́ wua. Bikɔ́l bya biso bi yeme mfañ:",
    contactPrompt:  "Mfañ mingi?",
    contactBtn:     "Formulaire ya contact",
    whatsappBtn:    "Tɔ́l mfañ na WhatsApp",
    ariaOpen:       "Yib chatbot",
    ariaClose:      "Kang chatbot",
    suggestionsLabel: "Minkɔ́bɔ́ mi jɔ́l",
  },
};
