import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  ClipboardList, Send, Users, CheckCircle2,
  Calendar, Phone, MapPin,
  ChevronDown,
  CheckCircle, Award, Globe, Heart, Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import EnrollForm from "@/components/sections/EnrollForm";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageTitles.admissions" });
  return { title: t("title"), description: t("description") };
}

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

const HIGHLIGHT_ICONS = [CheckCircle, Award, Globe, Heart, Users, Clock];

interface FaqItem {
  question: string;
  answer: string;
}

interface HighlightItem {
  title: string;
  description: string;
}

export default async function AdmissionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AdmissionsContent />;
}

function AdmissionsContent() {
  "use client";

  const t = useTranslations("admissionsPage");
  const tn = useTranslations("nav");
  const faqItems = t.raw("faq.items") as FaqItem[];
  const highlights = t.raw("presentation.highlights") as HighlightItem[];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const highlightColorClasses = [
    "bg-[#EEF2FF] text-[#1A3A8F]",
    "bg-[#FFF8EE] text-[#F5A623]",
    "bg-[#E8F5E9] text-[#1B893B]",
    "bg-[#FCE4EC] text-[#D32F2F]",
    "bg-[#FFF3E0] text-[#E65100]",
    "bg-[#E3F2FD] text-[#1565C0]",
  ];

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image={t("hero.image")}
        breadcrumbs={[
          { label: tn("home"), href: "/" },
          { label: tn("admissions") },
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

      {/* ── SECTION : Présentation ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <SectionBadge>{t("presentation.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mt-4"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("presentation.title")}
            </h2>
            <p className="text-[#4A5568] mt-4 max-w-3xl mx-auto leading-relaxed">
              {t("presentation.subtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, i) => {
              const IconComponent = HIGHLIGHT_ICONS[i] || CheckCircle;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                  className="bg-[#F7F9FC] rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-lg hover:border-[#1A3A8F]/20 transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 rounded-xl ${highlightColorClasses[i % highlightColorClasses.length]} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={26} />
                  </div>
                  <h3 className="font-display font-bold text-[#1A202C] text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ÉTAPES D'ADMISSION ── */}
      <section className="py-24 bg-[#F7F9FC]">
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
      <section className="py-24 bg-white">
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
                <li key={i} className="flex items-start gap-3 bg-[#F7F9FC] rounded-xl p-4 border border-[#E2E8F0]">
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

            <div className="bg-[#F7F9FC] rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm">
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
                      className={`border-b border-[#E2E8F0] last:border-0 text-sm ${i % 2 === 0 ? "bg-white" : "bg-[#F7F9FC]"}`}
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
      <section className="py-24 bg-[#F7F9FC]">
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

      {/* ── FAQ ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[860px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <SectionBadge variant="red">FAQ</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mt-4"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("faq.title")}
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "bg-[#F7F9FC] border-[#1A3A8F]/20 shadow-md"
                      : "bg-white border-[#E2E8F0] hover:border-[#1A3A8F]/20"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 focus:outline-none focus:ring-2 focus:ring-[#1A3A8F]/20 focus:rounded-2xl"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-[#1A202C] text-sm sm:text-base leading-snug">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={22}
                      className={`text-[#1A3A8F] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ maxHeight: 384, opacity: 1 }}
                        exit={{ maxHeight: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-[#4A5568] text-sm leading-relaxed border-t border-[#E2E8F0] pt-4">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA ── */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div
            className="rounded-3xl overflow-hidden shadow-xl relative"
            style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
          >
            <div className="absolute inset-0 opacity-[0.08]" aria-hidden="true">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="whatsapp-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="5" cy="5" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#whatsapp-pattern)" />
              </svg>
            </div>

            <div className="relative p-8 sm:p-10 lg:p-14 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-display font-bold text-white" style={{ fontSize: "clamp(1.4rem, 2vw, 2rem)" }}>
                  {t("whatsappCta.title")}
                </h2>
                <p className="text-white/90 mt-3 text-base sm:text-lg leading-relaxed max-w-xl">
                  {t("whatsappCta.subtitle")}
                </p>
              </div>

              <div className="lg:flex lg:justify-end">
                <a
                  href="https://wa.me/237651111506"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-white text-[#128C7E] font-bold px-8 py-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full lg:w-auto"
                >
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.003 2.667C8.642 2.667 2.67 8.639 2.67 16.001c0 2.375.626 4.685 1.817 6.693L2.667 29.333l6.841-1.767a13.28 13.28 0 006.492 1.701h.003c7.362 0 13.334-5.972 13.334-13.333S23.365 2.667 16.003 2.667zm7.307 18.788c-.284.795-1.638 1.502-2.285 1.598-.582.087-1.32.119-2.116-.137-.482-.154-1.1-.363-1.898-.712-3.332-1.465-5.506-4.875-5.675-5.094-.169-.22-1.376-1.831-1.376-3.491 0-1.659.876-2.474 1.186-2.815.31-.341.675-.427.9-.427h.643c.206 0 .482-.078.754.585.284.712.966 2.466 1.052 2.641.087.174.146.382.029.617-.116.235-.175.382-.349.585-.174.203-.368.454-.524.613-.175.175-.357.366-.153.72.203.354.901 1.489 1.935 2.409 1.327 1.184 2.443 1.547 2.789 1.722.349.175.552.146.756-.087.203-.232.872-1.015 1.097-1.368.226-.354.452-.296.757-.179.304.116 1.92.903 2.247 1.065.327.16.547.238.629.373.082.135.082.791-.202 1.586z" fill="#25D366" />
                  </svg>
                  <span>{t("whatsappCta.button")}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
