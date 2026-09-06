"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import {
  ClipboardList, Send, Users, CheckCircle2,
  Calendar, Phone, MapPin, ChevronDown, CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import EnrollForm from "@/components/sections/EnrollForm";
import { getAdmissionSteps, getAdmissionDocuments, getAdmissionFees } from "@/lib/data/admissions";

const ICON_MAP: Record<string, React.ReactNode> = {
  ClipboardList: <ClipboardList size={26} className="text-white" />,
  Send:          <Send          size={26} className="text-white" />,
  Users:         <Users         size={26} className="text-white" />,
  CheckCircle2:  <CheckCircle2  size={26} className="text-white" />,
};
function getIcon(name: string) { return ICON_MAP[name] ?? <ClipboardList size={26} className="text-white" />; }

const STEP_COLORS = ["#1A3A8F", "#D32F2F", "#F5A623", "#2E7D32"];

interface FaqItem { question: string; answer: string; }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function AdmissionsPage() {
  const t   = useTranslations("admissionsPage");
  const tn  = useTranslations("nav");
  const locale = useLocale();
  const faqItems = t.raw("faq.items") as FaqItem[];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps    = getAdmissionSteps();
  const documents = getAdmissionDocuments();
  const fees      = getAdmissionFees();

  return (
    <>
      <PageHero
        image="/images/IMG-20260723-WA0039.jpg"
        breadcrumbs={[{ label: tn("home"), href: "/" }, { label: tn("admissions") }]}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* ── PROCESS STEPS ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div className="text-center mb-14" initial="hidden" whileInView="show"
            viewport={{ once: true }} variants={fadeUp}>
            <SectionBadge>{t("process.badge")}</SectionBadge>
            <h2 className="font-display font-bold text-[#1A202C] mt-3 mb-2"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}>{t("process.title")}</h2>
            <p className="text-[#4A5568] max-w-xl mx-auto text-sm">{t("process.subtitle")}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => {
              const color = STEP_COLORS[i % STEP_COLORS.length];
              return (
                <motion.div key={step.id}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white
                    shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Color top bar */}
                  <div className="h-1.5 w-full" style={{ backgroundColor: color }} />
                  <div className="p-6">
                    {/* Icon + step number */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                        style={{ backgroundColor: color }}>
                        {getIcon(step.icon)}
                      </div>
                      <span className="text-3xl font-display font-bold opacity-10 select-none"
                        style={{ color }}>
                        {String(step.step).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#1A202C] text-base mb-2 leading-snug">
                      {step.title[locale as keyof typeof step.title] || step.title.fr}
                    </h3>
                    <p className="text-[#4A5568] text-sm leading-relaxed">
                      {step.description[locale as keyof typeof step.description] || step.description.fr}
                    </p>
                  </div>
                  {/* Connector arrow (desktop) */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10
                      w-6 h-6 rounded-full items-center justify-center bg-white border border-[#E2E8F0] shadow-sm">
                      <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[7px]"
                        style={{ borderLeftColor: color }} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS ─────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="show"
            viewport={{ once: true }} variants={fadeUp}>
            <SectionBadge>{t("documents.badge")}</SectionBadge>
            <h2 className="font-display font-bold text-[#1A202C] mt-3"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}>{t("documents.title")}</h2>
          </motion.div>

          <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="show"
            viewport={{ once: true }} variants={fadeUp}>
            <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0]">
                {/* Required */}
                <div className="p-6 lg:p-8">
                  <h3 className="font-bold text-[#1A3A8F] text-sm uppercase tracking-wide mb-5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1A3A8F]" />
                    {locale === "fr" ? "Documents obligatoires" : "Required documents"}
                  </h3>
                  <ul className="space-y-3">
                    {documents.filter(d => d.required).map(doc => (
                      <li key={doc.id} className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-[#1B893B] flex-shrink-0 mt-0.5" />
                        <span className="text-[#1A202C] text-sm leading-relaxed">
                          {doc.name[locale as keyof typeof doc.name] || doc.name.fr}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Optional */}
                <div className="p-6 lg:p-8">
                  <h3 className="font-bold text-[#4A5568] text-sm uppercase tracking-wide mb-5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#A0AEC0]" />
                    {locale === "fr" ? "Documents optionnels" : "Optional documents"}
                  </h3>
                  <ul className="space-y-3">
                    {documents.filter(d => !d.required).map(doc => (
                      <li key={doc.id} className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-[#A0AEC0] flex-shrink-0 mt-0.5" />
                        <span className="text-[#4A5568] text-sm leading-relaxed">
                          {doc.name[locale as keyof typeof doc.name] || doc.name.fr}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEES ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="show"
            viewport={{ once: true }} variants={fadeUp}>
            <SectionBadge variant="gold">{t("fees.badge")}</SectionBadge>
            <h2 className="font-display font-bold text-[#1A202C] mt-3"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}>{t("fees.title")}</h2>
          </motion.div>

          <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="show"
            viewport={{ once: true }} variants={fadeUp}>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0] bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[500px]">
                  <thead>
                    <tr style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}>
                      <th className="px-6 py-4 text-white font-bold text-sm tracking-wide">{t("fees.level")}</th>
                      <th className="px-6 py-4 text-white font-bold text-sm tracking-wide">{t("fees.age")}</th>
                      <th className="px-6 py-4 text-white font-bold text-sm tracking-wide">{t("fees.tuition")}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#E2E8F0]">
                    {fees.map((fee, i) => (
                      <tr key={fee.id} className="hover:bg-[#EEF2FF]/60 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#1A202C] text-sm">
                          {fee.level[locale as keyof typeof fee.level] || fee.level.fr}
                        </td>
                        <td className="px-6 py-4 text-[#4A5568] text-sm font-medium">
                          {fee.ageRange[locale as keyof typeof fee.ageRange] || fee.ageRange.fr}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#EEF2FF] text-[#1A3A8F] border border-[#1A3A8F]/15">
                            {fee.tuition[locale as keyof typeof fee.tuition] || fee.tuition.fr}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-center text-[#4A5568] text-xs mt-4 italic">
              {locale === "fr"
                ? "* Grille tarifaire détaillée remise lors de la visite de l'établissement."
                : locale === "en"
                ? "* Full fee schedule provided during your school visit."
                : "* Biyem ya prix bi nga yen na fam nyonso."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="show"
            viewport={{ once: true }} variants={fadeUp}>
            <SectionBadge>{t("faq.badge")}</SectionBadge>
            <h2 className="font-display font-bold text-[#1A202C] mt-3"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}>{t("faq.title")}</h2>
          </motion.div>

          <motion.div className="max-w-3xl mx-auto space-y-3" initial="hidden" whileInView="show"
            viewport={{ once: true }} variants={fadeUp}>
            {faqItems.map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-[#E2E8F0] bg-white shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4
                    hover:bg-[#F7F9FC] transition-colors"
                >
                  <span className="font-semibold text-[#1A202C] text-sm pr-4">{item.question}</span>
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center
                    transition-all duration-200 ${openFaq === i ? "bg-[#1A3A8F] rotate-180" : "bg-[#EEF2FF]"}`}>
                    <ChevronDown size={15} className={openFaq === i ? "text-white" : "text-[#1A3A8F]"} />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0 border-t border-[#E2E8F0]">
                        <p className="text-[#4A5568] text-sm leading-relaxed pt-4">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT CARDS ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="show"
            viewport={{ once: true }} variants={fadeUp}>
            <SectionBadge variant="red">{t("contact.badge")}</SectionBadge>
            <h2 className="font-display font-bold text-[#1A202C] mt-3"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}>{t("contact.title")}</h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-3 gap-5 mb-16 max-w-3xl mx-auto"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            {[
              { Icon: Phone,    title: t("contact.phone"), lines: ["651 11 15 06", "656 66 38 48"], color: "#1A3A8F", bg: "#EEF2FF", href: "tel:+237651111506" },
              { Icon: Calendar, title: t("contact.hours"), lines: [t("contact.hoursValue")],         color: "#F5A623", bg: "#FFF8EE", href: null },
              { Icon: MapPin,   title: t("contact.location"), lines: [t("contact.locationValue")],  color: "#D32F2F", bg: "#FFF0F0", href: null },
            ].map(({ Icon, title, lines, color, bg, href }, i) => (
              <div key={i} className="group bg-white rounded-2xl p-6 text-center border border-[#E2E8F0]
                shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4
                  group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: bg }}>
                  <Icon size={26} style={{ color }} />
                </div>
                <h3 className="font-bold text-[#1A202C] mb-2 text-sm">{title}</h3>
                {lines.map((line, j) => (
                  href && j === 0
                    ? <a key={j} href={href} className="block text-[#4A5568] text-sm hover:text-[#1A3A8F] transition-colors">{line}</a>
                    : <p key={j} className="text-[#4A5568] text-sm">{line}</p>
                ))}
              </div>
            ))}
          </motion.div>

          <EnrollForm />
        </div>
      </section>
    </>
  );
}
