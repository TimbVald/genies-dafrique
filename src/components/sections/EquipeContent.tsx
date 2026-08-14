"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Users, ArrowLeft, BookOpen, Globe, ImageOff } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import { getTeachingStaff } from "@/lib/data/about";
import type { TeachingStaff } from "@/data/about/equipe";

/* ── Animations ──────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const gridAnim: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const cardAnim: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* ── Couleurs de rôle ─────────────────────────────────────────────── */
function getRoleAccent(role: string): { bg: string; text: string; dot: string } {
  const r = role.toLowerCase();
  if (r.includes("anglais") || r.includes("english"))
    return { bg: "#EEF2FF", text: "#1A3A8F", dot: "#1A3A8F" };
  if (r.includes("français") || r.includes("french"))
    return { bg: "#FFF0F0", text: "#D32F2F", dot: "#D32F2F" };
  return { bg: "#F0FFF4", text: "#2E7D32", dot: "#2E7D32" };
}

/* ── Carte enseignant ─────────────────────────────────────────────── */
function TeacherCard({ member, locale }: { member: TeachingStaff; locale: string }) {
  const role   = member.role[locale as keyof typeof member.role] || member.role.fr;
  const accent = getRoleAccent(role);

  return (
    <motion.article
      variants={cardAnim}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 22 } }}
      className="group relative bg-white rounded-2xl overflow-hidden
        border border-[#E2E8F0] shadow-sm hover:shadow-xl
        transition-shadow duration-300 flex flex-col"
    >
      {/* ── Photo portrait ── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
        {member.photoConfirmed ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          /* Placeholder tant que la photo n'est pas fournie */
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: "linear-gradient(135deg, #EEF2FF 0%, #F7F9FC 100%)" }}
          >
            <div className="w-20 h-20 rounded-full bg-[#1A3A8F]/10 flex items-center justify-center">
              <Users size={36} className="text-[#1A3A8F]/40" />
            </div>
            <span className="text-[#1A3A8F]/35 text-xs font-medium uppercase tracking-wide flex items-center gap-1.5">
              <ImageOff size={12} />
              {locale === "fr" ? "Photo à valider" : locale === "en" ? "Photo pending" : "Photo a kɔ́l"}
            </span>
          </div>
        )}

        {/* Overlay au hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            background:
              "linear-gradient(to top, rgba(13,31,107,0.65) 0%, rgba(13,31,107,0.15) 50%, transparent 100%)",
          }}
        />

        {/* Initiales flottantes */}
        <motion.div
          className="absolute bottom-3 left-3 w-11 h-11 rounded-full
            bg-white/90 backdrop-blur-sm shadow-lg
            flex items-center justify-center
            opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100
            transition-all duration-300 z-10"
          aria-hidden="true"
        >
          <span className="font-display font-bold text-sm" style={{ color: accent.text }}>
            {member.name
              .split(" ")
              .map(w => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </span>
        </motion.div>
      </div>

      {/* ── Infos ── */}
      <div className="flex flex-col flex-1 p-5 text-center">
        <h3 className="font-display font-bold text-[#1A202C] text-base leading-snug mb-2">
          {member.name}
        </h3>

        {/* Badge rôle coloré */}
        <div className="flex justify-center">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: accent.bg, color: accent.text }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: accent.dot }}
              aria-hidden="true"
            />
            {role}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ════════════════════════════════════════════════════════════════════
   PAGE PRINCIPALE
