import { useTranslations } from "next-intl";
import {
  Globe, Shield, Sprout, GraduationCap, Heart, Lightbulb,
} from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

const ICON_MAP: Record<string, React.ReactNode> = {
  Globe:          <Globe          size={28} className="text-[#1A3A8F]" />,
  Shield:         <Shield         size={28} className="text-[#1A3A8F]" />,
  Sprout:         <Sprout         size={28} className="text-[#1A3A8F]" />,
  GraduationCap:  <GraduationCap  size={28} className="text-[#1A3A8F]" />,
  Heart:          <Heart          size={28} className="text-[#1A3A8F]" />,
  Lightbulb:      <Lightbulb      size={28} className="text-[#1A3A8F]" />,
};

export default function WhyUsSection() {
  const t = useTranslations("whyUs");
  const items = t.raw("items") as { icon: string; title: string; body: string }[];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

        <div className="text-center mb-16">
          <SectionBadge>{t("badge")}</SectionBadge>
          <h2
            className="font-display font-bold text-[#1A202C]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.75rem)" }}
          >
            {t("title")}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-[#F7F9FC] border border-transparent
                hover:border-[#1A3A8F]/20 hover:shadow-[0_8px_32px_rgba(26,58,143,0.10)]
                hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] flex items-center justify-center mb-5
                group-hover:bg-[#1A3A8F] group-hover:scale-110 transition-all duration-300">
                <span className="group-hover:[&>svg]:text-white transition-colors duration-300">
                  {ICON_MAP[item.icon] ?? <Globe size={28} className="text-[#1A3A8F]" />}
                </span>
              </div>
              <h3 className="font-display font-bold text-[#1A202C] text-lg mb-3">
                {item.title}
              </h3>
              <p className="text-[#4A5568] text-sm leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
