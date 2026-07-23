import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  const t  = useTranslations("footer");
  const tc = useTranslations("contact");
  const tn = useTranslations("nav");

  const quickLinks = [
    { key: "school",     href: "/presentation" },
    { key: "programs",   href: "/programmes" },
    { key: "admissions", href: "/admissions" },
    { key: "life",       href: "/vie-scolaire" },
    { key: "news",       href: "/actualites" },
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
              src="/logo/logo.jpg"
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
          <div className="flex gap-3 mb-6">
            <a
              href="https://www.facebook.com/lesgeniesdafrique"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tc("facebookLabel")}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition-colors duration-200"
            >
              {/* Facebook SVG */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </a>
            <a
              href={`https://wa.me/237651111506`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tc("whatsappLabel")}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-colors duration-200"
            >
              {/* WhatsApp icon SVG */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.555 4.112 1.522 5.837L.057 23.882l6.26-1.44A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.373l-.36-.213-3.716.855.885-3.618-.233-.371A9.818 9.818 0 1112 21.818z"/>
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@lesgeniesdafrique"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tc("tiktokLabel")}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#010101] flex items-center justify-center transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.35 6.35 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.84 4.84 0 01-1.03-.07z"/>
              </svg>
            </a>
          </div>

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
