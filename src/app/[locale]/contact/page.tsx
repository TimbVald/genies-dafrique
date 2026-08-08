"use client";

import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionBadge from "@/components/ui/SectionBadge";
import ContactForm from "@/components/sections/ContactForm";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const CARD_COLORS = [
  { bg: "#EEF2FF", icon: "#1A3A8F" },
  { bg: "#FFF0F0", icon: "#D32F2F" },
  { bg: "#FFF8EE", icon: "#F5A623" },
  { bg: "#E8F5E9", icon: "#2E7D32" },
];

export default function ContactPage() {
  const t      = useTranslations("contactPage");
  const tn     = useTranslations("nav");
  const tc     = useTranslations("contact");

  const infoCards = t.raw("infoCards") as { icon: string; title: string; lines: string[] }[];

  const ICON_MAP: Record<string, React.ReactNode> = {
    MapPin: <MapPin size={24} />,
    Phone:  <Phone  size={24} />,
    Mail:   <Mail   size={24} />,
    Clock:  <Clock  size={24} />,
  };

  const HREF_MAP: Record<string, (line: string) => string | null> = {
    Phone: (l) => `tel:+237${l.replace(/\s/g, "")}`,
    Mail:  (l) => `mailto:${l}`,
    MapPin: () => null,
    Clock:  () => null,
  };

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/images/IMG-20260723-WA0046.jpg"
        breadcrumbs={[
          { label: tn("home"), href: "/" },
          { label: tn("contact") },
        ]}
      />

      {/* ── INFO CARDS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            initial="hidden" whileInView="show" viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {infoCards.map((card, i) => {
              const colors = CARD_COLORS[i % CARD_COLORS.length];
              const getHref = HREF_MAP[card.icon] ?? (() => null);
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm
                    hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center mb-4
                    group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: colors.bg, color: colors.icon }}>
                    {ICON_MAP[card.icon]}
                  </div>
                  <h3 className="font-display font-bold text-[#1A202C] text-sm mb-3">{card.title}</h3>
                  {card.lines.map((line, j) => {
                    const href = getHref(line);
                    return href ? (
                      <a key={j} href={href}
                        className="block text-sm font-medium transition-colors duration-150 mb-0.5"
                        style={{ color: colors.icon }}>
                        {line}
                      </a>
                    ) : (
                      <p key={j} className="text-[#4A5568] text-sm mb-0.5">{line}</p>
                    );
                  })}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FORM + MAP ── */}
      <section className="py-8 pb-24 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-start">

          {/* Form */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <SectionBadge>{t("writeBadge")}</SectionBadge>
            <h2 className="font-display font-bold text-[#1A202C] mb-2 mt-2"
              style={{ fontSize: "clamp(1.4rem, 2vw, 2rem)" }}>
              {t("form.title")}
            </h2>
            <p className="text-[#4A5568] text-sm mb-8 leading-relaxed">{t("form.subtitle")}</p>
            <ContactForm />
          </motion.div>

          {/* Map + WhatsApp + Social */}
          <motion.div className="space-y-5 pt-2 lg:pt-16"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>

            {/* Google Maps */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0]">
              <iframe
                title={t("mapTitle")}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.8020!2d11.5020!3d3.8480!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNTAnNTMuMCJOIDExwrAzMCcwNy4yIkU!5e0!3m2!1sfr!2scm!4v1720000000000"
                width="100%" height="260" style={{ border: 0 }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* WhatsApp CTA */}
            <a href="https://wa.me/237651111506" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30
                hover:bg-[#25D366]/20 transition-colors duration-200 group">
              <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.555 4.112 1.522 5.837L.057 23.882l6.26-1.44A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.373l-.36-.213-3.716.855.885-3.618-.233-.371A9.818 9.818 0 1112 21.818z"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-[#1A202C] group-hover:text-[#25D366] transition-colors text-sm">
                  {tc("whatsappLabel")}
                </p>
                <p className="text-[#4A5568] text-sm">{tc("phone1")}</p>
              </div>
            </a>

            {/* Social media */}
            <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
              <p className="font-semibold text-[#1A202C] text-sm mb-4 flex items-center gap-2">
                <MessageCircle size={16} className="text-[#1A3A8F]" />
                {t("followUs")}
              </p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/lesgeniesdafrique" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2]/10 text-[#1877F2]
                    font-semibold text-sm hover:bg-[#1877F2] hover:text-white transition-all duration-200">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                  </svg>
                  {tc("facebookLabel")}
                </a>
                <a href="https://www.tiktok.com/@lesgeniesdafrique" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#010101]/10 text-[#1A202C]
                    font-semibold text-sm hover:bg-[#010101] hover:text-white transition-all duration-200">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.35 6.35 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.84 4.84 0 01-1.03-.07z"/>
                  </svg>
                  {tc("tiktokLabel")}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
