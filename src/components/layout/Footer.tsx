import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SocialIcons from "@/components/ui/SocialIcons";

export default function Footer() {
  const t  = useTranslations("footer");
  const tc = useTranslations("contact");
  const tn = useTranslations("nav");

  const quickLinks = [
    { key: "about",      href: "/a-propos" },
    { key: "formations", href: "/formations" },
    { key: "admissions", href: "/admissions" },
    { key: "life",       href: "/vie-scolaire" },
    { key: "news",       href: "/actualites" },
    { key: "gallery",    href: "/galerie" },
    { key: "contact",    href: "/contact" },
  ] as const;

  return (
    <footer className="bg-[#0D1F6B] text-white">
      {/* Ligne accent rouge */}
      <div className="h-1 bg-[#D32F2F]" />

      {/* Corps du footer */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* COL 1 — Identité */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <Image
              src="/logo/logo.png"
              alt="Les Génies d'Afrique"
              width={52}
              height={52}
              className="rounded-full object-cover border-2 border-white/30"
            />
            <span className="font-bold text-base leading-tight">
              Les Génies<br />d&apos;Afrique
            </span>
          </Link>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            {t("tagline")}
          </p>
          <p className="text-white/50 text-xs">
            Complexe Scolaire Bilingue<br />
            Agrément MINEDUB N°103/2025
          </p>
        </div>

        {/* COL 2 — Liens rapides */}
        <div>
          <h3 className="font-bold text-base mb-5 text-white">
            {t("quickLinks")}
          </h3>
          <ul className="space-y-2.5">
            {quickLinks.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="text-white/70 text-sm hover:text-white hover:pl-1 transition-all duration-200"
                >
                  {tn(key as keyof typeof tn)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/mentions-legales" className="text-white/70 text-sm hover:text-white hover:pl-1 transition-all duration-200">
                {t("legal")}
              </Link>
            </li>
          </ul>
        </div>

        {/* COL 3 — Contact */}
        <div>
          <h3 className="font-bold text-base mb-5 text-white">
            {t("contactUs")}
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-white/70 text-sm">
              <MapPin size={16} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
              <span className="whitespace-pre-line">{tc("address")}</span>
            </li>
            <li className="flex gap-3 text-white/70 text-sm">
              <Phone size={16} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
              <span>
                <a href={`tel:+237${tc("phone1").replace(/ /g,"")}`} className="hover:text-white block">{tc("phone1")}</a>
                <a href={`tel:+237${tc("phone2").replace(/ /g,"")}`} className="hover:text-white block">{tc("phone2")}</a>
              </span>
            </li>
            <li className="flex gap-3 text-white/70 text-sm">
              <Mail size={16} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
              <a href={`mailto:${tc("email")}`} className="hover:text-white break-all">
                {tc("email")}
              </a>
            </li>
          </ul>
        </div>

        {/* COL 4 — Réseaux & horaires */}
        <div>
          <h3 className="font-bold text-base mb-5 text-white">
            {t("followUs")}
          </h3>

          {/* Icônes sociales — données depuis src/data/global/reseaux-sociaux.ts */}
          <SocialIcons variant="compact" theme="dark" className="mb-6" />

          <div className="flex gap-3 text-white/70 text-sm">
            <Clock size={16} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
            <span>
              <span className="font-medium text-white block mb-0.5">{t("hours")}</span>
              {t("hoursValue")}
            </span>
          </div>
        </div>
      </div>

      {/* Bande copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/50 text-xs">
          <p>© {new Date().getFullYear()} Complexe Scolaire Bilingue Les Génies d&apos;Afrique — {t("copyright")}</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">{t("legal")}</Link>
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">{t("privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
