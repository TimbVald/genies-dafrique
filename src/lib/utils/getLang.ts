/**
 * getLang — utilitaire de fallback pour les objets LocalizedText/LocalizedContent.
 *
 * Principe :
 *   1. On tente d'abord la locale demandée.
 *   2. Si absente ou vide, on tente le français (langue par défaut du site).
 *   3. Si toujours absent, on retourne la première valeur non-vide disponible.
 *
 * Extensible à N langues : ajouter une nouvelle langue dans les messages/*.json
 * suffit — aucune modification de ce fichier n'est nécessaire.
 */
export function getLang(
  obj: Record<string, string> | undefined | null,
  locale: string,
  fallback = "fr",
): string {
  if (!obj) return "";

  // 1. Locale demandée
  const direct = obj[locale];
  if (direct && direct.trim() !== "") return direct;

  // 2. Fallback langue par défaut (fr)
  const def = obj[fallback];
  if (def && def.trim() !== "") return def;

  // 3. Première valeur disponible (pour tolérer une nouvelle langue incomplète)
  const first = Object.values(obj).find((v) => v && v.trim() !== "");
  return first ?? "";
}

/**
 * Identique à getLang mais pour un tableau de LocalizedText.
 * Utilisé pour les features/tags multilingues sur les programmes.
 */
export function getLangArray(
  arr: Record<string, string>[] | undefined | null,
  locale: string,
  fallback = "fr",
): string[] {
  if (!arr) return [];
  return arr.map((item) => getLang(item, locale, fallback));
}
