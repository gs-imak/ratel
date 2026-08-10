/* Ratel service worker.
 *
 * Deliberately conservative. Every navigation goes to the network FIRST, so an
 * installed app can never show a customer a stale price or an out-of-date product.
 * The cache exists only so the app opens to something branded instead of the
 * browser's dinosaur when the connection drops, which happens often on mobile data
 * in Kinshasa.
 */

const VERSION = "ratel-v1";
const OFFLINE_URL = "/offline.html";

const PRECACHE = [OFFLINE_URL, "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(VERSION)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  /* Only GET is ever cacheable, and cross-origin (map tiles, fonts) is left alone. */
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_URL)));
    return;
  }

  /* Static assets: serve from cache when present, otherwise fetch and keep a copy.
     Next fingerprints these filenames, so a cached copy can never go stale. */
  event.respondWith(
    caches.match(request).then(
      (hit) =>
        hit ||
        fetch(request).then((response) => {
          if (response.ok && response.type === "basic") {
            const copy = response.clone();
            caches.open(VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        })
    )
  );
});
