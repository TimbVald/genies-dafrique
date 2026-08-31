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
  ChevronLeft,
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
  entry?: ChatbotFAQEntry;
}

interface ChatbotFabProps {
  open?: boolean;
  onClose?: () => void;
}

function formatText(text: string) {
  return text.split("\n").map((line, i) => (
    <span key={i} className="block leading-snug">
      {line}
    </span>
  ));
}

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

export default function ChatbotFab({ open: externalOpen, onClose }: ChatbotFabProps) {
  const locale   = useLocale() as Locale;
  const pathname = usePathname();
  const ui       = CHATBOT_UI[locale] || CHATBOT_UI.fr;
  const waHref   = getWhatsAppUrl(locale);

  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof externalOpen === "boolean";
  const isOpen       = isControlled ? externalOpen : internalOpen;

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    if (!isControlled) setInternalOpen(false);
  }, [onClose, isControlled]);

  const [input,       setInput]       = useState("");
  const [messages,    setMessages]    = useState<Message[]>([]);
  const [counter,     setCounter]     = useState(0);
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
    if (isOpen && messages.length === 0) {
      handleReset();
    }
  }, [isOpen, messages.length, handleReset]);

  /* Bloquer le défilement du body en mode plein écran mobile */
  useEffect(() => {
    if (!isOpen) return;
    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Scroll automatique */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  /* Fermer avec Échap */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  /* Fermer en cliquant hors de la fenêtre (uniquement sur Desktop) */
  useEffect(() => {
    if (!isOpen) return;
    const onOutside = (e: MouseEvent) => {
      if (window.innerWidth >= 640 && windowRef.current && !windowRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [isOpen, handleClose]);

  useEffect(() => {
    return () => {
      if (typingTimer.current) clearInterval(typingTimer.current);
    };
  }, []);

  /* ── Frappe en direct (Typewriter Streaming) ─────── */
  const startTypewriter = useCallback(
    (botId: number, fullText: string) => {
      let charIndex = 0;
      const chunkSize = 2;

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

      // 1. Message utilisateur
      setMessages(prev => [
        ...prev,
        { id: userId, role: "user", text: trimmedText, displayText: trimmedText },
      ]);
      setInput("");

      // 2. Phase de réflexion
      setIsThinking(true);
      setThinkIndex(0);

      const activeThinkingList = THINKING_MESSAGES[locale] || THINKING_MESSAGES.fr;
      const thinkInterval = setInterval(() => {
        setThinkIndex(i => (i + 1) % activeThinkingList.length);
      }, 450);

      // 3. Écriture en direct après 1,2s
      setTimeout(() => {
        clearInterval(thinkInterval);
        setIsThinking(false);

        const match = findBestMatch(trimmedText);
        const fullAnswer = match ? match.answer[locale] || match.answer.fr : ui.notFound;

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

        startTypewriter(botId, fullAnswer);
      }, 1250);
    },
    [counter, isThinking, locale, ui.notFound, startTypewriter]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* ── Overlay arrière-plan sur Mobile ── */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 sm:hidden animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* ── Fenêtre de chat : Plein écran natif sur Mobile, Carte flottante sur Desktop ── */}
      <div
        ref={windowRef}
        className="fixed z-50 inset-0 sm:inset-auto sm:bottom-22 sm:right-6
          w-full h-full sm:w-[380px] sm:h-[560px] sm:max-h-[82vh]
          flex flex-col bg-white sm:rounded-3xl sm:shadow-[0_20px_60px_rgba(13,31,107,0.25)]
          sm:border sm:border-[#E2E8F0] overflow-hidden
          animate-in fade-in slide-in-from-bottom-5 duration-250 font-sans"
        role="dialog"
        aria-label={ui.title}
        aria-modal="true"
      >
        {/* En-tête avec dégradé IA et boutons de contrôle */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-gradient-to-r from-[#0D1F6B] via-[#1A3A8F] to-[#2D5BE3] text-white flex-shrink-0 relative overflow-hidden shadow-md">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

          <div className="flex items-center gap-3 z-10">
            {/* Bouton retour sur mobile */}
            <button
              onClick={handleClose}
              className="sm:hidden -ml-1.5 p-1 rounded-full hover:bg-white/20 text-white transition-colors"
              aria-label="Retour"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Avatar Bot avec halo vert et Sparkles */}
            <div className="relative">
              <div className="w-9 h-9 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-inner">
                <Sparkles size={18} className="text-[#F5A623] animate-pulse" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0D1F6B]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-white text-xs sm:text-sm font-bold leading-tight tracking-wide">
                  {ui.title}
                </p>
                <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[9px] font-bold tracking-wider text-[#F5A623] uppercase">
                  IA
                </span>
              </div>
              <p className="text-white/75 text-[10px] sm:text-[11px] leading-tight">
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
              className="w-8 h-8 rounded-xl hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-150"
            >
              <RotateCcw size={15} />
            </button>
            <button
              onClick={handleClose}
              aria-label={ui.ariaClose}
              className="hidden sm:flex w-8 h-8 rounded-xl hover:bg-white/20 items-center justify-center text-white/80 hover:text-white transition-all duration-150"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Zone des messages défilante */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin bg-[#F8FAFC]">
          {messages.map(msg => {
            const isUser = msg.role === "user";
            const textToShow = msg.displayText !== undefined ? msg.displayText : msg.text;

            return (
              <div
                key={msg.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-2`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-[#1A3A8F] text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold shadow-sm mb-1">
                    <Sparkles size={12} className="text-[#F5A623]" />
                  </div>
                )}

                <div
                  className={`max-w-[86%] sm:max-w-[84%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-sm transition-all duration-200 ${
                    isUser
                      ? "bg-gradient-to-r from-[#1A3A8F] to-[#2D5BE3] text-white rounded-br-xs"
                      : "bg-white text-[#1A202C] rounded-bl-xs border border-[#E2E8F0]"
                  }`}
                >
                  <div className="space-y-1">
                    {formatText(textToShow)}
                    {msg.isTyping && (
                      <span className="inline-block w-1.5 h-3.5 bg-[#1A3A8F] ml-1 animate-pulse rounded-sm align-middle" />
                    )}
                  </div>

                  {/* Liens de réponse rattachés */}
                  {!isUser && !msg.isTyping && msg.entry?.links && msg.entry.links.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-[#E2E8F0] animate-in fade-in duration-300">
                      {msg.entry.links.map((link, i) => (
                        link.external ? (
                          <a
                            key={i}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold
                              bg-[#1A3A8F] !text-white rounded-full px-3 py-1.5
                              hover:bg-[#2D5BE3] transition-colors shadow-sm"
                          >
                            {link.label[locale]}
                            <ExternalLink size={11} />
                          </a>
                        ) : (
                          <Link
                            key={i}
                            href={`/${locale}${link.href}`}
                            onClick={handleClose}
                            className="inline-flex items-center gap-1 text-[11px] font-bold
                              bg-[#1A3A8F] !text-white rounded-full px-3 py-1.5
                              hover:bg-[#2D5BE3] transition-colors shadow-sm"
                          >
                            {link.label[locale]}
                          </Link>
                        )
                      ))}
                    </div>
                  )}

                  {/* Fallback si non trouvé */}
                  {!isUser && !msg.isTyping && !msg.entry && msg.text === ui.notFound && (
                    <div className="flex flex-col gap-2 mt-3 pt-2.5 border-t border-[#E2E8F0] animate-in fade-in duration-300">
                      <Link
                        href={`/${locale}/contact`}
                        onClick={handleClose}
                        className="text-[11px] font-bold bg-[#1A3A8F] !text-white
                          rounded-full px-3.5 py-2 text-center hover:bg-[#2D5BE3] transition-colors"
                      >
                        {ui.contactBtn}
                      </Link>
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold bg-[#25D366] !text-white
                          rounded-full px-3.5 py-2 text-center hover:bg-[#1fb859] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Phone size={12} />
                        {ui.whatsappBtn}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Phase de réflexion (Thinking Indicator) */}
          {isThinking && (
            <div className="flex items-end gap-2 justify-start animate-in fade-in duration-200">
              <div className="w-7 h-7 rounded-full bg-[#1A3A8F] text-white flex items-center justify-center flex-shrink-0 shadow-sm mb-1">
                <Sparkles size={12} className="text-[#F5A623] animate-spin" style={{ animationDuration: "3s" }} />
              </div>
              <div className="bg-white border border-[#E2E8F0] rounded-2xl rounded-bl-xs px-4 py-3 shadow-sm text-xs text-[#4A5568] flex items-center gap-2.5">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1A3A8F] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D5BE3] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
                <span className="text-xs font-medium text-[#1A3A8F] italic">
                  {(THINKING_MESSAGES[locale] || THINKING_MESSAGES.fr)[thinkIndex] || THINKING_MESSAGES.fr[0]}
                </span>
              </div>
            </div>
          )}

          {/* Suggestions rapides */}
          {messages.length === 1 && !isThinking && (
            <div className="mt-3 pt-1">
              <p className="text-[10px] sm:text-[11px] font-bold text-[#718096] mb-2.5 px-1 uppercase tracking-wider">
                {ui.suggestionsLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_SUGGESTIONS[locale].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(suggestion)}
                    className="text-xs bg-white border border-[#CBD5E0] text-[#1A3A8F]
                      rounded-2xl px-3.5 py-2 hover:bg-[#EEF2FF] hover:border-[#1A3A8F]
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

        {/* Zone de saisie (collante en bas sur mobile et desktop) */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2.5 px-3.5 py-3 bg-white border-t border-[#E2E8F0] flex-shrink-0"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={ui.placeholder}
            disabled={isThinking}
            className="flex-1 text-xs sm:text-sm rounded-2xl border border-[#CBD5E0] px-4 py-2.5 sm:py-3
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
            className="w-10 h-10 rounded-2xl bg-gradient-to-r from-[#1A3A8F] to-[#2D5BE3] hover:opacity-90
              disabled:opacity-40 disabled:cursor-not-allowed
              flex items-center justify-center flex-shrink-0 text-white shadow-sm
              transition-all duration-150 active:scale-95"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </>
  );
}
