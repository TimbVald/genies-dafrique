import { getSiteInfo } from "@/lib/data/global";
import { getAdmissionSteps, getAdmissionDocuments, getAdmissionFees } from "@/lib/data/admissions";
import { getPrograms } from "@/lib/data/programs";
import { getFAQ } from "@/lib/data/faq";
import { getNews } from "@/lib/data/news";
import { getEvents } from "@/lib/data/events";
import { getDocuments } from "@/lib/data/documents";
import { getSchoolLifeActivities } from "@/lib/data/school-life";
import type { Locale, ChatbotKnowledgeItem, ChatActionLink } from "./types";

/**
 * Prépare et structure l'ensemble de la base de connaissances officielle du site
 * pour une langue donnée.
 */
export function buildComprehensiveKnowledgeBase(locale: Locale = "fr"): ChatbotKnowledgeItem[] {
  const items: ChatbotKnowledgeItem[] = [];
  const siteInfo = getSiteInfo();

  // 1. Informations globales de l'établissement
  const siteName = siteInfo.name[locale] || siteInfo.name.fr;
  const siteDesc = siteInfo.description[locale] || siteInfo.description.fr;
  const siteAddr = siteInfo.address[locale] || siteInfo.address.fr;
  const siteHours = siteInfo.openingHours[locale] || siteInfo.openingHours.fr;

  items.push({
    id: "site-identity",
    type: "site_info",
    title: `${siteName} - Informations Générales`,
    content: `${siteName}. ${siteDesc}
Adresse : ${siteAddr.replace(/\n/g, ", ")}.
Horaires : ${siteHours}.
Téléphones officiels : ${siteInfo.phone.join(" / ")}.
Email : ${siteInfo.email}.
WhatsApp : ${siteInfo.whatsapp}.
Agrément officiel MINEDUB : Arrêté N°103/j1/7/A/MINEDUB/SG/DSEPB/SDAAP du 14 février 2025.
Localisation : Nkozoa, derrière la Boulangerie Massa, Yaoundé, Cameroun.
Fondation : 2024. Effectifs : environ 150 élèves et 12 enseignants qualifiés.`,
    url: "/contact",
    keywords: ["ecole", "contact", "adresse", "localisation", "telephone", "email", "horaire", "agrement", "minedub", "nkozoa", "yaounde", "massa"],
    metadata: {
      phone: siteInfo.phone,
      email: siteInfo.email,
      whatsapp: siteInfo.whatsapp,
      coordinates: siteInfo.coordinates,
      mapsUrl: siteInfo.googleMapsDirectionsUrl,
    },
  });

  // 2. Programmes & Formations
  const programs = getPrograms();
  programs.forEach((prog) => {
    const progName = prog.name[locale] || prog.name.fr;
    const progDesc = prog.description[locale] || prog.description.fr;
    const progBadge = prog.badge[locale] || prog.badge.fr;
    const features = prog.features.map((f) => f[locale] || f.fr).join(", ");

    items.push({
      id: `program-${prog.slug}`,
      type: "program",
      title: `Programme ${progName} (${progBadge})`,
      content: `Programme : ${progName} (${progBadge}).
Description : ${progDesc}
Points forts : ${features}.
Section : ${prog.section} (bilingue français/anglais). Niveau : ${prog.level}.`,
      url: `/formations#${prog.slug}`,
      keywords: ["programme", "formation", "niveau", prog.slug, prog.level || "", prog.section || "", "bilingue", "cours", "classes"].filter(Boolean),
      metadata: { level: prog.level, section: prog.section, slug: prog.slug },
    });
  });

  // 3. Procédure et étapes d'admission
  const steps = getAdmissionSteps();
  const stepsSummary = steps
    .map((s) => `Étape ${s.step}: ${s.title[locale] || s.title.fr} - ${s.description[locale] || s.description.fr}`)
    .join("\n");

  items.push({
    id: "admission-steps",
    type: "admission",
    title: "Procédure d'inscription et étapes d'admission",
    content: `Comment inscrire son enfant au Complexe Scolaire Bilingue Les Génies d'Afrique :\n${stepsSummary}`,
    url: "/admissions",
    keywords: ["inscription", "admission", "candidature", "etapes", "inscrire", "procedure", "depot"],
    metadata: { count: steps.length },
  });

  // 4. Documents et pièces à fournir pour l'inscription
  const docs = getAdmissionDocuments();
  const docsList = docs
    .map((d) => `• ${d.name[locale] || d.name.fr} (${d.required ? "Obligatoire" : "Optionnel"})`)
    .join("\n");

  items.push({
    id: "admission-documents",
    type: "doc",
    title: "Pièces à fournir et documents requis pour l'inscription",
    content: `Dossier d'inscription complet à fournir :\n${docsList}\nHoraires de dépôt au secrétariat : Lundi au vendredi de 8h00 à 13h00.`,
    url: "/admissions",
    keywords: ["pieces", "documents", "dossier", "acte de naissance", "vaccination", "photos", "cni", "bulletins"],
    metadata: { requiredDocsCount: docs.filter((d) => d.required).length },
  });

  // 5. Frais de scolarité (Politique officielle transparente)
  const fees = getAdmissionFees();
  const feesSummary = fees
    .map((f) => `• ${f.level[locale] || f.level.fr} (${f.ageRange[locale] || f.ageRange.fr}) : ${f.tuition[locale] || f.tuition.fr}`)
    .join("\n");

  items.push({
    id: "admission-fees",
    type: "fee",
    title: "Frais de scolarité et grille tarifaire",
    content: `Politique tarifaire de l'école :\n${feesSummary}\nNote importante : La grille tarifaire détaillée est remise à chaque famille lors de la visite de l'établissement ou sur demande personnalisée auprès du secrétariat ou sur WhatsApp (651 11 15 06).`,
    url: "/admissions",
    keywords: ["frais", "scolarite", "cout", "tarif", "prix", "combien", "tuition", "paiement", "mensualite"],
    metadata: { note: "Sur devis / visite" },
  });

  // 6. Foire Aux Questions (FAQ)
  const faqs = getFAQ();
  faqs.forEach((faq) => {
    const q = faq.question[locale] || faq.question.fr;
    const a = faq.answer[locale] || faq.answer.fr;
    items.push({
      id: `faq-${faq.id}`,
      type: "faq",
      title: q,
      content: `Question : ${q}\nRéponse : ${a}`,
      url: "/#faq",
      keywords: ["faq", "question", faq.category],
      metadata: { category: faq.category },
    });
  });

  // 7. Actualités récentes du site
  const newsList = getNews().slice(0, 8);
  newsList.forEach((n) => {
    const title = n.title[locale] || n.title.fr;
    const excerpt = n.excerpt[locale] || n.excerpt.fr;
    const dateStr = n.publishedAt ? new Date(n.publishedAt).toLocaleDateString(locale === "en" ? "en-US" : "fr-FR") : "";

    items.push({
      id: `news-${n.id}`,
      type: "news",
      title: `Actualité : ${title}`,
      content: `Article : ${title} (${dateStr})\nRésumé : ${excerpt}`,
      url: `/actualites/${n.slug}`,
      keywords: ["actualite", "nouvelle", "evenement", "annonce", n.slug],
      metadata: { slug: n.slug, date: n.publishedAt },
    });
  });

  // 8. Événements et Calendrier scolaire
  const eventsList = getEvents().slice(0, 8);
  eventsList.forEach((ev) => {
    const title = ev.title[locale] || ev.title.fr;
    const desc = ev.description[locale] || ev.description.fr;
    const dateStr = ev.startDate ? new Date(ev.startDate).toLocaleDateString(locale === "en" ? "en-US" : "fr-FR") : "";

    items.push({
      id: `event-${ev.id}`,
      type: "event",
      title: `Événement : ${title}`,
      content: `Événement : ${title} (Date : ${dateStr})\nDétail : ${desc}`,
      url: "/calendrier",
      keywords: ["evenement", "calendrier", "date", "fete", "rentree", "activite"],
      metadata: { date: ev.startDate },
    });
  });

  // 9. Vie scolaire et services (Cantine, transport, parascolaire)
  const activities = getSchoolLifeActivities();
  const actSummary = activities.map((a) => `• ${a.title[locale] || a.title.fr}: ${a.description[locale] || a.description.fr}`).join("\n");
  
  items.push({
    id: "school-life-services",
    type: "school_life",
    title: "Vie scolaire, cantine, garderie et activités parascolaires",
    content: `Services et vie scolaire aux Génies d'Afrique :\n• Cantine scolaire : Repas chauds, équilibrés et préparés sur place chaque jour.\n• Garderie et gardiennage : Accueil dès 7h30 le matin et gardiennage jusqu'à 16h00.\n• Transport : L'école ne dispose pas de service de ramassage scolaire dédié (bus) pour le moment, les parents gèrent les trajets.\n• Activités parascolaires :\n${actSummary}`,
    url: "/vie-scolaire",
    keywords: ["cantine", "repas", "manger", "transport", "bus", "garderie", "gardiennage", "activites", "parascolaire", "sport", "musique"],
  });

  // 10. Documents téléchargeables officiels
  const documents = getDocuments();
  documents.forEach((d) => {
    const title = d.title[locale] || d.title.fr;
    const desc = d.description ? (d.description[locale] || d.description.fr) : "";
    items.push({
      id: `doc-${d.id}`,
      type: "doc",
      title: `Document officiel : ${title}`,
      content: `Document : ${title} (${d.fileType?.toUpperCase() || "PDF"}).\nDescription : ${desc}`,
      url: `/documents/${d.slug}`,
      keywords: ["document", "fiche", "telecharger", "pdf", d.slug],
      metadata: { fileType: d.fileType },
    });
  });

  return items;
}

