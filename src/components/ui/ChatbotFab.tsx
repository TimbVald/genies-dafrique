"use client";

import { useState, useRef, useEffect, useCallback, useId } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  RotateCcw,
  Send,
  X,
  ChevronLeft,
  ExternalLink,
  Phone,
  Copy,
  Check,
  ArrowRight,
  HelpCircle,
  Zap,
} from "lucide-react";
import {
  CHATBOT_UI,
  QUICK_SUGGESTIONS,
  type Locale,
} from "@/data/chatbot/faq";
import { generateLocalFallbackResponse } from "@/lib/chatbot/nlp-engine";
import { getWhatsAppUrl } from "@/lib/data/global";
import type { ChatMessage, ChatActionLink, ChatApiResponse } from "@/lib/chatbot/types";

/* ── Props ────────────────────────────────────────────────────────── */
interface ChatbotFabProps {
  open?: boolean;
  onClose?: () => void;
}

/* ── Thinking Messages ─────────────────────────────────────────────── */
const THINKING_MESSAGES: Record<Locale, string[]> = {
  fr: [
    "Recherche dans les informations officielles...",
    "Vérification des programmes et admissions...",
    "Formulation d'une réponse claire...",
  ],
  en: [
    "Checking official school records...",
    "Reviewing programmes and admissions...",
    "Formulating a clear response...",
  ],
  ew: [
    "Génies AI á yená mfián...",
    "Nlam bia yení...",
    "Nnam ya akom...",
  ],
};

/* ── Formatage Markdown Épuré ──────────────────────────────────────── */
function renderFormattedMessage(text: string) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5 text-[13px] sm:text-[13.5px] leading-relaxed text-[#1E293B]">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Listes à puces
        const isBullet = trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("* ");
        const content = isBullet ? trimmed.replace(/^[\s•*-]+/, "") : line;

        // Titres ou lignes clés en gras
        const formattedParts = content.split(/(\*\*[^*]+\*\*)/g).map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={pIdx} className="font-semibold text-[#0D1F6B]">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5 my-0.5">
              <span className="text-[#1A3A8F] font-bold text-xs mt-0.5 select-none">•</span>
              <span className="flex-1">{formattedParts}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="leading-snug">
            {formattedParts}
          </p>
        );
      })}
    </div>
  );
}

