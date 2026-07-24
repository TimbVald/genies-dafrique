import Link from "next/link";
import {
  ClipboardList, Send, Users, CheckCircle2,
  Calendar, Phone, MapPin,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import EnrollForm from "@/components/sections/EnrollForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Procédure d'admission, frais de scolarité et formulaire d'inscription au Complexe Scolaire Bilingue Les Génies d'Afrique.",
};

const STEPS = [
  {
    icon: <ClipboardList size={28} className="text-white" />,
    numFr: "01", titleFr: "Constitution du dossier", titleEn: "Prepare Your Documents",
    descFr: "Rassemblez toutes les pièces requises (liste ci-dessous) avant de vous présenter.",
    descEn: "Gather all required documents (see list below) before coming to the school.",
  },
  {
    icon: <Send size={28} className="text-white" />,
    numFr: "02", titleFr: "Dépôt du dossier", titleEn: "Submit Application",
    descFr: "Déposez le dossier complet au secrétariat : Lun–Ven, 8h00–13h00.",
    descEn: "Submit the complete file at the office: Mon–Fri, 8AM–1PM.",
  },
  {
    icon: <Users size={28} className="text-white" />,
    numFr: "03", titleFr: "Entretien d'admission", titleEn: "Admission Interview",
    descFr: "Un entretien avec la direction pour les parents et l'élève concerné.",
    descEn: "A meeting with the principal for the parents and the student.",
  },
  {
    icon: <CheckCircle2 size={28} className="text-white" />,
    numFr: "04", titleFr: "Confirmation & Paiement", titleEn: "Confirmation & Payment",
    descFr: "Confirmation de l'admission et règlement des frais de scolarité.",
    descEn: "Admission confirmation and payment of tuition fees.",
  },
];

const DOSSIER = [
  { fr: "Extrait d'acte de naissance (original + copie)", en: "Birth certificate (original + copy)" },
  { fr: "Carnet de vaccinations à jour", en: "Up-to-date vaccination booklet" },
  { fr: "4 photos d'identité récentes de l'enfant", en: "4 recent passport photos of the child" },
  { fr: "Photocopie de la CNI ou passeport du parent/tuteur", en: "Copy of parent/guardian's ID card or passport" },
  { fr: "Fiche de renseignements complétée (fournie par l'école)", en: "Completed information form (provided by the school)" },
  { fr: "Bulletins scolaires des 2 dernières années (à partir du CP)", en: "Last 2 years' report cards (from Grade 1 onwards)" },
];

