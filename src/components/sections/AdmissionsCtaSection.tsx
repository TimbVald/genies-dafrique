import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Calendar, MapPin, Phone, Download, ArrowRight } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

export default function AdmissionsCtaSection() {
  const t  = useTranslations("admissionsCta");
  const tc = useTranslations("contact");

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Image de fond */}
      <Image
        src="/images/IMG-20260723-WA0039.jpg"
        alt=""
        fill
        className="object-cover object-center"
        aria-hidden="true"
        sizes="100vw"
      />
      {/* Overlay rouge foncé */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(183,28,28,0.88)" }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 text-center">
        <SectionBadge variant="white">{t("badge")}</SectionBadge>

        <h2
          className="font-display font-bold text-white mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          {t("title")}
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
          {t("subtitle")}
        </p>

        {/* Encadré infos */}
        <div className="inline-block bg-white/15 backdrop-blur-sm rounded-2xl px-8 py-6 mb-10 text-left border border-white/30">
          <div className="flex flex-col sm:flex-row gap-6 text-white">
            <div className="flex items-start gap-3">
              <Calendar size={20} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">{t("scheduleLabel")}</p>
                <p className="text-white/70 text-sm">{t("schedule")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={20} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">{tc("phone1")}</p>
                <p className="text-white/70 text-sm">{tc("phone2")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
              <p className="text-white/70 text-sm">{t("address")}</p>
            </div>
          </div>
        </div>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg
              bg-white text-[#D32F2F] font-bold hover:bg-white/90 hover:-translate-y-1
              transition-all duration-200 shadow-lg"
          >
            {t("ctaPrimary")}
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/admissions"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg
              border-2 border-white/80 text-white font-semibold hover:bg-white/15 hover:-translate-y-1
              transition-all duration-200"
          >
            <Download size={18} />
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
