"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  RotateCcw,
  Send,
  X,
  ExternalLink,
  Phone,
} from "lucide-react";
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
  displayText?: string;
  isTyping?: boolean;
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

/* ── Textes de réflexion selon la langue ───────────────────────── */
const THINKING_MESSAGES: Record<Locale, string[]> = {
  fr: [
    "Génies AI analyse votre demande...",
    "Consultation du guide de l'école...",
    "Synthèse de la réponse...",
  ],
  en: [
    "Génies AI is analyzing your query...",
    "Checking school handbook...",
    "Formulating response...",
  ],
  ew: [
    "Génies AI á yená mfián...",
    "Nlam bia yení...",
    "Nnam ya akom...",
  ],
};

/* ════════════════════════════════════════════════════════════════════
   Composant principal Chatbot IA
   ════════════════════════════════════════════════════════════════════ */
export default function ChatbotFab() {
  const locale   = useLocale() as Locale;
  const pathname = usePathname();
  const ui       = CHATBOT_UI[locale] || CHATBOT_UI.fr;
  const waHref   = getWhatsAppUrl(locale);

  const [open,        setOpen]        = useState(false);
  const [input,       setInput]       = useState("");
  const [messages,    setMessages]    = useState<Message[]>([]);
  const [counter,     setCounter]     = useState(0);
  const [pulse,       setPulse]       = useState(true);
  const [isThinking,  setIsThinking]  = useState(false);
  const [thinkIndex,  setThinkIndex]  = useState(0);

  const bottomRef   = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLInputElement>(null);
  const windowRef   = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<NodeJS.Timeout | null>(null);

  /* Réinitialiser la discussion */
  const handleReset = useCallback(() => {
    if (typingTimer.current) clearInterval(typingTimer.current);
    setIsThinking(false);
    setMessages([
      {
        id: 0,
        role: "bot",
        text: ui.welcome,
        displayText: ui.welcome,
        isTyping: false,
      },
    ]);
    setCounter(1);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 80);
  }, [ui.welcome]);

  /* Reset à l'ouverture */
  useEffect(() => {
    if (open && messages.length === 0) {
      handleReset();
      setPulse(false);
    }
  }, [open, messages.length, handleReset]);

  /* Scroll automatique */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

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

  /* Nettoyage du timer de frappe */
  useEffect(() => {
    return () => {
      if (typingTimer.current) clearInterval(typingTimer.current);
    };
  }, []);

  /* ── Lancement de la frappe en direct (Typewriter Streaming) ─────── */
  const startTypewriter = useCallback(
    (botId: number, fullText: string) => {
      let charIndex = 0;
      const chunkSize = 2; // caractères ajoutés par tick

      if (typingTimer.current) clearInterval(typingTimer.current);

      typingTimer.current = setInterval(() => {
        charIndex += chunkSize;
        const currentText = fullText.slice(0, charIndex);

        setMessages(prev =>
          prev.map(m => {
            if (m.id === botId) {
              const finished = charIndex >= fullText.length;
              return {
                ...m,
                displayText: currentText,
                isTyping: !finished,
              };
            }
            return m;
          })
        );

        bottomRef.current?.scrollIntoView({ behavior: "smooth" });

        if (charIndex >= fullText.length) {
          if (typingTimer.current) clearInterval(typingTimer.current);
        }
      }, 22);
    },
    []
  );

  /* ── Envoi d'un message ────────────────────────────────────────── */
  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isThinking) return;

      const userId = counter;
      const botId  = counter + 1;
      setCounter(c => c + 2);

      const trimmedText = text.trim();

      // 1. Message utilisateur immédiat
      setMessages(prev => [
        ...prev,
        { id: userId, role: "user", text: trimmedText, displayText: trimmedText },
      ]);
      setInput("");

      // 2. Déclenchement de la phase de réflexion
      setIsThinking(true);
      setThinkIndex(0);

      const activeThinkingList = THINKING_MESSAGES[locale] || THINKING_MESSAGES.fr;

      // Rotation des textes de réflexion
      const thinkInterval = setInterval(() => {
        setThinkIndex(i => (i + 1) % activeThinkingList.length);
      }, 450);

      // 3. Après 1,2s de réflexion, passage à l'écriture en direct
      setTimeout(() => {
        clearInterval(thinkInterval);
        setIsThinking(false);

        const match = findBestMatch(trimmedText);
        const fullAnswer = match ? match.answer[locale] || match.answer.fr : ui.notFound;

        // Ajouter le message bot initial
        setMessages(prev => [
          ...prev,
          {
            id: botId,
            role: "bot",
            text: fullAnswer,
            displayText: "",
            isTyping: true,
            entry: match || undefined,
          },
        ]);

        // Démarrer la frappe progressive
        startTypewriter(botId, fullAnswer);
      }, 1250);
    },
    [counter, isThinking, locale, ui.notFound, startTypewriter]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div
      className="fixed right-6 z-50 flex flex-col items-end font-sans"
      style={{ bottom: CHATBOT_BOTTOM }}
      ref={windowRef}
    >
      {/* ── Fenêtre de chat ─────────────────────────────────────── */}
      {open && (
        <div
          className="mb-3 flex flex-col bg-white rounded-3xl shadow-[0_20px_60px_rgba(13,31,107,0.22)]
            border border-[#E2E8F0] w-[min(92vw,375px)] h-[min(80vh,540px)]
            animate-in fade-in slide-in-from-bottom-5 duration-250 overflow-hidden"
          role="dialog"
          aria-label={ui.title}
          aria-modal="true"
        >
          {/* En-tête avec dégradé IA et halo */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-[#0D1F6B] via-[#1A3A8F] to-[#2D5BE3] text-white flex-shrink-0 relative overflow-hidden shadow-md">
            {/* Texture de fond */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

            <div className="flex items-center gap-3 z-10">
              {/* Avatar Bot avec halo vert et Sparkles */}
              <div className="relative">
                <div className="w-9 h-9 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-inner">
                  <Sparkles size={18} className="text-[#F5A623] animate-pulse" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0D1F6B]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-white text-xs font-bold leading-tight tracking-wide">
                    {ui.title}
                  </p>
                  <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[9px] font-bold tracking-wider text-[#F5A623] uppercase">
                    IA
                  </span>
                </div>
                <p className="text-white/75 text-[10px] leading-tight">
                  {locale === "fr"
                    ? "Assistant Virtuel CSB-LGA"
                    : locale === "en"
                    ? "CSB-LGA Virtual Assistant"
                    : "Mbián CSB-LGA"}
                </p>
              </div>
            </div>

            {/* Actions d'en-tête (Reset & Fermer) */}
            <div className="flex items-center gap-1 z-10">
              <button
                onClick={handleReset}
                title={locale === "fr" ? "Réinitialiser" : "Reset"}
                aria-label={locale === "fr" ? "Réinitialiser la discussion" : "Reset conversation"}
                className="w-7 h-7 rounded-xl hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-150"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label={ui.ariaClose}
                className="w-7 h-7 rounded-xl hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-150"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Zone des messages */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 scrollbar-thin bg-[#F8FAFC]">
            {messages.map(msg => {
              const isUser = msg.role === "user";
              const textToShow = msg.displayText !== undefined ? msg.displayText : msg.text;

              return (
                <div
                  key={msg.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-2`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-[#1A3A8F] text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold shadow-sm mb-1">
                      <Sparkles size={11} className="text-[#F5A623]" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm transition-all duration-200 ${
                      isUser
                        ? "bg-gradient-to-r from-[#1A3A8F] to-[#2D5BE3] text-white rounded-br-xs"
                        : "bg-white text-[#1A202C] rounded-bl-xs border border-[#E2E8F0]"
                    }`}
                  >
                    {/* Contenu du texte avec effet de saisie progressive */}
                    <div className="space-y-1">
                      {formatText(textToShow)}
                      {msg.isTyping && (
                        <span className="inline-block w-1.5 h-3.5 bg-[#1A3A8F] ml-1 animate-pulse rounded-sm align-middle" />
                      )}
                    </div>

                    {/* Liens de réponse rattachés (affichés uniquement quand la saisie est finie) */}
                    {!isUser && !msg.isTyping && msg.entry?.links && msg.entry.links.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-[#E2E8F0] animate-in fade-in duration-300">
                        {msg.entry.links.map((link, i) => (
                          link.external ? (
                            <a
                              key={i}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-bold
                                bg-[#1A3A8F] text-white rounded-full px-3 py-1
                                hover:bg-[#2D5BE3] transition-colors shadow-xs"
                            >
                              {link.label[locale]}
                              <ExternalLink size={10} />
                            </a>
                          ) : (
                            <Link
                              key={i}
                              href={`/${locale}${link.href}`}
                              onClick={() => setOpen(false)}
                              className="inline-flex items-center gap-1 text-[10px] font-bold
                                bg-[#1A3A8F] text-white rounded-full px-3 py-1
                                hover:bg-[#2D5BE3] transition-colors shadow-xs"
                            >
                              {link.label[locale]}
                            </Link>
                          )
                        ))}
                      </div>
                    )}

                    {/* Fallback si non trouvé (après fin de saisie) */}
                    {!isUser && !msg.isTyping && !msg.entry && msg.text === ui.notFound && (
                      <div className="flex flex-col gap-1.5 mt-2.5 pt-2 border-t border-[#E2E8F0] animate-in fade-in duration-300">
                        <Link
                          href={`/${locale}/contact`}
                          onClick={() => setOpen(false)}
                          className="text-[10px] font-bold bg-[#1A3A8F] text-white
                            rounded-full px-3 py-1.5 text-center hover:bg-[#2D5BE3] transition-colors"
                        >
                          {ui.contactBtn}
                        </Link>
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold bg-[#25D366] text-white
                            rounded-full px-3 py-1.5 text-center hover:bg-[#1fb859] transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Phone size={11} />
                          {ui.whatsappBtn}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* 🧠 Phase de réflexion (Thinking Indicator) */}
            {isThinking && (
              <div className="flex items-end gap-2 justify-start animate-in fade-in duration-200">
                <div className="w-6 h-6 rounded-full bg-[#1A3A8F] text-white flex items-center justify-center flex-shrink-0 shadow-sm mb-1">
                  <Sparkles size={11} className="text-[#F5A623] animate-spin" style={{ animationDuration: "3s" }} />
                </div>
                <div className="bg-white border border-[#E2E8F0] rounded-2xl rounded-bl-xs px-3.5 py-2.5 shadow-sm text-xs text-[#4A5568] flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A3A8F] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D5BE3] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                  <span className="text-[11px] font-medium text-[#1A3A8F] italic">
                    {(THINKING_MESSAGES[locale] || THINKING_MESSAGES.fr)[thinkIndex] || THINKING_MESSAGES.fr[0]}
                  </span>
                </div>
              </div>
            )}

            {/* Suggestions rapides (Accueil) */}
            {messages.length === 1 && !isThinking && (
              <div className="mt-2 pt-1">
                <p className="text-[10px] font-bold text-[#718096] mb-2 px-1 uppercase tracking-wider">
                  {ui.suggestionsLabel}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_SUGGESTIONS[locale].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(suggestion)}
                      className="text-[11px] bg-white border border-[#CBD5E0] text-[#1A3A8F]
                        rounded-full px-3 py-1.5 hover:bg-[#EEF2FF] hover:border-[#1A3A8F]
                        transition-all duration-150 font-medium text-left shadow-2xs hover:scale-[1.02]"
                    >
                      💡 {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Formulaire de saisie */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-3 bg-white border-t border-[#E2E8F0] flex-shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={ui.placeholder}
              disabled={isThinking}
              className="flex-1 text-xs rounded-xl border border-[#CBD5E0] px-3.5 py-2.5
                focus:outline-none focus:ring-2 focus:ring-[#1A3A8F]/30 focus:border-[#1A3A8F]
                bg-[#F8FAFC] text-[#1A202C] placeholder-[#A0AEC0]
                transition-all duration-150 disabled:opacity-50"
              maxLength={300}
              autoComplete="off"
              aria-label={ui.placeholder}
            />
            <button
              type="submit"
              disabled={!input.trim() || isThinking}
              aria-label={ui.send}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#1A3A8F] to-[#2D5BE3] hover:opacity-90
                disabled:opacity-40 disabled:cursor-not-allowed
                flex items-center justify-center flex-shrink-0 text-white shadow-sm
                transition-all duration-150 active:scale-95"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* ── Bouton Flottant (FAB) ───────────────────────────── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? ui.ariaClose : ui.ariaOpen}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`relative w-14 h-14 rounded-full bg-gradient-to-r from-[#0D1F6B] via-[#1A3A8F] to-[#2D5BE3] text-white
          flex items-center justify-center
          shadow-[0_6px_25px_rgba(26,58,143,0.45)]
          hover:scale-110 hover:shadow-[0_8px_32px_rgba(26,58,143,0.60)]
          transition-all duration-250
          ${pulse ? "animate-bounce" : ""}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A3A8F] focus-visible:ring-offset-2`}
      >
        {open ? (
          <X size={24} />
        ) : (
          <div className="relative">
            <Sparkles size={24} className="text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#F5A623] animate-ping" />
          </div>
        )}

        {/* Badge d'attention initial */}
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
