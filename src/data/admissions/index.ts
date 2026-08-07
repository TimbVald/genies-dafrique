import type { AdmissionStep, AdmissionDocument, AdmissionFee } from "@/types";

/* ── Admission Steps Data ─────────────────────────────────────────── */
export const ADMISSION_STEPS: AdmissionStep[] = [
  {
    id: "step-1",
    slug: "constitution-dossier",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    step: 1,
    title: {
      fr: "Constitution du dossier",
      en: "Prepare Your Documents",
      ew: "Bongwan ya dossier",
    },
    description: {
      fr: "Rassemblez toutes les pièces requises (liste ci-dessous) avant de vous présenter.",
      en: "Gather all required documents (see list below) before coming to the school.",
      ew: "Bongwan bisala nyonso na mbog yi",
    },
    icon: "ClipboardList",
    order: 1,
    visible: true,
  },
  {
    id: "step-2",
    slug: "depot-dossier",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    step: 2,
    title: {
      fr: "Dépôt du dossier",
      en: "Submit Application",
      ew: "Zɔ́k dossier",
    },
    description: {
      fr: "Déposez le dossier complet au secrétariat : Lun–Ven, 8h00–13h00.",
      en: "Submit the complete file at the office: Mon–Fri, 8AM–1PM.",
      ew: "Zɔ́k dossier kɔ́k : Lɔ́n–Vɛn, 8h00–13h00.",
    },
    icon: "Send",
    order: 2,
    visible: true,
  },
  {
    id: "step-3",
    slug: "entretien-admission",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    step: 3,
    title: {
      fr: "Entretien d'admission",
      en: "Admission Interview",
      ew: "Mvog ya admission",
    },
    description: {
      fr: "Un entretien avec la direction pour les parents et l'élève concerné.",
      en: "A meeting with the principal for the parents and the student.",
      ew: "Mvog na direction amu bana na fam.",
    },
    icon: "Users",
    order: 3,
    visible: true,
  },
  {
    id: "step-4",
    slug: "confirmation-paiement",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    step: 4,
    title: {
      fr: "Confirmation & Paiement",
      en: "Confirmation & Payment",
      ew: "Confirmation na Paiement",
    },
    description: {
      fr: "Confirmation de l'admission et règlement des frais de scolarité.",
      en: "Admission confirmation and payment of tuition fees.",
      ew: "Confirmation ya admission na payment ya fees.",
    },
    icon: "CheckCircle2",
    order: 4,
    visible: true,
  },
];

/* ── Admission Documents Data ─────────────────────────────────────── */
export const ADMISSION_DOCUMENTS: AdmissionDocument[] = [
  {
    id: "doc-1",
    slug: "acte-naissance",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    name: {
      fr: "Extrait d'acte de naissance (original + copie)",
      en: "Birth certificate (original + copy)",
      ew: "Acte ya naissance (original + copy)",
    },
    required: true,
    order: 1,
    visible: true,
  },
  {
    id: "doc-2",
    slug: "carnet-vaccination",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    name: {
      fr: "Carnet de vaccinations à jour",
      en: "Up-to-date vaccination booklet",
      ew: "Carnet ya vaccinations",
    },
    required: true,
    order: 2,
    visible: true,
  },
  {
    id: "doc-3",
    slug: "photos-identite",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    name: {
      fr: "4 photos d'identité récentes de l'enfant",
      en: "4 recent passport photos of the child",
      ew: "4 photos ya mwana",
    },
    required: true,
    order: 3,
    visible: true,
  },
  {
    id: "doc-4",
    slug: "cni-parent",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    name: {
      fr: "Photocopie de la CNI ou passeport du parent/tuteur",
      en: "Copy of parent/guardian's ID card or passport",
      ew: "Copy ya CNI na passport ya fam",
    },
    required: true,
    order: 4,
    visible: true,
  },
  {
    id: "doc-5",
    slug: "fiche-renseignements",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    name: {
      fr: "Fiche de renseignements complétée (fournie par l'école)",
      en: "Completed information form (provided by the school)",
      ew: "Fiche ya renseignements (yi na sukul)",
    },
    required: true,
    order: 5,
    visible: true,
  },
  {
    id: "doc-6",
    slug: "bulletins-scolaires",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    name: {
      fr: "Bulletins scolaires des 2 dernières années (à partir du CP)",
      en: "Last 2 years' report cards (from Grade 1 onwards)",
      ew: "Bulletins ya 2 osu (kobi CP)",
    },
    required: false,
    order: 6,
    visible: true,
  },
];

/* ── Admission Fees Data ─────────────────────────────────────────── */
export const ADMISSION_FEES: AdmissionFee[] = [
  {
    id: "fee-1",
    slug: "creche",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    level: {
      fr: "Crèche",
      en: "Day Care",
      ew: "Crèche",
    },
    ageRange: {
      fr: "0 – 2 ans",
      en: "0 – 2 years",
      ew: "0 – 2 osu",
    },
    tuition: {
      fr: "Sur devis",
      en: "On request",
      ew: "Sur devis",
    },
    order: 1,
    visible: true,
  },
  {
    id: "fee-2",
    slug: "maternelle",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    level: {
      fr: "Maternelle",
      en: "Nursery",
      ew: "Maternelle",
    },
    ageRange: {
      fr: "2 – 5 ans",
      en: "2 – 5 years",
      ew: "2 – 5 osu",
    },
    tuition: {
      fr: "Sur devis",
      en: "On request",
      ew: "Sur devis",
    },
    order: 2,
    visible: true,
  },
  {
    id: "fee-3",
    slug: "primaire-fr",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    level: {
      fr: "Primaire Francophone",
      en: "French Primary",
      ew: "Primaire Francophone",
    },
    ageRange: {
      fr: "6 – 12 ans",
      en: "6 – 12 years",
      ew: "6 – 12 osu",
    },
    tuition: {
      fr: "Sur devis",
      en: "On request",
      ew: "Sur devis",
    },
    order: 3,
    visible: true,
  },
  {
    id: "fee-4",
    slug: "primaire-en",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    level: {
      fr: "Primaire Anglophone",
      en: "English Primary",
      ew: "Primaire Anglophone",
    },
    ageRange: {
      fr: "6 – 12 ans",
      en: "6 – 12 years",
      ew: "6 – 12 osu",
    },
    tuition: {
      fr: "Sur devis",
      en: "On request",
      ew: "Sur devis",
    },
    order: 4,
    visible: true,
  },
];

/* ── Get Admission Steps Function ─────────────────────────────────── */
export function getAdmissionSteps(): AdmissionStep[] {
  return ADMISSION_STEPS.filter((s) => s.visible && s.status === "published").sort((a, b) => a.order - b.order);
}

/* ── Get Admission Documents Function ───────────────────────────── */
export function getAdmissionDocuments(): AdmissionDocument[] {
  return ADMISSION_DOCUMENTS.filter((d) => d.visible && d.status === "published").sort((a, b) => a.order - b.order);
}

/* ── Get Admission Fees Function ─────────────────────────────────── */
export function getAdmissionFees(): AdmissionFee[] {
  return ADMISSION_FEES.filter((f) => f.visible && f.status === "published").sort((a, b) => a.order - b.order);
}
