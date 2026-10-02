import { buildComprehensiveKnowledgeBase, INTENT_ACTION_LINKS } from "./knowledge-base";
import type { Locale, ChatIntent, ChatActionLink, ChatbotKnowledgeItem } from "./types";

/**
 * Normalisation robuste du texte (enlève diacritiques, ponctuation, espaces multiples)
 */
export function normalizeText(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ɔ/g, "o")
    .replace(/ɛ/g, "e")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Stopwords multilingues pour filtrer le bruit
 */
const STOPWORDS = new Set([
  // FR
  "le", "la", "les", "un", "une", "des", "du", "de", "d", "l", "et", "ou", "en", "dans", "pour", "par",
  "avec", "sur", "sous", "est", "sont", "c", "ce", "cet", "cette", "ces", "je", "tu", "il", "elle", "nous",
  "vous", "ils", "elles", "mon", "ma", "mes", "ton", "ta", "tes", "son", "sa", "ses", "notre", "votre",
  "leur", "leurs", "qui", "que", "quoi", "dont", "comment", "pourquoi", "quand", "quel", "quelle", "quels",
  "quelles", "faire", "avoir", "etre", "veux", "voudrais", "svp", "plait", "bonjour", "merci",
  // EN
  "the", "a", "an", "and", "or", "in", "on", "at", "to", "for", "with", "by", "from", "is", "are", "was",
  "were", "be", "been", "have", "has", "had", "do", "does", "did", "can", "could", "will", "would", "shall",
  "should", "i", "you", "he", "she", "it", "we", "they", "my", "your", "his", "her", "its", "our", "their",
  "what", "where", "when", "how", "who", "which", "please", "thanks", "hello",
  // EW
  "ya", "na", "bi", "ba", "a", "ne", "te", "kobi", "tii", "amu", "mfañ",
]);

/**
 * Distance de Levenshtein pour tolérer les fautes de frappe
 */
