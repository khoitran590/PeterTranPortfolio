/* Custom service worker for the portfolio PWA.
 *
 * Filenames in a CRA production build are content-hashed, so instead of
 * precaching a fixed file list we cache at runtime:
 *   - navigations:   network-first, falling back to the cached app shell
 *                    (so the site still opens when offline)
 *   - static assets: stale-while-revalidate (instant loads, refreshed in bg)
 * Cross-origin requests (weather / email / fact APIs) are left untouched so
 * they always hit the network and are never served stale.
 */
const VERSION = 'v1';
const RUNTIME_CACHE = `portfolio-runtime-${VERSION}`;
const SHELL_CACHE = `portfolio-shell-${VERSION}`;
const APP_SHELL = './index.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.add(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  const keep = [RUNTIME_CACHE, SHELL_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !keep.includes(k)).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET; let everything else (POST to EmailJS, etc.) pass through.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Don't touch cross-origin requests (third-party APIs, fonts CDNs, etc.).
  if (url.origin !== self.location.origin) return;

  // App shell / page navigations: network-first with offline fallback.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put(APP_SHELL, copy));
          return response;
        })
        .catch(() => caches.match(APP_SHELL))
    );
    return;
  }

  // Static assets: stale-while-revalidate.
  event.respondWith(
    caches.open(RUNTIME_CACHE).then((cache) =>
      cache.match(request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached);
        return cached || network;
      })
    )
  );
});

// Allow the page to trigger an immediate update.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