const FRAIS = [
  { niveauFr: "Crèche", niveauEn: "Day Care", tranche: "0 – 2 ans", mensualite: "Sur devis / On request" },
  { niveauFr: "Maternelle", niveauEn: "Nursery", tranche: "2 – 5 ans", mensualite: "Sur devis / On request" },
  { niveauFr: "Primaire Francophone", niveauEn: "French Primary", tranche: "6 – 12 ans", mensualite: "Sur devis / On request" },
  { niveauFr: "Primaire Anglophone", niveauEn: "English Primary", tranche: "6 – 12 ans", mensualite: "Sur devis / On request" },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        title="Admissions"
        subtitle="Rejoignez la famille des Génies d'Afrique / Join our family"
        image="/images/IMG-20260723-WA0013.jpg"
        breadcrumbs={[
          { label: "Accueil / Home", href: "/" },
          { label: "Admissions" },
        ]}
      />

      {/* ── SECTION : Inscription ouverte ── */}
      <section className="bg-[#D32F2F] py-4">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center
          justify-between gap-3 text-white text-sm font-medium">
          <div className="flex items-center gap-3">
            <Calendar size={18} className="flex-shrink-0" />
            <span>Les inscriptions sont ouvertes — Enrollment is now open</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+237651111506" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <Phone size={16} /> 651 11 15 06
            </a>
            <a href="tel:+237656663848" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <Phone size={16} /> 656 66 38 48
            </a>
          </div>
        </div>
      </section>

      {/* ── ÉTAPES D'ADMISSION ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <SectionBadge>Procédure / Procedure</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C]"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              4 étapes simples pour rejoindre l&apos;école
            </h2>
            <p className="text-[#4A5568] mt-2 italic text-base">
              4 simple steps to join the school
            </p>
          </div>

          {/* Stepper */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Ligne horizontale (desktop) */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-[#E2E8F0]" />

            {STEPS.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center px-4">
                {/* Cercle numéroté */}
                <div className="w-16 h-16 rounded-full bg-[#1A3A8F] flex items-center justify-center
                  shadow-[0_4px_20px_rgba(26,58,143,0.3)] mb-5 z-10">
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-[#D32F2F] tracking-widest mb-1 uppercase">
                  Étape {step.numFr}
                </span>
                <h3 className="font-display font-bold text-[#1A202C] text-base mb-1">
                  {step.titleFr}
                </h3>
                <p className="text-[#4A5568]/60 text-xs italic mb-2">{step.titleEn}</p>
                <p className="text-[#4A5568] text-sm leading-relaxed">{step.descFr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOSSIER + FRAIS côte à côte ── */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12">

          {/* Dossier */}
          <div>
            <SectionBadge>Pièces requises / Required Documents</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mb-6"
              style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)" }}
            >
              Constitution du dossier
            </h2>
            <ul className="space-y-4">
              {DOSSIER.map((doc, i) => (
                <li key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[#E2E8F0]">
                  <div className="w-7 h-7 rounded-full bg-[#EEF2FF] flex items-center justify-center flex-shrink-0 font-bold text-[#1A3A8F] text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-[#1A202C] text-sm font-medium">{doc.fr}</p>
                    <p className="text-[#4A5568] text-xs italic mt-0.5">{doc.en}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Frais */}
          <div>
            <SectionBadge variant="red">Frais de scolarité / Tuition Fees</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mb-6"
              style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)" }}
            >
              Tarifs par niveau
            </h2>

            <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1A3A8F] text-white text-sm">
                    <th className="text-left px-5 py-4 font-semibold">Niveau / Level</th>
                    <th className="text-left px-5 py-4 font-semibold">Âge / Age</th>
                    <th className="text-right px-5 py-4 font-semibold">Frais / Fees</th>
                  </tr>
                </thead>
                <tbody>
                  {FRAIS.map((f, i) => (
                    <tr
                      key={i}
                      className={`border-b border-[#F7F9FC] last:border-0 text-sm ${i % 2 === 0 ? "bg-white" : "bg-[#F7F9FC]"}`}
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium text-[#1A202C]">{f.niveauFr}</p>
                        <p className="text-[#4A5568] text-xs italic">{f.niveauEn}</p>
                      </td>
                      <td className="px-5 py-4 text-[#4A5568]">{f.tranche}</td>
                      <td className="px-5 py-4 text-right font-semibold text-[#1A3A8F]">{f.mensualite}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-start gap-2 text-sm text-[#4A5568] bg-[#FFF8EE] rounded-lg p-3 border border-[#F5A623]/30">
              <span className="text-[#F5A623] flex-shrink-0 text-base">ℹ</span>
              <p>
                Pour obtenir le détail des frais de scolarité, contactez le secrétariat au
                <strong className="text-[#1A202C]"> 651 11 15 06</strong> ou venez nous rendre visite.<br />
                <span className="italic text-xs">For detailed tuition fees, contact the office at 651 11 15 06 or visit us.</span>
              </p>
            </div>

            <div className="mt-8 flex items-start gap-3 bg-[#EEF2FF] rounded-xl p-5">
              <MapPin size={20} className="text-[#1A3A8F] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#1A202C] text-sm">Secrétariat — Lun à Ven, 8h00–13h00</p>
                <p className="text-[#4A5568] text-sm">Nkozoa, derrière la Boulangerie Massa, Yaoundé</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE D'INSCRIPTION ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[860px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <SectionBadge variant="red">Inscription en ligne / Online Enrollment</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C]"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              Formulaire de pré-inscription
            </h2>
            <p className="text-[#4A5568] mt-2">
              Remplissez ce formulaire et nous vous contacterons dans les 48h.
              <span className="block text-sm italic text-[#4A5568]/70 mt-1">
                Fill in this form and we will contact you within 48 hours.
              </span>
            </p>
          </div>
          <EnrollForm />
        </div>
      </section>
    </>
  );
}
