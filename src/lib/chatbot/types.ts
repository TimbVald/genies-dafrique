export type Locale = "fr" | "en" | "ew";

export type ChatRole = "user" | "bot" | "system";

export interface ChatActionLink {
  label: Record<Locale, string> | string;
  href: string;
  external?: boolean;
}

export type ChatIntent =
  | "admissions"
  | "programs"
  | "fees"
  | "hours"
  | "location"
  | "contact"
  | "documents"
  | "cantine"
  | "transport"
  | "accreditation"
  | "bilingualism"
  | "events"
  | "news"
  | "school_life"
  | "greeting"
  | "gratitude"
  | "fallback"
  | "human_handoff";

export interface ChatMessage {
  id: number | string;
  role: ChatRole;
  text: string;
  displayText?: string;
  isTyping?: boolean;
  timestamp?: number;
  intent?: ChatIntent;
  links?: ChatActionLink[];
  suggestedFollowUps?: string[];
  error?: boolean;
  isLocalFallback?: boolean;
  provider?: string;
  model?: string;
}

export interface ChatbotKnowledgeItem {
  id: string;
  type: "site_info" | "admission" | "program" | "fee" | "doc" | "faq" | "news" | "event" | "school_life" | "about";
  title: string;
  content: string;
  url?: string;
  keywords?: string[];
  metadata?: Record<string, unknown>;
}

export interface ChatApiResponse {
  success: boolean;
  reply: string;
  intent: ChatIntent;
  links?: ChatActionLink[];
  suggestedFollowUps?: string[];
  isFallback?: boolean;
  provider?: string;
  model?: string;
  error?: string;
}