/**
 * Génère le résumé textuel consolidé de la base de connaissances
 * pour l'injecter proprement dans le System Prompt de l'IA.
 */
export function getKnowledgeContextForPrompt(locale: Locale = "fr"): string {
  const items = buildComprehensiveKnowledgeBase(locale);
  return items
    .map((item) => `### [${item.type.toUpperCase()}] ${item.title}\n${item.content}\nLien : ${item.url || "/contact"}`)
    .join("\n\n");
}

/**
 * Liens rapides prédéfinis selon les intentions
 */
export const INTENT_ACTION_LINKS: Record<string, ChatActionLink[]> = {
  admissions: [
    { label: { fr: "Page Admissions", en: "Admissions page", ew: "Page ya Admissions" }, href: "/admissions" },
    { label: { fr: "WhatsApp Direct", en: "Direct WhatsApp", ew: "WhatsApp" }, href: "https://wa.me/237651111506", external: true },
  ],
  documents: [
    { label: { fr: "Dossier d'inscription", en: "Enrolment file", ew: "Dossier ya inscription" }, href: "/admissions" },
    { label: { fr: "Documents à télécharger", en: "Download documents", ew: "Documents ya tɔ́l" }, href: "/documents" },
  ],
  programs: [
    { label: { fr: "Voir les Formations", en: "View Programmes", ew: "Bikɔ́l bya biso" }, href: "/formations" },
    { label: { fr: "Vie Scolaire", en: "School Life", ew: "Vie Scolaire" }, href: "/vie-scolaire" },
  ],
  fees: [
    { label: { fr: "Frais & Inscriptions", en: "Fees & Admissions", ew: "Mimbɔ́g & Inscriptions" }, href: "/admissions" },
    { label: { fr: "Demander un devis WhatsApp", en: "Ask for quote on WhatsApp", ew: "WhatsApp" }, href: "https://wa.me/237651111506", external: true },
  ],
  hours: [
    { label: { fr: "Page Contact & Horaires", en: "Contact & Hours", ew: "Contact na Minsan" }, href: "/contact" },
  ],
  location: [
    { label: { fr: "Itinéraire Google Maps", en: "Google Maps directions", ew: "Google Maps" }, href: "https://maps.app.goo.gl/b6r6PyYzXz8Meeoh6", external: true },
    { label: { fr: "Page Contact", en: "Contact page", ew: "Contact" }, href: "/contact" },
  ],
  contact: [
    { label: { fr: "Formulaire de contact", en: "Contact form", ew: "Formulaire ya contact" }, href: "/contact" },
    { label: { fr: "WhatsApp Officiel", en: "Official WhatsApp", ew: "WhatsApp" }, href: "https://wa.me/237651111506", external: true },
  ],
  events: [
    { label: { fr: "Calendrier scolaire", en: "School Calendar", ew: "Calendrier" }, href: "/calendrier" },
    { label: { fr: "Actualités", en: "News", ew: "Actualités" }, href: "/actualites" },
  ],
  school_life: [
    { label: { fr: "Vie scolaire & Activités", en: "School Life & Activities", ew: "Vie Scolaire" }, href: "/vie-scolaire" },
  ],
  human_handoff: [
    { label: { fr: "Écrire au Secrétariat (WhatsApp)", en: "Message School Office (WhatsApp)", ew: "Tɔ́l na WhatsApp" }, href: "https://wa.me/237651111506", external: true },
    { label: { fr: "Page Contact", en: "Contact page", ew: "Contact" }, href: "/contact" },
  ],
};
