"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale } from "next-intl";
import {
  Sparkles,
  MessageCircle,
  ArrowUp,
  X,
  Plus,
  Bot,
  HelpCircle,
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/data/global";
import ChatbotFab from "./ChatbotFab";

export default function FloatingHub() {
  const locale = useLocale() as "fr" | "en" | "ew";
  const waHref = getWhatsAppUrl(locale);

  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [pulse, setPulse] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Écouteur de scroll pour afficher le bouton retour en haut ── */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // vérification initiale
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Action : Retour en haut ── */
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setMenuOpen(false);
  }, []);

  /* ── Fermer le menu si clic à l'extérieur ── */
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  /* ── Ouverture du Chatbot ── */
  const handleOpenChat = useCallback(() => {
    setChatOpen(true);
    setMenuOpen(false);
    setPulse(false);
  }, []);

  return (
    <>
      {/* ── Fenêtre du Chatbot IA (Mobile & Desktop) ── */}
      <ChatbotFab open={chatOpen} onClose={() => setChatOpen(false)} />

      {/* ── Conteneur Flottant Bas Droite (Hub d'actions) ── */}
      <div
        ref={containerRef}
        className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 font-sans"
      >
        {/* ── Menu Tiroir Dépliable (Speed-Dial) ── */}
        {menuOpen && (
          <div className="flex flex-col items-end gap-2.5 mb-1 animate-in fade-in slide-in-from-bottom-4 duration-200">
            {/* 1. Bouton Retour en haut (si scrollé) */}
            {showScrollTop && (
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full
                  bg-white text-[#1A202C] text-xs font-bold shadow-[0_4px_20px_rgba(0,0,0,0.15)]
                  border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:scale-105
                  transition-all duration-200 group"
                aria-label={
                  locale === "fr"
                    ? "Haut de page"
                    : locale === "en"
                    ? "Scroll to top"
                    : "Haut"
                }
              >
                <span className="text-[11px] text-[#4A5568] group-hover:text-[#1A3A8F] transition-colors">
                  {locale === "fr"
                    ? "Haut de page"
                    : locale === "en"
                    ? "Back to top"
                    : "Panya"}
                </span>
                <div className="w-7 h-7 rounded-full bg-[#1A3A8F]/10 flex items-center justify-center text-[#1A3A8F] group-hover:bg-[#1A3A8F] group-hover:text-white transition-all duration-200">
                  <ArrowUp size={14} />
                </div>
              </button>
            )}

            {/* 2. Bouton WhatsApp Direct */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full
                bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-bold
                shadow-[0_4px_22px_rgba(37,211,102,0.40)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.55)]
                hover:scale-105 transition-all duration-200 group"
              aria-label="WhatsApp CSB-LGA"
            >
              <span className="text-[11px] tracking-wide">
                WhatsApp Direct
              </span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white">
                <MessageCircle size={15} />
              </div>
            </a>

            {/* 3. Bouton Chatbot IA */}
            <button
              onClick={handleOpenChat}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full
                bg-gradient-to-r from-[#0D1F6B] via-[#1A3A8F] to-[#2D5BE3] text-white text-xs font-bold
                shadow-[0_4px_22px_rgba(26,58,143,0.45)] hover:shadow-[0_6px_28px_rgba(26,58,143,0.60)]
                hover:scale-105 transition-all duration-200 group"
              aria-label="Chatbot IA Génies d'Afrique"
            >
              <span className="text-[11px] tracking-wide flex items-center gap-1.5">
                Assistant IA
                <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[9px] text-[#F5A623] uppercase">
                  IA
                </span>
              </span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-[#F5A623]">
                <Sparkles size={14} className="animate-pulse" />
              </div>
            </button>
          </div>
        )}

        {/* ── Bouton d'Action Flottant Principal (Trigger Hub) ── */}
        <div className="flex items-center gap-2">
          {/* Petit bouton rapide retour en haut si scrollé (hors du menu déplié) */}
          {showScrollTop && !menuOpen && (
            <button
              onClick={scrollToTop}
              title={locale === "fr" ? "Haut de page" : "Scroll to top"}
              aria-label={locale === "fr" ? "Haut de page" : "Scroll to top"}
              className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md text-[#1A3A8F]
                border border-[#E2E8F0] shadow-md flex items-center justify-center
                hover:bg-white hover:scale-110 transition-all duration-200 animate-in fade-in duration-200"
            >
              <ArrowUp size={18} />
            </button>
          )}

          {/* Bouton Hub Principal */}
          <button
            onClick={() => {
              setMenuOpen(o => !o);
              setPulse(false);
            }}
            aria-label={
              menuOpen
                ? "Fermer le menu d'assistance"
                : "Ouvrir le menu d'assistance"
            }
            aria-expanded={menuOpen}
            className={`relative w-14 h-14 rounded-full bg-gradient-to-r from-[#0D1F6B] via-[#1A3A8F] to-[#2D5BE3] text-white
              flex items-center justify-center
              shadow-[0_6px_25px_rgba(26,58,143,0.45)]
              hover:scale-108 hover:shadow-[0_8px_32px_rgba(26,58,143,0.60)]
              transition-all duration-250
              ${pulse && !menuOpen ? "animate-bounce" : ""}
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A3A8F] focus-visible:ring-offset-2`}
          >
            {menuOpen ? (
              <X size={24} className="transition-transform duration-200 rotate-90" />
            ) : (
              <div className="flex items-center justify-center relative">
                <Sparkles size={24} className="text-white" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#F5A623] animate-ping" />
              </div>
            )}

            {/* Badge d'attention initial */}
            {pulse && !menuOpen && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D32F2F]
                  flex items-center justify-center text-[9px] font-bold text-white
                  animate-ping"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
