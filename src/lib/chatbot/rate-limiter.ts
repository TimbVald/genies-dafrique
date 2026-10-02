/**
 * Rate Limiter simple, robuste et ultra-léger en mémoire (Sliding Window)
 * Empêche le spam et protège les quotas d'API IA.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Nettoyage périodique toutes les 10 minutes pour éviter toute fuite mémoire
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStaleEntries(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;

  lastCleanup = now;
  for (const [key, record] of rateLimitMap.entries()) {
    record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);
    if (record.timestamps.length === 0) {
      rateLimitMap.delete(key);
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTimeMs: number;
}

/**
 * Vérifie si une clé (IP / identifiant client) respecte la limite de requêtes.
 * @param key Identifiant du client (IP ou token de session)
 * @param maxRequests Nombre maximal de requêtes autorisées dans la fenêtre (défaut: 20)
 * @param windowMs Taille de la fenêtre temporelle en millisecondes (défaut: 60 secondes)
 */
export function checkRateLimit(
  key: string,
  maxRequests: number = 20,
  windowMs: number = 60 * 1000
): RateLimitResult {
  cleanupStaleEntries(windowMs);

  const now = Date.now();
  const record = rateLimitMap.get(key) || { timestamps: [] };

  // Filtrer les requêtes de la fenêtre courante
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= maxRequests) {
    const oldestTimestamp = record.timestamps[0];
    const resetTimeMs = oldestTimestamp + windowMs - now;
    return {
      allowed: false,
      remaining: 0,
      resetTimeMs: Math.max(0, resetTimeMs),
    };
  }

  // Enregistrer cette nouvelle requête
  record.timestamps.push(now);
  rateLimitMap.set(key, record);

  return {
    allowed: true,
    remaining: maxRequests - record.timestamps.length,
    resetTimeMs: windowMs,
  };
}
