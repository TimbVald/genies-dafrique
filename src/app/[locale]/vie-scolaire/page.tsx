import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Images } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";

const CLUB_EMOJIS = ["📚", "🎨", "🎵", "⚽", "🌱", "💡"];

const ACTIVITY_ICONS = ["🌅", "👥", "🌿", "📖"];

const ACTIVITY_GALLERY = [
  "/images/IMG-20260723-WA0007.jpg",
  "/images/IMG-20260723-WA0012.jpg",
  "/images/IMG-20260723-WA0015.jpg",
  "/images/IMG-20260723-WA0017.jpg",
  "/images/IMG-20260723-WA0018.jpg",
  "/images/IMG-20260723-WA0022.jpg",
  "/images/IMG-20260723-WA0037.jpg",
  "/images/IMG-20260723-WA0051.jpg",
];

const OUTING_IMAGES = [
  "/images/IMG-20260723-WA0022.jpg",
  "/images/pexels-karola-g-7269671.jpg",
  "/images/pexels-ai25studioai-7342628.jpg",
];

const OUTING_DATES = [
  "15 octobre 2025",
  "22 janvier 2026",
  "18 mars 2026",
];

const OUTING_LOCATIONS = [
  "Musée National, Yaoundé",
  "Ferme de Mbankomo",
  "Réserve de Mbam Minkom",
];

const EVENT_IMAGES = [
  "/images/IMG-20260723-WA0006.jpg",
  "/images/IMG-20260723-WA0034.jpg",
  "/images/IMG-20260723-WA0039.jpg",
  "/images/IMG-20260723-WA0046.jpg",
];

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Vie Scolaire", description: "Découvrez la vie scolaire" };
}

export default function VieScolairePage() {
  return <VieScolaireContent />;
}

function VieScolaireContent() {
  "use client";
  const t = useTranslations("lifePage");
  const tn = useTranslations("nav");

  const clubs = t.raw("clubs.items") as Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  const activities = t.raw("activities.items") as Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  const outings = t.raw("outings.items") as Array<{
    title: string;
    description: string;
    photos?: string[];
  }>;

  const events = t.raw("events.items") as Array<{
    title: string;
    month?: string;
    description: string;
  }>;

  return (
    <>
      <PageHero
        image="/images/IMG-20260723-WA0024.jpg"
        breadcrumbs={[
          { label: tn("home"), href: "/" },
          { label: tn("life") },
        ]}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* ── SECTION CLUBS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <SectionBadge>{t("clubs.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C]"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("clubs.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="bg-[#F7F9FC] rounded-2xl border border-[#E2E8F0] p-7
                  hover:shadow-[0_8px_32px_rgba(26,58,143,0.10)]
                  transition-all duration-300"
              >
                <div className="text-4xl mb-5">
                  {CLUB_EMOJIS[i] ?? "🎭"}
                </div>
                <h3 className="font-display font-bold text-[#1A202C] text-lg mb-3">
                  {club.title}
                </h3>
                <p className="text-[#4A5568] text-sm leading-relaxed">
                  {club.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION ACTIVITÉS QUOTIDIENNES ── */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <SectionBadge>{t("activities.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C]"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("activities.title")}
            </h2>
            <p className="text-[#4A5568] mt-3 max-w-2xl mx-auto">
              {t("activities.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {activities.map((act, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl p-6 border border-[#E2E8F0] text-center
                  hover:border-[#1A3A8F]/30 hover:shadow-[0_8px_32px_rgba(26,58,143,0.10)]
                  transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] flex items-center justify-center mb-4 mx-auto text-2xl
                  group-hover:bg-[#1A3A8F] group-hover:scale-110 transition-all duration-300">
                  {ACTIVITY_ICONS[i] ?? "✨"}
                </div>
                <h3 className="font-display font-bold text-[#1A202C] text-base mb-2">
                  {act.title}
                </h3>
                <p className="text-[#4A5568] text-sm leading-relaxed">
                  {act.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mb-10">
            <h3
              className="font-display font-bold text-[#1A202C]"
              style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
            >
              Galerie des activités
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {ACTIVITY_GALLERY.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className={`relative overflow-hidden rounded-xl group ${
                  i % 5 === 0 ? "sm:row-span-2 sm:aspect-[3/4]" : ""
                } aspect-square`}
              >
                <Image
                  src={src}
                  alt={`Activité ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A8F]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION SORTIES PÉDAGOGIQUES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <SectionBadge>{t("outings.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C]"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("outings.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {outings.slice(0, 3).map((outing, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E2E8F0]
                  hover:shadow-[0_12px_40px_rgba(26,58,143,0.12)]
                  transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={OUTING_IMAGES[i]}
                    alt={outing.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                    <Calendar size={13} className="text-[#1A3A8F]" />
                    <span className="text-xs font-semibold text-[#1A202C]">
                      {OUTING_DATES[i]}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-[#4A5568] text-xs mb-2">
                    <MapPin size={13} className="text-[#D32F2F]" />
                    <span>{OUTING_LOCATIONS[i]}</span>
                  </div>
                  <h3 className="font-display font-bold text-[#1A202C] text-lg mb-3">
                    {outing.title}
                  </h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed mb-5 flex-1">
                    {outing.description}
                  </p>
                  <Link
                    href="/galerie"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#EEF2FF] text-[#1A3A8F]
                      text-sm font-semibold self-start
                      hover:bg-[#1A3A8F] hover:text-white transition-colors duration-200"
                  >
                    <Images size={15} />
                    Voir les photos
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION MANIFESTATIONS CULTURELLES ── */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <SectionBadge>{t("events.badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C]"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              {t("events.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.slice(0, 4).map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ scale: 1.01 }}
                className="group relative rounded-2xl overflow-hidden aspect-[16/10]
                  shadow-[0_8px_32px_rgba(26,58,143,0.12)]"
              >
                <Image
                  src={EVENT_IMAGES[i]}
                  alt={ev.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-600"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,31,107,0.95) 0%, rgba(13,31,107,0.55) 45%, rgba(13,31,107,0.15) 80%, transparent 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-8">
                  {ev.month && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 rounded-full bg-[#F5A623] flex items-center justify-center shadow-md">
                        <Calendar size={15} className="text-white" />
                      </div>
                      <span className="text-white/90 text-sm font-semibold">
                        {ev.month}
                      </span>
                    </div>
                  )}
                  <h3 className="font-display font-bold text-white text-xl lg:text-2xl mb-2">
                    {ev.title}
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed max-w-lg">
                    {ev.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%)" }}
      >
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-white text-2xl lg:text-3xl mb-4">
              Votre enfant mérite le meilleur
            </h2>
            <p className="text-white/75 mb-8 italic text-sm">
              Rejoignez la famille des Génies d&apos;Afrique — les inscriptions sont ouvertes.
            </p>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#D32F2F] text-white
                font-semibold shadow-[0_4px_20px_rgba(211,47,47,0.4)]
                hover:bg-[#B71C1C] hover:-translate-y-0.5 transition-all duration-200"
            >
              S&apos;inscrire maintenant
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
