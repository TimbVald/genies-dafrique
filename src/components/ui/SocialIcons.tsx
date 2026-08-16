"use client";

import { useLocale } from "next-intl";
import { getSocialLinks, type SocialLink } from "@/lib/data/global";

/* ── SVG icônes des réseaux ────────────────────────────────────── */
const SOCIAL_SVG: Record<SocialLink["id"], React.ReactNode> = {
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.555 4.112 1.522 5.837L.057 23.882l6.26-1.44A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.373l-.36-.213-3.716.855.885-3.618-.233-.371A9.818 9.818 0 1112 21.818z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.35 6.35 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.84 4.84 0 01-1.03-.07z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

/* ── Props ─────────────────────────────────────────────────────── */
interface SocialIconsProps {
  /**
   * "compact" — icônes rondes 40px, fond semi-transparent, survol couleur de marque.
   *   Utilisé dans le footer.
   * "large" — icônes rondes 48px avec étiquette texte.
   *   Utilisé dans la page Contact.
   */
  variant?: "compact" | "large";
  /** Filtre sur les plateformes à afficher (par défaut : toutes) */
  only?: SocialLink["id"][];
  /** Classe CSS supplémentaire sur le conteneur */
  className?: string;
  /** Thème dark (footer) ou light (sections blanches) */
  theme?: "dark" | "light";
}

/* ═══════════════════════════════════════════════════════════════ */
export default function SocialIcons({
  variant  = "compact",
  only,
  className = "",
  theme    = "dark",
}: SocialIconsProps) {
  const locale  = useLocale();
  const L       = locale as "fr" | "en" | "ew";
  const socials = getSocialLinks().filter(s => !only || only.includes(s.id));

  if (variant === "large") {
    return (
      <div className={`flex flex-wrap gap-3 ${className}`}>
        {socials.map(social => (
          <a
            key={social.id}
            href={social.url}
            target={social.external ? "_blank" : undefined}
            rel={social.external ? "noopener noreferrer" : undefined}
            aria-label={social.label[L]}
            className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl
              font-semibold text-sm transition-all duration-200 border"
            style={{
              backgroundColor: `${social.brandColor}12`,
              color:           social.id === "tiktok" ? "#1A202C" : social.brandColor,
              borderColor:     `${social.brandColor}30`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = social.brandColor;
              (e.currentTarget as HTMLElement).style.color = "white";
              (e.currentTarget as HTMLElement).style.borderColor = social.brandColor;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = `${social.brandColor}12`;
              (e.currentTarget as HTMLElement).style.color = social.id === "tiktok" ? "#1A202C" : social.brandColor;
              (e.currentTarget as HTMLElement).style.borderColor = `${social.brandColor}30`;
            }}
          >
            <span className="w-4 h-4 flex-shrink-0">
              {SOCIAL_SVG[social.id]}
            </span>
            {social.label[L]}
          </a>
        ))}
      </div>
    );
  }

  /* ── Variant compact ── */
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {socials.map(social => (
        <a
          key={social.id}
          href={social.url}
          target={social.external ? "_blank" : undefined}
          rel={social.external ? "noopener noreferrer" : undefined}
          aria-label={social.label[L]}
          className="group w-10 h-10 rounded-full flex items-center justify-center
            transition-all duration-200 hover:scale-110"
          style={{
            backgroundColor: theme === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = social.brandColor;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              theme === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)";
          }}
        >
          <span
            className="w-[18px] h-[18px] flex-shrink-0 transition-colors duration-200"
            style={{ color: theme === "dark" ? "white" : "#4A5568" }}
          >
            {SOCIAL_SVG[social.id]}
          </span>
        </a>
      ))}
    </div>
  );
}
