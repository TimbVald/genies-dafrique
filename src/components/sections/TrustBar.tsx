import { School, BookOpen, Globe, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

const ICON_MAP: Record<string, React.ReactNode> = {
  School:   <School   size={20} className="text-[#1A3A8F]" />,
  BookOpen: <BookOpen size={20} className="text-[#1A3A8F]" />,
  Globe:    <Globe    size={20} className="text-[#1A3A8F]" />,
  Phone:    <Phone    size={20} className="text-[#1A3A8F]" />,
};

export default function TrustBar() {
  const t = useTranslations("trustBar");
  const items = t.raw("items") as { icon: string; label: string }[];

  return (
    <section className="bg-white border-b border-[#E2E8F0] shadow-sm">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E2E8F0]">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-3 py-4 px-4"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                {ICON_MAP[item.icon] ?? <Globe size={20} className="text-[#1A3A8F]" />}
              </div>
              <span className="text-[#1A3A8F] font-semibold text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