export default function ChatbotFab({ open: externalOpen, onClose }: ChatbotFabProps) {
  const locale = useLocale() as Locale;
  const ui = CHATBOT_UI[locale] || CHATBOT_UI.fr;
  const waHref = getWhatsAppUrl(locale);
  const inputAriaId = useId();

  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof externalOpen === "boolean";
  const isOpen = isControlled ? externalOpen : internalOpen;

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    if (!isControlled) setInternalOpen(false);
  }, [onClose, isControlled]);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkIndex, setThinkIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  /* ── Initialisation / Réinitialisation ──────────────────────────── */
  const handleReset = useCallback(() => {
    setIsThinking(false);
    const welcomeMsg: ChatMessage = {
      id: "welcome-0",
      role: "bot",
      text: ui.welcome,
      timestamp: Date.now(),
      provider: "Groq",
      suggestedFollowUps: QUICK_SUGGESTIONS[locale] || QUICK_SUGGESTIONS.fr,
    };
    setMessages([welcomeMsg]);
    setInput("");
    try {
      sessionStorage.removeItem("genies_chat_history");
    } catch {
      // Ignorer si indisponible
    }
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [locale, ui.welcome]);

  // Chargement de l'historique de session à l'ouverture
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      try {
        const saved = sessionStorage.getItem("genies_chat_history");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
            return;
          }
        }
      } catch {
        // Ignorer
      }
      handleReset();
    }
  }, [isOpen, messages.length, handleReset]);

  // Sauvegarde de l'historique
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem("genies_chat_history", JSON.stringify(messages.slice(-15)));
      } catch {
        // Ignorer
      }
    }
  }, [messages]);

  // Blocage du scroll body sur Mobile
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

  // Défilement fluide vers le bas
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking, isOpen]);

  // Fermer avec Échap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  // Fermer au clic extérieur sur Desktop
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

  /* ── Copie du texte ────────────────────────────────────────────── */
  const handleCopy = useCallback(async (msgId: string | number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Ignorer
    }
  }, []);

  /* ── Envoi de message ──────────────────────────────────────────── */
  const sendMessage = useCallback(
    async (textToSend: string) => {
      const trimmed = textToSend.trim();
      if (!trimmed || isThinking) return;

      const userMsgId = `user-${Date.now()}`;
      const newUserMsg: ChatMessage = {
        id: userMsgId,
        role: "user",
        text: trimmed,
        timestamp: Date.now(),
      };

      const updatedMessages = [...messages, newUserMsg];
      setMessages(updatedMessages);
      setInput("");
      setIsThinking(true);
      setThinkIndex(0);

      const thinkInterval = setInterval(() => {
        setThinkIndex((prev) => (prev + 1) % (THINKING_MESSAGES[locale]?.length || 3));
      }, 450);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.text,
            })),
            locale,
          }),
        });

        clearInterval(thinkInterval);
        setIsThinking(false);

        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}`);
        }

        const data: ChatApiResponse = await response.json();

        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: "bot",
          text: data.reply || ui.notFound,
          timestamp: Date.now(),
          intent: data.intent,
          links: data.links,
          suggestedFollowUps: data.suggestedFollowUps,
          isLocalFallback: data.isFallback,
          provider: data.provider || (data.isFallback ? "Local" : "Groq"),
          model: data.model,
        };

        setMessages((prev) => [...prev, botMsg]);
      } catch (err) {
        clearInterval(thinkInterval);
        setIsThinking(false);
        console.warn("[Chatbot] Fallback local déterministe:", err);

        const local = generateLocalFallbackResponse(trimmed, locale);
        const fallbackMsg: ChatMessage = {
          id: `bot-fallback-${Date.now()}`,
          role: "bot",
          text: local.reply,
          timestamp: Date.now(),
          intent: local.intent,
          links: local.links,
          suggestedFollowUps: local.followUps,
          isLocalFallback: true,
          provider: "Local",
        };

        setMessages((prev) => [...prev, fallbackMsg]);
      }
    },
    [messages, isThinking, locale, ui.notFound]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* ── Overlay mobile ── */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 sm:hidden animate-in fade-in duration-200"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* ── Fenêtre du Chatbot ── */}
      <div
        ref={windowRef}
        className="fixed z-50 inset-0 sm:inset-auto sm:bottom-22 sm:right-6
          w-full h-[100dvh] sm:w-[420px] sm:h-[620px] sm:max-h-[86vh]
          flex flex-col bg-[#F8FAFC] sm:rounded-3xl sm:shadow-[0_25px_70px_rgba(13,31,107,0.30)]
          sm:border sm:border-[#CBD5E1] overflow-hidden
          animate-in fade-in slide-in-from-bottom-5 duration-250 font-sans"
        role="dialog"
        aria-label={ui.title}
        aria-modal="true"
      >
        {/* ── En-tête Premium avec le Logo Officiel ── */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-gradient-to-r from-[#0B1538] via-[#102A71] to-[#1A3A8F] text-white flex-shrink-0 relative overflow-hidden shadow-md">
          {/* Motif discret de fond */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          />

          <div className="flex items-center gap-3 z-10">
            {/* Bouton retour sur mobile */}
            <button
              onClick={handleClose}
              className="sm:hidden -ml-1.5 p-1.5 rounded-full hover:bg-white/15 text-white transition-colors active:scale-95"
              aria-label="Fermer"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Avatar Officiel avec le Logo de l'École */}
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-white p-0.5 shadow-md ring-2 ring-white/30 flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo/logo.png"
                  alt="Logo CSB Les Génies d'Afrique"
                  width={38}
                  height={38}
                  className="object-contain w-full h-full rounded-xl"
                  priority
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-[#0B1538]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-white text-xs sm:text-sm font-bold leading-tight tracking-tight">
                  {ui.title}
                </p>
                <span className="px-1.5 py-0.5 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/40 text-[9px] font-extrabold tracking-wider text-[#F5A623] uppercase flex items-center gap-0.5 shadow-xs">
                  <Zap size={9} className="fill-[#F5A623]" />
                  Groq IA
                </span>
              </div>
              <p className="text-white/75 text-[10.5px] leading-tight font-medium">
                {locale === "fr"
                  ? "Assistant Officiel • En ligne"
                  : locale === "en"
                  ? "Official Assistant • Online"
                  : "Mbián Sukul • A ne mbɔ́g"}
              </p>
            </div>
          </div>

          {/* Boutons d'action (Reset & Fermer) */}
          <div className="flex items-center gap-1 z-10">
            <button
              onClick={handleReset}
              title={locale === "fr" ? "Nouvelle conversation" : "New conversation"}
              aria-label={locale === "fr" ? "Réinitialiser la discussion" : "Reset conversation"}
              className="w-8 h-8 rounded-xl hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-90"
            >
              <RotateCcw size={15} />
            </button>
            <button
              onClick={handleClose}
              aria-label={ui.ariaClose}
              className="hidden sm:flex w-8 h-8 rounded-xl hover:bg-white/15 items-center justify-center text-white/80 hover:text-white transition-all active:scale-90"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Zone des messages ── */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC] to-[#F1F5F9]"
          aria-live="polite"
        >
          {messages.map((msg) => {
            const isUser = msg.role === "user";

            return (
              <div
                key={msg.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-2 group animate-in fade-in duration-200`}
              >
                {/* Logo Miniature à gauche du message du Bot */}
                {!isUser && (
                  <div className="w-7 h-7 rounded-xl bg-white p-0.5 shadow-xs border border-[#E2E8F0] flex items-center justify-center flex-shrink-0 mb-1 overflow-hidden">
                    <Image
                      src="/logo/logo.png"
                      alt="Avatar Bot"
                      width={24}
                      height={24}
                      className="object-contain w-full h-full rounded-lg"
                    />
                  </div>
                )}

                <div className={`max-w-[88%] sm:max-w-[85%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                  <div
                    className={`rounded-2xl p-3.5 text-xs sm:text-[13.5px] shadow-xs relative transition-all duration-200 ${
                      isUser
                        ? "bg-gradient-to-r from-[#1A3A8F] to-[#2D5BE3] text-white rounded-br-xs shadow-[0_4px_14px_rgba(26,58,143,0.25)]"
                        : "bg-white text-[#1E293B] rounded-bl-xs border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    }`}
                  >
                    {/* Contenu textuel enrichi */}
                    {isUser ? (
                      <p className="leading-snug">{msg.text}</p>
                    ) : (
                      renderFormattedMessage(msg.text)
                    )}

                    {/* Liens d'action attachés à la réponse */}
                    {!isUser && msg.links && msg.links.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-2.5 border-t border-[#E2E8F0]/80">
                        {msg.links.map((link: ChatActionLink, i: number) => {
                          const labelText = typeof link.label === "string" ? link.label : link.label[locale] || link.label.fr;
                          const isWhatsApp = link.href.includes("wa.me");

                          if (link.external) {
                            return (
                              <a
                                key={i}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1.5 text-[11px] font-bold rounded-full px-3.5 py-1.5 transition-all shadow-2xs hover:scale-[1.02] active:scale-95 ${
                                  isWhatsApp
                                    ? "bg-[#25D366] text-white hover:bg-[#1fb859]"
                                    : "bg-[#1A3A8F] text-white hover:bg-[#2D5BE3]"
                                }`}
                              >
                                {isWhatsApp && <Phone size={11} />}
                                <span>{labelText}</span>
                                <ExternalLink size={11} />
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={i}
                              href={`/${locale}${link.href}`}
                              onClick={handleClose}
                              className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-[#1A3A8F] text-white rounded-full px-3.5 py-1.5 hover:bg-[#2D5BE3] transition-all shadow-2xs hover:scale-[1.02] active:scale-95"
                            >
                              <span>{labelText}</span>
                              <ArrowRight size={11} />
                            </Link>
                          );
                        })}
                      </div>
                    )}

                    {/* Pied de bulle : provenance Groq IA & Bouton Copier */}
                    {!isUser && (
                      <div className="flex items-center justify-between gap-1 mt-2.5 pt-1.5 border-t border-slate-100 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1 text-[9.5px] font-semibold text-slate-400">
                          <Sparkles size={10} className="text-[#F5A623]" />
                          <span>{msg.provider === "Local" ? "Moteur Local" : "IA Groq (Ultra-rapide)"}</span>
                        </span>
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          title="Copier la réponse"
                          className="p-1 hover:text-slate-700 rounded transition-colors flex items-center gap-1"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check size={11} className="text-emerald-600 font-bold" />
                              <span className="text-emerald-600 font-medium">Copié</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              <span>Copier</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Suggestions dynamiques (Follow-up chips) */}
                  {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 pl-0.5 animate-in fade-in duration-300">
                      {msg.suggestedFollowUps.slice(0, 3).map((suggestion, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => sendMessage(suggestion)}
                          disabled={isThinking}
                          className="text-[11px] bg-white hover:bg-[#EEF2FF] text-[#1A3A8F] font-medium border border-[#CBD5E1] hover:border-[#1A3A8F] rounded-full px-3 py-1 text-left transition-all shadow-2xs hover:scale-[1.02] disabled:opacity-50"
                        >
                          💡 {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* ── Indicateur de réflexion (Thinking Indicator) avec Logo ── */}
          {isThinking && (
            <div className="flex items-end gap-2 justify-start animate-in fade-in duration-200">
              <div className="w-7 h-7 rounded-xl bg-white p-0.5 shadow-xs border border-[#E2E8F0] flex items-center justify-center flex-shrink-0 mb-1 overflow-hidden animate-pulse">
                <Image
                  src="/logo/logo.png"
                  alt="Bot Thinking"
                  width={24}
                  height={24}
                  className="object-contain w-full h-full rounded-lg"
                />
              </div>
              <div className="bg-white border border-[#CBD5E1] rounded-2xl rounded-bl-xs px-4 py-3 shadow-xs text-xs text-[#334155] flex items-center gap-2.5">
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

          {/* ── Suggestions initiales si 1 seul message ── */}
          {messages.length === 1 && !isThinking && (
            <div className="mt-2 pt-1 animate-in fade-in duration-300">
              <div className="flex items-center gap-1.5 mb-2.5 px-1">
                <HelpCircle size={13} className="text-[#64748B]" />
                <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                  {ui.suggestionsLabel}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                {(QUICK_SUGGESTIONS[locale] || QUICK_SUGGESTIONS.fr).map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(suggestion)}
                    className="text-xs bg-white border border-[#CBD5E1] hover:border-[#1A3A8F] text-[#1A3A8F] rounded-xl px-3.5 py-2.5 hover:bg-[#EEF2FF] transition-all font-medium text-left shadow-2xs hover:translate-x-0.5 flex items-center justify-between group"
                  >
                    <span>{suggestion}</span>
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 text-[#1A3A8F] transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── Formulaire de saisie ultra ergonomique ── */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-3.5 py-3 bg-white border-t border-[#CBD5E1] flex-shrink-0 shadow-lg"
        >
          <input
            id={inputAriaId}
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={ui.placeholder}
            disabled={isThinking}
            className="flex-1 text-base sm:text-sm rounded-2xl border border-[#CBD5E1] px-4 py-2.5 sm:py-3
              focus:outline-none focus:ring-2 focus:ring-[#1A3A8F]/25 focus:border-[#1A3A8F]
              bg-[#F8FAFC] text-[#1E293B] placeholder-[#94A3B8]
              transition-all duration-150 disabled:opacity-50"
            maxLength={400}
            autoComplete="off"
            aria-label={ui.placeholder}
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            aria-label={ui.send}
            className="w-11 h-11 rounded-2xl bg-gradient-to-r from-[#1A3A8F] to-[#2D5BE3] hover:opacity-95
              disabled:opacity-35 disabled:cursor-not-allowed
              flex items-center justify-center flex-shrink-0 text-white shadow-md
              transition-all duration-150 active:scale-95"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  );
}
