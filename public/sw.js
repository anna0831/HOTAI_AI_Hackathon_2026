// ChicTrip Offline Service Worker
const CACHE_NAME = 'chictrip-offline-v2';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/images/travel-dna/urban-seoul.webp',
  '/images/travel-dna/food-osaka.webp',
  '/images/travel-dna/nature-hokkaido.webp',
  '/images/seoul/attractions/airport.webp',
  '/images/seoul/attractions/hongdae.webp',
  '/images/seoul/attractions/gyeongbokgung.webp',
  '/images/seoul/attractions/bukchon.webp',
  '/images/seoul/attractions/ikseondong.webp',
  '/images/seoul/attractions/seongsu.webp',
  '/images/seoul/attractions/seoul-forest.webp',
  '/images/seoul/attractions/myeongdong.webp',
  '/images/seoul/attractions/n-seoul-tower.webp',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn('[SW] Pre-cache error:', err);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Handle SPA navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedIndex = await cache.match('/index.html') || await cache.match('/');
        return cachedIndex || new Response('Offline', { status: 503, statusText: 'Offline' });
      })
    );
    return;
  }

  // Handle static assets & API / images
  if (url.origin === self.location.origin) {
    // 忽略 Vite 開發模式的內部檔案與動態原始碼請求，確保原始碼修改即時生效
    if (
      url.pathname.startsWith('/src/') ||
      url.pathname.startsWith('/@') ||
      url.pathname.includes('node_modules') ||
      url.searchParams.has('t')
    ) {
      return;
    }

    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Stale-while-revalidate for assets
          fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
              }
            })
            .catch(() => {});
          return cachedResponse;
        }

        return fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
            }
            return networkResponse;
          })
          .catch(async () => {
            // Check cache for fallback
            const fallback = await caches.match(event.request);
            if (fallback) return fallback;
            return new Response('Offline asset unavailable', { status: 503, statusText: 'Offline' });
          });
      })
    );
  }
});
