import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

export default function ProgramsSection() {
  const t = useTranslations("programs");
  const items = t.raw("items") as {
    id: string;
    badge: string;
    title: string;
    body: string;
    image: string;
  }[];

  return (
    <section className="py-24 bg-[#F7F9FC]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* En-tête */}
        <div className="text-center mb-16">
          <SectionBadge>{t("badge")}</SectionBadge>
          <h2
            className="font-display font-bold text-[#1A202C] mb-4"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.75rem)" }}
          >
            {t("title")}
          </h2>
          <p className="text-[#4A5568] text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Grille 2×2 */}
        <div className="grid sm:grid-cols-2 gap-8">
          {items.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(26,58,143,0.08)]
                hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(26,58,143,0.15)]
                transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                {/* Badge niveau */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1A3A8F]/90
                  text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  {item.badge}
                </span>
              </div>

              {/* Contenu */}
              <div className="p-7 border-t-4 border-[#D32F2F]">
                <h3 className="font-display font-bold text-[#1A202C] text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-[#4A5568] text-base leading-relaxed mb-6">
                  {item.body}
                </p>
                <Link
                  href={`/programmes/${item.id}`}
                  className="inline-flex items-center gap-2 text-[#1A3A8F] font-semibold text-sm
                    hover:gap-3 transition-all duration-200"
                >
                  {t("cta")}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
