const CACHE_NAME = 'sveltia-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/offline.html',
  '/styles/global.css',
];

// Install event: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate event: cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch event: cache-first for static, network-first for dynamic
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  } else {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('/offline.html')))
    );
  }
});

// Background sync stub
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-offline-actions') {
    event.waitUntil(syncOfflineActions());
  }
});

/**
 * Retry queued offline POST requests.
 */
async function syncOfflineActions() {
  const queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
  if (!queue.length) return;

  const successful = [];

  for (const req of queue) {
    try {
      const response = await fetch(req.url, {
        method: req.method,
        headers: req.headers,
        body: req.body,
      });
      if (response.ok) {
        successful.push(req);
      }
    } catch (err) {
      console.warn('Background sync failed for request:', req.url);
    }
  }

  // Remove successful requests from queue
  const remaining = queue.filter((req) => !successful.includes(req));
  localStorage.setItem('offlineQueue', JSON.stringify(remaining));
}

// Listen for skipWaiting message to update SW immediately
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});