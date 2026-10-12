import {
  getAllSeoulAttractionImagePaths,
  getAllSeoulRouteImagePaths,
} from '../data/seoulImageManifest';

/**
 * ChicTrip Offline Asset Cache Service
 * Handles precaching of Travel DNA backgrounds, Seoul attraction images, and offline assets into CacheStorage,
 * and Service Worker registration to support true network disconnection reloads.
 */

const CACHE_NAME = 'chictrip-offline-v2';

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

export interface SeoulImagesOfflineStatus {
  attractionCachedCount: number;
  totalAttractions: number;
  routeCachedCount: number;
  totalRoutes: number;
  cachedUrls: string[];
  isFullyCached: boolean;
}

/**
 * 快取首爾行程景點照片與路線圖片至 CacheStorage
 * 嚴格遵循：只快取實際存在 (HTTP 200) 的圖片，404 不快取、不拋錯
 */
export async function cacheSeoulItineraryAssets(): Promise<SeoulImagesOfflineStatus> {
  const attractionUrls = getAllSeoulAttractionImagePaths();
  const routeUrls = getAllSeoulRouteImagePaths();
  const allUrls = [...attractionUrls, ...routeUrls];

  const cachedUrls: string[] = [];

  if (typeof window === 'undefined' || !('caches' in window)) {
    return {
      attractionCachedCount: 0,
      totalAttractions: attractionUrls.length,
      routeCachedCount: 0,
      totalRoutes: routeUrls.length,
      cachedUrls: [],
      isFullyCached: false,
    };
  }

  try {
    const cache = await caches.open(CACHE_NAME);

    await Promise.all(
      allUrls.map(async (url) => {
        try {
          const match = await cache.match(url);
          if (match) {
            cachedUrls.push(url);
            return;
          }

          // 僅在有網路時嘗試拉取，並嚴格確認 resp.ok 才寫入快取
          if (typeof navigator !== 'undefined' && navigator.onLine) {
            const resp = await fetch(url, { cache: 'no-cache' });
            if (resp.ok) {
              await cache.put(url, resp);
              cachedUrls.push(url);
            }
          }
        } catch {
          // 網路失敗或離線時安全略過，不中斷其他快取
        }
      })
    );
  } catch (e) {
    console.warn('[OfflineAssetCache] Error caching Seoul itinerary assets:', e);
  }

  const attractionCachedCount = attractionUrls.filter((u) => cachedUrls.includes(u)).length;
  const routeCachedCount = routeUrls.filter((u) => cachedUrls.includes(u)).length;

  return {
    attractionCachedCount,
    totalAttractions: attractionUrls.length,
    routeCachedCount,
    totalRoutes: routeUrls.length,
    cachedUrls,
    isFullyCached:
      attractionCachedCount === attractionUrls.length &&
      routeCachedCount === routeUrls.length,
  };
}

/**
 * 檢查目前首爾景點照片與路線圖片於 CacheStorage 的快取現況
 */
export async function getSeoulImagesOfflineStatus(): Promise<SeoulImagesOfflineStatus> {
  const attractionUrls = getAllSeoulAttractionImagePaths();
  const routeUrls = getAllSeoulRouteImagePaths();
  const allUrls = [...attractionUrls, ...routeUrls];

  const cachedUrls: string[] = [];

  if (typeof window !== 'undefined' && 'caches' in window) {
    try {
      const cache = await caches.open(CACHE_NAME);
      await Promise.all(
        allUrls.map(async (url) => {
          const match = await cache.match(url);
          if (match) {
            cachedUrls.push(url);
          }
        })
      );
    } catch (e) {
      console.warn('[OfflineAssetCache] Status check failed:', e);
    }
  }

  const attractionCachedCount = attractionUrls.filter((u) => cachedUrls.includes(u)).length;
  const routeCachedCount = routeUrls.filter((u) => cachedUrls.includes(u)).length;

  return {
    attractionCachedCount,
    totalAttractions: attractionUrls.length,
    routeCachedCount,
    totalRoutes: routeUrls.length,
    cachedUrls,
    isFullyCached:
      attractionCachedCount === attractionUrls.length &&
      routeCachedCount === routeUrls.length &&
      attractionUrls.length > 0,
  };
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

