"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  findBestMatch,
  QUICK_SUGGESTIONS,
  CHATBOT_UI,
  type Locale,
  type ChatbotFAQEntry,
} from "@/data/chatbot/faq";
import { getWhatsAppUrl } from "@/lib/data/global";

/* ── Types ────────────────────────────────────────────────────────── */
interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
  entry?: ChatbotFAQEntry; // réponse structurée (pour les liens)
}

/* ── Constante d'espacement — doit correspondre à la position du FAB WhatsApp ── */
const WA_FAB_BOTTOM  = 24; // px — bottom-6 (1.5rem = 24px)
const WA_FAB_SIZE    = 56; // px — w-14 h-14
const GAP            = 12; // px — espace entre les deux boutons
const CHATBOT_BOTTOM = WA_FAB_BOTTOM + WA_FAB_SIZE + GAP; // 92px ≈ bottom-[92px]

/* ── Utilitaire : formatage multi-lignes ─────────────────────────── */
function formatText(text: string) {
  return text.split("\n").map((line, i) => (
    <span key={i} className="block leading-snug">
      {line}
    </span>
  ));
}

/* ════════════════════════════════════════════════════════════════════
   Composant principal
   ════════════════════════════════════════════════════════════════════ */
export default function ChatbotFab() {
  const locale   = useLocale() as Locale;
  const pathname = usePathname();
  const ui       = CHATBOT_UI[locale];
  const waHref   = getWhatsAppUrl(locale);

  const [open,     setOpen]     = useState(false);
  const [input,    setInput]    = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [counter,  setCounter]  = useState(0);
  const [pulse,    setPulse]    = useState(true); // petite animation d'attention initiale

  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const windowRef  = useRef<HTMLDivElement>(null);

  /* Reset des messages à chaque ouverture (conversation fraîche) */
  useEffect(() => {
    if (open) {
      setMessages([
        { id: 0, role: "bot", text: ui.welcome },
      ]);
      setInput("");
      setPulse(false);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open, ui.welcome]);

  /* Scroll automatique vers le bas à chaque nouveau message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Fermer avec Échap */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Fermer en cliquant hors de la fenêtre */
  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (windowRef.current && !windowRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  /* ── Envoi d'un message ────────────────────────────────────────── */
  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      const userId = counter;
      const botId  = counter + 1;
      setCounter(c => c + 2);

      // Ajout du message utilisateur
      setMessages(prev => [...prev, { id: userId, role: "user", text: text.trim() }]);
      setInput("");

      // Délai léger pour simuler une réflexion
      setTimeout(() => {
        const match = findBestMatch(text);
        if (match) {
          setMessages(prev => [
            ...prev,
            {
              id:    botId,
              role:  "bot",
              text:  match.answer[locale],
              entry: match,
            },
          ]);
        } else {
          setMessages(prev => [
            ...prev,
            { id: botId, role: "bot", text: ui.notFound },
          ]);
        }
      }, 350);
    },
    [counter, locale, ui.notFound]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  /* ── Rendu ─────────────────────────────────────────────────────── */
  return (
    <div
      className="fixed right-6 z-50 flex flex-col items-end"
      style={{ bottom: CHATBOT_BOTTOM }}
      ref={windowRef}
    >
      {/* ── Fenêtre de chat ─────────────────────────────────────── */}
      {open && (
        <div
          className="mb-3 flex flex-col bg-white rounded-2xl shadow-2xl border border-[#E2E8F0]
            w-[min(92vw,360px)] h-[min(80vh,520px)]
            animate-in fade-in slide-in-from-bottom-4 duration-200"
          role="dialog"
          aria-label={ui.title}
          aria-modal="true"
        >
          {/* En-tête */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1A3A8F] rounded-t-2xl flex-shrink-0">
            <div className="flex items-center gap-2.5">
              {/* Avatar bot */}
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8}
                  strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <p className="text-white text-xs font-bold leading-tight">{ui.title}</p>
                <p className="text-white/70 text-[10px] leading-tight">
                  {locale === "fr" ? "En ligne" : locale === "en" ? "Online" : "Nnam"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label={ui.ariaClose}
              className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center
                text-white transition-colors duration-150"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                strokeLinecap="round" className="w-4 h-4" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Zone de messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 scrollbar-thin">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-3 py-2 text-xs leading-relaxed
                    ${msg.role === "user"
                      ? "bg-[#1A3A8F] text-white rounded-tr-sm"
                      : "bg-[#F0F4FF] text-[#1A202C] rounded-tl-sm border border-[#E2E8F0]"
                    }`}
                >
                  {/* Texte avec sauts de ligne */}
                  <div className="space-y-0.5">{formatText(msg.text)}</div>

                  {/* Liens d'action rattachés à la réponse */}
                  {msg.role === "bot" && msg.entry?.links && msg.entry.links.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-[#D0D8F0]">
                      {msg.entry.links.map((link, i) => (
                        link.external ? (
                          <a
                            key={i}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-semibold
                              bg-[#1A3A8F] text-white rounded-full px-2.5 py-1
                              hover:bg-[#162f72] transition-colors duration-150"
                          >
                            {link.label[locale]}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                              strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                              className="w-2.5 h-2.5" aria-hidden="true">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                              <polyline points="15 3 21 3 21 9"/>
                              <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                          </a>
                        ) : (
                          <Link
                            key={i}
                            href={`/${locale}${link.href}`}
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center gap-1 text-[10px] font-semibold
                              bg-[#1A3A8F] text-white rounded-full px-2.5 py-1
                              hover:bg-[#162f72] transition-colors duration-150"
                          >
                            {link.label[locale]}
                          </Link>
                        )
                      ))}
                    </div>
                  )}

                  {/* Fallback contact si réponse non trouvée */}
                  {msg.role === "bot" && !msg.entry && msg.text === ui.notFound && (
                    <div className="flex flex-col gap-1.5 mt-2 pt-2 border-t border-[#D0D8F0]">
                      <Link
                        href={`/${locale}/contact`}
                        onClick={() => setOpen(false)}
                        className="text-[10px] font-semibold bg-[#1A3A8F] text-white
                          rounded-full px-2.5 py-1 text-center hover:bg-[#162f72]
                          transition-colors duration-150"
                      >
                        {ui.contactBtn}
                      </Link>
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-semibold bg-[#25D366] text-white
                          rounded-full px-2.5 py-1 text-center hover:bg-[#1fb859]
                          transition-colors duration-150"
                      >
                        {ui.whatsappBtn}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Suggestions rapides — affichées après le message de bienvenue */}
            {messages.length === 1 && messages[0].role === "bot" && (
              <div className="mt-1">
                <p className="text-[10px] text-[#718096] mb-1.5 px-1">{ui.suggestionsLabel}</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_SUGGESTIONS[locale].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(suggestion)}
                      className="text-[10px] bg-white border border-[#CBD5E0] text-[#1A3A8F]
                        rounded-full px-2.5 py-1 hover:bg-[#EEF2FF] hover:border-[#1A3A8F]
                        transition-colors duration-150 font-medium"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Zone de saisie */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-2.5 border-t border-[#E2E8F0] flex-shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={ui.placeholder}
              className="flex-1 text-xs rounded-xl border border-[#CBD5E0] px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-[#1A3A8F]/30 focus:border-[#1A3A8F]
                bg-[#F7F9FC] text-[#1A202C] placeholder-[#A0AEC0]
                transition-colors duration-150"
              maxLength={300}
              autoComplete="off"
              aria-label={ui.placeholder}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label={ui.send}
              className="w-8 h-8 rounded-xl bg-[#1A3A8F] hover:bg-[#162f72]
                disabled:opacity-40 disabled:cursor-not-allowed
                flex items-center justify-center flex-shrink-0
                transition-colors duration-150"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* ── Bouton flottant du chatbot ───────────────────────────── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? ui.ariaClose : ui.ariaOpen}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`relative w-14 h-14 rounded-full bg-[#1A3A8F] text-white
          flex items-center justify-center
          shadow-[0_4px_20px_rgba(26,58,143,0.40)]
          hover:scale-110 hover:shadow-[0_6px_28px_rgba(26,58,143,0.55)]
          transition-all duration-200
          ${pulse ? "animate-bounce" : ""}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A3A8F] focus-visible:ring-offset-2`}
      >
        {/* Icône : bulle de dialogue (fermé) / X (ouvert) */}
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            strokeLinecap="round" className="w-6 h-6" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}

        {/* Badge pulsant — disparaît après le premier clic */}
        {pulse && !open && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D32F2F]
              flex items-center justify-center text-[9px] font-bold text-white
              animate-ping"
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
}