═══════════════════════════════════════════════════════════════════════ */
export default function EquipeContent() {
  const t      = useTranslations("equipePage");
  const tn     = useTranslations("nav");
  const locale = useLocale();
  const staff  = getTeachingStaff();

  /* Stats rapides par matière */
  const englishCount = staff.filter(m =>
    (m.role.fr.toLowerCase().includes("anglais"))
  ).length;
  const frenchCount = staff.filter(m =>
    (m.role.fr.toLowerCase().includes("français"))
  ).length;
  const otherCount  = staff.length - englishCount - frenchCount;

  return (
    <>
      {/* ── HERO ── */}
      <PageHero
        image="/images/IMG-20260723-WA0024.jpg"
        breadcrumbs={[
          { label: tn("home"),  href: "/" },
          { label: tn("about"), href: "/a-propos" },
          { label: t("breadcrumb") },
        ]}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* ── INTRO ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[860px] mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionBadge>{t("intro.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mt-2 mb-5"
              style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)" }}
            >
              {t("intro.title")}
            </h2>
            <p className="text-[#4A5568] leading-relaxed text-lg max-w-2xl mx-auto">
              {t("intro.body")}
            </p>
          </motion.div>

          {/* ── Bande stats rapides ── */}
          <motion.div
            className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {[
              { value: staff.length,    labelFr: "Enseignants",         labelEn: "Teachers",              labelEw: "Banyɛ ba akom", color: "#1A3A8F" },
              { value: englishCount,    labelFr: "Section anglaise",    labelEn: "English section",       labelEw: "Mfañ ya English", color: "#2D5BE3" },
              { value: frenchCount + otherCount, labelFr: "Section française", labelEn: "French section", labelEw: "Mfañ ya Français", color: "#D32F2F" },
            ].map((s, i) => (
              <div key={i} className="bg-[#F7F9FC] rounded-2xl py-5 px-4 border border-[#E2E8F0]">
                <p
                  className="font-display font-bold text-3xl leading-none mb-1"
                  style={{ color: s.color }}
                >
                  {s.value}
                </p>
                <p className="text-[#4A5568] text-xs leading-tight">
                  {locale === "en" ? s.labelEn : locale === "ew" ? s.labelEw : s.labelFr}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── GRILLE ENSEIGNANTS ── */}
      <section className="py-10 pb-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

          {/* Légende des couleurs */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {[
              { labelFr: "Enseignant(e) d'anglais", labelEn: "English Teacher", labelEw: "Munya ya English", bg: "#EEF2FF", text: "#1A3A8F", icon: Globe },
              { labelFr: "Enseignant(e) de français", labelEn: "French Teacher", labelEw: "Munya ya Français", bg: "#FFF0F0", text: "#D32F2F", icon: BookOpen },
              { labelFr: "Enseignant(e)", labelEn: "Teacher", labelEw: "Munya ya sukul", bg: "#F0FFF4", text: "#2E7D32", icon: Users },
            ].map(({ labelFr, labelEn, labelEw, bg, text, icon: Icon }, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border"
                style={{ backgroundColor: bg, color: text, borderColor: `${text}30` }}
              >
                <Icon size={12} aria-hidden="true" />
                {locale === "en" ? labelEn : locale === "ew" ? labelEw : labelFr}
              </span>
            ))}
          </motion.div>

          {/* Grille 4 colonnes desktop */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={gridAnim}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {staff.map(member => (
              <TeacherCard key={member.id} member={member} locale={locale} />
            ))}
          </motion.div>

          {/* ── Avertissement validation photos ── */}
          {staff.some(m => !m.photoConfirmed) && (
            <motion.div
              className="mt-14 max-w-2xl mx-auto p-5 rounded-2xl border border-[#F5A623]/40
                bg-[#FFF8EE] flex items-start gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span className="text-2xl flex-shrink-0" aria-hidden="true">⚠️</span>
              <div>
                <p className="font-bold text-[#B37000] text-sm mb-1">
                  {locale === "fr"
                    ? "Photos en attente de validation"
                    : locale === "en"
                    ? "Photos pending validation"
                    : "Minkɔ́lɔ́ a tɔ́l validation"}
                </p>
                <p className="text-[#4A5568] text-xs leading-relaxed">
                  {locale === "fr"
                    ? "Les photos de certains enseignants sont en cours de traitement. Elles seront mises à jour après validation par la direction. Les noms complets et rôles sont à confirmer avant publication définitive."
                    : locale === "en"
                    ? "Photos for some teachers are being processed. They will be updated after validation by the school management. Full names and roles are to be confirmed before final publication."
                    : "Minkɔ́lɔ́ ya banyɛ ba akom bi ne a kɔ́l na direction. Biɔ bi nga yɔ́k na validation ya direction."}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── CTA retour À propos ── */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}
      >
        <div className="max-w-[760px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <h2
              className="font-display font-bold text-white mb-4"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
            >
              {t("cta.title")}
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed max-w-lg mx-auto">
              {t("cta.subtitle")}
            </p>
            <Link
              href="/a-propos"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl
                bg-white/15 hover:bg-white/25 border border-white/25 hover:border-white/45
                text-white font-semibold text-sm transition-all duration-200 group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              {t("cta.back")}
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
