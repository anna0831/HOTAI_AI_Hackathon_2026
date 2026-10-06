/**
 * ChicTrip Offline Asset Cache Service
 * Handles precaching of Travel DNA backgrounds and offline assets into CacheStorage,
 * and Service Worker registration to support true network disconnection reloads.
 */

const CACHE_NAME = 'chictrip-offline-v1';

export const TRAVEL_DNA_IMAGE_URLS = [
  '/images/travel-dna/urban-seoul.webp',
  '/images/travel-dna/food-osaka.webp',
  '/images/travel-dna/nature-hokkaido.webp',
];

/**
 * Register Service Worker for offline asset interception and offline refresh support
 */
export async function registerServiceWorker(): Promise<void> {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      // console.log('[ServiceWorker] Registered successfully');
    } catch (err) {
      console.warn('[ServiceWorker] Registration skipped or failed:', err);
    }
  }
}

/**
 * Precaches the 3 Travel DNA images into browser CacheStorage
 */
export async function cacheTravelDnaAssets(): Promise<boolean> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return false;
  }

  try {
    const cache = await caches.open(CACHE_NAME);
    // Fetch and cache each image
    await Promise.all(
      TRAVEL_DNA_IMAGE_URLS.map(async (url) => {
        try {
          const match = await cache.match(url);
          if (!match) {
            const resp = await fetch(url, { cache: 'no-cache' });
            if (resp.ok) {
              await cache.put(url, resp);
            }
          }
        } catch {
          // Ignore individual fetch error if already offline
        }
      })
    );
    return true;
  } catch (e) {
    console.warn('[OfflineAssetCache] Error caching Travel DNA assets:', e);
    return false;
  }
}

/**
 * Retrieves a cached image URL as a Blob URL if present in CacheStorage,
 * ensuring seamless offline canvas rendering even without HTTP networking.
 */
export async function getCachedImageUrl(url: string): Promise<string> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return url;
  }

  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(url);
    if (cachedResponse) {
      const blob = await cachedResponse.blob();
      return URL.createObjectURL(blob);
    }
  } catch (err) {
    console.warn('[OfflineAssetCache] Cache lookup failed, falling back to URL:', err);
  }

  return url;
}
