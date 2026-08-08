"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Search, ArrowRight, BookOpen, Users, Calendar, Image as ImageIcon, Mail, Home, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { globalSearch, type SearchResult } from "@/lib/data/search";

/* ── Types ─────────────────────────────────────────────────── */
type NavItem = { key: string; href: string; hasSubmenu?: boolean };

/* ── Nav items ──────────────────────────────────────────────── */
const NAV_ITEMS: NavItem[] = [
  { key: "home",       href: "/",           hasSubmenu: false },
  { key: "about",      href: "/a-propos",   hasSubmenu: true  },
  { key: "formations", href: "/formations", hasSubmenu: true  },
  { key: "admissions", href: "/admissions", hasSubmenu: false },
  { key: "news",       href: "/actualites", hasSubmenu: true  },
  { key: "life",       href: "/vie-scolaire", hasSubmenu: true },
  { key: "contact",    href: "/contact",    hasSubmenu: false },
];

/* ── Mega-menu definitions ──────────────────────────────────── */
const ABOUT_MENU = [
  { key: "subHistory",  href: "/a-propos#histoire", icon: Users },
  { key: "subMission",  href: "/a-propos#mission",  icon: BookOpen },
  { key: "subValues",   href: "/a-propos#valeurs",  icon: Globe },
  { key: "subTeam",     href: "/a-propos#equipe",   icon: Users },
];
const FORMATIONS_MENU = [
  { key: "formations",  href: "/formations",  icon: BookOpen },
  { key: "programmes",  href: "/programmes",  icon: BookOpen },
  { key: "admissions",  href: "/admissions",  icon: ArrowRight },
];
const NEWS_MENU = [
  { key: "news",      href: "/actualites", icon: BookOpen },
  { key: "calendar",  href: "/calendrier", icon: Calendar },
];
const LIFE_MENU = [
  { key: "life",    href: "/vie-scolaire", icon: Users },
  { key: "gallery", href: "/galerie",      icon: ImageIcon },
];

/* ── Result type icon map ───────────────────────────────────── */
const TYPE_ICON: Record<string, React.ReactNode> = {
  news:     <BookOpen size={14} className="text-[#1A3A8F]" />,
  event:    <Calendar size={14} className="text-[#D32F2F]" />,
  program:  <BookOpen size={14} className="text-[#F5A623]" />,
  document: <BookOpen size={14} className="text-[#4A5568]" />,
  faq:      <Users   size={14} className="text-[#2E7D32]" />,
};

