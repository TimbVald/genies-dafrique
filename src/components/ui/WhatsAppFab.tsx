"use client";

import { useLocale } from "next-intl";
import { getSocialLink, getWhatsAppUrl } from "@/lib/data/global";

/**
 * WhatsApp FAB — bouton flottant bas-droite, visible sur toutes les pages.
 * URL construite avec message pré-défini localisé via getWhatsAppUrl(locale).
 * Source unique : src/data/global/reseaux-sociaux.ts
 */
export default function WhatsAppFab() {
  const locale = useLocale();
  const L      = locale as "fr" | "en" | "ew";
  const wa     = getSocialLink("whatsapp");

  if (!wa) return null;

  // URL avec ?text= encodé selon la langue active
  const href = getWhatsAppUrl(L);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={wa.label[L]}
      className="whatsapp-fab fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366]
        flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)]
        hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,211,102,0.60)]
        transition-all duration-200"
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.555 4.112 1.522 5.837L.057 23.882l6.26-1.44A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.373l-.36-.213-3.716.855.885-3.618-.233-.371A9.818 9.818 0 1112 21.818z"/>
      </svg>
    </a>
  );
}
