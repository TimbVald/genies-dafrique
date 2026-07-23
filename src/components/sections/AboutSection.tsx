import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { CheckCircle2, ArrowRight } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

export default function AboutSection() {
  const t = useTranslations("about");
  const features = t.raw("features") as string[];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Texte */}
          <div>
            <SectionBadge>{t("badge")}</SectionBadge>
            <h2
              className="font-display font-bold text-[#1A202C] mb-6"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.75rem)" }}
            >
              {t("title")}
            </h2>
            <p className="text-[#4A5568] text-lg leading-relaxed mb-8">
              {t("body")}
            </p>

            <ul className="space-y-3 mb-10">
              {features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-[#D32F2F] flex-shrink-0 mt-0.5"
                  />
                  <span className="text-[#4A5568] text-base">{feat}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/presentation"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#1A3A8F]
                text-[#1A3A8F] font-semibold hover:bg-[#1A3A8F] hover:text-white transition-all duration-200"
            >
              {t("cta")}
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/IMG-20260723-WA0005.jpg"
                alt="Élèves des Génies d'Afrique en classe"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Badge flottant */}
            <div className="absolute -bottom-6 -left-6 bg-[#1A3A8F] text-white rounded-2xl px-6 py-4 shadow-xl hidden lg:block">
              <p className="text-3xl font-bold text-[#F5A623] font-display">2025</p>
              <p className="text-xs text-white/80 mt-0.5">Agrément MINEDUB</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
