/* ═══════════════════════════════════════════════════════════════
   SERVICE WORKER — LES GÉNIES D'AFRIQUE
   PWA & Stratégie de Cache Intelligente
══════════════════════════════════════════════════════════════════ */

const CACHE_VERSION = 'v1.0.0';
const STATIC_CACHE = `genies-static-${CACHE_VERSION}`;
const PAGES_CACHE = `genies-pages-${CACHE_VERSION}`;
const IMAGES_CACHE = `genies-images-${CACHE_VERSION}`;

// Ressources critiques de base (App Shell minimal)
const PRECACHE_ASSETS = [
  '/offline.html',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/icon-maskable-192x192.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-32x32.png',
  '/logo/logo.png',
  '/fonts/Satoshi-Bold.woff2',
];

/* ── 1. Installation ────────────────────────────────────────── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => {
      // Forcer l'activation immédiate sans attendre la fermeture de tous les onglets
      return self.skipWaiting();
    })
  );
});

/* ── 2. Activation & Nettoyage des anciens caches ───────────── */
self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE, PAGES_CACHE, IMAGES_CACHE];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Prendre le contrôle immédiat de tous les clients
      return self.clients.claim();
    })
  );
});

/* ── 3. Interception des requêtes Réseau (Fetch) ─────────────── */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-GET, les schémas non-http (ex: chrome-extension), les requêtes cross-origin non nécessaires
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Ne JAMAIS cacher les routes API, les requêtes analytics ou les actions serveur Next.js
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.includes('/_vercel/') ||
    url.hostname.includes('analytics')
  ) {
    return;
  }

  // Ne pas cacher les vidéos lourdes (économiser la mémoire/quota utilisateur)
  if (url.pathname.startsWith('/videos/')) {
    return;
  }

  // A) Requêtes de Navigation HTML (Pages du site) -> Stratégie Network-First
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(PAGES_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // Si le réseau échoue, chercher dans le cache des pages
          const cachedPage = await caches.match(request);
          if (cachedPage) {
            return cachedPage;
          }
          // Fallback vers la page hors-ligne autonome
          const offlineFallback = await caches.match('/offline.html');
          return offlineFallback || new Response('Hors ligne', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          });
        })
    );
    return;
  }

  // B) Assets Next.js immutables et Polices -> Stratégie Cache-First
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/fonts/')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // C) Images et icônes -> Stratégie Stale-While-Revalidate
  if (
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/logo/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.match(/\.(png|jpg|jpeg|svg|webp|ico)$/i)
  ) {
    event.respondWith(
      caches.open(IMAGES_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // D) Reste des requêtes de même origine -> Network avec fallback cache
  if (url.origin === location.origin) {
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
  }
});

/* ── 4. Gestion des Messages (Mise à jour, etc.) ─────────────── */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/* ── 5. Préparation Push Notifications (Évolutions futures) ─── */
self.addEventListener('push', (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const title = data.title || "Les Génies d'Afrique";
    const options = {
      body: data.body || "Nouvelle annonce disponible",
      icon: '/icons/icon-192x192.png',
      badge: '/icons/favicon-32x32.png',
      data: {
        url: data.url || '/',
      },
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } catch {
    // Si données texte brut
    const text = event.data.text();
    event.waitUntil(
      self.registration.showNotification("Les Génies d'Afrique", {
        body: text,
        icon: '/icons/icon-192x192.png',
      })
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
