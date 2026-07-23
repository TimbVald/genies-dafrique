"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_ITEMS = [
  { key: "home",       href: "/" },
  { key: "school",     href: "/presentation" },
  { key: "programs",   href: "/programmes" },
  { key: "admissions", href: "/admissions" },
  { key: "life",       href: "/vie-scolaire" },
  { key: "news",       href: "/actualites" },
  { key: "contact",    href: "/contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const tAnn = useTranslations();
  const locale = useLocale();

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [annVisible, setAnnVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le drawer au resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setDrawerOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const altLocale = locale === "fr" ? "en" : "fr";
  const altHref   = locale === "fr" ? `/en` : `/`;

  return (
    <>
      {/* ── Bandeau annonce ── */}
      {annVisible && (
        <div className="bg-[#D32F2F] text-white text-sm py-2 px-4 text-center relative">
          <span>{tAnn("announcement")}</span>
          <button
            onClick={() => setAnnVisible(false)}
            aria-label="Fermer l'annonce"
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-75 hover:opacity-100"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* ── Header principal ── */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logo/logo.jpg"
              alt="Les Génies d'Afrique"
              width={52}
              height={52}
              className="rounded-full object-cover"
            />
            <div className="hidden sm:block leading-tight">
              <p className={`font-bold text-sm ${scrolled ? "text-[#1A3A8F]" : "text-white"}`}>
                Les Génies d&apos;Afrique
              </p>
              <p className={`text-xs ${scrolled ? "text-[#4A5568]" : "text-white/80"}`}>
                Complexe Scolaire Bilingue
              </p>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={`relative px-3 py-2 text-[15px] font-medium tracking-wide transition-colors duration-200
                  after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#D32F2F]
                  after:transition-all after:duration-300 hover:after:w-full
                  ${scrolled ? "text-[#1A202C] hover:text-[#1A3A8F]" : "text-white/90 hover:text-white"}`}
              >
                {t(key as keyof typeof t)}
              </Link>
            ))}
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-3">
            {/* Sélecteur langue */}
            <Link
              href={altHref}
              className={`hidden sm:flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors duration-200
                ${scrolled
                  ? "border-[#1A3A8F] text-[#1A3A8F] hover:bg-[#1A3A8F] hover:text-white"
                  : "border-white/70 text-white hover:bg-white/15"}`}
            >
              {t("language")}
            </Link>

            {/* CTA S'inscrire */}
            <Link
              href="/admissions"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-[#D32F2F] text-white text-sm font-semibold
                shadow-[0_4px_15px_rgba(211,47,47,0.35)] hover:bg-[#B71C1C] hover:-translate-y-0.5
                transition-all duration-200"
            >
              {t("enroll")}
            </Link>

            {/* Hamburger mobile */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label={t("openMenu")}
              className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-[#1A202C]" : "text-white"}`}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Overlay mobile ── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Drawer mobile ── */}
      <aside
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[360px] bg-white z-50 shadow-2xl
          transform transition-transform duration-300 ease-in-out lg:hidden
          ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header drawer */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
          <Link href="/" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3">
            <Image
              src="/logo/logo.jpg"
              alt="Les Génies d'Afrique"
              width={44}
              height={44}
              className="rounded-full object-cover"
            />
            <span className="font-bold text-[#1A3A8F] text-sm leading-tight">
              Les Génies d&apos;Afrique
            </span>
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label={t("closeMenu")}
            className="p-2 rounded-lg text-[#4A5568] hover:bg-[#F7F9FC]"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav links drawer */}
        <nav className="flex flex-col py-4 px-4">
          {NAV_ITEMS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setDrawerOpen(false)}
              className="flex items-center px-3 py-3.5 rounded-lg text-[#1A202C] font-medium text-base
                hover:bg-[#F7F9FC] hover:text-[#1A3A8F] transition-colors duration-150 border-b border-[#F7F9FC]"
            >
              {t(key as keyof typeof t)}
            </Link>
          ))}
        </nav>

        {/* Footer drawer */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-[#E2E8F0] bg-white">
          <Link
            href="/admissions"
            onClick={() => setDrawerOpen(false)}
            className="flex justify-center w-full py-3 rounded-lg bg-[#D32F2F] text-white font-semibold
              hover:bg-[#B71C1C] transition-colors duration-200 mb-3"
          >
            {t("enroll")}
          </Link>
          <div className="flex items-center justify-between">
            <div className="text-xs text-[#4A5568]">
              <p className="font-medium">651 11 15 06</p>
              <p>656 66 38 48</p>
            </div>
            <Link
              href={altHref}
              onClick={() => setDrawerOpen(false)}
              className="text-sm font-semibold px-3 py-1.5 rounded-full border border-[#1A3A8F] text-[#1A3A8F]
                hover:bg-[#1A3A8F] hover:text-white transition-colors duration-200"
            >
              {t("language")}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
