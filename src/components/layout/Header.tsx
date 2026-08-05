"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Navigation items ───────────────────────────────────────── */
const NAV_ITEMS = [
  { key: "home",       href: "/" },
  { key: "about",      href: "/a-propos" },
  { key: "formations", href: "/formations" },
  { key: "admissions", href: "/admissions" },
  { key: "news",       href: "/actualites" },
  { key: "life",       href: "/vie-scolaire" },
  { key: "gallery",    href: "/galerie" },
  { key: "contact",    href: "/contact" },
] as const;

/* ── Sous-menu À propos ──────────────────────────────────────── */
const SCHOOL_SUBMENU = [
  { key: "subMission",   href: "/a-propos#mission" },
  { key: "subHistory",   href: "/a-propos#histoire" },
  { key: "subValues",    href: "/a-propos#valeurs" },
  { key: "subTeam",      href: "/a-propos#equipe" },
] as const;

/* ══════════════════════════════════════════════════════════════ */
export default function Header() {
  const t        = useTranslations("nav");
  const tAnn     = useTranslations();
  const locale   = useLocale();
  const pathname = usePathname();

  const [scrolled,     setScrolled]     = useState(false);
  const [drawerOpen,   setDrawerOpen]   = useState(false);
  const [annVisible,   setAnnVisible]   = useState(true);
  const [schoolOpen,   setSchoolOpen]   = useState(false);
  const [langOpen,     setLangOpen]     = useState(false);

  const drawerRef    = useRef<HTMLElement>(null);
  const langRef      = useRef<HTMLElement>(null);

  /* ── Language selector helper ── */
  const getLocalePath = (targetLocale: string) => {
    if (targetLocale === "fr") return pathname.replace(/^\/(en|ew)/, "") || "/";
    if (locale === "fr") return `/${targetLocale}${pathname === "/" ? "" : pathname}`;
    return pathname.replace(new RegExp(`^/${locale}`), `/${targetLocale}`);
  };

  /* ── Scroll handler ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Vérifier l'état initial (utile si la page est déjà scrollée)
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Fermer le drawer au resize ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setDrawerOpen(false); };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Focus trap + Escape dans le drawer ── */
  useEffect(() => {
    if (!drawerOpen) return;

    // Focus le premier élément interactif du drawer
    const timer = setTimeout(() => {
      const el = drawerRef.current?.querySelector<HTMLElement>(
        "a, button, [tabindex]:not([tabindex='-1'])"
      );
      el?.focus();
    }, 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setDrawerOpen(false); }

      // Focus trap (Tab / Shift+Tab)
      if (e.key !== "Tab") return;
      const focusable = Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"
        ) ?? []
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  /* ── Fermer le drawer au changement de route ── */
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setDrawerOpen(false);
      setSchoolOpen(false);
      setLangOpen(false);
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  /* ── Fermer le sélecteur de langue au clic extérieur ── */
  useEffect(() => {
    if (!langOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [langOpen]);

  /* ── Détecter si on est sur une page intérieure (fond blanc) ── */
  const isOnHeroPage = pathname === "/" || pathname === "/en" || pathname === "/ew";
  /* Sur les pages intérieures, le header doit toujours être opaque */
  const isOpaque = scrolled || !isOnHeroPage;

  /* ── Helper : page active ── */
  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/" || pathname === "/en" || pathname === "/ew";
      const normalized = pathname.replace(/^\/(en|ew)/, "") || "/";
      return normalized.startsWith(href);
    },
    [pathname]
  );

  return (
    <>
      {/* ════════════════════════════════════════════════════ */}
      {/* BANDEAU D'ANNONCE                                    */}
      {/* ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {annVisible && (
          <motion.div
            initial={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-[#D32F2F] text-white text-xs sm:text-sm py-2.5 px-4 text-center relative">
              <p className="pr-8">{tAnn("announcement")}</p>
              <button
                onClick={() => setAnnVisible(false)}
                aria-label={locale === "fr" ? "Fermer l'annonce" : "Close announcement"}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full
                  flex items-center justify-center opacity-70 hover:opacity-100
                  hover:bg-white/20 transition-all duration-150 focus-invert"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════ */}
      {/* HEADER PRINCIPAL                                     */}
      {/* ════════════════════════════════════════════════════ */}
      <header
        role="banner"
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isOpaque
            ? "bg-white/98 backdrop-blur-sm shadow-[var(--shadow-header)]"
            : "bg-transparent"
        }`}
        style={{ height: "var(--header-h)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center justify-between h-full">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0 group"
            aria-label="Les Génies d'Afrique — Accueil"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden
              ring-2 ring-transparent group-hover:ring-[#F5A623]/50 transition-all duration-300
              shadow-md">
              <Image
                src="/logo/logo.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="48px"
                priority
              />
            </div>
            <div className="hidden sm:block leading-tight">
              <p className={`font-bold text-sm tracking-tight transition-colors duration-300
                ${isOpaque ? "text-[#1A3A8F]" : "text-white"}`}>
                Les Génies d&apos;Afrique
              </p>
              <p className={`text-[11px] font-medium transition-colors duration-300
                ${isOpaque ? "text-[#4A5568]" : "text-white/75"}`}>
                Complexe Scolaire Bilingue
              </p>
            </div>
          </Link>

          {/* ── Nav desktop ── */}
          <nav
            role="navigation"
            aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}
            className="hidden lg:flex items-center gap-0.5"
          >
            {NAV_ITEMS.map(({ key, href }) => {
              const active = isActive(href);

              /* Sous-menu pour À propos */
              if (key === "about") {
                return (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => setSchoolOpen(true)}
                    onMouseLeave={() => setSchoolOpen(false)}
                  >
                    <button
                      aria-expanded={schoolOpen}
                      aria-haspopup="true"
                      className={`relative flex items-center gap-1 px-3 py-2 rounded-lg text-[15px]
                        font-medium tracking-wide transition-all duration-200
                        ${active
                          ? isOpaque ? "text-[#1A3A8F]" : "text-white"
                          : isOpaque ? "text-[#1A202C] hover:text-[#1A3A8F]" : "text-white/90 hover:text-white"
                        }
                        ${active && isOpaque ? "bg-[#EEF2FF]" : ""}
                        ${active && !isOpaque ? "bg-white/15" : ""}`}
                    >
                      {t(key as keyof typeof t)}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${schoolOpen ? "rotate-180" : ""}`}
                      />
                      {/* Indicateur actif */}
                      {active && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#D32F2F]" />
                      )}
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {schoolOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0,  scale: 1 }}
                          exit={{ opacity: 0,  y: -8, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl
                            shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#E2E8F0]
                            overflow-hidden py-1.5 z-50"
                        >
                          {SCHOOL_SUBMENU.map(({ key: sk, href: sh }) => (
                            <Link
                              key={sk}
                              href={sh}
                              className="block px-4 py-2.5 text-sm text-[#1A202C] font-medium
                                hover:bg-[#EEF2FF] hover:text-[#1A3A8F]
                                transition-colors duration-150"
                            >
                              {t(sk as keyof typeof t)}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={key}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3 py-2 rounded-lg text-[15px] font-medium tracking-wide
                    transition-all duration-200
                    ${active
                      ? isOpaque ? "text-[#1A3A8F]" : "text-white"
                      : isOpaque ? "text-[#1A202C] hover:text-[#1A3A8F]" : "text-white/90 hover:text-white"
                    }
                    ${active && isOpaque  ? "bg-[#EEF2FF]" : ""}
                    ${active && !isOpaque ? "bg-white/15"  : ""}
                    ${!active ? "hover:bg-[#EEF2FF]/50" : ""}`}
                >
                  {t(key as keyof typeof t)}
                  {/* Indicateur de page active */}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#D32F2F]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Actions droite ── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sélecteur langue */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                aria-expanded={langOpen}
                aria-label={t("language")}
                className={`hidden sm:flex items-center gap-1 text-xs font-bold px-3 py-1.5
                  rounded-full border transition-all duration-200
                  ${isOpaque
                    ? "border-[#1A3A8F] text-[#1A3A8F] hover:bg-[#1A3A8F] hover:text-white"
                    : "border-white/65 text-white hover:bg-white/15"}`}
              >
                {locale === "fr" ? "🇨🇲" : locale === "en" ? "🇬🇧" : "🇨🇲"}
                {t("language")}
                <ChevronDown size={12} className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown menu */}
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 top-full mt-2 w-32 rounded-xl shadow-lg overflow-hidden z-50
                      ${isOpaque ? "bg-white border border-[#E2E8F0]" : "bg-white/95 backdrop-blur-sm border border-white/20"}`}
                  >
                    {[
                      { code: "fr", label: t("languageFr"), flag: "🇨🇲" },
                      { code: "en", label: t("languageEn"), flag: "🇬🇧" },
                      { code: "ew", label: t("languageEw"), flag: "🇨🇲" },
                    ].map((lang) => (
                      <Link
                        key={lang.code}
                        href={getLocalePath(lang.code)}
                        lang={lang.code}
                        onClick={() => setLangOpen(false)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors
                          ${locale === lang.code
                            ? "bg-[#EEF2FF] text-[#1A3A8F]"
                            : "text-[#1A202C] hover:bg-[#F7F9FC]"}`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        {lang.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA S'inscrire */}
            <Link
              href="/admissions"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg
                bg-[#D32F2F] text-white text-sm font-bold tracking-wide
                shadow-[var(--shadow-red)] hover:bg-[#B71C1C] hover:-translate-y-0.5
                transition-all duration-200"
            >
              {t("enroll")}
            </Link>

            {/* Hamburger mobile */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label={t("openMenu")}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              className={`lg:hidden p-2 rounded-lg transition-colors duration-200
                hover:bg-black/10 ${isOpaque ? "text-[#1A202C]" : "text-white"}`}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════ */}
      {/* OVERLAY MOBILE                                       */}
      {/* ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/55 z-40 lg:hidden backdrop-blur-[2px]"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════ */}
      {/* DRAWER MOBILE                                        */}
      {/* ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.aside
            id="mobile-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={locale === "fr" ? "Menu de navigation" : "Navigation menu"}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed top-0 left-0 h-full w-[85%] max-w-[360px] bg-white z-50
              shadow-[4px_0_40px_rgba(0,0,0,0.18)] flex flex-col lg:hidden overflow-hidden"
          >
            {/* Header drawer */}
            <div className="flex items-center justify-between px-5 py-4
              border-b border-[#E2E8F0] flex-shrink-0">
              <Link
                href="/"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3"
                aria-label="Les Génies d'Afrique — Accueil"
              >
                <div className="relative w-11 h-11 rounded-full overflow-hidden shadow-sm">
                  <Image
                    src="/logo/logo.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div className="leading-tight">
                  <p className="font-bold text-[#1A3A8F] text-sm">Les Génies d&apos;Afrique</p>
                  <p className="text-[10px] text-[#4A5568]">Complexe Scolaire Bilingue</p>
                </div>
              </Link>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label={t("closeMenu")}
                className="p-2 rounded-lg text-[#4A5568] hover:bg-[#F7F9FC]
                  hover:text-[#1A202C] transition-colors duration-150"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav liens — scrollable */}
            <nav
              aria-label={locale === "fr" ? "Navigation mobile" : "Mobile navigation"}
              className="flex-1 overflow-y-auto py-3 px-3"
            >
              {NAV_ITEMS.map(({ key, href }, i) => {
                const active = isActive(href);
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
                  >
                    <Link
                      href={href}
                      onClick={() => setDrawerOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl
                        font-medium text-base transition-all duration-150 mb-0.5
                        ${active
                          ? "bg-[#EEF2FF] text-[#1A3A8F] font-semibold"
                          : "text-[#1A202C] hover:bg-[#F7F9FC] hover:text-[#1A3A8F]"
                        }`}
                    >
                      {t(key as keyof typeof t)}
                      {active && (
                        <span className="w-2 h-2 rounded-full bg-[#D32F2F] flex-shrink-0" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer drawer */}
            <div className="flex-shrink-0 p-4 border-t border-[#E2E8F0] space-y-3">
              {/* CTA principal */}
              <Link
                href="/admissions"
                onClick={() => setDrawerOpen(false)}
                className="flex justify-center w-full py-3.5 rounded-xl
                  bg-[#D32F2F] text-white font-bold text-sm
                  shadow-[var(--shadow-red)] hover:bg-[#B71C1C]
                  transition-colors duration-200"
              >
                {t("enroll")}
              </Link>

              {/* Téléphone + langue */}
              <div className="flex flex-col gap-3">
                <div className="text-xs text-[#4A5568]">
                  <a href="tel:+237651111506" className="font-semibold text-[#1A202C] hover:text-[#1A3A8F] block">
                    651 11 15 06
                  </a>
                  <a href="tel:+237656663848" className="hover:text-[#1A3A8F] block">
                    656 66 38 48
                  </a>
                </div>
                {/* Mobile language selector */}
                <div className="flex gap-2">
                  {[
                    { code: "fr", label: "🇨🇲 FR" },
                    { code: "en", label: "🇬🇧 EN" },
                    { code: "ew", label: "🇨🇲 EW" },
                  ].map((lang) => (
                    <Link
                      key={lang.code}
                      href={getLocalePath(lang.code)}
                      onClick={() => setDrawerOpen(false)}
                      lang={lang.code}
                      className={`text-xs font-bold px-3 py-2 rounded-full border-2 transition-all duration-200
                        ${locale === lang.code
                          ? "border-[#1A3A8F] bg-[#1A3A8F] text-white"
                          : "border-[#1A3A8F] text-[#1A3A8F] hover:bg-[#1A3A8F] hover:text-white"}`}
                    >
                      {lang.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
