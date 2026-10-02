import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/chatbot/system-prompt";
import { checkRateLimit } from "@/lib/chatbot/rate-limiter";
import { detectUserIntent, generateLocalFallbackResponse } from "@/lib/chatbot/nlp-engine";
import { INTENT_ACTION_LINKS } from "@/lib/chatbot/knowledge-base";
import type { Locale, ChatActionLink, ChatApiResponse } from "@/lib/chatbot/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RequestPayload {
  messages: Array<{ role: "user" | "bot" | "assistant" | "system"; content?: string; text?: string }>;
  locale?: Locale;
}

export async function POST(req: NextRequest): Promise<NextResponse<ChatApiResponse>> {
  // 1. Identification du client & Rate Limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
             req.headers.get("x-real-ip") || 
             "127.0.0.1";

  const rateCheck = checkRateLimit(`chat_${ip}`, 30, 60 * 1000);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        success: false,
        reply: "Vous avez envoyé beaucoup de messages en peu de temps. Veuillez patienter un instant avant de réessayer.",
        intent: "fallback",
        error: "RATE_LIMIT_EXCEEDED",
      },
      { status: 429 }
    );
  }

  try {
    const body: RequestPayload = await req.json();
    const rawMessages = body.messages || [];
    const locale: Locale = (["fr", "en", "ew"].includes(body.locale || "") ? body.locale : "fr") as Locale;

    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          reply: "Message invalide ou vide.",
          intent: "fallback",
          error: "EMPTY_MESSAGES",
        },
        { status: 400 }
      );
    }

    // Récupération du dernier message utilisateur
    const lastUserMsg = [...rawMessages].reverse().find((m) => m.role === "user");
    const userText = (lastUserMsg?.content || lastUserMsg?.text || "").trim();

    if (!userText) {
      return NextResponse.json(
        {
          success: false,
          reply: "Veuillez saisir votre question.",
          intent: "fallback",
        },
        { status: 400 }
      );
    }

    // Limiter la longueur pour la sécurité et maîtriser les tokens
    const sanitizedUserText = userText.slice(0, 800);

    // Détection de l'intention
    const { intent } = detectUserIntent(sanitizedUserText);
    const links: ChatActionLink[] = INTENT_ACTION_LINKS[intent] || [];

    // Configuration des fournisseurs IA (Groq en priorité 1, OpenAI en priorité 2)
    const groqApiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
    const groqModel = process.env.GROQ_MODEL || process.env.NEXT_PUBLIC_GROQ_MODEL || "llama-3.3-70b-versatile";

    const openAiApiKey = process.env.OPENAI_API_KEY;
    const openAiModel = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const activeProvider = groqApiKey ? "groq" : openAiApiKey ? "openai" : "local";
    const activeApiKey = groqApiKey || openAiApiKey;
    const activeModel = groqApiKey ? groqModel : openAiModel;
    const activeApiEndpoint = groqApiKey 
      ? "https://api.groq.com/openai/v1/chat/completions" 
      : "https://api.openai.com/v1/chat/completions";

    // Si aucune clé IA disponible, bascule immédiate sur le moteur NLP local
    if (!activeApiKey || activeApiKey === "your-api-key" || activeApiKey.includes("example")) {
      const localResult = generateLocalFallbackResponse(sanitizedUserText, locale);
      return NextResponse.json({
        success: true,
        reply: localResult.reply,
        intent: localResult.intent,
        links: localResult.links.length > 0 ? localResult.links : links,
        suggestedFollowUps: localResult.followUps,
        isFallback: true,
      });
    }

    // Préparation du prompt système et de l'historique
    const systemPrompt = buildSystemPrompt(locale);
    const conversationHistory = rawMessages
      .slice(-8)
      .map((m) => ({
        role: m.role === "bot" ? ("assistant" as const) : m.role === "assistant" ? ("assistant" as const) : ("user" as const),
        content: (m.content || m.text || "").slice(0, 600),
      }));

    const aiPayload = {
      model: activeModel,
      messages: [
        { role: "system", content: systemPrompt },
        ...conversationHistory,
      ],
      temperature: 0.2, // Température basse pour une fidélité factuelle maximale
      max_tokens: 600,
    };

    // Timeout de sécurité (8 secondes)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const aiRes = await fetch(activeApiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeApiKey}`,
        },
        body: JSON.stringify(aiPayload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!aiRes.ok) {
        const errText = await aiRes.text();
        console.warn(`[Chatbot API - ${activeProvider}] Error ${aiRes.status}: ${errText}`);
        
        // Si le modèle n'existe pas sur Groq, essayer avec un modèle standard supporté
        if (activeProvider === "groq" && (aiRes.status === 404 || errText.includes("model_not_found"))) {
          const fallbackModels = ["openai/gpt-oss-120b", "qwen/qwen3.8-27b"];
          for (const fbModel of fallbackModels) {
            try {
              const retryRes = await fetch(activeApiEndpoint, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${activeApiKey}`,
                },
                body: JSON.stringify({ ...aiPayload, model: fbModel }),
              });
              if (retryRes.ok) {
                const retryData = await retryRes.json();
                const retryBotReply = retryData.choices?.[0]?.message?.content?.trim();
                if (retryBotReply) {
                  return NextResponse.json({
                    success: true,
                    reply: retryBotReply,
                    intent,
                    links: links.length > 0 ? links : undefined,
                    suggestedFollowUps: [
                      locale === "en" ? "How to enrol my child?" : locale === "ew" ? "Yiba procedure ya admission" : "Comment s'inscrire ?",
                      locale === "en" ? "Where is the school located?" : locale === "ew" ? "Sukul a ne ase ?" : "Où se trouve l'école ?",
                      locale === "en" ? "What are the school fees?" : locale === "ew" ? "Mimbɔ́g ya sukul ?" : "Quels sont les frais de scolarité ?",
                    ],
                    isFallback: false,
                  });
                }
              }
            } catch {
              // Continuer vers fallback local
            }
          }
        }

        console.warn(`[Chatbot API] Falling back to local NLP engine.`);
        const localResult = generateLocalFallbackResponse(sanitizedUserText, locale);
        return NextResponse.json({
          success: true,
          reply: localResult.reply,
          intent: localResult.intent,
          links: localResult.links.length > 0 ? localResult.links : links,
          suggestedFollowUps: localResult.followUps,
          isFallback: true,
        });
      }

      const aiData = await aiRes.json();
      const botReply = aiData.choices?.[0]?.message?.content?.trim() || "";

      if (!botReply) {
        throw new Error("Empty AI response");
      }

      // Suggestions contextuelles
      const defaultFollowUps = [
        locale === "en" ? "How to enrol my child?" : locale === "ew" ? "Yiba procedure ya admission" : "Comment s'inscrire ?",
        locale === "en" ? "Where is the school located?" : locale === "ew" ? "Sukul a ne ase ?" : "Où se trouve l'école ?",
        locale === "en" ? "What are the school fees?" : locale === "ew" ? "Mimbɔ́g ya sukul ?" : "Quels sont les frais de scolarité ?",
      ];

      return NextResponse.json({
        success: true,
        reply: botReply,
        intent,
        links: links.length > 0 ? links : undefined,
        suggestedFollowUps: defaultFollowUps,
        isFallback: false,
      });
    } catch (fetchErr: unknown) {
      clearTimeout(timeoutId);
      console.warn(`[Chatbot API - ${activeProvider}] Fetch failed or timed out. Falling back to local NLP engine.`, fetchErr);
      const localResult = generateLocalFallbackResponse(sanitizedUserText, locale);
      return NextResponse.json({
        success: true,
        reply: localResult.reply,
        intent: localResult.intent,
        links: localResult.links.length > 0 ? localResult.links : links,
        suggestedFollowUps: localResult.followUps,
        isFallback: true,
      });
    }
  } catch (error: unknown) {
    console.error("[Chatbot API] Fatal error:", error);
    return NextResponse.json(
      {
        success: false,
        reply: "Une erreur momentanée est survenue. Vous pouvez nous contacter directement sur WhatsApp au 651 11 15 06.",
        intent: "fallback",
        links: [
          { label: { fr: "WhatsApp", en: "WhatsApp", ew: "WhatsApp" }, href: "https://wa.me/237651111506", external: true },
        ],
        error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
      },
      { status: 500 }
    );
  }
}
