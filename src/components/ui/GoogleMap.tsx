/**
 * GoogleMap — Carte d'emplacement de l'établissement.
 *
 * Utilise une iframe Google Maps Embed (gratuite, sans clé API).
 * Place ID : 0x4890fbced24575f9:0xfb2c146b077eaf99
 * (Complexe Scolaire Bilingue Les Génies d'Afrique, Nkozoa, Yaoundé)
 *
 * Pour mettre à jour l'emplacement : modifier uniquement PLACE_ID et
 * DIRECTIONS_URL ci-dessous — ne pas toucher au reste du composant.
 */

/** Lien de partage court (Itinéraire → ouvre Google Maps avec pin précis) */
const DIRECTIONS_URL = "https://maps.app.goo.gl/b6r6PyYzXz8Meeoh6";

/**
 * URL d'embed Google Maps Embed API (mode "place", sans clé API).
 * Source : https://developers.google.com/maps/documentation/embed/get-started
 */
const EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.662!2d11.5090!3d3.8520!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4890fbced24575f9%3A0xfb2c146b077eaf99!2sCOMPLEXE%20SCOLAIRE%20BILINGUE%20%22LES%20G%C3%89NIES%20D'AFRIQUE%22!5e0!3m2!1sfr!2scm!4v1724000000000!5m2!1sfr!2scm";

interface GoogleMapProps {
  /** Titre accessible de la carte (traduit par le parent) */
  title: string;
  /** Libellé du bouton Itinéraire (traduit par le parent) */
  directionsLabel: string;
  /** Hauteur de la carte en px — défaut 400 */
  height?: number;
  /** Classes CSS supplémentaires pour le conteneur */
  className?: string;
}

export default function GoogleMap({
  title,
  directionsLabel,
  height = 400,
  className = "",
}: GoogleMapProps) {
  return (
    <div className={`flex flex-col gap-0 ${className}`}>
      {/* ── Carte ──────────────────────────────────────────────────── */}
      <div
        className="rounded-t-2xl overflow-hidden border border-[#E2E8F0] shadow-lg"
        style={{ height }}
      >
        <iframe
          title={title}
          src={EMBED_SRC}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* ── Bouton Itinéraire ───────────────────────────────────────── */}
      <a
        href={DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full
          rounded-b-2xl border border-t-0 border-[#E2E8F0]
          bg-[#1A3A8F] hover:bg-[#162f72]
          text-white text-sm font-semibold
          px-4 py-3
          transition-colors duration-200 group"
        aria-label={directionsLabel}
      >
        {/* Navigation arrow icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-150"
          aria-hidden="true"
        >
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
        {directionsLabel}
      </a>
    </div>
  );
}