export function levenshteinDistance(a: string, b: string): number {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix: number[][] = [];
  for (let i = 0; i <= bn; i++) matrix[i] = [i];
  for (let j = 0; j <= an; j++) matrix[0][j] = j;

  for (let i = 1; i <= bn; i++) {
    for (let j = 1; j <= an; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[bn][an];
}

/**
 * Dictionnaire d'intentions avec mots-clés et synonymes
 */
interface IntentPattern {
  intent: ChatIntent;
  keywords: string[];
  weight: number;
}

const INTENT_PATTERNS: IntentPattern[] = [
  {
    intent: "greeting",
    keywords: ["bonjour", "bonsoir", "salut", "hello", "hi", "hey", "mbolo", "coucou", "allo", "good morning", "good afternoon"],
    weight: 3,
  },
  {
    intent: "gratitude",
    keywords: ["merci", "thank you", "thanks", "akiba", "parfait", "super", "genial", "tres bien", "ok merci"],
    weight: 2,
  },
  {
    intent: "admissions",
    keywords: [
      "inscription", "inscriptions", "inscrire", "admission", "admissions", "candidature",
      "enroll", "enrollment", "enrolment", "register", "registration", "dossier", "postuler",
      "comment s inscrire", "tol", "tol mwana", "tol mwana sukul", "bengane", "procedure",
    ],
    weight: 3,
  },
  {
    intent: "documents",
    keywords: [
      "document", "documents", "pieces", "dossier", "acte de naissance", "vaccination",
      "photos", "cni", "bulletins", "fiche", "certificat", "biyem", "birth certificate",
    ],
    weight: 3,
  },
  {
    intent: "fees",
    keywords: [
      "frais", "scolarite", "cout", "tarif", "tarifs", "prix", "combien", "payer", "paiement",
      "mensualite", "tuition", "fees", "cost", "price", "how much", "mimbog", "mimbog ya sukul", "argent", "devis",
    ],
    weight: 3,
  },
  {
    intent: "programs",
    keywords: [
      "programme", "programmes", "formation", "formations", "niveau", "niveaux", "classe", "classes",
      "creche", "maternelle", "primaire", "cp", "ce1", "ce2", "cm1", "cm2", "class 1", "class 6",
      "curriculum", "cycle", "nursery", "daycare", "day care", "bikol", "bikol bya biso", "bikol bya nkan", "mekol",
    ],
    weight: 3,
  },
  {
    intent: "bilingualism",
    keywords: [
      "bilingue", "bilingual", "bilinguisme", "francophone", "anglophone", "anglais", "francais",
      "french", "english", "langue", "langues", "immersion", "minsili", "minsili mibuma",
    ],
    weight: 3,
  },
  {
    intent: "hours",
    keywords: [
      "horaire", "horaires", "heure", "heures", "ouverture", "fermeture", "quand", "matin", "soir",
      "hours", "schedule", "opening", "closing", "minsan", "minsan ya sukul", "njam", "garderie", "gardiennage",
    ],
    weight: 3,
  },
  {
    intent: "location",
    keywords: [
      "adresse", "localisation", "ou se trouve", "situe", "situation", "plan", "carte", "itineraire",
      "nkozoa", "boulangerie massa", "yaounde", "cameroun", "cameroon", "where", "location", "address",
      "how to get", "ase", "sukul a ne ase", "endroit",
    ],
    weight: 3,
  },
  {
    intent: "contact",
    keywords: [
      "contact", "telephone", "phone", "appeler", "joindre", "numero", "email", "mail", "whatsapp",
      "ecrire", "secretariat", "direction", "kobotolane", "somin",
    ],
    weight: 3,
  },
  {
    intent: "cantine",
    keywords: ["cantine", "repas", "dejeuner", "manger", "nourriture", "menu", "cafeteria", "lunch", "food", "bilog"],
    weight: 3,
  },
  {
    intent: "transport",
    keywords: ["transport", "bus", "navette", "ramassage", "voiture", "scolaire", "car", "pickup"],
    weight: 3,
  },
  {
    intent: "accreditation",
    keywords: ["agrement", "agree", "accreditation", "minedub", "officiel", "arrete", "reconnu", "ministere"],
    weight: 3,
  },
  {
    intent: "events",
    keywords: ["evenement", "evenements", "calendrier", "rentree", "fete", "vacances", "date", "dates", "agenda", "events"],
    weight: 3,
  },
  {
    intent: "news",
    keywords: ["actualite", "actualites", "nouvelles", "news", "articles", "nouveautes"],
    weight: 2,
  },
  {
    intent: "school_life",
    keywords: ["vie scolaire", "activite", "activites", "parascolaire", "sport", "musique", "jardinage", "club"],
    weight: 2,
  },
];

/**
 * Détecte l'intention principale d'un message
 */
export function detectUserIntent(input: string): { intent: ChatIntent; score: number } {
  const normalized = normalizeText(input);
  if (!normalized) return { intent: "fallback", score: 0 };

  const inputWords = normalized.split(" ").filter((w) => w.length >= 2);
  let bestIntent: ChatIntent = "fallback";
  let maxScore = 0;

  for (const item of INTENT_PATTERNS) {
    let score = 0;

    for (const kw of item.keywords) {
      const normKw = normalizeText(kw);

      // Correspondance de sous-chaîne exacte
      if (normalized.includes(normKw)) {
        score += normKw.length >= 4 ? item.weight * 2 : item.weight;
      }

      // Correspondance mot à mot ou tolérance aux fautes de frappe
      for (const word of inputWords) {
        if (STOPWORDS.has(word)) continue;

        if (word === normKw) {
          score += item.weight * 2;
        } else if (word.length >= 5 && normKw.length >= 5) {
          const dist = levenshteinDistance(word, normKw);
          if (dist <= 1) {
            score += item.weight * 1.2;
          }
        }
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestIntent = item.intent;
    }
  }

  return { intent: bestIntent, score: maxScore };
}

/**
 * Recherche des items de connaissances les plus pertinents
 */
export function searchBestKnowledgeItems(
  query: string,
  locale: Locale = "fr",
  limit: number = 3
): ChatbotKnowledgeItem[] {
  const normalizedQuery = normalizeText(query);
  const words = normalizedQuery.split(" ").filter((w) => w.length >= 3 && !STOPWORDS.has(w));
  const items = buildComprehensiveKnowledgeBase(locale);

  const scored = items.map((item) => {
    let score = 0;
    const titleNorm = normalizeText(item.title);
    const contentNorm = normalizeText(item.content);

    // Si la requête complète est dans le titre ou le contenu
    if (titleNorm.includes(normalizedQuery)) score += 10;
    if (contentNorm.includes(normalizedQuery)) score += 5;

    // Correspondance par mot-clé de l'item
    if (item.keywords) {
      for (const kw of item.keywords) {
        const kwNorm = normalizeText(kw);
        if (normalizedQuery.includes(kwNorm)) score += 6;
        for (const w of words) {
          if (w === kwNorm) score += 4;
        }
      }
    }

    // Correspondance des mots individuels
    for (const w of words) {
      if (titleNorm.includes(w)) score += 3;
      if (contentNorm.includes(w)) score += 1.5;
    }

    return { item, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.item);
}

/**
 * Générateur de réponses locales fiables et instantanées (Mode Zero-Failure)
 */
export function generateLocalFallbackResponse(
  input: string,
  locale: Locale = "fr"
): { reply: string; intent: ChatIntent; links: ChatActionLink[]; followUps: string[] } {
  const { intent, score } = detectUserIntent(input);
  const bestItems = searchBestKnowledgeItems(input, locale, 2);

  const links: ChatActionLink[] = [...(INTENT_ACTION_LINKS[intent] || INTENT_ACTION_LINKS.contact)];

  // 1. Salutations
  if (intent === "greeting") {
    const greetingText = {
      fr: "Bonjour et bienvenue au Complexe Scolaire Bilingue Les Génies d'Afrique ! ✨\n\nJe suis votre assistant virtuel officiel. Comment puis-je vous aider aujourd'hui ? Vous pouvez me poser des questions sur les inscriptions, nos sections crèche, maternelle et primaire, les horaires, les tarifs ou notre localisation à Nkozoa.",
      en: "Hello and welcome to the Bilingual School Complex Les Génies d'Afrique! ✨\n\nI am your official virtual assistant. How can I assist you today? Feel free to ask about enrolments, our day care, nursery and primary programmes, school hours, fees or our location in Nkozoa.",
      ew: "Mbolo na Complexe Scolaire Bilingue Les Génies d'Afrique! ✨\n\nMa ne assistant ya sukul. Ma yeme mfañ: inscription, bikɔ́l, minsan, mimbɔ́g na ase ya sukul na Nkozoa.",
    };
    return {
      reply: greetingText[locale] || greetingText.fr,
      intent,
      links: [
        { label: { fr: "Nos Formations", en: "Our Programmes", ew: "Bikɔ́l" }, href: "/formations" },
        { label: { fr: "Inscriptions", en: "Admissions", ew: "Inscriptions" }, href: "/admissions" },
      ],
      followUps: [
        locale === "en" ? "How to enrol my child?" : "Comment inscrire mon enfant ?",
        locale === "en" ? "What are the school fees?" : "Quels sont les frais de scolarité ?",
        locale === "en" ? "Where is the school located?" : "Où se trouve l'école à Yaoundé ?",
      ],
    };
  }

  // 2. Remerciements
  if (intent === "gratitude") {
    const gratitudeText = {
      fr: "Avec grand plaisir ! N'hésitez pas si vous avez d'autres questions. Notre secrétariat reste également à votre disposition pour vous accueillir sur place à Nkozoa.",
      en: "You are very welcome! Please feel free to ask if you have more questions. Our school office in Nkozoa is also ready to welcome you.",
      ew: "Akiba mingi! Tɔ́l mfañ fe nge o yene nzɔ́g. Secrétariat ya biso a ne na Nkozoa.",
    };
    return {
      reply: gratitudeText[locale] || gratitudeText.fr,
      intent,
      links: INTENT_ACTION_LINKS.contact,
      followUps: [
        locale === "en" ? "What are the office hours?" : "Quels sont les horaires du secrétariat ?",
        locale === "en" ? "Contact on WhatsApp" : "Contacter sur WhatsApp",
      ],
    };
  }

  // 3. Réponse directe basée sur les connaissances trouvées
  // Exiger un score de pertinence d'au moins 6 pour déclencher une réponse directe et éviter les faux positifs sur questions farfelues
  if (bestItems.length > 0 && score >= 6) {
    const mainItem = bestItems[0];
    const reply = `${mainItem.content}\n\nPour en savoir plus, consultez les liens officiels ci-dessous ou contactez notre secrétariat.`;
    
    return {
      reply,
      intent,
      links,
      followUps: [
        locale === "en" ? "View admission procedure" : locale === "ew" ? "Yiba procedure ya admission" : "Voir la procédure d'admission",
        locale === "en" ? "What documents are required?" : locale === "ew" ? "Documents ya tɔ́l ?" : "Quels sont les documents requis ?",
        locale === "en" ? "How to visit the school?" : locale === "ew" ? "A yen sukul ?" : "Comment visiter l'école ?",
      ],
    };
  }

  // 4. Fallback courtois (Information non trouvée)
  const notFoundText = {
    fr: "Je n'ai pas trouvé d'information officielle précise dans nos données pour répondre à cette question spécifique.\n\nAfin de ne pas vous induire en erreur, je vous invite à contacter directement notre secrétariat ou la direction de l'école. Notre équipe se fera un plaisir de vous renseigner avec exactitude.",
    en: "I could not find specific official information in our records to answer this query accurately.\n\nTo ensure you receive exact details, please contact our school administration or principal directly. We will be delighted to assist you.",
    ew: "Ma ne te a jɔ́l minkɔ́bɔ́ wua mfañ nyi.\n\nKɔ́bɔ́talane na secrétariat ya biso na WhatsApp nge page ya contact a zɔ́k mfañ mvoé.",
  };

  return {
    reply: notFoundText[locale] || notFoundText.fr,
    intent: "fallback",
    links: INTENT_ACTION_LINKS.human_handoff,
    followUps: [
      locale === "en" ? "How to contact the school?" : "Comment contacter l'école ?",
      locale === "en" ? "Where is the school located?" : "Où est située l'école ?",
      locale === "en" ? "What programs are available?" : "Quels sont les programmes disponibles ?",
    ],
  };
}
