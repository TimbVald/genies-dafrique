/**
 * Gestionnaire de synchronisation en arrière-plan (Background Sync & IndexedDB queue)
 * Permet de mettre en file d'attente des requêtes de formulaires hors connexion
 * et de les envoyer automatiquement dès le rétablissement de la connexion.
 */

export interface QueuedSubmission {
  id: string;
  endpoint: string;
  data: Record<string, unknown>;
  timestamp: number;
}

const STORAGE_KEY = "pwa_offline_submissions_queue";

export function isBackgroundSyncSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "SyncManager" in window
  );
}

/**
 * Sauvegarde une soumission dans la file d'attente locale
 */
export function queueOfflineSubmission(endpoint: string, data: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  try {
    const existing = getOfflineSubmissions();
    const item: QueuedSubmission = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      endpoint,
      data,
      timestamp: Date.now(),
    };
    existing.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

    // Si Background Sync est supporté, on déclenche l'événement 'sync'
    if (isBackgroundSyncSupported() && "serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        // @ts-expect-error - syncManager types might not be present in default lib.dom.d.ts
        if (reg.sync) {
          // @ts-expect-error - background sync API
          reg.sync.register("sync-offline-forms").catch(() => {});
        }
      });
    }
  } catch (error) {
    console.error("Erreur lors de la mise en file d'attente hors-ligne:", error);
  }
}

/**
 * Récupère les soumissions hors ligne en attente
 */
export function getOfflineSubmissions(): QueuedSubmission[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Tente d'envoyer toutes les requêtes en attente
 */
export async function processOfflineQueue(): Promise<{ processed: number; failed: number }> {
  const items = getOfflineSubmissions();
  if (items.length === 0) return { processed: 0, failed: 0 };

  const remaining: QueuedSubmission[] = [];
  let processed = 0;
  let failed = 0;

  for (const item of items) {
    try {
      const res = await fetch(item.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item.data),
      });

      if (res.ok) {
        processed++;
      } else {
        remaining.push(item);
        failed++;
      }
    } catch {
      remaining.push(item);
      failed++;
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
  return { processed, failed };
}