/* ── Search bar component ───────────────────────────────────── */
function SearchBar({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (query.trim().length >= 2) {
      setResults(globalSearch(query, locale).slice(0, 7));
      setActive(0);
    } else {
      setResults([]);
    }
  }, [query, locale]);

  const go = useCallback((url: string) => {
    router.push(url);
    onClose();
  }, [router, onClose]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown")  { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)); }
    if (e.key === "ArrowUp")    { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    if (e.key === "Enter" && results[active]) go(results[active].url);
    if (e.key === "Escape") onClose();
  };

  const ph = locale === "fr" ? "Rechercher programmes, actualités, FAQ…" :
             locale === "en" ? "Search programs, news, FAQ…" :
             "Lɔ́g dzam…";

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -20, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E2E8F0]">
          <Search size={20} className="text-[#4A5568] flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={onKey}
            placeholder={ph}
            className="flex-1 outline-none text-[#1A202C] text-base bg-transparent placeholder:text-[#A0AEC0]"
          />
          <button onClick={onClose} className="text-[#4A5568] hover:text-[#1A202C] transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="py-2 max-h-[60vh] overflow-y-auto">
            {results.map((r, i) => (
              <li key={r.id}>
                <button
                  onClick={() => go(r.url)}
                  onMouseEnter={() => setActive(i)}
                  className={`w-full text-left flex items-start gap-3 px-5 py-3 transition-colors ${
                    active === i ? "bg-[#EEF2FF]" : "hover:bg-[#F7F9FC]"
                  }`}
                >
                  <span className="mt-0.5 flex-shrink-0">{TYPE_ICON[r.type]}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-[#1A202C] truncate">{r.title}</p>
                    <p className="text-xs text-[#4A5568] line-clamp-1 mt-0.5">{r.description}</p>
                  </div>
                  <span className="ml-auto flex-shrink-0 text-[10px] font-bold uppercase tracking-wide text-[#A0AEC0] mt-0.5">{r.type}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {query.length >= 2 && results.length === 0 && (
          <p className="px-5 py-6 text-sm text-[#4A5568] text-center">
            {locale === "fr" ? "Aucun résultat trouvé." : "No results found."}
          </p>
        )}

        {/* Shortcut hint */}
        <div className="flex items-center justify-between px-5 py-2.5 border-t border-[#E2E8F0] bg-[#F7F9FC]">
          <div className="flex items-center gap-3 text-xs text-[#A0AEC0]">
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border border-[#E2E8F0] rounded text-[10px]">↑↓</kbd> {locale === "fr" ? "naviguer" : "navigate"}</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border border-[#E2E8F0] rounded text-[10px]">↵</kbd> {locale === "fr" ? "ouvrir" : "open"}</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border border-[#E2E8F0] rounded text-[10px]">Esc</kbd> {locale === "fr" ? "fermer" : "close"}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Dropdown component ─────────────────────────────────────── */
function Dropdown({ items, t }: { items: { key: string; href: string; icon: React.ElementType }[]; t: ReturnType<typeof useTranslations<"nav">> }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#E2E8F0]
        overflow-hidden py-1.5 z-50"
    >
      {items.map(({ key, href, icon: Icon }) => (
        <Link
          key={key}
          href={href}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#1A202C] font-medium
            hover:bg-[#EEF2FF] hover:text-[#1A3A8F] transition-colors duration-150 group"
        >
          <span className="w-7 h-7 rounded-lg bg-[#F7F9FC] flex items-center justify-center flex-shrink-0 group-hover:bg-[#EEF2FF] transition-colors">
            <Icon size={14} className="text-[#4A5568] group-hover:text-[#1A3A8F]" />
          </span>
          {t(key as Parameters<typeof t>[0])}
        </Link>
      ))}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN HEADER
══════════════════════════════════════════════════════════════════ */
export default function Header() {
  const t        = useTranslations("nav");
  const tAnn     = useTranslations();
  const locale   = useLocale();
  const pathname = usePathname();

  const [scrolled,    setScrolled]    = useState(false);
  const [drawerOpen,  setDrawerOpen]  = useState(false);
  const [annVisible,  setAnnVisible]  = useState(true);
  const [activeMenu,  setActiveMenu]  = useState<string | null>(null);
  const [langOpen,    setLangOpen]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const drawerRef = useRef<HTMLElement>(null);
  const langRef   = useRef<HTMLDivElement>(null);

  const getLocalePath = (targetLocale: string) => {
    if (targetLocale === "fr") return pathname.replace(/^\/(en|ew)/, "") || "/";
    if (locale === "fr") return `/${targetLocale}${pathname === "/" ? "" : pathname}`;
    return pathname.replace(new RegExp(`^/${locale}`), `/${targetLocale}`);
  };

  // Scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close drawer on resize
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setDrawerOpen(false); };
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  // Drawer focus trap
  useEffect(() => {
    if (!drawerOpen) return;
    const timer = setTimeout(() => {
      drawerRef.current?.querySelector<HTMLElement>("a,button,[tabindex]:not([tabindex='-1'])")?.focus();
    }, 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
      if (e.key !== "Tab") return;
      const els = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),[tabindex]:not([tabindex='-1'])") ?? []);
      if (!els.length) return;
      if (e.shiftKey && document.activeElement === els[0]) { e.preventDefault(); els[els.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === els[els.length - 1]) { e.preventDefault(); els[0].focus(); }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { clearTimeout(timer); document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [drawerOpen]);

  // Close on route change
  useEffect(() => {
    const raf = requestAnimationFrame(() => { setDrawerOpen(false); setActiveMenu(null); setLangOpen(false); });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  // Close lang on outside click
  useEffect(() => {
    if (!langOpen) return;
    const fn = (e: MouseEvent) => { if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [langOpen]);

  const isOnHeroPage = pathname === "/" || pathname === "/en" || pathname === "/ew";
  const isOpaque = scrolled || !isOnHeroPage;

  const isActive = useCallback((href: string) => {
    if (href === "/") return pathname === "/" || pathname === "/en" || pathname === "/ew";
    const norm = pathname.replace(/^\/(en|ew)/, "") || "/";
    return norm.startsWith(href);
  }, [pathname]);

  const SUBMENU_MAP: Record<string, typeof ABOUT_MENU> = {
    about: ABOUT_MENU, formations: FORMATIONS_MENU, news: NEWS_MENU, life: LIFE_MENU,
  };

  return (
    <>
      {/* Search overlay */}
      <AnimatePresence>{searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}</AnimatePresence>

      {/* Announcement bar */}
      <AnimatePresence>
        {annVisible && (
          <motion.div initial={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="bg-[#D32F2F] text-white text-xs sm:text-sm py-2.5 px-4 text-center relative">
              <p className="pr-8">{tAnn("announcement")}</p>
              <button onClick={() => setAnnVisible(false)} aria-label={locale === "fr" ? "Fermer" : "Close"}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center opacity-70 hover:opacity-100 hover:bg-white/20 transition-all">
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header role="banner" className={`sticky top-0 z-50 w-full transition-all duration-300 ${isOpaque ? "bg-white/98 backdrop-blur-sm shadow-[var(--shadow-header)]" : "bg-transparent"}`} style={{ height: "var(--header-h)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center justify-between h-full gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group" aria-label="Les Génies d'Afrique — Accueil">
            <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-[#F5A623]/50 transition-all duration-300 shadow-md">
              <Image src="/logo/logo.png" alt="" fill className="object-cover" sizes="44px" priority />
            </div>
            <div className="hidden sm:block leading-tight">
              <p className={`font-bold text-sm tracking-tight transition-colors duration-300 ${isOpaque ? "text-[#1A3A8F]" : "text-white"}`}>Les Génies d&apos;Afrique</p>
              <p className={`text-[11px] font-medium transition-colors duration-300 ${isOpaque ? "text-[#4A5568]" : "text-white/75"}`}>Complexe Scolaire Bilingue</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav role="navigation" aria-label="Navigation principale" className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_ITEMS.map(({ key, href, hasSubmenu }) => {
              const active = isActive(href);
              const submenuItems = SUBMENU_MAP[key];
              const isOpen = activeMenu === key;

              if (hasSubmenu && submenuItems) {
                return (
                  <div key={key} className="relative" onMouseEnter={() => setActiveMenu(key)} onMouseLeave={() => setActiveMenu(null)}>
                    <div className="flex items-center gap-0.5">
                      <Link href={href} aria-current={active ? "page" : undefined}
                        className={`relative flex items-center px-3 py-2 rounded-lg text-[14px] font-medium tracking-wide transition-all duration-200
                          ${active ? (isOpaque ? "text-[#1A3A8F] bg-[#EEF2FF]" : "text-white bg-white/15") : (isOpaque ? "text-[#1A202C] hover:text-[#1A3A8F] hover:bg-[#EEF2FF]/50" : "text-white/90 hover:text-white hover:bg-white/10")}`}>
                        {t(key as Parameters<typeof t>[0])}
                        {active && <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#D32F2F]" />}
                      </Link>
                      <button aria-expanded={isOpen} aria-haspopup="true"
                        className={`p-1 rounded-lg transition-all duration-200 ${isOpaque ? "text-[#4A5568] hover:text-[#1A3A8F]" : "text-white/70 hover:text-white"}`}>
                        <ChevronDown size={13} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    <AnimatePresence>{isOpen && <Dropdown items={submenuItems} t={t} />}</AnimatePresence>
                  </div>
                );
              }

              return (
                <Link key={key} href={href} aria-current={active ? "page" : undefined}
                  className={`relative px-3 py-2 rounded-lg text-[14px] font-medium tracking-wide transition-all duration-200
                    ${active ? (isOpaque ? "text-[#1A3A8F] bg-[#EEF2FF]" : "text-white bg-white/15") : (isOpaque ? "text-[#1A202C] hover:text-[#1A3A8F] hover:bg-[#EEF2FF]/50" : "text-white/90 hover:text-white hover:bg-white/10")}`}>
                  {t(key as Parameters<typeof t>[0])}
                  {active && <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#D32F2F]" />}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search button */}
            <button onClick={() => setSearchOpen(true)} aria-label={locale === "fr" ? "Rechercher" : "Search"}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 group
                ${isOpaque ? "border-[#E2E8F0] text-[#4A5568] hover:border-[#1A3A8F] hover:text-[#1A3A8F] bg-[#F7F9FC]" : "border-white/30 text-white/80 hover:bg-white/10 hover:text-white"}`}>
              <Search size={14} />
              <span className="hidden md:inline">{locale === "fr" ? "Rechercher" : "Search"}</span>
              <kbd className={`hidden lg:inline-block text-[10px] px-1.5 py-0.5 rounded border transition-colors ${isOpaque ? "bg-white border-[#E2E8F0] text-[#A0AEC0]" : "bg-white/10 border-white/20 text-white/50"}`}>⌘K</kbd>
            </button>

            {/* Language selector */}
            <div className="relative" ref={langRef}>
              <button onClick={() => setLangOpen(!langOpen)} aria-expanded={langOpen} aria-label={t("language")}
                className={`hidden sm:flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border transition-all duration-200
                  ${isOpaque ? "border-[#1A3A8F] text-[#1A3A8F] hover:bg-[#1A3A8F] hover:text-white" : "border-white/65 text-white hover:bg-white/15"}`}>
                {locale === "fr" ? "🇨🇲" : locale === "en" ? "🇬🇧" : "🇨🇲"} {locale.toUpperCase()}
                <ChevronDown size={11} className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}
                    className={`absolute right-0 top-full mt-2 w-36 rounded-xl shadow-lg overflow-hidden z-50 ${isOpaque ? "bg-white border border-[#E2E8F0]" : "bg-white/95 backdrop-blur-sm"}`}>
                    {[{code:"fr",label:t("languageFr"),flag:"🇨🇲"},{code:"en",label:t("languageEn"),flag:"🇬🇧"},{code:"ew",label:t("languageEw"),flag:"🇨🇲"}].map(l => (
                      <Link key={l.code} href={getLocalePath(l.code)} lang={l.code} onClick={() => setLangOpen(false)}
                        className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors ${locale === l.code ? "bg-[#EEF2FF] text-[#1A3A8F]" : "text-[#1A202C] hover:bg-[#F7F9FC]"}`}>
                        <span>{l.flag}</span>{l.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile search */}
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className={`lg:hidden p-2 rounded-lg transition-colors ${isOpaque ? "text-[#1A202C] hover:bg-[#F7F9FC]" : "text-white hover:bg-white/10"}`}>
              <Search size={22} />
            </button>

            {/* Hamburger */}
            <button onClick={() => setDrawerOpen(true)} aria-label={t("openMenu")} aria-expanded={drawerOpen} aria-controls="mobile-drawer"
              className={`lg:hidden p-2 rounded-lg transition-colors hover:bg-black/10 ${isOpaque ? "text-[#1A202C]" : "text-white"}`}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/55 z-40 lg:hidden backdrop-blur-[2px]"
            onClick={() => setDrawerOpen(false)} aria-hidden="true" />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.aside id="mobile-drawer" ref={drawerRef} role="dialog" aria-modal="true"
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed top-0 left-0 h-full w-[85%] max-w-[360px] bg-white z-50 shadow-2xl flex flex-col lg:hidden overflow-hidden">

            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] flex-shrink-0">
              <Link href="/" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm">
                  <Image src="/logo/logo.jpg" alt="" fill className="object-cover" sizes="40px" />
                </div>
                <div className="leading-tight">
                  <p className="font-bold text-[#1A3A8F] text-sm">Les Génies d&apos;Afrique</p>
                  <p className="text-[10px] text-[#4A5568]">Complexe Scolaire Bilingue</p>
                </div>
              </Link>
              <button onClick={() => setDrawerOpen(false)} aria-label={t("closeMenu")} className="p-2 rounded-lg text-[#4A5568] hover:bg-[#F7F9FC] transition-colors">
                <X size={22} />
              </button>
            </div>

            {/* Search row inside drawer */}
            <div className="px-4 py-3 border-b border-[#E2E8F0]">
              <button onClick={() => { setDrawerOpen(false); setSearchOpen(true); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 bg-[#F7F9FC] rounded-xl text-sm text-[#4A5568] hover:bg-[#EEF2FF] transition-colors">
                <Search size={16} />
                <span>{locale === "fr" ? "Rechercher…" : "Search…"}</span>
              </button>
            </div>

            {/* Nav links */}
            <nav aria-label="Navigation mobile" className="flex-1 overflow-y-auto py-3 px-3">
              {NAV_ITEMS.map(({ key, href, hasSubmenu }, i) => {
                const active = isActive(href);
                const submenuOpen = mobileSubmenu === key;
                const submenuItems = SUBMENU_MAP[key] ?? [];

                return (
                  <motion.div key={key} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}>
                    {hasSubmenu && submenuItems.length > 0 ? (
                      <>
                        <div className="flex items-center gap-1 mb-0.5">
                          <Link href={href} onClick={() => setDrawerOpen(false)} aria-current={active ? "page" : undefined}
                            className={`flex-1 flex items-center px-4 py-3.5 rounded-xl font-medium text-base transition-all duration-150 ${active ? "bg-[#EEF2FF] text-[#1A3A8F] font-semibold" : "text-[#1A202C] hover:bg-[#F7F9FC] hover:text-[#1A3A8F]"}`}>
                            {t(key as Parameters<typeof t>[0])}
                          </Link>
                          <button onClick={() => setMobileSubmenu(submenuOpen ? null : key)} className="p-2 rounded-lg hover:bg-[#F7F9FC] transition-colors">
                            <ChevronDown size={16} className={`transition-transform duration-200 ${submenuOpen ? "rotate-180" : ""}`} />
                          </button>
                        </div>
                        <AnimatePresence>
                          {submenuOpen && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="pl-4 overflow-hidden mb-1">
                              {submenuItems.map(({ key: sk, href: sh }) => (
                                <Link key={sk} href={sh} onClick={() => setDrawerOpen(false)}
                                  className="block px-4 py-2.5 text-sm text-[#1A202C] font-medium hover:bg-[#EEF2FF] hover:text-[#1A3A8F] rounded-lg transition-colors">
                                  {t(sk as Parameters<typeof t>[0])}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link href={href} onClick={() => setDrawerOpen(false)} aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium text-base transition-all duration-150 mb-0.5 ${active ? "bg-[#EEF2FF] text-[#1A3A8F] font-semibold" : "text-[#1A202C] hover:bg-[#F7F9FC] hover:text-[#1A3A8F]"}`}>
                        {t(key as Parameters<typeof t>[0])}
                        {active && <span className="w-2 h-2 rounded-full bg-[#D32F2F] flex-shrink-0" />}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* Drawer footer */}
            <div className="flex-shrink-0 p-4 border-t border-[#E2E8F0] space-y-3">
              <div className="flex items-center gap-3">
                <a href="tel:+237651111506" className="flex-1 text-center py-2.5 rounded-xl bg-[#F7F9FC] text-sm font-semibold text-[#1A202C] hover:bg-[#EEF2FF] hover:text-[#1A3A8F] transition-colors">651 11 15 06</a>
                <a href="tel:+237656663848" className="flex-1 text-center py-2.5 rounded-xl bg-[#F7F9FC] text-sm text-[#4A5568] hover:bg-[#EEF2FF] transition-colors">656 66 38 48</a>
              </div>
              <div className="flex gap-2">
                {[{code:"fr",label:"🇨🇲 FR"},{code:"en",label:"🇬🇧 EN"},{code:"ew",label:"🇨🇲 EW"}].map(l => (
                  <Link key={l.code} href={getLocalePath(l.code)} onClick={() => setDrawerOpen(false)} lang={l.code}
                    className={`flex-1 text-center text-xs font-bold px-2 py-2 rounded-full border-2 transition-all ${locale === l.code ? "border-[#1A3A8F] bg-[#1A3A8F] text-white" : "border-[#1A3A8F] text-[#1A3A8F] hover:bg-[#1A3A8F] hover:text-white"}`}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
