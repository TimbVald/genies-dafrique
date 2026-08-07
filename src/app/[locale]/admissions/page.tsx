"use client";

import { useTranslations, useLocale } from "next-intl";
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
import { getAdmissionSteps, getAdmissionDocuments, getAdmissionFees } from "@/lib/data/admissions";

const ICON_MAP: Record<string, React.ReactNode> = {
  ClipboardList: <ClipboardList size={28} className="text-white" />,
  Send: <Send size={28} className="text-white" />,
  Users: <Users size={28} className="text-white" />,
  CheckCircle2: <CheckCircle2 size={28} className="text-white" />,
};

function getIcon(iconName: string): React.ReactNode {
  return ICON_MAP[iconName] ?? <ClipboardList size={28} className="text-white" />;
}

const HIGHLIGHT_ICONS = [CheckCircle, Award, Globe, Heart, Users, Clock];

interface FaqItem {
  question: string;
  answer: string;
}

interface HighlightItem {
  title: string;
  description: string;
}

export default function AdmissionsPage() {
  const t = useTranslations("admissionsPage");
  const tn = useTranslations("nav");
  const locale = useLocale();
  const faqItems = t.raw("faq.items") as FaqItem[];
  const highlights = t.raw("presentation.highlights") as HighlightItem[];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Use data services
  const steps = getAdmissionSteps();
  const documents = getAdmissionDocuments();
  const fees = getAdmissionFees();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const highlightColorClasses = [
    "bg-[#EEF2FF] text-[#1A3A8F]",
    "bg-[#FFF8EE] text-[#F5A623]",
    "bg-[#E8F5E9] text-[#1B893B]",
    "bg-[#FFF0F5] text-[#E91E63]",
    "bg-[#F3E8FF] text-[#7B1FA2]",
    "bg-[#E3F2FD] text-[#0288D1]",
  ];

  return (
    <>
      <PageHero
        image="/images/IMG-20260723-WA0039.jpg"
        breadcrumbs={[
          { label: tn("home"), href: "/" },
          { label: tn("admissions") },
        ]}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <SectionBadge>{t("process.badge")}</SectionBadge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A202C] mt-4 mb-3">
              {t("process.title")}
            </h2>
            <p className="text-[#4A5568] max-w-2xl mx-auto">{t("process.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {steps.map((step, i) => (
              <div key={step.id} className="relative">
                <div className="bg-[#1A3A8F] rounded-2xl p-6 text-white h-full">
                  <div className="flex items-start justify-between mb-4">
                    {getIcon(step.icon)}
                    <span className="text-2xl font-bold opacity-30">{String(step.step).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title[locale as keyof typeof step.title] || step.title.fr}</h3>
                  <p className="text-sm opacity-90">{step.description[locale as keyof typeof step.description] || step.description.fr}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-[#D32F2F]">
                    <ChevronDown size={24} className="rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mb-16">
            <SectionBadge>{t("documents.badge")}</SectionBadge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A202C] mt-4 mb-3">
              {t("documents.title")}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto mb-20">
            <div className="bg-[#F7F9FC] rounded-2xl p-8">
              <ul className="space-y-4">
                {documents.map((doc) => (
                  <li key={doc.id} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-[#1B893B] flex-shrink-0 mt-0.5" />
                    <span className="text-[#1A202C]">
                      {doc.name[locale as keyof typeof doc.name] || doc.name.fr}
                      {!doc.required && <span className="text-[#4A5568] text-sm ml-2">(optionnel / optional)</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mb-16">
            <SectionBadge>{t("fees.badge")}</SectionBadge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A202C] mt-4 mb-3">
              {t("fees.title")}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto mb-20 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#1A3A8F] text-white">
                  <th className="px-6 py-4 rounded-tl-lg">{t("fees.level")}</th>
                  <th className="px-6 py-4">{t("fees.age")}</th>
                  <th className="px-6 py-4 rounded-tr-lg">{t("fees.tuition")}</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => (
                  <tr key={fee.id} className="border-b border-[#E2E8F0]">
                    <td className="px-6 py-4 font-medium">{fee.level[locale as keyof typeof fee.level] || fee.level.fr}</td>
                    <td className="px-6 py-4">{fee.ageRange[locale as keyof typeof fee.ageRange] || fee.ageRange.fr}</td>
                    <td className="px-6 py-4">{fee.tuition[locale as keyof typeof fee.tuition] || fee.tuition.fr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mb-16">
            <SectionBadge>{t("faq.badge")}</SectionBadge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A202C] mt-4 mb-3">
              {t("faq.title")}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto mb-20">
            {faqItems.map((item, i) => (
              <div key={i} className="mb-4">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left bg-[#F7F9FC] rounded-xl p-6 flex items-center justify-between hover:bg-[#EEF2FF] transition-colors"
                >
                  <span className="font-semibold text-[#1A202C]">{item.question}</span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-white rounded-b-xl px-6 pb-6"
                    >
                      <p className="text-[#4A5568] pt-4">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="text-center mb-16">
            <SectionBadge>{t("contact.badge")}</SectionBadge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A202C] mt-4 mb-3">
              {t("contact.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div className="bg-[#F7F9FC] rounded-xl p-6 text-center">
              <Phone size={32} className="text-[#1A3A8F] mx-auto mb-3" />
              <h3 className="font-bold text-[#1A202C] mb-2">{t("contact.phone")}</h3>
              <p className="text-[#4A5568]">651 11 15 06</p>
              <p className="text-[#4A5568]">656 66 38 48</p>
            </div>
            <div className="bg-[#F7F9FC] rounded-xl p-6 text-center">
              <Calendar size={32} className="text-[#1A3A8F] mx-auto mb-3" />
              <h3 className="font-bold text-[#1A202C] mb-2">{t("contact.hours")}</h3>
              <p className="text-[#4A5568]">{t("contact.hoursValue")}</p>
            </div>
            <div className="bg-[#F7F9FC] rounded-xl p-6 text-center">
              <MapPin size={32} className="text-[#1A3A8F] mx-auto mb-3" />
              <h3 className="font-bold text-[#1A202C] mb-2">{t("contact.location")}</h3>
              <p className="text-[#4A5568]">{t("contact.locationValue")}</p>
            </div>
          </div>

          <EnrollForm />
        </div>
      </section>
    </>
  );
}